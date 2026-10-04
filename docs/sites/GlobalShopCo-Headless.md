# GlobalShopCo-Headless deployment manifest

```yaml
site: GlobalShopCo-Headless
role: 20i-hosted WordPress presentation path over Shopify authority
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
current_exact_head: be9e45b2bc3cf6c903c832c6ccaf29e838c827e0
target_environment: isolated staging only
package_state: SOURCE_AND_EXACT_HEAD_CI_VERIFIED
commercial_staging_acceptance: BLOCKED
ready_to_upload_20i: BLOCKED_FOR_COMMERCIAL_ACCEPTANCE
```

Current exact-head evidence:
- push workflow run `37165639538` — SUCCESS;
- pull-request workflow run `37165641735` — SUCCESS;
- workflow: `M3 checkout validation`.

Since the previously recorded `19ea70e...` head, the branch advanced by five commits affecting only the Headless theme:
- `wp-content/themes/globalshopco-headless/functions.php`;
- `wp-content/themes/globalshopco-headless/index.php`;
- `wp-content/themes/globalshopco-headless/style.css`.

The new head therefore supersedes the previous public exact-head reference.

The WordPress plugin/theme path remains limited to isolated **negative/fail-closed** staging verification while the canonical positive Shopify Storefront-visible publication-approval signal remains undefined.

Boundary:
- Shopify remains source of truth for catalogue identity, price, inventory, cart, checkout and order state.
- Absence of blocking tags is not positive publication approval.
- Exact-head CI success does not grant commercial staging acceptance.
- Runtime Shopify credentials remain outside Git and require separate approved secret handling.
- No production publication/deployment authority is granted here.

GlobalShopCo issue #65 remains the controlling governance blocker.
