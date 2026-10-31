# vstack Playbook

Portable engineering playbook for AI-assisted software development.

## Contents

- **principles/** — Core operating principles
- **agents/roles/** — Canonical role definitions (Lead, Builder, Reviewer)
- **agents/adapters/** — Harness-specific adapters (OpenCode, Codex, Claude Code)
- **skills/** — 15 core reusable procedures
- **workflows/** — Recipes for common engineering outcomes
- **resources/** — Rubrics, templates, references

## Installation

### All Skills (All Agents)
```bash
npx skills add ./playbook --skill '*' --agent '*' -y
```

### Selective Skills
```bash
npx skills add ./playbook --skill vstack-sharpen vstack-discovery vstack-tdd vstack-verify-loop --agent opencode -y
```

### For Specific Harnesses
```bash
# OpenCode
npx skills add ./playbook --agent opencode -y

# Claude Code
npx skills add ./playbook --agent claude-code -y

# Codex
npx skills add ./playbook --agent codex -y
```

## Quick Start

1. **Read principles** → `principles/index.md`
2. **Identify your role** → `agents/roles/lead.md` | `builder.md` | `reviewer.md`
3. **Select workflow** → `workflows/feature-delivery.md` | `bug-fixing.md` | `refactoring.md`
4. **Apply skills** → Use `vstack-help` to find relevant skills

## Core Skills (15)

| Skill | Purpose |
|---|---|
| `vstack-mode` | Establish working method |
| `vstack-principles` | Core rules reference |
| `vstack-help` | Find relevant skills |
| `vstack-sharpen` | Clarify request |
| `vstack-discovery` | Understand codebase |
| `vstack-blueprint` | Compare designs |
| `vstack-plan-loop` | Create & validate plan |
| `vstack-blast-radius` | Analyze impact |
| `vstack-tdd` | Test-first implementation |
| `vstack-debugging` | Diagnose failures |
| `vstack-verify-loop` | Execute checks, iterate |
| `vstack-unstick` | Change approach when stuck |
| `vstack-review-loop` | Independent review |
| `vstack-context-reset` | Preserve/restore context |
| `vstack-lessons` | Capture improvements |

## Workflows

| Workflow | Use For |
|---|---|
| `feature-delivery` | Multi-step new functionality |
| `bug-fixing` | Defect repair with regression test |
| `refactoring` | Structure improvement, behavior preserved |

## Validation

```bash
node scripts/validate-content.js
```

## Requirements

- Compatible with Agent Skills CLI (`npx skills`)
- Works with OpenCode, Codex, Claude Code
- No runtime dependencies — pure Markdown content

## License

MIT