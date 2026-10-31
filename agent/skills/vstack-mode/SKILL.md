---
name: vstack-mode
description: Establish how to use the playbook and work in evidence-led, incremental steps
---
# vstack-mode

## When to Use
- At the start of any engineering work with vstack
- When onboarding to a project using vstack
- When unsure how to proceed with the playbook

## When Not to Use
- For a specific skill procedure (use that skill directly)

## Required Context
- Access to this playbook's principles, roles, skills, and workflows
- Understanding of the current task or delivery

## Procedure

1. **Read the principles** (`principles/index.md`) — they are the foundation
2. **Identify your role** — Lead, Builder, or Reviewer (see `agents/roles/`)
3. **Select the appropriate workflow** — Feature delivery, Bug fixing, Refactoring, etc. (see `workflows/`)
4. **Apply relevant skills** — Use `vstack-help` to find the smallest relevant set
5. **Work incrementally** — Small changes, executed checks, recorded evidence
6. **Preserve context** — Use `vstack-context-reset` at boundaries
7. **Capture lessons** — Use `vstack-lessons` for recurring patterns

## Expected Outputs
- Clear role understanding
- Selected workflow and initial skill set
- Commitment to evidence-led increments

## Verification
- Can articulate the current delivery objective
- Can name the active workflow and next skill
- Knows where to find principles, roles, skills, workflows

## Stop Conditions
- Role, workflow, and initial skills identified
- Ready to proceed with `vstack-sharpen` or `vstack-discovery`

## Escalation
- If principles conflict with harness constraints → document adaptation
- If no workflow fits → use `vstack-sharpen` to clarify, then adapt

## Related Skills
- `vstack-principles` — core rules
- `vstack-help` — skill discovery
- `vstack-sharpen` — request clarification