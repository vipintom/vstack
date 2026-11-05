# Park and resume

One active delivery at a time. Parking is how you work on a second one without
losing the first.

## The problem

Two deliveries open at once makes "current state" ambiguous: which phase, which
tasks, which evidence belongs where?

The recorder refuses a second open delivery.

## Park

```text
vstack_route
  action: park
  id: dlv_1
```

The active delivery archives into `.vstack/deliveries/<id>.json` and
`<id>.md`, and `state.json` no longer names an active delivery.

The slot is free.

## Open the second

```text
vstack_route
  action: open
  title: "urgent login fix"
  tier: quick
  playbook: fix-bug
  outcome: "login succeeds on retry"
  doneWhen: "the repro no longer fires"
```

## Resume

```text
vstack_route
  action: resume
  id: dlv_1
```

The parked delivery restores with its phase, tasks, evidence, decisions and
handoffs intact.

## What parking does not do

- Does not delete anything. The archive is a copy of the full record.
- Does not change the phase.
- Does not close it. A parked delivery is not a finished one.
- Does not lose history — every event stays in the hash chain.

## Reading what is parked

```text
vstack_route
```

With no arguments this reads state. With nothing active it returns
`{"ok":true,"delivery":null}`; parked deliveries are listed under
`.vstack/deliveries/`.

The panel's **Deliveries** view lists active, parked and closed records, and
stays usable if `state.json` is broken. See
[panel views](../panel/views.md).

## When to park rather than close

Park when the work is paused but the done-predicate is not proven. Closing a
delivery with open tasks is refused — see [enforcement](enforcement.md).

If a delivery is genuinely abandoned, close it with an honest summary of what
was and was not completed, rather than parking it forever.

---

See also: [state](state.md) · [close record](close-record.md) · [panel views](../panel/views.md)
