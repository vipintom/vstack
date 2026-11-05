# Writing skills

Use `skill-authoring` to write or reshape a skill, and `skill-eval` to test
whether it fires on the right requests. This page is the orientation.

## The standard

- Front matter: `name` and `description` only.
- The description states when to use the skill **and when not to**, naming the
  skill that belongs instead.
- 60–90 lines is the target; 120 is the maximum.
- Every step names the artifact it leaves.
- No mandatory sections beyond the steps.
- If the skill names a `vstack_*` tool, the same step names the file artifact
  that survives without it.
- Depth goes in `references/` and loads on demand.

See [skill anatomy](skill-anatomy.md).

## Where a new skill belongs

Before writing one, check whether an existing skill already covers it. The pack
has 54 skills; a near-duplicate splits the trigger and makes both less likely
to fire.

If the gap is a *situation* rather than a *procedure*, it belongs in
`playbooks/` — a playbook loads skills, a skill does not load playbooks.

## Testing whether it works

`skill-eval` answers two questions:

1. Does the skill fire on the requests it should, and stay silent on the ones
   it should not?
2. Does its procedure produce the claimed output?

A skill whose description is vague will not fire. A skill whose description is
too broad will fire on everything. Both are defects.

## Changing the pack itself

Use the `maintain-playbook` playbook. It exists because the pack's own changes
carry a different risk: other deliveries depend on every file in it.

A skill, playbook or principle edit is always Standard tier at minimum — never
Quick. See [tiers](../methodology/tiers.md).

## Removing a name

0.1.0 names are gone. Do not revive `vstack-*`, `mode`, `how`, `why`,
`architect`, `blast-radius`, `arena`, `best-of-n` or `swarm`. The mapping from
old names to new ones is in [rename map](../reference/rename-map.md).

## Verifying a change

```bash
find vstack-playbook/skills -name SKILL.md | wc -l
# 54

grep -c '^## Tracking\|^## Rationalizations\|^## Modes\|^## Verification' \
  vstack-playbook/skills/*/SKILL.md
# no matches

node docker/check-links.mjs vstack-playbook
# local links: 92 Markdown files, 0 broken
```

A change is ready when those commands agree and the changed skill still
completes without the recorder.

---

See also: [skill anatomy](skill-anatomy.md) · [skills](skills.md) · [verification](../reference/verification.md)
