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
`fad8f80272251f4be0e931e9090ea90afaad6d40`

Tree:
`601a3cfd31beb5e5363d3e61e5650e9a1f3c530f`

## Exact-head CI

Workflow:
`SEO Hub validation`

Run:
`39106754544`

Job:
`117614149845`

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
`12129000923`

Outer artifact size:
`8728 bytes`

Outer artifact SHA-256:
`422d550fb8599fce30022282ce5af8855f6561c1ed94c768d1bdb35630527eb1`

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
