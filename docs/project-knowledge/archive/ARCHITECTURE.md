# Architecture (v2 Greenfield — v2.0.0 Released + Playbook 2.0 Content Re-authoring Started)

**Last updated:** 2026-11-02 (Phase 0 Started for Content Re-authoring)

## Package Boundaries (v2.0.0 Release — Unchanged)

### 1. playbook/ (Portable Content Package)
- **Purpose:** Harness-independent principles, roles, skills, workflows, resources
- **Location:** `/playbook/`
- **Contents:**
  - `principles/` — 7 engineering principles
  - `agents/roles/` — 3 canonical roles: lead.md, builder.md, reviewer.md
  - `agents/adapters/opencode/` — 3 thin OpenCode agent adapters
  - `skills/` — 53 skills as Markdown with Agent Skills frontmatter
  - `workflows/` — 18 workflow recipes
  - `resources/` — 6 rubrics, 4 templates, 1 reference, 1 project template
  - `manifest.json` — Canonical content manifest with schemaVersion, contentHash, all skills/roles/workflows/resources/adapters
- **Dependencies:** None (pure Markdown/JSON content)
- **Distribution:** Skills CLI compatible; works without any plugin
- **Validation:** `node scripts/validate-content.js` — 0 errors, 0 warnings

### 2. opencode/vstack/ (OpenCode Plugin)
- **Purpose:** Runtime engine for OpenCode — persistence, coordination, enforcement, projections
- **Location:** `/opencode/vstack/`
- **Entry point:** `src/index.ts` (Plugin.define)
- **Key services (implemented):**
  - **Persistence:** file-store (atomic-write, revision), locks, event-log, repository-root, schema-version
  - **Memory:** memory-store (CRUD, categories, search, supersede, index)
  - **Deliveries:** delivery-store (CRUD, status transitions, phases)
  - **Tasks:** task-store (CRUD, dependencies, cycles, ready tasks, contracts)
  - **Agent Runs:** agent-run-store (dispatch tracking, handoff recording)
  - **History:** history-service (event querying, stats)
  - **Quality:** check-service (discover, execute, evidence recording with provenance/outcome)
  - **Enforcement:** enforcement-service (6 completion gates, action-scoped approvals with scopeHash)
  - **Orchestration:** agent-dispatch (integrated with agentRunStore, proper handoff)
  - **Dashboard:** projection-publisher (modular projections: delivery, activity, memory, quality), index-generator
  - **Skills:** skill-loader (loads Playbook skills via findAgentsSkillsRoot)
  - **Agents:** agent-installer (provisions native agents via filesystem to `.opencode/agents/`)
- **OpenCode integrations (implemented):**
  - `ctx.skill.transform` — registers Playbook skills (53 skills loaded)
  - `ctx.tool.transform` — registers 23 tools
  - `ctx.session.hook("context")` — session context injection
  - `ctx.tool.hook("execute.after")` — projection publishing
  - `ctx.agent.reload()` — reload agents after install
- **Persistence:** Project-local `.vstack/` (manifest, deliveries, state, history, reports)
- **Build:** TypeScript strict, ES2022, ESM only — **PASS**
- **Tests:** 26/26 PASS

### 3. openchamber/vstack-panel/ (OpenChamber Extension)
- **Purpose:** Read-only visualization of vstack state via published projections
- **Location:** `/openchamber/vstack-panel/`
- **Entry points:** `panel/main.ts` (panel), `panel/dashboard.ts` (dashboard page)
- **Data access:** `panel/src/services/api.ts` — reads ONLY `.vstack/reports/` and `.vstack/state/index.json`
- **UI components:** `panel/src/components/Dashboard.ts`, `render.ts`
- **Types:** `panel/src/types/index.ts` — v2 projection schemas
- **Capabilities declared:** `files` (read-only projections)
- **Build:** Uses `@openchamber/sdk/scripts/bundle-guest.ts` (typecheck PASS, build FAIL — SDK unavailable)

---

## Data Flow (Implemented in v2.0.0)

```
User Request → OpenCode Lead Agent
    ↓
Plugin startup → Initialize all services → Load Playbook skills (53) → Provision native agents (3)
    ↓
Lead uses vstack tools → Tools call services → Services mutate .vstack/ (authoritative)
    ↓
Tool hook (execute.after) → publishProjections() → .vstack/reports/ updated
    ↓
OpenChamber panel → Reads projections (.vstack/reports/ + .vstack/state/index.json) → Renders UI
```

---

## Key Interfaces (Implemented)

### Plugin ↔ Persistence
- `VstackPaths` — resolved root paths
- `FileStore` — readJsonFile, writeJsonFile (with revision), locks
- `EventLog` — append-only JSONL

### Plugin ↔ OpenCode
- Tools: `vstack_*` namespace (23 tools)
- Skills: via `ctx.skill.transform` (Playbook skills)
- Agents: filesystem provision to `.opencode/agents/`

### Plugin → OpenChamber (Projections Only)
- `.vstack/state/index.json` — dashboard index (active deliveries)
- `.vstack/reports/deliveries/<id>.json` — delivery detail with tasks, agents, evidence, reviewSessions, decisions, recoveries, checkpoints, lessons, verificationIndex
- `.vstack/reports/activity/<id>.json` — activity timeline from event log
- `.vstack/reports/memory-index.json` — searchable memory catalogue
- `.vstack/reports/quality/<id>.json` — check counts by type, review findings

