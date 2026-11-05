# Enforcement

Each gate, what it refuses, and why. A gate that can be talked out of enforcing
is not a gate.

## 1. Task completion needs evidence

**Refused:** `vstack_task action: complete` without an evidence id.

**Refused:** completing with evidence whose result is `failed`, `blocked` or
`not_verified`.

**Allowed:** `passed` and `judgement`.

**Why:** a task with no check that passed is an assertion, not a completion.
`judgement` is allowed because a human decision is a legitimate way to finish —
but it must be recorded as one, with an owner.

## 2. Evidence must link to the task

**Refused:** evidence with no `taskId` cannot complete any task.

**Why:** a passing check for the wrong thing must not close the right task. See
[evidence model](evidence-model.md).

## 3. Close refuses incomplete work

**Refused:** any open task.

**Refused:** any task with no linked evidence.

**Refused:** any failed evidence linked to a task.

**Why:** the done-predicate is a claim. Closing is checking it.

## 4. Review outcome is honoured

**Refused:** `vstack_close` with `review.outcome: changes_requested`.

**Recorded:** `review.outcome: approved`, with owner and optional notes.

**Why:** a reviewer asking for changes is a fact about the work, not an opinion
the author may file away.

## 5. Waivers are recorded, never applied

**Refused:** a waiver with no reason or no owner.

**Not affected:** open tasks, failed checks, `changes_requested`.

**Why:** a waiver changes what is *said* about a gap; it does not change
whether the gap exists. Recording it keeps the gap visible instead of closing
it with a signature.

This is the single most important rule in the recorder: **a waiver never
bypasses a gate.**

## 6. History is append-only and hash-chained

**Refused on read:** an edited, reordered or deleted history line.

**Why:** if history can be rewritten, the record proves nothing.

## 7. Phase movement

**Allowed:** forward, with no reason.

**Refused:** backward without a recorded `reason`.

**Why:** moving back is legitimate — review found a defect — but it changes
what the delivery claims has happened, so it must be attributable.

## 8. One active delivery

**Refused:** opening a second delivery while one is active.

**Route out:** `park` archives the current one and frees the slot.

**Why:** two active deliveries make "current state" ambiguous. See
[park and resume](park-resume.md).

## What enforcement is not

- It does not run your checks. The `check` field is a claim about what you ran.
- It does not prevent you from recording a failure. Recording a failure is
  honest and always allowed.
- It does not make a waiver dangerous. It makes one visible.

---

See also: [tools](tools.md) · [close record](close-record.md) · [evidence model](evidence-model.md)
