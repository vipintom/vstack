# Installation

Three components, installed independently. Install only what you want.

| Component | Install it if you want |
|---|---|
| The pack | The method — skills, playbooks, principles |
| The recorder | Deliveries, tasks and evidence recorded in `.vstack/` |
| The panel | Those records rendered as seven views |

The pack alone is a complete installation. See
[choosing a path](choosing-a-path.md).

## Prerequisites

- Git
- For the recorder: Node 20 or later, pnpm
- For the panel: OpenChamber 1.24.0 or later

Exact floors are in [compatibility](reference/compatibility.md).

## The pack

```bash
git clone https://github.com/vipintom/vstack-playbook.git
```

Copy the skill directories into your harness skills directory. For OpenCode:

```bash
cp -r vstack-playbook/skills/* ~/.config/opencode/skills/
```

Verify:

```bash
ls ~/.config/opencode/skills | wc -l
find ~/.config/opencode/skills -maxdepth 2 -name SKILL.md | wc -l
```

The first number includes any skills you already had. The second counts every
skill the harness can see.

Claude Code and Codex mappings are experimental in 0.2.x. The Markdown works;
the exact discovery path does not.

### Skills CLI

```bash
npx skills add github:vipintom/vstack-playbook --skill '*' --agent opencode
```

It copies skill directories only; `playbooks/` and `principles/` are still
read from the clone.

### Uninstall

Reverse whatever you did above. The pack writes nothing outside the target
skills directory, so removing what it added removes the pack.

## The recorder

`opencode plugin add` accepts npm and Git packages only, not local paths. Until
the package is published to npm, install from a clone.

```bash
git clone https://github.com/vipintom/vstack-opencode.git
cd vstack-opencode
pnpm install
pnpm build
```

Add the built directory to `opencode.jsonc`:

```jsonc
{
  "plugins": ["/absolute/path/to/vstack-opencode"]
}
```

A local plugin directory loads files, not package dependencies, so build it
first. After the build there is nothing extra to resolve: the host supplies
`@opencode/plugin` and the recorder brings no dependencies of its own.

After the package is published:

```bash
opencode plugin add @vipintom/vstack-opencode
```

### Verify

Start a session and read state with no arguments:

```text
vstack_route
```

A correct answer on a fresh project is `{"ok":true,"delivery":null}`. If the
tool does not exist, the plugin did not load — see
[recorder/troubleshooting](recorder/troubleshooting.md).

### Uninstall

1. Remove the plugin entry from `opencode.jsonc`.
2. Delete the installed package directory.
3. Delete `.vstack/state.json`, `.vstack/history.jsonl` and `.vstack/lock`.
   Retain `.vstack/deliveries/` — that directory is the output worth keeping.

## The panel

1. Open OpenChamber → Settings → Extensions.
2. Install from `https://github.com/vipintom/vstack-openchamber.git`.
3. Enable **vstack Workflow**.

Or from a clone:

```bash
git clone https://github.com/vipintom/vstack-openchamber.git
cd vstack-openchamber
pnpm install
pnpm build
```

Then load `panel/` as an unpacked extension.

### Uninstall

1. Switch **vstack Workflow** off and remove it from OpenChamber's
   extension list.
2. Delete the extension directory.
3. `.vstack/` stays in the project; it belongs to the recorder, not the panel.

## Offline

After one `pnpm install`, the recorder and panel build and run without network
access. Copy the built directories to the target machine: `dist/` and
`package.json` for the recorder, `panel/` for the panel.

The pack is Markdown. A clone works offline with no install step.

## Windows

- Pack: point your harness at the clone with forward slashes, for example
  `C:/work/vstack-playbook/skills`.
- Recorder: use the absolute directory path in `opencode.jsonc`, for example
  `C:/work/vstack-opencode`. Paths resolve with Node's `path` module.
- Panel: load `C:/work/vstack-openchamber/panel` as an unpacked extension. The
  panel uses no shell commands.

---

See also: [choosing a path](choosing-a-path.md) · [first delivery](first-delivery.md) · [compatibility](reference/compatibility.md)
