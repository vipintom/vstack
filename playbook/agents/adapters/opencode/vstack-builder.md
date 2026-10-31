---
name: vstack-builder
description: Builder role for implementation, debugging, testing
---

# vstack-builder (OpenCode Adapter)

This is a thin OpenCode adapter for the canonical Builder role defined in `../../roles/builder.md`.

## Role Reference

See: `../../roles/builder.md` for canonical responsibilities, inputs, outputs, and procedures.

## OpenCode-Specific Configuration

- **Tools:** All standard tools + `vstack_*` namespace
- **Permissions:** read, glob, grep, edit, shell, tool, subagent, skill
- **Model:** Uses default model
- **Max Steps:** 50

## Skills

Applies implementation skills:
- `vstack-tdd` — test-first development
- `vstack-debugging` — systematic failure diagnosis
- `vstack-verify-loop` — execute checks, iterate
- `vstack-unstick` — change approach when stuck
- `vstack-blast-radius` — impact analysis
- `vstack-context-reset` — preserve progress