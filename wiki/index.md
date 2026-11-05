# vstack

A portable agentic-development method: 54 skills, 13 playbooks and 12
principles in plain Markdown, plus an optional recorder and an optional panel.

The pack works with no software installed. The recorder and the panel are
add-ons you can ignore.

## Three components

| Component | What it does | Required? |
|---|---|---|
| [`vstack-playbook`](https://github.com/vipintom/vstack-playbook) | The method: skills, playbooks, principles | Yes — this is the method |
| [`vstack-opencode`](https://github.com/vipintom/vstack-opencode) | Records deliveries, tasks and evidence in `.vstack/` | No |
| [`vstack-openchamber`](https://github.com/vipintom/vstack-openchamber) | Reads `.vstack/` and shows seven views | No |

This repository holds documentation only. It has no code, no contracts and no
release metadata.

## Start here

| If you want to | Read |
|---|---|
| Install it | [installation.md](installation.md) |
| See it work once | [first-delivery.md](first-delivery.md) |
| Decide how much to adopt | [choosing-a-path.md](choosing-a-path.md) |
| Understand the method | [methodology/overview.md](methodology/overview.md) |
| Look up a number and its command | [reference/verification.md](reference/verification.md) |

## The method in one paragraph

A request arrives. You **route** it: one playbook, one rigour tier, at most two
skills. You follow the playbook through its phases — shape, plan, build, prove,
review, close — and each phase leaves an artifact behind. A claim without an
artifact is not evidence. A check that did not run is reported as not run, never
as passed. You close only when the done-predicate is proven.

## Map

**Start**
[installation](installation.md) ·
[first delivery](first-delivery.md) ·
[choosing a path](choosing-a-path.md)

**Methodology**
[overview](methodology/overview.md) ·
[lifecycle](methodology/lifecycle.md) ·
[tiers](methodology/tiers.md) ·
[artifacts](methodology/artifacts.md) ·
[principles](methodology/principles.md) ·
[routing](methodology/routing.md)

**Pack**
[playbooks](pack/playbooks.md) ·
[skills](pack/skills.md) ·
[skill anatomy](pack/skill-anatomy.md) ·
[writing skills](pack/writing-skills.md) ·
[portable use](pack/portable-use.md)

**Recorder**
[overview](recorder/overview.md) ·
[tools](recorder/tools.md) ·
[state](recorder/state.md) ·
[enforcement](recorder/enforcement.md) ·
[park and resume](recorder/park-resume.md) ·
[evidence model](recorder/evidence-model.md) ·
[close record](recorder/close-record.md) ·
[troubleshooting](recorder/troubleshooting.md)

**Panel**
[overview](panel/overview.md) ·
[views](panel/views.md) ·
[states](panel/states.md) ·
[read-only](panel/read-only.md) ·
[troubleshooting](panel/troubleshooting.md)

**Reference**
[compatibility](reference/compatibility.md) ·
[state schema](reference/state-schema.md) ·
[rename map](reference/rename-map.md) ·
[glossary](reference/glossary.md) ·
[faq](reference/faq.md) ·
[verification](reference/verification.md)

**Recipes**
[bug fix](recipes/bug-fix.md) ·
[refactor](recipes/refactor.md) ·
[migrate](recipes/migrate.md) ·
[ci](recipes/ci.md)

## What this repository is not

Not an umbrella. Not a package. Not a runtime. Not the pack — nothing in
`wiki/` is counted as pack content.

---

See also: [installation](installation.md) · [choosing a path](choosing-a-path.md) · [reference/verification](reference/verification.md)
