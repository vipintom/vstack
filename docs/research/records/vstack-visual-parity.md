# Research Record: vstack-visual-parity

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Visual regression testing — verifies UI behaviour and visual appearance against defined references (screenshots, design specs, Storybook).
- **What it explicitly does NOT own:** Verification execution (verify-loop), verification skill creation (create-verification), verification maintenance (maintain-verification), functional testing
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = general verification (visual-parity = UI-specific)
  - `vstack-create-verification` = creates skill (visual-parity = uses skill)
  - `vstack-maintain-verification` = maintains skill (visual-parity = uses skill)
  - `vstack-design-audit` = design audit (visual-parity = automated visual testing)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — visual parity is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** verification-before-completion (evidence-based)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/verification-before-completion/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode principles:**
- Prove It Works: visual evidence
- Evidence Before Assertions: pixel diff with tolerance

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Visual evidence | Screenshot comparison with tolerance |
| Design system compliance | Design specs as reference |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core visual parity pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both verify | verify-loop = general, visual-parity = UI-specific |
| vstack-create-verification | Both skill | create-verification = setup, visual-parity = executes |
| vstack-maintain-verification | Both maintenance | maintain = updates, visual-parity = runs |
| vstack-design-audit | Both design | design-audit = audit, visual-parity = automated test |

---

### vstack Design Decision

**Trigger conditions:**
- For UI changes (web, mobile, desktop)
- When visual regression testing needed
- When design system compliance required

**Non-triggers:**
- For non-UI changes
- Without defined visual reference

**Procedure (5 steps):**
1. Define reference — baseline screenshots (approved), design specifications (Figma, Storybook), acceptance criteria (pixel tolerance, content)
2. Run visual tests — navigate to target states, capture screenshots, compare against reference
3. Analyze differences — pixel diff (tolerance-based), layout shift detection, content verification
4. Classify differences — Intentional (design change) → update reference, Regression → fix, Flaky (dynamic content) → mask or stabilize
5. Update or fix — Intentional: approve new baseline, Regression: fix code, re-run, Flaky: improve test stability

**Output:**
- Visual test results (pass/fail/diff)
- Updated baselines (for intentional changes)
- Fixed regressions

**Verification:**
- No unintended visual differences
- Intentional changes approved
- Tests stable (low flake)

**Evaluation cases:**
- Reference definition
- Visual test execution
- Difference analysis
- Classification accuracy
- Baseline update process

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02