# vstack Technical Audit and Reuse Assessment

**Date:** 2026-10-31  
**Repository:** `/home/ubuntu/code/personal/vstack`  
**Scope:** Complete implementation audit for architectural redesign

---

## Executive Assessment

### Overall Implementation Maturity

The vstack repository is **approximately 70% complete** with a solid, well-structured foundation. The codebase demonstrates strong engineering practices:

- **TypeScript strict mode** with branded ID types
- **Atomic file operations** with revision-based optimistic concurrency
- **Cross-process locking** with stale-lock detection
- **Append-only event log** for audit trail
- **Schema validation** on read/write
- **Comprehensive test coverage** for core persistence and quality modules
- **Clean separation** of concerns across ~40 modules

### Reusable Functionality

| Area | Reusability | Notes |
|------|-------------|-------|
| Persistence layer (file-store, locks, atomic-write, event-log) | **HIGH** | Battle-tested, production-ready |
| Schema/types definitions | **HIGH** | Well-designed, extensible |
| Task engine (graph, dependencies, assignment) | **HIGH** | Complete with cycle detection |
| Lifecycle profiles & phase transitions | **HIGH** | 7 profiles, gate integration |
| Agent installer | **HIGH** | Handles upgrades, user customization |
| Evidence ledger | **HIGH** | Structured records, bounded output |
| Check discovery & execution adapter | **HIGH** | Tests pass, discovers package.json/Makefile/turbo |
| Review orchestrator | **MEDIUM** | Core logic exists, needs fresh-context dispatch |
| Recovery/reconciliation | **MEDIUM** | Good detection, limited auto-fix |
| OpenChamber panel | **MEDIUM** | Read-only, polls index.json, feature-complete views |

### Most Valuable Existing Components

1. **Persistence layer** (`persistence/*.ts`) — robust, concurrent-safe, schema-validated
2. **Task engine** (`tasks/*.ts`) — complete dependency graph, topological sort, assignment
3. **Lifecycle profiles** (`lifecycle/profiles.ts`) — 7 well-defined profiles with gates/approvals
4. **Schema types** (`schemas/types.ts`) — branded IDs, comprehensive event model
5. **Agent installer** (`agents/agent-installer.ts`) — safe provisioning with version tracking
6. **Quality infrastructure** (`quality/*.ts`) — discovery, execution, evidence, gates

### Biggest Architectural Mismatches

| Mismatch | Current | Required |
|----------|---------|----------|
| **Harness coupling** | Skills load via `ctx.skill.transform`; agents provisioned to `.opencode/agents/` | Playbook must be harness-independent |
| **Plugin monolith** | All services initialized in `index.ts` setup; tools share `vstack` context object | Separate playbook package; plugin only runtime |
| **Memory/State/History conflated** | Single `.vstack/` directory mixes all three | Separate stores per concern |
| **OpenChamber reads directly** | Panel uses `host.readFile` on delivery internals | Should read only published projections |
| **Skills embed procedures** | Workflow logic in skills (`vstack-planning`, `vstack-implementation`) | Skills should be portable procedures; plugin orchestrates |
| **No migration system** | Schema version in types but no migration runner | Required for prototype data compatibility |

### Rewrite Justification

**No wholesale rewrite is justified.** The existing implementation is well-architected and ~70% complete. The redesign should:

1. **Extract** the playbook (agents, skills, workflows, principles) to a separate package
2. **Refactor** the OpenCode plugin to be a thin runtime layer
3. **Adapt** OpenChamber to read-only visualization
4. **Separate** persistence into memory / runtime / history stores

---

## Repository Structure

