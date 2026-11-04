# Testing (Playbook 2.0 Content Re-authoring — Phase 0)

**Last updated:** 2026-11-02 (Phase 0 Started)

---

## Test Commands (v2.0.0 Release — Baseline)

### OpenCode Plugin (`opencode/vstack/`)

| Command | Description | Status (v2.0.0) |
|---|---|---|
| `pnpm test` | Run vitest unit tests | ✅ PASS (26/26) |
| `pnpm typecheck` | TypeScript compile check | ✅ PASS |
| `pnpm build` | Full build (tsc) | ✅ PASS |
| `pnpm lint` | ESLint | Not configured |

### OpenChamber Plugin (`openchamber/vstack-panel/`)

| Command | Description | Status (v2.0.0) |
|---|---|---|
| `pnpm typecheck` | TypeScript compile check | ✅ PASS |
| `pnpm build` | Bundle with @openchamber/sdk | ❌ FAIL (SDK unavailable) |
| `pnpm dev` | Watch mode build | Not tested |

### Root Workspace (`vstack/`)

| Command | Description | Status (v2.0.0) |
|---|---|---|
| `pnpm build` | Build all packages | ⚠️ PARTIAL (opencode PASS, openchamber FAIL) |
| `pnpm typecheck` | Typecheck all packages | ✅ PASS |
| `pnpm lint` | Lint all packages | Not configured |
| `pnpm test` | Test all packages | ✅ PASS (opencode: 26/26) |

---

## Test Coverage Targets (Playbook 2.0 Content Re-authoring)

| Category | Target | Phase | Status |
|---|---|---|---|
| **Unit Tests (Runtime)** | Persistence, stores, services, tools | v2.0.0 Phase 4 | ✅ Complete (26/26) |
| **E2E Tests (Runtime)** | 10 end-to-end journeys | v2.0.0 Phase 6 | ✅ Complete (e2e-workflow) |
| **Integration Tests (Runtime)** | Plugin startup, skill loading, agent provisioning | v2.0.0 Phase 2 | ✅ Complete |
| **Playbook Static Validation** | Frontmatter, links, dependencies, contracts | Content Phase 1 | ⏳ Phase 1 |
| **Playbook Behavioural Evaluations** | 12 minimum PRD scenarios + per-skill triggers | Content Phase 3, 5 | ⏳ Phase 3/5 |
| **Skill Trigger Evaluations** | Positive + negative trigger cases per stable skill | Content Phase 3 | ⏳ Phase 3 |
| **Playbook Procedure Evaluations** | Routing, branch, skip, failure, exit-path per Playbook | Content Phase 2, 5 | ⏳ Phase 2/5 |
| **OpenChamber Tests** | Read-only, projections, stale data | v2.0.0 Phase 5 | ✅ Typecheck PASS |
| **Cross-Harness Compatibility** | OpenCode, Codex, Claude Code adapters tested | Content Phase 6 | ⏳ Phase 6 |
| **Cross-Process Concurrency** | Locks, revision conflicts | v2.0.0 Phase 4 | ✅ Complete |
| **Migration Tests** | N/A (content re-authoring, not migration) | N/A | N/A |

---

## Verified Results Log (v2.0.0 Release Baseline)

| Date | Package | Command | Result | Notes |
|---|---|---|---|---|
| 2026-11-01 | opencode/vstack | `pnpm typecheck` | PASS | Strict TS, ES2022, ESM |
| 2026-11-01 | opencode/vstack | `pnpm build` | PASS | Output to dist/ |
| 2026-11-01 | opencode/vstack | `pnpm test` | 26/26 PASS | 7 test files, ~1.2s |
| 2026-11-01 | openchamber/vstack-panel | `pnpm typecheck` | PASS | Types updated for v2 projections |
| 2026-11-01 | playbook | `node scripts/validate-content.js` | PASS | 0 errors, 0 warnings |
| 2026-11-01 | opencode/vstack | `pnpm test` | 26/26 PASS | E2E workflow included |
| 2026-11-01 | openchamber/vstack-panel | `pnpm build` | FAIL | SDK unavailable — expected |

---

## Phase 0 Validation Commands (To Execute)

### Repository Baseline Verification
```bash
# 1. Git status and baseline
git status --short
git log --oneline -5
git rev-parse HEAD

# 2. Recount actual skills
find playbook/skills -name "SKILL.md" -type f | wc -l
find playbook/skills -name "SKILL.md" -type f | sort

# 3. Recount workflows
ls playbook/workflows/*.md | wc -l
ls playbook/workflows/*.md

# 4. Recount principles
ls playbook/principles/*.md | wc -l
ls playbook/principles/*.md

# 5. Recount rubrics
ls playbook/resources/rubrics/*.md | wc -l
ls playbook/resources/rubrics/*.md

# 6. Recount adapters
find playbook/agents/adapters -name "*.md" -type f | wc -l
find playbook/agents/adapters -name "*.md" -type f

# 7. Rerun tests to resolve 26/26 vs 30/42 discrepancy
cd opencode/vstack && pnpm test 2>&1 | tail -30

# 8. Confirm OpenChamber build status
cd openchamber/vstack-panel && pnpm build 2>&1 | tail -20

# 9. Validate playbook content
cd playbook && node scripts/validate-content.js
```

---

## E2E Scenario Coverage (v2.0.0 Release — For Reference)

