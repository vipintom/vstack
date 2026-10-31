---
name: vstack-discovery
description: Investigate repository, architecture, behaviour and constraints
---

# vstack-discovery

## When to Use
- Before planning substantial changes
- When entering an unfamiliar codebase area
- When `vstack-sharpen` reveals unknowns
- When `vstack-blast-radius` requires deeper understanding

## When Not to Use
- For trivial, well-understood changes (typos, config tweaks)
- When discovery already completed and documented in project memory

## Required Context
- Sharpened problem statement (from `vstack-sharpen`)
- Repository access
- Project memory (architecture, conventions) if available

## Procedure

1. **Define discovery scope** — files, modules, systems relevant to the problem
2. **Read, don't guess** — Use grep, glob, read tools to understand actual code
3. **Map the territory**:
   - Entry points and interfaces
   - Data flow and state management
   - Dependencies (internal and external)
   - Existing patterns and conventions
   - Tests and how they work
4. **Identify constraints**:
   - Hard limits (APIs, schemas, contracts)
   - Soft conventions (style, patterns, review standards)
   - Technical debt and known issues
4. **Document findings** in project memory (if plugin available) or local notes:
   - Architecture summary
   - Key files and their responsibilities
   - Constraints and pitfalls
   - Open questions
5. **Summarize for planning** — What's fixed, what's flexible, what's risky

## Expected Outputs
- Discovery summary (architecture, key files, data flow, constraints)
- Updated project memory (if available)
- List of open questions for planning

## Verification
- Can explain the relevant system behavior to another engineer
- Key files located and understood
- Constraints documented with sources

## Stop Conditions
- Sufficient understanding to plan (not exhaustive knowledge)
- Time-boxed (default: 30-60 min for features, 10-15 min for bugs)

## Escalation
- Cannot understand critical area → escalate to Lead for expertise
- Discovery reveals fundamental misalignment → return to `vstack-sharpen`

## Related Skills
- `vstack-sharpen` — precedes discovery
- `vstack-blueprint` — uses discovery for design
- `vstack-blast-radius` — uses discovery for impact analysis
- `vstack-context-reset` — preserves discovery context