# ADR-0013: Projection Compatibility — Rolling Updates

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

OpenChamber must read projections during rolling updates where plugin and UI versions may differ. Must define how OpenChamber versions read both legacy and v2 projections.

## Decision

**Versioned projection schema with graceful degradation:**

### Projection Schema Versioning
- Each projection file includes `schemaVersion: number`
- Current v2 schema: `schemaVersion: 2`
- Legacy v1 projections: `schemaVersion: 1` (or absent = 1)

### OpenChamber Reading Strategy
1. Read `schemaVersion` from projection
2. If `schemaVersion <= currentSupportedVersion`: parse with appropriate parser
3. If `schemaVersion > currentSupportedVersion`: render as "future version — update OpenChamber"
4. Missing optional fields → render as "not recorded" (not false/zero)
5. Missing required fields → render as "incomplete projection"

### Plugin Publishing
- Always publishes current schema version
- Does not publish legacy schema versions
- Atomic write: writes to temp, then renames

### Migration Path
- v1 projections readable by v2 OpenChamber (schemaVersion: 1)
- v2 OpenChamber renders v1 data with "legacy" badges
- No data migration — read-time adaptation only

**Rationale:**
- Rolling updates require backward-compatible reads
- No data migration simplifies deployment
- Explicit versioning enables clear compatibility matrix
- "Not recorded" honest rendering for missing v2 fields in v1 data

## Consequences

- `opencode/vstack/src/dashboard/projections/types.ts` includes `schemaVersion`
- `openchamber/vstack-panel/panel/src/services/api.ts` handles multiple schema versions
- OpenChamber UI shows schema version and freshness
- Legacy v1 projections remain readable indefinitely

## Related

- `opencode/vstack/src/dashboard/projections/types.ts`
- `openchamber/vstack-panel/panel/src/services/api.ts`
- Phase 5 Versioned projection contract
- ADR-0002 Playbook path (adapter generation affects projection content)