| Journey | Description | Coverage |
|---|---|---|
| **A — Quick bug fix** | Router chooses Quick, Builder reproduces/fixes/verifies, evidence + limitations | ✅ Via enforcement + check service |
| **B — Standard feature** | Router chooses Standard, discovery/plan, task contracts, verification, independent review | ✅ E2E workflow test |
| **C — Advanced architecture change** | Deep how/why/blast-radius, alternatives, decision record, plan challenge, high-risk review | ✅ Via decision-store + review-store |
| **D — Repeated verification failure** | Same class fails twice, unstick tests assumption, changed approach/escalation, bounded recovery | ✅ Via unstick + recovery-store |
| **E — Safe parallel delivery** | Disjoint task scopes isolated/integrated; overlapping triggers isolation/sequential fallback | ✅ Via assignment-store write-scope |
| **F — Interruption and resume** | Progress checkpoint created, process interrupted, runtime marks status, fresh context revalidates/resumes | ✅ Via checkpoint-store + session-pickup |
| **G — Project verification** | Verification skill created, executed, staled after command/route change, maintained, revalidated | ✅ Via verification-index-store + maintenance |
| **H — Lesson promotion** | Recurring failure linked to occurrences, converted to preventive control, verified against original | ✅ Via lesson-promotion tool |
| **I — PR readiness** | Local evidence/review complete, feedback addressed/reverified, stops at readiness unless authorized | ✅ Via enforcement gates + review-store |
| **J — Non-OpenCode portability** | Same core Playbook guides bug fix/feature in another harness, runtime gracefully unavailable | ⚠️ Playbook only; adapters unsupported |

---

## New Evaluation Requirements (Playbook 2.0 Content Re-authoring)

Per Implementation Plan Section 19 and PRD Section 16:

### Validation Layers
| Layer | What It Proves | Examples |
|---|---|---|
| File/metadata validation | Files are syntactically discoverable | YAML/frontmatter, required metadata, IDs |
| Catalogue integrity | Canonical inventory and references are coherent | Manifest equality, duplicate detection, links, lifecycle, dependency graph |
| Content-contract review | Instructions satisfy the applicable authored contract | Purpose, triggers, procedure, output, verification, failure handling |
| Overlap review | No duplicate or contradictory active procedure | Pairwise semantic analysis and ownership sign-off |
| Trigger evaluation | Correct invocation and non-invocation | Positive and negative scenario fixtures |
| Procedure-fidelity evaluation | Agent follows required steps/branches | Checklist fidelity, artifact inspection, skip reason correctness |
| Outcome evaluation | Method produces valid result | Tests/build/runtime/artifact review and acceptance predicates |
| Portability validation | Same core method works across harnesses | Clean install, direct invocation, fallback, real-task demonstrations |
| Regression evaluation | Changes do not break existing behaviour | Stable scenario baselines and critical-failure gates |

**Passing a lower layer does not imply passing a higher one.**

### Required Scenario Coverage (PRD Section 16.3 + Implementation Plan Section 19.2)
- Trivial task does not trigger heavy ceremony
- Read-only investigation does not become implementation
- Defect reproduces before fix
- Playbook steps copied verbatim and skips remain visible
- Architecture grounding for cross-boundary changes
- Arena rubric/isolation/synthesis
- Swarm modes/ownership/dropouts
- Conflicting write scopes isolated or serialized
- Interrogate returns findings without auto-apply
- Repeated failure triggers `unstick`
- Failed/inconclusive verification is not reported as pass
- Pickup revalidates checkpoint state
- Long-running work has concise evidence-linked trail
- Skill rewrite improves positive cases without causing false-positive triggers
- Host without subagents uses sequential fallback
- Host without persistent mode/checklist API still follows the method
- **Plus:** At least one positive and one negative trigger case for every active stable skill
- **Plus:** Positive, negative, procedure-fidelity, branch, skip, exit-path cases for every Playbook
- **Plus:** Distinct evaluation suites for `arena`, `swarm`, `interrogate` (not one generic multi-agent scenario)
- **Plus:** Skill authoring evaluation checks research record and overlap review, not just headings

### Evaluation Verdicts
Preserve separate outcomes for each criterion:
- `PASS`, `FAIL`, `INCONCLUSIVE`, `BLOCKED`, `NOT RUN`, `UNAVAILABLE`
- Critical safety, authorization, or evidence defect = blocker, cannot be offset by high average score

### Review Independence
- Use fresh-context reviewer for final skill/Playbook review where harness supports it
- Reviewer receives: PRD contract, source research record, overlap map, current draft, evaluation artifacts
- Review must not rely solely on author's explanation
- If independent context unavailable, label as self-review and state limitation

---

## Prerequisites
- Node.js >= 20 (v24.22.2 used)
- pnpm >= 9
- OpenCode environment (for plugin runtime tests)
- OpenChamber SDK (for extension build — currently unavailable)
- **NEW:** Access to reference skill packs (Cursor pstack, painhardcore/pstack, superpowers, DeepSeek Stack, Anthropic Skills, t3dotgg/tstack, TStack) for external research

---

## Test Reporting Rules
Every test report MUST include:
- Date and environment/version
- Exact command or manual procedure
- Pass/fail/blocked/skipped result
- Relevant output or concise failure summary
- Test type: unit / integration / compatibility / end-to-end / behavioural-evaluation

**Build success ≠ workflow works.** E2E scenarios with recorded evidence required.
**Structural validation ≠ behavioural quality.** Behavioural evaluation with observable outcomes required.