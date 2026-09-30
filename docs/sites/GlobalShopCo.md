# GlobalShopCo authority boundary

GlobalShopCo remains the Shopify commerce, catalogue, checkout, and order authority. This repository does not authorize migrating, copying, or replacing that authority in 20i or WordPress.

```yaml
site: GlobalShopCo
repository: GlobalShopCo
branch: UNKNOWN
source_commit_sha: UNKNOWN
20i_role: integration-boundary-only
ready_to_upload_20i: BLOCKED
```

Any 20i-hosted frontend must use approved integration contracts, fail closed when commercial truth is unavailable, and avoid introducing an alternate catalogue/order system.
