# Research Record: vstack-context-reset

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Checkpoint creation and context preservation at boundaries — summarizes completed work, records decisions, lists open questions, defines next actions for resumption.
- **What it explicitly does NOT own:** Session resumption (session-pickup), safe pause (safe-pause), decision ledger (ledger), recovery (recovery)
- **How it differs from adjacent skills:**
  - `vstack-session-pickup` = validates checkpoint and resumes (context-reset = creates checkpoint)
  - `vstack-safe-pause` = planned pause with full cleanup (context-reset = checkpoint at any boundary)
  - `vstack-ledger` = decision trail (context-reset = checkpoint snapshot)
  - `vstack-handoff` = worker-to-lead transfer (context-reset = general boundary checkpoint)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — context management is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** using-git-worktrees (ledger/progress.md) + executing-plans (brief as spec)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/using-git-worktrees/SKILL.md, skills/executing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers using-git-worktrees:**
- Ledger/progress.md tracks completed tasks and BASE commits
- Trust git log over memory
- Workspace per plan with context isolation

**From superpowers executing-plans:**
- Brief is the spec
- Ledger is your memory
- TDD is the per-task gate

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Progress.md per plan | PROGRESS.md checkpoint at boundaries |
| Git log trust | Verify actual state vs recorded state |
| Brief as spec | Next action is exact spec for resumption |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core checkpoint pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-session-pickup | Both use checkpoint | context-reset = creates, session-pickup = validates/resumes |
| vstack-safe-pause | Both checkpoint | safe-pause = planned pause, context-reset = any boundary |
| vstack-ledger | Both record decisions | ledger = append-only trail, context-reset = snapshot |
| vstack-handoff | Both transfer context | handoff = specific recipient, context-reset = general |

---

### vstack Design Decision

**Trigger conditions:**
- At natural boundaries (task complete, before review, end of session)
- When context window is filling
- When handing off to another agent/session
- When resuming interrupted work

**Non-triggers:**
- Mid-implementation without a boundary
- When context is still sufficient

**Procedure (2 phases):**

**At Boundary (Preserve):**
1. Summarize completed work — what was done, evidence, decisions
2. Record current state — task status, blockers, partial progress
3. Document decisions — what was chosen, why, alternatives rejected
4. List open questions — unknowns, pending decisions, risks
5. Define next actions — specific, actionable, ordered
6. Store in project memory (if plugin) or handoff document

**At Resumption (Restore):**
1. Read handoff/memory — objective, completed, decisions, open items
2. Verify current state — check actual code vs recorded state
3. Validate assumptions — run quick checks if needed
4. Confirm next action — proceed from documented next step

**Output:**
- Handoff summary (objective, completed, decisions, open, next)
- Or: verified resumption with confirmed state

**Verification:**
- Handoff enables fresh agent to continue without re-discovery
- Resumption verifies actual state matches recorded state
- No completed work re-done

**Evaluation cases:**
- Checkpoint completeness
- State verification on resumption
- Next action specificity
- Decision documentation

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02