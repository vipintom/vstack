# ADR-0008: Reviewer Independence Fields

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 PRD requires tracking reviewer independence state. The harness may not provide reliable session/model/context separation metadata. We must define fields based on what host APIs actually expose.

## Decision

**Independence state enum with four values:**
- `confirmed` — Host API confirms fresh session with read-only permissions
- `declared` — Agent declares fresh context but host cannot verify
- `not_independent` — Same session/context as implementation
- `unknown` — Host API doesn't expose independence info

**Implementation:**
- `ReviewSession` record includes `independence: 'confirmed' | 'declared' | 'not_independent' | 'unknown'`
- `independenceEvidence?: string` — description of how independence was established
- OpenCode 2.2.0 does not expose session/model separation metadata → defaults to `declared` or `unknown`
- UI displays independence state honestly; `unknown` ≠ `confirmed`

**Rationale:** Honest observability principle — never claim independence that cannot be verified. OpenCode's session API doesn't provide model/context separation guarantees. The reviewer agent declares fresh context; we record that declaration. Future harness versions may provide stronger guarantees.

## Consequences

- Review findings include independence state
- OpenChamber UI shows independence badge
- `confirmed` only when host API provides verifiable proof
- Default for OpenCode 2.2.0: `declared` (agent declares fresh context)
- `not_independent` for same-session reviews

## Related

- `opencode/vstack/src/schemas/types.ts` — ReviewSession interface
- `opencode/vstack/src/quality/check-service.ts` — review orchestration
- Phase 4 Review records and dispositions
- ADR-0005 OpenCode API baseline