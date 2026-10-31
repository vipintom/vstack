# Architecture

**Last updated:** 2026-11-01 (Phase 0 baseline)

## Current Package Boundaries

### 1. agents-skills (Portable Content)
- **Purpose:** Harness-independent skills, agent definitions, resources
- **Location:** `/agents-skills/`
- **Contents:**
  - `skills/` — 11 skill directories (vstack-architecture, debugging, discovery, documentation, implementation, operations, planning, release, review, testing)
  - `agents/opencode-v2/` — 6 OpenCode-specific agent definitions
  - `resources/` — rubrics, templates, references
- **Dependencies:** None (pure content)
- **Distribution:** Intended for `npx skills add` and manual installation

### 2. opencode/vstack (OpenCode Plugin)
- **Purpose:** Runtime engine for OpenCode — persistence, coordination, enforcement
- **Location:** `/opencode/vstack/`
- **Entry point:** `src/index.ts` (Plugin.define)
- **Key services initialized at startup:**
  - Persistence: file-store, locks, atomic-write, event-log, repository-root, schema-version
  - Runtime: lifecycle-engine, task-service, session-tracker, agent-dispatch, runtime/state
  - Quality: gates, check-discovery, execution-adapter, evidence-ledger, build/test/security/acceptance
  - Reviews: review-orchestrator, findings, resolution, rubrics
  - Release: release-preparation, deployment, rollback, post-release
  - Policy: permissions, approvals, autonomy
  - Recovery: recovery-manager, reconciliation
  - Dashboard: index-generator
  - Skills: skill-loader, agent-installer
- **OpenCode integrations:**
  - `ctx.skill.transform` — registers skills
  - `ctx.tool.transform` — registers 7 tool namespaces
  - `ctx.command.transform` — registers 6 slash commands
  - `ctx.session.hook("context")` — session context injection
  - `ctx.tool.hook("execute.after")` — dashboard refresh
  - `ctx.permission.hook("evaluate")` — approval enforcement
  - `ctx.agent.reload()` — reload agents after install
- **Persistence:** Project-local `.vstack/` (manifest, deliveries, state, history, reports)

### 3. openchamber/vstack-panel (OpenChamber Extension)
- **Purpose:** Read-only visualization of vstack state
- **Location:** `/openchamber/vstack-panel/`
- **Entry points:** `panel/main.ts` (panel), `panel/dashboard.ts` (dashboard page)
- **Data access:** `panel/src/services/api.ts` — reads `.vstack/` files directly
- **UI components:** `panel/src/components/Dashboard.ts`, `render.ts`
- **Capabilities declared:** `files` (broad read/write — currently reads delivery internals directly)
- **Build:** Uses `@openchamber/sdk/scripts/bundle-guest.ts` (currently failing)

## Data Flow (Current)

```
User Request → OpenCode Lead Agent
    ↓
Plugin startup → Initialize all services → Load skills → Install agents
    ↓
Lead uses vstack tools → Tools call services → Services mutate .vstack/
    ↓
Tool hook (execute.after) → refreshRuntimeState → Dashboard index updated
    ↓
OpenChamber panel → Reads .vstack/state/index.json + delivery internals → Renders UI
```

## Target Architecture (Per New Plan)

### Playbook Package (New)
- **Location:** `/playbook/` (to be created)
- **Contents:** principles/, agents/roles/, agents/adapters/, skills/, workflows/, resources/
- **No runtime code** — portable Markdown/YAML only
- **Distribution:** npm package + Skills CLI compatible

### OpenCode Plugin (Refactored)
- **Loads Playbook content** instead of agents-skills
- **Provisions native agents** via filesystem (not `ctx.agent.transform` editor.add)
- **Simplified services:** persistence, memory, deliveries, tasks, agents, quality, history, dashboard, permissions, ~7 tools
- **Removes:** lifecycle-engine, phase profiles, coordinator, scheduler, specialized quality engines, release engine, complex review orchestrator, autonomy modes

### OpenChamber (Refactored)
- **Reads only published projections** (`.vstack/state/index.json`, detail reports)
- **Never reads delivery internals** directly
- **Validates projection version/shape** before render
- **Shows stale/unavailable states** clearly

## Key Interfaces

### Plugin ↔ Persistence
- `VstackPaths` — resolved root paths
- `FileStore` — readJsonFile, writeJsonFile (with revision), locks
- `EventLog` — append-only JSONL

### Plugin ↔ OpenCode
- Tools: `vstack_*` namespace
- Commands: `/vstack*`
- Skills: via `ctx.skill.transform`
- Agents: filesystem provision to `.opencode/agents/`

### Plugin → OpenChamber
- Published: `.vstack/state/index.json` (dashboard projection)
- Published: `.vstack/reports/deliveries/<id>.json`
- Published: `.vstack/reports/activity/*.json`

## OpenCode API Version

- `@opencode/plugin`: 2.2.0
- `@opencode/schema`: 2.2.0
- **Note:** `ctx.agent.transform` does NOT expose `editor.add()` — agent provisioning must use filesystem

## OpenChamber API Version

- `@openchamber/sdk`: "latest" (build fails — SDK not accessible)
- Declared engine: `>=1.24.0`