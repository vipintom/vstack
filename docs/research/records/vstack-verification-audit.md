# Research Record: vstack-verification-audit

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Verification gap analysis — identifies untested acceptance criteria, weak checks, and gaps between tests and real application behaviour.
- **What it explicitly does NOT own:** Skill creation (create-verification), skill maintenance (maintain-verification), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-create-verification` = establishes baseline skill (audit = evaluates completeness)
  - `vstack-maintain-verification` = fixes gaps (audit = finds gaps)
  - `vstack-verify-loop` = executes verification (audit = evaluates verification coverage)
  - `vstack-lessons` = recurring patterns (audit = systematic gap analysis)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — audit is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (systematic review) + test-driven-development (test quality)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, skills/test-driven-development/SKILL.md

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Structured review with lenses
- Evidence-backed findings
- Severity classification

**From superpowers test-driven-development:**
- Test quality: focused, real code, no mocks unless unavoidable
- Red-Green-Refactor discipline

**From poteto-mode principles:**
- Encode Lessons in Structure: audit patterns as reusable checks
- Procedures over vague instructions: explicit 6-step procedure

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Review lenses | Audit attributes (acceptance criteria mapping, check quality, gaps, real behaviour) |
| Severity levels | Blocker/Major/Minor/Note for gaps |
| Evidence-backed findings | Code references for each gap |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core audit pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-create-verification | Both verification skill | create = baseline, audit = evaluates |
| vstack-maintain-verification | Both gaps | audit = finds, maintain = fixes |
| vstack-verify-loop | Both verification | verify-loop = executes, audit = evaluates coverage |
| vstack-lessons | Both patterns | lessons = recurring, audit = systematic |

---

### vstack Design Decision

**Trigger conditions:**
- Periodic verification health check
- Before major releases
- When vstack-lessons suggests verification gaps
- When inheriting a project

**Non-triggers:**
- For routine verification runs
- When verification is known current and comprehensive

**Procedure (6 steps):**
1. Map acceptance criteria to verification — for each delivery: list criteria, identify verifying checks, note criteria with no verification
2. Evaluate check quality — focused checks (test specific criterion), real application (drive actual app), observability (actionable diagnostics), speed (fast enough), reliability (low flake)
3. Identify gaps — untested criteria, unit-only (need integration), mock-only (need real app), flaky, slow
4. Check vs real behaviour — run verification, observe actual app, compare test assertions with manual, note discrepancies
5. Prioritize improvements — Blocker: zero verification, Major: weak/mock-only, Minor: flaky/slow, Note: low-risk gap
6. Report — gap list with severity, recommended improvements, effort estimates

**Output:**
- Verification gap report
- Prioritized improvement list
- Effort estimates

**Verification:**
- All acceptance criteria mapped
- Gaps identified with evidence
- Recommendations actionable

**Evaluation cases:**
- Criteria-to-verification mapping completeness
- Check quality evaluation
- Gap identification accuracy
- Real behaviour comparison
- Prioritization correctness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02