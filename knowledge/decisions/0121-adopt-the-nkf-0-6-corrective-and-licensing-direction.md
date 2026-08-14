---
id: adr-0121
type: decision
title: "ADR 0121: Adopt The NKF 0.6 Corrective And Licensing Direction"
summary: Adopt the exact independently audited NKF 0.6 corrective, prepublication-proof, Apache-2.0 licensing-preparation, and repository-identity direction without accepting an authority pair or authorizing publication or visibility changes.
created_at: 2026-08-13T19:48:57Z
---

# ADR 0121: Adopt The NKF 0.6 Corrective And Licensing Direction

## Context And Problem

The immutable published NKF 0.5 adopter reports successful record re-pinning
while leaving a changed native record digest untouched because its mutation
logic assumes that `source.digest` immediately follows `source.path`. Native
NKF 0.5 declarations insert `source.stable_path` between those fields. The
first ordinary producer authoring change after publication exposed the defect.

[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md) correctly
requires exact-candidate adoption and audit before publication, but the 0.5
candidate exercise did not include the complete ordinary authoring lifecycle
against the adopted producer. Publication therefore occurred before the first
native record edit and re-pin exercise.

Under [NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md),
the Human Product Owner confirmed one NKF 0.6 corrective successor and then
explicitly expanded that same owning Task to include complete-repository
preparation under the standard, unmodified Apache License 2.0. The exact
licensing, NOTICE, repository-identity, public-scope, trademark-separation,
and operational non-authorization boundaries are recorded there.

The resulting Design and
[licensing assessment](../evidence/audits/nkf-027-open-source-licensing-preparation-assessment.md)
were audited independently. Intermediate notice and inventory defects were
rejected. The corrected checkpoint returned `CLEAN`, with official license and
NOTICE byte checks, complete current build-input notices, an exact `68`-path
repository-reference ledger, declaration and digest symmetry, and no new
Product meaning.

## Decision

On `2026-08-13`, the Codex technical reviewer, acting only under the Human
Product Owner's explicit delegation for faithful technical derivation,
accepts this exact Design revision and adopts its proposed direction:

| Design | Accepted SHA-256 |
| --- | --- |
| [NKF 0.6 Corrective Release And Open-Source Licensing](../designs/items/nkf-0-6-corrective-release-and-open-source-licensing.md) | `1ecaa9917b6f1690bbfa8e485aa47a4c83db834c9d312a6b33b3e3bb6abb307f` |

The Human Product Owner remains source authority for every substantive
licensing, trademark, public-scope, Product, and release-workflow boundary.
This delegated exact-record confirmation adds no Product meaning.

The adopted direction establishes:

1. NKF 0.6 structurally mutates declared YAML fields through parsed node
   identity and exact source ranges, preserves unrelated bytes, validates
   required postconditions, and cannot report a successful zero-change result
   when a requested subject was stale;
2. mutation commands are transactional, rollback-safe, idempotent, and
   exercised through an explicit command-by-subject matrix rather than one
   representative happy path;
3. the exact prepublication 0.6 candidate must Adopt into an isolated copy of
   the exact producer and then complete ordinary record, document, artifact,
   pin, reference, Task-transition, Realization, freshness, rollback,
   tamper, build, archive, and full-gate exercises before any technical
   confirmation or publication;
4. postpublication producer adoption proves immutable distribution,
   recommendation, acquisition, and byte identity; it is not the first
   functional exercise of a release;
5. the complete NKF repository and the 0.6 release use the standard,
   unmodified Apache License 2.0 with SPDX identifier `Apache-2.0`, the exact
   Human-confirmed informational `NOTICE`, and deterministic notices for all
   bundled third-party code and data under their own compatible terms;
6. current repository identity and 0.6 distribution behavior use
   `NourdApS/Nourd.NKF`, while immutable provenance, frozen contracts,
   predecessor fixtures, releases, and accepted records retain historically
   correct `kaveh6202/Nourd.NKF` references;
