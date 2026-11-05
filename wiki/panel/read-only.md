# Panel read-only

The panel has no write path and no network path. This page says where that is
enforced and how it is checked.

## Files it reads

- `.vstack/state.json`
- `.vstack/history.jsonl`
- `.vstack/deliveries/*.json`
- the Markdown record path named by a delivery

It reads state and history on every refresh. Archives reload only when state or
history changes.

## What it never does

| Never | Why |
|---|---|
| Write to `.vstack/` | The recorder is the only writer |
| Make a network request | The panel has no network path |
| Run a shell command | Actionable rows offer a **copyable** command |
| Derive a value | Every value comes from a file |

## Copyable commands, not executed ones

Rows in Plan and Health offer commands like:

```text
vstack_task action:start taskId:tsk_2
```

You copy it. You run it. The panel does not.

This is the boundary that matters most: the panel can *show* you the next
action without being able to *take* it.

## The capability declaration

The extension declares exactly one capability:

```bash
node -e "console.log(JSON.stringify(require('./vstack-openchamber/package.json').openchamber.contributes.capabilities))"
# ["files"]
```

`files` — read project files. Nothing else is requested.

## What the tests assert

The panel test suite covers the read-only boundary directly, alongside all five
health states, seven views, active and archived deliveries, and evidence
grouping.

```bash
./docker/test.sh panel
# 24 tests pass
```

## What it does not claim

- Not that the panel validates the record. It renders what it finds and
  reports what it cannot parse.
- Not that reading is side-effect free at the filesystem level — a refresh
  reads files. It does not write them.

---

See also: [overview](overview.md) · [states](states.md) · [recorder state](../recorder/state.md)
