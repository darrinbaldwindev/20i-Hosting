# Staging upload runbook

1. Verify the site has a current `READY_TO_UPLOAD_20I/v1` result for one exact SHA.
2. Confirm CP-02 discovery evidence and CP-03/G-03 approval identify the package type, location, target label, zero charge, quota impact, and rollback path.
3. Read inventory before mutation. If the deterministic target already exists, reconcile immutable properties; do not duplicate it.
4. Capture target baseline and pre-change backup/export where applicable.
5. Upload/install the exact verified artifact without production secrets, domains, analytics, mail, payments, affiliate conversion, or webhooks.
6. Apply declared staging placeholders, bootstrap/migrations, permalink/rewrite settings, and safe fixtures idempotently.
7. Verify runtime SHA and artifact hash using two independent signals.
8. Run the contract smoke tests and post-upload checks.
9. Write a redacted append-only receipt. Stop on ambiguity, drift, unexpected charge, or failed recovery readiness.

This runbook does not authorize resource creation or production promotion.
