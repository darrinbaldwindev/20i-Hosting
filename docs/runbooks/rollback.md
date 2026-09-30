# Rollback runbook

## Triggers

Rollback on failed acceptance, runtime/artifact mismatch, data-integrity uncertainty, critical regression, unexpected charge, unauthorized DNS/credential change, or loss of a required security/control boundary.

## Procedure

1. Stop further writes and preserve logs, provider request IDs, timestamps, and current inventory.
2. Notify the owner under the applicable approval/incident path.
3. Identify whether the attempted mutation occurred. Treat ambiguous outcomes as `UNKNOWN`.
4. Restore the previously verified artifact and, only when required, the declared database/files backup.
5. Verify hashes, schema/data integrity, runtime marker, HTTPS, critical journeys, integrations, and logs.
6. Restore prior DNS only when that exact rollback was approved; preserve TTL-aware evidence.
7. Record result as `ROLLED_BACK` or `FAILED`; do not erase evidence or patch forward without a new approved plan.

Production restore or destructive cleanup always requires exact owner approval.
