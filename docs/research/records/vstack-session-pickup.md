# Research Record: vstack-session-pickup

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Resuming or taking over in-flight work from a prior session — validates checkpoint, revalidates completed work, confirms next action.
- **What it explicitly does NOT own:** Creating checkpoints (safe-pause), executing work (playbooks), debugging (debug)
- **How it differs from adjacent skills:**
  - `vstack-safe-pause` = creates checkpoint (pickup = validates/resumes)
  - `vstack-catchup` = internal subroutine (merged into pickup)
  - `vstack-ledger` = decision trail (pickup reads ledger)
  - `vstack-mode` = re-invoked after pickup validates

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** session-pickup (playbook)
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode/playbooks/session-pickup.md
- **Date Inspected:** 2026-11-02
- **Key Files Read:** playbooks/session-pickup.md (via web search)

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-catchup
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode session-pickup playbook:**
- **Resume or take over** from transcript, cloud-agent URL, or pushed branch
- **Validate checkpoint** — read PROGRESS.md, verify git state matches
- **Revalidate completed work** — run tests for completed tasks
- **Confirm next action** — what was in progress, what's next
- **Catchup as internal subroutine** — reads ledger, validates git state
- **Decision trail** — show-me-your-work for audit

**From poteto-mode pause-safely playbook:**
- **Suspend cleanly** — checkpoint with completed work, next action, blockers
- **Explicit pause** / going offline / Cursor restart / context compaction
- **Complement to session pickup**

**From superpowers using-git-worktrees:**
- **Ledger/progress.md** — tracks completed tasks, BASE commits
- **Workspace per plan** — .superpowers/sdd/<plan>/
- **Resume from ledger** — tasks with "Task N: complete" are DONE, trust git log over memory

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| PROGRESS.md checkpoint | vstack: PROGRESS.md + .vstack/ state files |
| show-me-your-work decision trail | vstack-ledger |
| catchup as subroutine | Merged into pickup (per overlap decision) |
| Ledger identity line | Keep: "# SDD ledger — plan: <file>" |
| git clean -fdx destroys workspace | Fallback: ledger + git log recovery |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific transcript/cloud-agent URL
- .superpowers/sdd/ directory structure
- Specific worktree handling

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-safe-pause | Pause creates, Pickup resumes | Safe-pause = checkpoint creation, Pickup = validation/resumption |
| vstack-catchup | Internal to pickup | Merged into pickup (per Phase 0 decision) |
| vstack-ledger | Pickup reads ledger | Ledger = decision trail, Pickup = reads + validates |
| vstack-mode | Pickup re-invokes mode | Pickup validates, then mode re-invoked for next phase |

---

### vstack Design Decision

**Trigger conditions:**
- "Continue from yesterday" / "Resume work"
- "Pick up where we left off"
- New session after safe-pause
- Taking over another agent's in-flight work

**Non-triggers:**
- Starting fresh work → mode
- Creating checkpoint → safe-pause
- Debugging → debug

**Procedure:**
1. **Validate checkpoint** — read PROGRESS.md, verify git state matches
2. **Revalidate completed work** — run tests for completed tasks
3. **Confirm next action** — what was in progress, what's next
4. **Re-invoke vstack-mode** for next phase
5. **Handle context compaction** — trust ledger + git log over memory

**Checkpoint validation:**
- PROGRESS.md first line names current plan
- Tasks with "complete" have commits in git
- BASE commits match ledger
- No uncommitted work from completed tasks

**Revalidation:**
- Run project tests for completed task scope
- Evidence from completed tasks still valid
- No regression from external changes

**Output:**
- Validated checkpoint status
- Revalidation results
- Confirmed next action
- Mode re-invocation

**Evaluation cases:**
- Valid checkpoint with matching git state
- Revalidation passes for completed tasks
- Next action correctly identified
- Context compaction handled (trust ledger/git)
- Orphaned checkpoint handled (investigate)

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02