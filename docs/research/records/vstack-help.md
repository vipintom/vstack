# Research Record: vstack-help

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Skill selection — maps problem to skill families, selects 1-3 relevant skills, confirms fit by reading "When to Use", orders application.
- **What it explicitly does NOT own:** Skill execution (other skills), mode routing (mode), request clarification (sharpen)
- **How it differs from adjacent skills:**
  - `vstack-mode` = central router (help = skill catalog navigator)
  - `vstack-sharpen` = clarifies request (help = finds skills for clarified request)
  - `vstack-principles` = decision rules (help = finds skills, principles = guides decisions)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — help is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** brainstorming (finding intent) + writing-plans (finding approach)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/brainstorming/SKILL.md, skills/writing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers brainstorming:**
- Answer first: goal, problem, smallest change
- Explore intent before planning

**From poteto-mode principles:**
- Procedures over vague instructions: explicit skill selection process
- Encode Lessons in Structure: skill families as taxonomy

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Intent exploration | Problem-to-skill mapping |
| Skill families taxonomy | PRD Section 7.1.2 families |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core skill selection pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-mode | Both routing | mode = central, help = catalog navigator |
| vstack-sharpen | Both clarify | sharpen = clarifies request, help = selects skills |
| vstack-principles | Both guide | principles = decision rules, help = skill finder |

---

### vstack Design Decision

**Trigger conditions:**
- When starting a new task or delivery
- When stuck and unsure which skill applies
- When a skill references "related skills" you don't know

**Non-triggers:**
- When you already know the exact skill needed

**Procedure (5 steps):**
1. State the problem in one sentence
2. Map to skill families (from PRD Section 7.1.2):
   - Foundation & operation → vstack-mode, vstack-principles, vstack-help
   - Understanding & discovery → vstack-sharpen, vstack-how, vstack-why, vstack-blast-radius, vstack-explain, vstack-recall
   - Architecture & design → vstack-architect, vstack-blueprint, vstack-arena
   - Planning → vstack-plan-loop, vstack-plan-review
   - Implementation → vstack-tdd, vstack-incremental-build, vstack-refactor, vstack-unslop
   - Verification → vstack-verify-loop, vstack-create-verification, vstack-maintain-verification
   - Debugging & recovery → vstack-debug, vstack-unstick, vstack-recovery
   - Review → vstack-review-loop, vstack-jury, vstack-interrogate, vstack-review-rubrics
   - Continuity → vstack-context-reset, vstack-safe-pause, vstack-session-pickup, vstack-ledger, vstack-lessons
   - Delivery/PR → vstack-pr, vstack-watch-pr, vstack-ready, vstack-ship
   - Specialist → vstack-performance, vstack-runtime-forensics, vstack-trace-forensics, vstack-visual-parity
   - Isolation → vstack-worktree, vstack-best-of-n
3. Select 1-3 skills that directly address the problem
4. Read each skill's "When to Use" to confirm fit
5. Apply in sequence — complete one before starting the next

**Output:**
- Minimal set of relevant skills (1-3)
- Order of application

**Verification:**
- Each selected skill's "When to Use" matches the problem
- No skill selected "just in case"

**Evaluation cases:**
- Skill family mapping accuracy
- Skill selection precision (1-3 skills)
- "When to Use" confirmation
- Sequential application

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02