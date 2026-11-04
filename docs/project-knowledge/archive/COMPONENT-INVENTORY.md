# Component Inventory & Reuse Decisions (Playbook 2.0 Content Re-authoring — Phase 0)

**Last updated:** 2026-11-02 (Phase 0 Started)

## Decision Legend
- **TO RE-AUTHOR** — Must be fully rewritten per v2 contract (PRD Sections 9, 10)
- **TO RECONCILE** — Count/content discrepancy to resolve in Phase 0
- **TO MERGE/SPLIT/RETIRE** — Overlap analysis required, evidence-backed decision
- **IMPLEMENTED (v2.0.0 runtime)** — Already complete in runtime, not part of content re-authoring
- **DEFERRED** — Out of v2 core scope; documented for future

---

## Phase 0: Audit Reconciliation (IN PROGRESS)

| Area | Reported Baseline | Required Treatment |
|---|---:|---|
| **Skills** | 53 files reported; PRD name list enumerates 51 | Recount actual files; reconcile missing names, extra files, duplicates; re-author every active skill |
| **Workflows** | 18 | Re-author every active workflow as a Playbook candidate |
| **Principles** | 7 manifest entries; 10 definitions noted in index | Reconcile source of truth; re-author all active principle definitions and index |
| **Canonical roles** | 3 | Re-author Lead, Builder, Reviewer |
| **Harness adapters** | 9 files across OpenCode, Codex, Claude Code | Re-author all active adapters; verify actual host installation/operation |
| **Rubrics** | 6 reported; 7 filenames enumerated | Recount and reconcile; re-author all retained rubrics |
| **Templates** | 4 | Re-author all retained templates |
| **Quick reference** | 1 | Rebuild after catalogue and ownership map stabilise |
| **Verification project template** | 1 | Re-author and test generated output |
| **Validation script** | 1 | Expand structural/integrity validation; keep behavioural evaluation separate |
| **OpenCode plugin source** | 99 TypeScript files reported | **IMPLEMENTED (v2.0.0)** — Treat as integration dependency, not general redesign scope |
| **OpenChamber panel source** | 8 files reported | **IMPLEMENTED (v2.0.0)** — Treat as integration dependency, not general redesign scope |

### Audit Contradictions to Resolve (Phase 0.2)
- Test results: Executive summary 26/26 pass vs detailed inventory 30/42 pass, 12 fail
- OpenChamber build: Initially unavailable, later marked resolved — confirm final state
- Principles: 7 in manifest vs 10 in index table
- Rubrics: 6 in summary vs 7 in named list
- Skills: 53 reported vs 51 enumerated (+ `vstack-recall` mentioned separately)
- Git working tree: Dirty with 58 modified, 100+ untracked files

---

## Phase 1: Playbook Content (v2.0.0 Release — TO RE-AUTHOR)

| Module | Current Status | Required Action |
|---|---|---|
| `playbook/principles/*.md` | 7 principles | **TO RE-AUTHOR** — Reconcile 7 vs 10; full rewrite per PRD Section 6.3 |
| `playbook/agents/roles/*.md` | 3 canonical roles | **TO RE-AUTHOR** — Per PRD Section 11, align with new operating model |
| `playbook/agents/adapters/opencode/*.md` | 3 OpenCode adapters | **TO RE-AUTHOR** — Thin mappings per PRD Section 17.4 |
| `playbook/agents/adapters/codex/*.md` | 3 Codex adapters (exist, untested) | **TO RE-AUTHOR** — Must be tested in actual harness |
| `playbook/agents/adapters/claude-code/*.md` | 3 Claude Code adapters (exist, untested) | **TO RE-AUTHOR** — Must be tested in actual harness |
| `playbook/skills/*/SKILL.md` | 53 skills | **TO RE-AUTHOR** — Every skill per PRD Section 10, with external research |
| `playbook/workflows/*.md` | 18 workflows | **TO RE-AUTHOR** — Every workflow as Playbook per PRD Section 9 |
| `playbook/resources/rubrics/*.md` | 6 or 7 rubrics | **TO RECONCILE** then **TO RE-AUTHOR** |
| `playbook/resources/templates/*.md` | 4 templates | **TO RE-AUTHOR** |
| `playbook/resources/references/*.md` | 1 reference (quick-ref) | **TO REBUILD** after catalogue stabilises |
| `playbook/project-templates/*/` | 1 template (verification-skill) | **TO RE-AUTHOR** — Validate generated output per PRD Section 15 |
| `playbook/manifest.json` | Canonical manifest with contentHash | **TO RECONCILE** — Establish single source of truth |
| `playbook/scripts/validate-content.js` | Validation: 0 errors, 0 warnings | **TO EXTEND** — Add structural/integrity checks per Implementation Plan Section 19 |

