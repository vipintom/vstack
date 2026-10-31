# Review Lens: Test Adequacy

## Purpose
Verify the test suite provides confidence in correctness and prevents regressions.

## Questions to Answer

### Coverage
- [ ] Are all acceptance criteria covered by tests?
- [ ] Are edge cases tested (empty, boundary, error, concurrent)?
- [ ] Are integration points tested (not just mocks)?
- [ ] Is coverage meaningful (not just line count)?

### Quality
- [ ] Are tests deterministic (no flakiness)?
- [ ] Are tests fast (unit < 100ms, integration < 5s)?
- [ ] Are tests independent (no shared state, order-independent)?
- [ ] Do tests fail for the right reason (assert on behavior)?

### Maintainability
- [ ] Are test names descriptive (what + scenario + expected)?
- [ ] Is test setup minimal and clear?
- [ ] Are test utilities/helpers used for common patterns?

### Regression Prevention
- [ ] Does every bug fix have a regression test?
- [ ] Are contract tests present for external interfaces?
- [ ] Are property-based tests used where applicable?

## Severity Guide
- **Critical:** No tests for critical path, flaky tests masking failures
- **High:** Missing acceptance criteria tests, no regression tests
- **Medium:** Low edge case coverage, slow tests, brittle mocks
- **Low:** Naming improvements, minor setup duplication
- **Informational:** Test pattern suggestions

## Evidence Required
- Test run results (pass/fail, duration)
- Coverage report (if available)
- Flakiness history (if available)