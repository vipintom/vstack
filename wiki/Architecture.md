# Architecture

## Package Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│                        vstack Workspace                          │
├──────────────────┬────────────────────┬────────────────────────┤
│    playbook/     │  opencode/vstack/  │ openchamber/vstack-panel│
│  (Portable)      │  (Runtime)         │  (Visualization)        │
├──────────────────┼────────────────────┼────────────────────────┤
│ Principles       │ Persistence        │ Projection API          │
│ Roles            │   - File Store     │   - readManifest        │
│ 55 Skills        │   - Locks          │   - readDashboardIndex  │
│ 18 Workflows     │   - Event Log      │   - readDeliveryReport  │
│ Resources        │   - Repo Root      │   - readActivityReport  │
│ Manifest v2      │   - Schema Version │   - readMemoryIndex     │
│ Evaluations      │                    │   - readQualitySummary  │
│                  │ Runtime Stores     │   - listReports         │
│                  │   - Memory         │                         │
│                  │   - Deliveries     │ UI Components           │
│                  │   - Tasks          │   - Dashboard           │
│                  │   - Agent Runs     │   - Render              │
│                  │   - History        │                         │
│                  │   - Quality        │                         │
│                  │   - Enforcement    │                         │
│                  │   - Orchestration  │                         │
│                  │   - Dashboard      │                         │
│                  │   - Evaluation     │                         │
└──────────────────┴────────────────────┴────────────────────────┘
```

## Responsibility Matrix

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---|---|---|---|
| Principles/roles/skills/workflows | **Defines** | Makes available | Displays |
| Task/delivery state | Explains methodology | **Owns runtime records** | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | **Enforces 6 gates** | Displays gate status |
| Visualization | None | Publishes read model | **Owns presentation** |

## Data Flow

```
User Request
    │
    ▼
OpenCode Lead Agent
    │
    ▼
Plugin Startup
    ├── Initialize Persistence
    ├── Load Playbook Skills (52)
    ├── Provision Native Agents (3)
    └── Register Tools/Commands (23)
    │
    ▼
Lead Uses vstack Tools
    │
    ├── Tools call Runtime Stores
    ├── Stores mutate .vstack/ (authoritative)
    └── Event Log records all mutations
    │
    ▼
Tool Hook (execute.after)
    │
    ▼
publishProjections()
    │
    ├── Delivery Reports → .vstack/reports/deliveries/
    ├── Activity Reports → .vstack/reports/activity/
    ├── Memory Index → .vstack/reports/memory-index.json
    └── Quality Summaries → .vstack/reports/quality/
    │
    ▼
OpenChamber Panel
    │
    ├── Reads .vstack/state/index.json
    ├── Reads .vstack/reports/
    └── Renders Read-Only UI
```

## Key Interfaces

### Persistence

```typescript
// File Store
readJsonFile<T>(paths, filePath): Promise<T | null>
writeJsonFile<T extends {revision?: number}>(paths, filePath, data): Promise<void>

// Locks
acquireLock(paths, name): Promise<Lock>
releaseLock(lock): Promise<void>

// Event Log
appendEvent(paths, payload): Promise<void>
readEvents(paths, filter): Promise<Event[]>

// Repository Root
resolveVstackRoot(projectRoot): Promise<VstackPaths>
ensureVstackDirs(paths): Promise<void>
```

### Runtime Stores

```typescript
// Memory
createItem(category, item): Promise<MemoryItem>
getItem(category, id): Promise<MemoryItem | null>
search(category, query): Promise<MemoryItem[]>

// Deliveries
createDelivery(params): Promise<Delivery>
getDelivery(id): Promise<Delivery | null>
updateDelivery(id, updates): Promise<Delivery>

// Tasks
createTask(params): Promise<Task>
getTask(id): Promise<Task | null>
getReadyTasks(deliveryId): Promise<Task[]>

// Assignments
createAssignment(params): Promise<Assignment>
checkWriteScopeConflict(params): Promise<ConflictResult>

// Decisions
createDecision(params): Promise<Decision>
supersedeDecision(id, supersededBy): Promise<Decision>

// Checkpoints
createCheckpoint(params): Promise<Checkpoint>
revalidateCheckpoint(id): Promise<Checkpoint>

// Lessons
createLesson(params): Promise<Lesson>
promoteLesson(id, artifact): Promise<Lesson>

// Recoveries
createRecovery(params): Promise<Recovery>
recordAttempt(id, attempt): Promise<Recovery>

// Verification Index
createIndex(params): Promise<ProjectVerificationIndex>
validateFreshness(id): Promise<ProjectVerificationIndex>

// Agent Runs
createAgentRun(params): Promise<AgentRun>
updateAgentRun(id, updates): Promise<AgentRun>

// History
getDeliveryHistory(deliveryId): Promise<Event[]>

// Quality
executeCheck(params): Promise<CheckResult>
listEvidence(deliveryId, taskId?): Promise<Evidence[]>

// Reviews
createReviewSession(params): Promise<ReviewSession>
addFinding(sessionId, finding): Promise<ReviewFinding>
dispositionFinding(id, disposition): Promise<ReviewFinding>

// Enforcement
canCompleteDelivery(id): Promise<{allowed: boolean, reasons: string[]}>
canCompleteTask(id, taskId): Promise<{allowed: boolean, reasons: string[]}>
requiresApproval(action): boolean
recordApproval(action, deliveryId, granted, reason): Promise<void>
checkCompletionGate(gate, deliveryId, context): Promise<EnforcementResult>
validateApprovalScope(approvalId, action, targetId): Promise<boolean>
```

## Simplicity Constraints

- **Direct services** over registries/frameworks/state machines
- **Module justified** only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- **No wrapper layers** just to pass deps or mirror directory tree
- **~7 cohesive tools** max extended to **23 tools** for v2 runtime capabilities
- **No** generic workflow interpreter, scheduler, deployment platform, policy engine
- **Event log** = audit record, not full event sourcing

## OpenCode API

- `@opencode/plugin`: 2.2.0
- `@opencode/schema`: 2.2.0
- `ctx.agent.transform` does NOT expose `editor.add()` — use filesystem provisioning

## OpenChamber API

- `@openchamber/sdk`: available
- Engine: `>=1.24.0`
- Typecheck: PASS
- Build: PASS