# Overview

vstack is a method, not a tool. The tools are optional; the method is not.

## The problem it solves

An agent receives a request and starts loading skills. It picks three of them,
two of which do not apply. It writes code. It reports success. Nobody can say
what "success" meant, because the check that would prove it was never named.

vstack inverts the order.

## Route before loading

A request arrives with no playbook open. Before any skill loads, you choose:

- **One playbook** — the situation you are in
- **One tier** — how much rigour the risk warrants
- **At most two skills** — three at Deep

Then you record that choice. A later session reads the record instead of
re-deciding.

This is [route-before-loading](https://github.com/vipintom/vstack-playbook/blob/master/principles/route-before-loading.md),
the principle the method is named for in practice.

## Phases leave artifacts

Each phase produces something a later reader can check: a plan, a test result,
a decision, a commit, a handoff. A phase that leaves nothing did not happen.

See [lifecycle](lifecycle.md).

## Evidence before completion

A claim without an artifact is not evidence. A check that did not run is
reported as not run, never as passed.

See [artifacts](artifacts.md).

## Rigour follows risk

A one-line fix does not need a design review. A schema migration does. The tier
decides how much ceremony the work earns.

See [tiers](tiers.md).

## What the method does not require

- No plugin. Every skill completes without one.
- No `.vstack/` directory. The fallback is your project plan or a handoff note.
- No specific harness. The pack is Markdown.
- No mandatory sections in a skill. `## Tracking`, `## Rationalizations`,
  `## Modes` and `## Verification` are explicitly not required.

## What the method does require

- Every step names the artifact it leaves.
- Every number published comes with the command that reproduces it.
- Missing stays missing. Never render or report it as success.

---

See also: [lifecycle](lifecycle.md) · [routing](routing.md) · [principles](principles.md)