---

## Phase 4: OpenCode Plugin (IMPLEMENTED — v2.0.0 Runtime — No Changes Planned)

| Module | Decision | Notes |
|---|---|---|
| `persistence/file-store.ts` | IMPLEMENTED | Atomic read/write, revision concurrency, schema validation |
| `persistence/locks.ts` | IMPLEMENTED | Cross-process locking, stale-lock recovery |
| `persistence/atomic-write.ts` | IMPLEMENTED | Multi-record atomic writes |
| `persistence/event-log.ts` | IMPLEMENTED | Append-only JSONL |
| `persistence/repository-root.ts` | IMPLEMENTED | Main repo/worktree resolution |
| `persistence/schema-version.ts` | IMPLEMENTED | Schema tracking |
| `schemas/types.ts` | IMPLEMENTED | Branded IDs, core entities with revision, v2 types |
| `memory/memory-store.ts` | IMPLEMENTED | CRUD, categories, search, supersede, index |
| `deliveries/delivery-store.ts` | IMPLEMENTED | CRUD, status transitions, phases |
| `tasks/task-store.ts` | IMPLEMENTED | CRUD, dependencies, cycles, ready tasks, contracts |
| `tasks/assignment-store.ts` | IMPLEMENTED | Write-scope conflict detection, validationOutcome |
| `tasks/decision-store.ts` | IMPLEMENTED | Supersession model |
| `tasks/checkpoint-store.ts` | IMPLEMENTED | PROGRESS.md index, revalidation |
| `tasks/lesson-store.ts` | IMPLEMENTED | Lifecycle, promotion |
| `tasks/recovery-store.ts` | IMPLEMENTED | Rounds, assumption probes, changed approach |
| `tasks/verification-index-store.ts` | IMPLEMENTED | Freshness tracking, validation evidence |
| `agents/agent-run-store.ts` | IMPLEMENTED | Dispatch tracking, handoff recording |
| `history/history-service.ts` | IMPLEMENTED | Event querying, stats |
| `quality/check-service.ts` | IMPLEMENTED | Discover, execute, evidence recording with provenance/outcome |
| `quality/execution-adapter.ts` | IMPLEMENTED | Process safety, timeouts, output limits |
| `quality/evidence-ledger.ts` | IMPLEMENTED | Provenance (4 types), outcome (7 types), freshness |
| `quality/review-store.ts` | IMPLEMENTED | Independence states (4), findings, dispositions (5) |
| `enforcement/enforcement-service.ts` | IMPLEMENTED | 6 completion gates, action-scoped approvals with scopeHash |
| `orchestration/agent-dispatch.ts` | IMPLEMENTED | Integrated with agentRunStore, proper handoff |
| `dashboard/projection-publisher.ts` | IMPLEMENTED | Modular projection generation |
| `skills/skill-loader.ts` | IMPLEMENTED | Loads Playbook skills (53 loaded) |
| `agents/agent-installer.ts` | IMPLEMENTED | Filesystem provisioning to `.opencode/agents/` |
| `tools/index.ts` | IMPLEMENTED | Registers 23 tools |
| `index.ts` | IMPLEMENTED | Plugin entry point, initializes all services |

---

## Phase 5: OpenChamber (IMPLEMENTED — v2.0.0 Read-Only — No Changes Planned)