```
/home/ubuntu/code/personal/vstack/
├── opencode.jsonc                          # OpenCode plugin config
├── opencode/vstack/                        # OpenCode plugin package (@vstack/opencode)
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                        # Plugin entry point (220 lines)
│   │   ├── agents/agent-installer.ts       # Agent provisioning
│   │   ├── dashboard/index-generator.ts    # Manifest + dashboard index
│   │   ├── lifecycle/
│   │   │   ├── lifecycle-engine.ts         # Delivery lifecycle coordination
│   │   │   ├── phase-transitions.ts        # Gate/approval validation
│   │   │   ├── profiles.ts                 # 7 lifecycle profiles
│   │   │   └── reentry.ts                  # Phase re-entry logic
│   │   ├── orchestration/
│   │   │   ├── agent-dispatch.ts           # OpenCode session management
│   │   │   ├── coordinator.ts              # Task scheduling + dispatch
│   │   │   ├── session-tracker.ts          # Session lifecycle tracking
│   │   │   ├── scheduler.ts                # Priority-based scheduling
│   │   │   └── cancellation.ts             # Cancellation handling
│   │   ├── persistence/
│   │   │   ├── repository-root.ts          # .vstack root resolution
│   │   │   ├── file-store.ts               # Atomic read/write + schema validation
│   │   │   ├── locks.ts                    # Cross-process file locking
│   │   │   ├── atomic-write.ts             # Multi-file atomic transactions
│   │   │   ├── event-log.ts                # Append-only JSONL event log
│   │   │   └── schema-version.ts           # Schema version tracking
│   │   ├── policy/
│   │   │   ├── permissions.ts              # Agent roles, approval policies
│   │   │   ├── approvals.ts                # Approval workflow
│   │   │   └── autonomy.ts                 # Autonomy modes
│   │   ├── quality/
│   │   │   ├── gates.ts                    # Gate definitions + evaluator
│   │   │   ├── evidence-ledger.ts          # Structured evidence storage
│   │   │   ├── check-discovery.ts          # Project check inference
│   │   │   ├── execution-adapter.ts        # Verified process execution
│   │   │   ├── verification.ts             # Phase verification
│   │   │   ├── test.ts                     # Test utilities
│   │   │   ├── build.ts                    # Build verification
│   │   │   ├── security.ts                 # Security checks
│   │   │   ├── acceptance.ts               # Acceptance criteria
│   │   │   └── check-discovery.ts          # (duplicate name)
│   │   ├── recovery/
│   │   │   ├── recovery-manager.ts         # Crash recovery
│   │   │   └── reconciliation.ts           # State consistency checking
│   │   ├── reviews/
│   │   │   ├── review-orchestrator.ts      # Goldfish review coordination
│   │   │   ├── findings.ts                 # Finding management
│   │   │   ├── resolution.ts               # Finding resolution tracking
│   │   │   └── rubrics.ts                  # Review rubrics
│   │   ├── release/
│   │   │   ├── release-preparation.ts      # Release candidate creation
│   │   │   ├── deployment.ts               # Deployment execution
│   │   │   ├── rollback.ts                 # Rollback orchestration
│   │   │   └── post-release.ts             # Post-release verification
│   │   ├── runtime/state.ts                # Manifest + index bootstrap
│   │   ├── schemas/
│   │   │   ├── types.ts                    # Core domain types (530 lines)
│   │   │   └── *.schema.json               # JSON schemas for validation
│   │   ├── skills/skill-loader.ts          # Skills loading from @vstack/agents-skills
│   │   └── tools/
│   │       ├── index.ts                    # Tool registry (7 namespaces)
│   │       ├── delivery-tools.ts           # 4 tools
│   │       ├── workflow-tools.ts           # 6 tools
│   │       ├── task-tools.ts               # 11 tools
│   │       ├── agent-tools.ts              # 4 tools
│   │       ├── quality-tools.ts            # 6 tools
│   │       ├── review-tools.ts             # 3 tools
│   │       └── release-tools.ts            # 4 tools
│   └── test/                               # 6 test files (unit only)
├── openchamber/vstack-panel/               # OpenChamber panel package
│   ├── package.json
│   ├── panel/
│   │   ├── main.ts                         # Panel entry (1136 lines)
│   │   ├── dashboard.ts                    # Dashboard component
│   │   ├── index.html / dashboard.html
│   │   └── src/
│   │       ├── components/render.ts
│   │       ├── components/Dashboard.ts
│   │       ├── services/api.ts
│   │       └── types/index.ts
└── docs/
    ├── implementation-plan.md
    ├── implementation-plan-v2.md
    └── prd/whale-goldfish-model.md
```

**Note:** No `agents-skills` package exists in this repo — it's expected as external `@vstack/agents-skills`.

---

## Component Classification Matrix

