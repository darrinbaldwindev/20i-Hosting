# GlobalShopCo-Headless deployment manifest

```yaml
site: GlobalShopCo-Headless
role: 20i-hosted WordPress presentation path over Shopify authority
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
current_exact_head: 2a5057cb52c799cc529d367e25cd7db25ed93876
target_environment: isolated non-production staging only
package_state: CURRENT_SOURCE_CI_VERIFIED__OLD_STAGING_PACKET_STALE
publication_signal_governance: CLEARED
runtime_acceptance: NOT_RUN
ready_to_upload_20i: BLOCKED_ON_PROVIDER_INGRESS_AND_FRESH_RUNTIME_PACKET
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
`work/headless-product-identity@2a5057cb52c799cc529d367e25cd7db25ed93876`

Exact-head hosted verification:
- workflow: `M3 checkout validation`
- run `39107836737`
- job `117617427847`
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


## 2026-10-18 deployment-packet invalidation

The previous isolated-runtime handoff was pinned to `1bdfcc3ddf47b25f9ccb6a05ee5e439bdc06181f`.

Current PR #5 head is:
`2a5057cb52c799cc529d367e25cd7db25ed93876`

Exact compare from the old target to the current head:
- 97 commits ahead;
- runtime plugin changed: `wp-content/plugins/globalshopco-headless/headless-context.php`;
- test/workflow and presentation contracts also changed.

Therefore the old `1bdfcc3...` staging/runtime packet must **not** be deployed or accepted as current.

Current exact-head CI:
- M3 checkout validation run `39107836737`;
- job `117617427847`;
- conclusion SUCCESS.

Before any future 20i runtime upload:
1. rebind the deployable WordPress payload to `9900055c...` or a newer exact approved head;
2. hash/package the exact current deployment files;
3. preserve the current provider-ingress/credential authority boundary;
4. only then perform isolated runtime smoke.

Provider ingress remains a separate blocker; this update does not authorize credentials, deployment, Shopify mutation or publication.


## 2026-10-18 original-six docs-only head advance

PR #5 advanced from `9900055c...` to `2a5057cb52c799cc529d367e25cd7db25ed93876`.

Exact compare:
- 7 commits ahead;
- no `wp-content/` deployment file changed;
- additions are original-six commercial/research/controller documents.

The exact seven-file WordPress deployment payload remains byte-current.

Current exact-head M3 validation:
- run `39107836737`
- job `117617427847`
- SUCCESS.

Do not regenerate the WordPress package solely because of these documentation-only commits. Commercial research evidence does not authorize publication or supplier/account activation.
