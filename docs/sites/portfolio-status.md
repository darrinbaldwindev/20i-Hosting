# 20i portfolio deployment status

Status date: 2026-10-28.

This public status file intentionally excludes private provider identifiers, account details, absolute server paths, credentials and private runtime receipts.

| Workload | Current repo state | Package/readiness state | 20i state | Current blocker / next action |
|---|---|---|---|---|
| GlobalShopCo | Shopify remains canonical commerce/catalogue authority | Not a canonical 20i WordPress deployment target | N/A | Preserve commerce boundary; do not migrate authority into WordPress |
| GlobalShopCo-Headless | `work/headless-product-identity@a972f315f2d2258046645adae02c7fc3adf69094` observed; zero `wp-content/` drift from seven-file anchor | Deterministic seven-file ZIP built twice; SHA-256 `49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`; exact-head CI `40640557835`/`122657449393` failed before execution with no steps/logs | BLOCKED_ON_PROVIDER_SESSION_AND_EXACT_HEAD_CI | Reuse ZIP only while zero deployment drift holds; resolve CI/account gate and authenticated My20i session, then isolated runtime smoke |
| SEO Authority Hub | PR #18 `26c92f2b6c2b8e39605590b605d0cfa92b4e66ab` observed | Exact-head run `40291455490`; jobs `121467250480` and `121467250606` failed before executable steps; no exact-run artifact; inner ZIP unavailable | HOLD_HEAD_MOVING_AND_INNER_PACKAGE_UNBOUND | Require successful exact-head CI + current artifact + inner ZIP binding + isolated staging authority before runtime |
| Affiliate-Websites / RewardFinder | `main@7277f3fa178be430e990132670e19b0112cc9c87`; support source `eeb05366347ab77a751f75565841294931354bd9` | Support audit MATCHED; theme ZIP P1 HOLD (10 dev/test members); My20i session unavailable; 2026-10-10 rollback historical only | BLOCKED_ON_THEME_PACKAGING_UNAUTHENTICATED_PROVIDER_SESSION_FRESH_ROLLBACK | Clear Affiliate #41 package, restore authenticated existing-authority My20i session, capture fresh rollback, then upload/smoke |
| Affiliate AU | 26 programme records; commercial status remains HOLD | Support payload audited; theme deployment package NOT accepted | BLOCKED / NO UPLOAD | Theme runtime-only package + exact manifest/hashes; current AU target/ingress verification; fresh files+DB rollback; then staging upload/smoke/receipt |
| Affiliate UK | 26 programme records; commercial HOLD | No independent UK artifact/target/provider admission | BLOCKED | Independent UK target, package, ingress, rollback, configuration and runtime admission required |
| Affiliate US | 23 programme records; commercial HOLD | No independent US artifact/target/provider admission | BLOCKED | Independent US target, package, ingress, rollback, configuration and runtime admission required |
| MyPrimeDelivery | observed `4aa64db8871b127f46e30458ac694fdc110e40aa`; canonical purpose remains Prime/product discovery | Synthetic/runtime evidence exists but canonical adopted deployable WordPress package still absent | BLOCKED_ON_CANONICAL_PACKAGE_ADOPTION | Adopt exact project-owned WordPress package, bind archive/hash/install/rollback evidence, then verify staging authority |

## Global rules

- `READY_TO_UPLOAD_20I` is admission, not deployment authority.
- No row authorizes provisioning, production, DNS, credentials/security, purchases, billing, commercial activation or publication.
- Stale artifact identities must never be substituted for current source.
- Private provider evidence belongs in private coordination records, not this public repository.


## Latest observations (non-authoritative head history)

- Commerce Headless: `507349f...` observed with zero deployment-file drift from the current seven-file anchor and M3 run `39109316335` SUCCESS.
- SEO Authority Hub: `f0a90b8...` observed with SEO validation run `39109456804` SUCCESS and artifact `12129274567`; branch remained active and staging hold remains.

These observations never replace the live-head checks in the Work handoff.

## Affiliate AU evidence addendum — 2026-10-25

This later, **Affiliate-specific** checkpoint supersedes the Affiliate/RewardFinder artifact-readiness shorthand in the 2026-10-18 table above; it does not revalidate unrelated portfolio rows.

- The support archive `11290703976` (source `eeb05366347ab77a751f75565841294931354bd9`) has previously verified outer/inner ZIP integrity and now **six of six** archived member SHA-256 digests matched independent reads of the exact Git source files. Evidence: [independent AU artifact audit](../checkpoints/AFFILIATE-AU-ARTIFACT-BYTE-AUDIT-2026-10-25.md).
- The separate theme archive `11258622460` (source `162e87755038e011225ffb773a5bd4e65f7dcb96`) passed prior ZIP-integrity checks but contains **10 development/test files** because `.github/workflows/theme-validate.yml` packages every theme file. **P1 maintainer disposition and packaging remediation/allowlist acceptance remain outstanding**. Do not treat the theme artifact as cleared for `READY_TO_UPLOAD_20I`.
- AU existing-site identity and authenticated File Manager/StackCP ingress remain **unverified**. The 2026-10-10 files+database backup is historical only, not a freshly verified rollback point. UK/US provider admission remains separate. Commercial programme status remains **75 HOLD / 0 READY**.
- No upload, provider change, WordPress runtime test, DNS change, backup deletion, publication or deployment authority is conveyed by the archive checks. **AU staging admission: BLOCKED / NO UPLOAD**.