| Module | Decision | Notes |
|---|---|---|
| `panel/src/services/api.ts` | IMPLEMENTED | Projection readers only (no mutation) |
| `panel/src/types/index.ts` | IMPLEMENTED | v2 projection types (DeliveryDetailReport with all v2 fields) |
| `panel/src/components/Dashboard.ts` | IMPLEMENTED | Data-independent rendering |
| `panel/src/components/render.ts` | IMPLEMENTED | Data-independent rendering |
| `panel/main.ts` | IMPLEMENTED | Panel entry point |
| `panel/dashboard.ts` | IMPLEMENTED | Dashboard page |

---

## Known Overlap Groups Requiring Explicit Decisions (Phase 0.4 / Phase 3)

These are required audit investigations from PRD Section 18.8 and Implementation Plan Section 6.3, NOT pre-decided merges:

| Group | Candidate Items | Questions Reviewer Must Answer |
|---|---|---|
| **Debugging** | `vstack-debug`, `vstack-debugging`, `vstack-unstick`, `vstack-recovery` | Which diagnoses defect? Which exits repeated failed assumptions? Which restores/reconciles state? Do `debug` and `debugging` have distinct triggers or only duplicate wording? |
| **Continuity** | `vstack-context-reset`, `vstack-safe-pause`, `vstack-session-pickup`, `vstack-handoff`, `vstack-ledger`, `vstack-catchup`, `vstack-recall` | What is canonical continuity model? Separate pause, pickup, project memory retrieval, decision trail only where trigger/output differs. |
| **Verification** | `vstack-create-verification`, `vstack-maintain-verification`, `vstack-verification-audit`, `vstack-verify-loop`, `vstack-tdd` | Project-specific verification asset lifecycle vs per-change verification vs test-first implementation; one procedure owner per distinct stage. |
| **Candidate/Parallel Work** | `vstack-arena`, `vstack-best-of-n`, `vstack-swarm`, `vstack-jury` | Arena compares candidate artifacts; swarm partitions/races work; jury is only multi-reviewer adjudication if unique outcome. Generic best-of-N may be mode inside arena. |
| **Design/Planning** | `vstack-architect`, `vstack-blueprint`, `vstack-plan-loop`, `vstack-plan-review`, `vstack-interrogate`, `vstack-sharpen` | Distinguish design boundary/contracts, implementation plan creation, plan critique, adversarial review, prompt sharpening. Avoid multiple skills all called before implementation with indistinct responsibilities. |
| **Understanding** | `vstack-how`, `vstack-why`, `vstack-explain`, `vstack-discovery`, `vstack-catchup`, `vstack-recall` | Separate runtime behaviour tracing, historical rationale, user-facing explanation, broad reconnaissance, recent-change pickup, durable memory retrieval. |
| **Review** | `vstack-review-loop`, `vstack-jury`, `vstack-review-rubrics`, `vstack-interrogate` | Separate review orchestration, multi-perspective review, criteria resources, adversarial review; no duplicated review loop. |
| **Delivery/PR** | `vstack-pr`, `vstack-ready`, `vstack-ship`, `vstack-watch-pr` | Separate PR preparation, readiness check, monitoring/babysitting, authorized landing/shipping. Avoid several end-to-end ship skills. |
| **Refactoring** | `vstack-refactor` and refactoring Playbook | Skill owns focused refactoring method only if reusable method distinct from end-to-end task orchestration. Otherwise fold into one canonical owner. |
| **Visual Work** | `vstack-design-audit`, `vstack-visual-parity` | Quality audit of a design vs pixel/behaviour parity between target implementations — confirm using triggers and artifacts. |
| **Principles/Help** | `vstack-principles`, `vstack-help`, principle index/leaf files | Index and discovery are not a second copy of full principles or a second router. |

**Additional findings from audit:**
- Duplicate `vstack-ledger` manifest entry
- Mismatch between principle index and manifest
- Legacy runtime services
- Tracked build artifacts

---

## Required No-Duplication Review Artifacts (Implementation Plan Section 6.4)

