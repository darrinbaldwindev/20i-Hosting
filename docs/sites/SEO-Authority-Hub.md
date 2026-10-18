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
`LIVE_LOOKUP_REQUIRED_BEFORE_PACKAGE_ADMISSION`

Tree:
`1208d9e046c8843a9afeda105a068955b188081d`

## Exact-head CI

Workflow:
`SEO Hub validation`

Run:
`39107837987`

Job:
`117617431683`

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

### Historical packet warning

Any exact run/job/artifact details below are historical observations only while `HOLD_HEAD_MOVING_AND_INNER_PACKAGE_UNBOUND` is active. They must be re-fetched after the branch stabilizes before staging admission.

## Current CI artifact

Artifact:
`seo-hub-staging-candidate`

Artifact ID:
`12129276677`

Outer artifact size:
`8818 bytes`

Outer artifact SHA-256:
`841cf6d98674a7dbf356b80e242941f632b87c7e127930d6db8cf04a177fd030`

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

`READY_TO_UPLOAD_20I = HOLD_HEAD_MOVING_AND_INNER_PACKAGE_UNBOUND`

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


## 2026-10-18 Article metadata smoke

Latest exact head adds a dedicated Article metadata PHP smoke step to CI.

This is verification-only; no theme/runtime file changed in this latest commit.

Current exact-head workflow passes the article metadata smoke in addition to the existing homepage-category and other source checks.


## Active head-churn hold

During CUB Chat Max ×96, PR #18 advanced repeatedly while evidence was being reconciled.

Last observed live head:
`f0ca924c660fa1209ab8f250650d4dc854bbf8cf`

Current mergeability state at that observation:
`clean`

A recent successor changed real theme/runtime files, including:
- `seo-authority-hub/wp-theme/front-page.php`;
- `seo-authority-hub/wp-theme/functions.php`;
- `seo-authority-hub/wp-theme/style.css`.

Therefore no previously uploaded CI artifact or outer digest may be promoted as the current staging package merely by updating metadata.

Clear this hold only when:
1. a live exact head is fetched;
2. the head remains stable long enough to bind source and CI;
3. exact-head SEO Hub validation succeeds;
4. the exact current CI artifact is retrieved;
5. the inner installable ZIP is independently hashed and member-verified;
6. isolated WordPress staging/runtime authority exists.

Until then:
`SEO_HUB_STAGING_PACKET = STALE_OR_UNBOUND`
