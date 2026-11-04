# Known Issues

**Last updated:** 2026-11-02 (Playbook 2.0 Content Re-authoring — Phase 0 COMPLETE)

---

## Phase 0 Blocking Issues — ALL RESOLVED ✅

### 1. Audit Count Contradictions — RESOLVED
| Contradiction | Resolution |
|---|---|
| **Skills:** 53 reported, 51 enumerated, `vstack-recall` separate | 53 actual files; PRD missed `vstack-recall` and `vstack-unstick` |
| **Principles:** 7 manifest vs 10 in index | 7 file-backed + 3 meta-principles in index only |
| **Rubrics:** 6 reported vs 7 enumerated | 7 actual files; audit summary had typo |
| **Tests:** 26/26 vs 30/42 pass | Current: **103/103 PASS** (audit from earlier state) |
| **OpenChamber build:** FAIL → PASS | SDK now available, build passes |

### 2. Dirty Working Tree — DOCUMENTED & PRESERVED ✅
- 11 modified (knowledge base updates), 100+ untracked (new docs, ADRs, playbook content, build artifacts)
- Baseline preserved at commit 86da1605 — no reset/clean/stash

### 3. Unverified Codex/Claude Code Adapters — DOCUMENTED ✅
- Adapter files exist but not tested in those harnesses
- **Requirement:** Content re-authoring must produce adapters tested in actual harnesses

### 4. Evaluation Suite Export Defect — NOT APPLICABLE ✅
- Current tests: 103/103 PASS (no failing tests)
- `createVerificationIndexStore` exists and is tested

---

## Architecture Constraints (By Design — From v2.0.0 Release)

### 1. Single-Machine/Local-Filesystem Assumption
- No multi-host coordination
- `.vstack/` state not shared across machines

### 2. No Event Compaction/Replay
- History grows unbounded in `.vstack/state/events.jsonl`
- No retention policy or compaction in v2 core

### 3. OpenChamber Polling (Not Real-Time)
- Dashboard refreshes at interval (not push-based)
- No WebSocket/SSE support in v2 core

### 4. Enforcement Bounded by Host Permission API
- Approval recording may be stub only
- Bypass possible via shell commands

### 5. No Generic Workflow Engine
- Workflows are Markdown recipes only (in Playbook)
- No TypeScript state machine or scheduler

### 6. No Scheduler/Priority Queue
- Agent dispatch is immediate, not queued
- No priority-based execution ordering

### 7. No Deployment Platform
- Release/deployment modules deferred
- No rollback automation in v2 core

---

## Functional Gaps (v2 Core Scope — From v2.0.0 Release)

### 8. Memory Curation Manual
- No auto-promotion from history to memory
- No decay/archive policies in v2 core

### 9. Cross-Harness Portability Validation
- Playbook validated for OpenCode
- Codex, Claude Code adapters not implemented (marked unsupported in manifest)
- **NEW:** Content re-authoring must produce adapters tested in actual harnesses

---

## Test Coverage Gaps (v2 Core Scope — From v2.0.0 Release)

### 10. No OpenChamber Integration Tests
- No UI/integration tests for OpenChamber panel

### 11. No Concurrent Session Tests
- Multi-user/multi-session behavior unvalidated

### 12. No Migration Tests
- Not applicable (greenfield — no v1 migration)

---

## Resolved in v2.0.0 Release (Reference Only)
- Evidence TypeScript error (added `revision` field)
- Delivery ID prefix inconsistency (unified to `dlv_`)
- Missing directory creation in stores
- OpenChamber SDK build: Now PASS (was deferred)

---

## Known Limitations in v2.0.0 Release (Carried Forward)

### 1. OpenChamber SDK — NOW AVAILABLE ✅
- **Impact:** Build now passes
- **Status:** Resolved

### 2. Codex/Claude Code Adapters Not Implemented
- **Impact:** Only OpenCode adapter tested; others marked unsupported
- **NEW REQUIREMENT:** Content re-authoring must produce tested adapters for all three harnesses

### 3. No Token Cost Budget
- **Impact:** Routing learning uses vstack persistence; no budget enforcement
- **Status:** Not in v2 scope

### 4. Project-Specific Skills in Project, Not Playbook
- **Impact:** Projects must create their own verification skills
- **Status:** By design per ADR-0010

### 5. Approval Expiry Not Enforced in Runtime
- **Impact:** Approval records support `expiresAt` but enforcement service does not auto-expire
- **Status:** Documented limitation

### 6. Worktree Strategy Limited to opencode-native
- **Impact:** Configuration only supports opencode-native strategy
- **Status:** By design

### 7. Jury Procedure Is Playbook Skill Only
- **Impact:** No runtime jury orchestration
- **Status:** By design — jury is a review method, not runtime

### 8. Extended Execution Overlay Is Methodology, Not Runtime State Machine
- **Impact:** Requires manual checkpoint creation
- **Status:** By design — workflows are Markdown recipes

---

## New Issues for Playbook 2.0 Content Re-authoring

