# Portfolio Global SOP Pointer

Status: ACTIVE POINTER / NO AUTHORITY WIDENING  
Canonical source: `darrinbaldwindev/Overseer/docs/overseer/CONTINUOUS-MAXED-VERTICAL-SOP.md`  
Blocker protocol: `darrinbaldwindev/Overseer/docs/overseer/GLOBAL-BLOCKER-ESCALATION-PROTOCOL.md`

## Execution rule

When the owner says `cont`, `continue`, `continue autonomously`, or `continue vertically`, use the canonical portfolio SOP unless this repository has a stricter local safety/authority rule.

Current canonical default:
- resume from the exact prior controller checkpoint;
- inspect only material deltas needed for the next executable action;
- execute up to **12 substantive maxed vertical batches**;
- 12 is a ceiling, not a quota;
- use fewer batches when useful work is exhausted;
- consolidate once;
- run one controller pass;
- continue automatically only while genuinely new safe work remains.

Maintain the canonical mode-aware queue:
- `CHAT_NOW`
- `WORK_MODE`
- `OWNER_ACTION`
- `EXTERNAL_ACCOUNT`
- `PHYSICAL`
- `BLOCKED_STABLE`

Execute known safe work before broad investigation. Do not perform a broad portfolio rescan by default.

## Blockers

If a blocker can be fixed safely here, fix it.

If it cannot:
- escalate it to the relevant Overseer;
- record exact evidence and the unblock condition;
- classify an unchanged, already-routed blocker as `BLOCKED_STABLE`;
- re-check only when its trigger fires;
- do not count repeated blocker summaries as progress;
- pivot to the next highest-value executable task.

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

It must leave a concise checkpoint containing:
- `P0`
- `Next CHAT_NOW`
- `Next WORK_MODE`
- `OWNER_ACTION`
- `BLOCKED_STABLE`
- the completion phrase.

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

Any repository-local reference to an “8-step batch”, “8-step SOP”, 3×6 default envelope, or equivalent former cycle wording is **SUPERSEDED** for active execution by the current canonical checkpoint-driven SOP. Historical records may retain old wording only as evidence history.
