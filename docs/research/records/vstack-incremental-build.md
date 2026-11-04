# Research Record: vstack-incremental-build

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Implementation discipline — decomposes work into smallest verifiable units, each with baseline → change → verify cycle, commits incrementally, integrates frequently.
- **What it explicitly does NOT own:** Plan creation (plan-loop), test-first (tdd), refactoring (refactor), cleanup (unslop), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-plan-loop` = provides steps (incremental-build = executes steps)
  - `vstack-tdd` = test-first approach (incremental-build = verification discipline)
  - `vstack-refactor` = structural improvement (incremental-build = feature implementation)
  - `vstack-unslop` = cleanup (incremental-build = prevents slop)
  - `vstack-verify-loop` = verification execution (incremental-build = uses verify-loop)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — incremental build is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** executing-plans (inline execution) + test-driven-development
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/executing-plans/SKILL.md, skills/test-driven-development/SKILL.md

---

### Patterns Worth Adopting

**From superpowers executing-plans:**
- Brief is the spec
- Ledger is your memory
- TDD is the per-task gate
- Continuous execution: don't pause

**From superpowers test-driven-development:**
- Iron Law: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
- Red-Green-Refactor cycle

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Plan steps as verifiable units | Each unit: one logical change, one verification |
| Continuous execution | No "prep" commits, integrate frequently |
| TDD as per-task gate | Verification per unit |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core incremental build pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-plan-loop | Both plan | plan-loop = provides steps, incremental-build = executes |
| vstack-tdd | Both test | tdd = test-first, incremental-build = verification discipline |
| vstack-refactor | Both structure | incremental-build = feature work, refactor = structural |
| vstack-unslop | Both code | incremental-build = prevents, unslop = cleans |
| vstack-verify-loop | Both verify | incremental-build = uses, verify-loop = executes |

---

### vstack Design Decision

**Trigger conditions:**
- For all implementation work (Standard and Advanced modes)
- When making multiple related changes
- As default implementation discipline

**Non-triggers:**
- For single, trivial changes (Quick mode)
- When a larger atomic change is genuinely required

**Procedure (4 phases):**
1. Decompose into smallest verifiable units — each unit: one logical change, one verification, prefer vertical slices (feature) over horizontal (layer), avoid "prep" commits that don't pass verification
2. For each unit:
   a. Identify narrowest verification — what check validates this change?
   b. Run baseline — capture current check result
   c. Make the change — minimal diff
   d. Run verification — same check as baseline
   e. Inspect actual output — read real results, not summaries
   f. Fix root cause — if check fails, fix the cause, don't weaken the check
   g. Repeat until pass — then run broader relevant checks
3. Commit incrementally — one logical change per commit, commit message: what + why (reference plan step), include verification evidence in commit or PR
4. Integrate frequently — pull/rebase regularly, run full verification suite before push, address conflicts immediately

**Output:**
- Series of small, verified commits
- Each commit passes its verification
- Broader checks pass after each integration

**Verification:**
- Every meaningful change has a verification
- No commit breaks existing tests
- Verification evidence recorded

**Evaluation cases:**
- Unit decomposition granularity
- Verification per unit
- Incremental commit discipline
- Frequent integration

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02