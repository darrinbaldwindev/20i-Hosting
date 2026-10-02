# GlobalShopCo-Headless deployment manifest

**Document-control classification:** DATED DEPLOYMENT-READINESS SNAPSHOT — FRESH BRANCH/SHA REBIND REQUIRED  

The embedded branch/SHA is historical evidence only. A fresh comparison shows the recorded SHA sits on a diverged lineage relative to current `main`; it must not be used as present staging authority. Before any staging action, resolve the authoritative current branch/revision, rerun the `READY_TO_UPLOAD_20I` contract on that exact SHA, bind a reproducible artifact/hash, and confirm rollback and owner gate evidence.

```yaml
site: GlobalShopCo-Headless
role: practical 20i-hosted frontend path
repository: GlobalShopCo-Headless
branch: work/headless-product-identity
source_commit_sha: 18ec52cc7f62fd666f67ce20255555012b519308
target_package_id: UNKNOWN
package_type_id: UNKNOWN
location_id: TBD
runtime_requirements: UNKNOWN
artifact_sha256: UNKNOWN
ready_to_upload_20i: BLOCKED
```

Boundary: the frontend may present approved catalogue/product data, but GlobalShopCo/Shopify remains the commerce, catalogue, checkout, and order authority. Historical next step: verify the recorded SHA's build/runtime requirements. Current next step: fresh-fetch/reconcile the authoritative branch and exact SHA, then verify build/runtime requirements, reproducible artifact, environment placeholders, smoke tests, and rollback against the contract.
