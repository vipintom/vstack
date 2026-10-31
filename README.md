# vstack

Plan-driven agent workflow for OpenCode and OpenChamber.

## Packages

| Package | Directory | Purpose |
|---------|-----------|---------|
| `@vstack/agents-skills` | `agents-skills/` | Portable agent roles, workflow skills, references, templates |
| `@vstack/opencode` | `opencode/vstack/` | Workflow engine: tools, persistence, lifecycle, orchestration |
| `@vstack/openchamber` | `openchamber/vstack-panel/` | Read-only OpenChamber dashboard |

## Repository Layout

```
agents-skills/          Portable agents and skills
opencode/vstack/        OpenCode plugin (@vstack/opencode)
openchamber/vstack-panel/  OpenChamber panel (@vstack/openchamber)
docs/                   Plans and product documents
```

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
```

Package-scoped commands:

```bash
cd opencode/vstack && npm run build && npm run typecheck
cd agents-skills && npm run validate
cd openchamber/vstack-panel && npm run build
```

## OpenCode Plugin

Register the local package in `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "./opencode/vstack"
    }
  ]
}
```

The plugin registers all tools under the `vstack` namespace and stores state in
`.vstack/` at the project root.

## State Layout

```
.vstack/
├── manifest.json
├── project.md
├── implementation-plan.md
├── deliveries/
│   └── del_<id>/
│       ├── delivery.json
│       ├── phase-runs/
│       ├── tasks/
│       ├── evidence/
│       ├── findings/
│       └── approvals/
├── agents/
│   └── <agent-id>/
│       └── history/YYYY-MM-DD.md
└── state/
    ├── events/YYYY-MM-DD.jsonl
    └── index.json
```

`state/index.json` is the small projection polled by the OpenChamber panel.
It is rebuilt from delivery files; its revision advances only when the
projection changes.

## Design Principles

1. Files are the portable record.
2. OpenCode writes; OpenChamber reads.
3. State changes go through validated tools.
4. Evidence is required for completion.
5. Every transition is persisted before proceeding.

## Status

Phase 1A is in progress. The legacy `.agent-workflow/` format is not supported
and no migration path is provided.

## License

MIT
