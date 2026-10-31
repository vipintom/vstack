---
name: vstack-verify-loop
description: Execute checks, inspect failures and iterate within bounds
---

# vstack-verify-loop

## When to Use
- After implementation changes
- Before marking task complete
- When `vstack-plan-loop` defines verification steps
- When Lead requests evidence

## When Not to Use
- During exploratory work (use `vstack-discovery`)
- For review (use `vstack-review-loop`)

## Required Context
- Task with acceptance criteria
- Access to project check commands (test, build, lint, typecheck)
- Plugin tools if available (`vstack_check`)

## Procedure

1. **Identify required checks** from:
   - Task acceptance criteria
   - Project conventions (build, test, lint, typecheck)
   - Plan-defined evidence requirements
2. **Execute checks** (via plugin `vstack_check` or native commands):
   - Run each check explicitly
   - Capture exit code, output, duration
   - Record evidence (if plugin: `vstack_check` records automatically)
3. **Inspect results**:
   - Pass → continue
   - Fail → `vstack-debugging`
   - Skip/unavailable → document reason
4. **Iterate** — fix and re-run until all required checks pass
5. **Bound iterations** — max 3 cycles per check (then `vstack-unstick`)
6. **Record evidence** — link check results to task/delivery

## Expected Outputs
- Executed check results (pass/fail/skipped)
- Evidence records linked to task
- All required checks passing

## Verification
- Every required check executed (not assumed)
- Evidence records show actual observed results
- No check claimed passed without execution

## Stop Conditions
- All required checks pass with evidence
- Or: blocker documented with `vstack-unstick`

## Escalation
- Check unavailable in harness → document fallback, manual verification
- Required check fails persistently → `vstack-unstick`
- Evidence recording unavailable → manual log, escalate to Lead

## Related Skills
- `vstack-tdd` — for test checks
- `vstack-debugging` — for failures
- `vstack-unstick` — for stuck verification
- `vstack-check` (plugin tool) — executes and records