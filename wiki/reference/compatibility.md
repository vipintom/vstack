# Compatibility

Exact floors. No "latest release", no "recent version".

| Component | Requires | Declared in |
|---|---|---|
| Pack | Nothing | Markdown only |
| Recorder | OpenCode V2, `@opencode/plugin` >= 2.2.0 | `package.json` peerDependencies |
| Recorder | Node >= 20 | `package.json` engines |
| Panel | OpenChamber >= 1.24.0 | `package.json` `openchamber.engines.openchamber` |
| Panel | Node >= 20 | `package.json` engines |
| Both | State schema `1` | `state.schemaVersion` |

## Reproduce the floors

```bash
node -e "console.log(JSON.stringify(require('./vstack-opencode/package.json').peerDependencies))"
# {"@opencode/plugin":">=2.2.0"}

node -e "console.log(require('./vstack-openchamber/package.json').openchamber.engines.openchamber)"
# >=1.24.0

node -e "console.log(require('./vstack-opencode/package.json').engines.node)"
# >=20
```

## Versions in use

| Component | Version | Tag |
|---|---|---|
| Pack | 0.2.0 | `v0.2.0` |
| Recorder | 0.2.0 | `v0.2.0` |
| Panel | 0.2.0 | `v0.2.0` |
| Documentation home | 0.2.0 | `v0.2.0` |

```bash
node -e "console.log(require('./vstack-opencode/package.json').version)"
# 0.2.0
```

## What a mismatch looks like

| Mismatch | Who reports it | What you see |
|---|---|---|
| Panel older than state schema | Panel | `incompatible`, nothing rendered |
| Plugin fails to load | OpenCode | `vstack_route` is not a known tool |
| Pack without recorder | Neither | Everything works; no `.vstack/` appears |
| Recorder without panel | Neither | State is written; nothing renders it |

The pack itself has **no version check to fail**. It is Markdown.

## Tested where

- The recorder and panel are tested in Docker against the OpenCode CLI pinned
  in `docker/Dockerfile`, inside the workspace that holds the three component
  repositories.
- Real sessions: four release playbooks run with the plugin, and the same four
  run without it.
- Commands: `./docker/test.sh all` and the four smoke scripts. See
  [verification](verification.md).

## Not tested

- Claude Code and Codex mappings — experimental in 0.2.0. The Markdown works;
  the exact discovery path does not.
- Any harness other than OpenCode end to end.
- Browsers other than those the panel is rendered in.

---

See also: [installation](../installation.md) · [state schema](state-schema.md) · [verification](verification.md)
