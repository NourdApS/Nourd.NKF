---
title: NKF-028 NKF 0.7 Source-Grounded Assessment
summary: Source-grounded assessment of the semantic re-review cost surface, the unverifiable delta-review defect, the stale bundle root record, identity and path staleness, undeclared provenance files, stepping-stone migration feasibility, the live multi-version removal surface, the per-rule delta scale, the confirmation-ordering contradiction, and the test-harness defects that ground the NKF 0.7 Design.
created_at: 2026-08-14T21:05:00Z
---

# NKF-028 NKF 0.7 Source-Grounded Assessment

## Scope And Method

This Evidence records the read-only assessment performed before the NKF 0.7
Design under NKF-028. Every finding was verified against the repository state
at `master` commit `265095d` (NKF 0.6 published, recommended, and
producer-adopted), citing exact files and lines. It records observations and
confirmed Human Product Owner direction; it accepts nothing and proposes
nothing.

The Human Product Owner confirmed in conversation on `2026-08-14`:


- Headline: cheap producer self-upgrade — the semantic re-review surface must
  stop growing per release.
- Bootstrap: Option B. 0.7 ships the delta machinery and takes one last
  whole-root review at its own promotion; the first real delta upgrade is
  0.8. Acceptance criterion wording: 0.7's whole-root review is the last one.
- Support window: current + one predecessor, as standing publishing policy,
  conditional on zero external adopters. What widens at first external
  adoption must be pinned down in the Design.
- 0.6→0.7 may be breaking.
- Harness riders (proportional test bounds, child reaping, verifier
  generalization): in scope.
- Stale NKF-025/NKF-026 conclusions ride under the 0.7 owning Task.
- Explicitly out of scope: large-monolith onboarding (future headline, no
  version pinned), NKF 1.0, visibility changes, protected merge gate.

## 1. Measured review-cost surface (the problem)


`.nourd/knowledge/freshness/baseline.yaml`, 17,801 lines:

| Block | Lines | Content |
| --- | --- | --- |
| `node_revisions` | 13–1735 | 287 nodes, each digest-bound |
| `authored_edges` | 1736–3010 | typed edges |
| `relationship_coverage` | 3013–3125 | 14 categories |
| `applicability_coverage` | 3126–14448 | ~861 judgments (287 × 3 purposes) — 64% of file |
| `decision_classifications` | 14449–17743 | 366 = 122 decisions × 3 purposes |
| `confirmation` | 17744–end | one reviewer, one claim, observations, limitations |

Growth per release: 0.5 → 0.6 added 19 nodes and 15 classifications
(268/351 → 287/366). Both grow monotonically; 126 decision files exist on
disk already.

## 2. The decisive defect: delta review happens but is unverifiable

The sealed 0.6 baseline's `limitations` block states the reseal was a delta
re-affirmation — only NKF-027-authored knowledge was re-read; every other
node carries its prior classification. Its `confirmation.claim` nonetheless
says `semantically-reviewed-whole-root`, because the claim vocabulary has no
delta value. The truth is demoted to free text no checker can evaluate.

Mechanical root cause: every `applicability_coverage` entry and every
`decision_classification` carries a `basis` (node + section/heading) with no
digest of that basis. Node revisions are digested; judgment bases are not.
The tool therefore cannot compute which judgments a change invalidates.

## 3. Exhibit A: the root record is stale and three reviews sealed it

`knowledge/nkf.md` (record `nkf`, living, accepted, the bundle root):

- Claims `0.4` is current accepted format authority and 0.3 the recommended
  release (`knowledge/nkf.md:37,53,61-64`). Two releases behind.
- Last edited at `95904f1` (the 0.4 candidate). The 0.5 migration preserved
  predecessor bytes by audited promise; the record still carries a
  `legacy_lock` with `predecessor_version: "0.4"`
  (`.nourd/knowledge/records/nkf.yaml:95-101`).
- Registered, digested, classified eligible/`governs` for all three purposes
  in the sealed baseline. `nkf:check` is green because the digest matches the
  stale bytes.
- Its staleness driver — "which version is current" — is operational state
  (`.nourd/nkf-release.json`, catalog) that the graph deliberately does not
  model. `external_dependencies: []` in the baseline; no invalidation
  trigger exists for release promotion.
- The 0.5 whole-root review, the 0.6 whole-root review at `9665298`, and the
  0.6 delta reseal all sealed the node without an observation. The root
  record disproves the `semantically-reviewed-whole-root` claim and is direct
  evidence that oversized reviews are performed nominally.

