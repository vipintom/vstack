# Projection System

Projections are **read-only published views** of vstack's authoritative state. They enable OpenChamber (and other consumers) to visualize progress without direct access to mutable data.

## Architecture

```
Authoritative Data (.vstack/)     Published Projections (.vstack/reports/)
┌─────────────────────────┐       ┌─────────────────────────┐
│ deliveries/             │       │ deliveries/<id>.json    │
│   dlv_xxx/              │  ──▶  │ activity/<id>.json      │
│     delivery.json       │       │ memory-index.json       │
│     tasks/              │       │ quality/<id>.json       │
│     agent-runs/         │       │                         │
│     evidence/           │       └─────────────────────────┘
└─────────────────────────┘                ▲
         │                                 │
         │ publishProjections()            │
         ▼                                 │
    Tool Hook (execute.after)              │
         │                                 │
         ▼                                 │
┌─────────────────────────┐       ┌─────────────────────────┐
│ OpenChamber API         │       │ OpenChamber UI          │
│ Reads ONLY reports/     │  ──▶  │ Renders dashboard       │
└─────────────────────────┘       └─────────────────────────┘
```

## Projection Types

### 1. Delivery Report (`deliveries/<id>.json`)

Complete delivery snapshot with tasks, agent runs, and evidence.

```json
{
  "schemaVersion": 1,
  "revision": 5,
  "delivery": { "id": "dlv_xxx", "title": "...", "status": "active", ... },
  "tasks": [...],
  "agentRuns": [...],
  "evidence": [...],
  "reviewFindings": [],
  "generatedAt": "2026-11-01T00:00:00.000Z"
}
```

### 2. Activity Report (`activity/<id>.json`)

Event timeline from the event log.

```json
{
  "schemaVersion": 1,
  "revision": 3,
  "deliveryId": "dlv_xxx",
  "activities": [
    { "timestamp": "...", "eventType": "delivery.created", "actor": "human:user", "entity": {"type": "delivery", "id": "dlv_xxx"}, "summary": "..." }
  ],
  "generatedAt": "2026-11-01T00:00:00.000Z"
}
```

### 3. Memory Index (`memory-index.json`)

Searchable memory catalogue by category.

```json
{
  "schemaVersion": 1,
  "revision": 2,
  "categories": {
    "architecture": [{ "id": "...", "title": "...", "category": "architecture", "status": "current", "updatedAt": "...", "tags": [...] }],
    "lessons": [...]
  },
  "generatedAt": "2026-11-01T00:00:00.000Z"
}
```

### 4. Quality Summary (`quality/<id>.json`)

Check statistics by type.

```json
{
  "schemaVersion": 1,
  "revision": 1,
  "deliveryId": "dlv_xxx",
  "checksTotal": 12,
  "checksPassed": 10,
  "checksFailed": 2,
  "checksSkipped": 0,
  "checksByType": { "test:unit": { "passed": 8, "failed": 1 }, "build": { "passed": 2, "failed": 1 } },
  "reviewFindings": { "critical": 0, "high": 1, "medium": 1, "low": 0 },
  "generatedAt": "2026-11-01T00:00:00.000Z"
}
```

## Publishing

Projections are published automatically after **every tool execution** via the `execute.after` hook:

```typescript
// In plugin index.ts
ctx.tool.hook("execute.after", async (ctx, next) => {
  await publishProjections(paths);
  return next();
});
```

Manual publishing:
```bash
# Via tool
vstack_status dashboard --publish
```

## Revision Tracking

Every projection has:
- `schemaVersion` — Format version (currently 1)
- `revision` — Increments on content change
- `generatedAt` — Timestamp for staleness detection

OpenChamber compares `revision` and `generatedAt` to detect stale data.

## Consumer Contract

Consumers (OpenChamber, custom tools) MUST:

1. **Only read** `.vstack/reports/` and `.vstack/state/index.json`
2. **Never read** `.vstack/deliveries/`, `.vstack/tasks/`, `.vstack/evidence/` directly
3. **Validate** `schemaVersion` before parsing
4. **Check** `revision` and `generatedAt` for staleness
5. **Handle** missing projections gracefully (404 = not yet published)

## Extending Projections

Add new projection types in `opencode/vstack/src/dashboard/projections/`:

1. Add type to `types.ts`
2. Create `<name>-reports.ts` generator
3. Add path helper to `paths.ts`
4. Register in `projection-publisher.ts`
5. Update OpenChamber API to expose

No changes to authoritative stores required.