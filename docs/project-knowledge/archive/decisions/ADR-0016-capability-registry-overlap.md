# ADR-0016: Capability Registry and Overlap Analysis Process

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires that every reusable procedure has exactly one canonical owner and no unresolved material overlap among active content. Phase 0 established the capability registry and overlap analysis.

## Decision

**Establish a canonical capability registry and mandatory pairwise overlap analysis before any content is drafted.**

### Capability Registry (`docs/migration/capability-registry.csv`)

One row per canonical content item with:
- ID / canonical name
- Type (Mode, Playbook, Skill, Principle, Role, Resource, Adapter, Evaluation)
- One-sentence job (specific outcome this item owns)
- Positive triggers (conditions that should activate it)
- Negative triggers (neighbouring conditions that should not activate it)
- Inputs, Outputs, Procedure owner
- Responsibilities / Non-responsibilities
- Dependencies, Consumers
- External benchmarks (exact pack sources researched)
- Evaluation cases (positive, negative, procedure, failure)
- Disposition (rewrite, merge, split, rename, deprecate, remove, new)

### Overlap Analysis (`docs/migration/overlap-analysis.md`)

For every related pair/group, compare:
1. Trigger overlap: would the same user request activate both?
2. Outcome overlap: do they promise the same result?
3. Input overlap: do they require the same starting artifacts/context?
4. Procedure overlap: do they perform essentially the same steps?
5. Output overlap: do they create the same artifact/report/change?
6. Verification overlap: are they judged by the same completion predicate?
7. Ownership: can one own the shared procedure and the other reference it?

Decision rules:
- **Merge** when trigger, outcome, core procedure, output, verification are materially same
- **Keep separate** when task intent or method is meaningfully different
- **Split** when one file owns multiple unrelated task outcomes
- **Reference** when one needs another's method but doesn't own it
- **Retire** only when no distinct user value remains and consumers migrated

### Dependency Graph (`docs/migration/content-dependency-graph.md`)

Canonical owners, references, invokers, consumers. Identify and prohibit cycles in procedure ownership.

## Rationale

1. PRD Section 6.1: "One canonical procedure: Every reusable procedure has one owner; other content references it."
2. PRD Section 18.8: 11 known overlap areas require explicit decisions
3. Implementation Plan Section 6: Mandatory uniqueness and overlap-control system is a release-blocking requirement
4. Prevents duplicate procedures, contradictory triggers, and context bloat

## Consequences

- No skill/playbook enters drafting queue until its job and boundaries are recorded in capability registry
- Pairwise overlap decisions must be evidence-backed
- Human reviewer required for semantic overlap (text similarity tools insufficient)
- Validator catches deterministic defects (duplicate IDs, broken links, missing owners)

## References

- PRD Section 6.1: One canonical procedure
- PRD Section 18.8: Known overlap areas
- Implementation Plan Section 6: Mandatory uniqueness and overlap-control system
- Phase 0 deliverables: capability-registry.csv, overlap-analysis.md, content-dependency-graph.md