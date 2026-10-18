# 20i portfolio deployment status

Status date: 2026-10-18.

This public status file intentionally excludes private provider identifiers, account details, absolute server paths, credentials and private runtime receipts.

| Workload | Current repo state | Package/readiness state | 20i state | Current blocker / next action |
|---|---|---|---|---|
| GlobalShopCo | Shopify remains canonical commerce/catalogue authority | Not a canonical 20i WordPress deployment target | N/A | Preserve commerce boundary; do not migrate authority into WordPress |
| GlobalShopCo-Headless | `work/headless-product-identity` LIVE HEAD REQUIRED; seven-file deploy blob set last verified unchanged through docs-only churn | Reuse bound deployment blobs only after immediate zero-`wp-content/` drift check; current exact-head CI must be re-fetched | BLOCKED_ON_PROVIDER_INGRESS_AND_PREMUTATION_LIVE_HEAD_RECHECK | Fetch live head, verify zero deployment drift + seven blobs, build/hash package, then existing-authority provider ingress and isolated smoke |
| SEO Authority Hub | PR #18 LIVE HEAD REQUIRED; last observed `f0ca924c660fa1209ab8f250650d4dc854bbf8cf` while branch actively moving | Runtime/theme files changed during this CUB; previous CI artifacts are stale/unbound for deployment | HOLD_HEAD_MOVING_AND_INNER_PACKAGE_UNBOUND | Wait for stable exact head, exact-head CI, exact current artifact + independent inner ZIP binding, then isolated noindex WordPress runtime |
| Affiliate-Websites / RewardFinder | `main@256a64c519861258f0c44810380181127c66aa78`; current support source `eeb05366347ab77a751f75565841294931354bd9` | Theme/support artifacts remain byte-bound and source-current; prior files+DB backup captured 2026-10-10 11:56:32 Brisbane is historical rollback evidence | BLOCKED_ON_PROVIDER_EXISTING_IDENTITY_DIAGNOSTIC_REQUIRES_AUTHENTICATED_UI | Reuse current payload; in Work mode inspect existing StackCP/File Manager/FTP paths. Refresh/reverify a current pre-mutation rollback point immediately before any upload/configuration |
| Affiliate AU | 26 verified programme records in current support payload | Exact current staging bytes verified; rollback evidence exists but needs freshness recheck before mutation | PROVIDER INGRESS PENDING | Existing-authority File Manager/StackCP first; if ingress clears, refresh rollback point, upload/configure exact bytes, smoke, receipt—no production/commercial authority |
| Affiliate UK | 26 verified programme records in current support payload | Package data current but no UK provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| Affiliate US | 23 verified programme records in current support payload | Package data current but no US provider deployment admitted here | BLOCKED | Separate target/provider/authority verification required before upload |
| MyPrimeDelivery | default controller line now includes current SOP pointer; fixture/composition branches remain separate | M-03 v0.2.0 synthetic component PASS; 91 assertions PASS; 45 disposable WordPress runtime checks PASS; canonical adopted deployable package not demonstrated | BLOCKED_ON_CANONICAL_PACKAGE_ADOPTION | Select/adopt exact project-owned WordPress package, bind archive/hash/install/rollback evidence, then verify staging authority before 20i provisioning |

## Global rules

- `READY_TO_UPLOAD_20I` is admission, not deployment authority.
- No row authorizes provisioning, production, DNS, credentials/security, purchases, billing, commercial activation or publication.
- Stale artifact identities must never be substituted for current source.
- Private provider evidence belongs in private coordination records, not this public repository.
