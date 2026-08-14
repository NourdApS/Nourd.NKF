---
title: "ADR 0119: Accept The NKF 0.5 Revision 2 Authority Pair"
id: adr-0119
type: decision
summary: Accept the exact independently audited NKF 0.5 revision 2 authority pair through a conformant immutable Decision record.
created_at: 2026-08-13T12:56:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-026
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.5 technical derivation delegation
---

# ADR 0119: Accept The NKF 0.5 Revision 2 Authority Pair

## Context And Problem

[ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md) accepted the first exact
NKF 0.5 prepublication authority pair. Derived implementation then exposed an
internal conflict between its exact predecessor-byte preservation and the
universal retrospective Task-gate requirement already established by
[ADR 0077](0077-decision-applicability-gate.md).

The independently audited correction uses a distinct Specification identity
and exact paths, preserves the first pair as immutable historical provenance,
and permits only a named semantic reviewer to supply the explicitly
retrospective gate for predecessor Tasks missing one.

Two earlier attempted technical-acceptance records are retained byte-for-byte
as non-record historical Evidence. [ADR 0117](0117-accept-the-corrected-nkf-0-5-authority-pair.md)
failed its inherited deep-link rule. [ADR 0118](0118-accept-the-nkf-0-5-revision-2-authority-pair.md)
was created to correct that failure but retained plain same-bundle references
in its frontmatter and body, so it failed the same rule. Neither attempted
record supplies release authority. This is a distinct conformant Decision;
the prior bytes remain unchanged.

The restarted
[revision 2 authority-pair audit](../evidence/audits/nkf-026-nkf-0-5-revision-2-authority-pair-audit.md)
returned `CLEAN` against the exact final pair and unchanged policy.

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
accepted only with its exact Markdown-digest binding. The unchanged policy is
accepted only with its exact identity and executable binding. None may be
replaced independently.

For NKF 0.5 publication, this Decision supersedes only the prepublication
authority-set selection made by
[ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md). That Decision and its
exact accepted Markdown and executable bytes remain immutable historical
facts under their original identity and paths. They are not release authority.

## Scope And Applicability

This Decision accepts only the exact technical correction needed to implement
the already-confirmed [ADR 0077](0077-decision-applicability-gate.md) Task-gate
requirement inside the 23 Product boundaries adopted by
[ADR 0115](0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md).
It adds no Product boundary and authorizes only derived NKF 0.5 implementation
under the linked Task.

NKF 0.5 governs a repository only when that repository deliberately adopts
and declares version `0.5`. Earlier NKF versions remain immutable authority
for repositories declaring those versions.

## Rationale

A distinct successor Specification preserves accepted-record immutability
while correcting a prepublication defect. The retrospective transformation
preserves the universal Task-gate requirement without fabricating what an
earlier Task historically reviewed. It is reviewer-supplied, transactionally
stopped, byte-bound, and disclosed in the resulting Markdown.

The `accepted_bootstrap_lock` is necessary because the exact revision 2 source
is a truthful NKF 0.4 Draft while being reviewed. This Decision is its sole
accepted transition basis. The separate `prepublication_supersession_lock`
preserves the original exact [ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md)
pair as superseded history and resolves both exact Decisions. Neither
validation nor either lock proves acceptance.

## Alternatives Considered

Editing accepted snapshots was rejected because accepted records are
immutable. Allowing gate-free legacy Tasks was rejected because it weakens
[ADR 0077](0077-decision-applicability-gate.md). Inventing retrospective
applicability conclusions mechanically was rejected because tooling cannot
supply semantic review. Treating either failed acceptance attempt as a valid
Decision record was rejected because acceptance and conformance remain
separate facts and both must be reported truthfully.

## Consequences And Trade-Offs

All derived 0.5 artifacts bind the revision 2 paths and exact digests. The
producer retains the [ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md) pair
as immutable superseded provenance, while the 0.5 release set carries only the
revision 2 normative and executable authority. Any later authority-set byte
change before publication requires a fresh exact audit and successor
acceptance. Publication then freezes the complete released set permanently.

Migration from 0.1 through 0.4 remains breaking and repository-owner-approved.
When a predecessor Task lacks the gate, Adopt requires exact named
retrospective semantic-review input before mutation. Every other
compatibility, authority, graph, freshness, baseline, release, and adoption
boundary remains as accepted by
[ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md) and
[ADR 0115](0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md).

## Non-Claims

This Decision does not:

- change any Human-Product-Owner-confirmed Product boundary;
- invalidate or rewrite [ADR 0116](0116-accept-the-nkf-0-5-authority-pair.md)
  or its exact accepted historical pair;
- turn either failed acceptance attempt into an accepted Decision record;
- derive or confirm any Schema, checker, adopter, fixture, documentation,
  Realization, release-set, archive, recommendation, or adoption byte;
- prove semantic completeness or truth of a consumer graph or baseline;
- accept consumer Product or Technology meaning;
- publish, recommend, adopt, or establish readiness for NKF 0.5;
- confirm the current-system Realization;
- claim candidate-bound or public self-adoption has occurred; or
- establish remote enforcement, acceptance-binding verification, public
  distribution, or Governing Use readiness.
