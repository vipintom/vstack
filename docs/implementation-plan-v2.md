# vstack Implementation Plan v2

**Status:** Phase 0 Complete — Ready for Phase 1A Completion  
**Version:** 2.0  
**Date:** 2026-10-31  
**Baseline:** `implementation-plan.md` (v1.0) with audit adjustments

---

## 1. Current State Summary

| Phase | Original Plan | Current State | Adjusted Priority |
|-------|---------------|---------------|-------------------|
| Phase 0 — Agents & Skills | Start now | **COMPLETE** | ✅ Done |
| Phase 1A — OpenCode Foundation | After Phase 0 | 80% | **CRITICAL PATH** |
| Phase 1B — Task Engine | After 1A | 50% | **HIGH** |
| Phase 1C — Agent Orchestration | After 1B | 40% | **HIGH** |
| Phase 1D — Quality Workflow | After 1C | 45% | **MEDIUM** |
| Phase 1E — Delivery Completion | After 1D | 30% | **MEDIUM** |
| Phase 2 — OpenChamber Dashboard | After 1E | 55% | **MEDIUM** |
| Phase 3 — Delivery Hardening | After 2 | 0% | **DEFERRED** |
| Phase 4 — Release & Ops | After 3 | 0% | **DEFERRED** |

---

## 2. Three Packages (Fixed Boundaries - Unchanged)

| Package | Responsibility | Must Not Contain |
|---|---|---|
| `@vstack/agents-skills` | Portable agents, skills, references | Runtime code, workflow state, CLI, database |
| `@vstack/opencode` | Entire programmatic workflow engine | Duplicate content, OpenChamber UI |
| `@vstack/openchamber` | Read-only dashboard | Workflow mutation, approval actions, execution logic |

---

## 3. Phase 0 — Agents & Skills ✅ COMPLETE

**Deliverable:** Installable content package `@vstack/agents-skills`

**Done:**
- 6 portable role skills (`skills/roles/vstack-role-*/SKILL.md`)
- 10 workflow skills (`skills/vstack-*/SKILL.md`)
- 6 OpenCode v2 native agent wrappers (`agents/opencode-v2/vstack-*.md`)
- 3 harness adapters (`agents/adapters/{claude-code,codex,generic}/`)
- Resources: review-rubrics, templates, references
- Skill validation script passes (16 skills)
- Package structure matches specification

**Remaining (must complete before Phase 1):**
- [ ] **Actual installation test** with real GitHub repository URL:
  ```bash
  npx skills add https://github.com/<owner>/<repo>/tree/main/agents-skills/skills --skill '*' -a opencode -a claude-code -a codex
  ```
  Verify all 16 skills discoverable and functional in all three targets.

---

## 4. Phase 1A — OpenCode Foundation (CRITICAL PATH)

**Target:** `@vstack/opencode` plugin with core persistence, lifecycle, and working hooks

### 4.1 Remaining Work

| Task | Status | Effort | Dependencies |
|------|--------|--------|--------------|
| **Dashboard index generation** (`.vstack/state/index.json`) | ✅ Implemented | 1-2 days | event-log, file-store, lifecycle |
| **Skills registration from agents-skills** | ✅ Implemented | 1 day | agents-skills package |
| **Agent definitions provisioning** | ✅ Implemented | 1-2 days | OpenCode agent API |
| **Hook implementations** (session, tool, permission) | ✅ Implemented | 2-3 days | OpenCode API v2.2 |
| **Recovery validation** | Partial | 1 day | recovery-manager.ts |

### 4.2 Technical Details

**Dashboard Index:**
- Update on every state mutation (delivery, task, phase, evidence)
- Contains: `revision`, `updatedAt`, `activeDeliveries[]` with summary fields
- Used by OpenChamber for efficient 2-5s polling

**Agent Provisioning:**
- Internal component `agent-installer.ts` provisions `.opencode/agents/*.md`
- Identifies vstack-managed files via header comment with version
- Never silently overwrites user-customized files
- Reports version differences on upgrade
- Verifies OpenCode recognizes agents via `ctx.agent.reload()`

**Hooks (from index.ts):**
```typescript
// Session hook - inject vstack context into agent sessions
const sessionHook = await ctx.session.hook("context", (event) => {
  if (event.kind === "primary") {
    // Add workflow context
  }
});

// Tool hook - record evidence for vstack tools
const toolHook = await ctx.tool.hook("execute.after", (event) => {
  if (event.tool.startsWith("vstack_") && event.status === "completed") {
    // Record evidence
  }
});

// Permission hook - enforce vstack approval policies
const permissionHook = await ctx.permission.hook("evaluate", (event) => {
  // Check policyManager
});
```

