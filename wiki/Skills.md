# Skills Reference

vstack includes 15 skills. Each is a standalone Markdown file with Agent Skills frontmatter, making them portable across harnesses.

## Skill Index

| Skill | Category | Purpose |
|---|---|---|
| `vstack-architecture` | Design | System architecture decisions and tradeoffs |
| `vstack-blueprint` | Design | Detailed technical specifications |
| `vstack-blast-radius` | Analysis | Impact analysis for changes |
| `vstack-debugging` | Debugging | Systematic debugging methodology |
| `vstack-discovery` | Research | Codebase exploration and understanding |
| `vstack-documentation` | Documentation | Living documentation practices |
| `vstack-implementation` | Implementation | Clean implementation patterns |
| `vstack-lessons` | Learning | Capturing and applying lessons |
| `vstack-operations` | Operations | Deployment and operations |
| `vstack-planning` | Planning | Work planning and estimation |
| `vstack-release` | Release | Release preparation and execution |
| `vstack-review` | Review | Code review practices |
| `vstack-testing` | Testing | Test-driven development |
| `vstack-verify-loop` | Verification | Verification and validation loops |
| `vstack-unstuck` | Unblocking | Getting unstuck techniques |

## Skill Format

Each skill follows the Agent Skills specification:

```markdown
---
name: vstack-skill-name
description: One-line description
category: design|implementation|testing|debugging|analysis|...
---

# Skill Name

## When to Use
<Trigger conditions>

## Procedure
<Step-by-step instructions>

## Examples
<Concrete examples>

## Anti-Patterns
<What to avoid>
```

## Installation

### Skills CLI (All Skills at Once)

```bash
npx skills add ./playbook
```

### Individual Skills

```bash
# Install specific skill
npx skills add ./playbook/skills/vstack-tdd
```

### Manual

```bash
# Copy to harness skills directory
cp playbook/skills/vstack-tdd.md ~/.config/opencode/skills/vstack-tdd.md
```

## Using Skills in OpenCode

After installation, skills are available as `@vstack-*` agents:

```bash
# In OpenCode
@skill vstack-tdd "Write tests for the authentication module"
@skill vstack-blast-radius "Analyze impact of changing User model"
@skill vstack-debugging "Investigate the login timeout issue"
```

## Skill Dependencies

Some skills reference others:

| Skill | References |
|---|---|
| `vstack-blueprint` | `vstack-architecture`, `vstack-blast-radius` |
| `vstack-verify-loop` | `vstack-testing`, `vstack-debugging` |
| `vstack-review` | `vstack-blast-radius`, `vstack-testing` |
| `vstack-release` | `vstack-blueprint`, `vstack-testing` |

## Creating Custom Skills

1. Create `<name>.md` in `playbook/skills/`
2. Add Agent Skills frontmatter
3. Follow the procedure format
4. Run `npx skills add ./playbook` to reinstall

## Harness Compatibility

Skills work with any harness supporting the Agent Skills spec:
- OpenCode ✅ (native)
- Claude Code ✅ (via skills)
- Codex ✅ (via skills)
- Custom harnesses ✅ (implement the spec)