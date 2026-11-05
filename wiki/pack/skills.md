# Skills

Fifty-four skills, grouped by what they are for.

This is an index, not a copy. Each row links to the skill in the pack; the
canonical description lives there. See
[skill anatomy](skill-anatomy.md) for the shape every skill follows.

```bash
find vstack-playbook/skills -name SKILL.md | wc -l
# 54
```

## Entry and routing

| Skill | Use it when |
|---|---|
| [route](https://github.com/vipintom/vstack-playbook/blob/master/skills/route/SKILL.md) | A request arrives with no playbook open |
| [help](https://github.com/vipintom/vstack-playbook/blob/master/skills/help/SKILL.md) | Someone asks what the pack contains or which skill fits |
| [figure-it-out](https://github.com/vipintom/vstack-playbook/blob/master/skills/figure-it-out/SKILL.md) | No playbook fits and a bespoke sequence is needed |

## Frame and plan

| Skill | Use it when |
|---|---|
| [shape](https://github.com/vipintom/vstack-playbook/blob/master/skills/shape/SKILL.md) | The request is understood but the problem is not framed |
| [sharpen](https://github.com/vipintom/vstack-playbook/blob/master/skills/sharpen/SKILL.md) | Wording is ambiguous or acceptance criteria are missing |
| [plan](https://github.com/vipintom/vstack-playbook/blob/master/skills/plan/SKILL.md) | The work must be ordered into tasks with checks |
| [principles](https://github.com/vipintom/vstack-playbook/blob/master/skills/principles/SKILL.md) | A decision needs the rule behind it |

## Understand the code

| Skill | Use it when |
|---|---|
| [code-tour](https://github.com/vipintom/vstack-playbook/blob/master/skills/code-tour/SKILL.md) | Someone must understand how existing code works |
| [impact](https://github.com/vipintom/vstack-playbook/blob/master/skills/impact/SKILL.md) | A change's blast radius must be known first |
| [rationale](https://github.com/vipintom/vstack-playbook/blob/master/skills/rationale/SKILL.md) | A decision's history must be reconstructed |

## Design

| Skill | Use it when |
|---|---|
| [design](https://github.com/vipintom/vstack-playbook/blob/master/skills/design/SKILL.md) | Boundaries, interfaces and data flow must be decided |
| [blueprint](https://github.com/vipintom/vstack-playbook/blob/master/skills/blueprint/SKILL.md) | An accepted design must become concrete interfaces and files |
| [audit](https://github.com/vipintom/vstack-playbook/blob/master/skills/audit/SKILL.md) | A repository must be judged against stated quality attributes |

## Build

| Skill | Use it when |
|---|---|
| [tdd](https://github.com/vipintom/vstack-playbook/blob/master/skills/tdd/SKILL.md) | Behaviour must change and a test can state it first |
| [refactor](https://github.com/vipintom/vstack-playbook/blob/master/skills/refactor/SKILL.md) | Structure must change while behaviour stays the same |
| [prototype](https://github.com/vipintom/vstack-playbook/blob/master/skills/prototype/SKILL.md) | A design question can only be answered by building it |
| [typescript](https://github.com/vipintom/vstack-playbook/blob/master/skills/typescript/SKILL.md) | Types, module boundaries or build config decide safety |
| [api-design](https://github.com/vipintom/vstack-playbook/blob/master/skills/api-design/SKILL.md) | A request/response contract must be designed or changed |
| [fastapi](https://github.com/vipintom/vstack-playbook/blob/master/skills/fastapi/SKILL.md) | An async Python HTTP service is built or changed |
| [mcp-server](https://github.com/vipintom/vstack-playbook/blob/master/skills/mcp-server/SKILL.md) | A Model Context Protocol server is being built |

## Prove

| Skill | Use it when |
|---|---|
| [verify](https://github.com/vipintom/vstack-playbook/blob/master/skills/verify/SKILL.md) | An independent run must prove work is complete |
| [coverage](https://github.com/vipintom/vstack-playbook/blob/master/skills/coverage/SKILL.md) | It is unclear whether tests prove the criteria |
| [verify-setup](https://github.com/vipintom/vstack-playbook/blob/master/skills/verify-setup/SKILL.md) | A project has no reliable way to prove a change works |
| [verify-maintain](https://github.com/vipintom/vstack-playbook/blob/master/skills/verify-maintain/SKILL.md) | Verification commands may have drifted from the code |
| [browser-testing](https://github.com/vipintom/vstack-playbook/blob/master/skills/browser-testing/SKILL.md) | Behaviour must be proven in a real browser |

## Interface

| Skill | Use it when |
|---|---|
| [frontend-design](https://github.com/vipintom/vstack-playbook/blob/master/skills/frontend-design/SKILL.md) | A new interface needs deliberate visual direction |
| [visual-parity](https://github.com/vipintom/vstack-playbook/blob/master/skills/visual-parity/SKILL.md) | A UI must match a defined reference and the difference shown |

## Platform

| Skill | Use it when |
|---|---|
| [docker](https://github.com/vipintom/vstack-playbook/blob/master/skills/docker/SKILL.md) | An application must be built, run or shipped in containers |
| [ci](https://github.com/vipintom/vstack-playbook/blob/master/skills/ci/SKILL.md) | A pipeline decides what gets verified, cached or released |
| [makefile](https://github.com/vipintom/vstack-playbook/blob/master/skills/makefile/SKILL.md) | Developer and CI commands need one entry point |
| [gitignore](https://github.com/vipintom/vstack-playbook/blob/master/skills/gitignore/SKILL.md) | Ignore rules must keep secrets and build output out |

## Measure and diagnose

| Skill | Use it when |
|---|---|
| [performance](https://github.com/vipintom/vstack-playbook/blob/master/skills/performance/SKILL.md) | A performance claim needs a baseline and a measured change |
| [forensics](https://github.com/vipintom/vstack-playbook/blob/master/skills/forensics/SKILL.md) | A profile, trace, heap or log set must be interpreted |
| [debug](https://github.com/vipintom/vstack-playbook/blob/master/skills/debug/SKILL.md) | A failure reproduces but its cause is unknown |

## Challenge

| Skill | Use it when |
|---|---|
| [review](https://github.com/vipintom/vstack-playbook/blob/master/skills/review/SKILL.md) | A diff, design or document must be examined for defects |
| [red-team](https://github.com/vipintom/vstack-playbook/blob/master/skills/red-team/SKILL.md) | A change needs an adversary that tries to break it |
| [rubrics](https://github.com/vipintom/vstack-playbook/blob/master/skills/rubrics/SKILL.md) | A review needs explicit criteria instead of taste |

## Record

| Skill | Use it when |
|---|---|
| [evidence](https://github.com/vipintom/vstack-playbook/blob/master/skills/evidence/SKILL.md) | A claim is about to be reported or handed over |
| [decisions](https://github.com/vipintom/vstack-playbook/blob/master/skills/decisions/SKILL.md) | A choice will matter later and must be recorded |
| [report](https://github.com/vipintom/vstack-playbook/blob/master/skills/report/SKILL.md) | Work must be explained to someone who did not do it |
| [lessons](https://github.com/vipintom/vstack-playbook/blob/master/skills/lessons/SKILL.md) | The same mistake has happened twice |

## Continue and ship

| Skill | Use it when |
|---|---|
| [handoff](https://github.com/vipintom/vstack-playbook/blob/master/skills/handoff/SKILL.md) | Work pauses and another session must continue |
| [resume](https://github.com/vipintom/vstack-playbook/blob/master/skills/resume/SKILL.md) | Picking up work from a previous session or handoff |
| [recovery](https://github.com/vipintom/vstack-playbook/blob/master/skills/recovery/SKILL.md) | Work was interrupted mid-operation and must return to known-good |
| [ready](https://github.com/vipintom/vstack-playbook/blob/master/skills/ready/SKILL.md) | Work is claimed complete and a merge decision must be made |
| [ship](https://github.com/vipintom/vstack-playbook/blob/master/skills/ship/SKILL.md) | A readiness decision is made and the change must be published |
| [watch-pr](https://github.com/vipintom/vstack-playbook/blob/master/skills/watch-pr/SKILL.md) | CI, review comments or a rollout must be observed |
| [worktree](https://github.com/vipintom/vstack-playbook/blob/master/skills/worktree/SKILL.md) | Work needs isolation from the main checkout |

## Move data

| Skill | Use it when |
|---|---|
| [migration](https://github.com/vipintom/vstack-playbook/blob/master/skills/migration/SKILL.md) | Stored data or a contract must change shape without a flag day |

## Prose

| Skill | Use it when |
|---|---|
| [technical-writing](https://github.com/vipintom/vstack-playbook/blob/master/skills/technical-writing/SKILL.md) | Prose must let a reader complete a task |
| [unslop](https://github.com/vipintom/vstack-playbook/blob/master/skills/unslop/SKILL.md) | Generated prose is bloated, vague or repetitive |
| [unstick](https://github.com/vipintom/vstack-playbook/blob/master/skills/unstick/SKILL.md) | The same failure has survived several fixes |

## Maintain the pack

| Skill | Use it when |
|---|---|
| [skill-authoring](https://github.com/vipintom/vstack-playbook/blob/master/skills/skill-authoring/SKILL.md) | A new skill must be written or reshaped to the standard |
| [skill-eval](https://github.com/vipintom/vstack-playbook/blob/master/skills/skill-eval/SKILL.md) | It is unclear whether a skill fires on the right requests |

---

See also: [playbooks](playbooks.md) · [skill anatomy](skill-anatomy.md) · [verification](../reference/verification.md)
