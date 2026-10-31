# Workflow: Feature Delivery

## Trigger & Suitability
- New functionality with multiple implementation steps
- Requires design, implementation, verification, review
- Risk: medium to high

## Roles & Responsibilities

| Phase | Lead | Builder | Reviewer |
|---|---|---|---|
| Sharpen | Owns | — | — |
| Discovery | Coordinates | Executes | — |
| Blueprint | Decides | Contributes | — |
| Plan | Owns | Reviews | Challenges |
| Implement | Coordinates | Executes | — |
| Verify | Checks evidence | Executes checks | — |
| Review | Requests | Provides evidence | Owns |
| Complete | Validates | — | Confirms |

## Skill Sequence

### 1. Sharpen (`vstack-sharpen`)
- Clarify problem, acceptance criteria, scope, risk
- **Conditional:** Skip if request already sharp

### 2. Discovery (`vstack-discovery`)
- Understand relevant codebase, constraints, patterns
- **Conditional:** Light if area well-known; deep if unfamiliar

### 3. Blueprint (`vstack-blueprint`)
- Compare 2-3 designs, select with rationale
- **Conditional:** Skip for straightforward implementation

### 4. Blast Radius (`vstack-blast-radius`)
- Identify impact, define mitigations
- **Conditional:** Required for system/external impact

### 5. Plan Loop (`vstack-plan-loop`)
- Create tasks with criteria, dependencies, risk
- Challenge plan independently
- **Required:** Always

### 6. Implementation Loop (per task)
- `vstack-tdd` — test-first per acceptance criterion
- `vstack-verify-loop` — execute checks, iterate
- `vstack-debugging` — diagnose failures
- `vstack-unstick` — change approach if stuck
- `vstack-context-reset` — at task boundaries

### 7. Review Loop (`vstack-review-loop`)
- Fresh-context review with specified lenses
- Resolve critical/high findings
- **Required:** For medium+ risk; conditional for low risk

### 8. Complete
- Lead validates all criteria met, evidence recorded
- `vstack-lessons` — capture patterns

## Risk Adaptation

| Risk | Discovery | Blueprint | Plan | Review |
|---|---|---|---|---|
| Low | Light | Skip | Simple tasks | Quick (1 lens) |
| Medium | Standard | If architectural | Full | Full (3-4 lenses) |
| High | Deep | Required | Full + dependencies | Full + jury |
| Critical | Deep + expert | Required + ADR | Full + milestones | Jury mandatory |

## Parallel Work
- Independent tasks (no shared deps) → parallel Builders
- Integration task → single Builder after parallel completes
- Lead coordinates, defines boundaries explicitly

## Without Plugin
- Use file-based task tracking (TODO.md)
- Manual evidence recording (test outputs in PR)
- Sequential execution if no subagents
- Fresh-context review via new session/handoff

## With Plugin
- `vstack_delivery` create, `vstack_task` create
- `vstack_agent` dispatch Builders/Reviewer
- `vstack_check` executes and records evidence
- `vstack_memory` persists discoveries/decisions
- `vstack_status` tracks progress