# Review Lens: Correctness & Regression

## Purpose
Verify the implementation correctly satisfies requirements and doesn't regress existing behavior.

## Questions to Answer

### Functional Correctness
- [ ] Does the code do what the acceptance criteria specify?
- [ ] Are edge cases handled (empty, null, boundary, overflow)?
- [ ] Are error conditions handled appropriately?
- [ ] Is the logic sound (no off-by-one, wrong condition, missing case)?

### Regression Risk
- [ ] Do existing tests still pass?
- [ ] Are there tests for the new/changed behavior?
- [ ] Could this change break callers not covered by tests?
- [ ] Are invariants preserved (idempotence, ordering, uniqueness)?

### Data Integrity
- [ ] Are inputs validated before use?
- [ ] Are outputs consistent with inputs?
- [ ] Is state mutated correctly (no partial updates)?
- [ ] Are transactions/atomicity respected?

## Severity Guide
- **Critical:** Data loss, security breach, complete feature failure
- **High:** Incorrect behavior for common cases, broken contracts
- **Medium:** Edge case failures, performance regressions
- **Low:** Minor logic issues with workarounds
- **Informational:** Style, naming, documentation gaps

## Evidence Required
- Test results covering acceptance criteria
- Regression test results
- Edge case test results