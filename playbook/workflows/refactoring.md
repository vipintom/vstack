# Workflow: Refactoring

## Trigger & Suitability
- Improving internal structure without behavior change
- Technical debt reduction, pattern standardization
- Risk: medium to high (behavior must not change)

## Roles & Responsibilities

| Phase | Lead | Builder | Reviewer |
|---|---|---|---|
| Sharpen | Owns | — | — |
| Discovery | Coordinates | Executes | — |
| Blueprint | Decides | Contributes | — |
| Plan | Owns | Reviews | Challenges |
| Implement | Coordinates | Executes | — |
| Verify | Checks evidence | Executes checks | — |
| Review | Requests | Provides | Owns |
| Complete | Validates | — | Confirms |

## Skill Sequence

### 1. Sharpen (`vstack-sharpen`)
- Define what changes, what stays same, acceptance criteria (behavior parity)
- **Required:** Explicit behavior preservation criteria

### 2. Discovery (`vstack-discovery`)
- Map current structure, dependencies, test coverage
- **Deep:** Full understanding required

### 3. Blast Radius (`vstack-blast-radius`)
- **Required:** Identify all affected callers, contracts

### 4. Blueprint (`vstack-blueprint`)
- Compare target structure vs current
- **Required:** Design the refactored state

### 5. Plan Loop (`vstack-plan-loop`)
- Tasks: test gaps, incremental changes, verification per step
- **Required:** Phased with verification checkpoints

### 6. Implementation Loop (per phase)
- `vstack-tdd` — add missing tests first (behavior lock)
- Incremental change + `vstack-verify-loop` per step
- `vstack-debugging` — for failures
- `vstack-context-reset` — at each phase boundary

### 7. Review (`vstack-review-loop`)
- **Full:** Architecture & Design + Correctness & Regression + Maintainability
- **Required:** Behavior parity verified

### 8. Complete
- All behavior tests pass, structure improved
- `vstack-lessons` — pattern for future refactors

## Risk Adaptation

| Risk | Test Coverage | Phases | Review |
|---|---|---|---|
| Low (isolated) | Existing sufficient | 1-2 | Architecture + Correctness |
| Medium (module) | Add gaps first | 2-3 | Full 3 lenses |
| High (system) | Comprehensive first | 4+ | Full + jury |

## Parallel Work
- Independent modules → parallel phases
- Shared contracts → sequential
- Lead defines phase boundaries explicitly

## Without Plugin
- Phase-based commits with tests
- Manual verification per phase
- Behavior parity documented

## With Plugin
- `vstack_delivery` type: refactor
- Phased `vstack_task` with dependencies
- `vstack_check` runs full suite per phase
- Evidence links each phase to behavior tests