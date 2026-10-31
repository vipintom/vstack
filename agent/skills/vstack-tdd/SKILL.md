---
name: vstack-tdd
description: Apply test-first development where suitable
---
# vstack-tdd

## When to Use
- Implementing new behavior with testable outcomes
- Fixing bugs (write regression test first)
- When acceptance criteria are testable
- When `vstack-plan-loop` assigns implementation tasks

## When Not to Use
- Exploratory/spike work (use `vstack-discovery` instead)
- Trivial changes where test cost exceeds value
- When harness lacks test execution capability (degrade gracefully)

## Required Context
- Task with acceptance criteria
- Discovery summary (existing test patterns)
- Access to test framework

## Procedure

1. **Write the failing test first**:
   - Test expresses one acceptance criterion
   - Test fails for the right reason (not setup error)
   - Test is deterministic and fast
2. **Implement minimal code** to make test pass
3. **Run test** — confirm pass
4. **Refactor** — improve code while tests pass
5. **Repeat** for each acceptance criterion
6. **Run full test suite** — no regressions

## Expected Outputs
- New/updated tests covering acceptance criteria
- Implementation making tests pass
- All existing tests still passing

## Verification
- Each acceptance criterion has a corresponding test
- Tests fail before implementation, pass after
- No test-only changes (implementation matches test intent)

## Stop Conditions
- All acceptance criteria tested and passing
- Full suite passes

## Escalation
- Test framework unavailable → document, use manual verification per `vstack-verify-loop`
- Test flakiness → debug with `vstack-debugging`, don't disable
- Cannot test acceptance criterion → escalate to Lead for criteria revision

## Related Skills
- `vstack-plan-loop` — provides tasks with criteria
- `vstack-verify-loop` — executes checks
- `vstack-debugging` — diagnoses test failures