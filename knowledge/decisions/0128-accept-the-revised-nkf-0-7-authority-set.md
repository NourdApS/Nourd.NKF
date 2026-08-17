---
id: adr-0128
type: decision
title: "ADR 0128: Accept The Revised NKF 0.7 Authority Set"
summary: Accept the revised NKF 0.7 authority set whose succession-identifier deep-link rule the candidate promotion rehearsal proved necessary, superseding the prior five-artifact selection while keeping it immutable governed history.
created_at: 2026-08-17T11:00:00Z
---

# ADR 0128: Accept The Revised NKF 0.7 Authority Set

## Context And Problem

[ADR 0127](../decisions/0127-accept-the-nkf-0-7-authority-set.md) accepted
the audited NKF 0.7 authority set. The candidate promotion rehearsal that
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
requires then exposed one defect the three audit rounds could not see,
because it manifests only after the accepted identity succession executes:
once the version-free identifier goes live, immutable accepted sources that
name it — including
[ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
and the accepted Specification itself — violate the deep-link rule with
bytes that may never change. This is the same defect class the 0.6 lineage
hit when a future accepting-Decision token became resolvable, and the
accepted rule text left no lawful resolution.

## Decision

On `2026-08-17`, the Claude technical reviewer, acting under the same
recorded delegation, boundaries, and satisfied independent-audit condition
as [ADR 0127](../decisions/0127-accept-the-nkf-0-7-authority-set.md),
accepts the revised bytes as one inseparable NKF 0.7 technical authority and
producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.7 Specification](../specifications/nkf-0.7.md) | `knowledge/specifications/nkf-0.7.md` | `6d1c904608f57446939f9442d46aa3b735e34fce75ddfba24fabbea8416f0992` |
| [NKF 0.7 executable companion](../../contracts/nkf/0.7/nkf.yaml) | `contracts/nkf/0.7/nkf.yaml` | `9175c86b82100b84e983afbc06f89ff79c666bd8cd0626ee7892688e6551cc49` |
| [NKF 0.7 freshness policy](../../contracts/nkf/0.7/freshness-policy.yaml) | `contracts/nkf/0.7/freshness-policy.yaml` | `7bee48aac0fef1b1cc968efa25f2a6fb2205c77a0ec3fcf6c82ec17cdd5eeee0` |
| [NKF 0.6-to-0.7 version-delta declaration](../../contracts/nkf/0.7/version-delta.yaml) | `contracts/nkf/0.7/version-delta.yaml` | `dcc65c82512c73a204223a3bac990c951f44e995d5859426479042dbef8fcb37` |
| [NKF 0.7 producer-promotion input](../evidence/release/nkf-0.7-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.7-producer-promotion.yaml` | `3fe6b72a54c39a111b984fbcf01a214996e8aa6a2d1a96fb38d9d17b7eb0ee52` |

The revision makes immutable bytes uniformly historical, in two rules the
rehearsal proved necessary, plus its own succession mention: a record
identifier that became live through an identity succession must be a deep
link only inside living sources; predecessor-locked sources, immutable
record sources, and Evidence byte sets keep their exact pre-migration bytes
— the one deliberate migration never rewrites them, and their links resolve
through the closed legacy stable-path mapping instead of being retargeted;
and the Specification's own successor mention became a resolvable deep link.
The policy and version-delta bytes are unchanged from the prior acceptance.

For NKF 0.7 authority, this Decision supersedes only
[ADR 0127](../decisions/0127-accept-the-nkf-0-7-authority-set.md)'s
five-artifact selection. That Decision, its exact bytes, its historical
acceptance fact, and its conclusions outside that selection — including the
audit-condition satisfaction and the deferred succession of the live 0.6
release authority — remain immutable governed history and continue to apply
to this revised selection unchanged. The accepted NKF 0.6 revision 3
selection of
[ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
remains the current live release authority until the separately authorized
NKF 0.7 publication and public producer promotion.

## Scope And Applicability

Identical to
[ADR 0127](../decisions/0127-accept-the-nkf-0-7-authority-set.md)'s scope,
applied to the revised selection: faithful derived implementation, the
candidate-bound promotion rehearsal, and release-candidate preparation inside
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md);
no publication, recommendation, merge, visibility change, live promotion, or
consumer-meaning acceptance.

## Rationale

The rehearsal is part of the accepted release order precisely to expose
defects that static audit cannot: this one exists only in the post-promotion
graph. Exempting immutable sources mirrors the already-accepted treatment of
predecessor-locked bytes — history never retro-breaks — while keeping every
living source obliged to link, so navigability degrades nowhere a governed
edit can reach.

## Alternatives Considered

Editing [ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
was rejected because accepted bytes are immutable. A per-document historical
containment like the 0.6 lineage's was rejected as a non-generalizing
exception for a defect class the succession rule will keep producing.
Dropping the identity succession was rejected because the version-baked
identifier is a confirmed 0.7 boundary.

## Consequences And Trade-Offs

Derived NKF 0.7 artifacts, the release set, and the promotion bind only the
revised paths and digests. Any later authority byte change requires a fresh
governed successor and independent audit. An immutable source naming a
succession-created identifier stays unlinked forever; readers reach the
record through the living navigation instead.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0127](../decisions/0127-accept-the-nkf-0-7-authority-set.md) or any
  earlier accepted Decision;
- derive or confirm implementation, release-set, archive, or Realization
  bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, promote the live producer, commit,
  push, merge, or change visibility; or
- accept consumer Product or Technology meaning.
