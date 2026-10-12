# Headless and affiliate SEO — 20i staging acceptance

Status: review-only addendum to READY_TO_UPLOAD_20I/v1. No hosting mutation authorized.

Applies to GlobalShopCo-Headless, Affiliate-Websites AU/UK/US and MyPrimeDelivery when deployed to an approved 20i staging target. Source repositories remain canonical; Shopify remains the product/price/checkout authority for GlobalShopCo.

## Required pre-upload evidence

- Exact site, repository, 40-character source SHA, source-current package hash and intended provider target ID.
- Real staging hostname verified from provider evidence; never substitute README placeholders or `example.invalid` into a public canonical.
- Explicit `noindex` and sitemap exclusion for staging, plus robots/HTTP-header behavior verified in runtime after upload.
- Staging-safe canonical host behavior; no redirect to live checkout or production host.
- Country-specific AU/UK/US alternates only when actual reciprocal page equivalents and canonical hosts are verified.
- No Product/Offer schema or purchase CTAs for unapproved or fixture-only products.
- Mail, payment, affiliate redirects, production webhooks and autonomous schedules suppressed in staging.
- Backup/rollback proof and separately granted owner upload authority.

## Separate public SEO and staging acceptance gates

The Affiliate-Websites offline country-SEO fixture validator checks **intended public, indexable, self-canonical pages**. Its `indexable: true` contract is **not** a staging deployment acceptance criterion. A staging page must remain `noindex` even if the public SEO fixture validator passes for an equivalent route. Do not make staging indexable merely to satisfy that validator.

Offline hostname syntax checks do not establish public DNS ownership, resolution safety, or provider identity. Before any authorized upload, separately verify the staging hostname against authenticated 20i provider evidence; after upload, verify actual HTTP robots/meta/header behavior and canonical/hreflang output. DNS resolution/rebinding, redirects and effective host ownership require runtime evidence. UNKNOWN is HOLD.

## Post-upload fail-closed checks

1. Staging hostname serves intended site with HTTPS and correct source version marker.
2. No accidental indexable pages, live sitemaps, production canonical or hreflang leakage.
3. Missing-product/zero-results state does not fabricate price, inventory or offers.
4. Headless product routes use Shopify-authoritative data only in approved test mode.
5. Links and assets work without pointing to private/admin endpoints.
6. Restore and rollback evidence is available.
7. Record exact SHA/hash, target, tests, no-index result and any blocker.

Any UNKNOWN or FAIL remains BLOCKED. `READY_TO_UPLOAD_20I` is **not** permission to upload. No provider account changes, paid backups, DNS changes or live deployment.