### 1. Playbook: Agents, Skills, Workflows

| Existing Component | Current Responsibility | New Responsibility | Classification | Reason |
|--------------------|------------------------|---------------------|----------------|--------|
| `skills/skill-loader.ts` | Loads skills from `@vstack/agents-skills`, registers via `ctx.skill` | Load portable skill definitions; no OpenCode registration | **REFACTOR** | Remove `ctx.skill` coupling; return plain skill objects |
| `lifecycle/profiles.ts` | 7 lifecycle profiles with phases, gates, approvals | Same — canonical workflow definitions | **REUSE** | Pure data, no harness deps |
| `lifecycle/phase-transitions.ts` | Validates transitions, checks gates, executes transitions | Pure transition logic; called by plugin | **REUSE** | No harness deps |
| `lifecycle/reentry.ts` | Phase re-entry after interruption | Portable re-entry procedure | **REUSE** | No harness deps |
| `orchestration/coordinator.ts` | Task scheduling, agent dispatch, assignment | **MOVE TO PLAYBOOK** as workflow procedures | **REFACTOR** | Logic is portable; plugin only executes |
| `orchestration/scheduler.ts` | Priority-based scheduling with worktree awareness | Portable scheduling algorithm | **REUSE** | No harness deps |
| `tasks/assignment.ts` | Agent-task matching with skill/type affinity | Portable assignment logic | **REUSE** | No harness deps |
| `tasks/task-graph.ts` | Dependency graph, topological sort, visualization | Portable task graph utilities | **REUSE** | No harness deps |
| `reviews/review-orchestrator.ts` | Coordinates independent reviewers, deduplicates findings | Portable review procedure | **REFACTOR** | Remove session dispatch; keep synthesis logic |
| `reviews/rubrics.ts` | Review quality rubrics | Portable review criteria | **REUSE** | Pure data |
| `quality/gates.ts` | Gate definitions, evaluator, retry policy | Portable quality gate definitions | **REUSE** | No harness deps |
| `quality/check-discovery.ts` | Infers checks from package.json/Makefile/turbo | Portable discovery | **REUSE** | No harness deps |
| `quality/execution-adapter.ts` | Verified process execution with bounds | Portable execution primitive | **REUSE** | No harness deps |
| `quality/evidence-ledger.ts` | Evidence recording with bounded logs | Portable evidence schema + helpers | **REFACTOR** | Remove file-store coupling; provide interface |
| `recovery/recovery-manager.ts` | Crash recovery, session reconciliation | Portable recovery procedures | **REFACTOR** | Remove OpenCode session API calls |
| `recovery/reconciliation.ts` | Cross-entity consistency validation | Portable reconciliation rules | **REUSE** | No harness deps |
| `policy/permissions.ts` | Agent roles, approval policies, autonomy | Portable policy definitions | **REUSE** | Pure data + logic |
| `schemas/types.ts` | Branded IDs, domain types, events | Canonical type definitions | **REUSE** | Shared across all packages |
| `schemas/*.schema.json` | JSON schemas for validation | Validation schemas | **REUSE** | Shared |

### 2. OpenCode Plugin

