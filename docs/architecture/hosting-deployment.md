# Hosting and deployment architecture

## Decision: one server/location first

Begin with one 20i server/location to reduce operational complexity while staging and recovery are proven. A US default location is acceptable; the exact provider-native location ID is `TBD` pending read-only entitlement and location discovery. Treat location as immutable unless current 20i documentation proves otherwise.

This decision does not authorize purchase or provisioning. Resource creation requires current zero-charge evidence (or an owner-approved exact quote) and Owner Gate G-03.

## Authority boundaries

```text
Site repo @ exact SHA -> reproducible artifact -> 20i staging -> verified artifact
                                                      |
                                                      v
                                         explicit owner production gate
                                                      |
                                                      v
                                                20i production
```

- GlobalShopCo remains the Shopify commerce/catalogue/order authority.
- GlobalShopCo-Headless is the practical 20i-hosted frontend path.
- Affiliate-Websites is the strongest initial staging-upload candidate.
- MyPrimeDelivery has WordPress-oriented implementation but still needs an explicit staging package.
- WordPress is presentation/editorial infrastructure; canonical commercial data and order authority stay in their approved systems.

## Environments

1. **Discovery:** read-only provider inventory and entitlement reconciliation.
2. **Staging:** non-public, no-index, mail-suppressed, no live tracking, payments, production webhooks, or production credentials.
3. **Production:** admitted only after the exact SHA, artifact hash, tests, backup, rollback, target, cost, and maintenance window are owner-approved.

## Recovery and evidence

Use owner-controlled encrypted off-provider backups; paid Timeline Backups are not authorized. Every mutation is idempotent, has a pre-read, deterministic label, current approval receipt, recovery path, and append-only redacted receipt. After an ambiguous mutation or timeout, stop writes and reconcile inventory before any retry.
