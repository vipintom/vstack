# Research Record: vstack-review-loop

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Independent review process — fresh-context reviewer assesses implementation against acceptance criteria using structured lenses, findings resolved through fix/defer/reject cycle.
- **What it explicitly does NOT own:** Verification execution (verify-loop), multi-reviewer coordination (jury), adversarial review (interrogate), rubric definition (review-rubrics)
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = executes verification (review-loop consumes evidence)
  - `vstack-jury` = coordinates multiple reviewers (review-loop = single)
  - `vstack-interrogate` = adversarial, tries to break (review-loop = cooperative assessment)
  - `vstack-review-rubrics` = supplies lenses (review-loop applies them)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — review-loop is vstack-specific review process)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** requesting-code-review + receiving-code-review
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/requesting-code-review/SKILL.md, skills/receiving-code-review/SKILL.md

---

### Patterns Worth Adopting

**From superpowers requesting-code-review:**
- Review package: objective, criteria, diff, evidence, lenses
- Fresh context reviewer (new session, no implementation history)
- Lead prepares, Reviewer assesses, Lead resolves

**From superpowers receiving-code-review:**
- Read only review package (no implementation context)
- Apply lenses systematically
- Record findings with severity, location, evidence, recommendation
- Overall assessment: accept / accept with fixes / reject
- Lead resolves: fix, defer, reject, re-review

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| 7 lenses | 7 rubric categories from resources/rubrics/ |
| Fresh context | New session, no implementation history |
| Lead/Reviewer roles | Lead prepares/resolves, Reviewer assesses |
| Fix/defer/reject/resolve cycle | Same with evidence requirements |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core review pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both evidence | verify-loop = produces evidence, review-loop = consumes |
| vstack-jury | Both review | review-loop = single, jury = multiple |
| vstack-interrogate | Both assess | review-loop = cooperative, interrogate = adversarial |
| vstack-review-rubrics | Both lenses | rubrics = defines, review-loop = applies |

---

### vstack Design Decision

**Trigger conditions:**
- "Review this" / "Independent review for..."
- After implementation and verification complete
- When plan-loop assigns review tasks
- When Lead requests independent assessment
- For high-risk changes (always)

**Non-triggers:**
- During implementation → vstack-verify-loop
- Trivial changes with low risk (Lead judgment)
- Multi-reviewer needed → vstack-jury

**Procedure (3 phases):**

**Lead: Request Review**
1. Prepare review package: objective, criteria, changes, evidence, lenses
2. Dispatch Reviewer with fresh context (new session, no implementation history)
3. Specify lenses from resources/rubrics/

**Reviewer: Conduct Review**
1. Read only the review package — no implementation context
2. Apply each lens systematically:
   - Correctness & Regression
   - Architecture & Design
   - Security & Data
   - Performance & Resources
   - Maintainability & Style
   - Test Adequacy
   - Documentation & Migration
3. Record findings per lens:
   - Severity: critical/high/medium/low/informational
   - Category: lens name
   - Description with file:line reference
   - Evidence reference
   - Recommendation (concrete, testable)
4. Overall assessment — accept / accept with fixes / reject

**Lead: Resolve Findings**
1. Review each finding with Builder
2. Fix — Builder addresses, provides evidence
3. Defer — document reason, track for later
4. Reject — document rationale (rare, requires evidence)
5. Re-review — Reviewer confirms fixes address root cause

**Output:**
- Review report with findings
- Resolved findings with fix evidence
- Final assessment

**Verification:**
- Reviewer had no implementation context
- Each finding has severity, location, evidence, recommendation
- Critical/high findings resolved or explicitly waived
- Re-review confirms fixes

**Evaluation cases:**
- Fresh context enforced
- All applicable lenses applied
- Findings have evidence and recommendations
- Critical/high resolved or waived
- Re-review confirms root cause fix

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02