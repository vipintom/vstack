# Research Record: vstack-blueprint

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Detailed design specification — turning an accepted architecture into interfaces, components, data flows, implementation boundaries, and verification strategy.
- **What it explicitly does NOT own:** Architectural exploration (architect), implementation planning (plan-loop), implementation (incremental-build/tdd), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-architect` = explores alternatives, selects design (blueprint consumes architect's output)
  - `vstack-plan-loop` = implementation task planning (consumes blueprint)
  - `vstack-incremental-build` = implementation approach (uses blueprint boundaries)
  - `vstack-how` = current system boundaries (prerequisite)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — blueprint is vstack-specific detailed design)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-blueprint (closest analogue for detailed design)
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode architect (Phase B/C):**
- Usage sketch first (caller perspective)
- Interface depth principle
- Sketch as contract for implementation

**From superpowers writing-plans:**
- Exact interfaces and names
- Exact test per task
- DRY, YAGNI

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Architect's usage sketch | Blueprint's component interfaces (caller perspective) |
| Architect's type sketch | Blueprint's data flows, implementation boundaries |
| Plan exact interfaces | Blueprint specifies interfaces, plan-loop creates tasks |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core detailed design pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-architect | Both design | architect = alternatives + selection, blueprint = detailed spec of selected |
| vstack-plan-loop | Both plan | blueprint = what to build, plan-loop = how to sequence tasks |
| vstack-how | Both boundaries | how = current boundaries, blueprint = new boundaries |
| vstack-incremental-build | Both implementation | blueprint = spec, incremental-build = implementation approach |

---

### vstack Design Decision

**Trigger conditions:**
- "Blueprint this" / "Specify interfaces for..."
- After vstack-architect selects a design
- Before vstack-plan-loop for implementation planning
- When decomposing a feature into implementable units

**Non-triggers:**
- Architectural exploration → vstack-architect
- Trivial changes with obvious implementation
- No accepted architecture decision

**Procedure (6 steps):**
1. Define component interfaces — public APIs (signatures, contracts, schemas), internal module boundaries, error/event contracts
2. Design data flows — input validation/transformation, state transitions/persistence, inter-component communication, serialization boundaries
3. Specify implementation boundaries — files/modules to create/modify, ownership per component, shared utilities vs component-specific
4. Plan implementation sequence — dependency order, integration points, test boundaries
5. Define migration strategy (if applicable) — schema migrations, data migration scripts, backward compatibility, rollback procedure
6. Identify verification approach — unit test boundaries, integration test scenarios, contract tests, performance baselines

**Output:**
- Component interface specifications
- Data flow descriptions
- Implementation task breakdown
- Migration plan (if applicable)
- Verification strategy

**Verification:**
- All components have defined interfaces
- Dependencies are acyclic
- Migration plan addresses all breaking changes
- Verification strategy covers acceptance criteria

**Evaluation cases:**
- Interface completeness
- Acyclic dependencies
- Migration plan for breaking changes
- Verification strategy coverage
- Time-box adherence (30-60 min)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02