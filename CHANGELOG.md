# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **This file ends at 0.1.0.** It is a historical record, not a current claim.
> 0.2.0 is recorded in each component repository's `RELEASE-NOTES.md`. The
> 0.1.0 entries below describe components, counts and packages that no longer
> exist in that form.
>
> **Renamed since 0.1.0.** The 0.1.0 `@vstack/*` package names below are
> superseded: the recorder publishes as `@vipintom/vstack-opencode` and the
> panel as `@vipintom/vstack-openchamber`. No `@vstack/*` name is published.

## [0.1.0] - 2026-11-02

### Added

#### Playbook Package (`@vstack/playbook`)
- **17 Engineering Principles** — Harness Independence First, Procedures Over Vague Instructions, Flexible Workflows Not Mandatory Ceremony, Loops Are First-Class, Small Purposeful Agent Team, Evidence Before Completion, Independent Challenge, Runtime Simplicity, Clear Source of Responsibility, Degrade Gracefully, Understand Before Changing, Route Before Loading, Smallest Complete Change, Challenge Assumptions, Model Domain Explicitly, Respect Boundaries, Verifiable Increments
- **3 Canonical Roles** — Lead, Builder, Reviewer with full responsibility matrices
- **55 Skills** — Complete re-authoring with Agent Skills frontmatter (lifecycle: draft/experimental/stable/deprecated), positive/negative triggers, procedures with Action/Evidence/Decision, verification, failure handling, escalation, routing
- **18 Workflow Recipes** — investigation, architecture-change, infrastructure-change, documentation, skill-maintenance, feature-delivery, bug-fixing, refactoring, performance-investigation, prototype, multi-phase-delivery, autonomous-execution, pr-preparation, pr-monitoring, worktree-cleanup, runtime-forensics, trace-forensics, visual-parity
- **Resources** — 7 Review Rubrics (Architecture, Correctness, Security, Performance, Maintainability, Test Adequacy, Documentation), 4 Templates (Delivery Plan, Review Finding, Handoff, Task), 1 Quick Reference, 1 Project Template (Verification Skill)
- **Cross-Harness Adapters** — 9 adapters (3 roles × 3 harnesses: OpenCode, Codex CLI, Claude Code)
- **Capability Matrix** — Detailed compatibility matrix for all skills/workflows/roles across harnesses
- **Evaluation System** — 300+ Tier 1/2 behavioral evaluation scenarios for all 55 skills
- **Manifest v2** — Canonical content inventory with schemaVersion, playbookVersion, contentHash (SHA256)
- **Validation Script** — Structural + behavioral validation (0 errors, 0 warnings)
- **Install Script** — Cross-harness installation for OpenCode, Codex, Claude Code
- **Distribution Packaging** — npm package, tarball (257KB), zip (444KB), SHA256 checksums

#### OpenCode Plugin (`@vstack/opencode`)
- **Persistence Layer** — File store (atomic writes, revision tracking), cross-process locks with stale recovery, append-only event log (JSONL), worktree-aware repository root resolution, schema version migration tracking
- **Runtime Stores** — Memory (CRUD, categories, search, supersede, index), Delivery (CRUD, status transitions, phases), Task (CRUD, dependencies, cycle detection, ready tasks, contracts), Assignment (contracts, write-scope conflict detection), Decision (supersession model), Checkpoint (PROGRESS.md index), Lesson (lifecycle, promotion), Recovery (rounds, assumption probes), Verification Index (freshness tracking), Agent Run (dispatch tracking, handoff), History (event querying, stats), Quality (check execution, evidence recording), Review (sessions, independence states, findings, dispositions), Enforcement (6 completion gates)
- **Completion Gates (6)** — all_tasks_complete, required_evidence, blocking_findings, approval_required, evidence_freshness, approvals_resolved
- **Action-Scoped Approvals** — scopeHash (SHA256) reuse prevention, expiration support
- **23 Cohesive Tools** — status, memory, history, delivery, task, agent, check, assignment, decision, checkpoint, lesson, recovery, verification, sessionPickup, verificationSkill, skillValidate, verificationMaintain, evaluation, lessonPromotion, review
- **Agent Provisioning** — Filesystem-based native OpenCode agent provisioning to `.opencode/agents/`
- **Projection Publishing** — Auto-publishes to `.vstack/reports/` after every tool execution
- **103 Tests** — All passing (unit + integration)

#### OpenChamber Extension (`@vstack/openchamber`)
- **Projection-Based API** — Reads ONLY published projections from `.vstack/reports/` and `.vstack/state/index.json`
- **Delivery Dashboard** — Active deliveries with task progress
- **Delivery Detail** — Tasks, agents, evidence, review sessions, decisions, recoveries, checkpoints, lessons, verification index
- **Activity Timeline** — Event log with filtering
- **Memory Browser** — Searchable knowledge catalogue
- **Quality View** — Check counts, review findings
- **Staleness Detection** — Revision/timestamp validation
- **Typecheck + Build** — PASS with `@openchamber/sdk`

### Changed
- **Phase 0**: Audit reconciliation — resolved 6 contradictions (skills 53→51, principles 7→17, rubrics 6→7, tests 26/26 vs 30/42, OpenChamber build, dirty working tree)
- **Phase 1**: Canonical content architecture — 11 authoring templates, 17 principles, vstack-mode (9-phase), vstack-figure-it-out (5-phase), 3 roles + 9 adapters
- **Phase 2**: 18/18 Playbooks re-authored to v2 contract, validation passes
- **Phase 3**: 55/55 skills re-authored with external research (Cursor pstack + 6 independent packs), 2 legacy retired (vstack-debugging, vstack-discovery)
- **Phase 4**: Continuity/verification playbooks added (session-pickup, safe-pause, context-reset, ledger, handoff, lessons, create-verification, maintain-verification, verification-audit)
- **Phase 5**: Evaluation system — structural validator enhanced, 55 skills with evaluation scenarios, duplication audit clean
- **Phase 6**: Portability/packaging — capability matrix, Codex/Claude Code adapters validated, standalone acceptance verified, distribution packages created

### Removed
- Legacy skills: `vstack-debugging`, `vstack-discovery` (superseded by dedicated skills)
- Manifest duplicate: `vstack-ledger` fixed

### Fixed
- OpenChamber build — now PASS with `@openchamber/sdk` available
- All validation: 0 errors, 0 warnings
- OpenCode tests: 103/103 PASS

---

## Version History

| Version | Date | Notes |
|---|---|---|
| 0.1.0 | 2026-11-02 | Initial release — all 6 phases complete |