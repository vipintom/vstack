---
name: vstack-plan-loop
description: Create, challenge and refine an actionable plan
---

# vstack-plan-loop

## When to Use
- After `vstack-discovery` (and `vstack-blueprint` if architectural)
- Before any implementation with multiple steps or dependencies
- When Lead needs to coordinate multiple tasks/agents

## When Not to Use
- For single-step trivial changes
- When plan already exists and is validated

## Required Context
- Sharpened problem and acceptance criteria
- Discovery summary
- Blueprint (if architectural)
- Project conventions and constraints

## Procedure

1. **Draft initial plan**:
   - Break into tasks with clear boundaries
   - Define acceptance criteria per task
   - Identify dependencies between tasks
   - Assign task types (discovery, implementation, test, review, etc.)
   - Estimate risk per task
2. **Challenge the plan** (independently or with Reviewer):
   - Are tasks truly independent where parallel?
   - Are acceptance criteria testable?
   - Are dependencies correctly identified?
   - Is risk appropriately addressed (review, evidence, parallelism)?
   - Does it degrade gracefully without advanced harness features?
3. **Refine** — incorporate challenges, split/merge tasks, adjust criteria
4. **Validate** — Lead confirms plan enables coordination and evidence
5. **Record** — plan with tasks, dependencies, criteria, risk levels

## Expected Outputs
- Task list with: title, description, acceptance criteria, dependencies, type, risk
- Dependency graph
- Risk assessment per task
- Coordination notes for Lead

## Verification
- All tasks have testable acceptance criteria
- Dependencies form a DAG (no cycles)
- High-risk tasks have review/evidence requirements specified
- Plan works sequentially if parallel unavailable

## Stop Conditions
- Plan challenged, refined, and validated
- Ready for task execution

## Escalation
- Plan cannot be validated → return to `vstack-discovery` or `vstack-blueprint`
- Fundamental disagreement on approach → Lead decides, documents rationale

## Related Skills
- `vstack-discovery` — provides understanding
- `vstack-blueprint` — provides design
- `vstack-blast-radius` — informs risk
- `vstack-tdd` — for implementation tasks
- `vstack-review-loop` — for review tasks