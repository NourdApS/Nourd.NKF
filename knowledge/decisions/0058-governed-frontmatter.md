---
id: adr-0058
type: decision
summary: ADR 0054 established a safe optional YAML source envelope but deliberately assigned no portable NKF meaning to arbitrary frontmatter keys. The resulting NKF repository exposes only creation provenance in most current documents, while basic identity, declared authority state, lifecycle orientation, and purpose remain distributed across H1 headings, body metadata, .nourd declarations, paths, and repository conventions.
created_at: 2026-07-30T19:58:36Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
decision_authority: Codex technical reviewer under the Human Product
---

# ADR 0058: Governed Frontmatter

  Owner's explicit acceptance of the frontmatter boundary and authorization to
  complete its coherent NKF 0.1 adoption
- **Review Evidence:** `knowledge/evidence/audits/nkf-010-frontmatter-design-review.md`

## Context And Problem

ADR 0054 established a safe optional YAML source envelope but deliberately
assigned no portable NKF meaning to arbitrary frontmatter keys. The resulting
NKF repository exposes only creation provenance in most current documents,
while basic identity, declared authority state, lifecycle orientation, and
purpose remain distributed across H1 headings, body metadata, `.nourd`
declarations, paths, and repository conventions.

The Human Product Owner accepted a successor boundary: frontmatter must provide
immediately useful document identity, summary, creation provenance, and
applicable lifecycle state, and NKF must validate deterministic agreement with
the CommonMark body and `.nourd`.

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/governed-frontmatter.md` | `cae728944979f2341d431606da7b5362e2a25b254b3f8c318e5f6790a57c6312` |

NKF accepts the exact successor NKF 0.1 authority pair:

| Authority Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be` |
| `contracts/nkf/0.1/nkf.yaml` | `b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd` |

Every represented non-Evidence Markdown document now requires governed common
orientation. Record sources expose and exactly mirror their native identity
and declared governance. Design disposition, Realization confirmation, Task
identity and state, and their applicable provenance remain distinct
class-specific concepts.

Evidence exemption is explicit through record `type: evidence` or non-record
`kind: evidence`; path naming does not create the exemption.

## Scope And Applicability

The Decision applies to native NKF 0.1 Markdown represented by a bundle,
including record sources and Markdown non-records.

It governs:

- common `title`, `summary`, and `created_at`;
- record `id`, `type`, `record_lifecycle`, and `record_status`;
- Task provenance for Design, Decision, Specification, and Realization
  revisions;
- Design disposition and its applicable provenance;
- Realization confirmation status and its applicable provenance;
- Task non-record identity and declared status;
- Evidence classification and exemption;
- closed key applicability;
- exact source-to-declaration equality;
- governed reference resolution; and
- deterministic diagnostics.

## Rationale

Human-readable Markdown should orient a reader without first requiring an
executable declaration lookup. Exact duplicated identity and governance fields
are safe because the checker can prove equality and fail on conflict.

Separate lifecycle vocabularies prevent record authority, proposal outcome,
implementation confirmation, and Task state from collapsing into one
misleading generic status.

Explicit Task and Evidence non-record kinds make traceability and exemption
machine-verifiable without turning Tasks into semantic NKF records or
inferring authority from directory layout.

## Alternatives Considered

Keeping only `created_at` was rejected because it does not orient readers.

Keeping all orientation only in `.nourd` was rejected because it weakens the
default Markdown reading experience.

Copying every record declaration and relationship into frontmatter was
rejected because it would create a competing serialization surface.

Using one generic status was rejected because the underlying concepts are
independent.

Adding `updated_at` was rejected because repository history already records
changes and a modification timestamp does not prove semantic review.

Inferring Evidence or Task state from paths was rejected because project
knowledge topology is configurable and paths cannot become authority by
convention.

## Consequences And Trade-Offs

Existing non-Evidence sources containing only `created_at` no longer conform
to current native NKF 0.1. This repository and later consumers require a
deliberate migration of source, declarations, checker, fixtures, validation,
and applicable authority bindings.

The migration changes immutable source bytes and therefore creates governed
successor revisions. Predecessor exact revisions remain available through
Decisions, Evidence, and Git history.

The checker can validate a summary's presence and shape but cannot prove its
semantic adequacy. Human or agent review remains responsible for that
judgment.

## Compatibility

This is one pre-stable successor serialization revision within NKF `0.1`. It
does not create a frontmatter sub-version, another record contract, or a
parallel supported legacy envelope.

ADR 0054 remains immutable provenance for the safe parser boundary. This
Decision supersedes only its rule that arbitrary frontmatter keys have no
portable NKF Core meaning.

Consumers migrate deliberately to the current NKF 0.1 authority pair. A
checker bound to the predecessor pair cannot claim current conformance.

## Realization Requirements

Realization requires:

1. checker enforcement for records and Markdown non-records;
2. exact diagnostics and reference resolution;
3. Schema source-binding updates;
4. valid and invalid fixture coverage;
5. migration of every eligible NKF repository document;
6. unchanged Evidence bytes;
7. declaration and governed-artifact digest synchronization;
8. updated current-system Realizations;
9. full deterministic validation; and
10. a separate final audit before Realization confirmation.

## Non-Claims

This Decision does not confirm checker or repository Realization, claim that
the current repository already conforms, verify the semantic quality of every
summary, prove Task operational state, publish a release, migrate an external
consumer, or make validation supply acceptance or confirmation.
