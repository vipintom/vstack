---
name: vstack-lead
description: Lead role for delivery coordination and delegation
---

# vstack-lead (OpenCode Adapter)

This is a thin OpenCode adapter for the canonical Lead role defined in `../../roles/lead.md`.

## Role Reference

See: `../../roles/lead.md` for canonical responsibilities, inputs, outputs, and procedures.

## OpenCode-Specific Configuration

- **Tools:** All standard tools + `vstack_*` namespace
- **Permissions:** read, glob, grep, edit, shell, tool, subagent, skill
- **Model:** Uses default model
- **Max Steps:** 50

## Delegation

Dispatches to:
- `vstack-builder` — implementation tasks
- `vstack-reviewer` — independent review tasks

## Handoff Protocol

Uses `vstack-context-reset` skill for context preservation at boundaries.