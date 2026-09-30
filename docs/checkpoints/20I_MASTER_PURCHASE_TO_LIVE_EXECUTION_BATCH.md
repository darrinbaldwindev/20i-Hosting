# 20i Master Purchase-to-Live Execution Batch

**Batch ID:** `20I-MASTER-001`  
**Status:** READY FOR OWNER-DRIVEN EXECUTION / NOT AUTHORISED TO PURCHASE OR CHANGE PRODUCTION  
**Execution model:** one resumable, evidence-first batch with explicit owner gates  
**Scope:** 20i account and hosting foundation, staging, deployment, WordPress, three affiliate markets, MyPrimeDelivery, Content360, HostShop and managed WordPress operations  
**Hard rule:** **No charge, purchase, production mutation, DNS change, public release, customer communication, or irreversible action without explicit owner approval at the applicable gate.**

---

## 1. Outcome and authority boundary

This batch takes a newly purchased 20i account from verified access to a controlled, auditable hosting platform and then—only after separate owner approvals—through staging and production admission.

It is an execution runbook, not standing authority. An approval applies only to the named gate, exact resources and quoted cost. Silence, an earlier approval, a successful dry run, or an existing entitlement does not authorise a later production change.

### Non-negotiable invariants

1. Default to read-only discovery.
2. Treat every unverified entitlement, endpoint, price, region and feature as `UNKNOWN`.
3. Never infer “included” from a button being available.
4. Require a zero-charge result or an owner-approved exact quote before resource creation.
5. Keep credentials out of repositories, transcripts, screenshots and receipts.
6. Never use a broad/root token when a scoped token is available.
7. Never deploy an uncommitted or unverified working tree.
8. Never use production as the first test environment.
9. Preserve a rollback path and a pre-change backup before every production mutation.
10. A failed or ambiguous check stops the batch at the current checkpoint; it does not invite a guess.

### Roles

| Role | Authority |
|---|---|
| Owner | Approves purchases, charges, plan changes, production changes, DNS, publication, destructive recovery and customer-facing pricing |
| Operator | Performs approved steps, captures receipts and stops on drift |
| AgentOS | May research, verify, monitor and orchestrate within granted scope; no independent purchasing or production authority |
| 20i | Hosting/control-plane provider; its UI/API responses are evidence, not automatic approval |

---

## 2. Evidence workspace and receipt contract

Create a private execution evidence directory outside any public web root. Use this logical layout (the operator may map it to a secure local path):

```text
20i-master-001/
├── run.json
├── approvals/
├── discovery/
├── requests-redacted/
├── responses-redacted/
├── inventory/
├── backups/
├── restore-drill/
├── deployments/
├── screenshots/
└── closeout/
```

Every checkpoint receipt must record:

```yaml
batch_id: 20I-MASTER-001
checkpoint: CP-XX
timestamp_utc: ISO-8601
operator: named-human-or-approved-agent
account_id: redacted-or-non-secret-id
environment: discovery|staging|production
action: concise description
authority: approval receipt ID or READ_ONLY
request_id: provider request/correlation ID if available
resources_before: []
resources_after: []
expected_charge: 0.00
quoted_charge: 0.00
actual_charge: 0.00-or-UNKNOWN
result: PASS|FAIL|BLOCKED|ROLLED_BACK
evidence_paths: []
rollback_status: NOT_NEEDED|READY|EXECUTED|FAILED
notes: no secrets
```

Redact tokens, passwords, private keys, session cookies, recovery codes, database credentials, personal data and full payment details. Hash retained raw evidence where practical and record the hash in the receipt.

---

## 3. State machine, idempotency and failure recovery

### State machine

```text
PLANNED
  -> ACCOUNT_VERIFIED
  -> DISCOVERY_ACCEPTED
  -> STAGING_APPROVED
  -> STAGING_READY
  -> RESTORE_PROVEN
  -> WORKLOADS_ADMITTED
  -> PRODUCTION_APPROVED
  -> PRODUCTION_DEPLOYED
  -> LIVE_VERIFIED
  -> CLOSED
```

`BLOCKED`, `FAILED` and `ROLLED_BACK` may occur at any stage. Resume from the last `PASS` receipt only after re-checking current account state and the step's preconditions.

