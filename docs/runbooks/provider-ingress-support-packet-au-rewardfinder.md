# 20i Provider Ingress Support Packet — AU RewardFinder Staging

Status: PREPARED_NOT_SUBMITTED  
Date: 2026-10-10  
Purpose: concise provider-support evidence if owner later authorizes contacting 20i.

## Scope

Affected hosting package:
- AU RewardFinder staging target
- exact provider identifiers intentionally omitted from this public repository

Current controller state:
`BLOCKED_ON_PROVIDER_FILE_INGRESS_WITH_ROLLBACK_CAPTURED`

## What is already verified

- My20i authentication works.
- Target hosting package is active.
- Affiliate source-currentness passed at:
  `960a65c5afa5433ec6137ad62513cb36a77b36ea`
- Current approved support artifact:
  - artifact ID `11290703976`
  - inner ZIP SHA-256 `9fc95be766f85142a2aa5a9d33d8cb303abca4bdf68b1e87f6957d2094d71517`
- Current approved theme artifact:
  - artifact ID `11258622460`
  - inner ZIP SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee`
- Combined files + database rollback backup completed:
  `2026-10-10 11:56:32 Australia/Brisbane`
- No production resources were changed.

## Observed problem

My20i File Manager opened but the file surface remained blank in both available browser surfaces after retry.

No file mutation occurred.

Git deployment was not attempted because the visible path required establishing credentials, outside the current authority.

## Public provider status

At the latest chat-mode check on 2026-10-10:
- 20i/StackStatus reported all systems operational;
- the earlier London connectivity incident from 2026-10-07 was marked resolved on 2026-10-08.

This suggests the issue may be package/session/UI-specific rather than a currently declared platform-wide outage.

## Read-only diagnostics to perform before provider contact

1. Manage the exact package in My20i.
2. Inspect whether File Manager is enabled under the package's current feature configuration.
3. Inspect whether any StackCP user is already assigned.
4. If already assigned, test existing **Log in as User** without changing assignment or permissions.
5. If no assigned StackCP user, inspect the first existing FTP identity without changing/resetting credentials.
6. If an existing identity is usable, attempt the documented limited StackCP compatibility login.
7. Confirm whether StackCP File Manager loads for the exact package.
8. Record only non-secret state/results.

Do not:
- toggle package features;
- create/assign StackCP users;
- reset/create FTP passwords;
- unlock FTP;
- change IP allow-list;
- enable Master FTP;
- create API/SSH/Git credentials.

## Provider-support question if diagnostics still fail

> For this active WordPress hosting package, authenticated My20i management works but File Manager opens to a blank/unusable file surface in multiple browser surfaces. Could you confirm whether File Manager is enabled and healthy for this exact package, whether there is a package-specific File Manager/StackCP fault, and whether an existing no-new-credential StackCP/File Manager route should work? Please do not reset credentials, change package permissions, unlock FTP, alter DNS, or make any production/security changes without explicit approval.

## Evidence to include privately if requested

- exact service/package ID;
- target hostname;
- timestamp of failed File Manager attempts;
- browser/session details;
- screenshots showing blank File Manager with secrets/account details redacted;
- exact package feature-state observation;
- StackCP assigned-user presence/absence;
- current non-secret platform/plan/location details.

Never include:
- passwords;
- API keys;
- session cookies;
- security answers;
- private tokens;
- full credential screenshots.

## Acceptance

Support interaction clears this blocker only if it returns evidence that:
- File Manager is restored/usable; or
- an already-existing no-new-credential ingress path is confirmed usable.

Provider advice requiring a credential/security/package-setting mutation returns to owner/controller for separate authority.
