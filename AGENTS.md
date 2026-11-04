# AGENTS.md — vstack Agent Guidance

This file provides guidance for AI agents working on the vstack repository. Follow these instructions when making changes.

## Project Overview

vstack is an engineering playbook and agent workflow ecosystem. The **Playbook 2.0 content / v0.1.0 release is complete** (2026-11-02). The **repository split is complete** — vstack is now 4 independent GitHub repositories.

### Current State (Playbook 2.0 / v0.1.0)

| Component | Status | Key Metrics |
|---|---|---|
| **Playbook** | ✅ Complete | 55 skills, 17 principles, 18 playbooks, 3 roles, 9 adapters, 7 rubrics |
| **OpenCode Plugin** | ✅ Complete | 23 tools, 7 services, 103/103 tests pass |
| **OpenChamber Extension** | ✅ Complete | Dashboard + panel, reads `.vstack/` projections |

**All validation passes:** 0 errors, 0 warnings. TypeScript typecheck PASS. Build PASS. Distribution packages created.

---

## Repository Structure (Post-Split)

This repository (`vstack`) is the **umbrella/meta repository** containing product identity, architecture, shared contracts, compatibility matrix, integrated release metadata, and project knowledge base.

The three component repositories are now independent:

| Repository | Role | Distribution | Location |
|---|---|---|---|
| `vstack` | Umbrella/meta repo — product identity, architecture, shared contracts, compatibility matrix, integrated release metadata | GitHub | `github.com/vipintom/vstack` |
| `vstack-playbook` | Portable skills & engineering playbook | npm `@vipintom/vstack` + Skills CLI | `github.com/vipintom/vstack-playbook` |
| `vstack-opencode` | OpenCode runtime plugin | npm `@vipintom/vstack-opencode` | `github.com/vipintom/vstack-opencode` |
| `vstack-openchamber` | OpenChamber visualization extension | Git URL or built ZIP | `github.com/vipintom/vstack-openchamber` |

**Key principle:** Components communicate through documented interfaces (versioned projection schemas in umbrella), not direct npm dependencies.

---

## Mandatory Working Practice

**Maintain the project knowledge base** at `docs/project-knowledge/` continuously:

- **Session start:** Read `README.md`, `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, relevant architecture/decision pages. Inspect actual repo state.
- **During work:** Update architecture/decision records for material decisions. Record discoveries, blockers, compatibility findings.
- **Session end:** Update `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, `WORK-LOG.md`. Record exact test commands/results. Update `KNOWN-ISSUES.md`. State next task + blockers.
- **Never** defer documentation — it's part of definition of done.

---

## Responsibility Boundaries (Enforce Strictly)

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---|---|---|---|
| Principles/roles/skills/workflows | **Defines** | Makes available | Displays |
| Task/delivery state | Explains methodology | **Owns runtime records** | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | Enforces small set | Displays gate status |
| Visualization | None | Publishes read model | Owns presentation |

**Rules:**
1. Skill = procedure; plugin tool = deterministic capability/recording
2. Workflow = Markdown recipe, NOT TypeScript state machine
3. Plugin owns authoritative runtime records; agents use plugin tools for mutations
4. OpenChamber **NEVER** mutates authoritative records
5. Event log = audit record, not full event sourcing
6. Playbook works without plugins; skills document fallbacks
7. Harness wrappers adapt invocation only, not methodology

---

## Simplicity Constraints

- Direct services over registries/frameworks/state machines
- Module justified only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- No wrapper layers just to pass deps or mirror directory tree
- ~7 cohesive tools max (status, memory, history, delivery, task, agent, check) — **extended to 23 for v2 runtime capabilities**
- No generic workflow interpreter, scheduler, deployment platform, policy engine
- No event sourcing — event log is audit record only

---

## Package Conventions

- TypeScript strict, ES2022, ESM only (`"type": "module"`)
- No default exports in source; named exports, default only in entry points
- Tests co-located: `*.test.ts` next to source
- Plugin entry point: `index.ts` re-exports all public API

---

## Current Phase

**Repository Split: COMPLETE (Phase 10 done, all 4 repositories independent + CI/CD + docs)**

