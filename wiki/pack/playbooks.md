# Playbooks

Thirteen situation entry points. Routing picks one. Do not run two.

Each row states when it applies, when it does not, and its skill budget.

| Playbook | Applies when | Not for | Budget |
|---|---|---|---|
| [build-feature](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/build-feature.md) | New behaviour with acceptance criteria is requested | Changing existing behaviour; moving a boundary | 7 loads |
| [fix-bug](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/fix-bug.md) | A defect reproduces and the expected behaviour is known | Unexplained behaviour; a feature gap | 4 loads |
| [refactor](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/refactor.md) | Structure changes and behaviour must not | Any behaviour change | 5 loads |
| [migrate](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/migrate.md) | Stored data, a public contract or a running system changes shape | Fresh implementation; same-shape moves | 6 loads |
| [change-architecture](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/change-architecture.md) | A boundary, contract or ownership moves | Local restructuring; stored data changes | 8 loads |
| [change-infrastructure](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/change-infrastructure.md) | Deploys, CI, containers, secrets or cloud resources change | Application code; a one-off manual fix | 6 loads |
| [improve-performance](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/improve-performance.md) | A number must move and can be measured today | No baseline exists; a profile needs reading | 6 loads |
| [prove-ui](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/prove-ui.md) | A claim is about what a user sees or does | Backend behaviour; a design still being chosen | 5 loads |
| [understand](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/understand.md) | Behaviour or cause is unknown and reading the system is the work | A defect with a known repro; a design decision | 4 loads |
| [spike](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/spike.md) | A decision needs an experiment and the result may be thrown away | Production code; a question reading can answer | 4 loads, one timebox |
| [write-docs](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/write-docs.md) | The artifact is explanation — README, guide, reference, record | Code with docs as a side effect; release notes | 5 loads |
| [deliver](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/deliver.md) | Work is complete and must be proven and shipped | Unfinished work; discovery; a release with no change | 6 loads |
| [maintain-playbook](https://github.com/vipintom/vstack-playbook/blob/master/playbooks/maintain-playbook.md) | The pack itself changes — skill, playbook, principle | Project work that merely uses the pack | 6 loads |

## The budget

The budget is a cap on skill loads for that playbook, not a quota to spend. A
playbook that finishes in three loads under a budget of seven has done well.

## No playbook fits

Route to `figure-it-out` and say what made the situation unrecognisable. Do not
force a wrong playbook to avoid admitting the gap.

## Reading one

```bash
cat vstack-playbook/playbooks/fix-bug.md
```

A playbook names its phases, the skills it loads in order, and the check at
each gate. It does not contain the skill procedures — those live in
`skills/<name>/SKILL.md` and load on demand.

---

See also: [routing](../methodology/routing.md) · [skills](skills.md) · [verification](../reference/verification.md)
