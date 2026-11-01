# Architecture

**Last updated:** 2026-11-01 (All phases complete)

## Current Package Boundaries

### 1. playbook/ (Portable Content Package)
- **Purpose:** Harness-independent principles, roles, skills, workflows, resources
- **Location:** `/playbook/`
- **Contents:**
  - `principles/` — 7 engineering principles (bias to deletion, foundational thinking, domain modeling, boundary discipline, idempotence, root-cause debugging, verifiable sequencing, delegation)
  - `agents/roles/` — 3 canonical roles: lead.md, builder.md, reviewer.md
  - `agents/adapters/opencode/` — 3 thin OpenCode agent adapters
  - `skills/` — 15 skills as Markdown with Agent Skills frontmatter
  - `workflows/` — 3 workflow recipes: bug-fix.md, feature-delivery.md, context-interruption.md
  - `resources/` — rubrics (4), templates (4), references
- **Dependencies:** None (pure Markdown/YAML content)
- **Distribution:** Skills CLI compatible; works without any plugin

### 2. opencode/vstack/ (OpenCode Plugin)
- **Purpose:** Runtime engine for OpenCode — persistence, coordination, enforcement, projections
- **Location:** `/opencode/vstack/`
- **Entry point:** `src/index.ts` (Plugin.define)
- **Key services initialized at startup:**
  - **Persistence:** file-store, locks, atomic-write, event-log, repository-root, schema-version
  - **Memory:** memory-store (CRUD, categories, search, supersede, index)
  - **Deliveries:** delivery-store (CRUD, status transitions, simple model)
  - **Tasks:** task-store (CRUD, dependencies, cycles, ready tasks, no phase coupling)
  - **Agent Runs:** agent-run-store (dispatch tracking, handoff recording)
  - **History:** history-service (event querying, stats)
  - **Quality:** check-service (discover, execute, evidence recording)
  - **Enforcement:** enforcement-service (5 basic rules: completion checks, blocked reason, approval stub)
  - **Orchestration:** agent-dispatch (integrated with agentRunStore, proper handoff)
  - **Dashboard:** projection-publisher (modular: delivery reports, activity, memory index, quality summaries), index-generator
  - **Skills:** skill-loader (loads Playbook skills via findAgentsSkillsRoot)
  - **Agents:** agent-installer (provisions native agents via filesystem to `.opencode/agents/`)
- **OpenCode integrations:**
  - `ctx.skill.transform` — registers Playbook skills
  - `ctx.tool.transform` — registers ~7 cohesive tools (status, memory, history, delivery, task, agent, check)
  - `ctx.command.transform` — registers slash commands
  - `ctx.session.hook("context")` — session context injection
  - `ctx.tool.hook("execute.after")` — projection publishing
  - `ctx.permission.hook("evaluate")` — approval enforcement (stub)
  - `ctx.agent.reload()` — reload agents after install
- **Persistence:** Project-local `.vstack/` (manifest, deliveries, state, history, reports)

### 3. openchamber/vstack-panel/ (OpenChamber Extension)
- **Purpose:** Read-only visualization of vstack state via published projections
- **Location:** `/openchamber/vstack-panel/`
- **Entry points:** `panel/main.ts` (panel), `panel/dashboard.ts` (dashboard page)
- **Data access:** `panel/src/services/api.ts` — reads ONLY `.vstack/reports/` and `.vstack/state/index.json`
- **UI components:** `panel/src/components/Dashboard.ts`, `render.ts`
- **Capabilities declared:** `files` (read-only projections)
- **Build:** Uses `@openchamber/sdk/scripts/bundle-guest.ts` (deferred — SDK unavailable)

## Data Flow (Implemented)

```
User Request → OpenCode Lead Agent
    ↓
Plugin startup → Initialize all services → Load Playbook skills → Provision native agents
    ↓
Lead uses vstack tools → Tools call services → Services mutate .vstack/ (authoritative)
    ↓
Tool hook (execute.after) → publishProjections() → .vstack/reports/ updated
    ↓
OpenChamber panel → Reads projections (.vstack/reports/ + .vstack/state/index.json) → Renders UI
```

## Key Interfaces

### Plugin ↔ Persistence
- `VstackPaths` — resolved root paths
- `FileStore` — readJsonFile, writeJsonFile (with revision), locks
- `EventLog` — append-only JSONL

### Plugin ↔ OpenCode
- Tools: `vstack_*` namespace (~7 tools)
- Commands: `/vstack*`
- Skills: via `ctx.skill.transform` (Playbook skills)
- Agents: filesystem provision to `.opencode/agents/`

### Plugin → OpenChamber (Projections Only)
- `.vstack/state/index.json` — dashboard index (active deliveries)
- `.vstack/reports/deliveries/<id>.json` — delivery detail with tasks, agents, evidence
- `.vstack/reports/activity/<id>.json` — activity timeline from event log
- `.vstack/reports/memory-index.json` — searchable memory catalogue
- `.vstack/reports/quality/<id>.json` — check counts by type

## OpenCode API Version
- `@opencode/plugin`: 2.2.0
- `@opencode/schema`: 2.2.0
- **Note:** `ctx.agent.transform` does NOT expose `editor.add()` — agent provisioning uses filesystem

## OpenChamber API Version
- `@openchamber/sdk`: "latest" (build deferred — SDK not accessible)
- Declared engine: `>=1.24.0`
- Typecheck passes, build deferred per plan

## Simplicity Constraints (Enforced)

- Direct services over registries/frameworks/state machines
- Module justified only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- No wrapper layers just to pass deps or mirror directory tree
- ~7 cohesive tools max (status, memory, history, delivery, task, agent, check)
- No generic workflow interpreter, scheduler, deployment platform, policy engine
- No event sourcing — event log is audit record only

## Responsibility Boundaries (Enforced)

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---|---|---|---|
| Principles/roles/skills/workflows | Defines | Makes available | Displays |
| Task/delivery state | Explains methodology | Owns runtime records | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | Enforces 5 minimal rules | Displays gate status |
| Visualization | None | Publishes read model | Owns presentation |