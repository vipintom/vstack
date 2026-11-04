# ADR-0019: Canonical Content Ownership and Single-Procedure Rule

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires that every reusable procedure has exactly one canonical owner. No duplication or overlap is allowed in the release.

## Decision

**Establish strict single-procedure ownership with explicit responsibilities and non-responsibilities for every skill and playbook.**

### Ownership Rules

1. **One canonical owner per reusable procedure** — No two active skills/playbooks own the same core method
2. **Every skill defines what it owns and explicitly does NOT own** — Non-responsibilities must be documented
3. **Playbooks orchestrate; specialist skills own detailed procedures** — Playbooks invoke skills by trigger, don't copy their full contents
4. **Principles express trigger-based decision rules** — They do not reproduce skill procedures
5. **Roles define responsibility/authority** — They do not duplicate methodology
6. **Adapters map canonical content to host capabilities** — They do not fork instructions
7. **Rubrics score artifacts** — They do not define hidden workflows
8. **Templates structure outputs** — They do not contain a second copy of the generating procedure
9. **References hold supporting material** — One owning skill/playbook; no unregistered parallel procedure

### Enforcement

- Capability registry records canonical owner per procedure
- Overlap analysis compares triggers, outcomes, procedures, outputs, verification
- Validator catches duplicate IDs, broken refs, missing owners, dependency cycles
- Human reviewer required for semantic overlap decisions
- Content review finding template includes "duplicated procedure" category

### Decision Record Template

For every merge/split/rename/retire decision:
- Evidence from pairwise comparison (triggers, outcomes, procedure, outputs, verification)
- Why distinct user value is or isn't preserved
- Migration path for consumers
- Recorded in `docs/migration/decision-records/`

## Rationale

1. PRD Section 6.1: "One canonical procedure: Every reusable procedure has one owner; other content references it."
2. PRD Section 6.2: Playbook vs Skill distinction is mandatory
3. PRD Section 18.3: "Do not optimise for file count... Keep no item merely to preserve the existing count"
4. Implementation Plan Section 2.3: "This is a release-blocking requirement, not a stylistic preference."
5. Implementation Plan Section 6.2: Detailed pairwise analysis required

## Consequences

- Phase 0 overlap decisions are binding for Phase 1-3 authoring
- 11 known overlap clusters have evidence-backed decisions
- New overlaps discovered during authoring must be resolved before stabilising
- Manifest must reflect canonical ownership (no duplicate entries)

## References

- PRD Section 6: Content architecture and ownership
- PRD Section 18.3: Migration objective
- PRD Section 18.8: Known overlap areas
- Implementation Plan Section 2.3: No duplication or overlap
- Implementation Plan Section 6: Mandatory uniqueness and overlap-control system
- Phase 0 deliverable: capability-registry.csv, overlap-analysis.md