---
title: "ADR 0120: Confirm The NKF 0.5 Release Candidate"
id: adr-0120
type: decision
summary: Confirm the exact independently audited NKF 0.5 implementation and private release candidate under the Human Product Owner's explicit technical delegation.
created_at: 2026-08-13T17:15:48Z
record_lifecycle: immutable
record_status: accepted
task: NKF-026
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.5 technical derivation delegation
---

# ADR 0120: Confirm The NKF 0.5 Release Candidate

## Context And Problem

[ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md) accepts the
exact corrected NKF 0.5 authority set, but acceptance does not confirm derived
Schema, checker, adopter, integration, migration, semantic-review, release-set,
or archive bytes. [ADR 0109](0109-publication-freeze-and-proven-self-adoption.md)
requires exact candidate-bound producer Adopt and a fresh independent audit
before publication.

The [exact-candidate audit](../evidence/audits/nkf-026-nkf-0-5-exact-candidate-audit.md)
returned `CLEAN` after independently rebuilding, reproducing, reviewing, and
exercising the final candidate from fresh state. Every earlier private
candidate and review was discarded after its source changed and supplies no
fact to this confirmation.

## Decision

The Codex technical reviewer confirms the derived NKF 0.5 implementation at
exact release commit `777ea9a3a87591de36494296db4437c5b4343ce2` and the
corresponding private candidate archive at SHA-256
`e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9`.

The confirmed checker SHA-256 is
`95f53b252b57235b6ad5569f45dd9e661b5155318630ca634971b851b6631358`.
The confirmed adopter SHA-256 is
`065116b703c9a636c94768ecfb514a7859174929d94ee3e446c6c48a3dfb1870`.
The archive contains 180 exact pre-manifest members and one generated manifest.
The checker is its sole `0755` member; every other member is `0644`.

This confirmation binds the revision 2 normative Markdown at SHA-256
`0f3b7c085eba4fa92655e20916fccb7013169b5560dd50c241fb4726df31287c`,
the executable companion at SHA-256
`2743102a4bddf9a26253fba3982f00bf9c688c819891815221e3ea4ee67c5290`,
and the freshness policy at SHA-256
`5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd`.
It covers seven derived Schemas, deterministic graph and freshness behavior,
stable lifecycle mechanics, semantic-review closure, complete release
membership, exact source and archive reproduction, Product and Technology
fixtures, repository-owner-approved 0.1 through 0.4 migration, rollback,
idempotence, host-superset preservation, ordinary repeat `current`, and
archive, pin, byte, and path tamper rejection.

The exact confirmed archive may now be published through the accepted release
transaction. No candidate byte or release-commit input may change.
Recommendation promotion and ordinary public producer Adopt remain separate
post-publication operations.

## Scope And Applicability

This Decision confirms only the exact technical implementation and release
candidate that derive [ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
inside [ADR 0115](0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)'s
Human-Product-Owner-confirmed Product boundaries. It changes no NKF meaning,
compatibility classification, consumer authority, or Product decision.

## Rationale

The clean audit independently verified all 181 archive members, all 180
manifest bindings, seven Schemas, two byte-identical archive constructions,
29 test files and 218 tests from clean dependencies, the exact 268-node review
with 351 Decision-purpose classifications and all 14 relationship categories,
candidate-bound producer migration, repeat-current behavior, the complete
host-superset gate, and adversarial fail-closed behavior. Separate technical
confirmation prevents passing code, validation, or Evidence from exercising
authority by implication.

## Alternatives Considered

Publishing from the candidate's own green gate was rejected because a fresh
independent exact-candidate audit is mandatory. Reusing an earlier candidate
or review was rejected because any source-byte change invalidates its audit
and review. Asking the Human Product Owner to approve technical facts was
rejected because [NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
explicitly delegates technical confirmation. Rebuilding after this Decision
was rejected because any candidate-byte change invalidates both the audit and
this confirmation.

## Consequences And Trade-Offs

Publication is limited to one exact content-addressed archive and its exact
release commit. Keeping confirmation outside the archive avoids a
self-reference and changes no frozen candidate byte. A later defect cannot be
fixed in place after publication; it requires recommendation withdrawal or
supersession and a new NKF version.

## Non-Claims

This Decision does not:

- publish, recommend, withdraw, or supersede an NKF release;
- mutate or ordinarily adopt the NKF producer or another consumer repository;
- accept consumer Product or Technology meaning;
- confirm a consumer Realization or semantic truth outside the exact reviewed
  producer snapshot;
- establish remote workflow or protected-merge enforcement;
- verify historical acceptance bindings; or
- make general Governing Use ready.