## 4. Identity and path staleness inventory

Version-baked ids (8): only one is a defect —
`nkf-0.1-native-realization` (living, describes 0.6, stable id asserts 0.1;
`realizations/current-system.md`). The other seven
(`nkf-0.2/0.3/0.4-specification`, `nkf-0.4-security-maintenance`,
`nkf-0.5-specification`, `nkf-0.5-specification-revision-2`,
`nkf-0.6-specification-revision-3`) are immutable version-scoped snapshots
whose version is correct identity.

State/currency-baked stable paths (35 exactly): 2 in `tasks/active/`
(NKF-025, NKF-026 — will become permanent lies at close, since 0.5+ paths
never move), 12 in `tasks/completed/`, 9 in `tasks/deferred/`, 1 in
`tasks/cancelled/`, 1 in `designs/active/` (disposition genuinely active
today), and 10 in `realizations/current/` — all ten immutable predecessor
detail, one (`initial-greenfield-onboarding.md`) explicitly superseded.
Only NKF-027 lives in the neutral `tasks/items/`.

Nested `record_lifecycle: living` entries inside immutable spec declarations
are bootstrap-lock predecessor history, not defects (e.g.
`.nourd/knowledge/records/nkf-0.5-specification-revision-2.yaml:450-467`).

## 5. Undeclared files under the knowledge root

312 declared paths vs disk: 54 files undeclared, all non-Markdown provenance
under `knowledge/evidence/decision-inputs/` (33) and
`knowledge/evidence/source-snapshots/` (21). No Markdown knowledge document
is undeclared. These are invisible to the graph and to freshness. The current
contract permits this silently; 0.7 should classify the boundary explicitly
(closed provenance-attachment class, or an explicit exemption in the
authority).

## 6. Stepping-stone migration is structurally viable (window cut)

`migrate` accepts an explicit local archive and digest and never consults the
recommendation catalog: `resolveMigrationInput` requires `--sha256` and
acquires bytes via `--archive` path directly
(`scripts/adoption/nourd-nkf-adopt.mjs:4187-4198,626-634`). Catalog
resolution exists only in the subcommand-free public Adopt
(`:483,:4678`). Each published archive is frozen and carries its own checker
and adopter; each archive's adopter defines its accepted predecessors
(0.6's `migrateToCurrent` accepts bundles 0.1–0.4, ready-0.5 goes through
the non-breaking update path). A 0.3 repository in a current+1 world
therefore steps: published 0.6 archive (breaking migrate) → 0.7 archive →
… Each hop is offline-capable given the archive bytes.

Residual design question: the public Adopt preflight/compatibility signaling
currently enumerates every version 0.1–0.6
(`scripts/verify-recommended-release.mjs:80-140`); under current+1 the
catalog's compatibility table shrinks and older repositories must be told
"step through archive X" instead of failing with an unexplained refusal.

## 7. Live multi-version support removal surface (current+1 ⇒ drop 0.2–0.5)

- `contracts/nkf/0.2–0.5`: 28 files (~1.3 MB inc. 0.5 schemas).
- `fixtures/valid/*-0-2..0-5`: 8 fixture trees.
- `src/checker`: 15 version-binding references across the dispatch.
- `test/`: 22 of 29 test files name a pre-0.6 version (not all removable —
  some construct predecessor envelopes deliberately; needs per-file triage).
- Adopter: `migrateLegacyTo0_4`, 0.5 migration core (`scripts/migration/0-5-core.mjs`),
  per-version release sets (`contracts/nkf/0.5/release-set.yaml`),
  `distribution/nkf/0.3–0.5` guidance trees.
- Version-pinned scripts that accumulate per release:
  `seal-baseline-0-5.mjs`, `generate-0-5/0-6-schemas.mjs`,
  `regenerate-release-set-0-5/0-6.mjs`, `scripts/freshness/*-0-5.mjs`.
  There is no runnable 0.6 baseline sealer in the repo at all (the 0.6
  reseal ran from a scratchpad script) — generalize, don't multiply.

## 8. Per-rule delta declaration scale

The 0.6 registry (`contracts/nkf/0.6/revision-3/nkf.yaml:3080+`) contains
503 rules. The per-rule version-delta declaration
(`identical` / `mechanically-transformable` + proof / `semantically-new`)
must therefore be generated-and-reviewed, not hand-authored: the authority
carries the classification table; a deterministic diff of the rule registries
seeds it; the reviewer judges only the non-identical remainder. (Rule-id
identity across versions is the join key; renames need an explicit mapping.)

