---
id: adr-0055
type: decision
title: "ADR 0055: Design Responsibility Vocabulary"
summary: NKF defines a Design as governed proposal knowledge containing alternatives and trade-offs. ADR 0054 distinguishes acceptance of an exact Design record revision from adoption of the direction proposed by that Design.
created_at: 2026-07-30T17:23:58Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
---

# ADR 0055: Design Responsibility Vocabulary

- **Status:** Accepted
- **Task:** `NKF-007`
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's explicit direction to use vocabulary consistent with NKF’s Design
  concept
- **Review Evidence SHA-256:** `52c8b0859918aba24df9c9442e11172ff90b04970d2bc603fdaa068c135c90c4`

## Context

NKF defines a Design as governed proposal knowledge containing alternatives
and trade-offs. ADR 0054 distinguishes acceptance of an exact Design record
revision from adoption of the direction proposed by that Design.

The current native Design body nevertheless retained two historical
responsibility identities that mixed those concepts:
`proposed-or-accepted-design` and
`validation-and-acceptance-evidence`.

## Decision

The current NKF 0.1 Design body uses:

- `proposed-direction` — the direction proposed for a Decision to adopt,
  reject, or supersede; and
- `validation-and-decision-evidence` — the validation approach and evidence
  needed for an informed Decision.

A Design remains proposal knowledge in every disposition. A Decision adopts,
rejects, or supersedes the proposed direction. Acceptance governs an exact
record revision and is not a Design disposition.

NKF accepts the exact successor authority pair:

| Authority Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `f50fe1ffe805195911b053c66329ddd0fb7664aef45abb911cc29d1d1b3f2a0a` |
| `contracts/nkf/0.1/nkf.yaml` | `4bedf1bed591ce173c02091827885178154839c09fdb3b9d8d22b347d906fc5b` |

NKF also accepts the exact terminology-aligned successor revisions of the
affected adopted Design records without changing their Adopted disposition:

| Design Record | SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/knowledge-architecture.md` | `f460b081a18fa7215cd8746588731e356de62eb773010e64ed9527c157527d48` |
| `knowledge/designs/adopted/product-responsibility-identifiers.md` | `de0a5c7a66c75e42da246e41176c3dd10a8639554453b305bc52eccf67c5a06f` |
| `knowledge/designs/adopted/technology-root-profile.md` | `1f079cc4b26cb3061f7750cea3139bfafd5fdc0aedb118888a9dd6ee0fcb0aa6` |

Acceptance of those exact Design record revisions preserves proposal
provenance. It does not adopt a new direction beyond the Decisions already
recorded in each Design’s disposition provenance.

## Supersession And Compatibility

This Decision supersedes the two predecessor Design responsibility identities
in ADR 0003 and ADR 0054 for current NKF 0.1 use. Those Decisions remain
immutable provenance.

The Design body still has eight required responsibilities. No other body,
profile, serialization field, section role, diagnostic, or version coordinate
changes. Historical declarations using predecessor identifiers are evidence,
not supported current declarations.

This is an explicit breaking pre-stable correction inside NKF’s sole `0.1`
version namespace. New and revised Design declarations must use the successor
identities. External consumers migrate deliberately under their own
authority.

## Derived Realization State

The current Schema candidates are rebound without assertion-graph changes:

| Derived Candidate | SHA-256 |
| --- | --- |
| Bundle Schema | `a9d118b3f066fa9389dfa5ef909f5b57681b61238309edde5f9576e801cad8a8` |
| Record Schema | `0b11a7faaeb2ac9993d83f8102fc2ae25c7c32436ef4496f3a5aeb97eb6b5ff1` |
| Validation Result Schema | `f7873cbbd9b3a7a24dd4b0374c68b165cc4b3cf85d98e7fdcd5c51bc6c315ed4` |

Their confirmation remains part of the complete NKF-007 Realization and
self-hosting confirmation.

## Non-Claims

This Decision does not confirm the checker, Schemas, declarations,
current-system Realizations, build, or repository conformance. It does not
publish a release or migrate an external consumer.
