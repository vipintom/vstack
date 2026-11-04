# ADR-0020: Migration Ledger and Disposition Tracking

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires a migration ledger for every existing and newly proposed content file, recording disposition, evidence, and acceptance scenarios.

## Decision

**Maintain a comprehensive migration ledger as the authoritative record of content disposition.**

### Migration Ledger (`docs/migration/content-migration-ledger.csv`)

For every content file, record:
- Canonical path, name, and content type
- Previous name/path, if changed
- Current purpose and actual use
- Previous audit rating (marked as historical input)
- Overlaps, dependencies, consumers, references
- Valuable concepts, methods, examples, edge cases to preserve
- Instructions/prose/procedures to rewrite or discard
- v2 target content and owner
- Disposition: `rewrite`, `merge`, `split`, `rename`, `move`, `deprecate`, `remove`, `adapter-only`, `retain-as-resource`, `new`
- Acceptance scenarios and structural checks
- Migration/compatibility notes
- Final reviewer, status, and evidence links

### Disposition Values

| Value | Meaning |
|-------|---------|
| `rewrite` | Full re-authoring against v2 contract; retains canonical path |
| `merge` | Combined with another item; one canonical owner |
| `split` | Divided into multiple items with distinct jobs |
| `rename` | Path/ID changed; redirects/aliases maintained |
| `move` | Relocated to different directory/category |
| `deprecate` | Superseded; replacement exists; migration path documented |
| `remove` | No replacement; no distinct user value; consumers migrated |
| `adapter-only` | Content becomes adapter mapping only |
| `retain-as-resource` | Becomes reference/rubric/template supporting canonical procedure |
| `new` | No v1 predecessor; created for v2 |

### Tracking Requirements

- Every disposition must cite actual file content, triggers, outputs, usage, evaluation results
- Ledger updated at each authoring milestone (draft, experimental, stable)
- Final reviewer signs off before stable promotion
- Manifest entries must match ledger dispositions

## Rationale

1. PRD Section 18.3: "Required migration ledger and audit reconciliation" with 13 specific fields
2. Implementation Plan Section 6.4: Required no-duplication review artifacts include migration ledger
3. Ensures traceability from v1 to v2 with evidence-backed decisions
4. Supports independent audit of re-authoring completeness

## Consequences

- Ledger is authoritative; manifest, capability registry, overlap analysis must align
- All Phase 0 dispositions are provisional; updated as re-authoring progresses
- Disposition `rewrite` is default for all active content per no-grandfathering policy
- Retired items (`vstack-debugging`, `vstack-discovery`) recorded with rationale

## References

- PRD Section 18.3: Required migration ledger and audit reconciliation
- Implementation Plan Section 6.4: Required no-duplication review artifacts
- Phase 0 deliverable: content-migration-ledger.csv
- ADR-0014: No grandfathering policy
- ADR-0016: Capability registry and overlap analysis