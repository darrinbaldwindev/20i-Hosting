import hashlib
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import xml.etree.ElementTree as ET

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from check_ssh_wxr_intake import assess, WP, CONTENT, LIMIT

def fixture():
    root = ET.Element("rss", version="2.0")
    channel = ET.SubElement(root, "channel")
    for tag, value in (("title", "Software Savings Hub"),
                       ("link", "https://example.invalid/"), (WP + "wxr_version", "1.2")):
        ET.SubElement(channel, tag).text = value
    for n, kind in enumerate(("page", "post"), 1):
        item = ET.SubElement(channel, "item")
        for tag, value in (("title", "Synthetic"), (CONTENT + "encoded", '<p class="notice">Café &amp; tea</p>'),
                           (WP + "post_id", str(n)), (WP + "post_name", f"internal-ssh-item-{n}"),
                           (WP + "post_type", kind), (WP + "status", "draft"),
                           (WP + "comment_status", "closed"), (WP + "ping_status", "closed"),
                           (WP + "post_parent", "0")):
            ET.SubElement(item, tag).text = value
    return root

def encode(root):
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)

def check(data, pages=1, posts=1, digest=None):
    return assess(data, digest or hashlib.sha256(data).hexdigest(), pages, posts)

class Intake(unittest.TestCase):
    def reject(self, data, code, **kwargs):
        result = check(data, **kwargs)
        self.assertEqual(result, {"result": "BLOCKED", "errors": [code], "upload_authorized": False})

    def changed(self, tag, value):
        root = fixture()
        root.find("./channel/item/" + tag).text = value
        return encode(root)

    def test_valid_inert_draft(self):
        self.assertEqual(check(encode(fixture())), {
            "result": "STRUCTURAL_CHECK_ONLY_NOT_AUTHORIZED", "errors": [],
            "pages": 1, "posts": 1, "upload_authorized": False})

    def test_hash(self):
        self.reject(encode(fixture()), "HASH_MISMATCH", digest="a"*64)

    def test_counts(self):
        self.reject(encode(fixture()), "ITEM_COUNT_MISMATCH", pages=2)
        self.reject(encode(fixture()), "TYPE_COUNT_MISMATCH", pages=2, posts=0)

    def test_status(self):
        self.reject(self.changed(WP+"status", "publish"), "POST_NOT_DRAFT")

    def test_types(self):
        self.reject(self.changed(WP+"post_type", "attachment"), "POST_TYPE_FORBIDDEN")

    def test_research_and_wrong_site_slug(self):
        for slug in ("internal-ssh-product-secret", "internal-ssh-deals", "other-site"):
            with self.subTest(slug=slug):
                self.reject(self.changed(WP+"post_name", slug), "SLUG_FORBIDDEN")

    def test_bare_product_slug_is_rejected(self):
        self.reject(self.changed(WP+"post_name", "internal-ssh-product"), "SLUG_FORBIDDEN")

    def test_reserved_research_route_descendants(self):
        for slug in ("internal-ssh-catalogue-preview", "internal-ssh-compare-research",
                     "internal-ssh-deals-preview"):
            with self.subTest(slug=slug):
                self.reject(self.changed(WP+"post_name", slug), "SLUG_FORBIDDEN")

    def test_editorial_productivity_slug_is_allowed(self):
        result = check(self.changed(WP+"post_name", "internal-ssh-productivity-guide"))
        self.assertEqual(result["result"], "STRUCTURAL_CHECK_ONLY_NOT_AUTHORIZED")
        self.assertFalse(result["upload_authorized"])

    def test_duplicate_field(self):
        root = fixture()
        ET.SubElement(root.find("./channel/item"), WP+"status").text = "draft"
        self.reject(encode(root), "FIELD_MISSING_OR_AMBIGUOUS")

    def test_duplicate_id(self):
        self.reject(self.changed(WP+"post_id", "2"), "DUPLICATE_ITEM")

    def test_duplicate_slug(self):
        self.reject(self.changed(WP+"post_name", "internal-ssh-item-2"), "DUPLICATE_ITEM")

    def test_metadata(self):
        root = fixture()
        ET.SubElement(root.find("./channel/item"), WP+"postmeta")
        self.reject(encode(root), "ITEM_FIELD_FORBIDDEN")

    def test_active_content(self):
        for html in ('<script>alert(1)</script>', '<a href="https://example.com">click</a>',
                     '<img src="https://example.com/a">', '<iframe></iframe>', '<form></form>'):
            with self.subTest(html=html):
                self.reject(self.changed(CONTENT+"encoded", html), "CONTENT_TAG_FORBIDDEN")

    def test_attributes(self):
        for html in ('<p onclick="alert(1)">x</p>', '<p style="color:red">x</p>'):
            self.reject(self.changed(CONTENT+"encoded", html), "CONTENT_ATTRIBUTE_FORBIDDEN")

    def test_wordpress_shortcodes_and_comments(self):
        self.reject(self.changed(CONTENT+"encoded", "<p>[gallery]</p>"), "CONTENT_AMBIGUOUS_MARKUP")
        self.reject(self.changed(CONTENT+"encoded", "<!-- wp:html --><p>x</p>"), "CONTENT_COMMENT_FORBIDDEN")

    def test_dtd_invalid_encoding_and_size(self):
        self.reject(b'<!DOCTYPE rss [<!ENTITY x "secret">]><rss/>', "XML_DTD_FORBIDDEN")
        self.reject(b'\xff', "INPUT_INVALID")
        self.reject(b' '* (LIMIT+1), "INPUT_SIZE_OR_TYPE")

    def test_closed_interactions(self):
        self.reject(self.changed(WP+"comment_status", "open"), "INTERACTION_NOT_CLOSED")
        self.reject(self.changed(WP+"ping_status", "open"), "INTERACTION_NOT_CLOSED")

    def test_site_and_parent(self):
        root = fixture()
        root.find("./channel/title").text = "Other site"
        self.reject(encode(root), "SITE_TITLE_MISMATCH")
        self.reject(self.changed(WP+"post_parent", "99"), "PARENT_FORBIDDEN")

    def test_cli_redacted(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "PRIVATE-SYNTHETIC.xml"
            data = self.changed(CONTENT+"encoded", '<script>PRIVATE-SYNTHETIC</script>')
            path.write_bytes(data)
            script = Path(__file__).resolve().parents[1] / "tools/check_ssh_wxr_intake.py"
            p = subprocess.run([sys.executable, str(script), str(path), "--sha256",
                                hashlib.sha256(data).hexdigest(), "--pages", "1", "--posts", "1"],
                               capture_output=True, text=True, timeout=10)
            self.assertEqual(p.returncode, 2, p.stderr)
            self.assertNotIn("PRIVATE-SYNTHETIC", p.stdout + p.stderr)
            self.assertIn("CONTENT_TAG_FORBIDDEN", p.stdout)

if __name__ == "__main__":
    unittest.main()
