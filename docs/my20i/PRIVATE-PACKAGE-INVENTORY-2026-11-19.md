# My20i package inventory — private local redaction gate

**Status:** Offline tool candidate only / **My20i account NOT ACCESSED** / **no provider or website mutations**.

This control-plane helper summarizes an existing **locally held JSON response** from 20i's documented reseller GET /package endpoint. It has no 20i API client, authentication, network request, token or secret storage, and cannot create, edit, upload or remove any hosting resource.

## Provenance and scope

Official 20i provider documentation:
- [Retrieve packages via the reseller API](https://docs.20i.com/api/retrieve-packages-api): GET /package returns an array of package objects, with id, enabled, names, packageTypeName, stackUsers, and other fields.
- [20i reseller API documentation](https://docs.20i.com/api/20i-api-documentation): current account API documentation is reached in My20i through reseller API settings.
- [20i API update, May 2026](https://www.20i.com/blog/our-reseller-api-docs-just-got-a-major-upgrade/): documentation was reorganised and WordPress management endpoints became more discoverable.

These are examples and documentation, **not evidence that this user has reseller API entitlement, working credentials, or a specific account configuration**. Do not create an API key, change credential settings or experiment with a paid request as a consequence of this helper.

## Run on a previously obtained private export

~~~sh
node --test tests/summarize-my20i-packages.test.mjs
node tools/summarize-my20i-packages.mjs /private/local/path/20i-package-response.json
~~~

The raw response may contain domains, customer labels, package IDs and StackCP user references: **retain it privately; never put it in a public GitHub issue, CI log, ChatGPT message or repository**. No credentials should ever be pasted into this project. The helper emits only category aggregates, enabled/disabled counts and total domain-entry count. It does not echo source filenames, raw records, IDs, user references or domain names; the input stays on the local filesystem.

Only one response shape is accepted: a top-level JSON array of package rows matching the documented shape, **including at least one domain entry per package**. This requirement conservatively rejects surprising empty-domain rows as schema drift, rather than inferring they are free hosting capacity. Unsupported or malformed input yields BLOCKED and exit code 2; a successfully parsed input yields LOCAL_PACKAGE_SUMMARY_NOT_PROVIDER_VERIFIED and exit code 0. **Exit 0 means local parsing only**. The tool refuses symlinks, nonregular inputs, malformed UTF-8, files above 2 MiB, input/descriptor identity mismatches and changed file metadata; it accepts no account credentials or network-origin URLs. It also **rejects duplicate JSON object property names at every nesting level**, including keys expressed once literally and once using escaped Unicode. This matters because standard JavaScript JSON parsing otherwise silently keeps the last value, potentially altering account inventory counts. Duplicates return the fixed code `INPUT_DUPLICATE_JSON_KEY`, with no property names or values copied into the report.

This aggregation deliberately **cannot prove**:
- Whether a My20i session is authenticated or reseller API entitlement exists;
- Whether a listed package is unused or safe to repurpose;
- Available reseller quota, region, charge, target hostname or site access protections;
- Actual WordPress installation status, backup, rollback, PHP/runtime readiness;
- 20i provider acceptance, independent reviewer acceptance or staging upload permission.

All reports explicitly set provider identity/verification, capacity, staging-target and upload authority to **false**. The tool does not produce a READY_TO_UPLOAD_20I manifest.

## Handoff / ownership

The existing [20i issue #15](https://github.com/darrinbaldwindev/20i-Hosting/issues/15) is the one i5 authenticated **read-only** My20i inventory request under **AgentOS Overseer** admission. This offline helper does not dispatch or replace that mission and is not an acknowledgment that it ran.

If an authorized source can privately obtain a 20i GET /package response without credential/account mutations, use this helper to generate a **non-secret preliminary category count**. Provider-authenticated package IDs, exact safe target, capacity, charge, protected access, fresh backup, independent review and owner exact-target upload approval remain separate governed admission steps under [20i issue #14](https://github.com/darrinbaldwindev/20i-Hosting/issues/14) and READY_TO_UPLOAD_20I.

**Current truth:** user opened My20i in an in-app tab; this Chat session's connected browser list_tabs failed with the originating-browser-context access error. Opening a My20i URL does **not** prove login state or account access. No My20i authenticated inspection, API call or provider mutation was executed here.
