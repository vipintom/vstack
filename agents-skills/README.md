# @vstack/agents-skills

Portable agent roles and workflow skills for vstack software delivery.

## Overview

This package contains **content only** — no runtime code, no CLI, no database. It provides:

- **6 Agent Roles** as portable skills (installable via `npx skills add`)
- **10 Workflow Skills** for delivery phases
- **OpenCode v2 Native Agent Wrappers** for plugin integration
- **Harness Adapters** for Claude Code, Codex, and generic agents
- **Resources**: Review rubrics, templates, references

## Installation

### Via Skills CLI (Recommended)

```bash
# Install all skills for OpenCode and Claude Code
npx skills add <owner>/vstack --skill '*' -a opencode -a claude-code

# Install specific skills
npx skills add <owner>/vstack --skill vstack-discovery,vstack-review -a opencode

# Install all skills for all detected agents
npx skills add <owner>/vstack --all
```

### Manual Installation

Copy the relevant directories to your agent's configuration:

| Harness | Skills Directory | Agents Directory |
|---|---|---|
| OpenCode | `.opencode/skills/` or `.agents/skills/` | `.opencode/agents/` |
| Claude Code | `.claude/skills/` | `.claude/agents/` |
| Codex | `~/.codex/skills/` | N/A (use role skills) |
| Generic | Project `AGENTS.md` | N/A |

## Package Structure

```
agents-skills/
├── skills/
│   ├── roles/                    # 6 Portable Role Skills (CANONICAL)
│   │   ├── vstack-role-lead/
│   │   ├── vstack-role-architect/
│   │   ├── vstack-role-developer/
│   │   ├── vstack-role-test-engineer/
│   │   ├── vstack-role-reviewer/
│   │   └── vstack-role-operator/
│   ├── vstack-discovery/
│   ├── vstack-architecture/
│   ├── vstack-planning/
│   ├── vstack-implementation/
│   ├── vstack-debugging/
│   ├── vstack-testing/
│   ├── vstack-review/
│   ├── vstack-documentation/
│   ├── vstack-release/
│   └── vstack-operations/
├── agents/
│   ├── opencode-v2/              # 6 Native OpenCode Agent Wrappers
│   │   ├── vstack-lead.md
│   │   ├── vstack-architect.md
│   │   ├── vstack-developer.md
│   │   ├── vstack-test-engineer.md
│   │   ├── vstack-reviewer.md
│   │   └── vstack-operator.md
│   └── adapters/
│       ├── claude-code/README.md
│       ├── codex/README.md
│       └── generic/AGENTS.md
└── resources/
    ├── review-rubrics/
    ├── templates/
    └── references/
```

## Agent Roles

| Role | Skill ID | Purpose |
|---|---|---|
| **Lead (Whale)** | `vstack-role-lead` | Primary coordinator, owns delivery lifecycle |
| **Architect** | `vstack-role-architect` | Discovery, design, planning |
| **Developer** | `vstack-role-developer` | Implementation, bug fixes |
| **Test Engineer** | `vstack-role-test-engineer` | Test strategy, execution |
| **Reviewer (Goldfish)** | `vstack-role-reviewer` | Independent fresh-context review |
| **Operator** | `vstack-role-operator` | Release, deployment, operations |

**Key Principle**: Role skills are the **canonical** portable instructions. Native agent wrappers are thin metadata files that reference the corresponding role skill.

## Workflow Skills

| Skill | Phase | Purpose |
|---|---|---|
| `vstack-discovery` | Discovery | Requirements, exploration, mapping |
| `vstack-architecture` | Design | Design, ADRs, specifications |
| `vstack-planning` | Planning | Task breakdown, dependencies |
| `vstack-implementation` | Implementation | Coding practices, integration |
| `vstack-debugging` | Implementation | Reproduction, root-cause |
| `vstack-testing` | Validation | Test strategy, execution |
| `vstack-review` | Review | Review methodology, findings |
| `vstack-documentation` | All | README, API docs, ADRs, changelogs |
| `vstack-release` | Release | Versioning, artifacts, validation |
| `vstack-operations` | Deployment | Deploy, smoke tests, rollback |

## OpenCode v2 Integration

For OpenCode users, native agent definitions are in `agents/opencode-v2/`. These provide:

- Agent metadata (description, mode, steps)
- Permission rulesets (deny-by-default)
- Tool/skill access configuration
- Reference to corresponding role skill

The `@vstack/opencode` plugin installs these automatically.

## Harness Compatibility

| Feature | OpenCode | Claude Code | Codex | Generic |
|---|---|---|---|---|
| Native agents | ✅ | ✅ | ❌ | ❌ |
| Subagent dispatch | ✅ | ✅ | ❌ | ❌ |
| Skill loading | ✅ | ✅ | ✅ | Manual |
| Permission control | ✅ | Partial | ❌ | ❌ |
| Workflow persistence | Plugin | ❌ | ❌ | ❌ |
| Dashboard | Plugin | ❌ | ❌ | ❌ |

**Portable skills work everywhere.** Native agents and workflow engine require OpenCode plugin.

## Resources

- **Review Rubrics**: `resources/review-rubrics/` — Quick and full review profiles
- **Templates**: `resources/templates/` — ADR, design doc, plan, findings, changelog
- **References**: `resources/references/` — Delivery profiles, gate types, tools, permissions

## License

MIT