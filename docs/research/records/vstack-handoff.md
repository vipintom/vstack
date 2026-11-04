# Research Record: vstack-handoff

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Context transfer between workers/roles/sessions — creates complete handoff package with objective, scope, completed work, next action, blockers, key facts, decisions, failed approaches, verification status.
- **What it explicitly does NOT own:** Checkpoint creation (context-reset), session resumption (session-pickup), safe pause (safe-pause), decision ledger (ledger)
- **How it differs from adjacent skills:**
  - `vstack-context-reset` = checkpoint at boundaries (handoff = specific transfer to recipient)
  - `vstack-session-pickup` = validates and resumes (handoff = prepares for pickup)
  - `vstack-safe-pause` = planned pause with cleanup (handoff = transfer document)
  - `vstack-ledger` = decision trail (handoff = references ledger)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — handoff is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** executing-plans (brief as spec, ledger as memory) + using-git-worktrees (workspace per plan)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/executing-plans/SKILL.md, skills/using-git-worktrees/SKILL.md

---

### Patterns Worth Adopting

**From superpowers executing-plans:**
- Brief is the spec
- Ledger is your memory
- Final reviewer is second pair of eyes

**From superpowers using-git-worktrees:**
- Ledger/progress.md tracks completed tasks
- Workspace per plan with context isolation
- Trust git log over memory

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Brief as spec | Handoff package with exact next action |
| Ledger as memory | Reference ledger entries |
| Workspace per plan | Handoff enables recipient's workspace |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core handoff pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-context-reset | Both context | context-reset = checkpoint, handoff = transfer |
| vstack-session-pickup | Both resumption | handoff = prepares, pickup = validates/resumes |
| vstack-safe-pause | Both pause | safe-pause = cleanup, handoff = transfer doc |
| vstack-ledger | Both decisions | ledger = trail, handoff = references |

---

### vstack Design Decision

**Trigger conditions:**
- Worker completing a task (→ Lead)
- Session ending with work in progress (→ next session)
- Switching roles (Builder → Reviewer)

**Non-triggers:**
- For routine check-ins (use tool updates)
- When no context transfer needed

**Procedure (4 steps):**
1. Prepare handoff package — objective, scope, completed (with evidence), incomplete, next action, blockers, key facts, decisions, failed approaches, verification status
2. Validate completeness — all contract items addressed, evidence referenced, no ambiguous next steps
3. Transfer context — update PROGRESS.md, update runtime task state, brief recipient
4. Recipient validates — vstack-catchup or vstack-session-pickup, confirms understanding, begins from exact next action

**Output:**
- Complete handoff document/checkpoint
- Updated PROGRESS.md or task state
- Recipient ready to proceed

**Verification:**
- Recipient can articulate next action
- No information loss
- Evidence traceable

**Evaluation cases:**
- Handoff completeness
- Next action specificity
- Recipient validation
- Evidence traceability

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02