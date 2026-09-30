# WordPress / 20i operational SOP

## Intake

Record owner, site, environment, criticality, data classification, recovery objective, package/site IDs, DNS, PHP/WordPress/theme/plugin versions, licences, integrations, users, backup state, exact source SHA/artifact, and known drift. Add production assets to the do-not-touch register.

## Routine maintenance

1. Read health, security, update, entitlement, quota, and billing state.
2. Test the smallest change set in staging.
3. Verify an owner-controlled off-provider pre-change backup.
4. Apply declared changes to staging and run login, anonymous pages, assets, forms with mail suppressed, integrations, links, accessibility, performance, and log checks.
5. Produce the exact version/SHA/artifact plan and rollback.
6. Obtain the applicable production approval.
7. Deploy in the approved window, verify, observe, and close or roll back.

## Access and security

Named least-privilege users only; MFA for privileged access where supported. Keep secrets in approved secret storage, never Git or WordPress content. Review access/keys quarterly and revoke on role change. Record privileged actions and provider request IDs. Do not install unreviewed or abandoned themes/plugins.

## Backup and recovery

Monitor freshness and hashes daily. Perform quarterly isolated restore drills and after material backup-system changes. Never delete the last known-good copy. A production restore is an exact owner-approved incident action.

## Incident handling

Contain access, preserve evidence, identify the last known-good artifact and backup, notify the owner, choose approved rollback/restore, verify service and data integrity, and document corrective action. Do not erase evidence or rotate shared credentials without assessing impact.

## Change receipt

Every operation records batch/checkpoint, UTC time, operator, redacted target ID, environment, action, approval ID or `READ_ONLY`, provider request ID, before/after resources, expected/quoted/actual charge, result, evidence paths, rollback state, exact SHA/artifact where relevant, and non-secret notes.
