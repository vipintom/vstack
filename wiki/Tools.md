# Tools Reference

vstack provides 23 cohesive tools under the `vstack_*` namespace.

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
| `vstack_assignment` | `create`, `get`, `list`, `complete` | Task assignments with contracts |
| `vstack_decision` | `create`, `get`, `list`, `supersede` | Decision ledger |
| `vstack_checkpoint` | `create`, `get`, `list`, `revalidate` | Progress checkpoints |
| `vstack_lesson` | `create`, `get`, `list`, `promote` | Lessons and promotion |
| `vstack_recovery` | `create`, `get`, `list`, `record-attempt` | Failure recovery |
| `vstack_verification` | `create`, `get`, `list`, `validate` | Project verification index |
| `vstack_session_pickup` | `pickup` | Session resumption |
| `vstack_verification_skill` | `generate` | Project verification skill generator |
| `vstack_skill_validate` | `validate` | Skill authoring validator |
| `vstack_verification_maintain` | `maintain` | Verification maintenance |
| `vstack_evaluation` | `run-suite`, `run-scenario` | Behavioural evaluation suite |
| `vstack_lesson_promotion` | `promote` | Lesson promotion |
| `vstack_review` | `create`, `get`, `list`, `disposition` | Review sessions and findings |

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

Types: `feature`, `bugfix`, `refactor`, `maintenance`, `spike`, `architecture-change`, `infrastructure-change`, `documentation`, `release`, `operations`

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
  --work-scope "src/auth/" \
  --contract-objective "Implement login endpoint" \
  --contract-verification "Tests pass" "TypeScript compiles"
```

Types: `design`, `implementation`, `testing`, `review`, `documentation`, `deployment`, `discovery`, `planning`, `operations`

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

## vstack_assignment

### Create
```bash
vstack_assignment create \
  --delivery-id <id> \
  --task-id <id> \
  --agent-id vstack-builder \
  --role builder \
  --contract-objective "Implement login" \
  --contract-scope "src/auth/" \
  --contract-verification "Tests pass"
```

### Get
```bash
vstack_assignment get --id <id>
```

### List
```bash
vstack_assignment list --delivery-id <id>
```

### Complete
```bash
vstack_assignment complete --id <id> --outcome PASS --changed-files "src/auth/login.ts"
```

---

## vstack_decision

### Create
```bash
vstack_decision create \
  --delivery-id <id> \
  --phase "planning" \
  --summary "Use JWT for auth" \
  --context "Need stateless auth" \
  --alternatives "Session cookies, OAuth" \
  --chosen "JWT" \
  --rationale "Stateless, scalable"
```

### Get
```bash
vstack_decision get --id <id>
```

### List
```bash
vstack_decision list --delivery-id <id>
```

### Supersede
```bash
vstack_decision supersede --id <id> --superseded-by <new-id>
```

---

## vstack_checkpoint

### Create
```bash
vstack_checkpoint create \
  --delivery-id <id> \
  --progress-path "./PROGRESS.md" \
  --next-action "Implement middleware" \
  --verified-work "Login endpoint complete"
```

### Get
```bash
vstack_checkpoint get --id <id>
```

### List
```bash
vstack_checkpoint list --delivery-id <id>
```

### Revalidate
```bash
vstack_checkpoint revalidate --id <id>
```

---

## vstack_lesson

### Create
```bash
vstack_lesson create \
  --delivery-id <id> \
  --failure-class "null-pointer" \
  --occurrences "ev_xxx, ev_yyy" \
  --prevention-mechanism "types"
```

### Get
```bash
vstack_lesson get --id <id>
```

### List
```bash
vstack_lesson list --delivery-id <id>
```

### Promote
```bash
vstack_lesson promote --id <id> --artifact "types/user.ts"
```

---

## vstack_recovery

### Create
```bash
vstack_recovery create \
  --delivery-id <id> \
  --failure-class "test-flaky" \
  --symptom "Tests fail intermittently"
```

### Record Attempt
```bash
vstack_recovery record-attempt \
  --id <id> \
  --attempt 1 \
  --description "Increased timeout" \
  --observed "Still flaky" \
  --assumption "Timeout too short"
```

---

## vstack_verification

### Create
```bash
vstack_verification create \
  --project-path /path/to/project \
  --harness opencode \
  --skill-path ./verification.md \
  --version 1.0.0 \
  --surface-coverage "auth,api,db" \
  --gaps "integration tests"
```

### Validate
```bash
vstack_verification validate --id <id>
```

---

## vstack_session_pickup

### Pickup
```bash
vstack_session_pickup pickup \
  --delivery-id <id> \
  --checkpoint-id <id>
```

---

## vstack_verification_skill

### Generate
```bash
vstack_verification_skill generate \
  --project-path /path/to/project \
  --harness opencode \
  --output ./verification.md
```

---

## vstack_skill_validate

### Validate
```bash
vstack_skill_validate validate \
  --skill-path ./playbook/skills/vstack-tdd/SKILL.md
```

---

## vstack_verification_maintain

### Maintain
```bash
vstack_verification_maintain maintain \
  --delivery-id <id> \
  --skill-path ./verification.md
```

---

## vstack_evaluation

### Run Suite
```bash
vstack_evaluation run-suite \
  --skill-id vstack-tdd \
  --project-root /path/to/project \
  --model-version claude-3.5-sonnet
```

### Run Scenario
```bash
vstack_evaluation run-scenario \
  --scenario-id eval-verification-01 \
  --skill-id vstack-verify-loop
```

---

## vstack_lesson_promotion

### Promote
```bash
vstack_lesson_promotion promote \
  --lesson-id <id> \
  --artifact "types/user.ts" \
  --validation-evidence "ev_xxx"
```

---

## vstack_review

### Create
```bash
vstack_review create \
  --delivery-id <id> \
  --type code \
  --independence confirmed \
  --reviewer-id vstack-reviewer \
  --base-commit abc123 \
  --diff-ref def456
```

### Add Finding
```bash
vstack_review add-finding \
  --session-id <id> \
  --severity high \
  --category security \
  --title "SQL injection risk" \
  --description "User input not sanitized" \
  --location "src/auth/login.ts:45" \
  --disposition open
```

### Disposition
```bash
vstack_review disposition \
  --finding-id <id> \
  --disposition fixed \
  --rationale "Added parameterized query"
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