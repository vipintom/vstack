# Recorder overview

The recorder is an OpenCode plugin. It exposes exactly six tools and is the
only writer of `.vstack/`.

It is optional. The pack works without it — see
[portable use](../pack/portable-use.md).

## What it does

Six capabilities, each bound to one tool: open and move a delivery, track tasks
against their checks, record evidence and the task it proves, record decisions
and handoffs, and close with a durable record.

The canonical list sits with the component that implements it —
[`vstack-opencode/README.md`](https://github.com/vipintom/vstack-opencode/blob/master/README.md)
— rather than being restated here. When the two disagree, the repository wins.

What matters for reading the rest of this wiki is the shape of the record: a
delivery carries a playbook, a tier, a phase, tasks with checks, evidence
linked to tasks, decisions with alternatives, handoffs with a next action, and
on close a review outcome and any waiver.

## What it refuses

- Completing a task with no passing evidence linked to that task.
- Closing with open tasks, missing evidence or failed task-linked evidence.
- Closing when the review outcome is `changes_requested`.
- Appending history that breaks the hash chain.
- Moving a phase backward without a recorded reason.
- Opening a second active delivery while one is open.

## What it never does

- Run a project command. It records the command that was run.
- Call a model.
- Write outside `.vstack/`.
- Start a network request.

## Exactly six tools

| Tool | Purpose |
|---|---|
| `vstack_route` | Open, park, resume or read a delivery; change phase |
| `vstack_task` | Add, start or complete a task |
| `vstack_evidence` | Record claim, check, result, artifact and task |
| `vstack_decision` | Record choice, alternatives, reason, consequence, owner |
| `vstack_handoff` | Record state, next action, blockers, tree status |
| `vstack_close` | Validate, record review and waiver, write the close record |

There is no seventh tool, no CLI, no service and no database.

```bash
grep -c '"vstack_' vstack-opencode/src/tools/index.ts
# 6
```

## Dependencies

Zero runtime dependencies beyond the host `@opencode/plugin` peer:

```bash
node -e "console.log(JSON.stringify(require('./vstack-opencode/package.json').dependencies))"
# {}
```

This is deliberate. OpenCode loads a local plugin directory by reading its
files rather than installing that package's dependencies, so a runtime
dependency would fail to resolve and the whole plugin would never load — and
the failure would look like "the hook did not run".

## Where to read more

- [tools](tools.md) — exact arguments for each of the six
- [state](state.md) — what lands on disk
- [enforcement](enforcement.md) — each gate and why
- [evidence model](evidence-model.md) — task linking
- [close record](close-record.md) — what a finished delivery contains
- [troubleshooting](troubleshooting.md) — when it will not load

---

See also: [installation](../installation.md) · [panel overview](../panel/overview.md) · [choosing a path](../choosing-a-path.md)
