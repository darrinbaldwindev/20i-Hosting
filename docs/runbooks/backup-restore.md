# Backup and restore runbook

Paid Timeline Backups are not authorized. Provider-included copies may be defence-in-depth but cannot be the only recovery path.

## Backup

- Daily database export, daily changed-file backup, weekly full-file backup, and pre-deployment database/file export.
- Store encrypted off-provider under owner control; never inside a public web root or this repository.
- Keep encryption keys separate from backup data.
- Manifest: site/environment, UTC time, WordPress version, database/file hashes, encryption-key reference, and exact source SHA.
- Target retention: 7 daily, 5 weekly, 12 monthly, subject to owner storage policy.
- A backup succeeds only when transfer, archive integrity, hashes, and manifest verify.

## Restore drill

Restore to a new isolated, no-index, mail-suppressed staging target. Verify hashes before restore, database import, serialized URL handling, media completeness, admin/anonymous smoke tests, HTTPS/temporary hostname, suppressed outbound side effects, content counts, and critical options. Record recovery time and gaps.

Cleanup of the drill target requires G-04 if deletion is desired. Perform at least quarterly and before first production admission.