### Idempotency rules

- Give every create operation a deterministic label containing `20I-MASTER-001` and its workload/environment.
- Before `POST`, `PUT`, clone, restore or create, perform a read and match on stable provider ID plus expected label.
- If the intended resource exists and its immutable properties match, record `NOOP_ALREADY_SATISFIED`.
- If the label exists but properties differ, stop with `CONFLICT`; do not create a duplicate.
- Persist provider resource IDs immediately after successful creation.
- Never automatically retry a charge-bearing, destructive or ambiguous request.
- Retry read-only requests only for bounded transient failures, with backoff and the same correlation ID where supported.
- After a timeout on a mutation, read inventory before retrying; treat outcome as `UNKNOWN` until reconciled.

### Standard recovery ladder

1. Stop additional writes.
2. Capture redacted error, request ID, time and current inventory.
3. Determine whether the attempted mutation happened.
4. If no mutation occurred, correct the cause and resume from the current checkpoint.
5. If a staging mutation occurred, restore or recreate staging from its declared source.
6. If a production mutation occurred, invoke the checkpoint-specific rollback and verify service/data integrity.
7. If billing, data integrity, DNS, identity or rollback is ambiguous, escalate to the owner and 20i support; do not continue.

---

## 4. Do-not-touch register

Populate exact IDs during discovery. Until populated, the category itself is protected.

| Protected category | Default rule |
|---|---|
| Existing production packages/sites | Read-only inventory only |
| Existing domains, nameservers, DNS records and email/MX | No change |
| Billing method, subscription, renewals, credits and plan | No change |
| Existing databases, mailboxes, users, SSH keys and API keys | No change |
| Existing backups/retention | Do not delete, shorten or replace |
| Cloudflare/CDN/WAF configuration | No change |
| Affiliate tracking URLs and approved commercial relationships | No change without market owner approval |
| Canonical Rewards API/Supabase data | No direct browser credential exposure; no production write |
| AgentOS control plane, scheduler, registry, ledger and authority systems | Do not duplicate or replace |
| Customer sites and customer-facing HostShop settings | No change |

The operator must add discovered provider IDs and the owner's exclusions to `inventory/do-not-touch.yaml`. Any target appearing on this list causes an automatic stop unless a new, exact owner approval explicitly removes that target for the named action.

**Checkpoint CP-00 — Batch initialised**  
Pass: evidence workspace, run ID, receipt format and populated protection categories exist.  
Stop: evidence location is public, shared unsafely or cannot protect secrets.

---

## 5. Phase A — Purchase and account verification

### A1. Pre-purchase capture

Before checkout, save the exact plan name, billing period, currency, tax, introductory term, renewal price, included allowances, overage rules, cancellation/refund terms, data-centre choices, backup inclusions and any reseller/HostShop entitlements. Mark every unclear item `UNKNOWN`.

### OWNER GATE G-01 — Purchase

Required approval statement:

> Approve purchase of **[exact plan]**, **[term]**, at **[currency and total including tax]**, renewing at **[known renewal amount or UNKNOWN explicitly accepted]**. No add-ons are approved.

If checkout differs by any amount, term, add-on, renewal condition or region, abandon checkout and return to G-01. Capture an order/receipt ID after purchase; never capture full card data.

### A2. Account acceptance

- Confirm the expected legal/account owner and email.
- Enable MFA; store recovery codes in the owner's approved secret store.
- Confirm billing page matches the approved plan and no optional add-on is active.
- Confirm support access and account recovery path.
- Record account/customer ID in redacted form.

**Checkpoint CP-01 — Purchase reconciled**  
Pass: approved quote equals provider receipt; account accessible; MFA enabled; no unapproved add-ons/charges.  
Stop: any discrepancy, pending identity issue, surprise add-on or unknown charge.

---

## 6. Phase B — Region, entitlement and endpoint discovery

### B1. US/default location confirmation

Read the account default location and the available per-package locations. Record provider-native location IDs and display names. Do not assume “US” means a particular coast or data centre.

