# Affiliate-Websites deployment manifest

```yaml
site: Affiliate-Websites / RewardFinder
markets: [AU, UK, US]
repository: Affiliate-Websites
branch: main
current_repo_head: 7277f3fa178be430e990132670e19b0112cc9c87
current_support_source_head: eeb05366347ab77a751f75565841294931354bd9
target_environment: staging
package_state: SUPPORT_SIX_MEMBER_HASH_MATCH; THEME_PACKAGE_P1_HOLD
runtime_state: NOT_DEPLOYED
provider_ingress_state: BLOCKED_ON_FILE_MANAGER; FTP_SFTP_EXISTING_AUTHORITY_NOT_YET_CHECKED
rollback_state: HISTORICAL_BACKUP_2026-10-10T11:56:32+10:00; FRESHNESS_UNVERIFIED
ready_to_upload_20i: BLOCKED_ON_THEME_PACKAGING_PROVIDER_INGRESS_FRESH_ROLLBACK
```

Current public-safe readiness state:

- RewardFinder catalogue: 75 verified programme records across AU / UK / US = 26 / 26 / 23.
- Theme source did not change during the latest catalogue/editorial tranche.
- Current support package was independently byte-bound by the 20i Overseer against the exact package source.
- The deterministic support package contains the staging MU-plugin, AU/US earning fixture, UK earning fixture, current editorial payload, pre-upload manifest and post-upload smoke checklist.
- Current source after packaging changed controller/envelope/authority/current-state documentation, a portfolio summary, and the global SOP pointer only; no deterministic support ZIP member changed.
- Commercial routes remain fail-closed; editorial verification does not grant affiliate/outbound authority.
- Provider target identity has been verified through private provider evidence, but provider-specific identifiers are intentionally not published in this repository.

Remaining 20i boundary:

1. verify the allowed live staging upload mechanism;
2. capture pre-change rollback state;
3. upload/configure the exact verified staging payload;
4. run canonical post-upload smoke;
5. record a redacted deployment receipt.

No production, DNS, billing, credential/security, commercial activation or public publication authority is implied by this manifest.


## 2026-10-04 delta

Affiliate controller `REWARDFINDER-CONTROLLER-2026-10-04-10.md` confirms:
- active byte-bound support artifact remains `11290703976`;
- support-member source drift remains `NO`;
- later non-support-member workflow artifacts do not supersede the verified current support bytes solely because they were emitted later.

Therefore the deployment boundary remains live provider upload/configuration/smoke, not package regeneration.


## 2026-10-10 provider-ingress checkpoint

Authenticated My20i access and the AU staging target were confirmed in Work mode.

A combined files-and-database rollback backup completed at **2026-10-10 11:56:32 Australia/Brisbane**.

File Manager remained blank after retry. Git ingress would require establishing credentials and was correctly not attempted.

A newly documented fallback is **existing-authority FTP/SFTP only**:
- inspect whether FTP/SFTP is already unlocked;
- inspect whether an existing usable package credential is already available;
- do not unlock FTP, reset/create passwords, create accounts, enable Master FTP, add IP allow rules, create API keys, or create SSH keys under the current boundary.

If existing FTP/SFTP is unavailable without such changes, the provider-ingress blocker remains unchanged.


## 2026-10-10 SOP-pointer head advance

Affiliate `main` advanced from `960a65c5afa5433ec6137ad62513cb36a77b36ea` to `256a64c519861258f0c44810380181127c66aa78` solely through the global CONT SOP pointer repair.

Exact compare: one changed file, `docs/overseer/GLOBAL-SOP-POINTER.md`.

No theme/support upload member changed. Therefore the existing byte-bound theme/support identities remain current; package regeneration is not required.


## 2026-10-18 CUB x5 freshness checkpoint

Fresh GitHub verification:
- Affiliate `main` remains exactly `256a64c519861258f0c44810380181127c66aa78`;
- compare from the previously verified current head to the live head is `identical`;
- no theme/support member drift exists.

Therefore:
- support artifact `11290703976` remains source-current;
- theme artifact `11258622460` remains source-current;
- package regeneration is not justified.

Provider ingress remains the live gate.

The prior combined files+database backup from **2026-10-10 11:56:32 Australia/Brisbane** is retained as historical rollback evidence, but it must not be treated as a fresh pre-change snapshot indefinitely. If ingress clears on a later date, capture/re-verify a current pre-mutation rollback point immediately before upload/configuration unless provider evidence proves no staging mutation has occurred and the governing runbook explicitly accepts the older snapshot.

No provider mutation occurred in this chat cycle.


## 2026-10-26 04:24 Brisbane — source-bound admission correction

This checkpoint supersedes the historical 2026-10-18 statement that theme package regeneration is unjustified and the YAML shorthand implying provider ingress is the sole remaining gate. **Do not retroactively alter historical checkpoints.**

- Fresh GitHub source read: Affiliate-Websites default head `7277f3fa178be430e990132670e19b0112cc9c87`; this is an observation at the stated time, not a floating guarantee. Theme packaging workflow blob `f600044aaec79761b4f4cfd090944055bfc3abf2` at `.github/workflows/theme-validate.yml` remains under independent P1 review [Affiliate-Websites #41](https://github.com/darrinbaldwindev/Affiliate-Websites/issues/41).
- The 20i independent [AU artifact byte audit](../checkpoints/AFFILIATE-AU-ARTIFACT-BYTE-AUDIT-2026-10-25.md) records **six support-file source/hash matches** against previously extracted archive digests, but **no fresh archive download** in that verification; the separate theme ZIP includes **10 development/test files** and is **not cleared for staging upload**. No new package has been accepted.
- Existing provider identity evidence is historical. This checkpoint did **not** authenticate provider ingress, current site state, backup freshness, runtime, or staging acceptance. The 2026-10-10 combined files/database backup remains **historical only**.
- AU `READY_TO_UPLOAD_20I` is **BLOCKED / NO UPLOAD** pending theme package disposition and independent acceptance, authorized provider-ingress/target inspection, and fresh rollback evidence. UK/US require independent target admission. All 75 programmes remain commercial HOLD / 0 READY.
- Worker routing remains separate: [Affiliate #41](https://github.com/darrinbaldwindev/Affiliate-Websites/issues/41) owns theme member selection; [20i #7](https://github.com/darrinbaldwindev/20i-Hosting/issues/7) owns AU ingress/rollback documentation; [20i #8](https://github.com/darrinbaldwindev/20i-Hosting/issues/8) owns UK/US admission. None has an independently authenticated worker ACK at this checkpoint. This documentation correction is an Overseer action, **not** a worker report, provider change, backup operation or deployment approval.
