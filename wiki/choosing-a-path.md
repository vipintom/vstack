# Choosing a path

Three levels of adoption. Start at the smallest one that solves your problem.

## Path 1 — the pack only

**You get:** 54 skills, 13 playbooks, 12 principles.
**You need:** a clone and a skills directory.
**You record:** in your own plan file, commit messages, or a handoff note.

This is the default recommendation. Every skill in the pack completes without
the recorder. Where a skill offers a recording call, the same fact goes into
the plan, commit or handoff when the recorder is absent.

Use this when you want the method, not bookkeeping.

## Path 2 — pack plus recorder

**You get:** everything above, plus deliveries, tasks, evidence, decisions,
handoffs and a close record in `.vstack/`.
**You need:** Node 20+, pnpm, one build.
**You record:** in `.vstack/`, written only by the recorder.

Use this when the record matters — a delivery someone else will read, evidence
you need to defend, or a handoff across sessions.

The recorder refuses things the method forbids. It will not complete a task
without passing evidence linked to that task, and it will not close with open
tasks or failed checks. See [enforcement](recorder/enforcement.md).

## Path 3 — pack, recorder and panel

**You get:** everything above, plus seven read-only views over `.vstack/`.
**You need:** OpenChamber 1.24.0 or later.
**You record:** nothing extra. The panel writes nothing.

Use this when you want to see the state of a delivery without reading JSON.

## Cost

| | Pack | + Recorder | + Panel |
|---|---|---|---|
| Install | clone | clone, install, build | extension install |
| Runtime dependency | none | none beyond host peer | `@openchamber/sdk` at build |
| Writes outside its target | none | `.vstack/` only | nothing |
| Works offline | yes | after one install | after one install |
| Tested end to end | counts and links | 38 tests, real sessions | 24 tests |

## What does not change

Routing, phases, tiers and artifacts are identical at every path. The recorder
records what you were going to record anyway; it does not add ceremony. The
panel shows what the recorder wrote; it adds no new facts.

## Recommended order

Install the pack. Use it for a week. Add the recorder when you find yourself
re-explaining a delivery to a later session. Add the panel when you find
yourself reading `.vstack/state.json` by hand.

---

See also: [installation](installation.md) · [portable use](pack/portable-use.md) · [first delivery](first-delivery.md)
