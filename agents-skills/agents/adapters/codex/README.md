# vstack for Codex

## Installation

```bash
# Install all vstack skills for Codex
npx skills add <owner>/vstack --skill '*' -a codex

# Or install specific skills
npx skills add <owner>/vstack --skill vstack-discovery,vstack-review -a codex
```

This installs skills to Codex's skill directory and makes them available to your Codex agents.

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

To use a role, invoke its skill in your Codex session. The skill instructs the current agent to follow that role's responsibilities.

## Workflow Integration

Without the `@vstack/opencode` plugin, you get:
- Portable skill procedures for each phase
- Role guidance for structured work
- Review methodology (Goldfish)

The full workflow engine (state persistence, task orchestration, gate enforcement) requires the `@vstack/opencode` plugin which runs on OpenCode.

## Native Agent Definitions

OpenCode v2 native agent files are in `agents/opencode-v2/`. For Codex, use the role skills above.

## Resources

- Review rubrics: `resources/review-rubrics/`
- Templates: `resources/templates/`
- References: `resources/references/`