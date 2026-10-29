# 20i Current Work-Mode Handoff — current through 2026-10-28 (post CUB Work Max)

Status: CURRENT EXECUTION PACKET / STAGING ONLY

This packet supersedes older operational handoffs where exact source identities conflict with the state below.

## Hard boundaries

Do not:
- deploy to production;
- change DNS;
- purchase/enable paid backup products;
- change billing;
- create/reset credentials;
- unlock FTP/SFTP;
- create/assign StackCP users;
- enable Master FTP;
- change IP allow-lists;
- create API/SSH/Git credentials;
- change Shopify publication state;
- mint product approval for testing;
- merge/mark-ready;
- widen authority.

Stop at login/2FA or any required credential/security mutation.

---

# Priority 1 — RewardFinder AU staging

## Exact source/package state

Affiliate source observed:
`main@7277f3fa178be430e990132670e19b0112cc9c87`

Re-fetch live head immediately before admission.

Support artifact:
- ID `11290703976`
- inner ZIP SHA-256 `9fc95be766f85142a2aa5a9d33d8cb303abca4bdf68b1e87f6957d2094d71517`

Theme artifact (historical candidate — **NOT CLEARED FOR UPLOAD**):
- ID `11258622460`
- inner ZIP SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee`
- 57 members;
- 10 members under `affiliate-master/tests/`;
- packaging workflow currently includes development/test files.

Current admission:
- logical technical classification: `docs/checkpoints/AFFILIATE-AU-THEME-PACKAGING-TECHNICAL-REVIEW-2026-10-27.md`;
- exact source tree: 57 regular files = 47 runtime/theme + 10 development tests; current source has no symlink entries;
- recommended package repair: positive runtime allowlist + fail-closed filesystem/member validation + deterministic post-build manifest verification;
- independent Affiliate #41 reviewer/maintainer ACK and implementation evidence still missing;
- support six-member source/hash audit: MATCHED;
- theme package: **P1 HOLD** under Affiliate-Websites #41;
- do not upload the historical theme ZIP;
- a remediated/accepted runtime-only theme artifact with fresh manifest/hashes is required before staging mutation.

Current Affiliate source drift since the historical support source is documentation/controller/summary-only in the latest repository classifications, but exact upload members must still be rebound immediately before mutation.

## Existing rollback evidence

Historical files + DB backup:
`2026-10-10 11:56:32 Australia/Brisbane`

This is historical rollback evidence, not automatically a fresh pre-mutation snapshot on 2026-10-18.

Before any mutation:
- capture or reverify a current rollback point;
- retain zero-paid-backup constraint.

## Current repository-only ingress/rollback matrix

Use:
`docs/checkpoints/AFFILIATE-AU-INGRESS-ROLLBACK-GATE-MATRIX-2026-10-27.md`

It already classifies repository evidence vs private provider UNKNOWNs. Do not repeat repo-only discovery.

Current provider-side UNKNOWNs requiring authenticated read-only inspection:
- File Manager feature state;
- current File Manager functionality;
- existing branded File Manager URL;
- assigned StackCP user;
- existing FTP identity usability without reset;
- FTP/SFTP lock state;
- current quota / zero-charge state.

The 2026-10-10 backup is historical only. Fresh files + DB rollback evidence is required immediately before upload.

## Latest provider-session evidence — 2026-10-28

Latest Work runs reached the My20i login surface but had no authenticated session.

Therefore:
- File Manager/package-feature/StackCP/FTP provider inventory is **NOT_RUN** in the latest Work cycle;
- do not claim ingress cleared;
- do not enter/reset/create credentials;
- resume provider diagnostics only from an already-authenticated owner session.

## Provider-ingress diagnostic order

1. Retry My20i File Manager once.
2. Read-only inspect whether File Manager is enabled for the exact package.
3. If an existing branded File Manager URL is already configured, test it.
4. Read-only inspect existing **StackCP Users Assigned**.
5. If a user is already assigned, use **Log in as User** and test StackCP File Manager.
6. Otherwise inspect the first existing FTP identity without reset/create.
7. If the existing identity is already usable, try the documented limited StackCP compatibility login.
8. Inspect FTP/SFTP lock state.
9. Direct FTP/SFTP may be used only if already unlocked with existing usable credentials.
10. Otherwise STOP.

No unlock/reset/create/permission change.

## If ingress works

Ingress success alone is **not** sufficient to upload.

Before mutation:
1. require Affiliate #41 theme packaging disposition/acceptance;
2. obtain a remediated or explicitly accepted runtime-only theme artifact and bind exact source/member manifest + hashes;
3. recheck Affiliate exact source-currentness;
4. refresh/reverify rollback;
5. upload only the exact accepted theme/support bytes;
6. configure AU staging-only constants/private fixture paths;
7. activate/verify theme + MU plugin;
8. configure exact page/programme bindings;
9. run canonical RewardFinder post-upload smoke;
10. record a redacted deployment receipt with exact source/hash/target/smoke/rollback/prod-untouched evidence.

---

# Priority 2 — GlobalShopCo Headless isolated runtime

Execute only after Priority 1 is blocked or complete and an existing-authority provider ingress path is available.

## Current exact source

PR #5 branch:
`work/headless-product-identity`

Exact source:
`LIVE LOOKUP REQUIRED BEFORE PACKAGE BUILD`

Deployment-byte anchor remains the seven-file manifest only if live compare shows zero `wp-content/` drift.

Hosted M3 validation:
- exact live-head run/job: **RE-FETCH REQUIRED**
- last observed compatible CI is evidence history only, not a substitute for current-head verification.

The old `1bdfcc3...` runtime packet is **STALE_FOR_CURRENT_SOURCE** and must not be deployed.

## Current WordPress source manifest

Canonical file manifest:
`docs/sites/GlobalShopCo-Headless-current-source-manifest-2026-10-18.md`

Current deployable source set:
- 7 files;
- 31,765 raw source bytes;
- plugin tree `d80a32f589ce145e4ebb20aea4fa9514ac40a7cf`;
- theme tree `c7c83fe4dd507857bb0da6d3fa72c1907020b44e`.

Before provider upload:
1. fetch the seven exact files from `9900055c...`;
2. verify their Git blob IDs against the manifest;
3. build a deterministic staging package;
4. record package SHA-256;
5. recheck source-currentness;
6. capture/reverify rollback.

## Current deterministic commerce package

Work mode built the seven-file commerce package twice from the bound deployment payload.

Both copies matched:
`49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`

Latest observed PR #5:
`a972f315f2d2258046645adae02c7fc3adf69094`

Fresh Work comparison still found:
`WP_CONTENT_DRIFT = ZERO`

Do not rebuild merely because non-deployment files advance. Rebuild only if live compare detects deployment drift.

Current exact-head CI:
- run `40640557835`
- job `122657449393`
- FAILURE before execution;
- no executable steps/logs.

Thus package bytes are prepared, but runtime admission remains blocked on current-head CI plus authenticated provider access.

## Runtime acceptance

Use:
`GlobalShopCo-Headless/docs/20I_POST_UPLOAD_SMOKE.md`

Canonical positive publication signal:
- metafield `globalshopco.publication_status`;
- type `single_line_text_field`;
- sole positive value `APPROVED`;
- blocking tags override approval.

Do not alter/mint approval for testing.

Required matrix:
- absent -> blocked;
- malformed/wrong type/non-positive -> blocked;
- APPROVED + blocking tag -> blocked;
- approved + invalid/unavailable variant -> downstream blocked;
- approved + valid available canonical variant -> one Shopify cart handoff;
- revocation/non-positive transition -> checkout disappears on next canonical read.

Record exact runtime/deployment receipt and keep production untouched.

---

# Priority 3 — SEO Authority Hub

Execute only after RewardFinder/commerce Headless work is blocked or complete and only with isolated staging authority.

Exact source:
`GlobalShopCo-Headless PR #18@26c92f2b6c2b8e39605590b605d0cfa92b4e66ab`

