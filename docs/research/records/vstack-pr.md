# Research Record: vstack-pr

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** PR creation — preparing a focused, reviewable pull request with evidence summary after implementation and verification complete.
- **What it explicitly does NOT own:** Implementation (tdd), verification (verify-loop), review (review-loop), CI monitoring (watch-pr), readiness assessment (ready), merge (ship)
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = produces evidence (pr consumes)
  - `vstack-review-loop` = review process (pr requests review)
  - `vstack-watch-pr` = monitors CI/reviews (pr creates PR)
  - `vstack-ready` = readiness gate (pr precedes ready)
  - `vstack-ship` = authorized delivery (pr precedes ship)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — PR creation is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** requesting-code-review (preparing for review) + finishing-a-development-branch (PR preparation)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/requesting-code-review/SKILL.md, skills/finishing-a-development-branch/SKILL.md

---

### Patterns Worth Adopting

**From superpowers requesting-code-review:**
- Structured review package with objective, criteria, diff, evidence
- Clear scope and linkage to delivery/task

**From superpowers finishing-a-development-branch:**
- Verification before PR
- Evidence summary
- Integration decision

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Review package | PR description with evidence summary |
| Verification gates | All required verifications pass before PR |
| Scope discipline | Single delivery per PR |

---

### Host/Vendor-Specific Mechanics to Reject

- GitHub-specific PR APIs — abstract to "PR workflow per project"

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both evidence | verify-loop = produces, pr = summarizes |
| vstack-review-loop | Both review | pr = requests, review-loop = conducts |
| vstack-watch-pr | Both PR | pr = creates, watch-pr = monitors |
| vstack-ready | Both readiness | pr = before ready, ready = gate before ship |

---

### vstack Design Decision

**Trigger conditions:**
- "Create PR for..." / "Prepare pull request"
- After implementation and verification complete
- When project workflow requires PR
- Before vstack-watch-pr and vstack-ready

**Non-triggers:**
- Direct-to-main workflows
- When changes not ready for review
- Before verification complete

**Procedure (4 steps):**
1. Confirm readiness — all tasks PASS, evidence recorded, review findings dispositioned
2. Prepare PR — focused scope (single delivery), clear title/description, link to delivery/task records, include evidence summary
3. Evidence summary — verification results (pass/fail/skipped), review findings and dispositions, known limitations and risks
4. Submit — create/update PR, request reviewers per project policy, link in delivery/task records

**Output:**
- PR with evidence summary
- Linked delivery/task references
- Reviewers assigned

**Verification:**
- PR passes CI (if configured)
- Reviewers can verify evidence
- Scope matches delivery

**Evaluation cases:**
- Readiness confirmation before PR
- Evidence summary completeness
- Scope discipline (single delivery)
- Reviewer assignment

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02