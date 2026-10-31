---
name: vstack-lessons
description: Convert recurring mistakes into durable improvements
---
# vstack-lessons

## When to Use
- After completing a delivery
- When a pattern of failures/bugs/rework emerges
- During retrospective or review
- When `vstack-debugging` reveals systemic issue

## When Not to Use
- For one-off incidents
- During active implementation (use `vstack-debugging`)

## Required Context
- Completed delivery with evidence
- History of similar issues (from project memory or history)
- Team/project conventions

## Procedure

1. **Identify the pattern** — what keeps happening?
   - Same bug type? Same review finding? Same debug cycle?
2. **Analyze root cause** — why does it recur?
   - Missing check? Unclear convention? Bad default? Knowledge gap?
3. **Design improvement** — what prevents recurrence?
   - New check/assertion?
   - Convention update?
   - Template/pattern?
   - Skill update?
   - Project memory entry?
4. **Implement improvement** — add check, update doc, create template
5. **Verify** — would this have caught the last 3 occurrences?
6. **Record in project memory** — lesson, improvement, validation

## Expected Outputs
- Pattern description with examples
- Root cause analysis
- Implemented improvement (check, doc, template, skill)
- Project memory entry

## Verification
- Improvement addresses root cause, not symptom
- Improvement would have caught historical occurrences
- Improvement is enforceable/checkable (not just documentation)

## Stop Conditions
- Improvement implemented and validated against history

## Escalation
- Pattern requires architectural change → `vstack-blueprint`, Lead decision
- Pattern external to project → document workaround, monitor

## Related Skills
- `vstack-debugging` — reveals patterns
- `vstack-review-loop` — findings may reveal patterns
- `vstack-context-reset` — preserves lessons at boundaries
- Project memory (plugin) — persistent lesson storage