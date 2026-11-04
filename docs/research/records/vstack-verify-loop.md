# Research Record: vstack-verify-loop

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Broad verification execution — runs test suites, integration checks, acceptance criteria validation, captures evidence. Per-task and integration-level.
- **What it explicitly does NOT own:** Test-first implementation (tdd), debugging (debug), assumption breaking (unstick), design (architect)
- **How it differs from adjacent skills:**
  - `vstack-tdd` = single test-first cycle (verify-loop = broader suite execution)
  - `vstack-debug` = failure reproduction (verify-loop = pass/fail evidence)
  - `vstack-unstick` = assumption breaking (verify-loop = verification execution)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** create-verification-skill + maintain-verification-skill (closest — verification execution)
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/create-verification-skill
- **Commit/Revision:** main branch, commit 5aa2dae2726d09d219397fbbedc1e9500a239d28
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md (create-verification-skill), SKILL.md (maintain-verification-skill)

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-verify-loop
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode create-verification-skill:**
- **Launch/Doctor/Drive/Evidence/Cleanup/Helpers** — complete verification harness
- **Doctor** — read-only health check before driving
- **Drive** — harness recipe with real selectors/commands
- **Evidence** — capture action + resulting state + side effects
- **Cleanup** — kill what you started, preserve evidence
- **Feature map** — seed top 3-5 features, each with sub-features, how to reach, drive, gotchas
- **Prove before handover** — launch, doctor, drive ONE feature, capture evidence, cleanup

**From poteto-mode maintain-verification-skill:**
- **Outcomes:** clean / changed / blocked
- **Edit scope:** only verification skill directory
- **Pass:** Index hygiene → Source wave (parallel readers) → Reconcile → Live pass (serial driving) → Triage → Ship/stop
- **Live pass invariants:** doctor before drive, doctor on fresh session, doctor after failed drive, evidence survives cleanup, nothing outlives drive
- **Triage:** doc drift / harness gap / product gap

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Project-local verification skill | vstack-verify-loop = portable verification execution skill |
| Playwright/CDP for web | Abstract: "harness recipe" — project provides |
| Feature map with 4 H2s | vstack can bundle reference format |
| Parallel source readers | Abstract: "parallel source investigation" |
| Serial driving for servers | Abstract: "serial execution for shared state" |
| Three invariants (doctor, evidence, nothing outlives) | Keep as verification principles |

---

### Host/Vendor-Specific Mechanics to Reject

- Playwright/CDP specific harness
- Cursor-specific project-local skill path (.cursor/skills/)
- Browser-based evidence capture only

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-tdd | Both run tests | TDD = test-first cycle, Verify-loop = suite execution |
| vstack-debug | Both execute | Debug = reproduction, Verify-loop = verification evidence |
| vstack-unstick | Both execute | Unstick = assumption test, Verify-loop = verification |
| vstack-create-verification | Both verification | Create = generates project skill, Verify-loop = executes |

---

### vstack Design Decision

**Trigger conditions:**
- "Verify this" / "Run tests"
- Per-task verification in playbooks
- Integration verification after all tasks
- Post-mitigation verification
- Acceptance criteria validation

**Non-triggers:**
- Write failing test first → tdd
- Reproduce failure → debug
- Break assumptions → unstick

**Procedure:**
1. **Doctor** — read-only health check (process, version, port, auth)
2. **Drive** — execute harness (project test command, selectors, commands)
3. **Evidence** — capture action, resulting state, side effects (files, DB, messages)
4. **Cleanup** — tear down instances, preserve evidence

**Per-task:** Run task tests + related regression
**Integration:** Full suite + acceptance criteria + cross-task contracts

**Evidence standards:**
- Exercise real user path (not internal setters)
- Capture action AND resulting state
- Verify side effects alongside visible
- Mocks only at production boundaries
- Dry-run verification: observe what it actually skips

**Evaluation cases:**
- Doctor before drive
- Real user path exercised
- Side effects verified
- Evidence survives cleanup
- Per-task + integration distinction
- Dry-run observation

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02