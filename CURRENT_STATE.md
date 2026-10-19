# 20i-Hosting — Current State

**Last updated:** 2026-10-19  
**Repo:** https://github.com/darrinbaldwindev/20i-Hosting

---

## What this project is

Canonical **hosting control plane** for 20i: architecture, runbooks, SOPs, site admission, non-secret evidence. Not application source.

---

## What works today

- Architecture, CP master batch, seven approval gates  
- `READY_TO_UPLOAD_20I` contract  
- Site docs for Affiliate, Headless, GlobalShopCo boundary, MyPrimeDelivery, SEO hub  
- WordPress/20i operational SOP + runbooks  
- Global SOP pointer (incl. CUB Max ×96 envelope note)

## Hard boundaries

No standing authority for live deploy, DNS, production write, purchase, or billing. Owner gate per action.

## CUB / commerce dependency

| Workload | Rule |
|----------|------|
| GlobalShopCo-Headless | Staging OK under gates; **no** sellable Original Six until GlobalShopCo qualifies |
| Affiliate-Websites | Staging per pre-upload docs; production destinations separate approval |
| GlobalShopCo (Shopify) | Commerce authority stays in GlobalShopCo — this repo does not set sell prices |

## Next 3 priorities

1. Admit staging uploads only with exact SHA + owner target tuple  
2. Keep production Original Six sellable path closed until CUB economics clear  
3. Maintain runbook/SOP hygiene; no secret commits  

---

*Lightweight continuity.*
