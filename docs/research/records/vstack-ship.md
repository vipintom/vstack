# Research Record: vstack-ship

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Authorized delivery execution — executing explicitly authorized merge, deploy, or release actions within a narrow approval scope.
- **What it explicitly does NOT own:** Readiness assessment (ready), PR creation (pr), CI/review monitoring (watch-pr), verification (verify-loop), review (review-loop)
- **How it differs from adjacent skills:**
  - `vstack-ready` = readiness gate (ship = executes after ready)
  - `vstack-pr` = creates PR (ship = merges if authorized)
  - `vstack-watch-pr` = monitors (ship = executes after clean)
  - `vstack-recovery` = handles failures (ship = records outcome)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — authorized delivery is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** finishing-a-development-branch (integration execution) + verification-before-completion (verification before claiming complete)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/finishing-a-development-branch/SKILL.md, skills/verification-before-completion/SKILL.md

---

### Patterns Worth Adopting

**From superpowers finishing-a-development-branch:**
- Explicit authorization required
- Narrow scope (specific action, target)
- External gates (CI, branch protection) satisfied
- Post-action verification
- Audit trail

**From superpowers verification-before-completion:**
- Evidence before assertions
- Run verification commands, confirm output
- Failure modes handled honestly

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Authorization check | Explicit authorization record with scope |
| External gates | CI, branch protection must be satisfied |
| Post-action checks | Smoke checks, status update |
| Audit trail | Action, authorization reference, outcome |

---

### Host/Vendor-Specific Mechanics to Reject

- GitHub-specific merge APIs — abstract to "authorized action execution"

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-ready | Both delivery | ready = gate, ship = executes |
| vstack-pr | Both PR | pr = creates, ship = merges if authorized |
| vstack-watch-pr | Both PR | watch-pr = monitors, ship = executes after |
| vstack-recovery | Both failure | recovery = handles failures, ship = records success |

---

### vstack Design Decision

**Trigger conditions:**
- "Ship this" / "Merge this" / "Deploy this"
- After vstack-ready confirms READY
- When explicit user/Lead authorization given
- For authorized merge, deploy, release actions

**Non-triggers:**
- Without explicit authorization
- As default workflow (always opt-in)
- To bypass CI, branch protection, or external approval

**Procedure (4 steps):**
1. Verify authorization — authorization recorded for specific action, scope matches intended action, approver has authority
2. Execute authorized action — merge PR (if authorized), trigger deploy (if authorized), create release (if authorized), record action and outcome
3. Verify post-action — confirm action completed, run smoke checks if applicable, update delivery/task status
4. Record — action taken, authorization reference, outcome, any post-action verification

**Output:**
- Authorized action executed
- Delivery/task status updated
- Audit trail

**Verification:**
- Authorization valid and scoped
- Action completed successfully
- Post-action checks pass

**Evaluation cases:**
- Authorization validation
- Scope matching
- External gate satisfaction
- Post-action verification
- Audit trail completeness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02