# Research Record: vstack-ready

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Merge-readiness assessment — producing a go/no-go recommendation without merging, as final gate before authorized delivery.
- **What it explicitly does NOT own:** PR creation (pr), CI/review monitoring (watch-pr), verification (verify-loop), review (review-loop), merge execution (ship)
- **How it differs from adjacent skills:**
  - `vstack-watch-pr` = monitors to readiness (ready = assesses)
  - `vstack-verify-loop` = verification evidence (ready consumes)
  - `vstack-review-loop` = review evidence (ready consumes)
  - `vstack-ship` = executes merge (ready = gate before ship)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — readiness gate is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** finishing-a-development-branch (readiness assessment before integration)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/finishing-a-development-branch/SKILL.md

---

### Patterns Worth Adopting

**From superpowers finishing-a-development-branch:**
- Verification completeness check
- Review disposition summary
- Residual risk assessment
- Explicit recommendation (READY/NOT READY)
- Stop before merge (separate authorization)

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Integration decision | Merge-readiness assessment with explicit recommendation |
| Evidence traceability | All criteria checked with evidence references |
| Risk documentation | Residual risks, rollback complexity, monitoring needs |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core readiness pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-watch-pr | Both readiness | watch-pr = achieves clean state, ready = assesses |
| vstack-verify-loop | Both verification | verify-loop = produces, ready = checks completeness |
| vstack-review-loop | Both review | review-loop = conducts, ready = checks disposition |
| vstack-ship | Both delivery | ready = gate, ship = authorized execution |

---

### vstack Design Decision

**Trigger conditions:**
- "Ready to merge?" / "Assess readiness"
- After vstack-watch-pr confirms CI and reviews clean
- Before any merge/delivery action
- As final gate before vstack-ship

**Non-triggers:**
- When PR not ready
- When merge not intended

**Procedure (4 steps):**
1. Verify completeness — all acceptance criteria met with evidence, all required verifications pass, all review findings dispositioned, no open blockers
2. Assess risks — residual risks (accepted, deferred), rollback complexity, monitoring needs post-merge
3. Produce readiness report — delivery objective, acceptance criteria status, verification summary, review disposition summary, residual risks, rollback plan, recommendation: READY / NOT READY
4. Stop before merge — do not merge unless separately authorized, report to Lead/user for decision

**Output:**
- Merge-readiness assessment
- Evidence summary
- Residual risks documented
- Explicit recommendation

**Verification:**
- All criteria checked
- Evidence traceable
- Recommendation justified

**Evaluation cases:**
- Completeness verification
- Risk assessment
- Recommendation justification
- Gate enforcement (stop before merge)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02