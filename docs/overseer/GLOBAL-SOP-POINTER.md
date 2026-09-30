# Portfolio Global SOP Pointer

Status: ACTIVE POINTER / NO AUTHORITY WIDENING  
Canonical source: `darrinbaldwindev/Overseer/docs/overseer/CONTINUOUS-MAXED-BATCH-SOP.md`  
Blocker protocol: `darrinbaldwindev/Overseer/docs/overseer/GLOBAL-BLOCKER-ESCALATION-PROTOCOL.md`

## Execution rule

When the owner says `cont`, `continue`, `continue autonomously`, or `continue vertically`, use the canonical portfolio SOP unless this repository has a stricter local safety/authority rule.

Default envelope:
- 3 consecutive cycles;
- 6 **maxed continued vertical batches** per cycle;
- Step 7 consolidation;
- Step 8 controller.

Each maxed batch pushes one coherent vertical to its current safe boundary before moving on.

## Blockers

If a blocker can be fixed safely here, fix it.

If it cannot:
- escalate it to the relevant Overseer;
- record exact evidence and the unblock condition;
- re-check it on the next CONT / next cycle;
- do not count repeated unchanged blocker summaries as new progress;
- pivot to distinct safe adjacent work when available.

## End-of-envelope declaration

The final controller must declare exactly one:
- **MORE WORK — CONTINUE**
- **MORE WORK — BLOCKED**
- **NO MATERIAL WORK REMAINING**
- **WAIT FOR CHANGE**

It must state what remains, what is blocked, what was escalated, whether blockers were re-checked, and whether another 3-cycle envelope should start.

## Local rule precedence

A stricter repository-specific rule may narrow execution.

A local rule may not:
- weaken governance/evidence requirements;
- bypass owner approval;
- authorize merge/deploy/publication/spend/credentials/production writes;
- fabricate Green/PRS/assurance/authentication/consent/commercial evidence;
- override physical-world or authenticated-account gates.

This file is a pointer, not a duplicate SOP. If wording conflicts, the canonical Overseer SOP controls unless the local rule is stricter.
