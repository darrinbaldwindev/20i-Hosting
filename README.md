# 20i Hosting

Canonical, private control repository for the **20i Overseer** hosting workstream.

## Purpose

This repository governs the evidence-first path from an owner-approved 20i purchase through staging, verified release, and separately approved production acceptance. It records architecture, runbooks, checkpoints, site admission status, operational SOPs, and non-secret evidence conventions.

## Ownership and authority

- **Owner:** approves charges, purchases, plan or billing changes, production changes, DNS, public release, destructive recovery, and customer-facing commercial settings.
- **20i Overseer:** operating role that coordinates discovery, verification, readiness, receipts, and approved execution. It is not a separate repository and has no standing purchase or production authority.
- **Site repositories:** remain authoritative for application source, tests, builds, and releases.
- **20i:** is the hosting/control-plane provider; provider UI/API output is evidence, not authority.

## Scope

- One 20i server/location initially; a US default is acceptable. The exact location ID remains `TBD` until read-only discovery proves it.
- Staging-to-production runbooks for approved workloads.
- WordPress/20i operations, owner-controlled backups, rollback, exact-SHA verification, and append-only non-secret evidence.
- Deployment manifests for GlobalShopCo-Headless, Affiliate-Websites, and MyPrimeDelivery.
- A boundary record for GlobalShopCo, which remains the Shopify commerce, catalogue, and order authority.

## Hard boundaries

This repository grants **no authority** to make a live deployment, DNS change, production write, credential change, purchase, billing change, or public launch. Each requires explicit owner authorization at the applicable gate.

Paid backups are not authorized. Owner-controlled off-provider backup and restore evidence is preferred. Secrets, credentials, private keys, session data, database dumps, raw backups, and environment values must never be committed.

## Canonical starting points

- [Architecture](docs/architecture/hosting-deployment.md)
- [CP-00 through CP-14 master batch](docs/checkpoints/20I_MASTER_PURCHASE_TO_LIVE_EXECUTION_BATCH.md)
- [Seven approval gates](docs/checkpoints/approval-gates.md)
- [`READY_TO_UPLOAD_20I` contract](docs/contracts/READY_TO_UPLOAD_20I.md)
- [Portfolio status](docs/sites/portfolio-status.md)
- [Operational SOP](docs/sops/wordpress-20i-operations.md)
- [Evidence convention](evidence/README.md)

## Relationship to site repositories

This repository coordinates deployments; it does not copy or replace application source. A deployment is admitted only from a named repository and exact full commit SHA, with a reproducible artifact, tests, rollback material, and an owner-approved target tuple.

Unknown provider IDs, entitlements, costs, regions, package types, or live configuration are deliberately recorded as `UNKNOWN` or `TBD` and must not be guessed.