### 4.3 Acceptance Criteria (Phase 1A)

| Criterion | Test |
|-----------|------|
| Dashboard index updates | `index.json` revision increments on each tool execution |
| Skills load | `ctx.skill.list()` shows all 16 vstack skills |
| Agents provisioned | `.opencode/agents/vstack-*.md` created on install/upgrade |
| Hooks fire | Session context injected, evidence recorded, permissions enforced |
| Recovery runs | Startup logs show "Recovery completed: X deliveries recovered" |

---

## 5. Phase 1B — Task Engine (HIGH)

**Target:** Task graph, dependencies, scheduling, worktrees

### 5.1 Remaining Work

| Task | Status | Effort |
|------|--------|--------|
| Work-scope conflict detection | ❌ | 2 days |
| Worktree integration (enable) | ❌ | 3-4 days |
| Agent-task-session mapping completion | Partial | 2 days |
| Scheduler conflict resolution | Partial | 1 day |

### 5.2 Technical Details

**Worktree Integration:**
- Enable `enableWorktrees: true` in agentDispatchConfig
- Use OpenCode native `ctx.worktree.*` APIs
- Canonical `.vstack/` root enforced (no per-worktree state)
- Inventory reconciliation on startup: detect orphaned worktrees, stale locks

**Agent-Task-Session Mapping:**
- Link `Task.assignedSessionId` to `SessionTracker` entries
- Track agent lifecycle: dispatch → running → completed/failed
- Record handoffs between agents

---

## 6. Phase 1C — Agent Orchestration (HIGH)

**Target:** Six agents, dispatch, fresh context, session tracking, cancellation

### 6.1 Remaining Work

| Task | Status | Effort |
|------|--------|--------|
| Orphaned session reconciliation | ❌ | 2 days |
| Agent handoff recording | ❌ | 1 day |
| Session status persistence | Partial | 1 day |

### 6.2 Technical Details

**Orphaned Session Reconciliation:**
- On startup, detect sessions in `dispatched`/`running` without recent heartbeat
- Mark as `cancelled` with reason "orphaned_session_recovered"
- Release any locks held by orphaned sessions

---

## 7. Phase 1D — Quality Workflow (MEDIUM)

**Target:** Build, test, evidence, Goldfish review, findings, resolution

### 7.1 Remaining Work

| Task | Status | Effort |
|------|--------|--------|
| Check discovery (package.json, CI configs) | ❌ | 2 days |
| Execution adapter (verified process spawn) | ❌ | 2 days |
| Evidence ledger (structured records) | ❌ | 2 days |
| Evidence CLI tools | ❌ | 1 day |

### 7.2 Technical Details

**Check Discovery:**
- Read `package.json` scripts, `turbo.json`, `.github/workflows/*.yml`, `Makefile`, `justfile`
- Infer: build, lint, typecheck, test:unit, test:integration, test:e2e, security
- No hard-coded commands

**Execution Adapter:**
- Verified process execution with exit code, stdout/stderr capture, timeout, cancellation
- Bounded output (configurable max bytes)
- Structured result: `{ exitCode, stdout, stderr, timedOut, durationMs }`

**Evidence Ledger:**
- Each check execution creates `Evidence` record with:
  - `source`: "plugin_execution" | "agent_execution" | "manual"
  - `command`, `workingDirectory`, `commitRef`
  - `startedAt`, `completedAt`, `exitCode`
  - `stdoutPath`, `stderrPath` (bounded files)
  - `summary`, `metadata`

---

## 8. Phase 1E — Delivery Completion (MEDIUM)

**Target:** Gates, approvals, reports, completion

### 8.1 Remaining Work

| Task | Status | Effort |
|------|--------|--------|
| Workflow reports and summaries | ❌ | 2 days |
| Completion criteria enforcement | ❌ | 2 days |
| Delivery summary generation | ❌ | 1 day |

### 8.2 Technical Details

**Reports:**
- Per-delivery summary: timeline, phases, tasks, evidence, findings, approvals
- Export formats: JSON, Markdown, HTML
- Stored in `.vstack/reports/`

**Completion Enforcement:**
- All required gates passed
- All approvals granted
- No unresolved critical findings
- Post-release verification configured (if release type)

---

