---
title: NKF-033 NKF 0.8 Version-Surface Inventory
summary: The exhaustive inventory of every mutable tooling, test, workflow, and root-configuration surface carrying an NKF version literal, recording which register the exact string 0.8, which are deliberately version-specific history, and the defects found in the surfaces — two by the inventory passes themselves and one by an independent release audit.
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

Every file tracked by Git under `scripts/`, `src/`, `test/`, and `.github/`,
plus the root configuration and instruction files — `package.json`,
`tsconfig.json`, `vitest.config.ts`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and
`README.md` — is scanned for a token matching an NKF version coordinate, `0.1`
through `0.8`, in either the dot form used in code or the hyphenated form used
in file and fixture names. The two forms terminate differently and conflating
them is what hid surfaces from three consecutive passes: a dot form must not be
part of a longer version such as `0.31.2`, so a following dot ends the match,
while in a hyphenated name a following dot is the extension separator, as in
`seal-baseline-0-5.mjs`.

Sixty-nine files carry at least one coordinate. Forty-five register `0.8`.
Twenty-four do not, and each of those is deliberately version-specific.

The scan is
[`scripts/release/version-surface-inventory.mjs`](../../../scripts/release/version-surface-inventory.mjs),
kept as a script rather than a described procedure because its counts were
restated wrongly in three successive revisions of this document while being
typed by hand. Running it re-derives every number below.

## Surfaces That Deliberately Do Not Register 0.8

| Surface | Version literals | Why |
| --- | --- | --- |
| `AGENTS.md` | 0.1 | Repository working rules; its only coordinate is the NKF 0.1 provenance lineage. |
| `scripts/build-adopter.mjs` | 0.71 | Embeds the in-window NKF 0.71 predecessor contract, which is what the window requires. |
| `scripts/freshness/retrospective-gates-0-5.mjs` | 0.1,0.2,0.3,0.4,0.5 | Predecessor-era retrospective gate review; not re-run for a later version. |
| `scripts/freshness/seal-baseline-0-5.mjs` | 0.5 | Predecessor-era seal path retained for the versions it served. |
| `scripts/generate-0-5-schemas.mjs` | 0.1,0.2,0.3,0.4,0.5 | Per-version schema derivation encoding its own delta. |
| `scripts/generate-0-6-schemas.mjs` | 0.1,0.2,0.3,0.4,0.5,0.6 | Per-version schema derivation encoding its own delta. |
| `scripts/generate-0-7-schemas.mjs` | 0.6,0.7 | Per-version schema derivation encoding its own delta. |
| `scripts/generate-0-71-schemas.mjs` | 0.7,0.71 | Per-version schema derivation encoding its own delta. |
| `scripts/regenerate-release-set-0-6.mjs` | 0.6 | Per-version release-set regeneration for one published membership. |
| `scripts/regenerate-release-set-0-7.mjs` | 0.7 | Per-version release-set regeneration for one published membership. |
| `scripts/regenerate-release-set-0-71.mjs` | 0.71 | Per-version release-set regeneration for one published membership. |
| `scripts/release/bind-0-7-digests.mjs` | 0.7 | Per-version authority digest binder for one published version. |
| `scripts/release/bind-0-71-digests.mjs` | 0.71 | Per-version authority digest binder for one published version. |
| `scripts/release/set-files.mjs` | 0.2 | Frozen NKF 0.2 release-set file list retained as history. |
| `scripts/seal-baseline-0-5.mjs` | 0.5 | Command-line wrapper over the predecessor-era seal path. |
| `src/checker/contracts.ts` | 0.1 | NKF 0.1 legacy constant. |
| `src/checker/extensions.ts` | 0.1 | NKF 0.1 legacy constant. |
| `src/checker/markdown.ts` | 0.7 | The closed NKF 0.7 neutralization stable-path mapping, which resolves as history. |
| `src/checker/util.ts` | 0.1 | NKF 0.1 legacy constant. |
| `test/agent-guidance.test.ts` | 0.4,0.5 | Asserts predecessor-era guidance behaviour. |
| `test/applicability.test.ts` | 0.2 | Asserts the NKF 0.2 gate lineage. |
| `test/checker.test.ts` | 0.7 | Comments naming the NKF 0.7 native envelope as history. |
| `test/dependency-security.test.ts` | 0.4 | Asserts the separately frozen NKF 0.4 maintenance set. |
| `test/freshness-0-71.test.ts` | 0.71 | The in-window predecessor freshness suite. |

