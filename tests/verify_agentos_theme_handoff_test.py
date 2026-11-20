"""Synthetic WordPress handoff ZIP checks — no real customer or Chat ZIP data."""
from __future__ import annotations

import hashlib
import io
import json
import os
from pathlib import Path
import stat
import subprocess
import sys
import tempfile
import unittest
import warnings
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from verify_agentos_theme_handoff import (  # noqa: E402
    HISTORICAL_THEME, HISTORICAL_SOURCE, THEME_MEMBERS, assess_handoff,
)

PROGRAM = Path(__file__).resolve().parents[1] / "tools" / "verify_agentos_theme_handoff.py"


def safe_tree(prefix="agentos-commercial-theme/"):
    return {prefix + name: (name + " test-only source bytes").encode() for name in THEME_MEMBERS}


def zip_bytes(members):
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, content in members:
            archive.writestr(name, content)
    return buf.getvalue()


def encoded(files):
    return zip_bytes(list(files.items()))


def identity(data):
    return (len(data), hashlib.sha256(data).hexdigest())


class HandoffFixture(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(prefix="synthetic-20i-wp-")
        self.addCleanup(self.directory.cleanup)
        self.theme_path = Path(self.directory.name) / "private-theme.zip"
        self.source_path = Path(self.directory.name) / "private-source.zip"
        self.theme_members = safe_tree()
        self.source_members = {"some-docs.txt": b"Mocked metadata only"} | safe_tree("agentos-commercial-theme/")
        self.write()

    def write(self, theme_data=None, source_data=None):
        self.theme_data = encoded(self.theme_members) if theme_data is None else theme_data
        self.source_data = encoded(self.source_members) if source_data is None else source_data
        self.theme_path.write_bytes(self.theme_data)
        self.source_path.write_bytes(self.source_data)

    def outcome(self, theme_expected=None, source_expected=None):
        return assess_handoff(
            str(self.theme_path), str(self.source_path),
            theme_expected or identity(self.theme_data),
            source_expected or identity(self.source_data),
        )

    def assert_blocked(self, code, result=None):
        result = self.outcome() if result is None else result
        self.assertEqual(result["result"], "BLOCKED", result)
        self.assertIn(code, result["errors"])
        self.assertIs(result["upload_authorized"], False)
        self.assertIs(result["provider_mutation"], False)
        self.assertIs(result["original_custodian_acknowledged"], False)
        self.assertIs(result["canonical_git_source_verified"], False)
        self.assertNotIn(str(self.theme_path), json.dumps(result))
        self.assertNotIn(str(self.source_path), json.dumps(result))

    def test_complete_pair_matches_but_never_authorizes(self):
        result = self.outcome()
        self.assertEqual(result["result"], "HISTORICAL_ZIPS_MATCH_NOT_ACCEPTED", result)
        self.assertEqual(result["required_wordpress_files_matched"], len(THEME_MEMBERS))
        self.assertTrue(result["theme_cross_archive_consistent"])
        self.assertFalse(result["historical_archive_bytes_matched"])
        self.assertFalse(result["upload_authorized"])
        self.assertFalse(result["provider_target_verified"])
        self.assertFalse(result["my20i_authenticated"])

    def test_rootless_theme_and_nested_source_work_if_unambiguous(self):
        self.theme_members = safe_tree("")
        self.source_members = safe_tree("site/agentos-commercial-theme/")
        self.write()
        self.assertEqual(self.outcome()["result"], "HISTORICAL_ZIPS_MATCH_NOT_ACCEPTED")

    def test_historical_hashes_are_not_claimed_for_synthetic_data(self):
        self.assert_blocked("THEME_HISTORICAL_HASH_MISMATCH",
                            assess_handoff(str(self.theme_path), str(self.source_path),
                                           HISTORICAL_THEME, HISTORICAL_SOURCE))

    def test_missing_theme_archive_blocks(self):
        self.theme_path.unlink()
        self.assert_blocked("THEME_UNREADABLE")

    def test_missing_source_archive_blocks(self):
        self.source_path.unlink()
        self.assert_blocked("SOURCE_UNREADABLE")

    def test_modified_theme_bytes_rejected_even_if_zip_is_valid(self):
        orig = identity(self.theme_data)
        self.theme_members["agentos-commercial-theme/front-page.php"] = b"Unauthorized edit"
        self.write()
        self.assert_blocked("THEME_HISTORICAL_HASH_MISMATCH",
                            self.outcome(theme_expected=orig))

    def test_modified_source_member_fails_cross_archive_comparison(self):
        self.source_members["agentos-commercial-theme/front-page.php"] = b"DIFFERENT PHP"
        self.write()
        self.assert_blocked("THEME_SOURCE_BYTES_DIFFER")

    def test_missing_required_theme_file_blocks(self):
        del self.theme_members["agentos-commercial-theme/header.php"]
        self.write()
        self.assert_blocked("THEME_MISSING_THEME_MEMBER")

    def test_missing_required_source_file_blocks(self):
        del self.source_members["agentos-commercial-theme/functions.php"]
        self.write()
        self.assert_blocked("SOURCE_MISSING_THEME_MEMBER")

    def test_ambiguous_copy_of_theme_file_blocks(self):
        self.source_members["site/agentos-commercial-theme/style.css"] = (
            self.source_members["agentos-commercial-theme/style.css"]
        )
        self.write()
        self.assert_blocked("SOURCE_AMBIGUOUS_THEME_MEMBER")

    def test_zip_path_traversal_rejected(self):
        self.source_members["../wp-config.php"] = b"synthetic content"
        self.write()
        self.assert_blocked("SOURCE_UNSAFE_MEMBER_NAME")

    def test_zip_absolute_path_rejected(self):
        self.source_members["/a/private.txt"] = b"synthetic content"
        self.write()
        self.assert_blocked("SOURCE_UNSAFE_MEMBER_NAME")

    def test_zip_windows_backslash_rejected(self):
        self.source_members["..\x5cexample.txt"] = b"synthetic content"
        self.write()
        self.assert_blocked("SOURCE_UNSAFE_MEMBER_NAME")

    def test_zip_duplicate_member_rejected(self):
        members = list(self.source_members.items())
        members.append(("agentos-commercial-theme/style.css", b"duplicate"))
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", UserWarning)
            modified = zip_bytes(members)
        self.write(source_data=modified)
        self.assert_blocked("SOURCE_DUPLICATE_MEMBER")

    def test_zip_symlink_member_rejected(self):
        entry = zipfile.ZipInfo("agentos-commercial-theme/symbolic.php")
        entry.create_system = 3
        entry.external_attr = (stat.S_IFLNK | 0o777) << 16
        members = list(self.source_members.items()) + [(entry, b"../../private")]
        self.write(source_data=zip_bytes(members))
        self.assert_blocked("SOURCE_SYMLINK_MEMBER")

    def test_zip_member_size_over_cap_rejected(self):
        self.source_members["giant.txt"] = b"a" * (1024 * 1024 + 1)
        self.write()
        self.assert_blocked("SOURCE_MEMBER_TOO_LARGE")

    def test_invalid_zip_body_rejected_even_with_matching_hash(self):
        self.write(source_data=b"not a ZIP")
        self.assert_blocked("SOURCE_INVALID_ZIP")

    @unittest.skipIf(os.name == "nt", "POSIX symlink scenario; Windows privilege-dependent")
    def test_final_path_symlink_rejected(self):
        target = self.source_path.with_name("real.zip")
        self.source_path.rename(target)
        self.source_path.symlink_to(target)
        self.assert_blocked("SOURCE_NOT_REGULAR_FILE")

    def test_cli_requires_two_files_and_fails_closed(self):
        output = subprocess.run([sys.executable, str(PROGRAM)], capture_output=True,
                                text=True, check=False)
        self.assertEqual(output.returncode, 2, output.stderr)
        report = json.loads(output.stdout)
        self.assert_blocked("CLI_ARGUMENTS_INVALID", report)

    def test_cli_rejects_synthetic_zip_because_historical_sha_missing(self):
        output = subprocess.run([sys.executable, str(PROGRAM), str(self.theme_path),
                                 str(self.source_path)], capture_output=True,
                                text=True, check=False)
        self.assertEqual(output.returncode, 2, output.stderr)
        self.assert_blocked("THEME_HISTORICAL_HASH_MISMATCH", json.loads(output.stdout))
        self.assertNotIn(str(self.theme_path), output.stdout)


if __name__ == "__main__":
    unittest.main()
