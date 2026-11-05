# Tiers

Three rigour tiers. Pick the lowest one that can carry the claim.

| | Quick | Standard | Deep |
|---|---|---|---|
| Reach | one file, one behaviour | a module or feature | contracts, data, security, public surface |
| Reversible | yes, by revert | yes, by revert | no, or only by a second migration |
| Design step | none | short, in the delivery record | `design` gate before code |
| Skills | 1 | ≤ 3 | ≤ 5, including `red-team` and `verify` |
| Evidence | the command you ran | gate results per change | gate results plus an independent run |
| Review | self | `review` | a reviewer who did not write it |
| Record | one line in the delivery | task list plus results | full decision and evidence trail |

## Quick is permitted when

- One file, one behaviour, and the tests covering it already exist.
- A revert restores the previous state exactly.
- Nobody outside the delivery consumes the result.

Quick is refused when the change touches the pack itself. A skill, playbook or
principle edit is always Standard: other deliveries depend on it.

## Deep is forced when

- Data is rewritten, deleted or migrated.
- Authentication, authorization, payments or personal data is touched.
- A public interface changes for callers you do not control.
- The change cannot be undone by a revert.
- The claim will be published — release notes, documentation, a status page.

## Standard is the default

It is the cheapest tier that leaves a record someone else can audit.

## Costs, stated honestly

- **Quick** saves a design record and a review. It costs a re-route when the
  change grows.
- **Standard** is the default because it is the cheapest tier that leaves a
  record someone else can audit.
- **Deep** costs a second context and a design gate. It buys the only thing
  that matters on irreversible work: a second pair of eyes before the point of
  no return.

## Downgrading

Downgrade only before the first artifact is produced, and record why. After a
migration has run or a public contract has shipped, the tier is fixed by what
has already happened, not by how confident anyone feels.

## With the recorder

```text
vstack_route  action: open  tier: quick   # or standard, or deep
```

Moving down requires no reason. Moving back up after artifacts exist requires
one.

---

See also: [routing](routing.md) · [lifecycle](lifecycle.md) · [principles](principles.md)
