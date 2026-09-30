# Initial portfolio status

**Status date:** 2026-09-30  
**Classification:** DATED READINESS SNAPSHOT / NOT CURRENT DEPLOYMENT AUTHORITY

This file preserves a bounded 20i-readiness snapshot. `UNKNOWN` means unverified and is blocking where required. Branch/SHA values below were preserved from then-current project context and were not freshly fetched as part of this file.

Do **not** use this table by itself to select a current deployment target, infer current repository heads, or authorize upload/provisioning/production actions. Before any execution, re-fetch the current repository/default branch/exact SHA, verify the applicable `READY_TO_UPLOAD_20I` contract, confirm the target tuple and current provider/account evidence, and obtain any required owner approval.

| Workload | Repo / branch / exact SHA | Implementation | Package ready | Config/env | DB/bootstrap | Tests | Rollback | `READY_TO_UPLOAD_20I` | Blocker at snapshot | Next verification action |
|---|---|---|---|---|---|---|---|---|---|---|
| GlobalShopCo | `GlobalShopCo` / `UNKNOWN` / `UNKNOWN` | Commerce/catalogue control repo present | N/A for canonical commerce | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | Not a 20i WordPress deployment; Shopify remains authority | Record only the integration boundary; do not migrate commerce authority |
| GlobalShopCo-Headless | `GlobalShopCo-Headless` / `work/headless-product-identity` / `18ec52cc7f62fd666f67ce20255555012b519308` | Present; practical 20i frontend path | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | No evidenced 20i package/contract verification yet | Fresh-fetch current repo/head, then validate build/runtime/package needs against that exact SHA |
| Affiliate-Websites Master | `Affiliate-Websites` / `main` / `b5731903f7f7aa74b10ee6090b8d1e0903d305b3` | Present; pre-upload readiness work reported | Reported readiness assets exist; exact package artifact unverified here | Fixtures/manifest reported; secrets and target env unverified | Fixtures reported; staging bootstrap unverified | Validator/smoke tests reported; results at SHA unverified here | Procedures reported; tested restore/rollback unverified | BLOCKED | Must execute this contract against a freshly verified exact SHA and target | Re-fetch current repo/head, run contract verification and produce a redacted result |
| Affiliate AU | `Affiliate-Websites` / `main` / `b5731903f7f7aa74b10ee6090b8d1e0903d305b3` | Market fixture reported | UNKNOWN | Market fixture reported; live approvals/config UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | Market/current commercial evidence and target package unverified | Re-fetch current repo/head, verify AU fixture, disclosures, approvals, and staging target |
| Affiliate UK | `Affiliate-Websites` / `main` / `b5731903f7f7aa74b10ee6090b8d1e0903d305b3` | Market fixture reported | UNKNOWN | Market fixture reported; live approvals/config UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | Fresh first-party/network referral evidence required | Re-fetch current repo/head, verify UK claims, disclosures, approvals, and staging target |
| Affiliate US | `Affiliate-Websites` / `main` / `b5731903f7f7aa74b10ee6090b8d1e0903d305b3` | Market fixture reported | UNKNOWN | Market fixture reported; live approvals/config UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | Actual publisher/account approvals and target package unverified | Re-fetch current repo/head, verify US network approvals, fixture, and staging target |
| MyPrimeDelivery | `MyPrimeDelivery` / `UNKNOWN` / `e611db4c7426244c3e66f8e7be462e64cee4f921` | WordPress-oriented implementation present | Not explicitly staging-package ready | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED | Explicit 20i staging package/readiness evidence is missing | Re-fetch current repo/head, build package declaration and run the contract at that exact SHA |

## Authority boundary

No row authorizes upload, provisioning, production, DNS, credentials, purchase, billing, or launch.

The 20i control repository coordinates hosting readiness only. Site repositories remain authoritative for application source/tests/builds/releases, Shopify remains the commerce authority where applicable, provider UI/API output is evidence rather than authority, and owner approval gates remain controlling.
