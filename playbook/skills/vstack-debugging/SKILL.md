---
name: vstack-debugging
description: Diagnose failures from evidence and root cause
---

# vstack-debugging

## When to Use
- Any check/test/build failure
- Unexpected behavior during implementation
- When `vstack-verify-loop` reports failures
- When `vstack-unstick` requires diagnosis

## When Not to Use
- For planning or design decisions (use `vstack-blueprint`)
- For review findings (use `vstack-review-loop`)

## Required Context
- Failure evidence (error message, stack trace, test output, logs)
- Access to relevant code and execution environment

## Procedure

1. **Reproduce** — run the failing check in isolation
2. **Read the evidence** — error message, stack trace, output, exit code
3. **Form hypothesis** — what specific code path causes this?
4. **Test hypothesis** — add logging, run narrower test, inspect state
5. **Identify root cause** — not symptom, the underlying reason
6. **Fix the cause** — minimal change addressing root cause
7. **Verify** — run the failing check + related checks
8. **Document** — failure, cause, fix, prevention

## Expected Outputs
- Root cause explanation
- Minimal fix
- Verified pass on failing check
- Prevention note (test, assertion, documentation)

## Verification
- Original failure reproduced before fix
- Fix addresses root cause, not symptom
- Failing check passes after fix
- No new failures introduced

## Stop Conditions
- Root cause found, fixed, verified
- Max 3 hypothesis cycles (then use `vstack-unstick`)

## Escalation
- Cannot reproduce → check environment, dependencies, flakiness
- Root cause unclear after 3 cycles → `vstack-unstick`
- Fix requires architectural change → `vstack-blueprint`, Lead decision

## Related Skills
- `vstack-verify-loop` — provides failures to debug
- `vstack-unstick` — for repeated failures
- `vstack-tdd` — regression test for fix