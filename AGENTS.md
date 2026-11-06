# AGENTS.md — vstack documentation home

Version 0.2.2. This repository holds documentation only. There is no code, no
build, no package manifest, no contract and no runtime here.

## Layout

| Path | Holds |
|---|---|
| `wiki/index.md` | Home and map of the wiki |
| `wiki/<part>/` | Start, methodology, pack, recorder, panel, reference, recipes |
| `docs/vstack-0.2.0-prd.md` | Product requirements |
| `docs/vstack-0.2.0-prd-audit.md` | PRD coverage audit |
| `scripts/check-links.mjs` | Local Markdown link check |
| `CHANGELOG.md` | History; it ends at 0.1.0, with a rename pointer to `@vipintom/*` |

## Rules

- Documentation only. No component code, no contracts, no compatibility matrix,
  no release metadata, no generated files.
- The three component repositories are authoritative for their own facts. This
  repository links; it does not copy.
- Every published number sits beside the command that reproduces it.
- Nothing in `wiki/` is pack content. `./docker/test.sh pack` in the workspace
  must keep reporting 54 / 13 / 12 after any change here.
- No claim appears here that is not already true in a component README, a
  release note, or the PRD.
- Relative links only, so the tree works offline.
- Public repository, read-only: issues are welcome; pull requests are not
  accepted in 0.2.x.

## Verification

```bash
node scripts/check-links.mjs wiki
node scripts/check-links.mjs docs
```

CI runs the same command on every push. A link that fails here fails the build.

## Component repositories

| Repository | Authoritative for |
|---|---|
| `vstack-playbook` | 54 skills, 13 playbooks, 12 principles, the rename map |
| `vstack-opencode` | The six tools, `.vstack/` state, enforcement, schema 2; publishes as `@vipintom/vstack-opencode` |
| `vstack-openchamber` | The seven views, the five honest states; publishes as `@vipintom/vstack-openchamber` |

Single npm scope: `@vipintom`. No `@vstack/*` name is published; the
CHANGELOG 0.1.0 names stay verbatim as history under the rename pointer.

Compatibility floors: OpenCode V2 with `@opencode/plugin` >= 2.2.0,
OpenChamber >= 1.24.0, state schema 2.
