# AU 20i ingress and rollback evidence gate matrix — logical Overseer review

Status: REPOSITORY REVIEW COMPLETE / PRIVATE PROVIDER EVIDENCE STILL REQUIRED  
Date: 2026-10-27  
Related: 20i-Hosting #7, Affiliate-Websites #41

This matrix fulfills the chat-safe repository/evidence reconciliation portion of issue #7 without claiming independent reviewer ACK or live provider inspection.

## Current gate summary

`READY_TO_UPLOAD_20I = BLOCKED`

Required AU gates now separate into:

1. theme package admission;
2. target/provider ingress evidence;
3. fresh rollback evidence;
4. exact source/artifact binding;
5. staging mutation + runtime smoke/receipt.

## Evidence matrix

| Gate | Repository evidence | Current classification | Missing proof | Next action surface |
|---|---|---|---|---|
| Canonical AU workload/source | Affiliate main observed `7277f3fa178be430e990132670e19b0112cc9c87`; 20i manifest current through Oct 27 | REPO_OBSERVED | immediate pre-mutation live-head recheck | Chat/Work read |
| Support artifact | artifact `11290703976`, inner SHA `9fc95be...`; six support-member audit MATCHED | DOCUMENTED / SOURCE-BOUND HISTORICAL | fresh pre-mutation member/source-current check | Chat read then Work |
| Theme package | historical artifact `11258622460` includes 10 `tests/` files | BLOCKED | new runtime-only package + manifest/hashes + independent acceptance | Coding/reviewer, not provider |
| AU target exists | historical authenticated My20i observation | DOCUMENTED HISTORICAL | current private target identity/class/region/package status | Work/provider read-only |
| File Manager feature enabled | runbook has read-only diagnostic | UNKNOWN | current package feature state | Work/provider read-only |
| My20i File Manager functional | historical blank/unusable surface | BLOCKED/UNKNOWN CURRENT | fresh retry on exact target | Work/provider read-only |
| Existing branded File Manager URL | runbook path documented | UNKNOWN | whether already configured | Work/provider read-only |
| Existing StackCP user assigned | runbook path documented | UNKNOWN | current assigned-user state | Work/provider read-only |
| Existing FTP identity usable without reset | runbook path documented | UNKNOWN | current existing identity/credential availability without mutation | Work/provider read-only |
| FTP/SFTP already unlocked | runbook path documented | UNKNOWN | current lock state | Work/provider read-only |
| New credential/security change required | prohibited by current authority | MUST REMAIN NO | proof existing path works without mutation | Work/provider read-only |
| Quota/cost state | staging target historically active; no new charge accepted | UNKNOWN CURRENT | current quota + zero-charge confirmation | Work/provider read-only |
| Historical rollback | files+DB backup 2026-10-10 11:56:32 Brisbane | DOCUMENTED HISTORICAL | too old for current pre-mutation gate | Work/provider |
| Fresh pre-change files backup | none accepted | BLOCKED | new current files export/backup + manifest/hash | Work/provider |
| Fresh pre-change DB backup | none accepted | BLOCKED | new current DB export + manifest/hash | Work/provider |
| Owner-controlled off-provider storage | required by runbook | UNKNOWN | storage destination/control evidence | Owner/Work |
| Backup manifest/hash integrity | required by runbook | UNKNOWN CURRENT | verified files/DB hashes + source SHA + timestamp | Work |
| Files+DB consistency | no current proof | BLOCKED | same pre-mutation window/receipt | Work |
| Last-known-good artifact/source | historical package identities exist | PARTIAL | current accepted theme + support identities after theme repair | Chat/reviewer |
| Restore steps | runbook exists | DOCUMENTED | workload-specific current receipt | Chat/Work |
| Restore rehearsal | required before first production admission; no current AU drill receipt | BLOCKED FOR FULL RESTORE READINESS | isolated restore drill + measured recovery | Work |
| Expected recovery time | no measured AU restore time | UNKNOWN | timed restore drill | Work |
| Runtime smoke | canonical checklist exists | NOT_RUN | actual staging upload/activation | Work |
| Post-upload receipt | schema/runbook exists | NOT_RUN | exact target/source/hash/smoke/charge/rollback receipt | Work |

## Minimum private provider evidence

A separately authorized Work/provider inspection should record only non-secret evidence:

- exact target/site label mapped to private provider ID;
- package type and region;
- target active state;
- File Manager feature enabled/disabled;
- whether My20i File Manager loads;
- whether an existing branded File Manager URL is already configured;
- whether a StackCP user is already assigned;
- whether `Log in as User` works for the exact package;
- whether an existing first FTP identity is present and usable **without password reset**;
- whether FTP/SFTP is already unlocked;
- whether a credential/security change would be required;
- current quota/resource state;
- exact expected charge for the intended staging action (`0.00` unless separately approved);
- current backup/export availability.

Do not persist:
- passwords;
- session cookies;
- API keys;
- private backup contents;
- unredacted account screenshots.

## Stop conditions

Stop immediately if any of these is required:
- password reset;
- new FTP account;
- new StackCP user/assignment;
- permission expansion;
- FTP unlock;
- IP allow-list change;
- Master FTP enablement;
- API/SSH/Git credential creation;
- DNS change;
- paid backup/product activation;
- target mismatch;
- non-zero unapproved charge.

## Rollback acceptance sequence

Immediately before any upload:

1. recheck exact target identity;
2. recheck accepted source/artifact identities;
3. create/reverify current files backup;
4. create/reverify current database backup;
5. store off-provider under owner control where required;
6. record manifest with:
   - UTC/Brisbane timestamp;
   - source SHA;
   - WordPress version where observable;
   - files archive hash;
   - database export hash;
   - storage/evidence reference;
7. verify archives/hashes;
8. record rollback trigger and restore procedure;
9. only then proceed with upload.

The 2026-10-10 backup remains historical evidence only.

## Remaining uncertainty

Repository-only review cannot establish:
- current private My20i feature/user/lock/quota state;
- current backup freshness;
- actual server files/database state;
- runtime activation/smoke;
- measured restore time.

Those require authenticated Work/provider execution.

## Authority boundary

No provider login, backup operation, upload, DNS, credential/security mutation, spend or production action was performed by this review.
