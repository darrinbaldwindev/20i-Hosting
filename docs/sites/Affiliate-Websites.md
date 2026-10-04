# Affiliate-Websites deployment manifest

```yaml
site: Affiliate-Websites / RewardFinder
markets: [AU, UK, US]
repository: Affiliate-Websites
branch: main
current_repo_head: 960a65c5afa5433ec6137ad62513cb36a77b36ea
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
- Current source after packaging changed controller/envelope/authority/current-state documentation plus a portfolio summary only; no deterministic support ZIP member changed.
- Commercial routes remain fail-closed; editorial verification does not grant affiliate/outbound authority.
- Provider target identity has been verified through private provider evidence, but provider-specific identifiers are intentionally not published in this repository.

Remaining 20i boundary:

1. verify the allowed live staging upload mechanism;
2. capture pre-change rollback state;
3. upload/configure the exact verified staging payload;
4. run canonical post-upload smoke;
5. record a redacted deployment receipt.

No production, DNS, billing, credential/security, commercial activation or public publication authority is implied by this manifest.


## 2026-10-04 delta

Affiliate controller `REWARDFINDER-CONTROLLER-2026-10-04-10.md` confirms:
- active byte-bound support artifact remains `11290703976`;
- support-member source drift remains `NO`;
- later non-support-member workflow artifacts do not supersede the verified current support bytes solely because they were emitted later.

Therefore the deployment boundary remains live provider upload/configuration/smoke, not package regeneration.