| Existing Component | Current Responsibility | New Responsibility | Classification | Reason |
|--------------------|------------------------|---------------------|----------------|--------|
| `index.ts` (plugin setup) | Initializes all services, registers tools/commands/hooks | Thin bootstrap: persistence, hooks, tool registration | **REFACTOR** | Remove service initialization; delegate to playbook |
| `persistence/*` | File store, locks, atomic write, event log | **REUSE** — core persistence engine | **REUSE** | Battle-tested, no harness deps |
| `runtime/state.ts` | Manifest + dashboard index bootstrap | **REUSE** — index projection for OpenChamber | **REUSE** | Needed for read-only panel |
| `dashboard/index-generator.ts` | Builds `index.json` from delivery files | **REUSE** — projection for panel | **REUSE** | Core plugin responsibility |
| `tools/index.ts` + `tools/*-tools.ts` | 38 tools across 7 namespaces | **REDUCE** to ~15 essential tools | **REFACTOR** | Many tools duplicate skill procedures |
| `orchestration/agent-dispatch.ts` | OpenCode session create/prompt/interrupt | **REUSE** — only plugin can dispatch sessions | **REUSE** | Requires `ctx.session` API |
| `orchestration/session-tracker.ts` | Tracks session lifecycle, activity | **REUSE** — plugin-specific | **REUSE** | Requires OpenCode session events |
| `policy/approvals.ts` | Approval workflow with timeout | **REUSE** — plugin enforces approvals | **REUSE** | Requires permission hooks |
| `agents/agent-installer.ts` | Provisions `.opencode/agents/*.md` | **REUSE** — plugin-specific | **REUSE** | OpenCode loads agents from filesystem |
| `skills/skill-loader.ts` (OpenCode part) | Registers skills via `ctx.skill.transform` | Register playbook skills at startup | **REFACTOR** | Keep registration, remove loading logic |
| `lifecycle/lifecycle-engine.ts` | Delivery CRUD, phase transitions | **REFACTOR** — delegate to playbook procedures | **REFACTOR** | Engine logic belongs in playbook |
| `quality/verification.ts` | Runs phase verification gates | **REFACTOR** — delegate to playbook | **REFACTOR** | Execution logic in playbook |
| `release/*` | Release, deployment, rollback, post-release | **REFACTOR** — delegate to playbook | **REFACTOR** | Procedures in playbook |
| `recovery/recovery-manager.ts` (OpenCode part) | Calls `checkSessionExists` via OpenCode API | **REFACTOR** — use actual `ctx.session.get()` | **REFACTOR** | Currently stubbed |

### 3. OpenChamber Plugin

| Existing Component | Current Responsibility | New Responsibility | Classification | Reason |
|--------------------|------------------------|---------------------|----------------|--------|
| `panel/main.ts` (1136 lines) | Reads `.vstack/` directly via `host.readFile` | Read **only** `manifest.json` + `state/index.json` + published reports | **REFACTOR** | Must not read delivery internals directly |
| `panel/dashboard.ts` | Duplicate of main.ts logic | Remove | **REMOVE** | Duplicate |
| `panel/src/services/api.ts` | File-reading helpers for panel | Replace with projection readers | **REPLACE** | Current reads bypass separation |
| `panel/src/components/*` | UI rendering | **REUSE** — adapt to projection data | **REUSE** | UI logic is sound |
| `panel/index.html` / `dashboard.html` | Panel and full-screen page entries | Keep both | **REUSE** | Required by OpenChamber |
| `package.json` capabilities | Declares `["files"]` | Keep `files` for reading projections | **REUSE** | Read-only access needed |

**Critical Finding:** OpenChamber currently reads delivery internals (tasks, phases, agent-runs, findings, evidence) directly via `host.readFile`. This violates the read-only visualization layer requirement. It must be refactored to consume only:
- `.vstack/manifest.json` (schema version, project ID)
- `.vstack/state/index.json` (active deliveries summary)
- `.vstack/reports/*.json` (published summaries)
- `.vstack/state/events.jsonl` (optional, for activity feed)

### 4. Shared Schemas and Persistence

| Existing Component | Current Responsibility | New Responsibility | Classification | Reason |
|--------------------|------------------------|---------------------|----------------|--------|
| `schemas/types.ts` | All domain types (Delivery, Task, PhaseRun, AgentRun, Review, Finding, Evidence, Approval, Event) | **REUSE** — canonical types for all three packages | **REUSE** | Single source of truth |
| `schemas/*.schema.json` | JSON schemas for file-store validation | **REUSE** — validation schemas | **REUSE** | Shared |
| `persistence/file-store.ts` | Atomic read/write with schema validation | **REUSE** — core persistence primitive | **REUSE** | Used by all packages |
| `persistence/locks.ts` | Cross-process locking | **REUSE** — concurrency control | **REUSE** | Used by all packages |
| `persistence/atomic-write.ts` | Multi-file atomic transactions | **REUSE** — complex updates | **REUSE** | Used by plugin |
| `persistence/event-log.ts` | Append-only event log | **REUSE** — activity history | **REUSE** | Core history store |
| `persistence/repository-root.ts` | `.vstack/` root resolution | **REUSE** — path resolution | **REUSE** | Canonical root logic |
| `persistence/schema-version.ts` | Schema version tracking | **EXTEND** — add migration runner | **REFACTOR** | Missing migration system |

