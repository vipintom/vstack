# Component Inventory & Reuse Decisions

**Last updated:** 2026-11-01 (Phase 0 baseline)
**Source:** Implementation Plan Section 9 + source inspection

## Decision Legend
- **KEEP** — Retain with minimal changes
- **REFACTOR** — Simplify/adapt to new boundaries
- **DEFER** — Remove from prototype scope; keep code for now
- **REMOVE** — Delete after references/tests reconciled

---

## Persistence Layer

| Module | Decision | Notes |
|---|---|---|
| `persistence/file-store.ts` | **KEEP** | Atomic read/write, revision concurrency, schema validation — core infrastructure |
| `persistence/locks.ts` | **KEEP** | Cross-process locking — verify stale-lock recovery in tests |
| `persistence/atomic-write.ts` | **KEEP** | Multi-record atomic writes — used by dashboard projection |
| `persistence/event-log.ts` | **KEEP** | Append-only JSONL — activity history foundation |
| `persistence/repository-root.ts` | **KEEP** | Main repo/worktree resolution — verify worktree behavior |
| `persistence/schema-version.ts` | **KEEP** | Schema tracking — extend for migration support |

---

## Schemas

| Module | Decision | Notes |
|---|---|---|
| `schemas/types.ts` | **KEEP & TRIM** | Branded IDs, core entities — remove unused lifecycle/profile fields; **do not move to Playbook** |
| JSON schemas (if any) | **KEEP & TRIM** | Retain only for persisted entities and projections |

---

## Task & Delivery Management

| Module | Decision | Notes |
|---|---|---|
| `tasks/task-graph.ts` | **KEEP** | Dependency graph, topological sort — runtime capability |
| `tasks/dependency-resolver.ts` | **KEEP** | Cycle detection, ready-task calculation |
| `tasks/task-service.ts` | **REFACTOR** | Simplify to CRUD + dependency + ready operations; remove phaseRunId coupling |
| `tasks/assignment.ts` | **REFACTOR** | Basic assignment metadata only; Lead makes decisions |

---

## Lifecycle (Major Simplification)

| Module | Decision | Target |
|---|---|---|
| `lifecycle/profiles.ts` | **TRANSFORM** | → Markdown workflow recipes in Playbook; retain only small runtime status definitions |
| `lifecycle/phase-transitions.ts` | **REFACTOR** | Basic delivery/task transition validation only |
| `lifecycle/lifecycle-engine.ts` | **REMOVE** | Most abstraction removed; direct delivery operations + small state validation |
| `lifecycle/reentry.ts` | **REMOVE** | Phase re-entry logic — not needed for prototype |

---

## Agent Coordination

| Module | Decision | Notes |
|---|---|---|
| `agents/agent-installer.ts` | **KEEP** | Preserve custom files; use filesystem provisioning; verify idempotency |
| `orchestration/agent-dispatch.ts` | **KEEP** | Verify against current OpenCode API; session dispatch |
| `orchestration/session-tracker.ts` | **REFACTOR** | Persist agent-run records; avoid duplicate in-memory tracker |
| `orchestration/scheduler.ts` | **DEFER** | Priority scheduler — out of prototype scope |
| `orchestration/coordinator.ts` | **DEFER** | Separate coordination framework — out of prototype scope |
| `orchestration/cancellation.ts` | **DEFER** | Complex cancellation orchestration — keep basic interruption handling |

---

## Quality & Evidence

| Module | Decision | Notes |
|---|---|---|
| `quality/execution-adapter.ts` | **KEEP CONDITIONALLY** | Verify process safety, timeouts, output limits, tests |
| `quality/evidence-ledger.ts` | **ADAPT** | Use existing persistence contract; fix TS error (revision field) |
| `quality/check-discovery.ts` | **REFACTOR** | Supported common project checks only |
| `quality/gates.ts` | **REFACTOR** | A few evidence/completion checks; no generic registry framework |
| `quality/build.ts` | **DEFER** | Specialized build engine — generic check runner suffices |
| `quality/test.ts` | **DEFER** | Specialized test engine — generic check runner suffices |
| `quality/security.ts` | **DEFER** | Specialized security engine — generic check runner suffices |
| `quality/acceptance.ts` | **DEFER** | Specialized acceptance engine — generic check runner suffices |
| `quality/verification.ts` | **REFACTOR** | Simplify to basic completion checks |

