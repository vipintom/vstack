# Research Record: vstack-blast-radius

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Change impact analysis — identifying affected callers, components, data contracts, external behaviour, failure paths, and rollout requirements for a proposed change.
- **What it explicitly does NOT own:** Current behaviour discovery (how), design rationale (why), implementation planning (plan-loop), implementation (tdd)
- **How it differs from adjacent skills:**
  - `vstack-how` = prerequisite (current behaviour understanding)
  - `vstack-why` = historical constraints for migration rationale
  - `vstack-plan-loop` = consumes blast radius for implementation planning
  - `vstack-architect` = uses blast radius for design alternatives

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue in pstack — blast-radius is vstack-specific impact analysis)
- **Repository URL:** N/A
- **Date Inspected:** 2026-11-02

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** writing-plans (impact assessment as part of planning) + systematic-debugging (dependency tracing)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/writing-plans/SKILL.md, skills/systematic-debugging/SKILL.md

---

### Patterns Worth Adopting

**From superpowers writing-plans:**
- Risk-based depth scaling
- Explicit dependency identification
- Migration/rollback planning

**From superpowers systematic-debugging:**
- Backward tracing from symptom to source (adapted for change impact)
- Component boundary evidence gathering

**From poteto-mode principles:**
- Procedures over vague instructions: explicit 9-step procedure
- Model domain explicitly: data contracts, external integrations, failure paths

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Plan risk assessment | Blast radius as standalone skill with 9 steps |
| Debugging backward tracing | Forward/transitive dependency tracing |
| Migration planning | Explicit rollout/rollback requirements |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core impact analysis pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-how | Both trace code | how = current behaviour, blast-radius = change impact |
| vstack-why | Both use history | why = design rationale, blast-radius = migration constraints |
| vstack-plan-loop | Both planning | blast-radius = input, plan-loop = implementation plan |
| vstack-architect | Both design | architect = alternatives, blast-radius = impact of chosen design |

---

### vstack Design Decision

**Trigger conditions:**
- "What breaks if I change X?" / "Blast radius of..."
- Before any change with meaningful scope or risk
- Planning migrations or breaking changes
- When vstack-how reveals complex dependencies
- As input to vstack-plan-loop

**Non-triggers:**
- Trivial/local changes (one-line fixes, typos)
- When blast radius obviously minimal and documented
- Current behaviour questions → vstack-how

**Procedure (9 steps):**
1. Identify directly affected modules (files modified, dependents, public APIs)
2. Trace callers and dependents (grep/IDE, transitive dependencies, test files)
3. Analyze data contracts (schema changes, migration requirements, persisted state)
4. Identify external integrations (downstream services, upstream providers, CI/CD)
5. Map failure and retry paths (error handling, retry logic, timeouts, circuit breakers)
6. Assess permissions and security boundaries (authz, data access, audit/logging)
7. Evaluate performance and resource implications (complexity, DB queries, cache)
8. Determine rollout requirements (canary/flags, rollback, monitoring)
9. Scale depth to risk (low: direct callers; medium: transitive + contracts; high: full closure + external + performance)

**Output:**
- Affected modules list (direct + transitive)
- Public API changes
- Data contract changes + migration needs
- External integration impacts
- Failure path changes
- Security/permission implications
- Performance/resource impact assessment
- Rollout/rollback requirements

**Verification:**
- All direct callers identified
- No unknown external dependencies
- Migration plan exists for contract changes
- Rollback procedure documented

**Evaluation cases:**
- Low/medium/high risk scaling
- Transitive dependency tracing
- Data contract change identification
- External integration mapping
- Rollback procedure completeness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02