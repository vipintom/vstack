# Engineering Principles

vstack is built on 8 core principles. These aren't aspirations — they're enforceable standards that shape every design decision.

## 1. Bias to Deletion

**Default to removing code.** Every line is a liability. If you can't justify its existence with evidence, delete it.

- No "just in case" code
- No commented-out blocks
- No unused abstractions
- Dead code is a bug

## 2. Foundational Thinking

**Solve the root cause, not the symptom.** Ask "why" five times before writing code.

- Symptoms are signals; causes are leverage points
- A fix that doesn't address the foundation is debt
- If you're patching the same area twice, you missed the foundation

## 3. Domain Modeling

**Model the problem domain explicitly.** Code should read like the domain it solves.

- Types mirror domain concepts
- Functions encode domain operations
- No primitive obsession (no `string` for UserId)
- The model is the documentation

## 4. Boundary Discipline

**Clear module boundaries. No leakage.**

- Each module owns one responsibility
- Dependencies point inward (stable abstractions)
- No circular dependencies
- Public API is a contract, not an accident

## 5. Idempotence

**Operations must be safe to repeat.** Same input → same outcome, every time.

- Retries don't corrupt state
- Deployments are re-runnable
- Migrations are idempotent
- Tools produce deterministic output

## 6. Root-Cause Debugging

**Fix the cause, not the symptom.**

- Reproduce first, hypothesize second
- One change at a time
- Verify the fix eliminates the root cause
- Add regression test at the cause level

## 7. Verifiable Sequencing

**Every step has proof.** No "trust me" in engineering.

- Each phase produces evidence
- Completion requires verification
- No manual gates without automation
- The record is the truth

## 8. Delegation

**Push decisions to the boundary.** The person closest to the work decides.

- Lead sets constraints, Builder chooses approach
- Reviewer validates, doesn't direct
- Agents own their scope
- Escalation is explicit, not default

---

## Applying Principles

These principles map directly to vstack implementation:

| Principle | Implementation |
|---|---|
| Bias to Deletion | ~7 tools max, no lifecycle engine, no scheduler |
| Foundational Thinking | Evidence-based checks, not assumptions |
| Domain Modeling | Branded IDs, explicit schemas, typed stores |
| Boundary Discipline | Playbook/Plugin/OpenChamber separation |
| Idempotence | Revision-based writes, atomic operations |
| Root-Cause Debugging | Systematic-debugging skill, event log |
| Verifiable Sequencing | E2E tests with recorded evidence |
| Delegation | Lead plans, Builder executes, Reviewer validates |