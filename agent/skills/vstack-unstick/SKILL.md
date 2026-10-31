---
name: vstack-unstick
description: Change approach after repeated failed attempts
---
# vstack-unstick

## When to Use
- Same approach failed 3+ times (per `vstack-debugging` or `vstack-verify-loop` bounds)
- Stuck on same error despite different fixes
- Fundamental assumption may be wrong

## When Not to Use
- First or second failure (use `vstack-debugging`)
- When a new approach is already identified

## Required Context
- Failed attempts with evidence
- Current approach and assumptions
- Discovery/plan context

## Procedure

1. **Stop repeating** — acknowledge the pattern
2. **List attempted approaches** with outcomes
3. **Question assumptions**:
   - Is the problem correctly understood? (return to `vstack-sharpen`)
   - Is the approach fundamentally wrong? (return to `vstack-blueprint`)
   - Are constraints different than assumed? (return to `vstack-discovery`)
   - Is the acceptance criterion wrong? (escalate to Lead)
3. **Choose a materially different approach**:
   - Different algorithm/architecture
   - Different library/tool
   - Different decomposition
   - Manual then automate
   - Defer and work around
4. **Time-box the new approach** — 1-2 cycles max
5. **Escalate if still stuck** — Lead decision required

## Expected Outputs
- Documented failed attempts
- Identified assumption to challenge
- New approach with rationale
- Or: escalation to Lead with summary

## Verification
- At least 3 failed attempts documented
- New approach is materially different (not tweak)
- Or: clear escalation with context

## Stop Conditions
- New approach identified and tried
- Or: escalated to Lead

## Escalation
- Lead cannot resolve → architectural review, external expertise
- Time/cost exceeds budget → scope reduction, deferral

## Related Skills
- `vstack-debugging` — provides failure evidence
- `vstack-verify-loop` — provides check failures
- `vstack-sharpen` — re-clarify problem
- `vstack-blueprint` — alternative design
- `vstack-discovery` — re-understand constraints