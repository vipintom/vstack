---
name: vstack-blueprint
description: Compare solution structures and interfaces before substantial implementation
---
# vstack-blueprint

## When to Use
- Before implementing architectural changes
- When multiple solution structures are viable
- When `vstack-blast-radius` identifies wide impact
- When Lead requests design review before implementation

## When Not to Use
- For straightforward implementation with obvious approach
- For bug fixes with clear root cause and fix

## Required Context
- Discovery summary (from `vstack-discovery`)
- Sharpened problem and acceptance criteria
- Project architecture and conventions (from memory)

## Procedure

1. **Identify candidate structures** — 2-3 distinct approaches
2. **Define comparison criteria** — from principles and project needs:
   - Simplicity and clarity
   - Boundary alignment (coupling/cohesion)
   - Extensibility for known future needs
   - Testability
   - Migration cost
   - Team familiarity
3. **Sketch each candidate** — interfaces, data flow, key types, error handling
4. **Evaluate against criteria** — table with scores/notes
5. **Select or synthesize** — choose best or combine strengths
6. **Document decision** — chosen approach, rationale, rejected alternatives
7. **Record in project memory** (if available) as architecture decision

## Expected Outputs
- 2-3 candidate sketches with interfaces
- Comparison table
- Selected approach with rationale
- Architecture decision record (if applicable)

## Verification
- Candidates are meaningfully different (not cosmetic)
- Criteria reflect actual project priorities
- Decision addresses discovered constraints

## Stop Conditions
- Clear selected approach with documented rationale
- Ready for `vstack-plan-loop`

## Escalation
- No candidate satisfies constraints → escalate to Lead/architect
- Stakeholder disagreement → document positions, Lead decides

## Related Skills
- `vstack-discovery` — provides understanding
- `vstack-blast-radius` — informs criteria
- `vstack-plan-loop` — consumes blueprint
- `vstack-ledger` — records decision (optional skill)