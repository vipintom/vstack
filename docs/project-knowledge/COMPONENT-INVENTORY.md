# Component Inventory & Reuse Decisions

**Last updated:** 2026-11-01 (All phases complete)
**Source:** Implementation Plan Section 9 + source inspection

## Decision Legend
- **KEEP** — Retained with minimal changes
- **REFACTOR** — Simplified/adapted to new boundaries
- **DEFER** — Removed from prototype scope; code kept for now
- **REMOVE** — Deleted after references/tests reconciled
- **NEW** — Created during implementation

---

## Persistence Layer

| Module | Decision | Notes |
|---|---|---|
| `persistence/file-store.ts` | **KEEP** | Atomic read/write, revision concurrency, schema validation — core infrastructure |
| `persistence/locks.ts` | **KEEP** | Cross-process locking — stale-lock recovery tested |
| `persistence/atomic-write.ts` | **KEEP** | Multi-record atomic writes — used by projection publisher |
| `persistence/event-log.ts` | **KEEP** | Append-only JSONL — activity history foundation |
| `persistence/repository-root.ts` | **KEEP** | Main repo/worktree resolution — worktree behavior verified |
| `persistence/schema-version.ts` | **KEEP** | Schema tracking — extended for migration support |

---

## Schemas

| Module | Decision | Notes |
|---|---|---|
| `schemas/types.ts` | **KEEP & TRIM** | Branded IDs, core entities — removed unused lifecycle/profile fields; added `revision` to Evidence (ADR-0001) |

---

## Playbook Package (NEW)

| Module | Decision | Notes |
|---|---|---|
| `playbook/principles/*.md` | **NEW** | 7 principles: bias-to-deletion, foundational-thinking, domain-modeling, boundary-discipline, idempotence, root-cause-debugging, verifiable-sequencing, delegation |
| `playbook/agents/roles/*.md` | **NEW** | 3 canonical roles: lead.md, builder.md, reviewer.md |
| `playbook/agents/adapters/opencode/*.md` | **NEW** | 3 thin OpenCode agent adapters |
| `playbook/skills/*.md` | **NEW** | 15 skills as Markdown with Agent Skills frontmatter |
| `playbook/workflows/*.md` | **NEW** | 3 workflow recipes: bug-fix.md, feature-delivery.md, context-interruption.md |
| `playbook/resources/rubrics/*.md` | **NEW** | 4 rubrics moved from agents-skills |
| `playbook/resources/templates/*.md` | **NEW** | 4 templates moved from agents-skills |
| `playbook/resources/references/*.md` | **NEW** | References moved from agents-skills |

---

## Task & Delivery Management

| Module | Decision | Notes |
|---|---|---|
| `tasks/task-store.ts` | **NEW** | Simplified CRUD + dependencies + ready tasks (no phase coupling) |
| `deliveries/delivery-store.ts` | **NEW** | Simplified CRUD + status transitions |
| `lifecycle/lifecycle-engine.ts` | **REMOVE** | Removed — profiles now Markdown workflow recipes |
| `lifecycle/profiles.ts` | **REMOVE** | Removed — profiles now Markdown workflow recipes |
| `lifecycle/phase-transitions.ts` | **REMOVE** | Removed — basic transition validation in stores |
| `lifecycle/reentry.ts` | **REMOVE** | Removed — not needed for prototype |

---

## Agent Coordination

| Module | Decision | Notes |
|---|---|---|
| `agents/agent-installer.ts` | **KEEP** | Preserves custom files; filesystem provisioning; idempotent |
| `orchestration/agent-dispatch.ts` | **KEEP** | Uses agentRunStore; proper handoff recording |
| `orchestration/session-tracker.ts` | **REMOVE** | Removed — agentRunStore handles persistence |
| `orchestration/scheduler.ts` | **DEFER** | Priority scheduler — out of prototype scope |
| `orchestration/coordinator.ts` | **DEFER** | Coordination framework — out of prototype scope |
| `orchestration/cancellation.ts` | **DEFER** | Complex cancellation — out of prototype scope |
| `agents/agent-run-store.ts` | **NEW** | Dispatch tracking + handoff recording |

---

## Quality & Evidence

| Module | Decision | Notes |
|---|---|---|
| `quality/execution-adapter.ts` | **KEEP** | Verified process safety, timeouts, output limits, tests |
| `quality/evidence-ledger.ts` | **REFACTOR** | Uses persistence contract; revision field added (ADR-0001) |
| `quality/check-discovery.ts` | **REFACTOR** | Supported common project checks only |
| `quality/gates.ts` | **REFACTOR** | A few evidence/completion checks; no generic registry framework |
| `quality/check-service.ts` | **NEW** | Unified check execution + evidence recording |
| `quality/build.ts` | **DEFER** | Specialized build engine — generic check runner suffices |
| `quality/test.ts` | **DEFER** | Specialized test engine — generic check runner suffices |
| `quality/security.ts` | **DEFER** | Specialized security engine — generic check runner suffices |
| `quality/acceptance.ts` | **DEFER** | Specialized acceptance engine — generic check runner suffices |
| `quality/verification.ts` | **REFACTOR** | Simplified to basic completion checks in enforcement |

---

## Reviews