- Required result: the owner-intended default is an available US location and its exact ID is known.
- If the account default is not US, do not change it automatically.
- Confirm whether location is mutable after package creation; treat it as immutable unless documented otherwise.

### OWNER GATE G-02 — Default location change, if required

Approval must name the current location, target US location ID, affected scope and whether existing resources are affected. If no change is needed, record `NOOP`.

### B2. Plan and entitlement inventory

Capture, without mutation:

- plan/product ID, term, renewal and currency;
- package allowances and currently used quantities;
- permitted package types/platforms;
- WordPress, Linux/general hosting and reseller capabilities;
- data-centre/location choices;
- domains, DNS, email, databases, storage, bandwidth and inode/CPU/process limits;
- SSL issuance/renewal capability;
- temporary URL behavior;
- Git, SSH, SFTP, WP-CLI, cron and staging/clone/Blueprint features;
- API access, rate limits and audit logs;
- backup/restore features, retention and any paid Timeline Backups status;
- HostShop/branding/white-label capability;
- any trial, promotional or metered features.

Produce `inventory/entitlements.yaml` with `INCLUDED`, `CHARGEABLE`, `UNAVAILABLE` or `UNKNOWN` for every item. `UNKNOWN` is not usable.

### B3. Secure API setup

1. Create a named API principal/token only if account policy permits.
2. Use the smallest available read-only scope first.
3. Restrict by IP and expiry if supported.
4. Store the secret only in the approved secret manager/environment; never in the evidence directory.
5. Record token fingerprint/last four characters, scope, creator, created time, expiry and rotation/revocation procedure.
6. Do not enable write scopes in this phase.

### B4. Read-only `GET /package` acceptance

Use the provider's documented current API base URL and authentication scheme. Do not invent a base URL from this runbook.

Acceptance conditions:

- TLS certificate validates;
- authentication succeeds with read-only scope;
- `GET /package` returns HTTP success per current documentation;
- schema is captured and contains only packages visible to this account;
- no package state changes;
- pagination is exhausted safely;
- response is redacted, hashed and retained;
- UI inventory and API inventory reconcile by provider package ID.

Reject acceptance on redirect to an unexpected host, undocumented schema, partial pagination, excessive privilege, missing known resources or unexplained extra resources.

### B5. Endpoint inventory

From current official 20i documentation/account tooling, record endpoints for packages, package types, locations, domains/DNS, SSL, temporary URLs, users/SSH, databases, backups/restores, WordPress/staging/clone/Blueprint, HostShop/branding and billing/quotes. For each endpoint record method, scope, mutability, idempotency support, rate limit, charge risk, required fields and rollback.

No undocumented endpoint may be used. Read-only endpoint discovery does not authorise a mutation.

**Checkpoint CP-02 — Discovery accepted**  
Pass: US/default status known; entitlement and do-not-touch inventories complete; scoped API works; `GET /package` reconciles; endpoint inventory retained.  
Stop: write-only token required for discovery, API/UI mismatch, unknown package ownership, or unresolved billing state.

---

## 7. Phase C — Package-type selection and zero-charge validation

### C1. Selection matrix

For each intended workload, compare the discovered package types:

| Criterion | Required evidence |
|---|---|
| Workload fit | Supported runtime and management path |
| WordPress suitability | WP lifecycle, CLI, staging/clone or documented alternative |
| Linux suitability | Runtime, process, SSH/Git and deployment requirements |
| US location | Exact allowed location ID |
| Security | Isolation, TLS, least privilege, logs |
| Backup | Export/restore access supporting our independent regime |
| Cost | Included entitlement and zero incremental charge, or exact quote |
| Reversibility | Delete/rollback behavior and data-export path |

Select by provider-native package-type ID, never by display-name guess.

### C2. WordPress-vs-Linux admission check

Choose **managed WordPress** only when the workload is WordPress, required plugins/theme/CLI are supported, filesystem/database access is sufficient, backup export/restore is possible, and no required server process is blocked.

Choose **Linux/general hosting** only when the workload requires a non-WordPress runtime, custom build/start process, persistent process/worker or system capability explicitly supported by that package type.

Do not force AgentOS, Rewards API, Content360 processing or another service into WordPress hosting merely because it is available. Static output may be published to WordPress; canonical processing/data services remain in their approved architecture.

