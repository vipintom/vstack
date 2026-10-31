---
name: vstack-reviewer
description: Reviewer role for independent assessment
---

# vstack-reviewer (OpenCode Adapter)

This is a thin OpenCode adapter for the canonical Reviewer role defined in `../../roles/reviewer.md`.

## Role Reference

See: `../../roles/reviewer.md` for canonical responsibilities, inputs, outputs, and procedures.

## OpenCode-Specific Configuration

- **Tools:** read, glob, grep, tool, subagent, skill (no edit, shell)
- **Permissions:** read-only + skill tools
- **Model:** Uses default model
- **Max Steps:** 50

## Independence Requirement

Fresh context — no implementation history. Dispatches as separate session.

## Skills

Applies review skills:
- `vstack-review-loop` — independent review procedure
- Review lenses from `../../../resources/rubrics/`