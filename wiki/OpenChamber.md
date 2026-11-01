# OpenChamber Visualization

The OpenChamber extension provides a read-only dashboard for vstack projects.

## Status

**Build currently deferred** — requires `@openchamber/sdk` access. Typecheck passes.

## Features

| Feature | Description |
|---|---|
| **Delivery Dashboard** | Active deliveries with task progress |
| **Delivery Detail** | Tasks, agents, evidence, findings |
| **Activity Timeline** | Event log with filtering |
| **Memory Browser** | Searchable knowledge catalogue |
| **Quality View** | Check counts, review findings |
| **Staleness Detection** | Revision/timestamp validation |

## Data Source

OpenChamber reads **ONLY** published projections:

```
.vstack/
├── state/
│   └── index.json           # Active deliveries (dashboard index)
└── reports/
    ├── deliveries/<id>.json # Delivery detail
    ├── activity/<id>.json   # Activity timeline
    ├── memory-index.json    # Memory catalogue
    └── quality/<id>.json    # Quality summaries
```

**Never reads:** `.vstack/deliveries/`, `.vstack/tasks/`, `.vstack/evidence/`

## API

The extension uses `panel/src/services/api.ts`:

```typescript
// Projection readers
readManifest()           // Project manifest
readDashboardIndex()     // Active deliveries
readDeliveryReport(id)   // Delivery detail
readActivityReport(id)   // Activity timeline
readMemoryIndex()        // Memory catalogue
readQualitySummary(id)   // Quality stats
listReports()            // Available reports
```

## UI Components

- `Dashboard.ts` — Main dashboard with delivery cards
- `render.ts` — Rendering utilities

## Building

```bash
cd openchamber/vstack-panel

# Typecheck (works)
pnpm typecheck

# Build (deferred - SDK unavailable)
pnpm build
```

## Limitations

| Limitation | Impact |
|---|---|
| SDK unavailable | Cannot build/bundle extension |
| Polling only (2-5s) | Not real-time |
| No write access | Read-only by design |
| No auth integration | Relies on file permissions |

## Future Work

- [ ] Resolve `@openchamber/sdk` access
- [ ] Add WebSocket for real-time updates
- [ ] Implement detail-page lazy loading
- [ ] Add history paging/limits
- [ ] Validate projection version/shape before render