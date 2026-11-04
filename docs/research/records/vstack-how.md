# Research Record: vstack-how

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Runtime behavior tracing — execution paths, data flow, ownership boundaries, module responsibilities. Answers "how does X work?"
- **What it explicitly does NOT own:** Design rationale (why), change impact (blast-radius), implementation (tdd), debugging (debug)
- **How it differs from adjacent skills:**
  - `vstack-why` = design rationale, git history, ADRs (complementary, not overlapping)
  - `vstack-blast-radius` = change impact analysis (different question)
  - `vstack-debug` = failure reproduction and hypothesis testing (different phase)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** how
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/how
- **Commit/Revision:** main branch, commit 3fd1c05ec675e7225d51e19e8ec80b92217adfbf
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-explain (as closest — explains code behavior)
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (skill not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode how:**
- **Complexity assessment:** Simple (single module) vs Complex (subsystem) → different execution paths
- **Explorer/Explainer pattern:** Parallel explorers for angles, single explainer for synthesis
- **Read-only subagents:** Explicit readonly: true for explorers
- **Output format:** Overview, Key Concepts, How It Works, Where Things Live, Gotchas
- **Model selection:** Explorer = fast, Explainer = judgment model

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Cursor Task subagent with readonly | Abstract: "fresh context, no writes" — harness maps |
| pstack-models.mdc for model lines | Adapter handles model selection |
| generalPurpose subagent_type | Harness-specific agent dispatch |
| references/explainer-prompt.md | vstack can bundle reference prompts |
| 2-4 angles decomposition | Keep — good decomposition heuristic |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor Task tool with `subagent_type: generalPurpose`, `readonly: true`
- Specific model slugs (grok-4.7-xhigh-fast, claude-opus-5-5-xhigh)
- pstack-models.mdc configuration file dependency
- `run_in_background: true` specific to Cursor

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-why | Both investigate codebase | Triggers: how=runtime behavior, why=design rationale |
| vstack-blast-radius | Both trace callers | how=forward (execution), blast-radius=backward (impact) |
| vstack-debug | Both read code | debug=failure-focused, how=understanding-focused |
| vstack-explain | Both communicate findings | explain=synthesis/communication, how=raw tracing |

---

### vstack Design Decision

**Trigger conditions:**
- "How does X work?" / "Trace flow from A to B"
- "Walk me through the code path for..."
- "Where does Y happen in the code?"
- Read-only investigation of runtime behavior

**Non-triggers:**
- "Why was this designed this way?" → vstack-why
- "What breaks if I change X?" → vstack-blast-radius
- "Fix the bug in X" → bug-fixing playbook → vstack-debug

**Procedure:**
1. Assess complexity (simple vs complex)
2. Simple: single explainer explores + explains
3. Complex: 2-4 parallel explorers → single explainer synthesis
4. Present explainer output with light edits

**Output format:** Overview, Key Concepts, How It Works, Where Things Live, Gotchas

**Evaluation cases:**
- Simple module tracing
- Complex subsystem decomposition
- Explorer findings synthesis
- Read-only enforcement
- Output format completeness

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02