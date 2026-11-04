# Research Record: vstack-safe-pause

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Planned work suspension — completes current verification cycle, updates checkpoint, cleans workspace, records pause with timestamp/reason, verifies resumability.
- **What it explicitly does NOT own:** Checkpoint creation (context-reset), decision ledger (ledger), session resumption (session-pickup), recovery (recovery)
- **How it differs from adjacent skills:**
  - `vstack-context-reset` = checkpoint update (safe-pause = uses context-reset + adds cleanup/pause record)
  - `vstack-session-pickup` = resume (safe-pause = prepares for pickup)
  - `vstack-ledger` = pause record (safe-pause = records pause in ledger)
  - `vstack-recovery` = cleanup after failure (safe-pause = planned clean pause)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** pause-safely (playbook)
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode/playbooks/pause-safely.md
- **Date Inspected:** 2026-11-02

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** using-git-worktrees (clean workspace) + executing-plans (brief as spec)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/using-git-worktrees/SKILL.md, skills/executing-plans/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode pause-safely playbook:**
- Suspend cleanly — checkpoint with completed work, next action, blockers
- Explicit pause / going offline / Cursor restart / context compaction
- Complement to session pickup

**From superpowers using-git-worktrees:**
- Clean workspace before pause
- Trust git log over memory

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Cursor-specific pause triggers | General: end of session, context compaction, extended execution |
| Cursor restart handling | General: any interruption requiring clean state |
| Worktree cleanup | Fallback: directory isolation cleanup |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific triggers (Cursor restart, context compaction)
- Cursor-specific worktree handling

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-context-reset | Both checkpoint | safe-pause = uses context-reset + pause record + cleanup |
| vstack-session-pickup | Both resumption | safe-pause = prepares, pickup = resumes |
| vstack-ledger | Both records | safe-pause = records pause in ledger |
| vstack-recovery | Both cleanup | safe-pause = planned, recovery = unplanned |

---

### vstack Design Decision

**Trigger conditions:**
- Ending a session with work in progress
- Before context window reset
- When Extended execution profile active

**Non-triggers:**
- When work is complete and verified
- For Quick mode tasks (no pause needed)

**Procedure (5 steps):**
1. Complete current verification cycle — don't pause mid-check, finish current step or revert to last clean state
2. Update checkpoint — run vstack-context-reset to update PROGRESS.md, include: exact next action, verified work, open questions, blockers, record branch/commit/uncommitted changes
3. Clean workspace — stash or commit uncommitted changes with clear message, clean build artifacts/temp files, note intentional dirty state
4. Record pause — timestamp, reason for pause, expected resume time, any external side effects (running services, test data)
5. Verify resumability — next action specific and actionable, no ambiguous state, checkpoint matches repository state

**Output:**
- Updated PROGRESS.md
- Clean or documented workspace
- Pause record in ledger/runtime

**Verification:**
- vstack-session-pickup would resume cleanly
- No partial/failed changes left ambiguous
- Next action unambiguous

**Evaluation cases:**
- Verification cycle completion before pause
- Checkpoint completeness
- Workspace cleanliness
- Resumability verification

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02