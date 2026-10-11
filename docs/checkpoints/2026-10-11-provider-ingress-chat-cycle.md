# CYCLE-INGRESS-2026-10-11 — Chat-mode continuation

**Mode:** Chat / non-Work  
**Objective:** Clear AU RewardFinder staging provider-file-ingress blocker without creating credentials, changing security settings, or mutating production.

## BATCH-01 — Canonical state fresh-scan — EXECUTED

Fresh repository history was inspected for:
- `20i-Hosting`
- `Affiliate-Websites`
- `GlobalShopCo-Headless`

Canonical findings:
- `20i-Hosting` latest relevant state remains the provider-ingress documentation line ending at commit `31db2ecf4952c7ab5039311ebd0daeb10334fc1c`.
- `Affiliate-Websites` current default head is `256a64c519861258f0c44810380181127c66aa78`.
- The head advance from `960a65c...` is SOP-pointer-only and does not supersede the byte-bound support payload.
- GlobalShopCo-Headless latest default-branch head is SOP-pointer-only relative to its implementation/acceptance lane; no new provider-ingress evidence was found.

**Result:** source/package drift is not the blocker.

## BATCH-02 — Current 20i ingress documentation verification — EXECUTED

Current 20i public documentation was rechecked.

Verified:
- StackCP normally includes File Manager when enabled at package level.
- An already-assigned StackCP user can be entered from My20i using **Log in as User**.
- 20i documents limited StackCP compatibility login using a hosting package's existing FTP details.
- Direct FTP/SFTP access requires FTP/SFTP to be unlocked.
- Master FTP requires enabling access and adding an IP, which is a security-setting mutation.

**Result:** the browser-based existing StackCP identity paths remain potentially admissible; FTP/SFTP is admissible only if already unlocked with an existing credential.

## BATCH-03 — Authority-path classification — EXECUTED

### Allowed without new authority
1. My20i File Manager, if functional.
2. Existing branded File Manager URL, if already configured.
3. Existing assigned StackCP user -> **Log in as User** -> File Manager.
4. Existing first FTP identity -> StackCP compatibility login -> File Manager, only if the existing credential is available without reset.
5. Direct FTP/SFTP only if already unlocked and existing credentials are already usable.

### Outside current authority
- unlock FTP/SFTP;
- reset/create FTP passwords;
- create or assign StackCP users;
- enable Master FTP;
- add IP allow rules;
- create API/SSH/Git credentials;
- alter package features;
- DNS/security changes.

**Result:** the broad fallback list is narrowed to existing-identity browser ingress first.

## BATCH-04 — Provider diagnostic order — EXECUTED

The exact next provider-side diagnostic order is now:

1. Read current package feature state; confirm whether File Manager is enabled. Do not toggle/save.
2. Read **StackCP Users Assigned**.
3. If an existing user is assigned, use **Log in as User** and test File Manager.
4. If no assigned user exists, inspect the first existing FTP identity without resetting/changing it.
5. If that credential is already available, attempt the documented limited StackCP compatibility login and test File Manager.
6. Read FTP/SFTP lock state.
7. Only if already unlocked with an existing usable credential may direct FTP/SFTP be attempted.
8. Otherwise stop.

**Result:** no credential/security mutation is required to perform the remaining diagnostic reads, but the reads require authenticated provider UI / Work-mode browser access.

## BATCH-05 — Artifact + rollback freshness reconciliation — EXECUTED

Preserved current staging controls:
- support artifact ID `11290703976`;
- support inner ZIP SHA-256 `9fc95be766f85142a2aa5a9d33d8cb303abca4bdf68b1e87f6957d2094d71517`;
- theme artifact ID `11258622460`;
- theme inner ZIP SHA-256 `e51bb5b8f4b594c821e3b7324bb8f66f67de1265734c5230665430178e4847ee`;
- combined files + database rollback backup captured `2026-10-10 11:56:32 Australia/Brisbane`.

No newer repository evidence invalidates those byte bindings.

**Result:** package regeneration is not justified; ingress remains the only live gate.

## BATCH-06 — Cross-workload impact + escalation readiness — EXECUTED

Reconciled impact:
- RewardFinder AU staging remains `NOT_DEPLOYED`.
- GlobalShopCo-Headless runtime acceptance remains blocked on the same class of provider ingress gate.
- Existing provider-support packet is correctly scoped and remains **PREPARED_NOT_SUBMITTED**.
- Current public 20i documentation supports asking 20i to confirm File Manager/StackCP health without authorizing credential or package-setting changes.

**Result:** provider escalation is prepared but still owner-authorised external contact, not autonomously submitted.

# CONSOLIDATION-07 — EXECUTED

Canonical state:

`BLOCKED_ON_PROVIDER_EXISTING_IDENTITY_DIAGNOSTIC_REQUIRES_AUTHENTICATED_UI`

Resolved:
- source-currentness ambiguity;
- artifact-currentness ambiguity;
- whether direct SFTP can be introduced without security change: **NO**, unless already unlocked;
- whether an existing assigned StackCP user is a legitimate no-new-credential path: **YES**, if already assigned.

Still unknown because chat mode cannot inspect the authenticated provider UI:
- File Manager feature enabled/disabled state;
- whether a StackCP user is already assigned;
- whether first existing FTP credential is available without reset;
- whether FTP/SFTP is already unlocked;
- whether StackCP File Manager works via an existing identity.

No upload, provider setting, credential, DNS, WordPress, production or publication mutation occurred.

# CONTROLLER-08 — EXECUTED

**Decision: STOP THIS CYCLE.**

Useful chat-mode work is exhausted. The next distinct action requires authenticated My20i/StackCP UI inspection (Work/browser mode) or owner-authorised provider support contact.

Do not create another chat cycle merely to repeat the same blocker.

## Exact next execution step

In authenticated provider UI, perform only these read/existing-identity diagnostics:

1. inspect File Manager feature state;
2. inspect existing StackCP assignment;
3. if assigned, **Log in as User** and test File Manager;
4. otherwise inspect existing first FTP identity and, only if its existing credential is already available, test StackCP compatibility login;
5. inspect FTP/SFTP lock state;
6. do not unlock/reset/create/change anything.

If an existing-identity File Manager path works:
- recheck source-currentness;
- recheck rollback freshness;
- upload exact byte-bound staging payload;
- configure staging only;
- run canonical smoke;
- record redacted receipt.

If all existing-identity browser paths fail:
- remain blocked pending owner-authorised 20i support contact or separately authorised credential/security change.
