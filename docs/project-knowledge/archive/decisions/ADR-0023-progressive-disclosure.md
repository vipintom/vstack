# ADR-0023: Progressive Disclosure and Reference Ownership

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires progressive disclosure: main skill/playbook files focused on procedure, with detailed rubrics, examples, schemas, and edge cases moved to references. References must have one owning skill/playbook and no unregistered parallel procedures.

## Decision

**Implement a layered content structure with canonical ownership of references.**

### Layered Structure (PRD Section 10.4, 6.4)

1. **Description/metadata:** Enough for discovery and routing (frontmatter + first section)
2. **Main skill/playbook:** Purpose, triggers, primary procedure, outputs, stop/fallback conditions
3. **References:** Detailed rubrics, example prompts, schemas, edge cases, specialized tool guidance, extended examples
4. **Scripts/assets:** Deterministic helpers when they materially improve repeatability

### Reference Ownership Rules

- Every reference has **one owning skill or playbook**
- References are loaded progressively -- only when the procedure needs them
- Normally no more than one level deep (skill -> reference, not skill -> reference -> reference)
- References must not become unregistered parallel procedures
- Quick references and help pages are generated from canonical content, not hand-maintained duplicates

### Reference Types

| Type | Owner | Purpose |
|------|-------|---------|
| Rubric | Review skill (vstack-review-rubrics) | Criteria for review findings |
| Template | Playbook/skill that generates it | Output structure |
| Extended example | Skill that demonstrates it | Procedure illustration |
| Schema | Skill that validates against it | Data shape definition |
| Technical background | Skill that applies it | Context for decision points |
| Tool guidance | Skill that uses the tool | Host-specific invocation |

### Quick Reference & Help

- quick-ref.md rebuilt after catalogue stabilizes from canonical content
- vstack-help skill selects minimal relevant skill set from manifest
- Principle index loaded by vstack-mode; leaf principles loaded on trigger
- No hand-maintained index that drifts from canonical content

## Rationale

1. PRD Section 6.4: "References contain deep detail... The primary skill or playbook must remain understandable without loading every reference."
2. PRD Section 10.4: "Use a layered structure... The agent should load a reference only when the procedure needs it."
3. PRD Section 18.7: "References: Rebuild quick references and deep references so they reflect canonical ownership and progressive disclosure; remove stale links and duplicate procedures."
4. Implementation Plan Section 2.6: "Do not require a separate skill for every small task or every principle."

## Consequences

- Main skill files stay focused and executable
- References created only when justified by repeated need
- Validator checks reference ownership and broken links
- Quick reference rebuilt as part of release process (not maintained separately)
- No stale instructions or duplicate procedures in references

## References

- PRD Section 6.4: Canonical content and references
- PRD Section 10.4: Progressive disclosure
- PRD Section 18.7: Re-authoring rubrics, templates, references and tooling
- Implementation Plan Section 2.6: No over-engineering
- Implementation Plan Section 5.1: Proposed logical directory map (skills/*/references/)