All 10 phases of the repository split complete:
- Phase 0: Source audit, inventory & baseline capture ✅
- Phase 1: Define projection contract ✅
- Phase 2: Prepare and extract three component repositories ✅
- Phase 3: Make each component build/operate independently ✅
- Phase 4: Implement Playbook repository ✅
- Phase 5: Implement OpenCode runtime repository ✅
- Phase 6: Implement OpenChamber extension repository ✅
- Phase 7: Convert original repository to umbrella ✅
- Phase 8: Compatibility matrix & integrated release metadata ✅
- Phase 9: CI, Release Automation & Supply-Chain Controls ✅
- Phase 10: Documentation, Naming & User-Facing Distribution ✅

**Next initiative (if approved):** E2E integration testing (Phase 11), first independent releases (Phase 12).

---

## Key Files to Reference (Umbrella Repository)

- `docs/vstack-revised-structure-prd.md` — Product architecture for 4-repo split
- `docs/vstack-structure-implementation-plan.md` — Implementation plan for repo split
- `docs/projection-protocol.md` — Projection protocol v1 (canonical contract documentation)
- `contracts/projections/v1/` — Canonical JSON Schema definitions (authority for projection contract)
- `contracts/validate-contracts.js` — Contract validation script
- `compatibility/matrix.yaml` — Machine-readable compatibility matrix (schema v1)
- `compatibility/integrated-release.json` — Integrated release manifest
- `compatibility/integrated-release.schema.json` — Manifest JSON Schema
- `compatibility/validate-compatibility.js` — Compatibility validator
- `docs/project-knowledge/` — Current state, architecture, inventory, decisions
- `docs/capability-matrix.md` — 55 skills × 3 harnesses compatibility

### Component Repository References (External)

| Repository | Key Files |
|---|---|
| `vstack-playbook` | `manifest.json`, `scripts/validate-content.js`, `skills/`, `workflows/`, `principles/` |
| `vstack-opencode` | `src/index.ts`, `src/schemas/types.ts`, `src/persistence/file-store.ts`, `test/` |
| `vstack-openchamber` | `panel/src/main.ts`, `panel/src/services/api.ts`, `panel/dashboard.ts` |

---

## Testing Requirements

- Run `pnpm test` in package dir before claiming changes work
- Record: date, env, exact command, pass/fail, output, test type
- Build success ≠ workflow works — need E2E scenarios with evidence
- No test reported as passing unless actually executed

**Current baseline (v2.0.0):**
- Playbook validation: 0 errors, 0 warnings
- OpenCode tests: 103/103 PASS
- TypeScript typecheck: PASS
- Build (OpenCode + OpenChamber): PASS

---

## Security & Safety

- Validate paths; keep mutations inside project data root
- Bound all process timeouts and output capture
- No unsafe shell interpolation
- Explicit auth for destructive/external operations
- No secrets/credentials in memory/history
- Distinguish: approval requested ≠ recorded ≠ granted ≠ executed

---

## Git Practice

- Preserve known-good baseline via tag/branch before major changes
- Don't delete historical source — mark deprecated/obsolete first
- Small, reversible commits with clear intent
- **For repo split:** Use fresh mirror clones + `git filter-repo --subdirectory-filter`; verify before push; keep original monorepo intact until all 3 extracted repos validate

---

## Execution Discipline

### Vertical slice before broad refactor
After Phase 0, select a narrow representative path and complete it through the new model before expanding.

### Keep changes reviewable
- Avoid mixing skill rewrites, schema changes and UI refactors in one large change
- Add schemas before writers and readers depend on them
- Build projections from stable records before adding complex UI views
- Complete one workflow scenario before adding broad new runtime automation

### Use existing capabilities before adding new ones
Before implementing a new service/tool, answer:
1. Can the Playbook procedure use existing harness tools without a new plugin capability?
2. Does the runtime need durable state, direct observation or deterministic enforcement?
3. Is the proposed capability testable end-to-end?
4. Is there a simpler extension to an existing tool/record?
If the need is only instructional, implement a skill rather than a plugin service.

### Defer optional features explicitly
Could-level capabilities (performance hillclimb, runtime/trace forensics, visual parity, unrestricted autonomous shipping) must not block v2 core. Keep roadmap entry and reason for deferral. Promote only after concrete user scenario justifies complexity.

---

## Content Re-authoring Rules (Completed for v2.0.0)

### 1. Full Re-authoring Required — DONE
Every active content item re-authored against v2 contract with external research, evaluation cases, independent review.