7. compatibility is intended to be non-breaking from 0.5 only if exact
   fixture and producer migration evidence proves that claim before authority
   acceptance; otherwise the classification must change; and
8. licensing, Company rights evidence, trademark policy, Github visibility,
   publication, recommendation, acceptance, Realization confirmation,
   conformance, readiness, Governing Use, and Git state remain separate facts.

## Scope And Applicability

This Decision adopts one technical and licensing-preparation direction for the
NKF repository only. It extends the publication-proof boundary of
[ADR 0109](0109-publication-freeze-and-proven-self-adoption.md), the release
integrity allocation of
[ADR 0042](0042-release-distribution.md), and the immutable 0.5 predecessor
authority accepted by
[ADR 0119](0119-accept-the-nkf-0-5-revision-2-authority-pair.md).

The Decision permits technical derivation of a distinct NKF 0.6 authority
pair, Schemas, checker, adopter, fixtures, release set, and Realization under
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It does not authorize Git state mutation, Github visibility changes,
publication, release creation, recommendation promotion, or merger.

No other Nourd repository is licensed or changed. The separately identified
public-documentation repository is outside this Task. A future trademark,
security, contribution, governance, or community-conduct policy requires its
own confirmed consequential terms.

## Rationale

The 0.5 failure was not caused by publication freeze; freeze correctly
prevents silent replacement of distributed bytes. It was caused by an
incomplete candidate exercise that proved migration and conformance but did
not prove ordinary authoring after native adoption. Moving that exercise
before publication makes the producer itself a real consumer of the exact
candidate while correction remains possible.

Structural mutation removes a layout assumption that was never part of the
YAML contract. Exact postconditions prevent a command from treating a regex
miss as successful work. A closed coverage matrix makes omissions reviewable
and testable.

Root licensing artifacts and deterministic third-party notices make the grant
and retained component rights travel with the complete release. Keeping
trademark and community policy separate avoids adding restrictions to the
Apache license. Classifying repository references preserves provenance while
allowing current behavior to follow the organization transfer.

## Alternatives Considered

Patching the published 0.5 archive was rejected because its complete set is
immutable. Keeping regex mutation and adding another sibling-key pattern was
rejected because future valid key order or optional fields would recreate the
same failure. Treating the final producer gate as sufficient was rejected
because it does not itself exercise every authoring command.

Publishing first and withdrawing after producer testing was rejected because
withdrawal cannot unpublish defective immutable bytes. A custom NKF license or
additional restrictions in `NOTICE` were rejected by Human direction.
Globally replacing the former repository owner was rejected because it would
corrupt historical provenance and frozen version behavior.

## Consequences And Trade-Offs

The 0.6 derivation must carry more prepublication evidence and takes longer
than a narrow code patch. That cost is deliberate: the exact producer must
demonstrate ordinary authoring, not only installation and validation, before
the release becomes immutable.

Licensing preparation remains incomplete until the exact 0.6 build graph is
available, its notices are regenerated and verified, and the Company-side
rights assertion is confirmed through the appropriate external authority.
Those facts do not prevent technical derivation, but they block a licensed
0.6 release from being technically confirmed.

The accepted Design is now immutable and adopted proposal knowledge. Current
normative meaning will belong only to a separately accepted exact NKF 0.6
Specification and executable companion. Production implementation will belong
only to a separately confirmed Realization.

## Non-Claims

This Decision does not:

- accept an NKF 0.6 Specification, executable companion, policy, or Schema;
- derive or confirm checker, adopter, fixture, release-set, archive, or
  Realization bytes;
- prove the intended 0.5-to-0.6 compatibility classification;
- prove Company legal title beyond the Human Product Owner's repository
  direction;
- confirm final third-party notices before the exact 0.6 build exists;
- draft or accept trademark, security, contribution, governance, or Code of
  Conduct terms;
- change Github visibility or make the repository publicly readable;
- commit, push, merge, publish, release, recommend, or adopt NKF 0.6;
- accept consumer knowledge or external-system observations; or
- establish acceptance-binding verification, confirmed Realization,
  readiness, remote enforcement, or Governing Use.
