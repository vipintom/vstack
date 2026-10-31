---
name: vstack-implementation
description: "Implementation practices, integration, refactoring and change discipline. Use during implementation phase to guide coding work."
---

# Skill: vstack-implementation

Use this skill when implementing features, fixing bugs, refactoring, or making code changes. It provides disciplined implementation practices.

## When to Use

- Writing new feature code
- Fixing bugs
- Refactoring existing code
- Integrating with external systems
- Making configuration changes

## Procedure

1. **Understand the Task**
   - Review task description, acceptance criteria, and design
   - Clarify any ambiguities before starting
   - Identify affected files and integration points

2. **Set Up Work Environment**
   - Ensure you're in the correct worktree/branch
   - Run build and tests to establish baseline
   - Verify development environment works

3. **Implement Incrementally**
   - Make small, focused changes
   - Follow existing patterns and conventions
   - Write code that is testable and maintainable
   - Update or add tests alongside implementation
   - Run lint/typecheck frequently

4. **Handle Integration Points**
   - Verify API contracts match design
   - Test integration with dependent services
   - Handle errors and edge cases explicitly
   - Document any deviations from design

5. **Verify Before Completion**
   - Run full test suite for affected area
   - Run lint, typecheck, and formatting
   - Verify acceptance criteria are met
   - Record evidence of verification

6. **Prepare for Review**
   - Summarize changes made
   - Note any deviations from design
   - List files changed
   - Identify areas needing reviewer attention

## Inputs

- Task assignment with acceptance criteria
- Design document
- Existing codebase

## Outputs

- Implementation code changes
- Updated/added tests
- Verification evidence (test results, lint output)
- Changed files list
- Implementation summary for review

## Safety and Approval

- Do not commit directly to protected branches
- Do not run destructive migrations without approval
- Do not modify unrelated code
- Scope changes require lead approval

## Fallback (No vstack Plugin)

- Follow standard Git workflow (branch, commit, PR)
- Run checks locally or in CI
- Document changes in PR description