### 2. External Research Mandatory Per Skill — DONE
47+ skills with research records (Cursor pstack + at least one independent pack each).

### 3. No Duplication or Overlap (Release-Blocking) — DONE
Every reusable procedure has EXACTLY ONE canonical owner. Overlap clusters resolved. Duplication audit: 0 errors.

### 4. No Parallel Active Catalogue — DONE
No `v2/` copies. Canonical paths retained. Manifest, references, adapters, docs updated in same migration.

### 5. No Fixed Catalogue Target — DONE
55 skills (2 legacy retired), 18 playbooks, 17 principles — based on distinct method and user value.

### 6. No Over-engineering — DONE
No generic workflow DSL. No separate skill for every small task. No permanent specialist roles beyond Lead/Builder/Reviewer.

### 7. Evidence-Led Delivery — DONE
300+ Tier 1/2 evaluation scenarios. Behavioural acceptance exercises realistic inputs, failure conditions, actual outputs.

---

## Developer Milestone Reports

At each meaningful milestone, provide a concise report containing:
- Work packages completed and criteria passed/failed
- What changed and why
- Files/modules/content affected
- Exact tests run and actual results
- OpenCode/OpenChamber/harness API findings
- Project knowledge-base pages updated
- Known limitations, unresolved risks and next action

Avoid vague percentages — report observable behaviours and failing criteria.

---

## Open Implementation Decisions (Resolved via ADRs)

### From v2.0.0 Runtime Release
1. Canonical Playbook path → ADR-0002: `/playbook/skills/`
2. Adapter strategy → ADR-0003: generated at install time
3. Role distribution → ADR-0004: separate from skill installation
4. OpenCode API/version → ADR-0005: @opencode/plugin@2.2.0
5. Project identity → ADR-0006: single `.vstack/` at repo root, shared by worktrees
6. Evidence code identity → ADR-0007: commit SHA + diff fingerprint
7. Reviewer independence → ADR-0008: 4-state enum
8. Checkpoint canonicality → ADR-0009: single PROGRESS.md + plugin index
9. Project verification location → ADR-0010: harness-specific project skill directory
10. Required checks config → ADR-0011: typed JSON (`.vstack/required-checks.json`)
11. Scenario evaluation → ADR-0012: deterministic (Tier 1) + qualitative (Tier 2)
12. Projection compatibility → ADR-0013: versioned schema with graceful degradation

### From Playbook 2.0 Content Re-authoring
13. No grandfathering policy → ADR-0014
14. External research mandate per skill → ADR-0015
15. Capability registry and overlap analysis process → ADR-0016
16. Behavioural evaluation over structural validation → ADR-0017
17. Skill/Playbook lifecycle and promotion criteria → ADR-0018
18. Canonical content ownership and single-procedure rule → ADR-0019
19. Migration ledger and disposition tracking → ADR-0020
20. Adapter validation in actual harnesses → ADR-0021
21. No fixed catalogue target policy → ADR-0022
22. Progressive disclosure and reference ownership → ADR-0023

### For Future Repo Split (Pending Decisions)
- Canonical GitHub username (replaces `<github-username>` in PRD)
- npm `@vstack` scope ownership verification
- Initial projection protocol version and exact schema set
- Integrated release identifier format (date-like vs `vstack-YYYY.MM.N`)
- OpenChamber distribution details (Git URL vs ZIP for min supported version)
- Component support policy (maintenance window for older versions)

---

## When Uncertain

1. Check `docs/project-knowledge/` for existing decisions
2. Read actual source — don't trust audit/plan blindly
3. Run tests to verify behavior
4. Ask for clarification on product decisions (not implementation details already in plan)

---

## Additional Notes

- **Routing learning** uses vstack persistence files (already implemented)
- **No token cost budget** — not implemented
- **Project-specific skills** live inside the project itself (not in playbook)
- **Definition of done:** Task meets acceptance criteria, tests executed and recorded, failure modes handled honestly, boundaries respected, no unnecessary abstractions, knowledge base updated, issues documented, next action identified
- **Phase 0 gate (for content re-authoring):** No broad content rewriting until baseline agreed, contradictions resolved, migration ledger complete, overlap analysis done, external references pinned — **SATISFIED for v2.0.0**