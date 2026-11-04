# Research Record: vstack-recovery

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** State restoration — restores safe state after failed/interrupted/partially applied work by assessing state, determining baseline, planning and executing recovery, verifying safe state.
- **What it explicitly does NOT own:** Cleanup (unslop), checkpoint (context-reset), pause (safe-pause), session resumption (session-pickup)
- **How it differs from adjacent skills:**
  - `vstack-unslop` = code cleanup (recovery = state restoration)
  - `vstack-context-reset` = checkpoint (recovery = uses checkpoint as baseline)
  - `vstack-safe-pause` = planned pause (recovery = unplanned restoration)
  - `vstack-session-pickup` = resume (recovery = fixes unsafe state before pickup)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — recovery is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** systematic-debugging (root cause) + using-git-worktrees (git log for baseline)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/systematic-debugging/SKILL.md, skills/using-git-worktrees/SKILL.md

---

### Patterns Worth Adopting

**From superpowers systematic-debugging:**
- Root cause investigation before fixes
- Evidence-based recovery

**From superpowers using-git-worktrees:**
- Trust git log over memory
- Last known good commit as baseline

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Git log for baseline | Checkpoint or git log as safe baseline |
| Evidence-based | Recovery plan with verification |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core recovery pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-unslop | Both cleanup | unslop = code cleanup, recovery = state restoration |
| vstack-context-reset | Both checkpoint | context-reset = creates, recovery = uses as baseline |
| vstack-safe-pause | Both pause | safe-pause = planned, recovery = unplanned |
| vstack-session-pickup | Both resumption | recovery = fixes unsafe, pickup = resumes |

---

### vstack Design Decision

**Trigger conditions:**
- After vstack-unstick when changes need cleanup
- After interrupted session with partial changes
- When verification reveals broken state
- When vstack-session-pickup detects unsafe state

**Non-triggers:**
- For routine cleanup (use vstack-unslop)
- When state is already safe

**Procedure (6 steps):**
1. Assess current state — git status (uncommitted changes), git diff (what changed), compare with checkpoint/runtime state, identify partial/failed changes
2. Determine safe baseline — last known good commit (from checkpoint or evidence), or clean main branch, document baseline
3. Plan recovery — Option A: Revert to baseline (git checkout, git reset), Option B: Selectively undo failed changes, Option C: Complete partial changes if viable, choose safest option
4. Execute recovery — apply chosen recovery action, clean build artifacts/caches, restore config if modified
5. Verify safe state — run baseline verification, confirm no residual broken state, update checkpoint if needed
6. Record recovery — what failed, recovery action taken, baseline restored to, lessons for prevention

**Output:**
- Repository in verified safe state
- Recovery record (in vstack-ledger or plugin)
- Updated checkpoint

**Verification:**
- Baseline verification passes
- No partial/failed changes remain
- Clean git status (or documented exceptions)

**Evaluation cases:**
- State assessment accuracy
- Baseline determination
- Recovery option selection
- Safe state verification

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02