---

## Architectural Complexity Assessment

### Overengineered Abstractions

| Component | Issue | Recommendation |
|-----------|-------|----------------|
| `orchestration/coordinator.ts` + `agent-dispatch.ts` + `scheduler.ts` | Three layers for "dispatch agent for task" | Consolidate: scheduler → dispatch → session-tracker |
| `lifecycle/lifecycle-engine.ts` + `phase-transitions.ts` + `profiles.ts` | Engine delegates to transitions which reads profiles | Flatten: engine uses profiles directly |
| `tools/index.ts` 38 tools | Many tools are thin wrappers over service methods | Reduce to 15: delivery, workflow, task, quality, review, release, agent |
| `quality/gates.ts` `GateRegistry` class | Simple map with register/get/clear | Replace with plain object + functions |
| `recovery/recovery-manager.ts` + `reconciliation.ts` | Overlap in consistency checking | Merge into single reconciliation module |

### Unnecessary Service Layers

- **GateRegistry** — just a Map; use plain object
- **SessionTracker** (in-memory only) — duplicates agent-run persistence; unify
- **Coordinator** — orchestrates services that could be direct tool calls

### Excessive Tool Exposure

38 tools registered; many duplicate skill procedures:
- `vstack_plan_set` → skill `vstack-planning`
- `vstack_task_create` → skill `vstack-implementation` / `vstack-testing`
- `vstack_check_run` → skill `vstack-testing`
- `vstack_review_record` → skill `vstack-review`
- `vstack_evidence_record` → skill `vstack-documentation`

**Recommendation:** Keep only tools that require **deterministic plugin functionality**:
1. `vstack_status` — read projected state
2. `vstack_delivery_create` — creates delivery dir structure
3. `vstack_workflow_start/advance/block/unblock/finish` — phase transitions (gate enforcement)
4. `vstack_task_ready` — computes ready tasks (depends on persisted graph)
5. `vstack_check_discover` — reads project config (plugin has FS access)
6. `vstack_check_run` — executes via verified adapter (plugin controls process)
7. `vstack_gate_evaluate` — evaluates gates against stored evidence
8. `vstack_review_start` — dispatches fresh-context reviewers (plugin manages sessions)
9. `vstack_verify` — phase/delivery verification
10. `vstack_release_prepare/validate/publish` — release gates (approval enforcement)
11. `vstack_deploy/rollback/smoke_test` — deployment (approval enforcement)
12. `vstack_agent_dispatch` — internal: create session for task

### Features Implementable via Portable Skills

Move to playbook (skills):
- Task creation with acceptance criteria (`vstack_task_create`)
- Task assignment (`vstack_task_assign`)
- Task updates (`vstack_task_update`)
- Plan recording (`vstack_plan_set`)
- Evidence recording (`vstack_evidence_record`)
- Finding updates (`vstack_finding_update`)
- Review recording (`vstack_review_record`)

### Features Requiring Deterministic Plugin Functionality

Must stay in plugin:
- **Phase transitions with gate enforcement** — single source of truth
- **Agent session dispatch** — only plugin has `ctx.session.create`
- **Approval enforcement** — only plugin has permission hooks
- **Verified process execution** — plugin controls `child_process`
- **Dashboard index projection** — plugin owns `.vstack/state/index.json`
- **Recovery on startup** — plugin initializes first
- **Agent provisioning** — plugin writes `.opencode/agents/`

---

## Architectural Risks

