# Research Record: vstack-unslop

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Code quality cleanup — identifies slop patterns (generated boilerplate, duplication, over-abstraction, dead code, inconsistency), prioritizes by impact, cleans incrementally with verification.
- **What it explicitly does NOT own:** Structural refactoring (refactor), test-first (tdd), implementation (incremental-build), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-refactor` = structural improvement (unslop = cleanup)
  - `vstack-incremental-build` = implementation discipline (unslop = post-implementation cleanup)
  - `vstack-tdd` = test-driven (unslop = cleanup after)
  - `vstack-verify-loop` = verification (unslop = uses verify-loop)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — unslop is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** unslop (cut AI tells from writing)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/unslop/SKILL.md

---

### Patterns Worth Adopting

**From superpowers unslop:**
- Cut AI tells from any writing
- Must always apply
- Patterns: generated boilerplate, duplication, over-abstraction, dead code, inconsistency

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| AI tells in writing | Code slop patterns (boilerplate, duplication, over-abstraction, dead code) |
| Always apply | Part of definition of done |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core unslop pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-refactor | Both improve code | refactor = structural, unslop = cleanup |
| vstack-incremental-build | Both code | incremental-build = prevents, unslop = cleans up |
| vstack-tdd | Both code | tdd = prevents over-engineering, unslop = cleans |
| vstack-verify-loop | Both verify | unslop = uses verify-loop |

---

### vstack Design Decision

**Trigger conditions:**
- After implementation to clean up
- When code review finds generated/boilerplate issues
- When vstack-refactor reveals unnecessary complexity
- As part of definition of done

**Non-triggers:**
- As substitute for good initial implementation
- For premature optimization
- When cleanup would change behaviour without verification

**Procedure (4 steps):**
1. Identify slop patterns — generated boilerplate not adapted to context, duplicated logic (DRY violations), over-engineered abstractions (YAGNI), dead code (unused imports, functions, parameters), inconsistent naming/conventions, excessive nesting/conditionals
2. Prioritize by impact — High: duplicated logic, dead code, inconsistency; Medium: over-abstraction, boilerplate; Low: style nits (handled by linter)
3. Clean up incrementally — one pattern at a time, verify after each cleanup, commit separately from feature work
4. Verify no regression — run full verification suite, check for behavioural changes, ensure linting passes

**Output:**
- Cleaner code with same behaviour
- Verification evidence
- Separate cleanup commits

**Verification:**
- All verifications pass
- No behavioural changes
- Measurable improvement (lines, complexity, duplication)

**Evaluation cases:**
- Slop pattern identification
- Impact prioritization
- Incremental cleanup with verification
- Regression prevention

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02