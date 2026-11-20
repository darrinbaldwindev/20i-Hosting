#!/usr/bin/env python3
"""Bounded, offline WordPress v0.2 archive custody *candidate* verifier.

A historical checksum match does not prove current Git source, original
custodian acceptance, provider staging eligibility, or upload authority.
No extraction, network access, WordPress execution, or account mutation.
"""
from __future__ import annotations

import hashlib
import io
import json
import os
from pathlib import Path
import stat
import sys
import zipfile

HISTORICAL_THEME = (14526, "34ce6b861ffaf31969fdc5ae461bec375f8df164695c4ee309a904c9ac70cd74")
HISTORICAL_SOURCE = (24643, "e531a91b2865b46f74366c690ee7750cde2458e7f23035f4d4d5ffd78f465ef0")
THEME_MEMBERS = (
    "style.css", "functions.php", "header.php", "footer.php",
    "front-page.php", "page.php", "single.php", "index.php",
    "404.php", "assets/styles.css", "assets/site.js",
)
MAX_ZIP_BYTES = 2 * 1024 * 1024
MAX_MEMBERS = 128
MAX_MEMBER_BYTES = 1 * 1024 * 1024
MAX_TOTAL_UNCOMPRESSED = 4 * 1024 * 1024
CHUNK_SIZE = 64 * 1024


class ArchiveBlocked(ValueError):
    """Error code only: never emit potentially private source paths or bytes."""


def _blocked(code: str) -> dict:
    return {
        "result": "BLOCKED",
        "errors": [code],
        "historical_archive_bytes_matched": False,
        "theme_cross_archive_consistent": False,
        "original_custodian_acknowledged": False,
        "canonical_git_source_verified": False,
        "independent_wordpress_tested": False,
        "my20i_authenticated": False,
        "provider_target_verified": False,
        "private_access_verified": False,
        "upload_authorized": False,
        "provider_mutation": False,
    }


def _read_archive(path: str, expected: tuple[int, str], label: str) -> bytes:
    # Caller-supplied archives are untrusted. Do not follow final-path symlinks.
    try:
        before_path = os.lstat(path)
        if not stat.S_ISREG(before_path.st_mode):
            raise ArchiveBlocked(label + "_NOT_REGULAR_FILE")
        if before_path.st_size > MAX_ZIP_BYTES:
            raise ArchiveBlocked(label + "_TOO_LARGE")
        flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0) | getattr(os, "O_NONBLOCK", 0)
        fd = os.open(path, flags)
    except ArchiveBlocked:
        raise
    except (OSError, ValueError) as exc:
        raise ArchiveBlocked(label + "_UNREADABLE") from exc

    try:
        before = os.fstat(fd)
        if (not stat.S_ISREG(before.st_mode) or
                (before.st_dev, before.st_ino) != (before_path.st_dev, before_path.st_ino)):
            raise ArchiveBlocked(label + "_CHANGED_DURING_OPEN")
        if before.st_size > MAX_ZIP_BYTES:
            raise ArchiveBlocked(label + "_TOO_LARGE")
        parts = []
        count = 0
        while True:
            part = os.read(fd, CHUNK_SIZE)
            if not part:
                break
            count += len(part)
            if count > MAX_ZIP_BYTES:
                raise ArchiveBlocked(label + "_TOO_LARGE")
            parts.append(part)
        after = os.fstat(fd)
        try:
            after_path = os.lstat(path)
        except OSError as exc:
            raise ArchiveBlocked(label + "_CHANGED_DURING_READ") from exc
        if (count != before.st_size or
                (before.st_dev, before.st_ino, before.st_size,
                 before.st_mtime_ns, before.st_ctime_ns) !=
                (after.st_dev, after.st_ino, after.st_size,
                 after.st_mtime_ns, after.st_ctime_ns) or
                not stat.S_ISREG(after_path.st_mode) or
                (after_path.st_dev, after_path.st_ino) != (after.st_dev, after.st_ino)):
            raise ArchiveBlocked(label + "_CHANGED_DURING_READ")
    finally:
        os.close(fd)

    payload = b"".join(parts)
    expected_size, expected_sha256 = expected
    if len(payload) != expected_size or hashlib.sha256(payload).hexdigest() != expected_sha256.lower():
        raise ArchiveBlocked(label + "_HISTORICAL_HASH_MISMATCH")
    return payload


def _safe_member_name(name: str, label: str) -> None:
    # zipfile works with forward slash ZIP paths; reject other path forms.
    if (not name or name.startswith("/") or "\\" in name or
            "\x00" in name or ":" in name or
            any(part in ("", ".", "..") for part in name.rstrip("/").split("/"))):
        raise ArchiveBlocked(label + "_UNSAFE_MEMBER_NAME")


