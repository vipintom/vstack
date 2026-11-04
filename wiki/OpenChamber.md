# OpenChamber Visualization

The OpenChamber extension provides a read-only dashboard for vstack projects.

## Status

**Build: ✅ PASS** — `@openchamber/sdk` available, build successful.

## Features

| Feature | Description |
|---|---|
| **Delivery Dashboard** | Active deliveries with task progress |
| **Delivery Detail** | Tasks, agents, evidence, review sessions, decisions, recoveries, checkpoints, lessons, verification index |
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
    ├── deliveries/<id>.json # Delivery detail (v2: full quality trail)
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
readDeliveryReport(id)   // Delivery detail (v2)
readActivityReport(id)   // Activity timeline
readMemoryIndex()        // Memory catalogue
readQualitySummary(id)   // Quality stats
listReports()            // Available reports
```

## UI Components

- `Dashboard.ts` — Main dashboard with delivery cards
- `render.ts` — Rendering utilities

## v2 Projection Types

Types updated in `panel/src/types/index.ts`:

- `DeliveryDetailReport` — Includes `reviewSessions`, `decisions`, `recoveries`, `checkpoints`, `lessons`, `verificationIndex`
- `Evidence` — Includes `provenance`, `outcome`, `commitRef`, `command`, `workingDirectory`
- `Task` — Includes `contract`, `assignment`
- New `ViewType` options: `reviews`, `decisions`, `recovery`, `checkpoints`, `lessons`, `verification`

## Building

```bash
cd openchamber/vstack-panel

# Typecheck
pnpm typecheck

# Build
pnpm build
```

## Limitations

| Limitation | Impact |
|---|---|
| Polling only (2-5s) | Not real-time |
| No write access | Read-only by design |
| No auth integration | Relies on file permissions |

## Future Work

- [ ] Add WebSocket for real-time updates
- [ ] Implement detail-page lazy loading
- [ ] Add history paging/limits
- [ ] Validate projection version/shape before render

## Status

| Check | Status |
|---|---|
| Typecheck | ✅ PASS |
| Build | ✅ PASS |