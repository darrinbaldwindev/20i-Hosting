# GlobalShopCo-Headless deployment manifest

```yaml
site: GlobalShopCo-Headless
role: 20i-hosted WordPress presentation path over Shopify authority
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
current_exact_head: 1bdfcc3ddf47b25f9ccb6a05ee5e439bdc06181f
target_environment: isolated non-production staging only
package_state: SOURCE_AND_EXACT_HEAD_CI_VERIFIED
publication_signal_governance: CLEARED
runtime_acceptance: NOT_RUN
ready_to_upload_20i: BLOCKED_ON_ISOLATED_RUNTIME_ACCEPTANCE
```

## Exact current evidence

GlobalShopCo issue #65 is CLOSED.

Canonical positive publication signal:
- Shopify metafield: `globalshopco.publication_status`
- Storefront type: `single_line_text_field`
- sole positive value: exact `APPROVED`
- blocking tags override a positive signal
- Headless/WordPress are readers only and may never mint approval.

Current exact Headless target:
`work/headless-product-identity@1bdfcc3ddf47b25f9ccb6a05ee5e439bdc06181f`

Exact-head hosted verification:
- workflow: `M3 checkout validation`
- run `38014043056`
- job `114100294050`
- conclusion: SUCCESS

The previously open publication-governance blocker is therefore superseded by the runtime gate.

## Current 20i critical path

The next acceptance step is an isolated non-production WordPress/20i runtime verification against the exact SHA above.

Use:
`docs/20I_POST_UPLOAD_SMOKE.md`

Required publication matrix:
- absent -> blocked;
- malformed / wrong type / non-positive -> blocked;
- `APPROVED` + blocking tag -> blocked;
- `APPROVED` + unavailable/tampered variant -> downstream blocked;
- `APPROVED` + valid available canonical variant -> one Shopify cart handoff;
- revocation / non-positive transition -> checkout disappears on next canonical read.

Runtime evidence must retain:
- exact deployed SHA;
- WordPress/PHP versions;
- test product/variant identities;
- observed metafield value/type;
- blocking tags;
- cartCreate count/result;
- checkout-host result;
- relevant redacted logs.

## Authority boundary

This manifest does **not** authorize:
- minting/changing product publication approval;
- production Shopify mutation;
- merge/mark-ready;
- production deployment;
- DNS/billing changes;
- credential/security changes;
- product publication;
- production writes.

Repository CI verifies the contract only. Runtime acceptance remains unproven until the isolated staging smoke is executed and evidenced.