Latest Work evidence:
- exact-head run `40291455490` = FAILURE before execution;
- jobs `121467250480`, `121467250606` = zero-step failures;
- exact-run artifacts = none;
- inner installable ZIP = unavailable/unverified.

State remains:
`HOLD_HEAD_MOVING_AND_INNER_PACKAGE_UNBOUND`

Before any 20i upload:
1. independently retrieve and hash the inner WordPress theme ZIP;
2. verify the inner manifest and all members against exact source;
3. confirm rejected/experimental publication-gate files are not inadvertently included;
4. recheck exact source-currentness;
5. establish fresh isolated rollback evidence;
6. use isolated noindex WordPress staging only;
7. run `seo-authority-hub/WORDPRESS-RUNTIME-ACCEPTANCE.md`;
8. preserve publication HOLD.

Do not reuse commerce Headless package/runtime receipts for this lane.

### SEO Hub head-churn gate

PR #18 was actively changing runtime/theme and CI files during the current chat cycle.

Do not upload any previously recorded SEO Hub artifact until:
- live head is stable;
- exact-head CI is green;
- the exact current artifact is retrieved;
- inner ZIP hash/members are independently verified.

# Priority 4 — MyPrimeDelivery

Do not provision a new 20i target yet.

Current blocker:
`MYPRIME_20I_ADMISSION_BLOCKED_ON_CANONICAL_PACKAGE_ADOPTION`

The accepted synthetic/runtime evidence does not demonstrate an adopted project-owned deployable WordPress application package.

Canonical purpose:
Amazon Prime-eligible product/category discovery, not courier/last-mile dispatch.

Resume only when exact project-owned package/adoption evidence appears.

---

# Controller

Current 20i state:
- RewardFinder: support bytes audited; historical theme ZIP is held because it includes development/test members; authenticated provider existing-identity diagnostic and fresh rollback also required.
- Headless: seven-file deterministic package BUILT/HASHED (`49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`); current-head CI remains failed before steps, source drift must be rechecked before any use, and authenticated provider ingress/fresh rollback remain blocked. No upload.
- MyPrimeDelivery: package adoption blocked.

No previous handoff may override a newer exact source or authority boundary in this document.
