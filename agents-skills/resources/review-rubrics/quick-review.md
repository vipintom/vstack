# Quick Review Rubric

Default review profile for most deliveries. Focuses on material correctness, regressions, design alignment, and critical risk.

## Required Lenses

| Lens | Focus | Blocking Criteria |
|---|---|---|
| Correctness & Regression | Implementation matches requirements; no regressions | Any functional regression or requirement gap |
| Architecture & Design Alignment | Change aligns with system architecture | Fundamental architectural violation |
| Security & Data Handling | No vulnerabilities or data exposure | Critical/high severity security finding |

## Reviewer Assignment

Single independent reviewer (`vstack-reviewer`) running all three lenses in one session.

## Finding Severity Thresholds

- **Critical**: Blocks release — must fix before advancement
- **High**: Should fix — blocks advancement if in critical path
- **Medium**: Should fix — can advance with tracking
- **Low**: Nice to fix — document and track
- **Informational**: No action required

## Re-review

Only re-review findings rated Critical or High. Medium and below tracked in workflow.

## Timebox

Maximum 30 steps per reviewer session.