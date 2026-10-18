# 20i Current Work-Mode Handoff — 2026-10-18

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

Affiliate source:
`main@256a64c519861258f0c44810380181127c66aa78`

Support artifact:
- ID `11290703976`
- inner ZIP SHA-256 `9fc95be766f85142a2aa5a9d33d8cb303abca4bdf68b1e87f6957d2094d71517`

Theme artifact:
- ID `11258622460`
- inner ZIP SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee`

Fresh source check on 2026-10-18 found Affiliate `main` unchanged from the already admitted source-current state.

Do not regenerate these packages unless upload-member source changes.

## Existing rollback evidence

Historical files + DB backup:
`2026-10-10 11:56:32 Australia/Brisbane`

This is historical rollback evidence, not automatically a fresh pre-mutation snapshot on 2026-10-18.

Before any mutation:
- capture or reverify a current rollback point;
- retain zero-paid-backup constraint.

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

Immediately before mutation:
1. recheck Affiliate exact source-currentness;
2. refresh/reverify rollback;
3. upload exact current theme/support bytes only;
4. configure AU staging-only constants/private fixture paths;
5. activate/verify theme + MU plugin;
6. configure exact page/programme bindings;
7. run canonical RewardFinder post-upload smoke;
8. record a redacted deployment receipt with exact source/hash/target/smoke/rollback/prod-untouched evidence.

---

# Priority 2 — GlobalShopCo Headless isolated runtime

Execute only after Priority 1 is blocked or complete and an existing-authority provider ingress path is available.

## Current exact source

PR #5 branch:
`work/headless-product-identity`

Exact source:
`9900055c338e69baaa7faa205a727cc69e3bcc0e`

Source tree:
`c31f85bfb38921b3be9eade3dacdaa7d9ae8b3c5`

Hosted M3 validation:
- run `39097262279`
- job `117586186652`
- SUCCESS.

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
`GlobalShopCo-Headless PR #18@74d7c9fb7a59166602b44dd8219bc5f9b4aacdbe`

Tree:
`c70b1b58e0919a9a1520bbe9877ea80fc6b664a6`

Exact-head SEO Hub validation:
- run `39107199321`
- job `117615534864`
- SUCCESS

CI artifact:
- name `seo-hub-staging-candidate`
- ID `12128713743`
- outer size `8728 bytes`
- outer SHA-256 `063ffcb05db3f8a40b06b809adda00c3ffa518ca1f0ad8f1be39d66bd06060a2`
- expires 2026-10-25

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
- RewardFinder: exact bytes current; authenticated provider existing-identity diagnostic required.
- Headless: current source bound; deterministic package still required; same provider ingress class.
- MyPrimeDelivery: package adoption blocked.

No previous handoff may override a newer exact source or authority boundary in this document.
