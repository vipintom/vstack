# Tools Reference

vstack provides ~7 cohesive tools under the `vstack_*` namespace.

## Tool Overview

| Tool | Commands | Description |
|---|---|---|
| `vstack_status` | `dashboard`, `deliveries`, `tasks`, `agents` | Read-only views |
| `vstack_memory` | `create`, `get`, `list`, `search`, `supersede` | Project knowledge |
| `vstack_history` | `events`, `stats`, `delivery` | Event log queries |
| `vstack_delivery` | `create`, `get`, `list`, `update`, `delete` | Delivery lifecycle |
| `vstack_task` | `create`, `get`, `list`, `update`, `delete`, `ready`, `depends` | Task management |
| `vstack_agent` | `dispatch`, `handoff`, `sessions` | Agent coordination |
| `vstack_check` | `discover`, `execute`, `evidence`, `list` | Quality checks |

---

## vstack_status

### Dashboard
```bash
vstack_status dashboard
```
Shows active deliveries with task counts and status.

### Deliveries
```bash
vstack_status deliveries [--status active|completed|all]
```

### Tasks
```bash
vstack_status tasks --delivery-id <id> [--status pending|in_progress|completed]
```

### Agents
```bash
vstack_status agents --delivery-id <id>
```

---

## vstack_memory

### Create
```bash
vstack_memory create \
  --category architecture \
  --title "Auth Design" \
  --content "JWT with 24h expiry" \
  --source dlv_xxx \
  --tags auth jwt
```

Categories: `overview`, `architecture`, `conventions`, `decisions`, `lessons`, `handoffs`, `constraints`

### Get
```bash
vstack_memory get --category architecture --id <id>
```

### List
```bash
vstack_memory list --category architecture
```

### Search
```bash
vstack_memory search --query "JWT" --category architecture
```

### Supersede
```bash
vstack_memory supersede --category architecture --old-id <id> --new-id <id>
```

---

## vstack_history

### Events
```bash
vstack_history events [--delivery-id <id>] [--limit 100] [--since <timestamp>]
```

### Stats
```bash
vstack_history stats [--delivery-id <id>]
```

### Delivery History
```bash
vstack_history delivery --delivery-id <id>
```

---

## vstack_delivery

### Create
```bash
vstack_delivery create \
  --title "Add auth" \
  --objective "JWT-based authentication" \
  --type feature \
  --acceptance-criteria "Users register" "Users login" "Protected endpoints" \
  --risk medium \
  --labels auth api
```

Types: `feature`, `bugfix`, `refactor`, `maintenance`, `spike`

### Get
```bash
vstack_delivery get --id <id>
```

### List
```bash
vstack_delivery list [--status active|completed|blocked]
```

### Update
```bash
vstack_delivery update --id <id> --status active|blocked|completed|cancelled
```

### Delete
```bash
vstack_delivery delete --id <id>
```

---

## vstack_task

### Create
```bash
vstack_task create \
  --delivery-id <id> \
  --title "Implement login" \
  --type implementation \
  --priority high \
  --dependencies tsk_xxx,tsk_yyy \
  --acceptance-criteria "Validates credentials" "Returns JWT" \
  --expected-outputs "src/auth/login.ts" "tests/login.test.ts" \
  --required-skills vstack-tdd vstack-verify-loop \
  --work-scope "src/auth/"
```

Types: `design`, `implementation`, `testing`, `review`, `documentation`, `deployment`

### Get
```bash
vstack_task get --id <id>
```

### List
```bash
vstack_task list --delivery-id <id> [--status pending|ready|in_progress|completed]
```

### Ready Tasks
```bash
vstack_task ready --delivery-id <id>
```

### Dependencies
```bash
vstack_task depends --id <id> --add tsk_xxx
vstack_task depends --id <id> --remove tsk_xxx
```

---

## vstack_agent

### Dispatch
```bash
vstack_agent dispatch \
  --delivery-id <id> \
  --task-id <id> \
  --agent-id vstack-builder \
  --prompt "Implement login endpoint"
```

### Handoff
```bash
vstack_agent handoff --agent-run-id <id> --summary "Completed login, moving to middleware"
```

### Sessions
```bash
vstack_agent sessions [--delivery-id <id>]
```

---

## vstack_check

### Discover
```bash
vstack_check discover --working-dir /path/to/project
```

### Execute
```bash
vstack_check execute \
  --delivery-id <id> \
  --task-id <id> \
  --check-id test:unit \
  --command "npm test -- login.test.ts" \
  --working-dir /path/to/project \
  --commit-ref abc123
```

### Evidence
```bash
vstack_check evidence --id <id>
vstack_check list --delivery-id <id> [--task-id <id>]
```

---

## Tool Input/Output

All tools use JSON input/output for programmatic use:

```bash
# JSON output
vstack_status dashboard --format json

# JSON input (for complex params)
vstack_task create --input '{"deliveryId": "dlv_xxx", "title": "Task", ...}'
```