# Research Record: vstack-architect

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Cross-boundary design — types, signatures, module structure, boundaries. Sketch before code, synthesize alternatives, fill in against chosen sketch.
- **What it explicitly does NOT own:** Implementation (tdd), verification (verify-loop), runtime behavior (how), rationale (why), parallel execution (swarm)
- **How it differs from adjacent skills:**
  - `vstack-arena` = parallel candidate generation for specific artifacts (architect invokes arena)
  - `vstack-blueprint` = detailed interfaces/components (architect produces sketch, blueprint refines)
  - `vstack-figure-it-out` = bespoke playbook design (architect is for cross-boundary design within a playbook)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** architect
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/architect
- **Commit/Revision:** main branch, commit 29891f4b7ff7e4824d0742b15cf920bd428e12e8
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-blueprint
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (skill not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode architect:**
- **Phase A: Ground** — how + why on relevant subsystems before sketching
- **Phase B: Sketch** — arena with design-sketch task, require 2+ structurally distinct candidates
- **Red flags screening:** references/design-red-flags.md before synthesis
- **Interface depth principle:** Prefer design that hides complexity behind smaller public surface
- **Phase C: Agree (opt-in)** — checkpoint only when explicitly asked
- **Phase D: Implement against sketch** — sketch is contract, deviations = signal
- **Phase E: Scrap when wrong** — pattern-based triggers (workarounds, escape hatches, lock reflex, caller knowledge)
- **Outputs:** Usage sketch first, then type sketch; rationale per template

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| arena runners from pstack-models.mdc | Abstract: "judgment model + fast model" — adapter config |
| arena cross-judge pool | Capability tier: "cross-judge from different family" |
| Auto/inherit-parent model handling | Adapter handles model resolution |
| Task tool with specific models | Abstract: "dispatch with model capability" |
| git worktree for arena candidates | Fallback: directory isolation |
| references/design-red-flags.md | vstack can bundle as reference |
| references/rationale-template.md | vstack can bundle as reference |

---

### Host/Vendor-Specific Mechanics to Reject

- pstack-models.mdc for runner selection
- Specific model slugs (claude-opus-5-5-xhigh, grok-4.7-xhigh-fast)
- Cursor Task tool with model parameter
- Cursor-specific worktree handling

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-arena | Architect invokes arena for design alternatives | Architect = design process, Arena = candidate generation mechanism |
| vstack-blueprint | Architect produces sketch, Blueprint refines | Architect = alternatives + selection, Blueprint = detailed interfaces |
| vstack-figure-it-out | Both design | Figure-it-out = bespoke playbook, Architect = cross-boundary design within playbook |
| vstack-swarm | Both parallel | Swarm = parallel workers for coverage/races, Architect = design synthesis |

---

### vstack Design Decision

**Trigger conditions:**
- "Architect this" / "Design this"
- Cross-boundary work (new module boundaries, data flows, contracts)
- Non-trivial work where jumping to code would lock in wrong shape
- Explicit user request for design phase

**Non-triggers:**
- Straightforward implementation (no design alternatives) → skip
- Single-module changes without boundary implications → skip
- Pure implementation tasks → feature-delivery playbook without architect

**Procedure (5 phases):**
1. **Ground** — how + why on relevant subsystems
2. **Sketch** — arena with design-sketch, 2+ distinct candidates, red-flags screening
3. **Agree (opt-in)** — checkpoint only when explicitly requested
4. **Implement** — fill in sketch, deviations = signal
5. **Scrap** — pattern triggers: workarounds, escape hatches, lock reflex, caller knowledge

**Outputs:**
- Usage sketch (caller perspective first)
- Type sketch (signatures, module map)
- Rationale per template (usage + synthesis decision)

**Evaluation cases:**
- Grounding with how/why before sketch
- 2+ structurally distinct candidates
- Red-flags screening
- Opt-in checkpoint behavior
- Scrap triggers on pattern
- Implement against sketch contract

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02