def _inspect_archive(payload: bytes, label: str) -> dict[str, bytes]:
    seen = set()
    extracted = {}
    total = 0
    try:
        with zipfile.ZipFile(io.BytesIO(payload), "r") as archive:
            entries = archive.infolist()
            if len(entries) > MAX_MEMBERS:
                raise ArchiveBlocked(label + "_MEMBER_LIMIT_EXCEEDED")
            for entry in entries:
                _safe_member_name(entry.filename, label)
                # ZIP duplicate path entries and symbolic links cannot be accepted.
                if entry.filename in seen:
                    raise ArchiveBlocked(label + "_DUPLICATE_MEMBER")
                seen.add(entry.filename)
                if entry.flag_bits & 1:
                    raise ArchiveBlocked(label + "_ENCRYPTED_MEMBER")
                kind = stat.S_IFMT(entry.external_attr >> 16)
                if kind == stat.S_IFLNK:
                    raise ArchiveBlocked(label + "_SYMLINK_MEMBER")
                if kind not in (0, stat.S_IFREG, stat.S_IFDIR):
                    raise ArchiveBlocked(label + "_NONREGULAR_MEMBER")
                if entry.is_dir():
                    if kind not in (0, stat.S_IFDIR):
                        raise ArchiveBlocked(label + "_MEMBER_TYPE_MISMATCH")
                    continue
                if kind == stat.S_IFDIR:
                    raise ArchiveBlocked(label + "_MEMBER_TYPE_MISMATCH")
                if entry.file_size > MAX_MEMBER_BYTES:
                    raise ArchiveBlocked(label + "_MEMBER_TOO_LARGE")
                total += entry.file_size
                if total > MAX_TOTAL_UNCOMPRESSED:
                    raise ArchiveBlocked(label + "_TOTAL_TOO_LARGE")
                # The ZIP implementation verifies member CRC on complete reads.
                raw = archive.read(entry)
                if len(raw) != entry.file_size:
                    raise ArchiveBlocked(label + "_CORRUPT_MEMBER")
                extracted[entry.filename] = raw
    except ArchiveBlocked:
        raise
    except (zipfile.BadZipFile, RuntimeError, OSError, EOFError, ValueError, NotImplementedError) as exc:
        raise ArchiveBlocked(label + "_INVALID_ZIP") from exc
    return extracted


def _member_bytes(files: dict[str, bytes], relative: str, label: str) -> bytes:
    # The original theme v0.2 was described as "agentos-commercial-theme".
    # Allow ZIP upload roots or the equivalent nested source tree, never
    # invent a canonical repository or trust ambiguous duplicate theme roots.
    candidates = [
        raw for name, raw in files.items()
        if name == relative or name.endswith("/agentos-commercial-theme/" + relative)
    ]
    if not candidates:
        raise ArchiveBlocked(label + "_MISSING_THEME_MEMBER")
    if len(candidates) != 1:
        raise ArchiveBlocked(label + "_AMBIGUOUS_THEME_MEMBER")
    return candidates[0]


def assess_handoff(
    theme_path: str,
    source_path: str,
    theme_expected: tuple[int, str] = HISTORICAL_THEME,
    source_expected: tuple[int, str] = HISTORICAL_SOURCE,
) -> dict:
    """Validate archive bytes and WordPress core-member consistency offline.

    Tests may pass synthetic expected (size, hash) tuples; the command-line
    application ALWAYS requires the original two 2026-11-16 historical hashes.
    """
    if not isinstance(theme_path, str) or not isinstance(source_path, str):
        return _blocked("ARCHIVE_PATHS_REQUIRED")
    try:
        theme = _inspect_archive(_read_archive(theme_path, theme_expected, "THEME"), "THEME")
        source = _inspect_archive(_read_archive(source_path, source_expected, "SOURCE"), "SOURCE")
        for filename in THEME_MEMBERS:
            if _member_bytes(theme, filename, "THEME") != _member_bytes(source, filename, "SOURCE"):
                raise ArchiveBlocked("THEME_SOURCE_BYTES_DIFFER")
    except ArchiveBlocked as error:
        return _blocked(str(error))
    # Successful historical byte identity and cross-archive equality are NOT
    # source-repository custody, provider acceptance, or release approval.
    return {
        "result": "HISTORICAL_ZIPS_MATCH_NOT_ACCEPTED",
        "errors": [],
        "historical_archive_bytes_matched": (
            theme_expected == HISTORICAL_THEME and source_expected == HISTORICAL_SOURCE
        ),
        "theme_cross_archive_consistent": True,
        "required_wordpress_files_matched": len(THEME_MEMBERS),
        "original_custodian_acknowledged": False,
        "canonical_git_source_verified": False,
        "independent_wordpress_tested": False,
        "my20i_authenticated": False,
        "provider_target_verified": False,
        "private_access_verified": False,
        "upload_authorized": False,
        "provider_mutation": False,
        "note": "Historical byte identity only. Original source custodian, Git SHA, real WordPress staging, independent claims review and exact-target owner authority remain unverified.",
    }


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: python tools/verify_agentos_theme_handoff.py <theme-v0.2.zip> <source-v0.2.zip>", file=sys.stderr)
        print(json.dumps(_blocked("CLI_ARGUMENTS_INVALID")))
        return 2
    result = assess_handoff(sys.argv[1], sys.argv[2])
    print(json.dumps(result, indent=2))
    return 2 if result["result"] == "BLOCKED" else 0


if __name__ == "__main__":
    raise SystemExit(main())
