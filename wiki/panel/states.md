# Panel states

Five. Each has its own message and its own next command. The panel never
renders a partial view of state it does not understand.

| State | Meaning | What the panel shows |
|---|---|---|
| `missing` | No `.vstack/` in this project | What to do to create one |
| `stale` | Last history revision differs from `state.revision` | The disagreement and the command to check |
| `incompatible` | State schema is newer than this panel reads | The version it found and the version it reads |
| `invalid` | A required record is malformed or broken | Which file, and what failed |
| `healthy` | Present, current and readable | The seven views |

## `missing`

No `.vstack/` directory. This is normal for a pack-only project.

**Next:** open a delivery with `vstack_route`, or read
[portable use](../pack/portable-use.md) if you are not using the recorder.

## `stale`

The last event in `history.jsonl` carries a different `revision` than
`state.json`. The recorder may have stopped mid-write.

Equal revisions are **healthy** — the panel compares the two, it does not use a
timestamp.

**Next:** check both files. Do not hand-edit either; see
[troubleshooting](../recorder/troubleshooting.md).

## `incompatible`

`state.json` declares a `schemaVersion` this panel does not read.

**Nothing is rendered.** No partial values, no best guess — a partially
understood record would be worse than none.

**Next:** upgrade the panel, or the recorder, so both agree on the schema.
Floors are in [compatibility](../reference/compatibility.md).

## `invalid`

A required file exists but is malformed: broken JSON, a missing required field,
a history line that fails validation.

**Next:** the message names the file. The panel reports the error rather than
showing an empty project — a read failure and an empty project are different
things.

Archived deliveries under `.vstack/deliveries/` remain browsable in this state,
because they are independent files.

## `healthy`

Present, current, readable. The seven views render.

## Rendering rules that hold in every state

- A task with no evidence is **not run**, never done.
- A read error is an error, never an empty project.
- A newer schema is `incompatible`, never partially rendered.
- Every value comes from `.vstack/`. None are derived.

---

See also: [views](views.md) · [overview](overview.md) · [troubleshooting](troubleshooting.md)
