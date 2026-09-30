# `READY_TO_UPLOAD_20I` contract

`READY_TO_UPLOAD_20I` is a release-admission result, not deployment authority. A site is `READY` only when every required item below is evidenced for one exact full commit SHA and intended staging target. Any unknown or failed required item makes the result `BLOCKED`.

## Required declaration

```yaml
contract: READY_TO_UPLOAD_20I/v1
site: exact workload name
repository: canonical repository URL
branch: context only
source_commit_sha: full 40-character SHA
artifact_sha256: SHA-256 or N/A with reason
target_environment: staging
result: READY|BLOCKED
verified_at_utc: ISO-8601
verified_by: named verifier
evidence: []
unknowns: []
```

## Admission checklist

### 1. Package/source presence

- Canonical repository is named and accessible through an approved path.
- Deployable source/package exists at the exact SHA; working tree is clean.
- The package excludes secrets, backups, build caches, development-only data, and unrelated repository history.

### 2. Dependencies

- Dependency manifests and lockfiles are present and internally consistent.
- Required plugins/themes/modules and licences are declared; abandoned or unreviewed components are blocked.
- Install commands do not require interactive production credentials.

### 3. PHP and WordPress requirements

- Supported PHP range, PHP extensions, WordPress core range, web-server assumptions, and filesystem permissions are documented.
- Theme/plugin activation order, WP-CLI needs, cron needs, and prohibited host capabilities are explicit.
- Compatibility is verified against the intended 20i package type; otherwise `BLOCKED`.

### 4. Database/bootstrap

- Schema/migrations, bootstrap sequence, seed/fixture boundary, and idempotency behavior are documented.
- URL/domain transformations and WordPress serialized-data handling are safe and repeatable.
- Production personal/commercial data is not required for the first staging test.

### 5. Environment placeholders

- `.env.example` or equivalent contains names and non-secret descriptions only.
- Required/optional variables, secret-store ownership, rotation needs, and staging-safe substitutes are declared.
- No real credentials, tokens, private keys, SMTP, payment, affiliate, analytics, webhook, or production database values are present.

### 6. Rewrites and permalinks

- Required rewrite rules, permalink structure, base path, redirects, canonical-host behavior, and HTTPS assumptions are documented.
- Rules are safe for a temporary staging hostname and do not force a production hostname.

### 7. Assets

- Required static/media assets are present or have an approved deterministic retrieval step.
- Asset URLs, case sensitivity, cache/version behavior, rights/licences, and missing-asset checks are documented.

### 8. Build reproducibility

- Toolchain versions and lockfiles are pinned sufficiently to reproduce the artifact.
- Build is tied to the exact SHA; artifact hash and manifest are recorded.
- Production promotion reuses the verified artifact and does not rebuild a floating branch.

### 9. Backup and rollback

- Pre-change files/database backup procedure and owner-controlled storage destination are declared.
- Last known-good artifact/SHA, restore steps, rollback trigger, expected recovery time, and verifier are named.
- Rollback has been exercised in staging or remaining uncertainty is explicitly blocking.

### 10. Smoke tests

- Anonymous pages, admin/login where applicable, health endpoint, links/assets, forms with mail suppressed, redirects, accessibility baseline, logs, and representative workflows have executable checks.
- Payment, conversion, affiliate, email, and production webhooks are disabled or use approved test/sandbox behavior.

### 11. Post-upload verification

- Running release is verified by both artifact/deployment manifest and a read-only runtime version marker.
- HTTPS, temporary hostname, no-index, mail suppression, asset loading, database state, scheduled tasks, logs, and critical journeys are checked.
- Receipt records target provider ID, exact SHA, artifact hash, test results, charge (`0.00` or approved exact amount), and rollback readiness.

## Decision rule

`READY` means “eligible for a separately approved staging upload.” It never means authorized for provisioning, credential changes, DNS changes, production promotion, publication, billing, or launch.
