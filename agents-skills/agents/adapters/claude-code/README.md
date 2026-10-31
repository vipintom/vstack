# vstack for Claude Code

## Installation

```bash
# Install all vstack skills for Claude Code
npx skills add <owner>/vstack --skill '*' -a claude-code

# Or install specific skills
npx skills add <owner>/vstack --skill vstack-discovery,vstack-review -a claude-code
```

This installs skills to `.claude/skills/` and makes them available to your Claude Code agents.

## Agent Roles

vstack provides 6 agent roles as portable skills. Install them to adopt these roles in your current session:

| Role Skill | Purpose |
|---|---|
| `vstack-role-lead` | Primary coordinator (Whale) |
| `vstack-role-architect` | Discovery, design, planning |
| `vstack-role-developer` | Implementation |
| `vstack-role-test-engineer` | Testing |
| `vstack-role-reviewer` | Independent review (Goldfish) |
| `vstack-role-operator` | Release, deployment, operations |

To use a role, invoke its skill in your Claude Code session. The skill instructs the current agent to follow that role's responsibilities.

## Workflow Integration

Without the `@vstack/opencode` plugin, you get:
- Portable skill procedures for each phase
- Role guidance for structured work
- Review methodology (Goldfish)

With the `@vstack/opencode` plugin (OpenCode only), you additionally get:
- Native agent definitions with permissions
- Workflow state persistence (`.vstack/`)
- Task orchestration and gate enforcement
- OpenChamber dashboard

## Native Agent Definitions

OpenCode v2 native agent files are in `agents/opencode-v2/`. For Claude Code, use the role skills above.

## Resources

- Review rubrics: `resources/review-rubrics/`
- Templates: `resources/templates/`
- References: `resources/references/`