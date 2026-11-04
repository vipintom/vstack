# ADR-0018: Skill/Playbook Lifecycle and Promotion Criteria

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD defines four lifecycle states for skills: draft, experimental, stable, deprecated. Clear promotion criteria are needed to prevent incomplete or untested content from shipping as stable.

## Decision

**Define explicit lifecycle states and promotion criteria for all content types.**

### Lifecycle States

| State | Meaning | Entry Criteria | Exit Criteria |
|-------|---------|----------------|---------------|
| `draft` | Initial authoring in progress | Created with design outline | Author claims structural completeness |
| `experimental` | Structurally complete, under evaluation | Structural validation passes, research record complete, overlap review passes | Behavioural evaluation cases pass, independent review complete |
| `stable` | Production-ready, release-eligible | All evaluation cases pass, migration record complete, independent review signed off | Deprecated or superseded |
| `deprecated` | Superseded, migration path provided | Replacement exists and is stable | Removed after migration period |

### Promotion Gates

**Draft → Experimental:**
- Structural validation passes (0 errors, 0 warnings)
- Research record complete with pinned sources
- Overlap review passes (distinct job, no procedure duplication)
- All mandatory contract sections present
- Capability registry entry complete

**Experimental → Stable:**
- All applicable behavioural evaluation cases pass
- Positive and negative trigger cases verified
- Procedure-fidelity cases for important steps pass
- Failure/fallback cases verified
- Independent content review signed off (fresh context, did not author)
- Migration ledger updated with final disposition and evidence links
- Manifest and references updated

**Stable → Deprecated:**
- Replacement skill/playbook is stable
- Migration path documented
- Deprecation notice with timeline in release notes
- Aliases maintained only where backward compatibility has real user benefit

### Release Policy

- Only `stable` content ships in v2 release
- `experimental` content may be installed opt-in but not in default catalogue
- `draft` content never ships
- No exception-based release: no active v1 content ships unchanged in v2

## Rationale

1. PRD Section 10.5: Defines four lifecycle states
2. PRD Section 18.2.6: "No exception-based release: There is no general waiver allowing an active v1 skill or playbook to ship unchanged in v2."
3. Implementation Plan Section 8: Step 8 requires independent final review and migration update
4. Prevents incomplete content from shipping as stable

## Consequences

- Every content item must track lifecycle state in manifest
- Independent reviewer required for stable promotion (different from author)
- Evaluation evidence must be recorded and linkable
- Release report must document limitations and inconclusive evaluations

## References

- PRD Section 10.5: Skill lifecycle
- PRD Section 18.2: Non-negotiable full re-authoring policy
- PRD Section 22.2: Release acceptance criteria
- Implementation Plan Section 8: Standard authoring workflow (Step 8)
- Implementation Plan Section 9.5: Content lifecycle and promotion rules