### C3. No-charge validation

Before every create/clone/restore/SSL/staging/backup operation:

1. Obtain provider preview/quote if available.
2. Confirm incremental amount is exactly `0.00` in account currency.
3. Confirm no paid add-on, trial conversion, metered feature or renewal uplift is attached.
4. Confirm allowance impact leaves safe headroom.
5. Save the redacted quote and its expiry.

If there is no machine-readable or UI quote, classify cost as `UNKNOWN` and stop for owner review. “Included in plan” text is supporting evidence, not a substitute for a final zero-charge confirmation when checkout/creation shows pricing.

### OWNER GATE G-03 — Staging resource creation

Approval names package type ID, US location ID, deterministic label, expected charge `0.00`, quota impact and deletion/rollback path. It does not approve production.

**Checkpoint CP-03 — Package admitted**  
Pass: workload/package matrix complete, type selected, zero-charge proof current, owner approved staging creation.  
Stop: feature mismatch, cost `UNKNOWN`, add-on prompt, insufficient headroom or location ambiguity.

---

## 8. Phase D — Affiliate master staging foundation

### D1. Create `affiliate-master-staging`

Pre-read package inventory by deterministic label. Create once using the approved package-type and US location IDs. Immediately read it back and verify provider ID, label, type, location, status, entitlement consumption and charge.

Do not attach a production domain. Add the provider ID to the inventory and protect it from unrelated operations.

### D2. Temporary URL

Enable/use an included temporary URL only after zero-charge validation. Requirements:

- access is private or suitably restricted where supported;
- search indexing is disabled;
- no production analytics, affiliate tracking or live credentials;
- canonical metadata cannot imply a live public site;
- the hostname and certificate behavior are documented.

### D3. SSL

Issue/attach only an included certificate appropriate to the temporary/staging hostname. Verify chain, hostname, validity, renewal behavior and forced HTTPS without redirect loops. Never purchase premium SSL without a separate owner gate.

### D4. Git, SSH and WP-CLI

- Generate a dedicated deployment key; do not reuse a personal key.
- Prefer read-only repository access until deployment is approved.
- Pin the server host key out-of-band on first connection.
- Use a non-root, staging-only account.
- Verify Git and WP-CLI versions and run read-only health/inventory commands first.
- Prohibit direct edits to tracked production files.
- Record fingerprints and capability results, not private keys.

### D5. WordPress baseline

- Install/select WordPress through an included path only.
- Use unique admin/database credentials stored in the secret manager.
- Remove unused defaults; disable file editing in the admin where appropriate.
- Apply least privilege, MFA if supported, secure salts, update policy and staging mail suppression.
- Set staging visibility to discourage indexing.
- Install only approved, licensed and evidence-backed themes/plugins.

**Checkpoint CP-04 — Affiliate staging ready**  
Pass: expected package exists once; temporary URL and SSL verify; staging-only access works; Git/SSH/WP-CLI capabilities recorded; WordPress health check passes; no public domain or live tracking attached.  
Stop: duplicate package, unexpected charge, location/type drift, certificate failure or excessive access.

---

## 9. Phase E — Independent backup regime and restore proof

Paid **Timeline Backups are not authorised**. Do not activate a trial or add-on. Provider-included backups may be defence-in-depth, but they are not the sole recovery plan.

### E1. Backup design

For each WordPress site retain:

- daily database export;
- daily changed-file backup and weekly full file backup;
- pre-deployment database and file snapshot/export;
- off-provider encrypted storage under owner control;
- retention target: 7 daily, 5 weekly and 12 monthly copies, subject to owner storage policy;
- manifest containing site ID, environment, UTC time, WordPress version, database/file archive hashes, encryption/key reference and source commit SHA;
- quarterly restore drill at minimum and before first production admission.

Never store backup archives inside a public web root. Separate encryption keys from backup data. Validate archives and hashes after transfer. A backup job is not successful until the off-provider copy and manifest verify.

### E2. Restore drill

Restore into a new, isolated, no-index, mail-suppressed staging target—not over the source. Use a declared backup manifest, then verify:

