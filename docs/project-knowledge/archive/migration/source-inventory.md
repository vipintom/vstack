# Source Inventory — vstack Repository Split Baseline

**Date:** 2026-11-02  
**Source Repository:** `/home/ubuntu/code/personal/vstack` (local only, no remote)  
**Baseline Commit:** `86da1605` (HEAD, master, tagged as v0.1.0, phase-6-complete)

---

## Git Baseline

### Repository State
- **Branch:** master (only branch)
- **Remote:** None (local-only repository)
- **Tags:** 11 tags present
  - `phase-0-baseline` → `860c96ca`
  - `phase-0-baseline-v2` → `86da1605`
  - `phase-1-complete` → `86da1605`
  - `phase-2-complete` → `f75ef199`
  - `phase-3-complete` → `f843914c`
  - `phase-3-complete-v2` → `dff15b18`
  - `phase-4-complete` → `190459f3`
  - `phase-4-progress` → `5d20e357`
  - `phase-5-complete` → `14ee1cae`
  - `phase-6-complete` → `e95f1663`
  - `v0.1.0` → `86da1605` (HEAD)

### Git Bundle Backup
- **Path:** `/home/ubuntu/code/personal/vstack-pre-split.bundle`
- **Verified:** Clone from bundle successful, all refs and history preserved
- **Size:** ~24,350 files in working tree

### Working Tree Status
- **Modified files:** 103 tracked files modified
- **Untracked files:** 178+ (includes distribution packages, new docs, ADRs, research)
- **Deleted files:** 2 skills (`vstack-debugging`, `vstack-discovery`)

---

## Package Inventory

### Root Workspace
| File | Purpose |
|------|---------|
| `package.json` | pnpm workspace root, version 0.1.0, private |
| `pnpm-workspace.yaml` | Workspace packages: `agents-skills`, `opencode/*`, `openchamber/*` |
| `pnpm-lock.yaml` | Lockfile (present, not in git) |

### 1. Playbook Package (`/playbook/`)
| Property | Value |
|----------|-------|
| **Package name** | `@vstack/playbook` |
| **Version** | 0.1.0 |
| **Type** | module |
| **Main** | index.js |
| **Distribution** | GitHub + Skills CLI (npm publishConfig present but not required) |
| **Key scripts** | `validate`, `test:install`, `install:playbook`, `install:opencode`, `install:codex`, `install:claude-code`, `pack`, `dist:tarball`, `dist:zip`, `dist:package` |
| **Dependencies** | None (pure content) |
| **DevDependencies** | None declared |

**Contents:**
- `principles/` — 17 principle leaf files + index
- `agents/roles/` — 3 roles (lead, builder, reviewer)
- `agents/adapters/` — 9 adapters (3 harnesses × 3 roles): opencode/, claude-code/, codex/
- `skills/` — 52 skills (2 legacy retired: vstack-debugging, vstack-discovery)
- `workflows/` — 18 playbooks
- `resources/` — rubrics, templates, references, project templates
- `evaluations/` — evaluation scenarios
- `scripts/` — validate-content.js, install-playbook.js, package-dist.js
- `manifest.json` — Canonical content manifest
- `docs/capability-matrix.md` — 52 skills × 3 harnesses compatibility
- Distribution artifacts: `vstack-playbook-v2.0.0.tar.gz` (.sha256), `vstack-playbook-v2.0.0.zip` (.sha256)

### 2. OpenCode Runtime (`/opencode/vstack/`)
| Property | Value |
|----------|-------|
| **Package name** | `@vstack/opencode` |
| **Version** | 0.1.0 |
| **Type** | module |
| **Exports** | `./dist/index.js` |
| **Files** | `dist/` |
| **Key scripts** | `build` (tsc), `typecheck`, `lint`, `test` (vitest) |
| **Dependencies** | `@opencode/plugin@2.2.0`, `@opencode/schema@2.2.0`, `glob@^14.0.3`, `uuid@^10.0.0` |
| **DevDependencies** | `@types/node@^22`, `@types/uuid@^10`, `eslint@^9`, `typescript@^5.6`, `vitest@^2.1` |
| **Engines** | node >=20 |

**Source Structure (`src/`):**
- `index.ts` — Plugin entry point (23 tools, 7 services)
- `tools/` — 23 tool implementations
- `hooks/` — Lifecycle hooks
- `delivery/` — Delivery/task/workflow management
- `workflows/` — Workflow execution
- `enforcement/` — Enforcement service, gates
- `memory/` — Memory/reasoning features
- `projections/` — Projection generation (delivery-reports, activity-reports, memory-reports, quality-reports)
- `persistence/` — file-store, event-log, repository-root
- `schemas/types.ts` — Core domain types (788 lines)
- `skills/` — Skill loading, validation, verification
- `tasks/` — Task, checkpoint, decision, lesson, recovery, verification stores
- `quality/` — Check service, evidence ledger, review store, security, test
- `util/` — Utility functions

**Tests:** 14 test files, 103 tests passing

### 3. OpenChamber Extension (`/openchamber/vstack-panel/`)
| Property | Value |
|----------|-------|
| **Package name** | `@vstack/openchamber` |
| **Version** | 0.1.0 |
| **Type** | module |
| **OpenChamber Manifest** | apiVersion: 1, engine: openchamber >=1.24.0, panel + page contributions, capabilities: ["files"] |
| **Key scripts** | `build` (bun bundle-guest), `dev`, `typecheck` |
| **DevDependencies** | `@openchamber/sdk@latest`, `@types/bun@latest`, `typescript@^5.6` |

