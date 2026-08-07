---
id: adr-0056
type: decision
title: "ADR 0056: Design Direction And Record Authority"
summary: NKF defines a Design as governed proposal knowledge containing a possible direction, alternatives, and trade-offs. Earlier repository wording still used acceptance both for the direction proposed by a Design and for authority over the exact Design record revision. It also attempted to derive native record governance from Design disposition.
created_at: 2026-07-30T17:34:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
decision_authority: Codex technical reviewer under the Human Product Owner's explicit direction to choose vocabulary consistent with NKF’s Design concept
---

# ADR 0056: Design Direction And Record Authority

## Context And Problem

NKF defines a Design as governed proposal knowledge containing a possible
direction, alternatives, and trade-offs. Earlier repository wording still
used acceptance both for the direction proposed by a Design and for authority
over the exact Design record revision. It also attempted to derive native
record governance from Design disposition.

Those formulations conflate two independent questions:

1. what happened to the proposed direction; and
2. what the authority claims about the exact record revision describing it.

## Decision

NKF uses these verbs for a Design direction:

- a Design **proposes** a direction;
- a Decision **adopts**, **rejects**, or **supersedes** that direction; and
- an owner may **withdraw** a direction without a merits Decision.

`Adopted`, `Rejected`, `Superseded`, and `Withdrawn` are Design dispositions.
`Accepted` is not a Design disposition. Acceptance applies only to an exact
record revision under its declared authority.

Design disposition and native record governance are independent axes.
Disposition MUST NOT determine `governance.lifecycle` or
`governance.status`. A terminal Design normally uses an immutable revision,
but its authority state requires exact acceptance, supersession, or retirement
provenance. A Decision may reject a proposed direction while the authority
accepts the exact Design revision as the authoritative record of what was
reviewed.

A Design remains proposal knowledge in every disposition. Adoption does not
move its meaning into current authority. Specifications own current normative
meaning and Realizations own current implementation knowledge.

## Scope And Applicability

This vocabulary governs current NKF repository guidance, the Common Design
body meaning, Design indexes and declarations, and future NKF Design
authoring. Historical Decisions and preserved Evidence retain their original
wording as provenance.

## Rationale

The vocabulary lets one sentence answer one question. `Adopted` reports the
outcome of deliberation over a direction. `Accepted` reports authority over
exact bytes. Keeping them separate prevents a validator, directory name,
implementation, or Design disposition from manufacturing semantic authority.

## Alternatives Considered

Using `accepted` as the Design outcome was rejected because it obscures
whether an authority accepted the record or a Decision selected its direction.

Deriving record governance from Design disposition was rejected because a
rejected or withdrawn direction can still have an authoritative, accepted
record revision, while an adopted direction does not by itself prove exact
revision acceptance.

Using `resolved` as a terminal disposition was rejected because it hides the
material distinction among adoption, rejection, supersession, and withdrawal.

## Consequences And Trade-Offs

Authors must be explicit about whether they mean record acceptance or
direction disposition. Some current declarations and historical Design
revisions require deliberate successor bindings. The additional precision is
worth the migration cost because it removes a false authority inference.

## Accepted Revisions

NKF accepts the exact successor authority pair:

| Authority Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `52daa84db3067e39d8868f190874bb3a75328589d00127fecd7cb299312fa4ed` |
| `contracts/nkf/0.1/nkf.yaml` | `9bd57b1a3c9992ff30a50d5e90ba7f7ef55d56f5aa4a38a5a463e711e07a1136` |

NKF also accepts these exact terminology-aligned Design record revisions:

| Design Record | Disposition | SHA-256 |
| --- | --- | --- |
| `knowledge/designs/adopted/knowledge-architecture.md` | Adopted | `5b2e53bc5c18de1e85901d976282faa5b2fedd6d0abce14ed9c11b7ad791d4b3` |
| `knowledge/designs/adopted/project-path-and-knowledge-coverage.md` | Adopted | `5f1187e4acb01e294e57de01da49cb96f0913f1683896c4a7c3b0d663787cf42` |
| `knowledge/designs/adopted/technology-root-profile.md` | Adopted | `adb3f18975127769b3cb75202b9290b67dd521f60048fa40b04337cb37d37651` |

Acceptance preserves each exact proposal record. The previously recorded
Decisions establish their Adopted dispositions.

## Supersession And Compatibility

This Decision completes the Design vocabulary correction begun by [ADR 0054](0054-front-matter-authority-pair.md)
and [ADR 0055](0055-design-responsibility-vocabulary.md). It supersedes current wording that calls a Design direction
accepted or derives record authority from disposition. Historical sources
remain Evidence and do not become supported current declarations.

This is an explicit breaking pre-stable correction inside NKF’s sole `0.1`
version namespace. New and revised Design declarations use the current
responsibility identities and the distinction above.

## Non-Claims

This Decision does not confirm Schemas, checker behavior, fixtures,
self-hosting declarations, current-system Realizations, build output,
repository conformance, publication, release, or external-consumer migration.
