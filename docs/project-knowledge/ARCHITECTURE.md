# Architecture — vstack v0.1.0

---

## Package Boundaries

### 1. Playbook (`vstack-playbook.git`)
- **Purpose:** Harness-independent principles, roles, skills, workflows, resources
- **Contents:** 55 skills, 18 playbooks, 17 principles, 3 roles, 9 adapters, 7 rubrics, 4 templates
- **Dependencies:** None (pure Markdown/JSON)
- **Distribution:** Skills CLI, GitHub, npm tarball

### 2. OpenCode Plugin (`vstack-opencode.git`)
- **Purpose:** Runtime engine — persistence, coordination, enforcement, projections
- **Entry point:** `src/index.ts` (Plugin.define)
- **Key services:** Persistence, Memory, Deliveries, Tasks, Agent Runs, History, Quality, Enforcement, Orchestration, Dashboard, Skills, Agents
- **OpenCode integrations:** 23 tools, skill transform, session hooks, agent provisioning
- **Persistence:** Project-local `.vstack/` (manifest, deliveries, state, history, reports)
- **Tests:** 103/103 PASS (including E2E at `test/` with playbook submodule)

### 3. OpenChamber Extension (`vstack-openchamber.git`)
- **Purpose:** Read-only visualization of vstack state via published projections
- **Components:** Panel (`vstack-workflow`), Page (`vstack-workflow-dashboard`)
- **Data access:** Reads ONLY `.vstack/reports/` and `.vstack/state/index.json`
- **Capabilities:** `files` (read-only projections)
- **Build:** Typecheck PASS, Build PASS

---

## Data Flow

```
User Request → OpenCode Lead Agent
    ↓
Plugin startup → Initialize services → Load Playbook skills (52) → Provision native agents (3)
    ↓
Lead uses vstack tools → Tools call services → Services mutate .vstack/ (authoritative)
    ↓
Tool hook (execute.after) → publishProjections() → .vstack/reports/ updated
    ↓
OpenChamber panel → Reads projections (.vstack/reports/ + .vstack/state/index.json) → Renders UI
```

---

## Key Interfaces

| Layer | Interface |
|-------|-----------|
| Plugin ↔ Persistence | `VstackPaths`, `FileStore` (read/write with revision), `EventLog` (append-only JSONL) |
| Plugin ↔ OpenCode | 23 tools (`vstack_*`), skills via `ctx.skill.transform`, agents via filesystem |
| Plugin → OpenChamber | `.vstack/state/index.json`, `.vstack/reports/deliveries/*.json`, `.vstack/reports/activity/*.json`, `.vstack/reports/memory-index.json`, `.vstack/reports/quality/*.json` |

---

## Responsibility Boundaries (Enforced)

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---------|----------|-----------------|-------------|
| Principles/roles/skills/workflows | **Defines** | Makes available | Displays |
| Task/delivery state | Explains methodology | **Owns runtime records** | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | Enforces minimal rules | Displays gate status |
| Visualization | None | Publishes read model | Owns presentation |

---

## Simplicity Constraints (Enforced)

- Direct services over registries/frameworks/state machines
- Module justified only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- No wrapper layers just to pass deps or mirror directory tree
- ~7 cohesive tools max (extended to 23 for v2 runtime capabilities)
- No generic workflow interpreter, scheduler, deployment platform, policy engine
- No event sourcing — event log is audit record only
- Workflows = Markdown recipes, NOT TypeScript state machines

---

## OpenCode API Version
- `@opencode/plugin`: 2.2.0
- `@opencode/schema`: 2.2.0
- Note: `ctx.agent.transform` does NOT expose `editor.add()` — agent provisioning uses filesystem

---

## Projection Protocol v1

**Producer:** OpenCode plugin (`@vstack/opencode`) publishes projections to `.vstack/`
**Consumer:** OpenChamber extension (`@vstack/openchamber`) reads projections from `.vstack/`
**Contract:** 7 JSON schemas in `contracts/projections/v1/`
- `projection-envelope.schema.json` — Base envelope
- `manifest.schema.json` — Manifest (`.vstack/manifest.json`)
- `dashboard-index.schema.json` — Dashboard Index (`.vstack/state/index.json`)
- `delivery-report.schema.json` — Delivery Report (`.vstack/reports/deliveries/{id}.json`)
- `activity-report.schema.json` — Activity Report (`.vstack/reports/activity/{id}.json`)
- `memory-index.schema.json` — Memory Index (`.vstack/reports/memory-index.json`)
- `quality-summary.schema.json` — Quality Summary (`.vstack/reports/quality/{id}.json`)

**Versioning:** Protocol v1, Schema v1 per projection, RFC 3339 timestamps, `dlv_`/`tsk_`/`agrun_`/`evd_` ID prefixes
