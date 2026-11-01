# Playbook Overview

The vstack Playbook is a **harness-independent** collection of engineering practices. It contains no runtime code — only Markdown and YAML content that any AI harness can consume via the Agent Skills specification.

## Structure

```
playbook/
├── principles/           # 7 engineering principles
├── agents/
│   ├── roles/           # 3 canonical roles
│   └── adapters/
│       └── opencode/    # Thin OpenCode adapters
├── skills/              # 15 skills (Markdown + frontmatter)
├── workflows/           # 3 workflow recipes
└── resources/           # Rubrics, templates, references
```

## Installation

### Skills CLI (Recommended)

```bash
npx skills add ./playbook
```

The Skills CLI recognizes the nested `playbook/skills/` structure automatically.

### Manual Installation

Copy to your harness's skills directory:

```bash
# OpenCode
cp -r playbook/ ~/.config/opencode/skills/vstack

# Claude Code
cp -r playbook/ ~/.config/claude-code/skills/vstack

# Codex
cp -r playbook/ ~/.config/codex/skills/vstack
```

## Components

### Principles (7)

| Principle | Description |
|---|---|
| Bias to Deletion | Prefer removing code over adding |
| Foundational Thinking | Solve root cause, not symptoms |
| Domain Modeling | Model the problem domain explicitly |
| Boundary Discipline | Clear module boundaries, no leakage |
| Idempotence | Operations safe to repeat |
| Root-Cause Debugging | Fix cause, not symptom |
| Verifiable Sequencing | Every step has proof |
| Delegation | Push decisions to the boundary |

### Roles (3)

| Role | Focus | Skills |
|---|---|---|
| **Lead** | Planning, architecture, coordination | blueprint, blast-radius, lessons |
| **Builder** | Implementation, testing, evidence | tdd, verify-loop, architecture |
| **Reviewer** | Code review, security, quality | review-loop, blast-radius, security |

### Skills (15)

| Skill | Category | Description |
|---|---|---|
| vstack-architecture | Design | System architecture decisions |
| vstack-blueprint | Design | Detailed technical specifications |
| vstack-blast-radius | Analysis | Impact analysis for changes |
| vstack-debugging | Debugging | Systematic debugging methodology |
| vstack-discovery | Research | Codebase exploration and understanding |
| vstack-documentation | Documentation | Living documentation practices |
| vstack-implementation | Implementation | Clean implementation patterns |
| vstack-lessons | Learning | Capturing and applying lessons |
| vstack-operations | Operations | Deployment and operations |
| vstack-planning | Planning | Work planning and estimation |
| vstack-release | Release | Release preparation and execution |
| vstack-review | Review | Code review practices |
| vstack-testing | Testing | Test-driven development |
| vstack-verify-loop | Verification | Verification and validation loops |
| vstack-unstuck | Unblocking | Getting unstuck techniques |

### Workflows (3)

| Workflow | Use Case |
|---|---|
| bug-fix.md | Standalone bug fix (Playbook only, no plugins) |
| feature-delivery.md | Full feature with tasks, agents, review |
| context-interruption.md | Resume interrupted work without duplication |

### Resources

- **Rubrics (4):** Architecture, Code Quality, Security, Testing
- **Templates (4):** ADR, RFC, Incident Report, Release Notes
- **References:** Glossary, Checklists, Decision Log

## Harness Compatibility

The playbook uses the **Agent Skills specification** (Markdown with YAML frontmatter), supported by:
- OpenCode ✅
- Claude Code ✅
- Codex ✅
- Any harness implementing the spec

No TypeScript, no runtime dependencies, no build step.