| Risk | Severity | Evidence | Mitigation |
|------|----------|----------|------------|
| **Single source of truth for delivery/task state** | HIGH | Multiple services mutate delivery.json, task files, phase runs without central coordination | Introduce a `StateStore` facade in plugin; all mutations go through it |
| **Memory / Runtime State / History conflated** | HIGH | `.vstack/` mixes `deliveries/` (runtime), `state/events.jsonl` (history), no separate memory store | Create three subdirectories: `.vstack/memory/`, `.vstack/runtime/`, `.vstack/history/` |
| **File persistence concurrency** | MEDIUM | Optimistic locking via revision; no distributed lock for multi-process | Current locks work for single-user; document limitation |
| **Cross-worktree state** | HIGH | `repository-root.ts` uses canonical root — all worktrees share `.vstack/` | **KEEP** — this is correct; verify with `ctx.worktree` API |
| **Agent session recovery** | HIGH | `checkSessionExists` is stubbed; recovery can't verify real sessions | Implement via `ctx.session.get()` in `recovery-manager.ts` |
| **Duplicate/conflicting updates** | MEDIUM | Tools receive full service context; no transaction boundary for multi-file updates | Use `atomicWriteBatch` for multi-entity mutations |
| **Agent permissions bypass** | HIGH | Permission hook is stubbed; tools don't check `policyManager` | Implement permission checks in tool execution wrapper |
| **OpenChamber consistency** | HIGH | Panel reads delivery internals directly; may see partial writes | Panel reads only `index.json` (atomic) + published reports |
| **Skill/workflow drift** | MEDIUM | Skills loaded from external package; plugin has duplicate logic | Single source: skills define procedures; plugin executes them |
| **Migration from existing data** | MEDIUM | Schema version exists but no migration runner | Implement migration runner before any schema change |

---

## Migration and Reuse Strategy

### 1. Can we preserve the existing repository structure?

**Yes, with reorganization.** Keep monorepo but split into three packages:

```
vstack/
├── packages/
│   ├── playbook/              # NEW: @vstack/playbook
│   │   ├── agents/            # Portable agent role definitions (Markdown + frontmatter)
│   │   ├── skills/            # Portable skills (SKILL.md with YAML frontmatter)
│   │   ├── workflows/         # Portable procedures (TypeScript, no harness deps)
│   │   ├── principles/        # Engineering principles (Markdown)
│   │   ├── references/        # Templates, rubrics, checklists
│   │   └── package.json
│   ├── opencode/              # EXISTING: @vstack/opencode (refactored)
│   │   ├── src/
│   │   │   ├── persistence/   # REUSE
│   │   │   ├── runtime/       # REUSE
│   │   │   ├── dashboard/     # REUSE
│   │   │   ├── hooks/         # NEW: session, tool, permission hooks
│   │   │   ├── tools/         # REDUCED: ~15 essential tools
│   │   │   ├── commands/      # Slash commands
│   │   │   ├── agents/        # Agent installer
│   │   │   └── index.ts       # Thin bootstrap
│   │   └── package.json
│   └── openchamber/           # EXISTING: @vstack/openchamber (refactored)
│       ├── panel/
│       │   ├── main.ts        # REFACTORED: reads only projections
│       │   ├── components/    # REUSE
│       │   └── index.html / dashboard.html
│       └── package.json
├── turbo.json / pnpm-workspace.yaml
└── package.json (root)
```

### 2. Module Migration Map

| Current Location | New Location | Changes |
|------------------|--------------|---------|
| `opencode/vstack/src/schemas/*` | `packages/playbook/schemas/` | **MOVE** — no changes |
| `opencode/vstack/src/persistence/*` | `packages/opencode/src/persistence/` | **KEEP** — no changes |
| `opencode/vstack/src/lifecycle/profiles.ts` | `packages/playbook/workflows/profiles.ts` | **MOVE** — no changes |
| `opencode/vstack/src/lifecycle/phase-transitions.ts` | `packages/playbook/workflows/transitions.ts` | **MOVE** — no changes |
| `opencode/vstack/src/tasks/task-graph.ts` | `packages/playbook/workflows/task-graph.ts` | **MOVE** — no changes |
| `opencode/vstack/src/tasks/assignment.ts` | `packages/playbook/workflows/assignment.ts` | **MOVE** — no changes |
| `opencode/vstack/src/tasks/task-service.ts` | `packages/opencode/src/runtime/task-service.ts` | **REFACTOR** — use playbook types |
| `opencode/vstack/src/lifecycle/lifecycle-engine.ts` | `packages/opencode/src/runtime/lifecycle-engine.ts` | **REFACTOR** — delegate to playbook |
| `opencode/vstack/src/quality/gates.ts` | `packages/playbook/workflows/gates.ts` | **MOVE** — no changes |
| `opencode/vstack/src/quality/check-discovery.ts` | `packages/playbook/workflows/check-discovery.ts` | **MOVE** — no changes |
| `opencode/vstack/src/quality/execution-adapter.ts` | `packages/playbook/workflows/execution-adapter.ts` | **MOVE** — no changes |
| `opencode/vstack/src/quality/evidence-ledger.ts` | `packages/opencode/src/runtime/evidence-ledger.ts` | **REFACTOR** — adapt to persistence interface |
| `opencode/vstack/src/reviews/review-orchestrator.ts` | `packages/playbook/workflows/review.ts` | **REFACTOR** — remove session dispatch |
| `opencode/vstack/src/orchestration/*` | `packages/opencode/src/orchestration/` | **CONSOLIDATE** — merge coordinator/dispatch/scheduler |
| `opencode/vstack/src/tools/*` | `packages/opencode/src/tools/` | **REDUCE** — keep 15 essential tools |
| `opencode/vstack/src/agents/agent-installer.ts` | `packages/opencode/src/agents/agent-installer.ts` | **KEEP** |
| `openchamber/vstack-panel/panel/main.ts` | `packages/openchamber/panel/main.ts` | **REFACTOR** — read only projections |

