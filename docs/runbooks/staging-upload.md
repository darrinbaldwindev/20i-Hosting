# Staging upload runbook

1. Verify the site has a current `READY_TO_UPLOAD_20I/v1` result for one exact SHA.
2. Confirm the exact artifact identity, package source SHA, inner/upload hash, and checksum evidence.
3. **Immediately before provider mutation, re-check source-currentness.** If any declared upload-member source changed after the package source SHA, mark the artifact `STALE_FOR_CURRENT_SOURCE` and stop. A valid historical hash does not make stale bytes deployable.
4. Confirm CP-02 discovery evidence and CP-03/G-03 approval identify the package type, location, target label, zero charge, quota impact, and rollback path.
5. Read inventory before mutation. If the deterministic target already exists, reconcile immutable properties; do not duplicate it.
6. Capture target baseline and pre-change backup/export where applicable. Do not purchase optional backup products unless separately authorized.
7. Upload/install only the exact independently verified, source-current artifact. Do not substitute a historical artifact, floating branch build, or locally rebuilt package.
8. Keep production secrets, domains, analytics, mail, payments, affiliate conversion, webhooks and owner-specific tracking out of first staging unless separately authorized.
9. Apply declared staging placeholders, bootstrap/migrations, permalink/rewrite settings, and safe fixtures idempotently.
10. Verify runtime identity using two independent signals where practicable: artifact/deployment manifest plus a read-only runtime marker or exact file/hash evidence.
11. Run the workload's canonical smoke tests and post-upload checks.
12. Write a redacted append-only receipt recording exact source SHA, artifact hash, target identity/class, mutation path used, smoke results, charge state, rollback readiness and explicit production-untouched status.
13. Stop on ambiguity, source drift, unexpected charge, target mismatch, failed recovery readiness, or any credential/security/DNS/production gate.

This runbook does not authorize resource creation, production promotion, DNS changes, credential/security changes, purchases, billing changes or publication.
