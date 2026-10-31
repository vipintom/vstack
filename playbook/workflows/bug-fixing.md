# Workflow: Bug Fixing

## Trigger & Suitability
- Defect in existing behavior
- Regression or incorrect output
- Risk: low to medium (usually localized)

## Roles & Responsibilities

| Phase | Lead | Builder | Reviewer |
|---|---|---|---|
| Sharpen | Owns | — | — |
| Discovery | Coordinates | Executes | — |
| Plan | Owns | Reviews | — |
| Implement | Coordinates | Executes | — |
| Verify | Checks evidence | Executes checks | — |
| Review | Requests | Provides | Owns (light) |
| Complete | Validates | — | Confirms |

## Skill Sequence

### 1. Sharpen (`vstack-sharpen`)
- Reproduce steps, expected vs actual, acceptance criteria (regression test)
- **Required:** Always — bug must be reproducible

### 2. Discovery (`vstack-discovery`)
- Find root cause location, understand behavior
- **Light:** Focused on failure path only
- **Conditional:** Deep if cause unclear

### 3. Blast Radius (`vstack-blast-radius`)
- Identify affected callers, similar patterns
- **Required:** For fixes to shared code

### 4. Plan Loop (`vstack-plan-loop`)
- Tasks: reproduce test, fix, verify, check similar
- **Lightweight:** Usually 2-3 tasks max

### 5. Implementation
- `vstack-tdd` — write regression test first
- `vstack-debugging` — diagnose if fix fails
- `vstack-verify-loop` — run regression + related tests

### 6. Review (`vstack-review-loop`)
- **Light:** Correctness & Regression lens only
- **Conditional:** Skip for trivial fixes (typo, config)

### 6. Complete
- Regression test passes, no new failures
- `vstack-lessons` — if pattern detected

## Risk Adaptation

| Risk | Discovery | Blast Radius | Review |
|---|---|---|---|
| Low (typo, config) | Minimal | Skip | Skip |
| Medium (logic) | Focused | Local | Quick (1 lens) |
| High (shared/core) | Deep | System | Full (3 lenses) |

## Parallel Work
- Rarely parallel — usually single fix
- Exception: fix + similar-pattern audit in parallel

## Without Plugin
- Manual regression test creation
- Git commit with test + fix
- Light review via new session

## With Plugin
- `vstack_delivery` type: bugfix
- `vstack_task` for reproduce/fix/verify
- `vstack_check` runs regression test
- Evidence links fix to regression test