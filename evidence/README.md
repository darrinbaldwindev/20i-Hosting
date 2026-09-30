# Evidence convention

This directory is an append-only index of **reviewed, redacted, non-secret** deployment and change receipts. Raw provider responses, screenshots, credentials, environment values, database dumps, personal data, and backup archives belong in the owner's approved secure evidence/secret storage, not Git.

Recommended path:

```text
evidence/YYYY/MM/DD/<batch-or-change-id>/<checkpoint>-<receipt-id>.yaml
```

Required receipt fields:

```yaml
schema: 20i-change-receipt/v1
batch_id: 20I-MASTER-001
checkpoint: CP-XX
timestamp_utc: ISO-8601
operator: named human or approved agent
target_id: redacted or non-secret provider ID
environment: discovery|staging|production
action: concise description
authority: approval receipt ID or READ_ONLY
request_id: provider correlation ID or N/A
source_commit_sha: full SHA or N/A
artifact_sha256: hash or N/A
resources_before: []
resources_after: []
expected_charge: exact currency and amount
quoted_charge: exact currency and amount or UNKNOWN
actual_charge: exact currency and amount or UNKNOWN
result: PASS|FAIL|BLOCKED|ROLLED_BACK|NOOP_ALREADY_SATISFIED
evidence_references: []
evidence_sha256: []
rollback_status: NOT_NEEDED|READY|EXECUTED|FAILED
notes: non-secret only
```

Never overwrite a receipt. Correct an error with a new receipt referencing the superseded record. Hash retained raw evidence where practical. Any secret exposure requires stopping the batch and following the owner's incident process.
