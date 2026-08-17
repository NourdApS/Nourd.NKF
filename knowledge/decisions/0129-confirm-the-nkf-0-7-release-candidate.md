---
id: adr-0129
type: decision
title: "ADR 0129: Confirm The NKF 0.7 Release Candidate"
summary: The mandatory audit-bound technical confirmation of the exact NKF 0.7 release candidate — release commit, archive, checker, and adopter digests bound to the clean independent release audit — authorizing nothing beyond readiness for the separately authorized publication.
created_at: 2026-08-17T18:30:00Z
---

# ADR 0129: Confirm The NKF 0.7 Release Candidate

## Context And Problem

The accepted NKF 0.7 authority makes the post-audit technical-confirmation
Decision mandatory and audit-bound, with no waiver: publication before it is
a protocol violation. This reconciles the ordering the 0.6 release could not
satisfy, where the Human Product Owner's recorded non-reusable exception let
0.6 publish first and record afterwards. The 0.7 candidate completed the
complete release order:
[ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
accepted the authority, the versioned set was built and reviewed member by
member per the recorded
[guidance review](../evidence/release/nkf-028-nkf-0-7-guidance-review.md),
the set proved itself over its fixtures and builds, the exact candidate
archive was adopted into an isolated copy of the exact candidate source
repository through the prepublication candidate-bound promotion with its
complete gate, and a fresh independent audit of the exact candidate returned
clean, recorded in the
[release audit](../evidence/release/nkf-028-nkf-0-7-release-audit.md).

## Decision

On `2026-08-17`, the Claude technical reviewer, acting under the Human
Product Owner's recorded delegation inside
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md),
technically confirms the exact NKF 0.7 release candidate:

| Binding | Value |
| --- | --- |
| Release commit | `e5b265e87da6c12b73b4749f8d24b41b996cc77a` |
| Archive SHA-256 | `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |
| Checker SHA-256 | `64751e77af081ae795e60ebd7f68132548e0c71b101ba78ac9e2e9d7fd1ce70a` |
| Adopter SHA-256 | `e565978a73f625bc43992291a43d253966ec67168312b2571deff1822c88a360` |
| Bound audit | [NKF-028 NKF 0.7 Release Audit](../evidence/release/nkf-028-nkf-0-7-release-audit.md) |

This confirmation is invalid without its bound audit. It confirms exactly
these bytes: any change to the release commit, archive, checker, or adopter
invalidates this Decision and requires a fresh candidate, exercise, audit,
and successor confirmation.

## Scope And Applicability

This Decision completes the pre-publication release order for NKF 0.7 and
establishes that the exact candidate is ready for the separately authorized
publication. It applies only to the exact bytes bound above.

## Rationale

Binding the confirmation to the independent audit makes the confirmation
worthless without the evidence, which is the accepted reconciliation of the
0.6 ordering defect: no candidate can again reach publication with its
verification unperformed or its confirmation unrecorded.

## Alternatives Considered

Confirming without the bound audit was rejected because the accepted
authority forbids it and no waiver exists. Publishing first and recording
afterwards was rejected as the exact ordering violation 0.7 was designed to
close. Waiting for the live promotion before confirming was rejected because
the live promotion is a post-publication act that this confirmation must
precede.

## Consequences And Trade-Offs

Publication, recommendation, the live producer promotion, and the merge to
the default branch remain separately authorized Human Product Owner acts
over exactly the confirmed bytes. The published archive must verify by
re-download and digest comparison against the bound values, and the
publication carries the prepared human-readable
[release notes](../evidence/release/nkf-0.7-release-notes.md).

## Non-Claims

This Decision does not:

- publish, recommend, release, adopt, promote the live producer, merge, or
  change visibility;
- accept knowledge, confirm a Realization, or establish Governing Use;
- rewrite, retract, or de-govern any earlier accepted Decision; or
- confirm anything beyond the exact bytes and audit bound above.
