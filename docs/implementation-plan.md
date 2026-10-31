# vstack Implementation Plan

**Status:** Approved with revisions — ready for Phase 0  
**Version:** 1.0  
**Date:** 2026-10-31

---

## 1. Product Architecture

### Three Packages (fixed boundaries)

| Package | Responsibility | Must Not Contain |
|---|---|---|
| `@vstack/agents-skills` | Portable agents, skills, references | Runtime code, workflow state, CLI, database |
| `@vstack/opencode` | Entire programmatic workflow engine | Duplicate content, OpenChamber UI |
| `@vstack/openchamber` | Read-only dashboard | Workflow mutation, approval actions, execution logic |

---

## 2. Implementation Order

### Phase 0 — Agents and Skills (start now)

**Deliverable:** Installable content package `@vstack/agents-skills`

**Scope:**
- 6 canonical agent roles as portable role skills (single source of truth)
- 10 workflow skills
- OpenCode v2 native agent wrappers (metadata + permissions + skill reference)
- Harness adapters (Claude Code, Codex, generic)
- Verified `npx skills add` installation from actual repository URL
- Compatibility tests: OpenCode, Claude Code, Codex

**Key architectural decision:** Role skills are canonical. Native agents are thin wrappers that reference them.

```
agents-skills/
├── package.json
├── README.md
├── skills/
│   ├── roles/                    # 6 PORTABLE ROLE SKILLS (canonical)
│   │   ├── vstack-role-lead/SKILL.md
│   │   ├── vstack-role-architect/SKILL.md
│   │   ├── vstack-role-developer/SKILL.md
│   │   ├── vstack-role-test-engineer/SKILL.md
│   │   ├── vstack-role-reviewer/SKILL.md
│   │   └── vstack-role-operator/SKILL.md
│   ├── vstack-discovery/SKILL.md
│   ├── vstack-architecture/SKILL.md
│   ├── vstack-planning/SKILL.md
│   ├── vstack-implementation/SKILL.md
│   ├── vstack-debugging/SKILL.md
│   ├── vstack-testing/SKILL.md
│   ├── vstack-review/SKILL.md
│   ├── vstack-documentation/SKILL.md
│   ├── vstack-release/SKILL.md
│   └── vstack-operations/SKILL.md
├── agents/
│   ├── opencode-v2/              # 6 NATIVE WRAPPERS (thin)
│   │   ├── vstack-lead.md
│   │   ├── vstack-architect.md
│   │   ├── vstack-developer.md
│   │   ├── vstack-test-engineer.md
│   │   ├── vstack-reviewer.md
│   │   └── vstack-operator.md
│   └── adapters/
│       ├── claude-code/README.md
│       ├── codex/README.md
│       └── generic/AGENTS.md
└── resources/
    ├── review-rubrics/
    ├── templates/
    └── references/
```

**Phase 0 Acceptance Criteria:**

| Criterion | Expected Result |
|---|---|
| Skill format | Every skill has valid Agent Skills frontmatter (`name`, `description`) |
| Skill discovery | Skills CLI discovers all 16 skills from repository |
| npx installation | `npx skills add <owner>/<repo> --skill '*' -a opencode -a claude-code` works |
| OpenCode compatibility | Skills load in OpenCode v2; 6 native agents recognized |
| Claude Code compatibility | Skills install and work in Claude Code |
| Codex compatibility | Skills install and work in Codex |
| Portable roles | All 6 role skills work without `@vstack/opencode` plugin |
| Native agents | 6 wrappers appear in OpenCode agent list with correct permissions |
| Role consistency | No duplicated, independently maintained persona instructions |
| Permissions | Agent roles have correctly defined capabilities (deny-by-default for reviewers) |
| Documentation | Installation and usage instructions included |

**Do not proceed to Phase 1 until all Phase 0 criteria pass.**

---

### Phase 1A — OpenCode Foundation

**Deliverable:** `@vstack/opencode` plugin with core persistence and lifecycle

**Scope:**
- Plugin entry point registering tools, skills, commands
- State schemas (delivery, task, evidence, event) with JSON Schema
- `.vstack/` file store: atomic writes, cross-process locking, revision-based optimistic concurrency
- Event log (append-only JSONL)
- Lifecycle engine: profiles (bug-fix, feature, refactor, architecture-change, infrastructure-change, documentation, release-only), phase transitions, re-entry
- Migration tool: `.agent-workflow/` → `.vstack/` (repeatable, safe if interrupted, never deletes source)
- Dashboard index: `.vstack/state/index.json` with revision for efficient OpenChamber polling