- archive/database hashes before restore;
- database import and serialized URL handling;
- media/file completeness;
- admin and anonymous smoke tests;
- HTTPS and temporary hostname;
- no outbound email, payment, affiliate conversion or production webhook;
- restored content count and critical options against source;
- cleanup plan for the drill target.

### OWNER GATE G-04 — Restore drill cleanup

Owner confirms evidence is sufficient and authorises deletion of the isolated drill resource if deletion is desired. Otherwise retain it within quota and protect it.

**Checkpoint CP-05 — Recovery proven**  
Pass: independent encrypted backup exists off-provider; hashes verify; clean-target restore passes; recovery time and gaps recorded.  
Stop: backup is provider-only, restore is untested, secrets leak, hashes differ or the drill requires production writes.

---

## 10. Phase F — Exact-SHA deployment acceptance

### F1. Immutable release input

For every deployment record:

- canonical repository URL;
- branch/ref for context only;
- exact full commit SHA (the deployable identity);
- clean working-tree proof;
- signed tag/commit verification where project policy requires it;
- CI/test result tied to the same SHA;
- build toolchain/lockfile identity;
- artifact SHA-256 and generated manifest/SBOM where available.

Build once from the exact SHA. Do not deploy “latest,” a floating branch, a local dirty tree or an artifact whose source SHA is only asserted in a filename.

### F2. Staging deployment

Deploy to staging, then prove the running artifact corresponds to the approved SHA using at least two independent signals: deployment manifest/artifact hash and a read-only runtime/version marker. Run health, security, link, accessibility and representative workflow checks.

### F3. Production promotion

Promotion reuses the already verified artifact; it does not rebuild from a branch. Capture pre-change backup and rollback artifact/manifest first.

### OWNER GATE G-05 — Production deployment

Approval must name workload, production provider/package ID, domain/DNS changes, exact commit SHA, exact artifact hash, maintenance window, tested rollback version, expected charge and named verifier. Approval expires on SHA/hash/target/cost drift.

**Checkpoint CP-06 — Release verified**  
Pass: staging runtime matches exact SHA/artifact; tests pass; rollback package is ready; owner approved the exact production tuple.  
Stop: rebuild required, SHA cannot be proven, CI belongs to another SHA, backup missing or target differs.

---

## 11. Phase G — WordPress staging, clone and Blueprint path

Use the first available **included and documented** path in this order:

1. 20i staging/clone feature, if entitlement and zero-charge proof are confirmed;
2. 20i Blueprint/template feature, if it supports versioned, sanitised WordPress baselines without copying secrets/content;
3. independent files/database deployment with scripted URL transformation and validation.

Rules:

- Production-to-staging clone requires owner approval because it may copy personal data and secrets.
- Sanitise users, personal data, analytics, payment keys, SMTP, webhooks and affiliate credentials.
- Staging-to-production promotion never includes environment secrets or unreviewed database overwrites.
- Blueprint content contains the lightweight `affiliate-master` block theme, approved configuration and safe plugins only; no market-specific commercial facts or credentials.
- Heavyweight page builders are not admitted as foundational dependencies.
- WordPress remains the editorial/presentation layer; Rewards API/Supabase remain the controlled canonical commercial-data boundary.

**Checkpoint CP-07 — WordPress promotion path proven**  
Pass: chosen path is included, repeatable, sanitised and tested both forward and rollback.  
Stop: secrets/PII cross environments, plugin licensing is unclear, or promotion overwrites canonical commercial data.

---

## 12. Phase H — Workload rollout

Each workload receives its own staging acceptance and owner production gate. A pass for one does not authorise another.

### H1. Affiliate master and AU/UK/US markets

Architecture: one reusable `affiliate-master` lightweight WordPress block theme with three separate markets. They share framework and components, not market truth.

Suggested rollout order after master validation: **AU → UK → US**, unless the owner changes it based on current commercial readiness.

For each market create a separate package/site or explicitly isolated site configuration as admitted by inventory and quota. Verify independently:

- local domain, locale, currency and timezone;
- market-specific content, merchants, eligibility and compliance;
- current affiliate/network approval and dated terms evidence;
- disclosure, methodology, sources and outbound click handling;
- no fabricated commissions, prices, ratings, scarcity, earnings or relationships;
- affiliate resolution uses country eligibility and an approved current commercial relationship;
- raw tracking URLs stay outside editorial content;
- conflicts/stale facts fail closed.