---

## OpenCode API Version (Verified)
- `@opencode/plugin`: 2.2.0
- `@opencode/schema`: 2.2.0
- **Note:** `ctx.agent.transform` does NOT expose `editor.add()` — agent provisioning uses filesystem

## OpenChamber API Version
- `@openchamber/sdk`: latest (unavailable for build)
- Typecheck passes, build deferred

---

## Simplicity Constraints (Enforced)
- Direct services over registries/frameworks/state machines
- Module justified only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- No wrapper layers just to pass deps or mirror directory tree
- ~7 cohesive tools max (status, memory, history, delivery, task, agent, check) — **Extended to 23 tools for v2 runtime capabilities**
- No generic workflow interpreter, scheduler, deployment platform, policy engine
- No event sourcing — event log is audit record only

---

## Responsibility Boundaries (Enforced — PRD Section 6.1)

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---|---|---|---|
| Principles/roles/skills/workflows | **Defines** | Makes available | Displays |
| Task/delivery state | Explains methodology | **Owns runtime records** | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | Enforces minimal rules | Displays gate status |
| Visualization | None | Publishes read model | Owns presentation |

**Rules (PRD Section 2.1):**
1. Skill = procedure; plugin tool = deterministic capability/recording
2. Workflow = Markdown recipe, NOT TypeScript state machine
3. Plugin owns authoritative runtime records; agents use plugin tools for mutations
4. OpenChamber **NEVER** mutates authoritative records
5. Event log = audit record, not full event sourcing
6. Playbook works without plugins; skills document fallbacks
7. Harness wrappers adapt invocation only, not methodology

---

## Playbook 2.0 Content Re-authoring — Architectural Implications

The new PRD v2.0 Draft 2 requires **comprehensive re-authoring of all Playbook content**. This is a CONTENT project, not a runtime architecture change. Key implications:

### Content Architecture Target (PRD Section 6, Implementation Plan Section 5)

| Content Type | Canonical Owner | Responsibilities | Explicitly Does Not Own |
|---|---|---|---|
| Mode/router | `vstack-mode` | Intent framing, primary Playbook selection, risk calibration, checklist creation, coordination, handback | Detailed specialist procedures |
| Playbook | One canonical file per task family | End-to-end sequence, routing points, roles, artifacts, verification, exits | Detailed method owned by specialist skill |
| Skill | One canonical file per specialised method | Triggered activity procedure, decisions, outputs, verification, failure handling | Whole end-to-end delivery lifecycle |
| Principle | One leaf definition per decision rule | Trigger, rule, decision effect, examples | Multi-step procedure owned by Playbook/skill |
| Role | Canonical Lead/Builder/Reviewer files | Authority, accountability, boundaries, handoffs, output expectations | Domain-specific methods |
| Resource | One owner/reference per rubric, template, schema, example | Reusable support material | A second hidden workflow |
| Adapter | Harness-specific thin mapping | Invocation, host capabilities, fallbacks, install/agent format | Canonical procedure or role semantics |

### Proposed Logical Directory Map (Implementation Plan Section 5.1)
```text
playbook/
├── manifest.json
├── principles/
│   ├── index.md
│   └── <canonical-principle-files>.md
├── agents/
│   ├── roles/
│   │   ├── lead.md
│   │   ├── builder.md
│   │   └── reviewer.md
│   └── adapters/
│       ├── opencode/
│       ├── codex/
│       └── claude-code/
├── skills/
│   └── <skill-id>/
│       ├── SKILL.md
│       └── references/
├── workflows/                    # canonical Playbooks; retain existing path if useful
├── resources/
│   ├── rubrics/
│   ├── templates/
│   └── references/
├── project-templates/
│   └── verification-skill/
├── evaluations/
│   ├── scenarios/
│   ├── rubrics/
│   └── baselines/
└── scripts/
    └── validate-content.js
```

### No Parallel Active Catalogue Rule (Implementation Plan Section 2.4)
- Do not create `v2/` copies beside old active files
- Retain canonical paths where practical
- For merges/splits/renames/replacements: update manifest, references, adapters, docs, evaluation fixtures in same migration
- Keep deprecated aliases only where backward compatibility has real user benefit and removal policy

### One Source of Truth (Implementation Plan Section 5.2)
- `manifest.json` must have one clearly defined role: canonical package registry, generated index, or both with defined build direction
- Principle index, help/quick-reference pages, adapter indexes must be generated from or validated against canonical registry
- Each content item gets one stable identifier and one canonical path
- Duplicate IDs, duplicate skill entries, unregistered content, broken links = release-blocking validator errors

---

## v2 Implementation Notes
- No v1 migration logic
- No legacy compatibility layers
- No `legacy_v1` provenance (not applicable)
- Start from clean slate with v2 PRD as authoritative specification
- Canonical manifest at `playbook/manifest.json` with SHA256 content hash
- **NEW:** Playbook 2.0 Content Re-authoring is a separate initiative from v2.0.0 runtime release