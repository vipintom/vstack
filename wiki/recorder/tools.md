# Recorder tools

Exactly six. Arguments below are the schema the recorder enforces — an argument
outside it is rejected.

## `vstack_route`

Open, park, resume or read a delivery. No arguments reads state.

| Argument | Type | Notes |
|---|---|---|
| `action` | `open` \| `read` \| `park` \| `resume` \| `phase` | Omit to read |
| `id` | string | For `resume` |
| `title` | string | On open |
| `tier` | `quick` \| `standard` \| `deep` | |
| `playbook` | string | One of the 13 |
| `outcome` | string | What exists afterwards |
| `doneWhen` | string | The check that proves it |
| `skills` | string[] | At most two, three at Deep |
| `skipped` | string[] | Deliberately not loaded, with reason |
| `phase` | `route` \| `shape` \| `plan` \| `build` \| `prove` \| `review` \| `close` | With `action: phase` |
| `reason` | string | Required when moving a phase backward |

Fresh project, no delivery open:

```text
vstack_route
→ {"ok":true,"delivery":null}
```

## `vstack_task`

| Argument | Type | Notes |
|---|---|---|
| `action` | `add` \| `start` \| `complete` | Required |
| `taskId` | string | For `start` and `complete` |
| `title` | string | On `add` |
| `check` | string | Required on `add` — the proof |
| `evidenceId` | string | Required on `complete` |
| `artifact` | string | Optional on `add` |

Completion is refused without evidence whose result is `passed` or `judgement`.

## `vstack_evidence`

| Argument | Type | Notes |
|---|---|---|
| `claim` | string | Required |
| `check` | string | Required — the command or observation |
| `result` | `passed` \| `failed` \| `blocked` \| `not_verified` \| `judgement` | Required |
| `artifact` | string | Where the reader looks |
| `taskId` | string | Links the evidence to a task |

Evidence with no `taskId` cannot complete any task.

## `vstack_decision`

All five required. A decision missing an alternative or a reason is refused.

| Argument | Required |
|---|---|
| `choice` | yes |
| `alternatives` | yes |
| `reason` | yes |
| `consequence` | yes |
| `owner` | yes |

## `vstack_handoff`

| Argument | Required | Notes |
|---|---|---|
| `state` | yes | |
| `nextAction` | yes | A handoff without one is refused |
| `blockers` | no | string[] |
| `treeStatus` | no | |

## `vstack_close`

| Argument | Type | Notes |
|---|---|---|
| `summary` | string | |
| `review` | object | `{outcome, owner, notes?}` — outcome is `approved` or `changes_requested` |
| `waiver` | object | `{reason, owner}` — both required |

A `changes_requested` review refuses the close. A waiver is recorded and never
bypasses a gate. See [enforcement](enforcement.md).

## Reading state with no delivery

```text
vstack_route
→ {"ok":true,"delivery":null}
```

That is the correct answer on a fresh project, and the fastest way to confirm
the plugin loaded.

---

See also: [enforcement](enforcement.md) · [evidence model](evidence-model.md) · [state](state.md)