---

## Reviews

| Module | Decision | Notes |
|---|---|---|
| `reviews/review-orchestrator.ts` | **REDUCE** | Session dispatch + simple review/finding records |
| `reviews/findings.ts` | **REDUCE** | Basic finding lifecycle |
| `reviews/resolution.ts` | **REDUCE** | Basic resolution tracking |
| `reviews/rubrics.ts` | **MOVE TO PLAYBOOK** | Content — review rubrics belong in portable resources |

---

## Release/Deployment (Defer)

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
| `policy/permissions.ts` | **REFACTOR** | Small explicit protected-action rules |
| `policy/approvals.ts` | **REFACTOR** | Small explicit approval requirements |
| `policy/autonomy.ts` | **DEFER** | Elaborate autonomy modes — out of prototype scope |
| `recovery/recovery-manager.ts` | **REDUCE** | Detect interrupted/unknown sessions; enable explicit resume |
| `recovery/reconciliation.ts` | **REDUCE** | Basic consistency checks only |

---

## Runtime & Dashboard

| Module | Decision | Notes |
|---|---|---|
| `runtime/state.ts` | **ADAPT** | Initialize manifest, services, read-model projection |
| `dashboard/index-generator.ts` | **KEEP & ADAPT** | Publish read model only |

---

## Tools (Consolidate to ~7)

| Module | Decision | Target Tool |
|---|---|---|
| `tools/task-tools.ts` | **CONSOLIDATE** | `vstack_task` |
| `tools/delivery-tools.ts` | **CONSOLIDATE** | `vstack_delivery` |
| `tools/agent-tools.ts` | **CONSOLIDATE** | `vstack_agent` |
| `tools/workflow-tools.ts` | **CONSOLIDATE** | `vstack_status` / `vstack_delivery` |
| `tools/review-tools.ts` | **CONSOLIDATE** | `vstack_check` (evidence) + review via agent |
| `tools/quality-tools.ts` | **CONSOLIDATE** | `vstack_check` |
| `tools/release-tools.ts` | **REMOVE** | Deferred |
| `tools/index.ts` | **REWRITE** | Register ~7 cohesive tools |

---

## OpenChamber

| Module | Decision | Notes |
|---|---|---|
| `panel/main.ts` | **REFACTOR** | Projection-driven view bootstrap |
| `panel/dashboard.ts` | **REFACTOR** | Projection-driven dashboard |
| `panel/src/services/api.ts` | **REPLACE** | Projection readers + validation |
| `panel/src/components/Dashboard.ts` | **KEEP** | Reuse if data-independent |
| `panel/src/components/render.ts` | **KEEP** | Reuse if data-independent |

---

## Agents-Skills (Playbook Source)

| Content | Decision | Target Location |
|---|---|---|
| `skills/vstack-*` (11 skills) | **REWRITE** | `/playbook/skills/` as Markdown with Agent Skills frontmatter |
| `agents/opencode-v2/*.md` (6 agents) | **ADAPT** | `/playbook/agents/adapters/opencode/` — thin adapters only |
| `resources/rubrics/` | **MOVE** | `/playbook/resources/rubrics/` |
| `resources/templates/` | **MOVE** | `/playbook/resources/templates/` |
| `resources/references/` | **MOVE** | `/playbook/resources/references/` |

**Critical:** Do NOT move TypeScript algorithms (task-graph, gate evaluators, execution-adapter, session-tracker, reconciliation, transition enforcement) into Playbook. Playbook is content-only.

---

## Open Questions

1. **Skills CLI layout:** Does `npx skills add` support nested `playbook/skills/`? Must test before finalizing.
2. **Evidence revision field:** Add `revision` to Evidence type or change `writeJsonFile` signature? (ADR needed)
3. **OpenChamber SDK:** Is `@openchamber/sdk` available? Build currently fails.
4. **Worktree support:** Current `repository-root.ts` handles worktrees — verify before enabling.