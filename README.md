# vstack

Documentation home for the vstack method.

vstack is a portable agentic-development method: a Markdown playbook, an
optional OpenCode recorder, and an optional read-only OpenChamber panel. This
repository holds the documentation. It holds no code, no contracts, no
compatibility matrix and no release metadata.

## The three component repositories

| Repository | Holds |
|---|---|
| [`vipintom/vstack-playbook`](https://github.com/vipintom/vstack-playbook) | 54 skills, 13 playbooks, 12 principles |
| [`vipintom/vstack-opencode`](https://github.com/vipintom/vstack-opencode) | The recorder: six tools, `.vstack/` state |
| [`vipintom/vstack-openchamber`](https://github.com/vipintom/vstack-openchamber) | The panel: seven read-only views |

Each is tagged `v0.2.2` and verified independently. The pack works with no
software installed at all.

## Install

```bash
git clone https://github.com/vipintom/vstack-playbook.git
cp -r vstack-playbook/skills/* ~/.config/opencode/skills/
```

The full path — recorder, panel, uninstall, offline, Windows — is in
[`wiki/installation.md`](wiki/installation.md).

## Documentation

Start at [`wiki/index.md`](wiki/index.md). The wiki is organised as:

- **Start** — install, first delivery, which adoption path to pick
- **Methodology** — lifecycle, tiers, artifacts, principles, routing
- **Pack** — the playbooks, the skills, how to write more
- **Recorder** — the six tools, state on disk, enforcement
- **Panel** — the seven views, the five honest states
- **Reference** — compatibility, state schema, glossary, verification
- **Recipes** — bug fix, refactor, migrate, CI

The product requirements live in
[`docs/vstack-0.2.0-prd.md`](docs/vstack-0.2.0-prd.md), with a coverage audit
beside it.

## What this repository is not

- **Not an umbrella.** It holds no shared contracts, no compatibility matrix and
  no release metadata. Those belong to the component repositories.
- **Not a package.** Nothing here is published to npm.
- **Not a runtime.** There is no code, service, CLI or database.
- **Not the pack.** Nothing in `wiki/` is counted as pack content.

## Licence

MIT. See [`LICENSE`](LICENSE) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

Public repository, read-only: issues are welcome; pull requests are not
accepted in 0.2.x.