### 3. Modules to Simplify

| Module | Simplification |
|--------|----------------|
| `orchestration/coordinator.ts` + `agent-dispatch.ts` + `scheduler.ts` | Merge into `orchestration/engine.ts` (~200 lines) |
| `tools/*-tools.ts` (38 tools) | Reduce to `tools/essential-tools.ts` (~15 tools) |
| `quality/gates.ts` `GateRegistry` class | Replace with `const gates = { ... }` + functions |
| `recovery/recovery-manager.ts` + `reconciliation.ts` | Merge into `recovery/reconcile.ts` |
| `openchamber/panel/main.ts` (1136 lines) | Split: `main.ts` (bootstrap) + `views/*.ts` (per-tab) |

### 4. Modules to Rewrite

| Module | Reason |
|--------|--------|
| `openchamber/panel/src/services/api.ts` | Currently reads delivery internals; must read only projections |
| `opencode/vstack/src/index.ts` | Rewrite as thin bootstrap; remove service initialization |
| `opencode/vstack/src/runtime/state.ts` | Extend to manage three stores (memory/runtime/history) |

### 5. Data Migration Safety

**Existing data CAN be migrated safely:**

- Schema version is tracked in every entity (`schemaVersion: 1`)
- `manifest.json` has `contentVersion`
- Event log provides full replay capability
- File-store validates on read

**Migration steps needed:**
1. Add migration runner in `persistence/schema-version.ts`
2. Write migration for any schema changes (e.g., splitting `.vstack/`)
3. Run migration on plugin startup before initialization

### 6. Historical Reference

Retain for reference (do not delete):
- `docs/implementation-plan.md` (v1)
- `docs/implementation-plan-v2.md` (current)
- `docs/prd/whale-goldfish-model.md`

### 7. Safest Implementation Order

| Phase | Work | Dependencies | Acceptance |
|-------|------|--------------|------------|
| **0. Prep** | Create `packages/playbook/` with schemas, types, profiles, workflows | None | Playbook builds, types export |
| **1. Persistence** | Move `persistence/*` to `opencode/src/persistence/` (no changes) | Phase 0 | All persistence tests pass |
| **2. Runtime Core** | Move `runtime/state.ts`, `dashboard/index-generator.ts` to `opencode/src/runtime/` | Phase 1 | Dashboard index generates |
| **3. Playbook Extraction** | Move profiles, phase-transitions, task-graph, assignment, gates, check-discovery, execution-adapter, review-orchestrator (core), reconciliation to playbook | Phase 0 | Playbook exports pure functions |
| **4. Plugin Refactor** | Rewrite `index.ts` as thin bootstrap; consolidate orchestration; reduce tools | Phases 1-3 | Plugin loads, tools register, hooks fire |
| **5. OpenChamber Refactor** | Rewrite `main.ts` to read only projections; remove direct delivery reads | Phase 2 | Panel shows active deliveries from index.json |
| **6. Agent/Skill Integration** | Update skill-loader to load from playbook; agent-installer unchanged | Phase 4 | Skills + agents provisioned |
| **7. Recovery** | Implement `checkSessionExists` via `ctx.session.get()`; merge recovery modules | Phase 4 | Startup recovery logs show results |
| **8. Permissions** | Implement permission hook enforcement in tool wrapper | Phase 4 | Protected operations require approval |
| **9. E2E Test** | One complete feature delivery via skills + plugin | Phases 0-8 | Request → completion works |