**Project root rule:** Every workflow operation resolves the target session's project via `ctx.location.project.canonical`, validates the canonical project ID, and uses the matching `.vstack/` root. **No separate `.vstack/` directories in task worktrees.**

**Concurrency:** File-based locks + atomic rename + revision checks. Recovery of stale locks with ownership verification.

**Git tracking policy (explicit):**
- Tracked: Configuration, profiles, requirements, design docs, decisions, review reports, task/evidence summaries
- Ignored: Locks, temporary files, transient logs, execution output, sensitive session details

---

### Phase 1B — Task Engine

**Deliverable:** Task graph, dependencies, assignment, scheduling, worktrees

**Scope:**
- Task service with validated dependency graph (cycle detection, unknown ID rejection)
- Scheduler: ready-task selection, configured parallelism (default 3), work-scope conflict detection
- Worktree integration: OpenCode native APIs, canonical state root enforced, inventory reconciliation
- Agent-task-session mapping with assignment tracking

---

### Phase 1C — Agent Orchestration

**Deliverable:** Six agents, dispatch, fresh context, session tracking, cancellation

**Scope:**
- Agent dispatch via `ctx.session.create` (child sessions, foreground)
- Role-specific permissions: Lead (workflow tools), Architect (read + design artifacts), Developer (scoped edits), Test Engineer (test code + check execution), Reviewer (read-only, no shell/subagent), Operator (release/deploy with approval)
- Session tracker with status, cancellation, orphaned-session reconciliation
- Agent handoff recording

---

### Phase 1D — Quality Workflow

**Deliverable:** Build, test, evidence, Goldfish review, findings, resolution

**Scope:**
- Check discovery: reads `package.json`, CI configs, project metadata (no hard-coded commands)
- Execution adapter: verified process execution with exit code, stdout/stderr capture, timeout, cancellation
- Evidence ledger: structured records with source, command, commit, timestamps, revision reference
- Quality gates: build, lint, typecheck, unit/integration/e2e tests, security, acceptance
- Goldfish review: fresh-context `vstack-reviewer` runs, read-only ruleset, findings with severity
- Finding resolution: remediation tasks, re-review, immutable review history

---

### Phase 1E — Delivery Completion

**Deliverable:** Gates, approvals, reports, completion

**Scope:**
- Phase/delivery gate evaluation (fail closed for mandatory gates)
- Approval policy: protected operations (publish, production deploy, destructive migrations) require explicit human approval via `ctx.permission.assert`
- Workflow reports and summaries
- Completion criteria enforcement

---

### Phase 2 — OpenChamber Dashboard

**Deliverable:** `@vstack/openchamber` read-only extension

**Scope:**
- Manifest: `files` capability only (no `prompt`, `sessions`, `shells`, `model`, `service`, `network`)
- Reads `.vstack/state/index.json` (revision + mtime polling 2–5s)
- Lazy-loads delivery/task/evidence details on navigation
- Views: Overview, Deliveries, Delivery Detail, Task Graph, Agents, Quality, Reviews, Releases, Evidence, Configuration
- Full-screen page (`contributes.page`) as primary UI
- No write operations, no action controls, no session/prompt/shell calls
- Handles missing/malformed/unsupported schema gracefully

**Platform limitation disclosure:** Current `files` capability grants read+write. Extension only calls `readFile`, `listDir`, `stat` and enforces `.vstack/**` path restriction internally.

---

### Phase 3 — Delivery Hardening

**Deliverable:** Concurrency, recovery, approval bypass tests, end-to-end tests

**Scope:**
- Concurrent session testing (multiple agents, shared state)
- Crash/restart recovery (interrupted operations marked uncertain, idempotent resume)
- Approval bypass tests: deployment/publish/destructive migration cannot bypass via direct shell
- Role enforcement: reviewer cannot edit, verifier cannot modify source to pass checks
- Complete end-to-end: feature delivery, bug fix, review cycle

---

### Phase 4 — Release and Operations

**Deliverable:** Publishing, deployment, migrations, rollback, post-release verification