The per-version schema generators, digest binders, and release-set
regenerators each encode one version's own delta and are not re-run for a later
version; keeping them is how the derivation of each published version stays
reproducible. The adopter build input embeds the NKF 0.71 predecessor contract,
which is exactly what the current window requires. The remaining entries are
legacy constants, the frozen NKF 0.2 release-set file list, the closed NKF 0.7
neutralization mapping, the predecessor freshness suite and its wrapper, and
comments and assertions naming historical versions.

## Defects Found In These Surfaces

Each was invisible to a sampled pass, because each sits in a surface that was
passing its tests. Two were found by the inventory passes and one by an
independent release audit; the attribution is stated because the difference is
the point.

**Found by the inventory: the checker CLI's base contract root named the
predecessor.** [`src/cli.ts`](../../../src/cli.ts) resolved its base contract
root to `contracts/nkf/0.71`. It is not load-bearing —
[`src/checker/checker.ts`](../../../src/checker/checker.ts) redirects the base
to the declared version's root whenever the requested base is itself a
registered version — but the literal read as the current version while being one
behind, which is the class of stale label this release exists to end. It now
names `0.8`.

**Found by the inventory: three suites loaded a mixed contract root.**
`diagnostics`, `semantic`, and `extensions` called `loadContracts` directly with
the 0.8 contract root and the NKF 0.71 bindings. `loadContracts` does not
perform the redirection the checker does, so those runs read the 0.71 executable
against the 0.8 schema directory. They passed only because none of the three
asserts a schema binding. All three now load 0.8 coherently, which raised the
asserted registry size from two hundred fifteen to two hundred sixteen and
exposed a third gap: the new rule
`guidance.self-description.version-mismatch` had no fixture assertion anywhere
in the suite. It now has one that exercises the rule through the checker against
the exact NKF 0.71 defect and proves it silent on a deliberate predecessor
mention in the body.

**Found by an independent release audit, not by the inventory: a
continuous-integration-wired exercise was broken.**
[`scripts/exercise-consumer-adoption.mjs`](../../../scripts/exercise-consumer-adoption.mjs)
copied `fixtures/valid/minimal-0-2`, deleted several window slides ago, and
failed with `ENOENT` before reaching any adoption step. The inventory's scan
could not see it: the reference is hyphenated and the scan was dot-form only.
That blind spot was recorded as repaired twice before it actually was, which is
why the Method above states the two forms' terminators explicitly.

That exercise is still red at this commit, for a different and expected reason:
it resolves the governed recommendation, and `release/recommended.json` selects
NKF 0.71 while the adopter it exercises requires its own current version. It
turns green when NKF 0.8 is published and the recommendation is promoted, which
are separately authorized acts outside this Task. The distinction is stated
rather than left implied: the fixture defect is repaired, the exercise is not
yet passing.

## Boundary

This inventory establishes that the version-string surfaces under `scripts/`,
`src/`, `test/`, `.github/`, and the root configuration and instruction files
were enumerated exhaustively and adjudicated individually. It does not establish
that each adjudication is correct — that is a judgment, and the inventory
asserts nothing beyond having made it deliberately for each of the twenty-four
surfaces listed.

It deliberately excludes three populations, each covered elsewhere: governed
knowledge and published archives, whose version literals are history; the
generated guidance tree and the rest of the release set, which the pre-cut
whole-set guidance review covers; and `contracts/`, `release/recommended.json`,
and `fixtures/`, whose coordinates are data the release tooling and the checker
bind rather than surfaces that compare versions.

One limit is not an exclusion but an absence: no verifier covers any of the
sixty-nine enumerated surfaces. This inventory is their only control, and it is a
point-in-time record rather than an enforced one. A later version that adds a
surface without registering its coordinate will not be caught by anything this
release ships.