## 9. Confirmation-ordering contradiction — exact clauses

- `integrations/release/nkf-release-protocol.md` step 6 requires the separate
  Human Product Owner confirmation before step 7 produces the release
  archive.
- `knowledge/specifications/nkf-0.6-revision-3.md:3656+` requires the
  candidate-bound Adopt, full matrix, and fresh independent audit before
  technical confirmation or publication.
- The prepublication/prepromotion lock forbids authoring any governed record
  before promotion, and authoring one after the whole-root review invalidates
  the review bound to the exact release commit. Unsatisfiable as written;
  0.6 published under an explicit recorded exception.
- The seam for the fix already exists in accepted 0.6 text:
  `nkf-0.6-revision-3.md:3755-3760` — governance records created after an
  exact candidate is audited MAY bind its release commit/digests but remain
  outside the archive and cannot change its bytes ("avoids both a digest
  cycle and a post-audit confirmation cycle"). 0.7 should define the
  confirmation Decision as exactly such a post-audit, outside-the-archive
  record with a deterministic slot in the promotion sequence, and re-order
  the protocol steps to match.

## 10. Harness riders — exact locations

- Flat `testTimeout: 60_000` in `vitest.config.ts:13` (comment already
  defers proportional design to a later version). Hand-escalated literals:
  80s×10, 60s×3, 120s×2, 300s, 480s across `test/*.test.ts`. Repo-scaled
  exercises get bounds proportional to knowledge size; fixture-bound tests
  keep the static default.
- Child reaping: a timed-out onboarding test orphans a busy adopter child
  that poisons later runs (observed during 0.6). Correctness item — an
  orphan can flip a release-audit result.
- `scripts/verify-recommended-release.mjs` hardcodes the version literal,
  the per-version migration table, and the accepted-digest map
  (`:80,:95,:101-140,:154-156`); hand-rebound every release.

## 11. Operational-claims sweep

Living records: `nkf` (stale, §3), `nkf-0.1-native-realization` (reconciled
to 0.6 in NKF-027), `design-nkf-021-task-scope-gate`,
`nkf-003-source-reconciliation`. Navigation READMEs use timeless wording.
The only operational version claims in living knowledge are in
`knowledge/nkf.md`. Scope item 7's trigger design has exactly one live
customer today, plus a rule for future records.

## 12. Task-shape input

NKF-025 and NKF-026 remain declared `active`; both conclude under the 0.7
owning Task using the corrected 0.6 mechanics. NKF-026's gate must be
re-extracted against the 0.6 decision set; row "post-publication ordinary
producer self-adoption audit for 0.5" was never performed and needs an
explicit recorded Human Product Owner exception at close. The PR-9 ordering
criterion ("becomes ready only after both Tasks truthfully conclude") was
historically violated — recorded as fact in the Completion Result, not
repaired. Their `tasks/active/` stable paths become permanently wrong at
close unless scope item 6's path migration lands in the same release.

## Resulting 0.7 scope map (for the Design)

1. Basis revision binding — digest every judgment's basis (prerequisite).
2. Per-node carry-forward, derived from digest identity, never asserted.
3. Per-rule version-delta declaration in the accepted authority; generated
   diff seeds it; checker confines fresh review to the semantically-new
   closure; `semantically-reviewed-delta` claim; fail closed when the
   covered set is smaller than the computed closure.
4. Persisted decision classifications keyed on decision digest × purpose.
5. `review --scaffold` + `record --scaffold` deterministic subcommands.
6. Identity/path neutrality: identity-succession rule; rename
   `nkf-0.1-native-realization`; migrate 35 state-baked stable paths to
   neutral locations; forbid state/currency/version in new living ids and
   new stable paths; remove obsolete legacy locks (incl. `nkf.yaml`).
7. Operational-fact triggers: nodes declaring release-coordinate facts carry
   a declared dependency; promotion invalidates them; readiness fails closed
   until reconciled — as a post-promotion reconciliation set, not a
   pre-promotion authoring requirement (prepromotion lock).
8. Confirmation-ordering fix per §9.
9. Support-window cut to current + one predecessor per §6–7, recorded as
   conditional policy (zero external adopters); Design defines what widens
   at first adoption.
10. Harness riders per §10.
11. Conclude NKF-025/NKF-026 under the owning Task per §12.
12. Classify the undeclared-provenance boundary per §5.

Bootstrap (Option B) consequence for the criterion: 0.7's own promotion
performs the last whole-root review and seals the first fully digest-keyed
baseline; the 0.7→0.8 promotion is the first that must pass on delta review
alone.
