# Portfolio Global SOP Pointer

Status: ACTIVE POINTER / NO AUTHORITY WIDENING  
Canonical source: `darrinbaldwindev/Overseer/docs/overseer/CONTINUOUS-MAXED-VERTICAL-SOP.md`  
Blocker protocol: `darrinbaldwindev/Overseer/docs/overseer/GLOBAL-BLOCKER-ESCALATION-PROTOCOL.md`

## Execution rule

When the owner says `cont`, `continue`, `continue autonomously`, or `continue vertically`, use the canonical portfolio SOP unless this repository has a stricter local safety/authority rule.

Canonical default:
- resume from the exact prior controller checkpoint;
- inspect only material deltas needed for the next executable action;
- execute up to **12 substantive maxed vertical batches**;
- 12 is a ceiling, not a quota;
- use fewer when useful work is exhausted;
- consolidate once;
- run one controller pass;
- continue automatically only while genuinely new safe work remains.

## Current owner-selected extended envelope

Owner direction recorded on 2026-10-10 selects a **Portfolio Maximum Super Cycle** for subsequent CONT commands:

- up to **48 distinct substantive vertical execution batches**;
- Batch 49 — Consolidation;
- Batch 50 — Controller;
- Batch 51 — Handoff;
- Batch 52 — Final checkpoint.

This is an explicit extended envelope, not a replacement for the canonical 12-batch default.

Use fewer than 48 when useful authorised work is exhausted. Do not pad, repeat stable blockers, or invent batch completions.

Any later increase above 48 requires explicit owner selection.

## Mode-aware queue

Maintain:
- `CHAT_NOW`
- `WORK_MODE`
- `OWNER_ACTION`
- `EXTERNAL_ACCOUNT`
- `PHYSICAL`
- `BLOCKED_STABLE`

Execute known safe work before broad investigation.

## Blockers

If a blocker can be fixed safely here, fix it.

If it cannot:
- escalate it to the narrowest relevant Overseer;
- record exact evidence and unblock condition;
- classify unchanged routed blockers as `BLOCKED_STABLE`;
- re-check only when their trigger fires;
- do not count repeated blocker summaries as progress;
- fall through to the next highest-value executable task.

## Material-log rule

Create durable controller/log updates only when:
- state materially changes;
- a new artifact exists;
- a blocker changes;
- priority order changes;
- a reusable execution artifact is created.

Repeated status documentation is not progress.

## End-of-envelope declaration

The controller must declare exactly one:
- **MORE WORK — CONTINUE**
- **MORE WORK — BLOCKED**
- **NO MATERIAL WORK REMAINING**
- **WAIT FOR CHANGE**

## Local rule precedence

A stricter repository-specific rule may narrow execution.

A local rule may not:
- weaken governance/evidence requirements;
- bypass owner approval;
- authorize merge/deploy/publication/spend/credentials/production writes;
- fabricate Green/PRS/assurance/authentication/consent/commercial evidence;
- override physical-world or authenticated-account gates.

This file is a pointer, not a duplicate SOP. If wording conflicts, the canonical Overseer SOP controls unless the local rule is stricter.

## Legacy terminology

Any repository-local reference to an “8-step batch”, “8-step SOP”, `3×6` default envelope, or equivalent former cycle wording is **SUPERSEDED** for active execution. Historical records may retain old wording only as evidence history.
