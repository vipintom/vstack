# Panel troubleshooting

Match the state name, then run the command beside it.

## `missing`

**Symptom:** the panel says no `.vstack/` in this project.

**If you want the recorder:** open a delivery.

```text
vstack_route  action: open  title: "..."  tier: quick  playbook: ...  outcome: "..."  doneWhen: "..."
```

**If you do not:** this is correct. The pack works without it — see
[portable use](../pack/portable-use.md).

## `stale`

**Symptom:** the panel reports `stale`.

The last history revision and `state.revision` disagree.

**Do:** inspect both files.

```bash
tail -1 .vstack/history.jsonl
cat .vstack/state.json | grep revision
```

If the recorder was interrupted mid-write, the two differ. Equal is healthy.

**Do not:** hand-edit `history.jsonl`. It is hash-chained; an edited line is
refused on read. See [recorder troubleshooting](../recorder/troubleshooting.md).

## `incompatible`

**Symptom:** the panel reports `incompatible` and shows nothing else.

`state.json` declares a schema newer than this panel reads.

**Do:** align the versions.

- Panel floor: OpenChamber >= 1.24.0
- State schema: `1` in both recorder and panel

Exact floors: [compatibility](../reference/compatibility.md).

**Why nothing renders:** a partially understood record would present guesses as
facts. Refusing is the honest behaviour.

## `invalid`

**Symptom:** a named file is malformed.

**Do:** read the message — it names the file and what failed.

Common causes:

| File | Failure |
|---|---|
| `state.json` | Not JSON, or a required field missing |
| `history.jsonl` | A line is not JSON, or fails validation |
| an archive | `id`, `title`, `tier`, `playbook`, `phase`, `status` missing |

Archived deliveries stay browsable in this state. If the active state is
unrecoverable, `deliveries/` still holds the closed records.

## The panel does not appear

**Symptom:** no **vstack Workflow** entry.

Check OpenChamber >= 1.24.0, then re-enable the extension in Settings →
Extensions. See [installation](../installation.md).

## The panel appears but every view is empty

Almost always `missing` or `state.json` has no active delivery. Switch to
**Health** — it names the condition and the next command.

---

See also: [states](states.md) · [views](views.md) · [recorder troubleshooting](../recorder/troubleshooting.md)