**Scope:**
- Release preparation: version, changelog, artifact validation
- Protected publish/deploy operations
- Deployment adapters with rollback plans
- Smoke tests and post-release health checks
- Operational verification

---

## 3. Tool Namespace (vstack_*)

Logical groupings — exact tool count determined during implementation:

| Namespace | Responsibilities |
|---|---|
| `vstack_delivery` | Create, list, inspect, update deliveries |
| `vstack_workflow` | Start, status, advance, block, resume, finish |
| `vstack_task` | Create, list, assign, update, complete, dependencies |
| `vstack_agent` | Dispatch, monitor, handoff, cancel |
| `vstack_quality` | Execute checks, record evidence, evaluate gates |
| `vstack_review` | Start reviews, record findings, manage resolution |
| `vstack_release` | Prepare, validate, deploy, rollback |

All mutations route through internal application services. Tools, commands, hooks share the same transition logic.

---

## 4. Enforcement Requirements (Tested)

| Protection | Test |
|---|---|
| Deployment approval | Cannot bypass via direct shell command |
| Release publish approval | Cannot bypass gate |
| Destructive migration approval | Cannot bypass |
| Reviewer file edits | Denied by ruleset + tool validation |
| Verifier source modification | Detected/blocked |

---

## 5. Files to Keep (Not Deleted Yet)

| Path | Reason |
|---|---|
| `docs/prd/whale-goldfish-model.md` | Historical architectural context |
| `docs/prd/archive/` | Historical context |
| `opencode/workflow/` | Reference during migration |
| `openchamber/workflow-panel/` | Reference during migration |
| `IMPLEMENTATION_SUMMARY.md` | Historical context |
| `AUDIT_REPORT.md` | Known defects useful for implementation |

Move to archive **after** new packages are working and migration tests pass.

---

## 6. OpenCode Agent Registration (Critical Path)

**Problem:** `ctx.agent.transform` has no `editor.add()` — only `list`, `get`, `default`, `update`, `remove`.

**Solution:** Internal plugin component `agent-installer.ts` that provisions `.opencode/agents/*.md` files.

**Responsibilities:**
- Create missing agent files on explicit install/upgrade command
- Identify vstack-managed files (header comment with version)
- Never silently overwrite user-customized files
- Report version differences
- Support safe updates
- Verify OpenCode recognizes all six agents via `ctx.agent.reload()`

**Do not rely on `editor.update(unknownId)` creating agents** — not documented behavior.

---

## 7. Skills CLI Installation Path

**Repository layout issue:** Skills at `agents-skills/skills/` (nested) may not be auto-discovered.

**Resolution:** Use direct GitHub subdirectory URL:
```
npx skills add https://github.com/<owner>/<repo>/tree/main/agents-skills/skills --skill '*' -a opencode -a claude-code
```

**Phase 0 must include an actual installation test with the real repository URL.**

---

## 8. Definition of Done (Phase 0–1E)

- One complete feature delivery: Request → Discovery → Design → Planning → Implementation → Testing → Independent Review → Resolution → Completion
- Bug-fix profile works end-to-end
- All state in `.vstack/`; OpenChamber reflects changes
- Skills installable and usable without either plugin
- Exactly three packages maintained

---

## 9. Risks Tracked

| Risk | Mitigation |
|---|---|
| OpenCode agent API cannot add definitions | Agent installer provisions `.opencode/agents/` files; validated in Phase 0 |
| npx skills add doesn't discover nested skills | Use direct subdirectory URL; test in Phase 0 |
| Worktrees create divergent `.vstack/` | Canonical root enforced; disable worktrees if unverifiable |
| `files` capability broader than read-only | Extension code enforces read-only; document limitation |
| Plugin API changes | Pin OpenCode v2.2.x; integration test per release |
| Event log growth | Compact derived snapshots; retain events per policy |

---

## 10. Next Action

Begin **Phase 0** — create `agents-skills/` package with:
1. Package structure and `package.json`
2. 6 portable role skills (`skills/roles/`)
3. 10 workflow skills (`skills/`)
4. 6 OpenCode v2 native agent wrappers (`agents/opencode-v2/`)
5. Harness adapters (`agents/adapters/`)
6. Resources
7. Installation verification with actual repository URL

Report Phase 0 completion with all acceptance criteria verified before Phase 1A.