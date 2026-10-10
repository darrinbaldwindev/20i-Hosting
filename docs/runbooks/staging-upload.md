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


## FTP/SFTP existing-authority ingress check

When File Manager is unavailable, FTP/SFTP may be considered only as an **existing-authority** fallback.

Before any connection attempt:

1. inspect the package read-only for current FTP/SFTP lock state;
2. confirm whether an existing package FTP identity/credential is already available without reset or creation;
3. confirm the package's current 20i FTP/SFTP endpoint;
4. confirm no unlock, password reset, new FTP account, Master FTP enablement, IP allow-list change, API-key creation, SSH-key creation, or other security/credential mutation is required.

Allowed only when all of the above are already satisfied.

If FTP/SFTP is locked, credentials are unavailable, or a credential/security change would be required:
- classify `FTP_SFTP_INGRESS = BLOCKED_BY_AUTHORITY`;
- do not unlock/reset/create;
- return to the controller.

Master FTP is not an automatic fallback because enabling it and adding an allowed IP are security-setting mutations.

The 20i Reseller API is not an automatic fallback because API use requires an API credential and therefore cannot be introduced under a no-new-credentials boundary.

When an existing-authority FTP/SFTP path is available:
- recheck source-currentness;
- verify rollback freshness;
- upload exact independently verified bytes only;
- do not expose credentials in logs/receipts;
- run the same canonical smoke and receipt process as File Manager.


## Existing FTP identity -> StackCP File Manager fallback

20i documents a compatibility login path where each hosting package has a limited StackCP user that can authenticate using the website's existing FTP details.

This is preferred over creating a new StackCP user when the current authority forbids new credentials.

Allowed read-only discovery sequence:

1. manage the exact hosting package in My20i;
2. inspect the existing FTP Details section;
3. determine whether the package's first FTP account already exists and whether its existing password is available without reset;
4. do **not** record the password in logs, issues, screenshots intended for durable evidence, or receipts;
5. use the existing FTP identity to attempt StackCP login only if no credential creation/reset is required;
6. once inside StackCP, inspect whether File Manager is functional for the exact package;
7. if functional, treat this as an existing-authority File Manager ingress path and continue the normal exact-byte staging flow.

Hard stops:
- no password reset;
- no new FTP account;
- no new StackCP user;
- no permission expansion;
- no Master FTP enablement;
- no FTP unlock/IP allow-list mutation unless separately authorized.

If the existing identity is absent or unusable without one of those changes:
`STACKCP_EXISTING_IDENTITY_INGRESS = BLOCKED_BY_AUTHORITY`.
