# GlobalShopCo Headless — Current WordPress Deployment Source Manifest

Status: SOURCE-BOUND / PACKAGE BUILT AND HASHED / RUNTIME NOT ACCEPTED  
Date: 2026-10-18

## Deployment-byte anchor identity

Repository:
`darrinbaldwindev/GlobalShopCo-Headless`

Branch:
`work/headless-product-identity`

Deployment-byte anchor source:
`2a5057cb52c799cc529d367e25cd7db25ed93876`

Deployment-byte anchor tree:
`21dad6bf1fd573d9c92dee5528f552042e373c5c`

This is not a promise that the branch head is still at the anchor SHA; the moving-head rule below controls current eligibility.

Anchor-head validation:
- workflow: `M3 checkout validation`
- run: `39107836737`
- job: `117617427847`
- conclusion: SUCCESS

## Deployment source roots

Plugin tree:
`wp-content/plugins/globalshopco-headless`
Git tree:
`d80a32f589ce145e4ebb20aea4fa9514ac40a7cf`

Theme tree:
`wp-content/themes/globalshopco-headless`
Git tree:
`c7c83fe4dd507857bb0da6d3fa72c1907020b44e`

## Exact current file set

| Path | Git blob | Bytes |
|---|---|---:|
| `wp-content/plugins/globalshopco-headless/README.md` | `ee3b33c9528891b18895d6f8069f6c144b6bc484` | 2,616 |
| `wp-content/plugins/globalshopco-headless/globalshopco-headless.php` | `456f6683437dbd2a3f5d7736c89559556fbbdc1a` | 16,582 |
| `wp-content/plugins/globalshopco-headless/headless-context.php` | `b011c5c6bd335734152f3ce8c507d2677679f3e2` | 6,994 |
| `wp-content/themes/globalshopco-headless/front-page.php` | `9b9d2537c0930d782078cb3394b87ae9cfd9b64b` | 257 |
| `wp-content/themes/globalshopco-headless/functions.php` | `87cb411867ae71354fae0f574cd4ca4ab45f3d29` | 705 |
| `wp-content/themes/globalshopco-headless/index.php` | `8752c52e15ac831e0135ba45b3fbc7bd95e63190` | 1,971 |
| `wp-content/themes/globalshopco-headless/style.css` | `7d7aeac9b2a0fcbcd03778e50b6bc07a66b45619` | 2,640 |

Count:
- 7 files
- 31,765 raw source bytes

## Packaging acceptance

A future upload/package may be promoted only when all seven files:
1. are fetched from this exact commit or a newer explicitly rebound source;
2. reproduce the exact Git blob identities above;
3. are placed only under the two declared WordPress roots;
4. are packaged deterministically;
5. receive an archive/package SHA-256;
6. pass path-safety/content checks;
7. preserve the plugin/theme directory layout;
8. are source-current immediately before provider mutation.

If any listed blob changes, this manifest is stale and must be regenerated.

## Runtime acceptance boundary

This source manifest is **not** a deployable artifact receipt.

Still required:
- deterministic package/archive build;
- package SHA-256;
- current-source recheck;
- provider ingress;
- pre-mutation rollback freshness;
- isolated WordPress upload/activation;
- canonical `docs/20I_POST_UPLOAD_SMOKE.md`;
- redacted runtime/deployment receipt.

## Authority boundary

No merge, deployment, provider mutation, credential/security change, Shopify publication mutation, DNS/billing action, production write or product publication is authorized by this manifest.


## Deployment-byte continuity

The source head advanced from `9900055c...` to `2a5057cb...`, but exact comparison found zero `wp-content/` changes.

Therefore the seven Git blobs and plugin/theme trees listed above remain the authoritative deployment source set for the current head.

This continuity finding must be rechecked if PR #5 advances again.


## Moving-head rule

This manifest binds the seven WordPress deployment blobs, not arbitrary documentation commits on the branch.

Before any package build/upload:
1. fetch the live `work/headless-product-identity` head;
2. compare from the manifest-bound deployment source to the live head;
3. require zero `wp-content/` changes;
4. verify all seven listed Git blobs still match;
5. only then reuse this payload identity.

Any deployment-file drift invalidates this manifest immediately.


## Deterministic package evidence — 2026-10-28

Work mode built the exact seven-file deployment package twice from the bound payload.

Result:
- two independent builds matched;
- package SHA-256:
  `49a09e31ef109dd4d190b6024067415bae12e5dfd1580bc89ec3822c33532db9`.

Latest observed live head:
`a972f315f2d2258046645adae02c7fc3adf69094`

Fresh comparison still found:
`WP_CONTENT_DRIFT = ZERO`

This package remains eligible for reuse only while:
- live compare shows zero `wp-content/` drift;
- all seven Git blobs still match;
- current exact-head CI/runtime admission is separately satisfied.

Package existence does not imply staging acceptance or provider authorization.
