---
name: vstack-context-reset
description: Preserve progress and resume after context interruption
---
# vstack-context-reset

## When to Use
- At natural boundaries (task complete, before review, end of session)
- When context window is filling
- When handing off to another agent/session
- When resuming interrupted work

## When Not to Use
- Mid-implementation without a boundary
- When context is still sufficient

## Required Context
- Current delivery/task state
- Completed work and evidence
- Decisions made and rationale
- Open questions and blockers
- Next actions

## Procedure

### At Boundary (Preserve)
1. **Summarize completed work** — what was done, evidence, decisions
2. **Record current state** — task status, blockers, partial progress
3. **Document decisions** — what was chosen, why, alternatives rejected
4. **List open questions** — unknowns, pending decisions, risks
5. **Define next actions** — specific, actionable, ordered
6. **Store in project memory** (if plugin) or handoff document

### At Resumption (Restore)
1. **Read handoff/memory** — objective, completed, decisions, open items
2. **Verify current state** — check actual code vs recorded state
3. **Validate assumptions** — run quick checks if needed
4. **Confirm next action** — proceed from documented next step

## Expected Outputs
- Handoff summary (objective, completed, decisions, open, next)
- Or: verified resumption with confirmed state

## Verification
- Handoff enables fresh agent to continue without re-discovery
- Resumption verifies actual state matches recorded state
- No completed work re-done

## Stop Conditions
- Handoff documented, or resumption verified

## Escalation
- State mismatch on resumption → investigate, don't assume
- Critical decision undocumented → escalate to Lead

## Related Skills
- `vstack-lessons` — captures patterns from interruptions
- `vstack-catchup` (optional) — brings fresh agent up to speed
- Project memory (plugin) — persistent storage