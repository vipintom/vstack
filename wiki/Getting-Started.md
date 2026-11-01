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
# Clone the repository
git clone https://github.com/your-org/vstack.git
cd vstack

# Install playbook via Skills CLI
npx skills add ./playbook

# Or copy manually to your harness skills directory
cp -r playbook/ ~/.config/opencode/skills/vstack
cp -r playbook/ ~/.config/claude-code/skills/vstack
cp -r playbook/ ~/.config/codex/skills/vstack
```

### Option 2: OpenCode Plugin

```bash
# In your project directory
cd your-project

# Install from local path (development)
npm install /path/to/vstack/opencode/vstack

# Or from npm (when published)
npm install @vstack/opencode
```

### Option 3: Full Workspace

```bash
# Clone and install all packages
git clone https://github.com/your-org/vstack.git
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

### Create Tasks

```bash
vstack_task create \
  --delivery-id dlv_xxx \
  --title "Design auth schema" \
  --type design \
  --priority high \
  --acceptance-criteria "Schema defined" "JWT structure documented"

vstack_task create \
  --delivery-id dlv_xxx \
  --title "Implement registration" \
  --type implementation \
  --priority high \
  --dependencies tsk_yyy
```

### Dispatch Agent

```bash
vstack_agent dispatch \
  --agent-id vstack-builder \
  --task-id tsk_yyy \
  --prompt "Implement registration endpoint with bcrypt"
```

### Run Checks

```bash
vstack_check execute \
  --check-id test:unit \
  --command "npm test -- registration.test.ts" \
  --working-directory /path/to/project
```

### View Dashboard

```bash
vstack_status dashboard
```

---

## Next Steps

- Read [Playbook Overview](Playbook.md) for principles and roles
- Read [Tools Reference](Tools.md) for all available commands
- Read [Workflows](Workflows.md) for recipe usage
- Read [OpenCode Plugin](OpenCode-Plugin.md) for plugin details