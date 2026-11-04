# Project Knowledge Base

## Purpose

This directory contains the authoritative engineering documentation for vstack itself — how it is built, the decisions made, the current implementation state, tests that have actually run, and the next useful action. It is distinct from runtime project memory (`.vstack/`) which is a product capability vstack provides to projects using it.

## Update Rules

- **Session start:** Read `README.md`, `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, and relevant architecture/decision pages. Inspect actual repository state.
- **During work:** Update architecture/decision records when material design decisions are made. Record discoveries, deviations, blockers, compatibility findings as they occur.
- **Session end:** Update `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, `WORK-LOG.md`. Record exact test commands and results. Update `KNOWN-ISSUES.md`. State next task + blockers.
- **Never** wait until milestone to write — documentation is part of definition of done for each substantial task.

## Contents

| File | Purpose |
|---|---|
| `CURRENT-STATE.md` | What exists, what works, what is next |
| `ARCHITECTURE.md` | Current package boundaries and data flow |
| `COMPONENT-INVENTORY.md` | Existing modules and reuse/refactor/remove decisions |
| `IMPLEMENTATION-STATUS.md` | Milestones, completed work, outstanding work |
| `TESTING.md` | Test commands, prerequisites, verified results |
| `KNOWN-ISSUES.md` | Confirmed defects, limitations, workarounds |
| `WORK-LOG.md` | Concise chronological implementation log |
| `decisions/` | Architecture decision records (ADRs) |

## Project Status

**v2 Greenfield Implementation — Phase 6 Complete — v2.0.0 Released** (2026-11-01)

- **Phase 0:** Baseline & Knowledge Base ✅ COMPLETE
- **Phase 1:** Playbook Foundation ✅ COMPLETE
- **Phase 2:** Safe Collaboration and Continuity ✅ COMPLETE
- **Phase 3:** Verification Profiles, Skill Quality and Continuous Learning ✅ COMPLETE
- **Phase 4:** OpenCode Runtime v2 Implementation ✅ COMPLETE
- **Phase 5:** OpenChamber v2 Observability ✅ COMPLETE
- **Phase 6:** Cross-harness Release Governance and E2E Validation ✅ COMPLETE

**Test Results:** All core tests passing
- OpenCode Plugin: 103/103 tests PASS, typecheck PASS, build PASS
- OpenChamber Plugin: typecheck PASS, build PASS
- Playbook Validation: 0 errors, 0 warnings

**Git Tags (v2):**
- `phase-0-baseline-v2`
- `phase-1-complete`
- `phase-2-complete`
- `phase-3-complete` / `phase-3-complete-v2`
- `phase-4-complete` / `phase-4-progress`
- `phase-5-complete`
- `phase-6-complete`

**Previous v1 Prototype Tags:** `phase-0-baseline` through `phase-6-complete` (reference only)

---

## NEW INITIATIVE: Playbook 2.0 Content Re-authoring (Phase 0 COMPLETE — 2026-11-02)

**Scope:** Comprehensive re-authoring of ALL Playbook content per new PRD v2.0 Draft 2 (2026-11-02) and Implementation Plan v1.0.

**Key Requirement:** Full rewrite of every active skill (53), every workflow/playbook (18), all principles, roles, adapters, rubrics, templates, references. No grandfathering — previous audit ratings (Strong/Adequate/Complete) are diagnostic input only, not v2 acceptance.

**New Phases (per Implementation Plan v1.0):**
- **Phase 0:** Audit reconciliation and migration baseline ✅ **COMPLETE**
- **Phase 1:** Canonical content architecture and operating core
- **Phase 2:** Full Playbook/workflow re-authoring
- **Phase 3:** Full skill re-authoring and method composition
- **Phase 4:** Continuity, project verification and supporting content
- **Phase 5:** Evaluation system and content governance
- **Phase 6:** Portability, packaging and release

---

## Phase 0 Summary (COMPLETED 2026-11-02)

