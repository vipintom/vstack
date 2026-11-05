# Recipe: CI

What runs where, and what each job proves.

Two different pipelines exist. They are not the same thing.

## 1. The component repositories

`vstack-opencode` and `vstack-openchamber` each have `.github/workflows/ci.yml`
and `release.yml`. Both run inside `node:24-bookworm` containers — nothing runs
on a host runner.

Locally, the authoritative check is the Docker harness in the workspace that
holds all three component repositories:

```bash
./docker/test.sh build     # once
./docker/test.sh all       # recorder, panel and pack
```

```bash
./docker/opencode-smoke.sh     # six tools in a real session, 7 history events
./docker/skills-smoke.sh       # route skill plus recorder, closed delivery
./docker/skills-only-smoke.sh  # four playbooks, no plugin, no .vstack
./docker/playbooks-smoke.sh    # four playbooks through the recorder
```

A host-run `pnpm test` is **not** accepted release verification.

The harness is not published with any repository — see
[verification](../reference/verification.md).

## 2. This documentation repository

Docs CI runs on every push to `master`:

```yaml
- name: Wiki links
  run: node scripts/check-links.mjs wiki
- name: Document links
  run: node scripts/check-links.mjs docs
```

Plus three scope guards that fail the build if the documentation home stops
being documentation-only:

- no `website/`, `contracts/`, `compatibility/`, `node_modules/`
- no `package.json`, `pnpm-lock.yaml`, `opencode.jsonc`, `skills-lock.json`
- no `wiki/Projections.md`, `Roles.md`, `Workflows.md`, `Tools.md` — pages
  describing components 0.2.0 removed

Reproduce locally:

```bash
node scripts/check-links.mjs wiki
node scripts/check-links.mjs docs
```

## What a green build means here

| Green | Proves |
|---|---|
| Docs CI | Every local link resolves; no 0.1.0 component crept back |
| `test.sh all` | 38 recorder tests, 24 panel tests, pack 54/13/12, 0 broken links |
| `opencode-smoke` | Six tools work in a real session and close with a record |
| `skills-only-smoke` | Four playbooks complete with no plugin and no `.vstack` |
| `playbooks-smoke` | The same four close through the recorder with evidence |

## What no build proves

- That a claim in this wiki is true — that is what
  [verification](../reference/verification.md) is for.
- That the pack works in an untested harness. Only OpenCode is tested end to
  end.
- That the panel install succeeded. That needs a manual step in OpenChamber.

## Adding a check

A check belongs in CI only if it has a command that fails on a bad state. A
check that cannot fail is documentation.

---

See also: [verification](../reference/verification.md) · [compatibility](../reference/compatibility.md) · [playbooks](../pack/playbooks.md)
