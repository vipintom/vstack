# Lifecycle

Seven phases. Each has an entry condition, an action and an artifact. Quick
work compresses them; it does not skip them silently.

| Phase | You are deciding | The artifact |
|---|---|---|
| `route` | Which playbook, which tier, which skills | The routing record |
| `shape` | What the problem actually is: outcome, boundaries, unknowns, proof | The framed problem |
| `plan` | What order the work goes in, and how each step is checked | Tasks with checks |
| `build` | Making the change | The change itself |
| `prove` | Whether it works | Evidence: claim, command, result |
| `review` | Whether it should be accepted | Findings, or a recorded decision |
| `close` | Whether the done-predicate holds | The close record |

## Why shape before plan

A plan built on an unstated problem orders the wrong work. `shape` exists to
force the outcome, the boundaries, the unknowns and the proof into writing
before a single task is created.

If the problem is already framed — the request is unambiguous — `shape` is
short. It is not optional.

## Why prove is separate from build

Building something and knowing it works are different acts. Merging them is how
"it should work" becomes a reported result.

`prove` requires a command that ran and what it said. See
[artifacts](artifacts.md).

## Why review is separate from prove

Prove asks "does it work". Review asks "should we keep it". The author does not
grade their own work — see
[independent-challenge](https://github.com/vipintom/vstack-playbook/blob/master/principles/independent-challenge.md).

## Why close is a phase

Closing is a claim: the done-predicate is proven. It is checked, not asserted.
With the recorder installed, the check is enforced — see
[enforcement](../recorder/enforcement.md).

## Quick tier

For one-file, reversible, obvious work, the phases compress:

- `route` records `tier: quick` and stops.
- `shape` and `plan` collapse into the edit itself.
- `prove` is still required: run the check, record what it said.
- `review` and `close` may be a single line in the commit message.

What never compresses away: the check, and the honest reporting of its result.

## Moving backward

A phase may move forward. Moving backward requires a recorded reason — with the
recorder, `vstack_route` with `action: phase` and a `reason`. This happens when
review finds a defect that reopens shape, or prove fails and the plan was wrong.

---

See also: [tiers](tiers.md) · [artifacts](artifacts.md) · [recorder state](../recorder/state.md)
