---
id: adr-0122
type: decision
title: "ADR 0122: Accept The NKF 0.6 Authority Set"
summary: Accept the exact independently audited NKF 0.6 Markdown, executable companion, freshness policy, and producer-promotion input after the required non-breaking compatibility proof.
created_at: 2026-08-13T21:27:28Z
---

# ADR 0122: Accept The NKF 0.6 Authority Set

## Context And Problem

[ADR 0121](0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md)
adopted the Human-Product-Owner-confirmed corrective, prepublication-proof,
Apache-2.0 licensing-preparation, and repository-identity direction. It
required exact Product-fixture, Technology-fixture, and isolated real-producer
evidence before the intended non-breaking 0.5-to-0.6 classification could be
accepted.

The [compatibility proof](../evidence/audits/nkf-027-nkf-0-5-to-0-6-compatibility-proof.md)
demonstrates that exact ready 0.5 graphs advance without repository-owner
breaking approval, semantic input during update, or knowledge loss. It also
proves that a stale producer baseline is rejected before mutation and that
any predecessor review and seal remain a separate governed 0.5 operation.

The fresh independent
[authority and compatibility audit](../evidence/audits/nkf-027-nkf-0-6-authority-and-compatibility-audit.md)
returned `CLEAN` only after prior prospective revisions with contract,
promotion, command-matrix, compatibility, release-sequence, and digest-binding
defects were rejected and corrected.

## Decision

On `2026-08-13`, the Codex technical reviewer, acting only under the Human
Product Owner's explicit technical-derivation delegation recorded in
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md),
accepts these exact bytes as one inseparable NKF 0.6 technical authority and
producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.6 Specification](../specifications/nkf-0.6.md) | `knowledge/specifications/nkf-0.6.md` | `29b09eed921fdf0db2042b046909d193e2e8999095c41b708adef959187e03b2` |
| [NKF 0.6 executable companion](../../contracts/nkf/0.6/nkf.yaml) | `contracts/nkf/0.6/nkf.yaml` | `cdae1762581c7c6ba9a2737c0389bad0cf4699b5796b08fd3cb2414fadc8a7e8` |
| [NKF 0.6 freshness policy](../../contracts/nkf/0.6/freshness-policy.yaml) | `contracts/nkf/0.6/freshness-policy.yaml` | `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4` |
| [NKF 0.6 producer-promotion input](../evidence/release/nkf-0.6-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.6-producer-promotion.yaml` | `a48c1a1802f23796263124d7331ae6e1f1d585429b004ee59b82d7285418e797` |

The Markdown is normative human-readable authority. The executable companion
is accepted only with its exact Markdown and policy digest bindings. The
policy is accepted only at its exact identity and digest. The producer-
promotion input is accepted only as the exact non-authoritative serialized
input whose future record declaration and destination become applicable after
this Decision resolves; neither the input nor validation supplies acceptance.
No member may be substituted independently.

The accepted compatibility classification is:

- migration from NKF 0.1 through NKF 0.4 remains breaking and requires
  repository-owner approval before mutation;
- update from a valid, ready NKF 0.5 predecessor to NKF 0.6 is non-breaking,
  requires no repository-owner breaking approval, and mechanically carries
  reviewed baseline meaning only under every exact accepted precondition; and
- a missing, outdated, disputed, ambiguous, or otherwise non-ready 0.5
  baseline fails before mutation. Any review and seal required to restore a
  current predecessor baseline remains a separate governed 0.5 operation and
  cannot be inferred or performed by the 0.6 updater.

## Scope And Applicability

This Decision extends the exact NKF 0.5 predecessor authority accepted by
[ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md), implements
only the direction adopted by
[ADR 0121](0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md), and
preserves the two-stage release and producer-adoption order of
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md).

It authorizes derived 0.6 Schemas, checker, adopter, fixtures, integrations,
documentation, release-set, licensing verification, and Realization work
inside NKF-027. It does not accept consumer Product or Technology meaning and
does not authorize Git-state mutation, publication, recommendation, public
adoption, merge, or Github visibility changes.

## Rationale

Exact structural equality of the 0.5 and 0.6 freshness policies, preserved
node and edge sets, byte-preserved review meaning, deterministic graph-
revision recomputation, and successful ready-fixture and ready-producer
exercises support the non-breaking classification. Stale-baseline refusal
prevents the updater from concealing missing semantic maintenance.

Binding the producer-promotion input separately avoids a digest cycle while
making the exact future native Specification declaration, destination, and
authority inspectable before candidate Adopt. Keeping producer promotion
restricted to the isolated prepublication exercise and later exact public
self-Adopt preserves the distinction between acceptance, candidate proof,
publication, and live adoption.

## Alternatives Considered

Accepting the authority before compatibility proof was rejected by ADR 0121.
Treating a stale baseline as automatically convertible was rejected because
tooling cannot invent semantic review. Requiring repository-owner approval
for a semantically unchanged ready-0.5 update was rejected because the exact
evidence supports a non-breaking mechanical successor. Reusing the 0.5
bootstrap lock for the new native 0.6 Specification was rejected because that
lock is identity- and version-specific. Publishing before the complete
ordinary-authoring producer rehearsal remains rejected.

## Consequences And Trade-Offs

Implementation must derive from these exact bytes. Any authority or promotion-
input byte change requires a later governed successor and fresh exact audit.
The implementation must reproduce the accepted command-subject matrix,
structural mutation, postconditions, rollback, 0.5 carry-forward, two-stage
producer promotion, licensing set, and release order without weakening them.

The expanded prepublication proof costs more execution time and semantic
review, but prevents immutable publication from becoming the first ordinary
authoring test. Licensing readiness still requires exact 0.6 build-graph
notice verification and the separately reported Company-side rights
confirmation; authority acceptance does not establish either fact.

## Non-Claims

This Decision does not:

- confirm any derived Schema, checker, adopter, fixture, integration,
  documentation, release-set, archive, or Realization byte;
- prove the future implementation conforms to this authority;
- establish final third-party notice completeness for an as-yet-unbuilt 0.6
  archive or confirm Company legal title;
- draft or accept trademark, security, contribution, governance, or Code of
  Conduct terms;
- change Github visibility or make the repository publicly readable;
- commit, push, merge, publish, release, recommend, or adopt NKF 0.6;
- verify acceptance binding in a checker result; or
- establish release readiness, confirmed Realization, remote enforcement, or
  Governing Use readiness.