### Audit Contradictions Resolved
| Contradiction | Resolution |
|---|---|
| Skills: 53 reported vs 51 enumerated | 53 actual; PRD missed `vstack-recall` and `vstack-unstick` |
| Principles: 7 manifest vs 10 in index | 7 file-backed + 3 meta-principles in index only |
| Rubrics: 6 reported vs 7 enumerated | 7 actual; audit summary had typo |
| Tests: 26/26 vs 30/42 | **103/103 PASS** (current state) |
| OpenChamber build: FAIL → PASS | SDK now available |
| Manifest duplicate | **FIXED** — removed duplicate `vstack-ledger` entry |

### Key Deliverables Created
- `docs/migration/baseline.md` — Working baseline preserved at commit 86da1605
- `docs/migration/inventory.md` — Complete filesystem inventory (83+ files)
- `docs/migration/baseline-validation.md` — Test/build contradictions resolved
- `docs/migration/content-migration-ledger.csv` — All content files mapped with dispositions
- `docs/migration/capability-registry.csv` — One row per canonical content item
- `docs/migration/overlap-analysis.md` — 11 clusters, pairwise decisions with evidence
- `docs/migration/content-dependency-graph.md` — Full dependency graph, no prohibited cycles
- `docs/research/skill-pack-reference-catalogue.md` — 7 reference packs, 47 skill mappings, research template

### Overlap Decisions (Evidence-Backed)
| Cluster | Decision |
|---|---|
| Debugging | Retire `vstack-debugging`; keep `vstack-debug`, `vstack-unstick`, `vstack-recovery` |
| Continuity | Merge `vstack-catchup` into `vstack-session-pickup`; unified model |
| Verification | Keep 4 lifecycle skills separate; `vstack-tdd` separate |
| Candidate/Parallel | Keep `vstack-arena`, `vstack-best-of-n`, `vstack-swarm`, `vstack-jury` separate |
| Design/Planning | Keep all 6 with clear sequence |
| Understanding | Retire `vstack-discovery`; keep how/why/explain/recall separate |
| Review | Keep all 4 with hierarchy (rubrics → loop → jury → interrogate) |
| Delivery/PR | Keep all 4 as lifecycle sequence |
| Refactoring | Skill = method, Playbook = lifecycle |
| Visual Work | Keep separate (design audit vs visual parity) |
| Principles/Help | Keep separate (index, skill, discovery) |

### Migration Dispositions
| Disposition | Count | Items |
|---|---:|---|
| REWRITE | ~45 skills + 18 workflows | All active items per PRD mandate |
| MERGE | 1 (catchup→pickup) | Catchup is subroutine of pickup |
| RETIRE | 2 (debugging, discovery) | v1 legacy superseded |
| KEEP SEPARATE | ~41 skills | Distinct triggers/methods/outcomes |
| FIX | 1 (manifest duplicate) | **DONE** — removed duplicate vstack-ledger |

### Phase 0 Exit Gate — ALL PASS ✅
- [x] Baseline working state preserved and unambiguous
- [x] All content files inventoried
- [x] All count/test/build contradictions resolved
- [x] Every existing item has migration disposition and provisional v2 owner/target
- [x] Known overlap clusters analysed with evidence
- [x] Research source catalogue and per-skill research template exist
- [x] **Ready for Phase 1** — Product owner/developer agreement to proceed

---

## Next Phase: Phase 1 — Canonical Content Architecture & Operating Core

**Prerequisites:**
- [ ] Fix manifest.json duplicate vstack-ledger entry ✅ **DONE**
- [ ] Decision on meta-principles (files vs index-only)
- [ ] ADRs for: no grandfathering, external research mandate, capability registry, behavioural evaluation, canonical ownership, migration ledger, adapter validation, no fixed catalogue, progressive disclosure
- [ ] Pin exact commits for all 7 reference packs
- [ ] Begin per-skill research records for core methods

**Phase 1 Work:**
1. Finalize content taxonomy and authoring templates
2. Re-author all principles (7 file-backed + 3 meta)
3. Re-author vstack-mode (full operating sequence per PRD Section 7)
4. Re-author figure-it-out (bespoke workflow design per PRD Section 8)
5. Re-author canonical roles (Lead, Builder, Reviewer per PRD Section 11)
6. Re-author adapters (thin mappings for OpenCode, Codex, Claude Code)
7. Establish operating-core evaluation cases