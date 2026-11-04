# Research Record: vstack-recall

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Project knowledge retrieval — finding relevant conventions, decisions, past failures, and constraints without treating historical context as current truth.
- **What it explicitly does NOT own:** Current runtime behaviour (how), design rationale (why), session resumption (session-pickup), lesson patterns (lessons)
- **How it differs from adjacent skills:**
  - `vstack-how` = validates current conventions against code
  - `vstack-why` = validates historical rationale
  - `vstack-session-pickup` = formal resume with checkpoint validation
  - `vstack-lessons` = provides failure patterns to avoid
  - `vstack-catchup` = merged into session-pickup (internal subroutine)
  - `vstack-ledger` = decision history source

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — recall is vstack-specific knowledge retrieval)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** using-git-worktrees (ledger/progress.md for context) + systematic-debugging (historical context)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/using-git-worktrees/SKILL.md

---

### Patterns Worth Adopting

**From superpowers using-git-worktrees:**
- Ledger/progress.md as source of truth
- Trust git log over memory
- Workspace per plan with context isolation

**From poteto-mode principles:**
- Attack the Premise: don't assume old context is current
- Evidence before assertions: validate conventions against current code

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Ledger per plan | Project memory + ADRs + PROGRESS.md + git log |
| Currency tagging | Explicit current/historical/superseded/unknown tags |
| Validation against code | Mandatory step: validate conventions against current code |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific project memory plugin (fallback to manual search)

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-how | Both validate | how = runtime behaviour, recall = conventions/history |
| vstack-why | Both use history | why = design rationale, recall = project conventions |
| vstack-session-pickup | Both resume context | session-pickup = checkpoint validation, recall = knowledge retrieval |
| vstack-catchup | Merged into session-pickup | catchup = internal subroutine of pickup |
| vstack-ledger | Both use decisions | ledger = decision trail, recall = consumes ledger |
| vstack-lessons | Both use past failures | lessons = patterns, recall = retrieves relevant lessons |

---

### vstack Design Decision

**Trigger conditions:**
- "What are the conventions for X?" / "Recall project context"
- Before starting work to understand project context
- When how/why need historical background
- When planning to avoid past mistakes
- When lessons suggests relevant patterns

**Non-triggers:**
- Current runtime behaviour → vstack-how
- Design rationale → vstack-why
- Session resumption → vstack-session-pickup
- Fresh project (no accumulated knowledge)

**Procedure:**
1. Identify relevant knowledge categories (architecture decisions, conventions, known issues, verification procedures, past failures)
2. Query project memory (if plugin available) — search by category/tags/keywords, filter by validation date, note superseded
3. Check decision ledger/ADRs — relevant decisions, pivots, superseded decisions
4. Review recent checkpoints — PROGRESS.md, failed approaches, open questions
5. Distinguish current vs historical — tag each finding: current | historical | superseded | unknown
6. Synthesize relevant context — conventions to follow, constraints, past mistakes to avoid, expected verification

**Output:**
- Relevant project knowledge summary
- Each finding tagged with currency status
- Conventions and constraints for current work
- Past failures/lessons applicable to current task

**Verification:**
- No stale convention presented as current
- Superseded decisions clearly marked
- Validation dates noted for memory items

**Evaluation cases:**
- Currency tagging accuracy
- Convention validation against current code
- Superseded decision identification
- Fallback without plugin (manual ADR/git search)
- Time-box adherence (10-15 min)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02