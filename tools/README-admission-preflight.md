# Offline 20i staging admission preflight

This command performs **structural checks only** against the existing
[READY_TO_UPLOAD_20I/v1](../docs/contracts/READY_TO_UPLOAD_20I.md) contract.
It never returns `READY`, and never authorizes uploading, billing, changing
credentials, provisioning, DNS, production, or public release.

Run:

```sh
node --test tests/validate-admission.test.mjs tests/validate-admission-cli.test.mjs
node tools/validate-admission.mjs manifest.json artifact.zip
```

The second command returns `BLOCKED` with exit **2** for missing or malformed
evidence, invalid/unreadable inputs, a missing artifact, or checksum mismatch.
A structurally complete fixture returns
`PRECHECK_COMPLETE_NOT_AUTHORIZED` with exit **0**. Exit zero means only that
these offline checks passed. It is **not** READY_TO_UPLOAD_20I acceptance.

The manifest JSON uses the existing v1 declaration fields and adds:
`provider_target_id`, `provider_region`, `package_type`,
`rollback_artifact_sha256` and an `evidence` object. Each evidence map key
must contain `state: "PASS"`, a non-placeholder `reference`,
`verifier`, and `checked_at_utc` ISO UTC timestamp.

All these independently evidenced gate keys are required:

```text
source_custody source_currentness dependency_review platform_compatibility
bootstrap configuration_secrets rewrites_https asset_licences reproducible_build
fresh_backup rollback_rehearsal independent_smoke independent_review
provider_target private_access_control zero_or_approved_charge
```

The caller **must not fabricate** these values, publish private provider
identifiers/charges to a public repository, or treat any self-reported
`PASS` as proof of external verification. The preflight cannot inspect
a live My20i session, canonical Git source drift, a third-party reviewer,
provider configuration, backup restore, or exact owner upload authorization.
Those checks remain **separate mandatory gates**.

For a new AgentOS static site, WordPress-specific v1 fields require an
explicit independently reviewed `platform_compatibility` disposition;
absence of WordPress is not automatically acceptable. Source custody and
staging access for 20i #13/#14 remain blocked.

## Evidence chronology and input safety

- SHA-1/SHA-256 values must be strings with the required 40/64 hexadecimal
  characters. Uppercase is accepted, but arrays, objects and numbers are
  rejected rather than silently string-coerced or allowed to throw.
- Each UTC evidence timestamp and `verified_at_utc` must represent a real
  calendar date in `YYYY-MM-DDTHH:mm:ss[.fraction]Z` form; an impossible day
  such as 30 February is blocked rather than normalized to March.
- A gate's `checked_at_utc` cannot be later than the manifest's
  `verified_at_utc`. This is chronology consistency, **not** evidence
  freshness proof: the independent admission controller still determines
  whether backup, approval and source observations are current enough.
  Comparison retains the **full fractional-second precision** supplied by
  each timestamp; a later event within the same millisecond is still blocked.
  Equivalent representations such as `.1Z` and `.100000Z` compare equal.
- `assess()` never grants upload authority. The CLI's exit code zero signals
  only a structurally complete offline precheck, never provider acceptance.
- Native CI runs the pure-function negative tests **and** subprocess CLI
  integration tests for exit codes and output, with immutable pinned
  Node 24-native GitHub Actions dependencies.
