# Research Record: vstack-watch-pr

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** CI/review monitoring — watching PR for CI completion and review findings, addressing valid issues, re-verifying, repeating until clean.
- **What it explicitly does NOT own:** PR creation (pr), verification execution (verify-loop), review conduction (review-loop), readiness gate (ready), merge (ship)
- **How it differs from adjacent skills:**
  - `vstack-pr` = creates PR (watch-pr monitors)
  - `vstack-verify-loop` = re-verifies after fixes (watch-pr invokes)
  - `vstack-review-loop` = conducts review (watch-pr monitors findings)
  - `vstack-ready` = final readiness gate (watch-pr precedes)
  - `vstack-ship` = authorized delivery (watch-pr precedes)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — CI monitoring is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** finishing-a-development-branch (monitors CI/review)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/finishing-a-development-branch/SKILL.md

---

### Patterns Worth Adopting

**From superpowers finishing-a-development-branch:**
- Monitor CI, on failure diagnose/fix/reverify
- Monitor reviews, validate/fix/reverify each finding
- Disposition findings: fixed/dismissed/deferred/accepted risk
- Repeat until CI passes and no blocking findings

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| CI monitoring loop | Explicit CI + review monitoring phases |
| Finding disposition | Fixed/dismissed/deferred/accepted risk with rationale |
| Re-verification | Invoke vstack-verify-loop after fixes |

---

### Host/Vendor-Specific Mechanics to Reject

- GitHub-specific CI/review APIs — abstract to "CI/review system access"

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-pr | Both PR | pr = creates, watch-pr = monitors |
| vstack-verify-loop | Both verify | verify-loop = executes, watch-pr = triggers after fixes |
| vstack-review-loop | Both review | review-loop = conducts, watch-pr = monitors findings |
| vstack-ready | Both readiness | watch-pr = prepares for, ready = final gate |

---

### vstack Design Decision

**Trigger conditions:**
- "Watch PR" / "Monitor CI and reviews"
- After vstack-pr creates PR
- When CI/review feedback arrives
- Until vstack-ready confirms readiness

**Non-triggers:**
- PRs not requiring monitoring
- When no CI/review integration

**Procedure (4 phases):**
1. Monitor CI — watch for completion, on failure: diagnose, fix, reverify, push, record evidence
2. Monitor reviews — watch for findings, for each: validate, fix if valid, reverify, disposition (fixed/dismissed/deferred/accepted risk), record rationale
3. Reverify after fixes — run affected verifications, update evidence, push updates
4. Repeat until clean — CI passes, no unresolved blocking findings, all findings dispositioned

**Output:**
- Passing CI
- All findings dispositioned
- Updated evidence

**Verification:**
- CI passes
- No open blocking findings
- All findings have valid disposition

**Evaluation cases:**
- CI failure handling
- Finding validation and disposition
- Re-verification after fixes
- Clean state achievement

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02