# State schema

Schema version `2`. Defined in `vstack-opencode/src/state/types.ts`.

```bash
grep -c 'schemaVersion' vstack-opencode/src/state/types.ts
```

## Top level — `state.json`

| Field | Type | Notes |
|---|---|---|
| `schemaVersion` | `1` | A newer value is `incompatible` for the panel |
| `revision` | number | Increments per event; the panel's stale check compares this |
| `createdAt` | ISO 8601 | |
| `updatedAt` | ISO 8601 | |
| `delivery` | `Delivery \| null` | `null` when none is active |

## `Delivery`

| Field | Type |
|---|---|
| `id` | string |
| `title` | string |
| `tier` | `quick` \| `standard` \| `deep` |
| `playbook` | string |
| `phase` | `route` \| `shape` \| `plan` \| `build` \| `prove` \| `review` \| `close` |
| `status` | `active` \| `parked` \| `closed` |
| `outcome` | string |
| `doneWhen` | string |
| `skills` | string[] |
| `skipped` | string[] |
| `tasks` | `Task[]` |
| `evidence` | `Evidence[]` |
| `decisions` | `Decision[]` |
| `handoffs` | `Handoff[]` |
| `createdAt`, `updatedAt` | ISO 8601 |
| `closedAt` | ISO 8601 or `null` |
| `close` | `CloseRecord` or `null` |

## `Task`

| Field | Type |
|---|---|
| `id` | string |
| `title` | string |
| `status` | `todo` \| `doing` \| `done` \| `blocked` |
| `check` | string — required, the proof |
| `evidenceId` | string or `null` |
| `artifact` | string or `null` |
| `createdAt`, `updatedAt` | ISO 8601 |

## `Evidence`

| Field | Type |
|---|---|
| `id` | string |
| `claim` | string |
| `check` | string |
| `result` | `passed` \| `failed` \| `blocked` \| `not_verified` \| `judgement` |
| `artifact` | string or `null` |
| `taskId` | string, or absent |
| `createdAt` | ISO 8601 |

`taskId` is optional. Without it the evidence completes no task.

## `Decision`, `Handoff`, `Review`, `CloseRecord`

| Type | Fields |
|---|---|
| `Decision` | `id`, `choice`, `alternatives`, `reason`, `consequence`, `owner`, `createdAt` |
| `Handoff` | `id`, `state`, `nextAction`, `blockers[]`, `treeStatus`, `createdAt` |
| `Review` | `outcome` (`approved` \| `changes_requested`), `notes`, `owner` |
| `CloseRecord` | `recordPath`, `summary`, `review?`, `waiver {reason, owner} \| null`, `closedAt` |

## Validation

`src/state/schema.ts` is a dependency-free validator — no `ajv`, no runtime
dependency. It rejects:

- missing or non-object state
- a missing or unknown `schemaVersion` (unknown is `invalid`, newer is
  `incompatible`)
- a missing `revision`
- malformed `delivery`, `tasks`, `evidence`, `decisions`, `handoffs`
- malformed timestamps or `closedAt`

## History — `history.jsonl`

One JSON object per line, append-only, each carrying the hash of the previous
line. A broken chain is refused on read.

## Compatibility

A panel reading a newer schema reports `incompatible` and renders nothing
partial. Both components declare schema `2`; see
[compatibility](compatibility.md).

---

See also: [recorder state](../recorder/state.md) · [compatibility](compatibility.md) · [panel states](../panel/states.md)
