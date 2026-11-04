# Getting Started

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- OpenCode (for plugin)
- Git

## Installation

### Option 1: Playbook Only (Harness-Independent)

The playbook works with any harness that supports the Agent Skills specification.

```bash
# Install via Skills CLI from npm (recommended, after publish)
npx skills add @vipintom/vstack --agent opencode

# Or from GitHub (no npm publish needed)
npx skills add github:vipintom/vstack-playbook --agent opencode

# Install all 55 skills
npx skills add @vipintom/vstack --skill '*' --agent opencode
```

### Option 2: Cross-Harness Install Script

```bash
# Clone playbook repo
git clone https://github.com/vipintom/vstack-playbook.git

# Install for all harnesses
node vstack-playbook/scripts/install-playbook.js all /path/to/your/project

# Or per harness
node vstack-playbook/scripts/install-playbook.js opencode /path/to/project
node vstack-playbook/scripts/install-playbook.js codex /path/to/project
node vstack-playbook/scripts/install-playbook.js claude-code /path/to/project
```

### Option 3: OpenCode Plugin

```bash
# In your project directory
cd your-project

# Install from npm (when published)
npm install @vipintom/vstack-opencode

# Or from GitHub
# npm install github:vipintom/vstack-opencode

# Development (from local clone)
npm install /path/to/vstack-opencode
```

Then register in `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["@vipintom/vstack-opencode"]
}
```

Or via OpenCode CLI:
```bash
opencode plugin add @vipintom/vstack-opencode
# Or from GitHub
opencode plugin add github:vipintom/vstack-opencode
```

### Option 4: OpenChamber Extension

```bash
# Via OpenChamber Extension Manager
openchamber extension add https://github.com/vipintom/vstack-openchamber.git
```

### Option 5: Full Workspace

```bash
# Clone and install all packages
git clone https://github.com/vipintom/vstack.git
cd vstack
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## First Run

### OpenCode

1. Open your project in OpenCode
2. The vstack plugin auto-loads
3. Use `/vstack` commands or `vstack_*` tools
4. Skills available as `@vstack-*` agents

### Playbook Agents

The playbook provides 3 canonical roles:

| Role | Purpose | Agent ID |
|---|---|---|
| Lead | Planning, architecture, coordination | `vstack-lead` |
| Builder | Implementation, testing | `vstack-builder` |
| Reviewer | Code review, security audit | `vstack-reviewer` |

### Codex CLI

```bash
# Install playbook via Skills CLI
npx skills add @vipintom/vstack --agent codex
# Or
npx skills add github:vipintom/vstack-playbook --agent codex

# Install agents (TOML format)
cp vstack-playbook/agents/adapters/codex/vstack-*.toml ~/.codex/agents/

# Or use install script
node vstack-playbook/scripts/install-playbook.js codex /path/to/project
```

### Claude Code

```bash
# Install playbook via Skills CLI
npx skills add @vipintom/vstack --agent claude-code
# Or
npx skills add github:vipintom/vstack-playbook --agent claude-code

# Install agents (YAML format)
cp vstack-playbook/agents/adapters/claude-code/vstack-*.md ~/.claude/agents/

# Or use install script
node vstack-playbook/scripts/install-playbook.js claude-code /path/to/project
```

## Quick Tutorial

### Create a Delivery

```bash
# Using OpenCode tool
vstack_delivery create \
  --title "Add user authentication" \
  --objective "Implement JWT-based auth for API endpoints" \
  --type feature \
  --acceptance-criteria "Users can register" "Users can login" "Protected endpoints require JWT" \
  --risk medium \
  --labels auth api security
```

### Create Tasks with Contracts

```bash
vstack_task create \
  --delivery-id dlv_xxx \
  --title "Design auth schema" \
  --type design \
  --priority high \
  --acceptance-criteria "Schema defined" "JWT structure documented" \
  --contract-objective "Design JWT token structure and user model" \
  --contract-scope "src/auth/schema.ts" \
  --contract-verification "TypeScript compiles" "Schema validated"

vstack_task create \
  --delivery-id dlv_xxx \
  --title "Implement registration" \
  --type implementation \
  --priority high \
  --dependencies tsk_yyy \
  --acceptance-criteria "Endpoint returns JWT" "Password hashed" "Email validated"
```

### Dispatch Agent with Contract

```bash
vstack_agent dispatch \
  --agent-id vstack-builder \
  --task-id tsk_yyy \
  --prompt "Implement registration endpoint with bcrypt"
```

### Run Checks with Evidence

```bash
vstack_check execute \
  --check-id test:unit \
  --command "npm test -- registration.test.ts" \
  --working-directory /path/to/project \
  --commit-ref abc123
```

### View Dashboard

```bash
vstack_status dashboard
```

### Enforcement Gates

```bash
# Check if delivery can complete
vstack_check execute --gate all_tasks_complete --delivery-id dlv_xxx

# Check if task can complete
vstack_check execute --gate required_evidence --delivery-id dlv_xxx --task-id tsk_yyy
```

---

## Next Steps

- Read [Playbook Overview](Playbook.md) for principles and roles
- Read [Tools Reference](Tools.md) for all available commands
- Read [Workflows](Workflows.md) for recipe usage
- Read [OpenCode Plugin](OpenCode-Plugin.md) for plugin details
- Read [Capability Matrix](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) for harness compatibility