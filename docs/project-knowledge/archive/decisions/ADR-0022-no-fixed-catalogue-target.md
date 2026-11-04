# ADR-0022: No Fixed Catalogue Target Policy

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD explicitly states: "No fixed catalogue target" — the final skill/playbook count is determined by distinct user value, not by preserving or reducing the current count of 53 skills / 18 playbooks.

## Decision

**Do not target a fixed number of skills or playbooks. Final catalogue size is determined by demonstrated distinct method and user value.**

### Principles

1. **Keep, merge, split, replace, retire based on distinct method and user value** — Not to hit a count
2. **Do not remove distinct useful capabilities just to make catalogue smaller** — Value over minimalism
3. **Do not keep redundant items just to preserve count** — Each item must justify itself
4. **A procedure may be combined with another when triggers, inputs, outputs, and success criteria are genuinely the same** — PRD Section 10.6
5. **Distinct methods must remain separate even when they are used together** — PRD Section 10.6

### Application

| Scenario | Action |
|----------|--------|
| Two skills with materially identical triggers, procedure, output | Merge |
| One skill with two unrelated task outcomes | Split |
| Skill with distinct method but narrow use case | Keep (if user value demonstrated) |
| Skill superseded by better method | Retire (with migration) |
| New capability with no v1 predecessor | Add as `new` |

### Count Independence

- Phase 0 inventory: 53 skills, 18 workflows (starting point, not target)
- Phase 1-3 authoring: Count emerges from overlap resolution and distinct method identification
- Phase 5-6 release: Final count documented in release report with justification
- No "magic number" for skills or playbooks

## Rationale

1. PRD Section 6.5: "File structure is subordinate to content ownership"
2. PRD Section 10.6: "The PRD does not require a separate skill for every activity."
3. PRD Section 13.3: "This PRD does not prescribe exactly 22 Must skills, 43 total skills or any other fixed count."
4. PRD Section 18.2.4: "Do not optimise for file count: A distinct, useful method may remain a separate skill; genuinely identical methods may be consolidated."
5. Implementation Plan Section 2.5: "No fixed catalogue target... Do not remove distinct useful capabilities just to make the catalogue smaller."

## Consequences

- Final skill count may be more or fewer than 53
- Final playbook count may be more or fewer than 18
- Release report must justify final count with evidence of distinct method/user value
- Migration ledger records disposition for every item (not net count)
- Evaluation must cover all active stable items regardless of count

## References

- PRD Section 6.5: File structure subordinate to content ownership
- PRD Section 10.6: Skills that are closely related
- PRD Section 13.3: No catalogue target
- PRD Section 18.2.4: Do not optimise for file count
- Implementation Plan Section 2.5: No fixed catalogue target
- Phase 0 finding: 53 skills, 18 workflows as starting inventory