**Source Structure:**
- `panel/` — Built assets (index.html, main.js, dashboard.js)
- `panel/src/` — TypeScript source (main.ts, dashboard.ts, components/, services/, types/)
- `panel/src/types/index.ts` — Type definitions for projections
- `panel/src/services/api.ts` — Reads .vstack/ projections via host API

**Distribution:** Git URL or built ZIP through OpenChamber extension manager

---

## Cross-Package Dependencies

### Workspace Dependencies
- **None in package.json files** — all packages declare explicit external dependencies only
- **pnpm workspace** used only for build orchestration (`pnpm --filter '*' run build`)

### Source Code Cross-References

| From | To | Type | Resolution Needed |
|------|-----|------|-------------------|
| `opencode/vstack/src/skills/skill-loader.ts` | `playbook/` | Path resolution | Configurable playbook root path; falls back to `../../playbook` relative to plugin |
| `opencode/vstack/src/skills/skill-validator.ts` | `playbook/` | Path resolution | Configurable playbook root; validates skills, workflows, roles |
| `opencode/vstack/src/tools/skill-validate-tools.ts` | `playbook/` | Path resolution | Tool parameter `playbookRoot`, defaults to `../../playbook` |
| `opencode/vstack/src/skills/verification-skill-generator.ts` | `playbook/project-templates/` | Template import | Hardcoded relative path `../../../playbook/project-templates/verification-skill/SKILL.md.hbs` |
| `opencode/vstack/test/*.test.ts` | `playbook/`, `openchamber/` | Test fixtures | Hardcoded absolute paths to source repo |

### OpenChamber → OpenCode (Projection Contract Only)
- OpenChamber reads `.vstack/` files via OpenChamber host `readFile`/`listDir` APIs
- No direct code imports — integration is through documented filesystem contract
- Projection paths: `.vstack/manifest.json`, `.vstack/state/index.json`, `.vstack/reports/`, `.vstack/deliveries/`

---

## Baseline Test Results

### Playbook Validation
```bash
cd playbook && pnpm validate
```
**Result:** ✅ PASSED — 0 errors, 0 warnings
- Skills: 0 errors, 0 warnings
- Workflows: 0 errors, 0 warnings
- Roles: 0 errors, 0 warnings
- References: 0 errors, 0 warnings
- Duplication Audit: 0 errors, 0 warnings

### OpenCode Build & Tests
```bash
cd opencode/vstack && pnpm build && pnpm test
```
**Result:** ✅ PASSED
- TypeScript compilation: SUCCESS
- Tests: 14 test files, 103 tests PASSED
- Duration: ~2.3s

### OpenChamber Build
```bash
cd openchamber/vstack-panel && pnpm build
```
**Result:** ✅ PASSED
- Bundle generation: SUCCESS (main.js, dashboard.js)

### Root Workspace Tests
```bash
pnpm test
```
**Result:** ✅ PASSED — All 3 workspace projects, 103 OpenCode tests PASSED

---

## Projection Schema Inventory (Current Implementation)

Based on `opencode/vstack/src/schemas/types.ts` and projection generators:

| Projection Family | Producer | Path Pattern | Key Entities |
|-------------------|----------|--------------|--------------|
| Manifest | Runtime | `.vstack/manifest.json` | Manifest (schemaVersion, vstackVersion, contentVersion, projectId, timestamps) |
| State Index | Runtime | `.vstack/state/index.json` | DashboardIndex (schemaVersion, revision, updatedAt, activeDeliveries[]) |
| Delivery Reports | Runtime | `.vstack/reports/deliveries/*.json` | Delivery, PhaseRun, GateResult |
| Activity Reports | Runtime | `.vstack/reports/activity/*.json` | Event log, agent runs |
| Memory Reports | Runtime | `.vstack/reports/memory-index.json` | Memory summaries |
| Quality Reports | Runtime | `.vstack/reports/quality/*.json` | Evidence, ReviewRun, Finding, Check results |
| Deliveries (detail) | Runtime | `.vstack/deliveries/{id}/delivery.json` | Full Delivery + nested PhaseRun, Task, AgentRun, Evidence, Review, Finding, Approval |

**Protocol Version:** Implicit v1 (schemaVersion: 1 on all entities)

---

## Known Issues / Outstanding Items

1. **Working tree dirty** — 103 modified + 178+ untracked files not committed
2. **No Git remote** — Repository is local-only; GitHub repositories need to be created
3. **Hardcoded paths in tests** — OpenCode tests reference absolute paths in source repo
4. **Template import path** — `verification-skill-generator.ts` uses `../../../playbook/...` relative path
5. **npm scope `@vstack`** — Ownership not verified; publishConfig present in all packages
6. **OpenChamber SDK** — Uses `latest` version; should pin for reproducibility

---

## Exit Criteria Status

| Criterion | Status |
|-----------|--------|
| Working tree clean or changes accounted for | ⚠️ Dirty (documented above) |
| Package boundaries confirmed | ✅ 3 packages identified |
| Cross-package dependencies listed | ✅ Documented above |
| Baseline commands recorded | ✅ Recorded above |
| Known failures separated from migration | ✅ No pre-existing failures |
| Git bundle verified | ✅ Clone from bundle successful |
| Sanitized projection fixtures captured | ⚠️ Only minimal .vstack/ exists; test fixtures to be generated in Phase 1 |