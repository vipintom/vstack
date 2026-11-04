# vstack Projection Protocol

**Version:** 1  
**Status:** Draft — pending product owner confirmation  
**Canonical Schemas:** `contracts/projections/v1/`  
**Producer:** `vstack-opencode` (OpenCode runtime)  
**Consumer:** `vstack-openchamber` (OpenChamber extension)

---

## Overview

The vstack projection protocol defines the versioned, read-only filesystem contract between the OpenCode runtime (producer) and the OpenChamber extension (consumer). Projections are serialized representations of runtime state intended for external consumption.

### Key Principles

1. **Producer owns, consumer reads** — OpenCode runtime is the authoritative producer; OpenChamber treats projections as untrusted input
2. **Explicit versioning** — Every projection declares `schemaVersion` (per-type) and `protocolVersion` (cross-type)
3. **Forward compatibility** — Additive optional fields allowed within protocol version; breaking changes require new protocol version
4. **Self-describing** — Each projection includes `generatedAt`, `revision`, and producer metadata
5. **Validatable** — Consumers must validate against schema before rendering

---

## Protocol Versioning

### Protocol Version (Major)

The `protocolVersion` field in the envelope identifies the contract set. It is incremented only for **breaking changes** that affect cross-projection compatibility:

**Breaking changes (require new protocol version):**
- Changing field meaning, requiredness, type, or identifier semantics
- Removing or renaming required fields
- Changing path structure or naming conventions
- Changing timestamp format or identifier format
- Changing lifecycle semantics (e.g., status transitions)

**Non-breaking changes (same protocol version):**
- Adding new optional fields to projections
- Adding new optional projection types
- Adding new enum values (if consumers can ignore unknown values)
- Adding new optional objects/arrays
- Documentation/description changes

### Schema Version (Per-Type)

Each projection type has its own `schemaVersion` for internal evolution within a protocol version. In practice, `schemaVersion: 1` is used for all v1 projections.

---

## Projection Inventory

| Projection | Path Pattern | Schema File | Description |
|------------|--------------|-------------|-------------|
| **Manifest** | `.vstack/manifest.json` | `manifest.schema.json` | Project-level manifest identifying the vstack workspace |
| **Dashboard Index** | `.vstack/state/index.json` | `dashboard-index.schema.json` | Small, frequently-polled index of active deliveries |
| **Delivery Report** | `.vstack/reports/deliveries/{deliveryId}.json` | `delivery-report.schema.json` | Comprehensive delivery detail with all related entities |
| **Activity Report** | `.vstack/reports/activity/{deliveryId}.json` | `activity-report.schema.json` | Activity summary from event log |
| **Memory Index** | `.vstack/reports/memory-index.json` | `memory-index.schema.json` | Aggregated memory index across categories |
| **Quality Summary** | `.vstack/reports/quality/{deliveryId}.json` | `quality-summary.schema.json` | Quality/check summary from evidence records |

---

## File Layout

```
.vstack/
├── manifest.json                    # Project manifest (projection)
├── state/
│   ├── index.json                   # Dashboard index (projection)
│   ├── events.jsonl                 # Event log (authoritative, not projected)
│   └── locks/                       # Lock files (internal)
├── deliveries/
│   └── {deliveryId}/
│       ├── delivery.json            # Authoritative delivery entity
│       ├── tasks/
│       │   └── {taskId}.json
│       ├── phases/
│       │   └── {phaseRunId}.json
│       ├── agent-runs/
│       │   └── {agentRunId}.json
│       ├── evidence/
│       │   └── {evidenceId}.json
│       ├── reviews/
│       │   └── {reviewRunId}.json
│       ├── findings/
│       │   └── {findingId}.json
│       ├── approvals/
│       │   └── {approvalId}.json
│       ├── decisions/
│       │   └── {decisionId}.json
│       ├── recoveries/
│       │   └── {recoveryId}.json
│       ├── checkpoints/
│       │   └── {checkpointId}.json
│       ├── lessons/
│       │   └── {lessonId}.json
│       └── artifacts/
│           └── ...
├── reports/                         # Projection output directory
│   ├── deliveries/
│   │   └── {deliveryId}.json        # Delivery detail report (projection)
│   ├── activity/
│   │   └── {deliveryId}.json        # Activity summary (projection)
│   ├── quality/
│   │   └── {deliveryId}.json        # Quality summary (projection)
│   └── memory-index.json            # Memory index (projection)
├── memory/
│   └── index.json                   # Authoritative memory index
└── config/
    └── *.json                       # Runtime configuration
```

---

## Common Envelope

All projections share a base envelope defined in `projection-envelope.schema.json`:

```json
{
  "schemaVersion": 1,
  "protocolVersion": 1,
  "generatedAt": "2026-11-02T10:00:00.000Z",
  "revision": 1,
  "producer": {
    "component": "vstack-opencode",
    "version": "0.1.0",
    "buildId": "abc123..."
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `schemaVersion` | integer | Per-projection-type schema version (const: 1 for v1) |
| `protocolVersion` | integer | Cross-projection protocol version (const: 1 for v1) |
| `generatedAt` | string (date-time) | ISO 8601 timestamp of projection generation |
| `revision` | integer | Monotonically increasing revision for this file |
| `producer.component` | string | Component identifier (`vstack-opencode`) |
| `producer.version` | string | Semantic version of producing component |

---

## Producer Requirements (vstack-opencode)

1. **Validate before write** — All projections must validate against their schema in tests; runtime validation recommended for required invariants
2. **Atomic writes** — Write to temporary file in same directory, then atomically rename into place
3. **Never emit invalid data** — A projection must never be labeled with a protocol/schema version it violates
4. **Include producer metadata** — Every projection must include `producer` object with component, version, and buildId
5. **Function without consumer** — Runtime must operate correctly when OpenChamber is not installed
6. **Safe failure** — Failed projection write must not corrupt authoritative runtime state
7. **Diagnostics** — Include diagnostics for serialization failure and unsupported protocol state

---

## Consumer Requirements (vstack-openchamber)

1. **Validate before render** — All projection inputs must validate against schema before use
2. **Handle missing data gracefully** — Missing directories/files = empty/unavailable state, not exception
3. **Distinguish states** — Missing, stale, malformed, unsupported-version, partially-available must be clearly distinguished
4. **Ignore unknown optional fields** — Where protocol permits, unknown fields must not cause failure
5. **Never mutate** — Must not write to runtime projection files
6. **Bound resources** — Bound file size, collection size; guard against malformed values, path traversal, unsafe links
7. **Debounce** — Debounce filesystem events; avoid re-render loops

---

## Compatibility Matrix

| Producer Version | Protocol Version | Consumer Compatibility |
|------------------|------------------|------------------------|
| vstack-opencode 0.1.x | 1 | vstack-openchamber 0.1.x (protocol 1) |

Future versions must document supported producer/consumer ranges in the umbrella repository's compatibility manifest.

---

## Schema Snapshot Strategy

Component repositories carry pinned schema snapshots for build independence:

```
vstack-opencode/
├── schemas/
│   └── projections/v1/
│       ├── *.schema.json          # Pinned copies
│       └── snapshot-meta.json     # Metadata
```

**Snapshot metadata format (`snapshot-meta.json`):**
```json
{
  "canonicalSource": "https://github.com/<github-username>/vstack/contracts/projections/v1",
  "protocolVersion": 1,
  "sourceCommit": "abc123...",
  "sourceTag": "vstack-protocol-v1.0.0",
  "contentHash": "sha256:...",
  "updatedAt": "2026-11-02T10:00:00.000Z",
  "updatedReason": "Initial protocol v1 definition"
}
```

CI in each component must verify the snapshot hash matches the expected canonical version.

---

## Validation

### Producer-side (vstack-opencode)
```bash
# In component repo
pnpm test:contracts
# Validates all projection fixtures against canonical schemas
```

### Consumer-side (vstack-openchamber)
```bash
# In component repo
pnpm test:contracts
# Validates consumer can parse all valid fixtures and rejects invalid
```

### Umbrella (contract validation)
```bash
# In umbrella repo
node contracts/validate-contracts.js
# Validates schemas are well-formed and fixtures match
```

---

## Open Implementation Decisions (Require Product Owner Confirmation)

1. **Initial protocol version label** — Confirm `1` is correct (not `v1`, `1.0`, etc.)
2. **Exact schema set** — Confirm no additional projection types needed beyond the 6 defined
3. **Envelope structure** — Confirm `producer` metadata fields are sufficient
4. **ID format patterns** — Confirm regex patterns for `dlv_`, `tsk_`, `agrun_`, `evd_` prefixes
5. **Timestamp format** — Confirm RFC 3339 / ISO 8601 with milliseconds (`2026-11-02T10:00:00.000Z`)

---

## Related Files

- `contracts/projections/v1/` — Canonical JSON Schema definitions
- `contracts/projections/v1/README.md` — This document (duplicate for discoverability)
- `contracts/validate-contracts.js` — Umbrella validation script
- `docs/vstack-revised-structure-prd.md` — Product requirements (Section 7)
- `docs/vstack-structure-implementation-plan.md` — Implementation plan (Phase 1)