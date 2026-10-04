# GlobalShopCo-Headless deployment manifest

```yaml
site: GlobalShopCo-Headless
role: 20i-hosted WordPress presentation path over Shopify authority
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
current_exact_head: 19ea70e20436d9c544decaa42d390378992ed20a
target_environment: isolated staging only
package_state: SOURCE_AND_EXACT_HEAD_CI_VERIFIED
commercial_staging_acceptance: BLOCKED
ready_to_upload_20i: BLOCKED_FOR_COMMERCIAL_ACCEPTANCE
```

Current exact-head evidence includes deterministic checkout-handoff tests, five-brand country-context tests, PHP syntax checks, and regression coverage for malformed successful GraphQL `data` payloads.

The WordPress plugin/theme path is allowed only for isolated **negative/fail-closed** staging verification while the canonical positive Shopify Storefront-visible publication-approval signal remains undefined.

Boundary:

- Shopify remains the source of truth for catalogue identity, price, inventory, cart, checkout and order state.
- Absence of blocking tags is not positive publication approval.
- Do not treat exact-head CI success as commercial staging acceptance.
- Runtime Shopify credentials remain outside Git and require separate approved secret handling.
- No production publication/deployment authority is granted here.

The current governance blocker is tracked outside this public repo; this file records only the deployment boundary.
