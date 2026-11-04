# Research Record: vstack-mode

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Central routing/entry point for all non-trivial engineering work. Selects the single primary playbook, calibrates rigour, creates verbatim checklist, executes with skill triggers, handles reassessment, hands back.
- **What it explicitly does NOT own:** Implementation procedures (those belong to playbooks/skills), principle content (principles are leaf files), skill procedures (skills are separate).
- **How it differs from adjacent skills:** 
  - `vstack-figure-it-out` = bespoke playbook design when NO standard playbook fits (mode's non-trigger)
  - `vstack-sharpen` = Phase 1 only (mode invokes it)
  - `vstack-principles` = principle loading (mode reads index, loads leaves on demand)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** poteto-mode
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode
- **Commit/Revision:** main branch, commit ab1f702ce8e8b6557edb56b09f52cde8bfb83f17 (2026-10-27)
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md, playbooks/investigation.md, playbooks/bug-fix.md, playbooks/feature.md, playbooks/refactoring.md, playbooks/figure-it-out.md

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** brainstorming + writing-plans (as routing equivalents)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/brainstorming/SKILL.md, skills/writing-plans/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode:**
- **Trigger hierarchy:** Clear request classification before any work
- **Playbook routing table:** 23 playbooks with explicit triggers
- **Principles as decision rules:** Principles named when they shape a choice
- **Subagent defaults:** Background execution, model per role, fresh context per task
- **Todolist protocol:** Verbatim copy of playbook steps, skip with reason
- **Phase gates:** Never-block-on-human for reversible, always-pause for irreversible
- **Decision trail:** show-me-your-work for ambitious work

**From superpowers:**
- **Brainstorming first:** Intent capture before planning
- **Writing plans:** Plan before execution, with spec as authority
- **Self-review checklists:** Spec coverage, step scan, type consistency, review focus

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Cursor-specific model slugs | Abstract: "judgment model", "fast code model" — harness chooses |
| `/loop` command | General: "re-invoke mode for next phase" |
| Custom mode (opt+enter) | Portable: explicit re-invocation |
| pstack-models.mdc rule | No global config file; adapter handles harness specifics |
| CDP browser verification | Abstract: "verify against real artifact" |
| gh PR integration | Abstract: "PR workflow per project" |

---

### Host/Vendor-Specific Mechanics to Reject

- **Cursor-only:** Custom mode persistence, `/loop`, CDP, gh CLI, specific model slugs
- **Model/vendor deps:** grok-4.7-xhigh-fast, claude-opus-5-5-xhigh — abstract to capability tiers
- **Unsupported tools:** Task tool with subagent_type, environment: cloud, run_in_background
- **Unnecessary ceremony:** Full autonomy grants, session overrides, opt-in checkpoints

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap Risk | Resolution |
|---|---|---|
| vstack-figure-it-out | Mode selects it when no playbook fits | Mode's non-triggers list figure-it-out triggers explicitly |
| vstack-sharpen | Mode Phase 1 = sharpen | Mode invokes sharpen, doesn't duplicate |
| vstack-principles | Mode reads principle index | Mode loads index, delegates leaf loading to principles skill |
| Direct skill invocation | Bypasses mode | Mode supports direct invocation as explicit non-trigger |

---

### Licence/Attribution Notes

- **Source licence:** MIT (cursor/plugins)
- **Attribution required:** Yes (MIT requires notice)
- **Code/text copied:** No verbatim copying — all vstack-mode content is original design inspired by patterns

---

### vstack Design Decision

**Final trigger conditions:**
- ANY non-trivial engineering request (new behavior, defect, refactor, architecture, investigation, etc.)
- Explicit user request for mode routing
- NOT: trivial edits (typo, config tweak), read-only questions that fit investigation playbook

**Procedure outline (9 phases):**
1. Frame Outcome — sharpen request, falsifiable done predicate
2. Read Principle Index — compact index, load leaves on demand
3. Classify Request — 21 request shapes → playbook
4. Select Primary Playbook — narrowest suitable
5. Calibrate Rigour — risk-based, user may override
6. Create Task Checklist — verbatim copy, skip with reason
7. Execute Playbook — skill triggers, reassessment
8. Verify and Review — evidence, review requirements
9. Hand Back — outcome, decisions, evidence, risks, next action

**Output/evidence specifications:**
- Checklist with verbatim playbook steps + skip reasons
- Per-phase verification evidence
- Decision trail with evidence pointers
- Final report with 5 sections

**Stop/escalation/fallback:**
- Missing capability → honest fallback (sequential, directory isolation)
- Unresolvable → BLOCKED with reason
- User pause → SAFE_PAUSE checkpoint

**Evaluation cases this research suggests:**
- Trivial vs non-trivial routing (must NOT activate for typo)
- Read-only vs implementation classification
- Correct playbook selection for 4+ request classes
- figure-it-out trigger when no playbook fits
- Risk-based rigour calibration
- Verbatim checklist copy
- Explicit skip reasons
- Direct skill invocation bypass
- Capability fallbacks
- Task rerouting on new evidence

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02