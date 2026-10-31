---
name: vstack-review-loop
description: Obtain fresh-context review and resolve findings
---
# vstack-review-loop

## When to Use
- After implementation with evidence, before completion
- When `vstack-plan-loop` assigns review tasks
- When Lead requests independent assessment
- For high-risk changes (always)

## When Not to Use
- During implementation (use `vstack-verify-loop`)
- For trivial changes with low risk (Lead judgment)

## Required Context
- Objective and acceptance criteria
- Changes under review (diffs, files)
- Verification evidence (test results, check outputs)
- Project conventions and rubrics
- Specific review lenses requested

## Procedure

### Lead: Request Review
1. Prepare review package: objective, criteria, changes, evidence, lenses
2. Dispatch Reviewer with fresh context (new session, no implementation history)
3. Specify lenses from `resources/rubrics/`

### Reviewer: Conduct Review
1. **Read only the review package** — no implementation context
2. **Apply each lens** systematically:
   - Correctness & Regression
   - Architecture & Design
   - Security & Data
   - Performance & Resources
   - Maintainability & Style
   - Test Adequacy
   - Documentation & Migration
3. **Record findings** per lens:
   - Severity: critical/high/medium/low/informational
   - Category: lens name
   - Description with file:line reference
   - Evidence reference (what supports this)
   - Recommendation (concrete, testable)
4. **Overall assessment** — accept / accept with fixes / reject

### Lead: Resolve Findings
1. Review each finding with Builder
2. **Fix** — Builder addresses, provides evidence
3. **Defer** — document reason, track for later
4. **Reject** — document rationale (rare, requires evidence)
5. **Re-review** — Reviewer confirms fixes address root cause

## Expected Outputs
- Review report with findings
- Resolved findings with fix evidence
- Final assessment

## Verification
- Reviewer had no implementation context
- Each finding has severity, location, evidence, recommendation
- Critical/high findings resolved or explicitly waived
- Re-review confirms fixes

## Stop Conditions
- All critical/high findings resolved
- Reviewer accepts (or Lead accepts with documented waivers)

## Escalation
- Reviewer cannot assess without missing evidence → Lead provides
- Fundamental disagreement on severity → Lead decides, documents both positions
- Multiple independent reviews needed → `vstack-jury`

## Related Skills
- `vstack-verify-loop` — provides evidence for review
- `vstack-jury` — multiple independent reviewers
- `vstack-jury` (optional skill) — coordinates jury
- `resources/rubrics/` — review lenses and criteria