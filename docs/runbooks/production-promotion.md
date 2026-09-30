# Production promotion runbook

Production promotion is prohibited until Owner Gate G-05 names the exact workload, target, source SHA, artifact hash, cost, window, verifier, DNS scope, and tested rollback version.

1. Re-read the approval and expire it on any tuple drift.
2. Re-inventory the target and do-not-touch register.
3. Verify a current owner-controlled pre-change backup and tested rollback.
4. Confirm staging results belong to the same artifact and remain current.
5. Freeze release input and relevant content/commercial evidence.
6. Promote the already-verified artifact; do not rebuild from a branch.
7. Verify runtime SHA/hash, HTTPS, redirects, health, journeys, privacy/disclosure, indexing, logs, monitoring, and approved DNS only.
8. Observe for the approved window. Roll back on failed acceptance; do not patch forward without a new plan.
9. Record provider, deployment, backup, monitoring, charge, and owner receipts.
10. Stop at G-07 for final live acceptance.
