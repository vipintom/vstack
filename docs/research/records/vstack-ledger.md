# Research Record: vstack-ledger

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Decision trail — append-only record of consequential decisions, pivots, failed approaches, and evidence references.
- **What it explicitly does NOT own:** Checkpoint creation (context-reset), session resumption (session-pickup), safe pause (safe-pause), recovery (recovery)
- **How it differs from adjacent skills:**
  - `vstack-context-reset` = checkpoint snapshot (ledger = append-only trail)
  - `vstack-session-pickup` = reads ledger (ledger = writes trail)
  - `vstack-safe-pause` = records pause (ledger = records decisions)
  - `vstack-recovery` = records recovery (ledger = records decisions)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — ledger is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** using-git-worktrees (ledger/progress.md)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/using-git-worktrees/SKILL.md

---

### Patterns Worth Adopting

**From superpowers using-git-worktrees:**
- Ledger identity line: "# SDD ledger — plan: <file>"
- Ledger tracks completed tasks with BASE commits
- Trust git log over memory

**From poteto-mode principles:**
- Encode Lessons in Structure: decision recording as structured entries
- Evidence Before Assertions: every entry has evidence references

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Ledger identity line | Keep: append-only with timestamp/workflow phase |
| BASE commits | Link entries to commits |
| Append-only | Supersede with new entry, don't delete |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core ledger pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-context-reset | Both state | context-reset = snapshot, ledger = trail |
| vstack-session-pickup | Both resumption | pickup = reads ledger, ledger = writes |
| vstack-safe-pause | Both pause | safe-pause = records pause, ledger = records decisions |
| vstack-unstick | Both triggers | unstick = triggers ledger entry |

---

### vstack Design Decision

**Trigger conditions:**
- For consequential decisions (architecture, design, process)
- When vstack-unstick changes approach
- When vstack-recovery restores state
- For Extended execution profile

**Non-triggers:**
- For routine minor actions
- For decisions already in ADRs or project memory

**Procedure (4 steps):**
1. Identify decision point — what choice was made, what alternatives considered, what triggered the decision
2. Record concisely — timestamp, workflow phase, decision summary, alternatives (brief), chosen option, rationale summary, evidence references, related task/delivery, outcome (if known)
3. Append, don't edit — ledger is append-only, supersede with new entry (don't delete old), mark superseded entries explicitly
4. Link to artifacts — ADR reference, commit/diff, evidence records, PROGRESS.md checkpoint

**Output:**
- Ledger entry (append to ledger file)
- Cross-references to evidence/ADRs

**Verification:**
- Decision recorded with rationale
- Evidence references valid
- Supersession explicit

**Evaluation cases:**
- Consequential decision identification
- Append-only compliance
- Evidence reference validity
- Supersession marking

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02