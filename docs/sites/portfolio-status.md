# 20i portfolio deployment status

Status date: 2026-10-18.

This public status file intentionally excludes private provider identifiers, account details, absolute server paths, credentials and private runtime receipts.

| Workload | Current repo state | Package/readiness state | 20i state | Current blocker / next action |
|---|---|---|---|---|
| GlobalShopCo | Shopify remains canonical commerce/catalogue authority | Not a canonical 20i WordPress deployment target | N/A | Preserve commerce boundary; do not migrate authority into WordPress |
| GlobalShopCo-Headless | `work/headless-product-identity@9900055c338e69baaa7faa205a727cc69e3bcc0e` | Current source CI verified (`39097262279` SUCCESS); prior `1bdfcc3...` staging packet is STALE because runtime plugin bytes changed | BLOCKED_ON_PROVIDER_INGRESS_AND_FRESH_RUNTIME_PACKET | Repackage/hash exact current WordPress payload first; then use existing-authority My20i/StackCP ingress and isolated smoke—no new credentials/security changes |
| SEO Authority Hub | `GlobalShopCo-Headless PR #18@fad8f80272251f4be0e931e9090ea90afaad6d40` | Exact-head SEO Hub validation `39106754544` SUCCESS; CI staging artifact `12129000923` outer SHA-256 `422d550f...`; inner installable theme ZIP hash/member binding still unverified | BLOCKED_ON_INNER_PACKAGE_BINDING_AND_ISOLATED_RUNTIME_AUTHORITY | Independently bind inner ZIP, then isolated 20i/WordPress staging smoke with noindex/publication controls; keep separate from commerce Headless lane |
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
