# Routing

Routing decides what loads before anything loads. It is the first act of every
delivery.

## The three decisions

1. **Playbook** — which of the 13 situations you are in
2. **Tier** — how much rigour the risk warrants
3. **Skills** — at most two, three at Deep, plus the ones you deliberately skip

## The load cap

The cap is the point. Two skills force a judgement about which two matter.
Naming a third is allowed at Deep only because Deep work genuinely spans
contract, data and adversarial review.

The route records what was **skipped** and why, so a later reader can see the
trade-off rather than guess at it.

```json
{
  "playbook": "fix-bug",
  "tier": "standard",
  "skills": ["debug", "tdd"],
  "skipped": ["red-team"],
  "done-when": "the flaky case fails 0/50 runs",
  "recorded": "plan.md#route"
}
```

A reader must be able to answer "what was chosen, what was skipped and why"
from the record alone. No record, no route.

## When not to route

- One file changes and the fix is obvious → edit it.
- The user names the skill → run that skill.
- The question is answered by reading one file → read it and answer.

Routing is not ceremony for small things. It exists for work that will produce
more than one artifact.

## The triviality check

If the work is one edit, one file and reversible, record `tier: quick` and
stop routing. The Quick line is the route.

## When nothing fits

If no playbook matches after one pass, route to `figure-it-out` and say what
made the situation unrecognisable. Do not force a wrong playbook to avoid
admitting the gap.

## Recording it

With the recorder:

```text
vstack_route
  action: open
  title: "flaky login check"
  tier: standard
  playbook: fix-bug
  outcome: "a login check that does not flake"
  doneWhen: "the case fails 0/50 runs"
  skills: ["debug", "tdd"]
  skipped: ["red-team"]
```

Without it, write the same fields at the top of your project plan or into a
delivery note in the repository.

The recorder accepts `action: open | read | park | resume | phase`. With no
arguments it reads current state. See [tools](../recorder/tools.md).

---

See also: [playbooks](../pack/playbooks.md) · [skills](../pack/skills.md) · [tiers](tiers.md)
