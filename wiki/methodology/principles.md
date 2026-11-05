# Principles

Twelve rules. Each names a trigger, a test and the failure it prevents.

This page links; it does not restate. The canonical text lives in
[`principles/`](https://github.com/vipintom/vstack-playbook/tree/master/principles)
in the pack.

| Principle | Rule | Failure it prevents |
|---|---|---|
| [harness-independence-first](https://github.com/vipintom/vstack-playbook/blob/master/principles/harness-independence-first.md) | The method outranks the tools. | A workflow that only runs in one harness |
| [procedures-over-vague-instructions](https://github.com/vipintom/vstack-playbook/blob/master/principles/procedures-over-vague-instructions.md) | A skill is a procedure, not an encouragement. | "Do a good job" dressed as a skill |
| [evidence-before-completion](https://github.com/vipintom/vstack-playbook/blob/master/principles/evidence-before-completion.md) | A claim is an artifact. | Success reported for work that was never checked |
| [smallest-complete-change](https://github.com/vipintom/vstack-playbook/blob/master/principles/smallest-complete-change.md) | Solve the stated problem, in the smallest change that fully solves it. | Half-solutions and scope creep |
| [understand-before-changing](https://github.com/vipintom/vstack-playbook/blob/master/principles/understand-before-changing.md) | Read the path before editing it. | Edits made against an imagined codebase |
| [model-domain-explicitly](https://github.com/vipintom/vstack-playbook/blob/master/principles/model-domain-explicitly.md) | Name the things in the problem, then let the code follow. | Generic names hiding real concepts |
| [respect-boundaries](https://github.com/vipintom/vstack-playbook/blob/master/principles/respect-boundaries.md) | Every boundary has one owner. | Two modules writing the same fact |
| [route-before-loading](https://github.com/vipintom/vstack-playbook/blob/master/principles/route-before-loading.md) | Choose the playbook and the tier before loading skills. | Three skills loaded, two irrelevant |
| [independent-challenge](https://github.com/vipintom/vstack-playbook/blob/master/principles/independent-challenge.md) | The author does not grade their own work. | Self-review passing a defect |
| [verifiable-increments](https://github.com/vipintom/vstack-playbook/blob/master/principles/verifiable-increments.md) | Every increment ends in something checkable. | Ten changes merged, one untestable claim |
| [flexible-workflows-not-mandatory-ceremony](https://github.com/vipintom/vstack-playbook/blob/master/principles/flexible-workflows-not-mandatory-ceremony.md) | Rigour follows risk. | Design reviews on one-line fixes |
| [degrade-gracefully](https://github.com/vipintom/vstack-playbook/blob/master/principles/degrade-gracefully.md) | Prefer the smallest runtime that meets the need. | A service where a function would do |

## Precedence

When two principles conflict, apply the order in `skills/principles/SKILL.md`:

**truth → safety → reversibility → speed → elegance**

So a truthful but inelegant answer beats an elegant one that conceals a
problem, and a safe change beats a fast one.

## Loading one

Ask for the `principles` skill when a decision needs the rule behind it, or
when two reasonable approaches must be adjudicated before work continues. It is
not the skill for following a procedure — that is the procedure's own skill.

---

See also: [overview](overview.md) · [routing](routing.md) · [tiers](tiers.md)
