# GlobalShopCo-Headless deployment manifest

```yaml
site: GlobalShopCo-Headless
role: 20i-hosted WordPress presentation path over Shopify authority
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
current_exact_head: LIVE_LOOKUP_REQUIRED_BEFORE_MUTATION
target_environment: isolated non-production staging only
package_state: SEVEN_FILE_PACKAGE_BUILT_AND_HASHED__CURRENT_HEAD_CI_BLOCKED
publication_signal_governance: CLEARED
runtime_acceptance: NOT_RUN
ready_to_upload_20i: BLOCKED_ON_UNAUTHENTICATED_PROVIDER_SESSION_AND_CURRENT_HEAD_CI
```

## Exact current evidence

GlobalShopCo issue #65 is CLOSED.

Canonical positive publication signal:
- Shopify metafield: `globalshopco.publication_status`
- Storefront type: `single_line_text_field`
- sole positive value: exact `APPROVED`
- blocking tags override a positive signal
- Headless/WordPress are readers only and may never mint approval.

Current Headless branch:
`work/headless-product-identity`

Live branch head is moving during active research/controller cycles. Fetch it immediately before any package or provider mutation.

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


## Live-head / deployment-byte policy

The commerce branch is actively receiving documentation/research commits.

Last observed live head during CUB ×96:
`54476237a27319d339de5787c6c5fe604331dcdb`

The previously bound seven-file WordPress payload remains admissible **only if** an immediate pre-mutation compare from its bound deployment source shows zero `wp-content/` changes and all seven Git blobs still match the source manifest.

Do not continuously rewrite package identity for documentation-only head churn.

If any `wp-content/` blob changes:
- mark the package stale;
- regenerate the deployment source manifest;
- rebuild/hash the package;
- rerun exact-head CI as required.

This policy separates moving repository head from stable deployable bytes without weakening source-currentness.


## Latest observed deployment-byte continuity — successor2

Last observed live commerce head during the subsequent CUB ×96:
`507349fdf7af6ec575f5bbef32be734c54700645`

Compare from deployment-byte anchor `2a5057cb52c799cc529d367e25cd7db25ed93876`:
- 21 commits ahead;
- zero `wp-content/` changes;
- changed files were original-six commercial/research/controller documents only.

Observed exact-head hosted verification:
- workflow `M3 checkout validation`;
- run `39109316335`;
- job `117621816775`;
- conclusion SUCCESS;
- plugin syntax PASS;
- deterministic checkout-handoff tests PASS;
- ten-brand country-context tests PASS.

This is evidence history, not an immutable head pin. The live-head / zero-deployment-drift gate still controls immediately before package build or provider mutation.


## 2026-10-28 deterministic package receipt

Latest Work evidence:

- observed live PR #5 head: `a972f315f2d2258046645adae02c7fc3adf69094`;
- fresh compare against the seven-file deployment-byte anchor: `WP_CONTENT_DRIFT = ZERO`;
- deterministic seven-file WordPress package built twice;
- both copies matched exactly;
- package SHA-256:
  `49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`.

Current exact-head CI:
- run `40640557835`;
- job `122657449393`;
- FAILURE before executable steps;
- no useful job log/steps.

Therefore:
- package bytes are PREPARED and reusable while zero deployment drift remains true;
- runtime admission is NOT cleared;
- provider ingress is still blocked by unavailable authenticated My20i session.

Do not rebuild merely because documentation/commercial files advance. Rebuild only if live `wp-content/` drift is detected.


## 2026-10-31 Headless source-drift invalidation (current correction)

This supersedes the **reusable while zero `wp-content/` drift** statement above for the current draft PR head. The 2026-10-28 package receipt remains historical evidence only.

- Previous PR #5 head: `a972f315f2d2258046645adae02c7fc3adf69094`; seven-file package SHA-256 `49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`.
- Current PR #5 head: `12a304f9c77b185bf5fc6e4ad61f987d3f1f1a1d`; changed `wp-content/plugins/globalshopco-headless/globalshopco-headless.php` (blob `b5cb053c9d08724a83d5080eaf82ff71806bede1`) and `tests/m3-checkout-handoff-test.php` (blob `d7df737579755adf348a30f689809a0ccce506bf`).
- Current-head hosted run `41092460821`, job `124189588084`: FAILURE, `steps=[]`; **integrated PHP/M3 tests NOT_RUN**. A 26/26 PASS *isolated candidate* does not establish exact-head integration or independent acceptance.
- **Decision: PRIOR PACKAGE INVALIDATED FOR CURRENT HEAD / NO UPLOAD.** New deterministic package digest is NOT_YET_BUILT; current-head WordPress runtime NOT_RUN; independent maintainer/reviewer acceptance PENDING; authenticated My20i target ingress, fresh files+DB rollback and owner upload/deploy authority ABSENT.
- Next Headless/Websites gate: exact-head PHP syntax + canonical M3 negative/render suite, review conservative decimal precision and currency policy, independent disposition. Only then rebuild/hash exact-current-head seven-file payload. 20i Overseer must separately verify target/rollback/authority before any upload.

No Shopify product, publication, supplier/media, DNS, billing, hosting target or production mutation is authorised by this correction.