### 9. No Grandfathering — Full Re-authoring Required
- **Impact:** All 53 skills, 18 workflows, 7/10 principles, 3 roles, 9 adapters, 7 rubrics, 4 templates must be rewritten
- **Risk:** Scope creep, incomplete rewrites, cosmetic-only changes passing as complete
- **Mitigation:** Implementation Plan mandates external research per skill, overlap analysis, behavioural evaluation, independent review — no exceptions for prior Strong/Adequate/Complete ratings

### 10. Overlap Resolution Required Before Authoring
- **Impact:** 11 known overlap groups must have evidence-backed decisions
- **Risk:** Duplicate procedures, contradictory triggers, context bloat
- **Mitigation:** Capability registry and pairwise overlap review mandatory before drafting

### 11. External Research Mandatory Per Skill
- **Impact:** Every skill requires pstack + independent pack research with pinned commits
- **Risk:** Superficial research, copy/paste from external sources, licence issues
- **Mitigation:** Per-skill research record template, synthesis not copying, licence check

### 12. Evaluation Must Be Behavioural, Not Just Structural
- **Impact:** Structural validation ≠ behavioural quality
- **Risk:** Files pass validator but procedures don't improve agent outcomes
- **Mitigation:** 12 minimum PRD scenarios + positive/negative trigger cases per skill + procedure-fidelity cases per Playbook

### 13. No Fixed Catalogue Target
- **Impact:** Final skill/playbook count determined by distinct user value, not preserving 53/18
- **Risk:** Keeping redundant skills to hit count, or cutting useful ones to reduce count
- **Mitigation:** Merge/keep/split based on trigger/method/output/outcome distinctness

---

## Resolved in Phase 0 ✅

| Issue | Resolution | Evidence |
|---|---|---|
| Skill count contradiction (53 vs 51) | 53 actual; PRD missed 2 | `docs/migration/inventory.md` |
| Principle count (7 vs 10) | 7 files + 3 meta in index | `docs/migration/baseline-validation.md` |
| Rubric count (6 vs 7) | 7 actual; audit typo | `docs/migration/baseline-validation.md` |
| Test count (26/26 vs 30/42) | 103/103 PASS current | `pnpm test` output |
| OpenChamber build FAIL | SDK available, build PASS | `pnpm build` output |
| Manifest duplicate vstack-ledger | **FIXED** — removed duplicate | `playbook/manifest.json`, validation PASS |
| Overlap decisions | 11 clusters, pairwise | `docs/migration/overlap-analysis.md` |
| Capability registry | One row per item | `docs/migration/capability-registry.csv` |
| Dependency graph | No prohibited cycles | `docs/migration/content-dependency-graph.md` |
| External references | 7 packs, 47 mappings | `docs/research/skill-pack-reference-catalogue.md` |

---

## Risk Register (From Implementation Plan Section 24)

| Risk | Consequence | Required Mitigation |
|---|---|---|
| Prior Strong/Complete ratings treated as approval | Legacy method survives | No grandfathering clause; migration ledger and final audit explicitly verify full rewrites |
| Only pstack README consulted | Superficial research | Per-skill research record requires actual `SKILL.md`/procedure sources and pinned revisions |
| External research becomes copy/paste | Copyright/portability/originality problems | Synthesize patterns, write original instructions, check licences, reject host-specific deps |
| Skills authored without scope map | Duplicate triggers and procedures | Capability registry and pairwise overlap review before drafting |
| Overlap review postponed | Expensive rewrites, catalogue confusion | Resolve boundaries first; canonical owner before dependent skills drafted |
| Playbooks duplicate skill procedures | Drift and contradictory instructions | Playbook owns orchestration; skill owns method; links instead of copied procedures |
| Skill templates create artificial bloat | Long files without useful behaviour | Allow justified N/A; evaluate actual execution, not heading count |
| Catalogue count drives decisions | Useful methods lost or redundant files retained | No fixed count; merge/keep based on trigger, method, output, outcome |
| Central mode becomes mega-skill | High context and poor modularity | Compact routing, progressive disclosure, one primary Playbook |
| Excessive mandatory process | Trivial tasks slowed down | Rigor calibrated to risk, reversibility, uncertainty; negative trigger tests |
| Skills don't compose with Playbooks | Good standalone docs but poor operating method | Direct and playbook-invoked testing for every relevant skill |
| Agent self-report accepted | False completion | Inspect artifacts and source evidence; explicit inconclusive/block states |
| Parallel drafting causes conflicts | Inconsistent ownership, repeated procedures | One writer per file, central registry owner, dependency-aware batches |
| Dirty baseline overwritten | Valuable user work lost | Non-destructive Phase 0; preserve current tree, controlled branch/worktree only after reconciliation |
| Validator mistaken for quality proof | Structurally valid weak procedures ship | Separate structural checks, overlap review, behaviour evaluation |
| One aggregate evaluation score hides critical defects | Unsafe content promoted | Criterion-level results; critical safety/evidence failures block |
| Adapter files mistaken for host support | False portability claims | Exact harness versions, install/invocation/fallback tests, real-task demonstrations |
| Runtime scope expands during content project | Delays and architecture churn | Narrow integration-only changes; separate runtime issues and approvals |