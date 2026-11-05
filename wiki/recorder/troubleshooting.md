# Recorder troubleshooting

Four failures, in order of how often they bite.

## 1. The tools do not exist

**Symptom:** `vstack_route` is not a known tool.

**Check:**

```text
vstack_route
```

If the tool is missing, the plugin did not load.

**Cause — local path not built.** A plugin directory loads files, not package
dependencies. If `dist/` is missing or stale:

```bash
cd vstack-opencode
pnpm install
pnpm build
```

Then point `opencode.jsonc` at the built directory:

```jsonc
{ "plugins": ["/absolute/path/to/vstack-opencode"] }
```

**Cause — a runtime dependency returned.** This is the failure the project hit
once and built its zero-dependency rule to prevent. OpenCode reads a local
plugin's files and does not install its dependencies, so an unresolved import
fails the whole plugin **before `setup` runs** — and the symptom looks like "the
context hook never fired", not like a load error.

```bash
node -e "console.log(JSON.stringify(require('./vstack-opencode/package.json').dependencies))"
# {}
```

If that is not `{}`, remove the dependency.

**Confirm it loaded:**

```text
vstack_route
→ {"ok":true,"delivery":null}
```

That answer on a fresh project means the plugin is live.

## 2. History is refused

**Symptom:** the recorder rejects an existing `history.jsonl`.

**Cause:** the file predates the hash chain, or a line was edited, reordered or
deleted.

**Fix:** there is no repair path. Delete `.vstack/history.jsonl` and rebuild by
re-recording. A history that can be edited is not a record, so the recorder
refuses rather than accepts it silently.

Keep `.vstack/deliveries/` — those archives are unaffected.

## 3. Close is refused

**Symptom:** `vstack_close` returns a refusal naming open tasks, missing
evidence or a failed check.

**Do not:** add a waiver expecting it to pass the gate. A waiver never bypasses
one.

**Do:** read the refusal. It names the specific gap.

| Refusal says | Do this |
|---|---|
| open task | finish it, or record why it is out of scope as a decision |
| no evidence | run the check and record the four fields |
| failed check | fix the work, or record a `failed` result honestly and keep the task open |
| `changes_requested` | address the review, then record `approved` |

A delivery that genuinely ships with a known gap records the gap as a waiver
**and** still satisfies every gate. If it cannot, it does not close.

## 4. A second delivery will not open

**Symptom:** `vstack_route action: open` is refused.

**Cause:** one delivery is already active.

```text
vstack_route  action: park
```

Then open the new one, and `action: resume` with the parked id when you return.
See [park and resume](park-resume.md).

## Nothing is wrong

`{"ok":true,"delivery":null}` is the correct answer with no delivery open. It
is not an error.

---

See also: [tools](tools.md) · [enforcement](enforcement.md) · [installation](../installation.md)