Current portfolio cautions to preserve: AU named editorial may be partially evidenced but publisher use still needs approval; UK referral claims require fresh first-party/network proof; US network candidates still require actual publisher/account approval. Treat these as re-verification prompts, not permanent facts.

**CP-08A / CP-08B / CP-08C — AU / UK / US admitted**  
Pass: market-local evidence, account approval, disclosures and technical tests pass; owner approves that exact market's production release.

### H2. MyPrimeDelivery

Admit WordPress only as the catalogue/editorial layer. Preserve the existing fail-closed product/deal model:

- product identity is separate from offer/deal evidence;
- deal states include `ACTIVE`, `STALE`, `EXPIRED`, `UNKNOWN`, `BLOCKED`;
- only `ACTIVE` evidence may emit sale/urgency fields;
- Prime status is never inferred from deal status;
- candidate states remain `DISCOVERED -> CANDIDATE -> QUALIFIED | REJECTED | STALE | BLOCKED`;
- outbound CTA/publication requires separately approved live data, marketplace, affiliate tag and rights;
- no checkout, shipping, payment or order-flow claims are introduced by hosting setup.

**CP-09 — MyPrimeDelivery admitted**  
Pass: synthetic/staging validation succeeds, live data rights are independently proven for production features, and exact-SHA production gate is approved.

### H3. Content360

Deploy only the hosting-facing/editorial components suited to the admitted package. Content360 must retain evidence state, source, verification date, confidence and freshness. It must not turn research or product direction into a live claim.

- Keep AgentOS pricing claims separate from reseller hosting pricing.
- Do not publish benchmark-result, savings, product, affiliate or commerce claims without their existing evidence gates.
- Ensure schedulers/workers remain in their canonical approved runtime; do not duplicate the AgentOS control plane inside 20i.

**CP-10 — Content360 admitted**  
Pass: evidence gates remain fail-closed, no alternate control plane exists, staging output is reviewed and exact production release is owner-approved.

### H4. AgentOS Free inclusion model

HostShop plans may include **AgentOS Free at $0** as a useful entry entitlement/onboarding benefit. This inclusion:

- must not be described as a paid hosting component or hidden surcharge;
- does not include the separate optional intelligence subscription;
- does not guarantee a particular paid model/provider, benchmark outcome or saving;
- supports free/local/BYOK resources only as actually implemented and documented;
- requires a clear path to stay Free without manufactured scarcity;
- keeps any paid AgentOS upgrade commercially and technically separate from hosting entitlement.

The portfolio's separate AgentOS product-direction prices must not be conflated with the `$11/$22/$33` reseller hosting tiers.

**CP-11 — Inclusion copy accepted**  
Pass: entitlement mechanism and claims are real, Free is genuinely available, and owner approves customer-facing copy.

---

## 13. Phase I — HostShop, branding and reseller pricing

### I1. HostShop/branding staging

In a non-public preview first, configure only included entitlements:

- approved business/trading name, logo and palette;
- support/contact and escalation route;
- terms, privacy, acceptable-use, cancellation/refund and service-scope links;
- tax/currency display and invoice identity;
- accurate nameserver/status/support branding;
- customer lifecycle and suspension/renewal behavior;
- no false white-label, uptime, backup, security or support claims.

Keep 20i/provider facts accurate where disclosure is legally or contractually required. Confirm asset rights. Do not send customer email during preview.

### I2. Pricing model

Owner-requested monthly reseller hosting tiers:

| Tier | Monthly | Annual calculation | Annual price (10% discount) | Annual saving |
|---|---:|---:|---:|---:|
| Essentials | $11 | $11 × 12 = $132 | **$118.80** | $13.20 |
| Plus | $22 | $22 × 12 = $264 | **$237.60** | $26.40 |
| Tech Head | $33 | $33 × 12 = $396 | **$356.40** | $39.60 |

