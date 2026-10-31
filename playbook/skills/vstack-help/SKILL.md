---
name: vstack-help
description: Select the smallest relevant set of skills
---

# vstack-help

## When to Use
- When starting a new task or delivery
- When stuck and unsure which skill applies
- When a skill references "related skills" you don't know

## When Not to Use
- When you already know the exact skill needed

## Required Context
- Current problem or task description
- Access to skill catalog (`skills/` directory)

## Procedure

1. **State the problem** in one sentence
2. **Map to skill families** (from PRD Section 7.1.2):
   - Foundation & operation → `vstack-mode`, `vstack-principles`, `vstack-help`
   - Understanding & discovery → `vstack-sharpen`, `vstack-discovery`, `vstack-catchup`
   - Architecture & design → `vstack-blueprint`, `vstack-blast-radius`
   - Planning → `vstack-plan-loop`
   - Implementation → `vstack-tdd`, `vstack-debugging`
   - Verification → `vstack-verify-loop`
   - Debugging & recovery → `vstack-unstick`
   - Review → `vstack-review-loop`, `vstack-jury`
   - Continuity → `vstack-context-reset`, `vstack-lessons`
3. **Select 1-3 skills** that directly address the problem
4. **Read each skill's "When to Use"** to confirm fit
5. **Apply in sequence** — complete one before starting the next

## Expected Outputs
- Minimal set of relevant skills (1-3)
- Order of application

## Verification
- Each selected skill's "When to Use" matches the problem
- No skill selected "just in case"

## Stop Conditions
- Relevant skills identified and ordered

## Escalation
- No skill matches → use `vstack-sharpen` to clarify problem
- Too many skills seem relevant → pick the most specific; others wait

## Related Skills
- `vstack-mode` — establishes context
- `vstack-sharpen` — clarifies underspecified problems