# Research Record: vstack-refactor

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Behaviour-preserving structural improvement — establishes baseline, plans incremental transformations, executes with verification at each step, documents changes.
- **What it explicitly does NOT own:** Behaviour change (implementation), code cleanup (unslop), test-first (tdd), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-unslop` = removes slop (refactor = structural improvement with verification)
  - `vstack-incremental-build` = implementation discipline (refactor = uses incremental steps)
  - `vstack-tdd` = test-first (refactor = preserves existing behaviour)
  - `vstack-verify-loop` = verification execution (refactor = uses verify-loop)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — refactor is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** safe-refactor (restructure while preserving behaviour)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/safe-refactor/SKILL.md

---

### Patterns Worth Adopting

**From superpowers safe-refactor:**
- Restructure while preserving behaviour
- Verification must bracket structural edits
- Extraction, consolidation, ownership moves, cleanup

**From poteto-mode principles:**
- Procedures over vague instructions: explicit incremental steps
- Evidence before assertions: verify after each step

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Verification brackets edits | Verify after each incremental step |
| Step order: extract → rename → reorganize → generalize | Same order |
| Never weaken verification | Same |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core refactor pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-unslop | Both improve code | refactor = structural, unslop = cleanup |
| vstack-incremental-build | Both incremental | refactor = uses, incremental-build = discipline |
| vstack-tdd | Both test | tdd = test-first, refactor = preserves behaviour |
| vstack-verify-loop | Both verify | refactor = uses, verify-loop = executes |

---

### vstack Design Decision

**Trigger conditions:**
- When vstack-unslop identifies structural issues
- When improving code without changing behaviour
- When preparing code for new features

**Non-triggers:**
- When behaviour must change (that's implementation)
- When no verification exists to prove equivalence
- For premature abstraction

**Procedure (5 steps):**
1. Establish behaviour baseline — run full verification suite, record current outputs/behaviour, identify behaviour that must be preserved
2. Plan refactoring steps — decompose into small, safe transformations, each step: one structural change, same verification, order: extract → rename → reorganize → generalize
3. Execute incrementally — for each step: change → verify → commit, if verification fails: revert, diagnose, retry, never weaken verification to pass
4. Verify equivalence — run full verification suite after each commit, run broader regression tests, compare outputs with baseline where applicable
5. Document changes — what was restructured and why, evidence of behavioural equivalence, any edge cases discovered

**Output:**
- Refactored code with preserved behaviour
- Verification evidence for each step
- Documentation of structural improvements

**Verification:**
- All original verifications pass
- No behavioural changes
- Code structure improved (measurable: complexity, duplication, coupling)

**Evaluation cases:**
- Baseline establishment
- Step decomposition
- Incremental verification
- Equivalence verification
- Documentation completeness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02