Before activation, the owner must confirm currency, tax inclusion/exclusion, tier feature matrix, resource caps, overages, support scope, cancellation/refund terms, renewal behavior and payment processor fees. Do not invent differentiated features merely to fit tier names. Configure exact annual totals rather than a rounded “one month free” claim.

### OWNER GATE G-06 — HostShop commercial activation

Approval names exact branding preview, currency/tax treatment, feature matrix, monthly and annual amounts, terms version, payment path, production hostname and go-live time. A zero-value test order must use an approved sandbox/test mode; no live self-purchase or customer charge is implied.

**Checkpoint CP-12 — HostShop ready/live**  
Pass: preview approved; totals calculate exactly; test lifecycle works without a real charge; legal/support links work; owner separately approves public activation.  
Stop: tax/currency ambiguity, unproven provisioning, real charge during testing, misleading claims or email leakage.

---

## 14. Managed WordPress operating SOP

### Intake

1. Identify owner, site, environment, business criticality, data classification and recovery objective.
2. Record package/site IDs and add production to do-not-touch.
3. Inventory domain/DNS, WordPress/core, PHP, theme/plugins, licenses, integrations, users and backup state.
4. Record current exact SHA/artifact where applicable and known drift.

### Routine maintenance

1. Read current health/security/update state.
2. Triage advisories and compatibility in staging.
3. Create and verify an off-provider pre-change backup.
4. Clone/sanitise into staging through the proven path.
5. Apply the smallest update set.
6. Test login, anonymous critical pages, forms with mail suppressed, API integration, links, accessibility, performance and logs.
7. Produce change plan, exact versions/SHA, evidence and rollback.
8. Obtain production approval.
9. Deploy in the approved window; verify; observe; close or roll back.

### Security and access

- named users only; least privilege; MFA for privileged accounts;
- quarterly access/key review and immediate revocation on role change;
- secrets in approved secret storage, never WordPress content or Git;
- restrict admin/SSH/API exposure where supported;
- record privileged actions and provider request IDs;
- no unreviewed plugin/theme installation or abandoned software.

### Backup and recovery

- monitor backup freshness and hash verification daily;
- perform quarterly isolated restore drills and after material backup-system changes;
- never delete the last known-good backup during cleanup;
- production restore requires exact owner approval and a current incident receipt.

### Incident path

Contain access, preserve logs/evidence, identify last known-good artifact/backup, notify owner, choose rollback or restore, verify integrity and document corrective action. Do not erase evidence or rotate shared credentials without assessing service impact.

**Checkpoint CP-13 — Operations accepted**  
Pass: ownership, access, monitoring, backup, patch, incident and quarterly restore responsibilities have named operators and schedules.

---

## 15. Production go-live sequence

Run separately for every production site:

1. Re-read owner approval; verify it matches target, SHA/hash, cost and window.
2. Re-inventory target and do-not-touch register.
3. Confirm current independent backup and tested rollback.
4. Confirm package, US location and entitlement state have not drifted.
5. Confirm staging checks are current for the same artifact.
6. Freeze release input and content/commercial evidence.
7. Apply the approved production mutation.
8. Verify runtime SHA/hash, HTTPS, redirects, health, critical journeys, privacy/disclosure, indexing and monitoring.
9. Verify DNS only if DNS change was explicitly approved; respect TTL and preserve prior records for rollback.
10. Watch the agreed observation window.
11. Roll back on failed acceptance; do not patch forward without a new approved plan.
12. Capture provider, deployment, backup, monitoring and owner acceptance receipts.

### OWNER GATE G-07 — Final live acceptance

The owner accepts the named site as live after reviewing its verification receipt. This gate does not approve later updates or another site.

**Checkpoint CP-14 — Live accepted**  
Pass: owner acceptance recorded; monitoring and backups are active; no unexplained charge, drift or failed check remains.

---

## 16. Exact checkpoint register

