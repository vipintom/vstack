---
name: vstack-testing
description: "Test strategy, fixtures, coverage, unit/integration/E2E and regression testing. Use to define and execute comprehensive test plans."
---

# Skill: vstack-testing

Use this skill when you need to define test strategy, implement tests, run test suites, or analyze test results. It covers the full testing lifecycle.

## When to Use

- Creating test strategy for a delivery
- Implementing unit, integration, or E2E tests
- Setting up test fixtures and infrastructure
- Running and analyzing test results
- Regression testing

## Procedure

1. **Define Test Strategy**
   - Review acceptance criteria and design
   - Determine test pyramid: unit, integration, E2E ratios
   - Identify critical paths needing coverage
   - Define test data and environment requirements

2. **Implement Tests**
   - Write unit tests for business logic
   - Write integration tests for component interactions
   - Write E2E tests for critical user flows
   - Create reusable test fixtures and helpers
   - Follow project testing conventions

3. **Configure Test Execution**
   - Set up test commands in package.json / CI
   - Configure coverage thresholds
   - Define test suites (fast, full, integration)
   - Set up test reporting

4. **Run and Analyze**
   - Execute test suites
   - Capture exit codes, output, timing
   - Analyze failures: flaky, genuine, environment
   - Measure coverage against thresholds

5. **Regression Testing**
   - Run full suite before release
   - Compare against baseline
   - Investigate new failures
   - Update tests for intentional behavior changes

## Inputs

- Acceptance criteria
- Design document
- Implementation code

## Outputs

- Test code and fixtures
- Test execution results (exit codes, output, coverage)
- Test reports
- Evidence records for quality gates

## Safety and Approval

- Tests should not modify production data
- Test infrastructure changes may need approval
- Flaky tests should be fixed or quarantined

## Fallback (No vstack Plugin)

- Use project's standard test commands
- Record results in CI/CD system
- Follow team testing practices