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
│     decisions/          │                ▲
│     checkpoints/        │                │
│     lessons/            │                │
│     recoveries/         │                │
│     verification/       │                │
└─────────────────────────┘                │
         │                                 │
         │ publishProjections()            │
         ▼                                 │
┌─────────────────────────┐       ┌─────────────────────────┐
│ OpenChamber API         │       │ OpenChamber UI          │
│ Reads ONLY reports/     │  ──▶  │ Renders dashboard       │
└─────────────────────────┘       └─────────────────────────┘
```

## Projection Types

### 1. Delivery Report (`deliveries/<id>.json`)

Complete delivery snapshot with tasks, agent runs, evidence, review sessions, decisions, recoveries, checkpoints, lessons, verification index.

```json
{
  "schemaVersion": 1,
  "revision": 5,
  "delivery": { "id": "dlv_xxx", "title": "...", "status": "active", ... },
  "tasks": [...],
  "agentRuns": [...],
  "evidence": [...],
  "reviewFindings": [],
  "reviewSessions": [
    {
      "id": "rev_xxx",
      "type": "code",
      "independence": "confirmed",
      "reviewerId": "vstack-reviewer",
      "status": "completed",
      "baseCommit": "abc123",
      "diffRef": "def456",
      "evidenceConsidered": ["ev_xxx"],
      "findings": [
        {
          "id": "fnd_xxx",
          "severity": "high",
          "category": "security",
          "title": "SQL injection risk",
          "description": "User input not sanitized",
          "location": "src/auth/login.ts:45",
          "evidenceRefs": ["ev_xxx"],
          "disposition": "fixed",
          "rationale": "Added parameterized query",
          "createdAt": "2026-11-01T00:00:00.000Z",
          "updatedAt": "2026-11-01T00:00:00.000Z"
        }
      ],
      "startedAt": "2026-11-01T00:00:00.000Z",
      "completedAt": "2026-11-01T00:00:00.000Z"
    }
  ],
  "decisions": [
    {
      "id": "dec_xxx",
      "phase": "planning",
      "summary": "Use JWT for auth",
      "context": "Need stateless auth",
      "alternatives": ["Session cookies", "OAuth"],
      "chosenOption": "JWT",
      "rationale": "Stateless, scalable",
      "evidenceReferences": ["ev_xxx"],
      "status": "active",
      "supersededBy": null,
      "createdAt": "2026-11-01T00:00:00.000Z",
      "updatedAt": "2026-11-01T00:00:00.000Z",
      "createdBy": "vstack-lead"
    }
  ],
  "recoveries": [
    {
      "id": "rec_xxx",
      "failureClass": "test-flaky",
      "symptom": "Tests fail intermittently",
      "attempts": [
        {
          "attemptNumber": 1,
          "description": "Increased timeout",
          "observedResult": "Still flaky",
          "assumptionTested": "Timeout too short",
          "timestamp": "2026-11-01T00:00:00.000Z"
        }
      ],
      "commonAssumption": "Flakiness is timeout-related",
      "diagnosticProbe": {
        "description": "Run tests 10x",
        "command": ["npm", "test", "--", "--repeat=10"],
        "result": "3/10 failed"
      },
      "changedApproach": "Fixed test isolation",
      "recoveryRound": 1,
      "maxRecoveryRounds": 3,
      "cleanupStatus": "completed",
      "finalOutcome": "resolved",
      "stopReason": "Root cause fixed",
      "createdAt": "2026-11-01T00:00:00.000Z",
      "updatedAt": "2026-11-01T00:00:00.000Z"
    }
  ],
  "checkpoints": [
    {
      "id": "chk_xxx",
      "progressPath": "./PROGRESS.md",
      "contentHash": "sha256...",
      "branch": "main",
      "commit": "abc123",
      "worktreePath": null,
      "verifiedWork": ["Login endpoint complete"],
      "nextAction": "Implement middleware",
      "openQuestions": ["Token refresh strategy"],
      "blockers": [],
      "keyFacts": { "jwtExpiry": "24h" },
      "decisions": ["dec_xxx"],
      "failedApproaches": [],
      "verificationStatus": {
        "passed": ["test:unit"],
        "failed": [],
        "skipped": [],
        "remaining": ["test:e2e"]
      },
      "freshness": "current",
      "createdAt": "2026-11-01T00:00:00.000Z",
      "updatedAt": "2026-11-01T00:00:00.000Z"
    }
  ],
  "lessons": [
    {
      "id": "lsn_xxx",
      "failureClass": "null-pointer",
      "occurrences": ["ev_xxx", "ev_yyy"],
      "recurrenceCount": 2,
      "impactAssessment": "high",
      "preventionMechanism": "types",
      "implementationArtifact": "types/user.ts",
      "validationResult": "passed",
      "status": "verified",
      "owner": "vstack-lead",
      "createdAt": "2026-11-01T00:00:00.000Z",
      "updatedAt": "2026-11-01T00:00:00.000Z",
      "closedAt": "2026-11-01T00:00:00.000Z",
      "supersededBy": null
    }
  ],
  "verificationIndex": {
    "id": "ver_xxx",
    "projectPath": "/path/to/project",
    "harness": "opencode",
    "skillPath": "./verification.md",
    "contentHash": "sha256...",
    "version": "1.0.0",
    "surfaceCoverage": ["auth", "api", "db"],
    "lastValidated": "2026-11-01T00:00:00.000Z",
    "validationEvidence": ["ev_xxx"],
    "status": "current",
    "gaps": ["integration tests"],
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-01T00:00:00.000Z"
  },
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

## Evidence v2 Fields

Evidence records in projections include v2 fields:

```json
{
  "id": "ev_xxx",
  "checkId": "test:unit",
  "type": "test:unit",
  "status": "passed",
  "exitCode": 0,
  "summary": "All tests passed",
  "completedAt": "2026-11-01T00:00:00.000Z",
  "taskId": "tsk_xxx",
  "provenance": "plugin_observed",
  "outcome": "passed",
  "commitRef": "abc123",
  "command": ["npm", "test"],
  "workingDirectory": "/path/to/project"
}
```

**Provenance values:** `plugin_observed`, `agent_reported`, `external_system`, `user_supplied`
**Outcome values:** `passed`, `failed`, `skipped`, `not_run`, `blocked`, `unavailable`, `inconclusive`

## Task v2 Fields

Task records include contract and assignment:

```json
{
  "id": "tsk_xxx",
  "title": "Implement login",
  "contract": {
    "objective": "Implement login endpoint",
    "scope": ["src/auth/"],
    "outOfScope": ["user registration"],
    "verification": ["Tests pass", "TypeScript compiles"],
    "expectedOutput": ["src/auth/login.ts"],
    "reportingFormat": "structured",
    "stopConditions": ["Tests fail", "Type error"],
    "escalationConditions": ["Blocked > 1h"]
  },
  "assignment": {
    "agentId": "vstack-builder",
    "role": "builder",
    "status": "completed",
    "outcome": "PASS",
    "writableScope": ["src/auth/"],
    "isolationMethod": "worktree",
    "changedFiles": ["src/auth/login.ts"],
    "checksRun": ["test:unit", "lint"],
    "assumptions": ["JWT secret available"],
    "blockers": []
  }
}
```

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