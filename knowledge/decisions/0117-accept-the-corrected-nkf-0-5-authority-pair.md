---
title: "ADR 0117: Accept The Corrected NKF 0.5 Authority Pair"
id: adr-0117
type: decision
summary: Accept the exact independently audited NKF 0.5 revision 2 authority pair and supersede the ADR 0116 pair only as the prepublication authority selected for NKF 0.5 release.
created_at: 2026-08-13T12:25:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-026
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.5 technical derivation delegation
---

# ADR 0117: Accept The Corrected NKF 0.5 Authority Pair

## Context And Problem

[ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md) accepted the first exact
NKF 0.5 prepublication authority pair and unchanged freshness policy. During
derived migration implementation, that pair proved internally inconsistent:
it required exact preservation of every predecessor Markdown byte while
[ADR 0077](0077-decision-applicability-gate.md) requires every Task, including
retrospective history, to carry a truthful Decision Applicability Gate.

An attempted exception for a preserved gate-free Task was rejected because it
would weaken Human Product Owner meaning. The technical correction instead
keeps the universal requirement and introduces one semantic-review-controlled,
explicitly retrospective source normalization for exactly those predecessor
Tasks missing the gate. The original ADR 0116 pair is already accepted and
immutable, so its bytes, identities, and paths cannot be rewritten.

The restarted
[revision 2 authority-pair audit](../evidence/audits/nkf-026-nkf-0-5-revision-2-authority-pair-audit.md)
returned `CLEAN` only after the successor identity, immutable predecessor
provenance, exact source transformation, graph and evaluation closure,
release authority, and both self-adoption stages were coherent.

## Decision

On `2026-08-13`, the Codex technical reviewer, acting only under the explicit
technical derivation delegation recorded by
[NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md),
accepts these exact bytes together as the corrected canonical NKF 0.5
prepublication authority set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.5 Specification revision 2](../specifications/nkf-0.5-revision-2.md) | `knowledge/specifications/nkf-0.5-revision-2.md` | `0f3b7c085eba4fa92655e20916fccb7013169b5560dd50c241fb4726df31287c` |
| [NKF 0.5 executable companion revision 2](../../contracts/nkf/0.5/revision-2/nkf.yaml) | `contracts/nkf/0.5/revision-2/nkf.yaml` | `2743102a4bddf9a26253fba3982f00bf9c688c819891815221e3ea4ee67c5290` |
| [NKF 0.5 freshness policy](../../contracts/nkf/0.5/freshness-policy.yaml) | `contracts/nkf/0.5/freshness-policy.yaml` | `5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd` |

The Markdown is normative human authority. The executable companion is
accepted only with its exact Markdown-digest binding. The unchanged freshness
policy remains accepted only with its exact identity and executable binding.
None may be replaced independently.

For NKF 0.5 publication, this Decision supersedes only the prepublication
authority-set selection made by ADR 0116. ADR 0116 and its exact accepted
Markdown and executable bytes remain immutable historical facts under their
original identity and paths. They are not release authority and cannot be
silently republished, edited, or reused as a general migration exception.

## Scope And Applicability

This Decision accepts the exact technical correction needed to implement the
already-confirmed ADR 0077 Task-gate requirement within the 23 Product
boundaries adopted by
[ADR 0115](0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md).
It adds no Product boundary and authorizes only derived NKF 0.5 implementation
under the linked Task.

NKF 0.5 governs a repository only when that repository deliberately adopts
and declares version `0.5`. NKF 0.1 through NKF 0.4 remain immutable authority
for repositories declaring those versions.

## Rationale

One distinct successor record is the only way to preserve accepted-record
immutability while correcting a prepublication authority defect. The narrow
retrospective transformation preserves the Human Product Owner's universal
Task-gate requirement without fabricating what an earlier Task historically
reviewed. It is reviewer-supplied, transactionally stopped, byte-bound, and
disclosed in the resulting Markdown.

The `accepted_bootstrap_lock` remains necessary because the exact revision 2
Specification source is a truthful NKF 0.4 Draft while being reviewed. This
Decision is its sole accepted transition basis. The separate
`prepublication_supersession_lock` preserves the original exact ADR 0116 pair
as superseded history and is valid only when it resolves both exact Decisions.
Neither validation nor either lock proves acceptance.

## Alternatives Considered

Editing the ADR 0116 pair was rejected because accepted records are immutable.
Allowing gate-free legacy Tasks was rejected because it weakens ADR 0077.
Inventing a retrospective applicability conclusion deterministically was
rejected because technical tooling cannot supply semantic review. Publishing
both pairs as competing current authority was rejected because NKF has one
canonical authority set per version.

## Consequences And Trade-Offs

All derived 0.5 artifacts must bind the revision 2 paths and exact digests.
The producer retains the ADR 0116 pair as immutable superseded provenance but
the 0.5 release set carries only the revision 2 normative and executable
authority. Any later authority-set byte change before publication requires
another fresh exact audit and governed successor acceptance. Publication then
freezes the complete released set permanently.

Migration from 0.1 through 0.4 remains breaking and repository-owner-approved.
If any predecessor Task lacks the gate, Adopt requires the exact named
retrospective semantic-review input before mutation. Every other compatibility,
authority, graph, freshness, baseline, release, and adoption boundary remains
as accepted by ADR 0116 and ADR 0115.

## Non-Claims

This Decision does not:

- change any of the 23 Human-Product-Owner-confirmed Product boundaries;
- invalidate or rewrite ADR 0116 or its exact accepted historical pair;
- derive or confirm any Schema, checker, adopter, fixture, documentation,
  Realization, release-set, archive, recommendation, or producer-adoption byte;
- prove the semantic completeness or truth of a consumer graph or baseline;
- accept consumer Product or Technology meaning;
- publish, recommend, adopt, or establish readiness for NKF 0.5;
- confirm the current-system Realization;
- claim either candidate-bound or public self-adoption has occurred; or
- establish remote enforcement, acceptance-binding verification, public
  distribution, or Governing Use readiness.
