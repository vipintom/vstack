---
name: vstack-sharpen
description: Clarify and improve an underspecified request
---

# vstack-sharpen

## When to Use
- User request is vague, ambiguous, or missing acceptance criteria
- Before `vstack-discovery` or `vstack-plan-loop`
- When Lead cannot form a clear task breakdown

## When Not to Use
- Request already has clear problem statement and acceptance criteria

## Required Context
- Initial user request or problem statement
- Access to user for clarification (or ability to make reasonable assumptions)

## Procedure

1. **Restate the request** in your own words
2. **Identify missing pieces**:
   - What is the specific problem?
   - What does "done" look like? (acceptance criteria)
   - What are the constraints? (time, scope, risk, compatibility)
   - What is out of scope?
3. **Propose a sharpened version** with:
   - Clear problem statement
   - 3-5 testable acceptance criteria
   - Explicit scope boundaries
   - Risk level (low/medium/high/critical)
4. **Confirm with user** (or document assumptions if user unavailable)
5. **Record the sharpened request** as the delivery objective

## Expected Outputs
- Sharpened problem statement
- Acceptance criteria (testable, specific)
- Scope boundaries
- Risk assessment

## Verification
- Acceptance criteria are testable (pass/fail determinable)
- Scope boundaries exclude known out-of-scope items
- Risk level matches potential blast radius

## Stop Conditions
- User confirms sharpened request, or assumptions documented

## Escalation
- User cannot clarify → document assumptions, proceed with `vstack-discovery`
- Fundamental ambiguity remains → escalate to human decision

## Related Skills
- `vstack-discovery` — follows sharpening for substantial work
- `vstack-plan-loop` — uses sharpened request as input
- `vstack-mode` — establishes working context