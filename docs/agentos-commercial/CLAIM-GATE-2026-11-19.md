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

Required WordPress candidate files: style.css, functions.php, front-page.php, index.php. The read-only scanner inspects PHP (including `.phtml`, `.phar`, `.inc` and alternative PHP version suffixes), HTML, JavaScript/TypeScript (including `.mjs`, `.cjs`, `.mts`, `.cts`), templates, Markdown, JSON, YAML, TXT, CSS/SCSS/LESS, SVG and XML source text under the supplied directory for obvious prohibited or review-required words and forms. It rejects missing essential files, nonregular files, symlinks, invalid UTF-8 and text files over 1 MiB. Traversal has a **256-entry budget, counting directories and files**, and a **32-level depth limit**, with explicit blocked diagnostics. The tool also checks opened file descriptors against earlier source metadata and enforces a maximum of 1 MiB during chunked reads to reduce symlink/substitution and memory risks. Incorrect CLI argument counts return a structured `BLOCKED` result with usage diagnostics and exit 2. Repeated violations are capped at **100 specific diagnostics** plus `DIAGNOSTICS_TRUNCATED`, preventing oversized review reports; truncation is a reason to investigate the source, **never a pass**. Passing means only **COPY_SCAN_COMPLETE_NOT_ACCEPTED**; it never grants upload or publication.

This negative scanner **does not parse PHP, JavaScript, CSS or WordPress semantics**, prove claims truthful, authenticate the GitHub source/owner, review licenses, check accessibility or legal compliance, check plugin/security configuration, or inspect My20i. Although Dirent, lstat and opened-descriptor checks reduce obvious unsafe source substitution, **a hostile/concurrently modified directory tree cannot be proven immutable by this scanner**. False positives and false negatives are possible; independent source and commercial review are still required.

## Original WordPress v0.2 archive handoff — offline acceptance precheck

Issue #14 records two Chat-local ZIP artifacts created 16 Nov 2026; **they are not present in canonical Git source custody**:

| Recorded source artifact | Recorded bytes | Recorded SHA-256 |
|---|---:|---|
| `agentos-wordpress-theme-v0.2.zip` | 14,526 | `34ce6b861ffaf31969fdc5ae461bec375f8df164695c4ee309a904c9ac70cd74` |
| `agentos-wordpress-source-v0.2.zip` | 24,643 | `e531a91b2865b46f74366c690ee7750cde2458e7f23035f4d4d5ffd78f465ef0` |

The read-only transfer checker added to this **existing site admission PR #17**, `tools/verify_agentos_theme_handoff.py`, accepts only two local ZIP paths and pins **both** historical bytes/size values:

~~~sh
python tools/verify_agentos_theme_handoff.py /private/agentos-wordpress-theme-v0.2.zip /private/agentos-wordpress-source-v0.2.zip
python -m unittest discover -s tests -p verify_agentos_theme_handoff_test.py -v
~~~

It rejects missing/nonregular/symlink inputs, size or digest mismatch, changed file metadata, unsafe archive paths, encrypted or nonregular entries, duplicate ZIP members, overlarge/decompression-bomb candidates, and any discrepancy between 11 core WordPress theme files in the theme-only and source packages. It does not extract or execute PHP. It uses **binary-mode file reads on Windows** and 64 KiB bounded reads, with a maximum 2 MiB per archive and 4 MiB declared uncompressed member total. Real-world ZIP structures not matching the expected theme root fail closed and must be separately investigated rather than forcing admission.

A valid match yields `HISTORICAL_ZIPS_MATCH_NOT_ACCEPTED`, **never READY**. This proves only that the transferred bytes match *recorded historical artifact hashes* and that the 11 listed theme files agree across the pair. It does **not** check all 17 originally declared source-manifest members or their per-member hashes, prove current canonical source freshness, original custodian approval, browser/WordPress behavior, independent claims acceptance, private staging entitlement/access control, charge or rollback. The archive pair has **not been obtained or run** in this 20i Overseer session.

The source should be transferred into a separately approved **private** website repository with named maintainer and exact source commit SHA after original-author readback; do not place theme PHP or potentially private source archive bytes into the public 20i deployment-control repository. Hosting account access, theme install/upload, DNS or billing are not authorized by this check.

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
