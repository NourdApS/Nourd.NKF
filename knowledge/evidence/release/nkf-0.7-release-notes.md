---
title: NKF 0.7 Release Notes
summary: The human-readable migration meaning the release protocol requires to publish with the NKF 0.7 release, in named sections stating what is new, what breaks, how to adopt, and how to verify.
created_at: 2026-08-17T14:00:00Z
---

# NKF 0.7 Release Notes

This is the migration meaning that publishes with the NKF 0.7 release. It is
prepared with the candidate and pasted into the release publication; the
accepted Specification remains the authority when any sentence here
conflicts.

## What Is New

- Semantic review carry-forward is digest-bound and computable: every sealed
  judgment binds its node revision and basis digest, carried judgments are
  mechanically distinguishable from performed ones, and forged carries are
  refused.
- A per-rule version-delta declaration ships in the accepted authority and,
  with the evaluation policy's declared judgment dependencies, bounds the
  required fresh-review closure of an upgrade deterministically. A delta
  review claim is admitted only when the performed set contains the computed
  closure; whole-root review remains the recovery path.
- Deterministic scaffolds: `review --scaffold` emits the exact review input
  with carried judgments prefilled, and `record --scaffold` emits a
  declaration skeleton with exact digests and section paths — structure only,
  never a judgment.
- Lifecycle-neutral identity: the legacy state-baked directory trees move
  once to neutral `items/` locations, new identifiers and stable paths never
  assert version, state, disposition, or currency, and a living record's
  identifier can succeed through one governed identity-succession act with
  permanent historical resolvability.
- Operational-fact promotion triggers: nodes declaring release facts are
  mechanically invalidated into a readiness-blocking reconciliation set at
  every version promotion.
- The post-audit technical-confirmation Decision is mandatory and
  audit-bound; publication before it is a protocol violation, and no waiver
  exists.
- Task transitions perform the Git orchestration the authoring guidance
  describes — branch, working tree, draft request, conclusion push and
  ready-marking — with truthful `incomplete` reporting; Git stays
  operational output and never becomes a conformance input.
- Immutable bytes are uniformly historical: predecessor-locked sources,
  immutable records, and Evidence byte sets are never rewritten, and their
  references resolve as history under closed rules.

## What Breaks

- Updating an exact conformant NKF 0.6 repository to 0.7 is breaking and
  requires explicit repository-owner approval, even though migration
  preserves canonical Markdown bytes and historical authority.
- Live support shrinks to the current version plus one predecessor: 0.7 and
  0.6. Repositories declaring NKF 0.1 through 0.5 are out of window; the
  tooling fails closed and names the exact stepping-stone release archive
  for the next hop.
- The one deliberate stable-path neutralization moves Task, Design, and
  Realization sources out of the legacy lifecycle directories; living-source
  links are rewritten mechanically in the same transaction.
- Native task-state frontmatter remains rejected; the 0.6 rules carry
  forward unchanged, with the new stable-path and identity-assertion rules
  enforced as continuing conformance.

## How To Adopt

Run the one public Adopt operation against the recommended release:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

A 0.7 repository refreshes non-breakingly. A 0.6 repository is shown the
exact breaking target and stops; approve and supply a review path:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --accept-breaking repository-owner --review <review.yaml>
```

Adopt writes the exact migration review with carried judgments prefilled and
the computed required fresh set left to a named reviewer, then completes the
migration transactionally on rerun. An out-of-window repository receives the
exact stepping-stone archive coordinates instead of a silent migration.

## How To Verify

- Verify the downloaded archive digest against the release tag and the
  recommendation before use; the content-addressed digest is the trust
  anchor.
- After adoption, run `npm run nkf:check` (or the pinned
  `node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .`): it
  verifies the pin, integration, bundle, complete conformance, and readiness
  against the digest-bound baseline.
- A second public Adopt invocation must return `current`; a tampered
  baseline, pin, or guidance file fails closed instead.
