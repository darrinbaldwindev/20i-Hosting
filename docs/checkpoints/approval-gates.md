# Seven owner approval gates

These gates are preserved from batch `20I-MASTER-001`. Approval is exact, time-bounded, and non-transferable. Drift in target, SHA, artifact, location, package type, cost, scope, or timing invalidates approval.

| Gate | Decision | Minimum approved tuple |
|---|---|---|
| G-01 | Purchase | Exact plan, term, total including tax, currency, renewal amount or accepted `UNKNOWN`; no add-ons |
| G-02 | Default location change, if required | Current and target location IDs, affected scope, effect on existing resources; otherwise `NOOP` |
| G-03 | Staging resource creation | Package type ID, location ID, deterministic label, expected charge `0.00`, quota impact, deletion/rollback path |
| G-04 | Restore-drill cleanup | Identified isolated drill resource and accepted restore evidence |
| G-05 | Production deployment | Workload, target package ID, DNS scope, exact source SHA, artifact hash, window, rollback version, charge, verifier |
| G-06 | HostShop commercial activation | Approved preview, currency/tax, feature matrix, prices, terms, payment path, production hostname, go-live time |
| G-07 | Final live acceptance | Named site and complete live verification receipt after observation |

Use the approval card in the master batch. Silence, an earlier approval, a successful dry run, or an existing entitlement is not approval for a later action.