---

## Implementation Estimates

| Migration Area | Effort | Rationale |
|----------------|--------|-----------|
| Playbook package creation + schema move | **LOW** | Pure file moves, no logic changes |
| Persistence layer move | **LOW** | No changes needed |
| Runtime core (state, dashboard) | **LOW** | No logic changes |
| Workflow logic extraction (profiles, transitions, task-graph, assignment, gates) | **LOW** | Pure functions, no harness deps |
| Quality infrastructure extraction (discovery, execution, evidence interface) | **MEDIUM** | Evidence ledger needs persistence interface |
| Review orchestrator extraction | **MEDIUM** | Remove session dispatch, keep synthesis |
| Orchestration consolidation (coordinator + dispatch + scheduler) | **MEDIUM** | Merge ~800 lines → ~200 |
| Tool reduction (38 → 15) | **MEDIUM** | Remove wrappers, keep enforcement tools |
| Plugin bootstrap rewrite | **MEDIUM** | Thin setup, hook registration |
| OpenChamber panel refactor | **HIGH** | Rewrite data layer, keep UI |
| Recovery implementation (real session check) | **MEDIUM** | Requires OpenCode API integration |
| Permission enforcement | **MEDIUM** | Hook implementation + tool wrapper |
| Migration runner | **LOW** | Schema version exists, just need runner |
| E2E integration test | **HIGH** | Requires all above complete |

**Total estimated effort: ~8-10 engineer-weeks** for complete migration with verification.

---

## Open Questions

| Question | Impact | Resolution Needed |
|----------|--------|-------------------|
| **Where does `@vstack/agents-skills` live?** | Skill loading depends on external package | Confirm repository structure; may need to create it |
| **OpenCode v2.2 API stability** | Plugin hooks (`ctx.session.hook`, `ctx.tool.hook`, `ctx.permission.hook`) | Verify current API; pin version |
| **OpenChamber SDK availability** | Panel build requires `@openchamber/sdk` | Check if published; may need to vendor |
| **Worktree support** | `enableWorktrees: false` currently; canonical root shared | Test with `ctx.worktree.*` APIs when enabled |
| **Event log growth** | No compaction; unbounded `events.jsonl` | Design retention/compaction policy |
| **Multi-project support** | Single `.vstack/` per project root | Confirm no multi-project needs |
| **Skill versioning** | Skills loaded by directory name; no semver | Define skill versioning strategy |
| **Playbook distribution** | How do users get playbook without plugins? | NPM package `@vstack/playbook` with skills/agents |

---

## Final Recommendations

### Do This First (Week 1-2)
1. Create `packages/playbook/` with schemas, types, profiles, workflows
2. Move persistence layer to `packages/opencode/src/persistence/`
3. Verify all tests pass in new locations

### Do This Second (Week 3-4)
4. Extract workflow logic (profiles, transitions, task-graph, assignment, gates, check-discovery, execution-adapter) to playbook
5. Consolidate orchestration into single `orchestration/engine.ts`
6. Reduce tools to 15 essential ones

### Do This Third (Week 5-6)
7. Rewrite plugin bootstrap (`index.ts`) as thin setup
8. Implement permission hook enforcement
9. Implement real session check in recovery

### Do This Fourth (Week 7-8)
10. Refactor OpenChamber panel to read only projections
11. Add migration runner for schema changes
12. Run E2E test: complete feature delivery

### Defer
- Full worktree integration testing
- Event log compaction
- Multi-project support
- Phase 3-4 features (release hardening, ops)

---

**Bottom Line:** The codebase is in excellent shape for the redesign. The persistence layer, task engine, lifecycle profiles, and quality infrastructure are production-ready and should be reused. The main work is architectural separation: extracting the playbook, thinning the plugin, and making the panel truly read-only. No rewrite needed — targeted refactoring with clear boundaries.