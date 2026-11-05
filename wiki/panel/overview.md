# Panel overview

The panel is an OpenChamber extension. It reads `.vstack/` and shows seven
views. It writes nothing and never touches the network.

It requires the recorder. It does not work from the Markdown pack alone — see
[choosing a path](../choosing-a-path.md).

## What it shows

| View | Shows |
|---|---|
| **Now** | Active delivery, phase, next task, next action, blockers, last activity |
| **Plan** | Tasks grouped by status, each with its check, evidence state and a copyable command |
| **Evidence** | Claims grouped by task; a task with no evidence shows **not run** |
| **Timeline** | Every recorded event in order |
| **Decisions** | Choices, alternatives, reasons, the review outcome and any waiver |
| **Deliveries** | Active, parked and closed records; select one to read it |
| **Health** | Missing files, stale state, incompatible version, broken history |

Full detail: [views](views.md).

## What it cannot do

- Write to `.vstack/`.
- Make a network request.
- Run a shell command.
- Invent a value.

Actionable rows offer a **copyable command** — you copy it and run it yourself.
The panel never executes it.

## The five states

`missing`, `stale`, `incompatible`, `invalid`, `healthy`. Each has its own
message and its own next command. See [states](states.md).

The panel never renders a partial view of state it does not understand. A
newer schema is reported as `incompatible` and nothing is guessed.

## Honest rendering rules

- A task with no evidence renders as **not run**, never as done.
- A read error renders as an error, never as an empty project.
- A stale state is reported when the last history revision differs from
  `state.revision`. Equal revisions are healthy.
- If `state.json` is broken, **Deliveries** still lists archived records.

## Files it reads

- `.vstack/state.json` and `.vstack/history.jsonl` on every refresh
- `.vstack/deliveries/*.json`, reloaded only when state or history changes
- the Markdown record path named by a delivery

Archives are cached until state or history moves, so a large archive directory
does not slow every refresh.

## Proof of read-only

See [read-only](read-only.md) for the code path and the test.

---

See also: [views](views.md) · [states](states.md) · [recorder overview](../recorder/overview.md)