Create and maintain:
- `docs/migration/capability-registry.csv` — one row per canonical content item
- `docs/migration/overlap-analysis.md` — pairwise analysis and final decisions for all known groups + newly discovered overlaps
- `docs/migration/content-dependency-graph.md` — canonical owners, references, invokers, consumers
- `docs/migration/decision-records/` — material merge/split/retire decisions with evidence

These are migration/governance artifacts. They must not become another runtime skill catalogue or duplicate the actual method content.

---

## External Skill-Pack Research Programme (Implementation Plan Section 7)

### Reference Pool (Must Inspect Actual Source Files)

| Pack | Primary Value | Good Fit For | Caution |
|---|---|---|---|
| [Cursor pstack](https://github.com/cursor/plugins/tree/main/pstack) | Central mode, task Playbooks, principle index, architecture, arena, swarm, interrogate, bespoke workflow, evidence trail | Router, Playbook design, architecture, candidate comparison, parallel execution, review, continuity | Original is Cursor-specific; do not import Cursor-only commands/APIs/model assumptions |
| [painhardcore/pstack](https://github.com/painhardcore/pstack) | Portable adaptation, cross-harness installation, upstream pinning | Adapters, packaging, portability, portable Playbook structure | Derivative of pstack, not independent methodology for every pattern |
| [obra/superpowers](https://github.com/obra/superpowers) | Explicit software-dev workflows, brainstorming, plans, TDD, debugging, code review | TDD, debugging, planning, implementation increments, review/handoffs | Strong process conventions may be too prescriptive; compare fit |
| [aicodeking/deepseek-stack](https://github.com/aicodeking/deepseek-stack) | Verify loops, unstick, context reset, ledger, review loops, lessons, swarm, portability | Verification, retries, continuity, evidence, learning, fallbacks | Check current revision, real procedures, licence; popularity ≠ efficacy |
| [Anthropic Skills](https://github.com/anthropics/skills) | Skill directory conventions, metadata, progressive disclosure, references | SKILL.md authoring, metadata, assets, portable skill packaging | Many examples are task-domain skills; use for format/authoring patterns |
| [t3dotgg/tstack](https://github.com/t3dotgg/tstack) | Practical personal engineering workflows, council review, PR automation | PR/delivery, review coordination, takeover/delivery boundaries | Some workflows depend on T3 Code, model access, personal conventions |
| [TStack](https://tstack.dev/) | Engineering doctrine, project context, ADRs, PRD/issue decomposition | Project-level context, architecture, TDD, bug diagnosis, PR review | Different project from t3dotgg/tstack; inspect actual repo/docs |

### Research Depth Per Skill (Implementation Plan Section 7.2)
For each skill authoring ticket, require:
- One primary analogue from Cursor pstack when direct/adjacent analogue exists
- One independent analogue from another pack when one exists
- More than one analogue for high-value/high-risk skills (mode, architect, TDD, verification, swarm, review, session pickup, skill authoring)
- Documented `no direct analogue` decision where none exists

### Per-Skill Research Record Template (Implementation Plan Section 7.3)
```markdown
## Research record: <skill-id>
- vstack purpose and unique boundary:
- pstack analogue inspected:
- pstack revision/commit and exact source paths:
- independent pack analogue inspected:
- independent source revision and exact paths:
- other useful references:
- patterns worth adopting:
- patterns to adapt for vstack:
- host/vendor-specific mechanics to reject:
- overlap implications for neighbouring vstack skills:
- licence/attribution notes:
- vstack design decision:
- behaviour/evaluation cases this research suggests:
- author and reviewer:
```

---

## Phase 0 Proof Requirements (All Must Be Resolved)

1. **Baseline protection:** Current dirty/untracked state preserved, exact baseline documented
2. **Inventory reconciliation:** Actual counts from filesystem, not reports
3. **Contradiction resolution:** Test results, build status, principle/rubric/skill counts
4. **Migration ledger:** Every file has entry, disposition, target owner
5. **Capability registry:** One row per canonical content item with job, triggers, ownership
6. **Overlap analysis:** Pairwise decisions for all known clusters with evidence
7. **External reference snapshot:** Pinned commits for all reference packs
8. **Product owner agreement:** Baseline approved before broad rewrites begin