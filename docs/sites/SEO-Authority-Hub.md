# SEO Authority Hub — 20i staging admission manifest

Status: PREPARED / NOT DEPLOYED / RUNTIME HOLD  
Date: 2026-10-18

## Source identity

Repository:
`darrinbaldwindev/GlobalShopCo-Headless`

PR:
`#18`

Branch:
`seo-authority-hub-prototype-2026-10-18`

Exact head:
`67aff1bb46da8d74b5e95838c1a63050ae38dbba`

Tree:
`3c5a519d93aaa465d0213c1a24573d01fc9ef86d`

## Exact-head CI

Workflow:
`SEO Hub validation`

Run:
`39107688558`

Job:
`117616986020`

Conclusion:
`SUCCESS`

Verified CI steps:
- Python source tests;
- PHP lint;
- isolated publication-lock smoke;
- anonymous-search smoke;
- accidental production-config rejection;
- staging candidate ZIP + manifest build;
- artifact upload.

## Current CI artifact

Artifact:
`seo-hub-staging-candidate`

Artifact ID:
`12129226688`

Outer artifact size:
`8749 bytes`

Outer artifact SHA-256:
`d7d20d8bc3a78dc1da09082ed17abc8a8bb532517702b17c02635009ae9c350c`

Expiry:
`2026-10-25`

### Digest boundary

The digest above is for the **outer GitHub Actions artifact archive**.

It is **not** yet accepted as the hash of the inner installable WordPress theme ZIP.

Before any 20i upload, independently verify:
1. inner theme ZIP filename;
2. inner theme ZIP size;
3. inner theme ZIP SHA-256;
4. inner manifest contents;
5. all ZIP members against exact source;
6. no experimental/rejected publication-gate file is included unexpectedly;
7. no unapproved production configuration is included.

## Runtime status

`WORDPRESS_RUNTIME_ACCEPTANCE = NOT_RUN`

Current source/CI PASS does not establish WordPress runtime acceptance.

Required runtime checklist:
`GlobalShopCo-Headless/seo-authority-hub/WORDPRESS-RUNTIME-ACCEPTANCE.md`

Required isolated checks include:
- theme activation/no PHP errors;
- zero-content and populated homepage;
- category/archive/search/404/static/single views;
- menu fallback;
- escaping/filter interactions;
- keyboard/mobile/zoom/reduced-motion behavior;
- publication-path tests via wp-admin, REST, XML-RPC if enabled, WP-CLI, bulk/Quick Edit, cron, autosave/revision/concurrency;
- theme-switch/publication-control independence;
- no fabricated product/price/rating claims;
- no public indexing before approval.

## Publication-control boundary

The current MU-plugin publication lock remains experimental.

The rejected post-transition gate must not be activated.

No publication mechanism is accepted merely because CI passes.

## 20i admission state

`READY_TO_UPLOAD_20I = BLOCKED_ON_INNER_PACKAGE_BINDING_AND_ISOLATED_RUNTIME_AUTHORITY`

The separate provider-ingress problem previously observed in My20i may also apply once runtime execution is authorized.

Do not reuse RewardFinder or commerce Headless deployment receipts for this lane.

## Authority

No:
- production deploy;
- indexing;
- DNS;
- billing/purchase;
- credential/security change;
- publication;
- merge/mark-ready;
- Shopify mutation;
- WordPress production activation.

This manifest is staging-preparation evidence only.


## 2026-10-18 ZIP metadata hardening

Current exact head adds package-verifier negatives for:
- non-regular/symlink ZIP members with otherwise matching receipt/digest;
- unexpected ZIP compression metadata with otherwise matching receipt/digest.

Exact-head CI passed both new protections.

This improves package-admission assurance but does not replace independent inner archive retrieval/hash/member verification or WordPress runtime acceptance.


## 2026-10-18 category-query error handling

Current exact head changes `seo-authority-hub/wp-theme/front-page.php` so category rendering now checks `!is_wp_error($categories)` before iteration.

This is a runtime-affecting theme change, so earlier exact-head artifacts were retired as stale.

Current exact-head CI passes the updated theme.

Independent inner ZIP binding and isolated WordPress runtime acceptance remain required.


## 2026-10-18 Homepage category smoke

Latest exact head adds a dedicated Homepage category PHP smoke step to CI.

This is verification-only; the last runtime theme change remains the category-query error handling in `front-page.php`.

Current exact-head workflow passes the new smoke.

Independent inner ZIP binding and isolated WordPress runtime acceptance remain required.
