# Offline 20i staging admission preflight

This command performs **structural checks only** against the existing
[READY_TO_UPLOAD_20I/v1](../docs/contracts/READY_TO_UPLOAD_20I.md) contract.
It never returns `READY`, and never authorizes uploading, billing, changing
credentials, provisioning, DNS, production, or public release.

Run:

```sh
node --test tests/validate-admission.test.mjs
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
