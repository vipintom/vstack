---
name: vstack-principles
description: Core engineering and agent operating rules
---

# vstack-principles

## When to Use
- As a reference during any decision
- When evaluating a proposed approach
- When resolving ambiguity in a skill or workflow

## When Not to Use
- As a substitute for a specific skill's procedure

## Required Context
- The current decision or ambiguity

## Procedure

Apply these principles in order when making decisions:

1. **Harness independence first** — Does this work without proprietary runtime?
2. **Procedures over vague instructions** — Is there a concrete step-by-step?
3. **Flexible workflows** — Does the process fit the task size and risk?
4. **Loops first** — Is there a bounded feedback loop with escalation?
5. **Small team** — Can this use Lead/Builder/Reviewer + skills?
6. **Evidence before completion** — What executed check supports the claim?
7. **Independent challenge** — Is review sufficiently context-separated?
8. **Runtime simplicity** — Does the plugin add only what instructions can't?
9. **Clear responsibility** — Who owns this: playbook, plugin, or OpenChamber?
10. **Degrade gracefully** — Does it work without advanced harness features?

## Expected Outputs
- Decision aligned with principles
- Documented adaptation if harness requires it

## Verification
- Decision traceable to specific principle(s)
- No principle violated without documented reason

## Stop Conditions
- Decision made with principle alignment

## Escalation
- Principles conflict → document trade-off and choose
- Harness limitation blocks principle → document fallback

## Related Skills
- `vstack-mode` — establishes working method
- `vstack-help` — finds relevant skills
- All skills — each embodies these principles