| Checkpoint | Required artifact | Pass authority |
|---|---|---|
| CP-00 Batch initialised | run record, receipt schema, do-not-touch categories | Operator, read-only |
| CP-01 Purchase reconciled | owner quote approval, provider receipt, MFA proof | Owner G-01 |
| CP-02 Discovery accepted | location, entitlements, API/package and endpoint inventories | Operator, read-only; G-02 only if changing default |
| CP-03 Package admitted | selection matrix, zero-charge quote, quota/rollback proof | Owner G-03 |
| CP-04 Affiliate staging ready | package/temp URL/SSL/access/WP checks | Approved staging authority |
| CP-05 Recovery proven | backup manifest and isolated restore report | Owner G-04 for cleanup only |
| CP-06 Release verified | exact SHA, artifact hash, CI, rollback, target | Owner G-05 |
| CP-07 WP promotion proven | clone/Blueprint/manual-path test and sanitisation proof | Approved staging authority |
| CP-08A Affiliate AU | market evidence and live acceptance | Owner per-market gate |
| CP-08B Affiliate UK | market evidence and live acceptance | Owner per-market gate |
| CP-08C Affiliate US | market evidence and live acceptance | Owner per-market gate |
| CP-09 MyPrimeDelivery | fail-closed staging and live-data rights | Owner workload gate |
| CP-10 Content360 | evidence-gated staging and architecture check | Owner workload gate |
| CP-11 AgentOS Free | real entitlement and approved claim copy | Owner commercial gate |
| CP-12 HostShop | branding, terms, test lifecycle and exact prices | Owner G-06 |
| CP-13 Managed WP ops | named RACI/schedules and incident path | Owner operations acceptance |
| CP-14 Live accepted | complete live verification and observation receipt | Owner G-07 |

No checkpoint can be self-certified by the same automation that performed the mutation when an independent read or human owner gate is specified.

---

## 17. Closeout and continuing controls

Close the batch only when:

- every attempted checkpoint has `PASS`, `BLOCKED`, `ROLLED_BACK` or explicitly accepted residual risk;
- provider inventory matches the internal resource register;
- every charge reconciles to an owner approval (normally `0.00` after the initial approved purchase);
- no temporary broad token remains; write tokens are scoped, rotated/expired as planned or revoked;
- production resources and backups are in the do-not-touch register;
- monitoring, backup and restore schedules are active;
- exact live SHA/artifact and rollback version are recorded per site;
- all temporary/test resources are either owner-approved for retention or separately approved for deletion;
- unresolved `UNKNOWN`s are assigned, dated and not silently treated as complete.

### Final report

Produce `closeout/20I-MASTER-001-CLOSEOUT.md` containing:

- purchased plan and reconciled cost;
- current entitlement/location summary;
- created resources and provider IDs;
- workload status by environment;
- exact deployed SHAs/artifact hashes;
- backup/restore evidence;
- HostShop pricing/branding activation status;
- all owner approval IDs;
- failed/rolled-back steps;
- remaining blockers and `UNKNOWN`s;
- next backup, restore drill, access review and renewal-review dates;
- an explicit statement that completion of this batch is not standing authority for future production changes or charges.

---

## 18. Execution-day owner approval card

Use this compact card at every gate:

```yaml
approval_id: OWNER-20I-YYYYMMDD-NNN
gate: G-XX
approved_by: owner identity
approved_at_utc: ISO-8601
expires_at_utc: ISO-8601
action: exact action
targets:
  - provider resource ID / domain
environment: staging|production
location_id: exact provider ID or N/A
package_type_id: exact provider ID or N/A
source_commit_sha: full SHA or N/A
artifact_sha256: exact hash or N/A
quoted_charge: exact currency and amount
maximum_charge: exact currency and amount
rollback: exact rollback artifact/backup/action
conditions: []
```

If actual execution differs from any field, approval is invalid and the operator must stop.

---

## 19. First safe execution slice

Immediately after account purchase, the maximum safe autonomous slice is:

1. CP-00 initialise receipts and protection list.
2. CP-01 reconcile the already owner-approved purchase and secure the account.
3. Read default/available locations; do not change them.
4. Inventory plan and entitlements.
5. Create/use a scoped read-only API credential.
6. Accept `GET /package` read-only and reconcile UI/API inventory.
7. Build the documented endpoint and package-type inventories.
8. Produce the staging selection and a current `0.00` quote.
9. Stop at G-03 for owner approval before creating `affiliate-master-staging`.

That slice maximises speed without converting discovery into purchase, provisioning or production authority.
