# Verification

Every number published in this wiki, and the command that reproduces it.

Nothing here is a claim you have to take on trust. Run the command, read the
output, compare.

## Counts

Run from a clone of `vstack-playbook`.

```bash
find skills -name SKILL.md | wc -l
# 54

find playbooks -maxdepth 1 -name '*.md' | wc -l
# 13

find principles -maxdepth 1 -name '*.md' ! -name index.md | wc -l
# 12
```

## Recorder

Run from a clone of `vstack-opencode`.

```bash
grep -c '"vstack_' src/tools/index.ts
# 6
```

The six are `vstack_route`, `vstack_task`, `vstack_evidence`,
`vstack_decision`, `vstack_handoff`, `vstack_close`.

```bash
node -e "const p=require('./package.json'); console.log(JSON.stringify(p.dependencies))"
# {}
```

Empty `dependencies`. The recorder has no runtime dependency beyond the host
`@opencode/plugin` peer. This matters: OpenCode loads a local plugin directory
by reading its files, not by installing that package's dependencies, so a
runtime dependency would fail to resolve and the plugin would never load.

## Panel

Run from a clone of `vstack-openchamber`.

```bash
grep -c 'id: "' panel/src/types.ts
# 7
```

The seven views are Now, Plan, Evidence, Timeline, Decisions, Deliveries,
Health.

## Compatibility floors

```bash
node -e "const p=require('./vstack-opencode/package.json'); console.log(JSON.stringify(p.peerDependencies))"
# {"@opencode/plugin":">=2.2.0"}

node -e "const p=require('./vstack-openchamber/package.json'); console.log(p.openchamber.engines.openchamber)"
# >=1.24.0
```

State schema is `1` in both. A newer schema produces an `incompatible` state in
the panel, with no partial rendering.

## This repository

```bash
node scripts/check-links.mjs wiki
# local links: 38 Markdown files, 0 broken

node scripts/check-links.mjs docs
# local links: 2 Markdown files, 0 broken
```

CI runs both on every push.

## Full suite

The Docker harness lives in the workspace that holds the three component
repositories. It is not published with any of them.

```bash
./docker/test.sh all
# recorder 38 tests, panel 24 tests
# pack: 54 skills, 13 playbooks, 12 principles
# recorder: 6 tools, no project execution, .vstack paths
# panel: 7 views, read-only, no network
```

```bash
./docker/opencode-smoke.sh     # six tools in a real session, 7 history events
./docker/skills-smoke.sh       # route skill plus recorder, closed delivery
./docker/skills-only-smoke.sh  # four playbooks, no plugin, no .vstack
./docker/playbooks-smoke.sh    # four playbooks through the recorder
```

A host-run `pnpm test` is not accepted release verification.

## What is deliberately not claimed

- No performance number, latency figure or throughput claim.
- No coverage percentage.
- No "works with every harness" statement. The pack is Markdown and is
  expected to work anywhere; only OpenCode is tested end to end.
- No readiness percentage. Readiness is the output of the commands above.

---

See also: [index](../index.md) · [compatibility](compatibility.md) · [faq](faq.md)
