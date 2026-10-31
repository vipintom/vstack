# vstack Tool Reference

Tools are namespaced under `vstack_` and registered with the OpenCode plugin.

## Delivery Tools

| Tool | Description |
|---|---|
| `vstack_status` | Current project state, active delivery, phase, blockers, next action |
| `vstack_delivery_create` | Create delivery record, select/confirm lifecycle profile |
| `vstack_delivery_get` | Retrieve delivery with summary |
| `vstack_delivery_list` | List active/recent deliveries |
| `vstack_delivery_update` | Update delivery metadata |

## Workflow Tools

| Tool | Description |
|---|---|
| `vstack_workflow_start` | Start or resume delivery workflow |
| `vstack_workflow_advance` | Request phase transition (engine validates gates) |
| `vstack_workflow_block` | Mark delivery/phase/task blocked with reason |
| `vstack_workflow_unblock` | Clear blocker with valid transition |
| `vstack_workflow_resume` | Reconcile and resume interrupted work |
| `vstack_workflow_finish` | Close delivery after completion gates |

## Planning & Task Tools

| Tool | Description |
|---|---|
| `vstack_plan_set` | Record plan metadata and artifact path |
| `vstack_task_create` | Create task with owner, phase, acceptance criteria |
| `vstack_task_update` | Change task state through validated transitions |
| `vstack_task_assign` | Assign agent/session to task |
| `vstack_task_ready` | Return eligible tasks (dependencies satisfied) |
| `vstack_task_get` | Retrieve task detail |
| `vstack_task_list` | List tasks by delivery/phase/status/owner |
| `vstack_task_dependency_add` | Add validated dependency (rejects cycles) |
| `vstack_task_complete` | Complete task with result/evidence |

## Agent Coordination Tools

| Tool | Description |
|---|---|
| `vstack_agent_dispatch` | Dispatch agent for task with context/scope |
| `vstack_agent_status` | Inspect active/finished agent runs |
| `vstack_agent_cancel` | Cancel workflow-owned agent run safely |
| `vstack_agent_handoff` | Record handoff and next expected owner |

## Quality & Review Tools

| Tool | Description |
|---|---|
| `vstack_check_discover` | Inspect scripts/config, propose available checks |
| `vstack_check_run` | Run configured check, record exit status/output |
| `vstack_evidence_record` | Record structured evidence with validation |
| `vstack_review_start` | Start independent review run(s) |
| `vstack_review_record` | Record immutable reviewer output |
| `vstack_finding_update` | Track finding status/resolution evidence |
| `vstack_gate_evaluate` | Evaluate named gate from rules and evidence |
| `vstack_verify` | Run phase/delivery verification |

## Release & Operations Tools

| Tool | Description |
|---|---|
| `vstack_release_prepare` | Prepare release candidate and documentation |
| `vstack_release_validate` | Validate version, changelog, build, tests |
| `vstack_release_publish` | Publish/tag/create release (approval required) |
| `vstack_deploy_prepare` | Prepare target, deployment plan, rollback plan |
| `vstack_deploy` | Execute deployment (approval required) |
| `vstack_smoke_test` | Run post-deployment smoke checks |
| `vstack_rollback` | Perform approved rollback |
| `vstack_post_release_record` | Record health/monitoring observations |

## Slash Commands

| Command | Description |
|---|---|
| `/vstack` | Show status/help and available next actions |
| `/vstack-start` | Create/start delivery from request |
| `/vstack-status` | Show active delivery and blockers |
| `/vstack-review` | Initiate review cycle |
| `/vstack-resume` | Recover/resume current delivery |
| `/vstack-report` | Produce delivery summary/report |

## Tool Output Format

All tools return structured JSON with:
- Stable IDs
- Current state
- Errors (if any)
- Evidence references
- Next permitted actions

Tools do not return only prose.