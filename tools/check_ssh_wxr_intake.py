"""Offline structural check for a proposed Software Savings Hub editorial WXR.

Not an importer, sanitizer, source authenticator, or upload decision.
"""
import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET

WP = "{http://wordpress.org/export/1.2/}"
CONTENT = "{http://purl.org/rss/1.0/modules/content/}"
LIMIT = 4 * 1024 * 1024
MAX_ITEMS = 2000
TAGS = frozenset("article section div span p h1 h2 h3 h4 h5 h6 ul ol li strong em b i code pre blockquote table thead tbody tr th td br hr".split())
SLUG = re.compile(r"internal-ssh-[a-z0-9]+(?:-[a-z0-9]+)*")


class Rejected(ValueError):
    pass


def require(condition, code):
    if not condition:
        raise Rejected(code)


class InertHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        require(tag in TAGS, "CONTENT_TAG_FORBIDDEN")
        require(all(k == "class" and v is not None and
                    re.fullmatch(r"[A-Za-z0-9_ -]{1,160}", v)
                    for k, v in attrs), "CONTENT_ATTRIBUTE_FORBIDDEN")
        require(len(attrs) == len({k for k, _ in attrs}), "CONTENT_DUPLICATE_ATTRIBUTE")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        require(tag in TAGS, "CONTENT_TAG_FORBIDDEN")

    def handle_comment(self, data):
        raise Rejected("CONTENT_COMMENT_FORBIDDEN")

    def handle_decl(self, decl):
        raise Rejected("CONTENT_DECLARATION_FORBIDDEN")

    def unknown_decl(self, data):
        raise Rejected("CONTENT_DECLARATION_FORBIDDEN")

    def handle_pi(self, data):
        raise Rejected("CONTENT_DECLARATION_FORBIDDEN")

    def handle_data(self, data):
        require("<" not in data and "[" not in data and "]" not in data,
                "CONTENT_AMBIGUOUS_MARKUP")


def field(parent, tag):
    found = parent.findall(tag)
    require(len(found) == 1 and len(found[0]) == 0, "FIELD_MISSING_OR_AMBIGUOUS")
    require(not found[0].attrib, "FIELD_ATTRIBUTE_FORBIDDEN")
    return found[0].text or ""


def blocked(code):
    return {"result": "BLOCKED", "errors": [code], "upload_authorized": False}


def assess(data, expected_sha256, expected_pages, expected_posts):
    try:
        require(isinstance(data, bytes) and 0 < len(data) <= LIMIT, "INPUT_SIZE_OR_TYPE")
        require(isinstance(expected_sha256, str) and
                re.fullmatch(r"[0-9a-fA-F]{64}", expected_sha256), "EXPECTED_HASH_INVALID")
        require(type(expected_pages) is int and type(expected_posts) is int and
                expected_pages >= 0 and expected_posts >= 0 and
                0 < expected_pages + expected_posts <= MAX_ITEMS, "EXPECTED_COUNTS_INVALID")
        require(hashlib.sha256(data).hexdigest() == expected_sha256.lower(), "HASH_MISMATCH")
        source = data.decode("utf-8", errors="strict")
        require(not re.search(r"<!\s*(?:DOCTYPE|ENTITY)\b", source, re.I), "XML_DTD_FORBIDDEN")
        # Parse the exact hashed buffer as decoded UTF-8, not a second file read.
        root = ET.fromstring(source)
        require(root.tag == "rss" and root.attrib == {"version": "2.0"}, "RSS_SHAPE")
        require(len(root) == 1 and root[0].tag == "channel", "CHANNEL_SHAPE")
        channel = root[0]
        require(not channel.attrib, "CHANNEL_SHAPE")
        require(field(channel, "title") == "Software Savings Hub", "SITE_TITLE_MISMATCH")
        require(field(channel, "link") == "https://example.invalid/", "CHANNEL_LINK_FORBIDDEN")
        require(field(channel, WP + "wxr_version") == "1.2", "WXR_VERSION")
        require(all(x.tag in {"title", "link", WP + "wxr_version", "item"}
                    for x in channel), "CHANNEL_FIELD_FORBIDDEN")
        items = channel.findall("item")
        require(len(items) == expected_pages + expected_posts, "ITEM_COUNT_MISMATCH")
        allowed = {"title", CONTENT + "encoded"} | {
            WP + k for k in ("post_id", "post_name", "post_type", "status",
                             "comment_status", "ping_status", "post_parent")}
        slugs, ids = set(), set()
        counts = {"page": 0, "post": 0}
        for item in items:
            require(not item.attrib and all(x.tag in allowed for x in item), "ITEM_FIELD_FORBIDDEN")
            require(bool(field(item, "title").strip()), "TITLE_EMPTY")
            slug = field(item, WP + "post_name")
            require(SLUG.fullmatch(slug) and not slug.startswith("internal-ssh-product-") and
                    slug not in {"internal-ssh-catalogue", "internal-ssh-compare", "internal-ssh-deals"},
                    "SLUG_FORBIDDEN")
            identity = field(item, WP + "post_id")
            require(re.fullmatch(r"[1-9][0-9]{0,9}", identity), "POST_ID_INVALID")
            require(slug not in slugs and identity not in ids, "DUPLICATE_ITEM")
            slugs.add(slug)
            ids.add(identity)
            kind = field(item, WP + "post_type")
            require(kind in counts, "POST_TYPE_FORBIDDEN")
            counts[kind] += 1
            require(field(item, WP + "status") == "draft", "POST_NOT_DRAFT")
            require(field(item, WP + "comment_status") == "closed" and
                    field(item, WP + "ping_status") == "closed", "INTERACTION_NOT_CLOSED")
            require(field(item, WP + "post_parent") == "0", "PARENT_FORBIDDEN")
            body = field(item, CONTENT + "encoded")
            require(bool(body.strip()), "CONTENT_EMPTY")
            parser = InertHTML()
            parser.feed(body)
            parser.close()
        require(counts == {"page": expected_pages, "post": expected_posts}, "TYPE_COUNT_MISMATCH")
        return {"result": "STRUCTURAL_CHECK_ONLY_NOT_AUTHORIZED", "errors": [],
                "pages": counts["page"], "posts": counts["post"], "upload_authorized": False}
    except Rejected as exc:
        return blocked(str(exc))
    except (UnicodeError, ET.ParseError, ValueError, RecursionError):
        return blocked("INPUT_INVALID")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("wxr", type=Path)
    p.add_argument("--sha256", required=True)
    p.add_argument("--pages", type=int, required=True)
    p.add_argument("--posts", type=int, required=True)
    args = p.parse_args()
    try:
        with args.wxr.open("rb") as f:
            data = f.read(LIMIT + 1)
        result = assess(data, args.sha256, args.pages, args.posts)
    except OSError:
        result = blocked("INPUT_UNREADABLE")
    print(json.dumps(result))
    return 2 if result["result"] == "BLOCKED" else 0


if __name__ == "__main__":
    raise SystemExit(main())
