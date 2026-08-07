---
id: adr-0067
type: decision
summary: Adopt the exact NKF-013 inspect-plan-apply direction for deterministic, AI-neutral onboarding of empty and small-document Product and Technology repositories while preserving a stable expansion boundary for NKF-014.
created_at: 2026-07-31T10:47:13Z
record_lifecycle: immutable
record_status: accepted
task: NKF-013
---

# ADR 0067: Initial Greenfield Onboarding

## Context And Problem

The current public adopter installs pinned release and enforcement integration
only after a consumer has manually constructed a valid native NKF bundle. Its
tests begin from already-conformant fixtures. The documented adoption path is
therefore incomplete for an empty or early greenfield repository.

The Human Product Owner narrowed the first correction to empty and small,
reviewable Product and Technology knowledge and deferred large brownfield,
source reconstruction, and advanced recovery to `NKF-014`. The same authority
then delegated completion, independent verification, Realization confirmation,
commit, and push of `NKF-013` to the technical reviewer.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | Accepted SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/initial-greenfield-onboarding.md` | `339a8e3ff98557fd7bd59c3577d7f76e170657612ff9d49c3b806904820d1d75` |

The adopted direction establishes:

1. one AI-neutral `inspect → resolved plan workspace → onboard` experience;
2. a deterministic initial boundary of twenty Markdown files, 256 KiB total,
   64 KiB per file, plus qualitative rejection of mature lifecycle migration;
3. project-authority selection of Product or Technology without a selectable
   Common profile;
4. honest profile-specific Draft scaffolds, including a required Technology
   Specification and unconfirmed current-system Realization;
5. generated native YAML and source digests from a fully resolved semantic
   plan rather than manual native assembly;
6. complete staged validation and rollback-capable project application;
7. structured status that separates Draft meaning, confirmation, conformance,
   Governing Use, and Git or remote state;
8. content-addressed idempotence for the same successful plan; and
9. a stable plan/apply boundary that later `NKF-014` analyzers, reconstruction,
   resumability, and recovery may extend without weakening authority.

The existing verified installer remains a shared internal integration phase.
The native NKF 0.1 release archive remains unchanged while its normative
Markdown, executable companion, Schemas, and checker bytes remain unchanged.
The separately digest-bound adopter and public projection receive the new
onboarding behavior.

## Scope And Applicability

This Decision governs derived NKF onboarding tooling, transaction behavior,
pre-adoption guidance, fixtures, tests, public documentation, and current
Realization knowledge for the initial Product and Technology path.

It does not revise the NKF 0.1 Specification, executable companion, JSON
Schemas, Root Profiles, native archive membership, acceptance model,
confirmation model, or conformance meaning.

A numerically small repository is still out of scope when its existing
Markdown declares accepted Decisions, adopted Designs, Specifications,
Realization confirmation, or other mature lifecycle history that requires
provenance reconciliation. The restored Agent SDK snapshot meets that
qualitative deferral condition and remains untouched for future deliberate
work.

## Rationale

The plan workspace separates deterministic mechanics from semantic judgment.
It gives humans and different AI systems one neutral review surface while
keeping the executable provider-independent and fail-closed.

Binding original and candidate digests permits exact byte preservation,
deliberate candidate changes, stale-plan rejection, deterministic native
generation, and whole-project staging. The same boundary can accept richer
future candidate producers without changing the final authority or transaction
rules.

Numeric limits make initial support testable; qualitative limits prevent a
small but historically mature corpus from being treated as greenfield. A
separate adopter digest avoids manufacturing a new native release when no
native release byte changed.

## Alternatives Considered

Fully automatic model interpretation was rejected because it would make
provider-dependent proposals appear deterministic or authoritative.

Scaffolding directly into the project before resolving existing documentation
was rejected because ambiguity or a checker failure could leave partial state.

Requiring native YAML was rejected because it preserves the onboarding gap.

Moving all existing Markdown to Evidence was rejected because it would be an
unreviewed semantic classification.

Expanding immediately into source-derived reconstruction was rejected because
it would collapse the narrow initial release into deferred `NKF-014`.

## Consequences And Trade-Offs

Initial onboarding becomes complete but deliberately has two user-visible
phases for documented repositories: create a workspace, then apply its resolved
plan. Empty repositories use the same path with no semantic classifications to
resolve.

Participating agents gain a portable protocol and skill, but no instruction can
prove that a model obeyed it. The deterministic plan validator and checker
remain the universal output gate.

Mature small repositories receive an explicit `NKF-014` diagnostic instead of
unsafe partial migration. Advanced interruption recovery remains deferred, so
the initial transaction must minimize durable-write exposure and restore all
handled failures.

## Compatibility

Existing adopted consumers continue using `install`, `update`, `check`,
`status`, and `integration-check`. Their pins do not move automatically.

The onboarding plan uses `nkf_version: "0.1"`; it does not establish a parallel
format or record-contract version. Later operational plan additions require a
governed compatibility decision and must not silently reinterpret stored
plans.

## Realization Requirements

Realization requires the exact behavior, safety matrix, guidance, public
documentation, deterministic build, complete staged checker use, local tests,
and full-bundle validation named by the Design. It also requires a separate
adversarial completion audit, an explicit `NKF-014` extension assessment, and a
later Decision confirming exact successor Realization revisions.

## Non-Claims

This Decision does not:

- implement or confirm onboarding;
- accept or conform a consumer project;
- authorize inferred Product or Technology meaning;
- activate `NKF-014`;
- migrate Agent SDK;
- publish an adopter, public projection, Git commit, or release;
- establish protected branch enforcement; or
- complete `NKF-013`.
