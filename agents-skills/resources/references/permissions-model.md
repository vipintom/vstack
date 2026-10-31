# vstack Permissions Model

## Autonomy Profiles

| Mode | Behavior |
|---|---|
| **Assisted** | Agent proposes next steps, waits for human direction frequently |
| **Supervised** (default) | Routine work proceeds within policy; design decisions, scope changes, risky operations have explicit gates/approvals |
| **Autonomous** | Permitted low/medium-risk steps without routine confirmation; protected operations still require approval |

Autonomy mode does not override explicit deny or protected-operation approval requirements.

## Role-Based Permissions

### vstack-lead (Whale)
- Workflow control tools (`vstack_workflow_*`, `vstack_delivery_*`)
- Delegate to approved agents (`vstack_agent_dispatch`)
- No direct edits to authoritative state files
- Request human approval for protected operations

### vstack-architect
- Read-heavy access
- Write designated discovery/design/plan artifacts
- No direct state mutation
- No shell, no subagent dispatch

### vstack-developer
- Scoped project edit and shell permissions
- Task/worktree scoped
- Run build, lint, typecheck, tests
- Use `vstack_task_*`, `vstack_quality_*` tools

### vstack-test-engineer
- Test code edit access
- Approved check execution
- Should not mark quality gates passed directly
- Use `vstack_check_run`, `vstack_evidence_record`

### vstack-reviewer (Goldfish)
- **Read-only by default**
- No source edits, commits, or arbitrary shell commands
- No subagent dispatch
- Use `vstack_review_*`, `vstack_finding_update`

### vstack-operator
- Documentation writes (changelogs, release notes)
- Protected release/deployment operations require explicit approvals
- Use `vstack_release_*`, `vstack_deploy_*`

## Mandatory Approval Points

Default human approval required for:

1. Material scope/requirement changes after approval
2. Architecture/design decisions (if project policy requires)
3. Release version selection and release candidate approval
4. Publishing packages or creating external releases
5. Deployment to staging/production (when policy requires)
6. Destructive or irreversible database migrations
7. Production data changes
8. Rollback operations with external impact
9. Git push/force push or external repository changes (when configured)

## Enforcement

- **OpenCode permissions**: Ordered `{action, resource, effect}` rules, last match wins
- **Tool-level validation**: Plugin tools validate inputs and policy
- **Agent rulesets**: Deny-by-default with explicit allow lists
- **`ctx.permission.assert`**: Used before privileged operations
- **Least privilege**: Agents receive minimal necessary permissions

## Protected Operations (Cannot Bypass)

The following cannot be bypassed through direct shell commands:

| Operation | Protection |
|---|---|
| Package publish | `vstack_release_publish` requires approval; direct shell blocked by policy |
| Production deploy | `vstack_deploy` requires approval; direct shell blocked by policy |
| Destructive migration | Explicit approval gate; direct shell blocked by policy |
| Production data change | Explicit approval gate; direct shell blocked by policy |
| Reviewer file edit | Ruleset denies `edit`; tool validation rejects |

## Testing Requirements

Implementation must demonstrate:
- Deployment cannot bypass approval via direct shell
- Release publish cannot bypass gate
- Destructive migration requires authorization
- Reviewer cannot modify project files
- Verifier cannot silently change source to pass checks