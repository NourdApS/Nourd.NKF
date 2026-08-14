---
id: adr-0123
type: decision
title: "ADR 0123: Accept The Conformant NKF 0.6 Authority Set"
summary: Accept the unchanged exact NKF 0.6 authority and producer-promotion set through a conformant technical Decision after the prior acceptance attempt failed its inherited deep-link rule.
created_at: 2026-08-13T22:22:29Z
---

# ADR 0123: Accept The Conformant NKF 0.6 Authority Set

## Context And Problem

[ADR 0122](0122-accept-the-nkf-0-6-authority-set.md) attempted to accept the
exact independently audited NKF 0.6 authority and producer-promotion set. The
first native 0.6 producer-promotion rehearsal then proved that its immutable
source contains one plain same-bundle Decision reference in its Alternatives
section. The accepted 0.6 checker correctly emits
`markdown.reference.deep-link.required` when that attempted record enters the
native 0.6 graph.

The exact [ADR 0122](0122-accept-the-nkf-0-6-authority-set.md) bytes remain
unchanged as non-record historical Evidence. They cannot supply conformant
release authority. This Decision follows the correction pattern established
by [ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md): it is a
distinct conformant technical acceptance record, not an edit to an immutable
attempt.

The exact authority bytes, promotion input, compatibility proof, and
independent audit accepted below are unchanged. The failed rehearsal is
prepublication evidence and no release or consumer adoption occurred.

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
policy is accepted only at its exact identity and digest. The promotion input
is accepted only as non-authoritative serialized input whose prospective
native declaration becomes applicable after this Decision resolves. Neither
the input nor validation supplies acceptance, and no member may be
substituted independently.

The accepted compatibility classification remains exact:

- migration from NKF 0.1 through NKF 0.4 is breaking and requires
  repository-owner approval before mutation;
- update from a valid, ready NKF 0.5 predecessor to NKF 0.6 is non-breaking,
  requires no repository-owner breaking approval, and mechanically carries
  reviewed baseline meaning only under every accepted precondition; and
- a missing, outdated, disputed, ambiguous, or otherwise non-ready 0.5
  baseline fails before mutation. Restoring predecessor readiness remains a
  separate governed 0.5 knowledge-maintenance operation.

## Scope And Applicability

This Decision implements only the direction adopted by
[ADR 0121](0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md),
extends the immutable NKF 0.5 authority accepted by
[ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md), and preserves
the two-stage release and producer-adoption order of
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md).

It authorizes faithful derived 0.6 Schemas, checker, adopter, fixtures,
integrations, documentation, release-set, licensing verification, and
Realization work inside [NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It does not accept consumer Product or Technology meaning or authorize Git
mutation, publication, recommendation, public adoption, merge, or visibility
changes.

## Rationale

The authority bytes and compatibility evidence remain clean. Only the prior
acceptance attempt was structurally invalid. Retaining that exact source as
non-record historical Evidence preserves provenance without letting an
invalid attempted record supply release authority. A distinct Decision keeps
acceptance, conformance, implementation, and publication separate.

## Alternatives Considered

Editing [ADR 0122](0122-accept-the-nkf-0-6-authority-set.md) was rejected
because immutable attempted acceptance bytes are preserved. Weakening the
deep-link rule or exempting the producer was rejected because repository
identity cannot bypass conformance. Publishing first was rejected by
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md). Allocating a
new NKF version was unnecessary because no 0.6 archive was published and no
member of a published complete set changed; the accepted four-file 0.6
authority set itself remains byte-identical.

## Consequences And Trade-Offs

Implementation and promotion bind this Decision as the sole conformant 0.6
technical acceptance record. Any later authority or promotion-input byte
change requires a fresh governed successor and audit. The failed rehearsal
must remain recorded, and the complete candidate must repeat producer
promotion from a fresh isolated copy before publication.

## Non-Claims

This Decision does not:

- change any Human-Product-Owner-confirmed Product boundary;
- rewrite or validate [ADR 0122](0122-accept-the-nkf-0-6-authority-set.md);
- confirm derived Schema, checker, adopter, fixture, integration,
  documentation, release-set, archive, or Realization bytes;
- establish licensing readiness or Company legal title;
- publish, recommend, release, adopt, commit, push, merge, or change visibility;
- verify acceptance binding in a checker result; or
- establish release readiness, remote enforcement, or Governing Use readiness.
