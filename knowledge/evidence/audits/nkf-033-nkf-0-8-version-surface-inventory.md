---
title: NKF-033 NKF 0.8 Version-Surface Inventory
summary: The exhaustive inventory of every mutable tooling and test surface carrying an NKF version literal, recording which register the exact string 0.8, which are deliberately version-specific history, and the two defects the exhaustive pass found that a sampled pass would have missed.
created_at: 2026-08-19T04:30:00Z
---

# NKF-033 NKF 0.8 Version-Surface Inventory

[NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
requires that every version-comparing or windowing tooling surface handle the
exact string `0.8`, "verified against an exhaustive inventory rather than a
sample". This is that inventory, and it is recorded because the first
independent release audit found the acceptance criterion satisfied in substance
but unevidenced: the sweep had been performed and never written down.

## Method

Every file tracked by Git under `scripts/`, `src/`, and `test/` was scanned
for a token matching an NKF version coordinate — `0.1` through `0.8`, quoted
or bare. Sixty-five files carry at least one. Each was then adjudicated
individually: does this surface compare, window, dispatch, or construct a
version, and if so does it register `0.8`; or is its literal deliberately
historical?

Forty-three register `0.8`. Twenty-two do not, and each of those is
deliberately version-specific.

## Surfaces That Deliberately Do Not Register 0.8

| Surface | Version literals | Why |
| --- | --- | --- |
| `scripts/build-adopter.mjs` | 0.71 |
| `scripts/freshness/retrospective-gates-0-5.mjs` | 0.1,0.2,0.3,0.4,0.5 |
| `scripts/freshness/seal-baseline-0-5.mjs` | 0.5 |
| `scripts/generate-0-5-schemas.mjs` | 0.1,0.2,0.3,0.4,0.5 |
| `scripts/generate-0-6-schemas.mjs` | 0.1,0.2,0.3,0.4,0.5,0.6 |
| `scripts/generate-0-7-schemas.mjs` | 0.6,0.7 |
| `scripts/generate-0-71-schemas.mjs` | 0.7,0.71 |
| `scripts/regenerate-release-set-0-6.mjs` | 0.6 |
| `scripts/regenerate-release-set-0-7.mjs` | 0.7 |
| `scripts/regenerate-release-set-0-71.mjs` | 0.71 |
| `scripts/release/bind-0-7-digests.mjs` | 0.7 |
| `scripts/release/bind-0-71-digests.mjs` | 0.71 |
| `scripts/release/set-files.mjs` | 0.2 |
| `src/checker/contracts.ts` | 0.1 |
| `src/checker/extensions.ts` | 0.1 |
| `src/checker/markdown.ts` | 0.7 |
| `src/checker/util.ts` | 0.1 |
| `test/agent-guidance.test.ts` | 0.4,0.5 |
| `test/applicability.test.ts` | 0.2 |
| `test/checker.test.ts` | 0.7 |
| `test/dependency-security.test.ts` | 0.4 |
| `test/freshness-0-71.test.ts` | 0.71 |

The per-version schema generators, digest binders, and release-set
regenerators each encode one version's own delta and are not re-run for a
later version; keeping them is how the derivation of each published version
stays reproducible. The adopter build input embeds the NKF 0.71 predecessor
contract, which is exactly what the current window requires. The remaining
entries are legacy constants, the closed NKF 0.7 neutralization mapping, the
predecessor freshness suite, and comments naming historical versions.

## Defects The Exhaustive Pass Found

A sampled pass would have missed both of these, because both sit in surfaces
that were passing their tests.

**The checker CLI's base contract root named the predecessor.**
[`src/cli.ts`](../../../src/cli.ts) resolved its base contract root to
`contracts/nkf/0.71`. It is not load-bearing —
[`src/checker/checker.ts`](../../../src/checker/checker.ts) redirects the base
to the declared version's root whenever the requested base is itself a
registered version — but the literal read as the current version while being
one behind, which is the class of stale label this release exists to end. It
now names `0.8`.

**Three suites loaded a mixed contract root.** `diagnostics`, `semantic`, and
`extensions` called `loadContracts` directly with the 0.8 contract root and
the NKF 0.71 bindings. `loadContracts` does not perform the redirection the
checker does, so those runs read the 0.71 executable against the 0.8 schema
directory. They passed only because none of the three asserts a schema
binding. All three now load 0.8 coherently, which raised the asserted registry
size from two hundred fifteen to two hundred sixteen and exposed a third gap:
the new rule `guidance.self-description.version-mismatch` had no fixture
assertion anywhere in the suite. It now has one that exercises the rule
through the checker against the exact NKF 0.71 defect and proves it silent on
a deliberate predecessor mention in the body.

## Boundary

This inventory establishes that the version-string surfaces were enumerated
exhaustively and adjudicated individually. It does not establish that each
adjudication is correct — that is a judgment — and it says nothing about
version literals in governed knowledge, published archives, or the generated
guidance tree, which the pre-cut whole-set guidance review covers separately.