| Module | Decision | Notes |
|---|---|---|
| `reviews/review-orchestrator.ts` | **REMOVE** | Replaced by agent dispatch with reviewer role |
| `reviews/findings.ts` | **REMOVE** | Basic finding tracking via agent runs |
| `reviews/resolution.ts` | **REMOVE** | Resolution tracking via evidence |
| `reviews/rubrics.ts` | **MOVE TO PLAYBOOK** | Content — review rubrics in `/playbook/resources/rubrics/` |

---

## Release/Deployment (Deferred)

| Module | Decision | Notes |
|---|---|---|
| `release/release-preparation.ts` | **DEFER** | Out of prototype scope |
| `release/deployment.ts` | **DEFER** | Out of prototype scope |
| `release/rollback.ts` | **DEFER** | Out of prototype scope |
| `release/post-release.ts` | **DEFER** | Out of prototype scope |

---

## Policy & Recovery

| Module | Decision | Notes |
|---|---|---|
| `policy/permissions.ts` | **REFACTOR** | 5 minimal protected-action rules in enforcement-service |
| `policy/approvals.ts` | **REFACTOR** | Approval stub in enforcement-service |
| `policy/autonomy.ts` | **DEFER** | Elaborate autonomy modes — out of prototype scope |
| `recovery/recovery-manager.ts` | **REDUCE** | Interrupted-session detection + explicit resume |
| `recovery/reconciliation.ts` | **REDUCE** | Basic consistency checks only |
| `enforcement/enforcement-service.ts` | **NEW** | 5 basic rules: completion checks, blocked reason, approval |

---

## Runtime & Dashboard

| Module | Decision | Notes |
|---|---|---|
| `runtime/state.ts` | **REFACTOR** | Initializes manifest, services, dashboard index |
| `dashboard/index-generator.ts` | **KEEP & ADAPT** | Publishes read model (active deliveries) |
| `dashboard/projection-publisher.ts` | **NEW** | Main orchestrator for all projections |
| `dashboard/projections/types.ts` | **NEW** | Shared projection type definitions |
| `dashboard/projections/paths.ts` | **NEW** | Centralized path resolution for projections |
| `dashboard/projections/loaders.ts` | **NEW** | Data loading from .vstack/ for projections |
| `dashboard/projections/delivery-reports.ts` | **NEW** | Delivery detail reports for OpenChamber |
| `dashboard/projections/activity-reports.ts` | **NEW** | Activity timeline from event log |
| `dashboard/projections/memory-reports.ts` | **NEW** | Searchable memory index |
| `dashboard/projections/quality-reports.ts` | **NEW** | Check counts by type |

---

## Tools (Consolidated to ~7)

| Module | Decision | Target Tool |
|---|---|---|
| `tools/status-tools.ts` | **NEW** | `vstack_status` |
| `tools/memory-tools.ts` | **NEW** | `vstack_memory` |
| `tools/history-tools.ts` | **NEW** | `vstack_history` |
| `tools/delivery-tools.ts` | **NEW** | `vstack_delivery` |
| `tools/task-tools.ts` | **NEW** | `vstack_task` |
| `tools/agent-tools.ts` | **NEW** | `vstack_agent` |
| `tools/check-tools.ts` | **NEW** | `vstack_check` |
| `tools/workflow-tools.ts` | **REMOVE** | Consolidated |
| `tools/review-tools.ts` | **REMOVE** | Consolidated into check + agent |
| `tools/quality-tools.ts` | **REMOVE** | Consolidated into check |
| `tools/release-tools.ts` | **REMOVE** | Deferred |
| `tools/index.ts` | **REWRITE** | Registers ~7 cohesive tools |

---

## OpenChamber

| Module | Decision | Notes |
|---|---|---|
| `panel/main.ts` | **REFACTOR** | Projection-driven view bootstrap |
| `panel/dashboard.ts` | **REFACTOR** | Projection-driven dashboard |
| `panel/src/services/api.ts` | **REPLACE** | Projection readers + validation (reads only reports/index) |
| `panel/src/types/index.ts` | **REFACTOR** | Updated types for projection-based data |
| `panel/src/components/Dashboard.ts` | **KEEP** | Reused — data-independent |
| `panel/src/components/render.ts` | **KEEP** | Reused — data-independent |

---

## Agents-Skills (Legacy — To Be Removed)

| Content | Decision | Target Location |
|---|---|---|
| `skills/vstack-*` (11 skills) | **REWRITE** | `/playbook/skills/` as Markdown with Agent Skills frontmatter |
| `agents/opencode-v2/*.md` (6 agents) | **ADAPT** | `/playbook/agents/adapters/opencode/` — thin adapters only |
| `resources/rubrics/` | **MOVE** | `/playbook/resources/rubrics/` |
| `resources/templates/` | **MOVE** | `/playbook/resources/templates/` |
| `resources/references/` | **MOVE** | `/playbook/resources/references/` |

**Critical:** Do NOT move TypeScript algorithms (task-graph, gate evaluators, execution-adapter, session-tracker, reconciliation, transition enforcement) into Playbook. Playbook is content-only.

---

## Resolved Open Questions

1. **Skills CLI layout:** ✅ Tested — `npx skills add` supports nested `playbook/skills/`
2. **Evidence revision field:** ✅ Resolved — ADR-0001 added `revision` to Evidence type
3. **OpenChamber SDK:** ✅ Deferred — build fails but typecheck passes; documented as limitation
4. **Worktree support:** ✅ Verified — `repository-root.ts` handles worktrees correctly