## 9. Phase 2 — OpenChamber Dashboard (MEDIUM)

**Target:** `@vstack/openchamber` read-only extension

### 9.1 Remaining Work

| Task | Status | Effort |
|------|--------|--------|
| **Quality view** implementation | ❌ | 2 days |
| **Reviews view** implementation | ❌ | 2 days |
| **Releases view** implementation | ❌ | 1 day |
| **Evidence view** implementation | ❌ | 1 day |
| Full-screen page (`contributes.page`) | ❌ | 1 day |
| `@openchamber/sdk` dependency | ❌ | 1 day |

### 9.2 Technical Details

**Quality View:** List all checks for delivery/phase, show status, evidence links, pass/fail details

**Reviews View:** Show review runs, findings by severity/lens, resolution status

**Releases View:** Show release candidates, deployment status, rollback history

**Evidence View:** Searchable/filterable list of all evidence records with file viewers

---

## 10. Phase 3-4 — DEFERRED

Postpone until Phases 1A-2 complete and end-to-end tested.

---

## 11. Enforcement Requirements (Tested - Unchanged)

| Protection | Test |
|---|---|
| Deployment approval | Cannot bypass via direct shell command |
| Release publish approval | Cannot bypass gate |
| Destructive migration approval | Cannot bypass |
| Reviewer file edits | Denied by ruleset + tool validation |
| Verifier source modification | Detected/blocked |

---

## 12. Definition of Done (Phase 0-2)

- [ ] Phase 0 installation test passes on all 3 targets
- [ ] One complete feature delivery: Request → Discovery → Design → Planning → Implementation → Testing → Independent Review → Resolution → Completion
- [ ] Bug-fix profile works end-to-end
- [ ] All state in `.vstack/`; OpenChamber reflects changes within 5s
- [ ] Skills installable and usable without either plugin
- [ ] Exactly three packages maintained

---

## 13. Risks Tracked (Updated)

| Risk | Mitigation | Status |
|---|---|---|
| OpenCode agent API cannot add definitions | Agent installer provisions `.opencode/agents/` files | ✅ Done in agents-skills |
| npx skills add doesn't discover nested skills | Use direct subdirectory URL | ⚠️ **Needs actual test** |
| Worktrees create divergent `.vstack/` | Canonical root enforced; disable if unverifiable | ⚠️ Disabled, not tested |
| `files` capability broader than read-only | Extension code enforces read-only | ✅ Code enforces |
| Plugin API changes | Pin OpenCode v2.2.x; integration test per release | ✅ Pinned |
| Event log growth | Compact derived snapshots; retain events per policy | ❌ Not addressed |
| `@openchamber/sdk` unavailable | Vendor or polyfill | ❌ **Blocks Phase 2** |
| No tests anywhere | Add integration tests before Phase 3 | ❌ **Blocks all phases** |

---

## 14. Next Actions (Priority Order)

1. **Run Phase 0 installation test** with actual repository URL
2. **Add `@openchamber/sdk` or vendor** (Phase 2 blocker)
3. **Implement missing OpenChamber views** (Phase 2)
4. **Complete work-scope conflict detection** (Phase 1B)
5. **Enable worktree integration** (Phase 1B)
6. **Complete orphaned session reconciliation** (Phase 1C)
7. **Implement check discovery & execution adapter** (Phase 1D)
8. **Implement evidence ledger** (Phase 1D)
9. **Implement reports & completion enforcement** (Phase 1E)
10. **Add integration tests** (one complete feature delivery)

---

## 15. Legacy Files Removed

The legacy `.agent-workflow/` implementation is no longer supported. No migration tool is planned.

Removed:
- `opencode/vstack/src/migration/`
- `opencode/vstack/src/policy/permissions.ts.bak`
- `opencode/vstack/src/test-permissions.ts`
- `IMPLEMENTATION_SUMMARY.md`
- `AUDIT_REPORT.md`
- `docs/prd/archive/`

---

## 16. Commands Reference

```bash
# Phase 0: Installation test (REQUIRED before Phase 1)
cd agents-skills && npx skills add https://github.com/<owner>/<repo>/tree/main/agents-skills/skills --skill '*' -a opencode -a claude-code -a codex

# Phase 1A: Build and typecheck
cd opencode/vstack && npm run build && npm run typecheck

# Phase 2: OpenChamber panel (when SDK available)
cd openchamber/vstack-panel && npm run build

# Full test cycle (when tests exist)
npm test
```