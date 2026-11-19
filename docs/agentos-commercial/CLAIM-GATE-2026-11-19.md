# AgentOS WordPress commercial-site claim gate — 19 Nov 2026

**Scope:** Existing AgentOS commercial WordPress website under [20i issue #14](https://github.com/darrinbaldwindev/20i-Hosting/issues/14).
This is control-plane review and a bounded offline scanner, **not the actual WordPress theme source**. The originating WordPress theme v0.2 and its test archives have not been transferred into a canonical website repository; their historical hashes cannot be used as proof of current custody. My20i account read-only inventory is NOT_RUN and there is no verified staging host, entitlement, charge, access control or rollback.

## Approved product facts — specification, not published sales claims

| Claim | 19 Nov status | Authoritative owner handoff | Safe copy posture |
|---|---|---|---|
| Free standalone plan | Owner-approved product direction | [20i #14](https://github.com/darrinbaldwindev/20i-Hosting/issues/14), corrections posted 18 Nov 2026 | Draft-only: Free (US$0), 3 active projects; not proof of a working sign-up |
| Pro standalone plan | Owner-approved product direction | 20i #14 USD pricing correction | Draft-only: US$99 per year, 25 active projects; no checkout |
| Subscription standalone plan | Owner-approved product direction | 20i #14 USD pricing correction | Draft-only: US$22 per month, 100 active projects; **not** Pro-required |
| Free model and schedule allowances | Owner-approved direction | 20i #14 three-tier correction | Two free AI models and one local model; 3 schedules; GitHub connection; **no** Free multi-agent or cross-device. Actual model identities and working integrations unverified |
| Add-ons / historical tiers | **SUPERSEDED** | 20i #14 owner correction | Never advertise monthly add-on, Pro+Subscription dependency, Co-worker/Operator/AI Plus, old US$29/39/49 offers |
| Trials, tax, refund, renewals and commerce | **NOT APPROVED FOR LIVE RELEASE** | 20i #14 corrections | No "free trial" or conversions, tax inclusion, refunds, live signup/payment buttons or Stripe/WordPress license issuance |
| Feature capabilities and 21 AGF requirements | Requirements; not independently accepted or live | [AgentOS #241](https://github.com/darrinbaldwindev/AgentOS/issues/241), draft [AgentOS PR #262](https://github.com/darrinbaldwindev/AgentOS/pull/262) | Label concept / specified / in-development only unless individually verified; no "production ready", independently certified or guaranteed outcomes |
| 20i WordPress marketing vs AgentOS runtime/billing | Separate | 20i #14 security coordination, draft [AgentOS PR #255](https://github.com/darrinbaldwindev/AgentOS/pull/255) | Marketing-only; no entitlement, license activation or payment trusted in WordPress |
| WordPress v0.2 theme and source custody | **NOT_TRANSFERRED / NOT_ACCEPTED** | 20i #14 original theme receipt | Don't assert source SHA, artifact currentness, native WordPress pass, or deployed package |
| Private staging target, backup, rollback | **UNKNOWN / HOLD** | [20i READY_TO_UPLOAD_20I contract](../contracts/READY_TO_UPLOAD_20I.md), 20i #14 and #15 | No upload, publish, DNS, provisioning, billing or provider mutation until independent gates plus exact-target owner approval |

Prices above are **internal owner-approved specifications**; the currency is USD. Tax-display, renewal, trial, refund, legal copy and checkout policy remain unresolved, so the scanner conservatively flags even current dollar-priced copy for independent review before release.

## Executable conservative copy check

From the 20i-Hosting working tree:

~~~sh
node --test tests/validate-agentos-theme-copy.test.mjs
node tools/validate-agentos-theme-copy.mjs /path/to/agentos-commercial-theme
~~~

Required WordPress candidate files: style.css, functions.php, front-page.php, index.php. The read-only scanner inspects PHP, HTML, JS/TS, Markdown, JSON, TXT, CSS, SVG and XML source text under the supplied directory for obvious prohibited or review-required words and forms. It rejects missing essential files, nonregular files, symlinks, invalid UTF-8 and text files over 1 MiB. Traversal has a **256-entry budget, counting directories and files**, and a **32-level depth limit**, with explicit blocked diagnostics. The tool also checks opened file descriptors against earlier source metadata and enforces a maximum of 1 MiB during chunked reads to reduce symlink/substitution and memory risks. Incorrect CLI argument counts return a structured `BLOCKED` result with usage diagnostics and exit 2. Passing means only **COPY_SCAN_COMPLETE_NOT_ACCEPTED**; it never grants upload or publication.

This negative scanner **does not parse PHP, JavaScript, CSS or WordPress semantics**, prove claims truthful, authenticate the GitHub source/owner, review licenses, check accessibility or legal compliance, check plugin/security configuration, or inspect My20i. Although Dirent, lstat and opened-descriptor checks reduce obvious unsafe source substitution, **a hostile/concurrently modified directory tree cannot be proven immutable by this scanner**. False positives and false negatives are possible; independent source and commercial review are still required.

## Custodian ACK / remaining evidence

- 20I_ACK: ACK for **this control-plane claim-matrix reconciliation only**
- WORDPRESS_SOURCE_CUSTODY: **NOT_TRANSFERRED**
- MEMBERSHIP_COPY_RECONCILIATION: **SPECIFICATION_RECONCILED / ACTUAL_THEME_NOT_RUN**
- CLAIM_MATRIX: this file
- WORDPRESS_REAL_RENDERING: **NOT_RUN**
- MY20I_ACCOUNT_ACCESS: **BLOCKED — no originating authenticated browser context**
- STAGING: **HOLD**
- PROVIDER_MUTATION: **NONE**
- NEXT_OWNER_ACTION: original source custodian must transfer/read back WordPress v0.2 source into a separate private website repository; an authorized account session must be available for read-only 20i inventory. No duplicate i5 dispatch; 20i #15 remains AgentOS Overseer-owned.

The user authorized source preparation and read-only account inspection; not a deployment, paid provision, checkout, DNS, credential or production change.
