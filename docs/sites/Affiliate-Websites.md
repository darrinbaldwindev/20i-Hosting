# Affiliate-Websites deployment manifest

```yaml
site: Affiliate-Websites / RewardFinder
markets: [AU, UK, US]
repository: Affiliate-Websites
branch: main
current_repo_head: 96f8805d538f8fedd4ebed2ba98d44d66da031d7
current_support_source_head: eeb05366347ab77a751f75565841294931354bd9
target_environment: staging
package_state: VERIFIED_CURRENT_SUPPORT_BYTES
runtime_state: NOT_DEPLOYED
ready_to_upload_20i: BLOCKED_ON_LIVE_UPLOAD_PATH_AND_RUNTIME_SMOKE
```

Current public-safe readiness state:

- RewardFinder catalogue: 75 verified programme records across AU / UK / US = 26 / 26 / 23.
- Theme source did not change during the latest catalogue/editorial tranche.
- Current support package was independently byte-bound by the 20i Overseer against the exact package source.
- The deterministic support package contains the staging MU-plugin, AU/US earning fixture, UK earning fixture, current editorial payload, pre-upload manifest and post-upload smoke checklist.
- Current source after packaging changed only controller/envelope/authority documentation, not deployable support members.
- Commercial routes remain fail-closed; editorial verification does not grant affiliate/outbound authority.
- Provider target identity has been verified through private provider evidence, but provider-specific identifiers are intentionally not published in this repository.

Remaining 20i boundary:

1. verify the allowed live staging upload mechanism;
2. capture pre-change rollback state;
3. upload/configure the exact verified staging payload;
4. run canonical post-upload smoke;
5. record a redacted deployment receipt.

No production, DNS, billing, credential/security, commercial activation or public publication authority is implied by this manifest.
