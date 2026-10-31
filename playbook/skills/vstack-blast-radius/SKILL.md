---
name: vstack-blast-radius
description: Identify affected callers, contracts, dependencies and failure paths
---

# vstack-blast-radius

## When to Use
- Before changes to shared interfaces, schemas, or core modules
- When `vstack-discovery` reveals wide dependency surface
- When planning refactors or migrations
- When Lead requests risk assessment

## When Not to Use
- For isolated, leaf-node changes
- For changes with obvious local scope

## Required Context
- Target change description
- Discovery summary (call graph, interfaces, data flow)
- Project architecture

## Procedure

1. **Identify the change boundary** — what files, types, interfaces, APIs
2. **Trace callers** — upstream consumers (grep for imports, references, usages)
3. **Trace dependencies** — downstream providers (what the change depends on)
4. **Analyze contracts** — schemas, APIs, invariants, error modes
5. **Map failure paths** — what breaks if change is wrong:
   - Compile-time (type errors)
   - Test-time (behavior changes)
   - Runtime (contract violations, data corruption)
   - Deployment (migration, compatibility)
6. **Categorize impact**:
   - **Local** — single module, no external callers
   - **Module** — internal callers, controlled boundary
   - **System** — cross-module, shared contracts
   - **External** — API consumers, data migrations, integrations
7. **Define mitigation** per category:
   - Local: standard review, tests
   - Module: integration tests, consumer notification
   - System: staged rollout, backward compatibility, migration plan
   - External: versioning, deprecation policy, consumer coordination
8. **Record assessment** — boundary, impact category, mitigations

## Expected Outputs
- Caller/dependency map
- Contract analysis
- Failure path enumeration
- Impact category with mitigations
- Risk level for plan

## Verification
- Caller trace covers known entry points
- Contracts identified match actual interfaces
- Mitigations address each failure path

## Stop Conditions
- Impact category assigned and mitigations defined
- Ready for `vstack-plan-loop` with appropriate risk level

## Escalation
- External impact without migration path → escalate to Lead/architect
- Unknown callers in external systems → document as risk, proceed with caution

## Related Skills
- `vstack-discovery` — provides caller/dependency data
- `vstack-blueprint` — uses blast radius for design criteria
- `vstack-plan-loop` — consumes risk assessment