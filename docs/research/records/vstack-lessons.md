# Research Record: vstack-lessons

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Pattern-to-improvement conversion — identifies recurring mistakes, analyzes root cause, designs improvement (check, convention, template, skill, memory entry), implements, verifies against history.
- **What it explicitly does NOT own:** Active debugging (debug), active review (review-loop), checkpoint (context-reset), skill authoring (skill-authoring)
- **How it differs from adjacent skills:**
  - `vstack-debug` = active failure investigation (lessons = post-delivery pattern analysis)
  - `vstack-review-loop` = implementation review (lessons = historical pattern analysis)
  - `vstack-context-reset` = preserves lessons (lessons = creates improvements)
  - `vstack-skill-authoring` = creates skills (lessons = may produce skill updates)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — lessons is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (findings may reveal patterns) + brainstorming (intent)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, skills/brainstorming/SKILL.md

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Findings may reveal patterns
- Technical evaluation, not emotional agreement

**From poteto-mode principles:**
- Encode Lessons in Structure: catch yourself writing same instruction twice → encode as lint, metadata flag, runtime check, or script
- Procedures over vague instructions

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Encode lessons in structure | Improvement types: check, convention, template, skill, memory entry |
| Must always apply | Part of delivery completion |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core lessons pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-debug | Both failure | debug = active, lessons = post-delivery pattern |
| vstack-review-loop | Both review | review-loop = current, lessons = historical |
| vstack-context-reset | Both continuity | context-reset = preserves, lessons = creates |
| vstack-skill-authoring | Both skills | lessons = may trigger, skill-authoring = creates |

---

### vstack Design Decision

**Trigger conditions:**
- After completing a delivery
- When a pattern of failures/bugs/rework emerges
- During retrospective or review
- When vstack-debug reveals systemic issue

**Non-triggers:**
- For one-off incidents
- During active implementation (use vstack-debug)

**Procedure (6 steps):**
1. Identify the pattern — what keeps happening? (Same bug type? Same review finding? Same debug cycle?)
2. Analyze root cause — why does it recur? (Missing check? Unclear convention? Bad default? Knowledge gap?)
3. Design improvement — what prevents recurrence? (New check/assertion? Convention update? Template/pattern? Skill update? Project memory entry?)
4. Implement improvement — add check, update doc, create template
5. Verify — would this have caught the last 3 occurrences?
6. Record in project memory — lesson, improvement, validation

**Output:**
- Pattern description with examples
- Root cause analysis
- Implemented improvement (check, doc, template, skill)
- Project memory entry

**Verification:**
- Improvement addresses root cause, not symptom
- Improvement would have caught historical occurrences
- Improvement is enforceable/checkable (not just documentation)

**Evaluation cases:**
- Pattern identification
- Root cause analysis
- Improvement effectiveness
- Historical validation

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02