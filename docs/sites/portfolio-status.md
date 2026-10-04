# 20i portfolio deployment status

Status date: 2026-10-04.

This public status file intentionally excludes private provider identifiers, account details, absolute server paths, credentials and private runtime receipts.

| Workload | Current repo state | Package/readiness state | 20i state | Current blocker / next action |
|---|---|---|---|---|
| GlobalShopCo | Shopify remains canonical commerce/catalogue authority | Not a canonical 20i WordPress deployment target | N/A | Preserve commerce boundary; do not migrate authority into WordPress |
| GlobalShopCo-Headless | `work/headless-product-identity@be9e45b2bc3cf6c903c832c6ccaf29e838c827e0` | Plugin/theme exact-head CI verified; fail-closed regression verified | BLOCKED_FOR_COMMERCIAL_ACCEPTANCE | Canonical positive Storefront-visible publication approval signal is still undefined; isolated negative/fail-closed staging only |
| Affiliate-Websites / RewardFinder | `main@960a65c5afa5433ec6137ad62513cb36a77b36ea`; current support source `eeb05366347ab77a751f75565841294931354bd9` | 75-programme support package independently byte-bound and source-current | BLOCKED_ON_LIVE_UPLOAD_PATH_AND_RUNTIME_SMOKE | Verify staging upload path, capture rollback baseline, deploy exact payload, run canonical smoke, record receipt |
| Affiliate AU | 26 verified programme records in current support payload | Current staging support bytes verified | STAGING EXECUTION PENDING | Live upload/config/smoke only; no production/commercial authority |
| Affiliate UK | 26 verified programme records in current support payload | Package data current but no UK provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| Affiliate US | 23 verified programme records in current support payload | Package data current but no US provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| MyPrimeDelivery | `dfa202b8a6b99efc256fcd43bf3fa804b4bf24f6` | No demonstrated deployable project-owned WordPress package | BLOCKED | Produce deterministic installable theme/plugin package, tests, hash and rollback notes before 20i provisioning |

## Global rules

- `READY_TO_UPLOAD_20I` is admission, not deployment authority.
- No row authorizes provisioning, production, DNS, credentials/security, purchases, billing, commercial activation or publication.
- Stale artifact identities must never be substituted for current source.
- Private provider evidence belongs in private coordination records, not this public repository.
