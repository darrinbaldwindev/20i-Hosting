# 20i portfolio deployment status

Status date: 2026-10-04.

This public status file intentionally excludes private provider identifiers, account details, absolute server paths, credentials and private runtime receipts.

| Workload | Current repo state | Package/readiness state | 20i state | Current blocker / next action |
|---|---|---|---|---|
| GlobalShopCo | Shopify remains canonical commerce/catalogue authority | Not a canonical 20i WordPress deployment target | N/A | Preserve commerce boundary; do not migrate authority into WordPress |
| GlobalShopCo-Headless | `work/headless-product-identity@1bdfcc3ddf47b25f9ccb6a05ee5e439bdc06181f` | Canonical publication signal implemented; exact-head CI run `38014043056` SUCCESS | BLOCKED_ON_PROVIDER_INGRESS_FOR_RUNTIME_ACCEPTANCE | Use existing My20i/StackCP ingress only: My20i File Manager -> existing assigned StackCP user -> existing FTP identity/StackCP -> already-unlocked FTP/SFTP; no new credentials/security changes |
| Affiliate-Websites / RewardFinder | `main@960a65c5afa5433ec6137ad62513cb36a77b36ea`; current support source `eeb05366347ab77a751f75565841294931354bd9` | 75-programme support package independently byte-bound and source-current; rollback captured 2026-10-10 11:56:32 Brisbane | BLOCKED_ON_PROVIDER_FILE_INGRESS_WITH_ROLLBACK_CAPTURED | Preferred ingress: My20i File Manager -> existing assigned StackCP user -> existing FTP identity/StackCP -> already-unlocked FTP/SFTP; stop before any new credential/security change |
| Affiliate AU | 26 verified programme records in current support payload | Current staging bytes verified; rollback captured | PROVIDER INGRESS PENDING | Use File Manager if restored or existing-authority FTP/SFTP only; then upload/config/smoke—no production/commercial authority |
| Affiliate UK | 26 verified programme records in current support payload | Package data current but no UK provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| Affiliate US | 23 verified programme records in current support payload | Package data current but no US provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| MyPrimeDelivery | `dfa202b8a6b99efc256fcd43bf3fa804b4bf24f6` | No demonstrated deployable project-owned WordPress package | BLOCKED | Produce deterministic installable theme/plugin package, tests, hash and rollback notes before 20i provisioning |

## Global rules

- `READY_TO_UPLOAD_20I` is admission, not deployment authority.
- No row authorizes provisioning, production, DNS, credentials/security, purchases, billing, commercial activation or publication.
- Stale artifact identities must never be substituted for current source.
- Private provider evidence belongs in private coordination records, not this public repository.
