---
id: adr-0053
type: decision
summary: NKF established an independent authority, one NKF 0.1 version namespace, a Common Specification with Product and Technology Profiles, executable contracts, schemas, checker tooling, release packaging, and an initial Technology self-hosting realization through NKF-003.
created_at: 2026-07-30T16:47:43Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
---

# ADR 0053: Repository Knowledge Architecture

- **Status:** Accepted
- **Task:** `NKF-007`
- **Decision Authority:** Human Product Owner direction with independent Codex
  technical review
- **Architecture Design SHA-256:** `e732de725ecf309db3d1194e53a8f846c8262377b1886914e00a306e1f27926f`
- **Migration Map SHA-256:** `d49c6270212674c14e0bfd64610a0bbe2de0783b44242a59558eb31460a4b7ce`
- **Review Evidence SHA-256:** `0d0d0f2cb2e9031747bb348197418874b608f052a79472fd36890a3ba4ec95c9`

## Context And Problem

NKF established an independent authority, one NKF 0.1 version namespace, a
Common Specification with Product and Technology Profiles, executable
contracts, schemas, checker tooling, release packaging, and an initial
Technology self-hosting realization through NKF-003.

The resulting knowledge structure remained history-first and difficult to
navigate. Its current state was reconstructed through 52 sequential
Decisions, 29 inconsistently classified Design documents, 31 historical
proposal artifacts, one incomplete Realization, and a long accumulated Task.
Only one of 94 non-Evidence Markdown documents contained front matter.

The Human Product Owner clarified that the missing Current System Model is not
a new layer or authority. It belongs inside Realization knowledge as the
consolidated current implementation view.

Independent review also proved that standard YAML front matter is interpreted
as CommonMark content by the current checker and can become a false Setext
heading. Repository-wide front matter therefore requires an explicit source
envelope and Markdown body boundary.

## Decision

NKF accepts the exact repository-architecture Design at
`knowledge/designs/adopted/knowledge-architecture.md` with SHA-256
`e732de725ecf309db3d1194e53a8f846c8262377b1886914e00a306e1f27926f`.

NKF accepts the exact migration map at
`knowledge/evidence/decision-inputs/adr-0053/nkf-007-knowledge-migration-map.yaml` with SHA-256
`d49c6270212674c14e0bfd64610a0bbe2de0783b44242a59558eb31460a4b7ce`.

The governing lifecycle is:

```text
Task → Design → Decision → Specification → Realization → Validation
```

The Current System Model is the consolidated entry view inside Realization
knowledge. Specifications remain authoritative for current normative meaning.
Validation remains an evaluation of a particular snapshot. Neither
Realizations nor validation results own live operational state.

The repository adopts:

- Task directories for Active, Deferred, and Completed work;
- Design directories for Active, Adopted, Rejected, Superseded, and Withdrawn
  proposal dispositions;
- chronological Decision IDs with concise durable-subject filenames;
- one current canonical Specification location;
- one consolidated current-system Realization with supporting current
  Realizations;
- organized Evidence areas while preserving immutable source snapshots;
- evidence-backed UTC `created_at` front matter for every non-Evidence
  Markdown file;
- explicit Design-disposition front matter and provenance;
- explicit transfer of unfinished NKF-003 work;
- non-inferential `.nourd` declarations; and
- current-system-first navigation for humans and agents.

The source model distinguishes complete source bytes, a bounded YAML
front-matter envelope, and the CommonMark body. Complete bytes remain covered
by source digests and secret scanning. H1, heading, Title Case, and section
processing operate on the CommonMark body after the envelope.

## Scope And Applicability

This Decision governs the NKF repository's knowledge organization and the
minimum native NKF 0.1 source-envelope meaning required for honest
self-validation.

It authorizes the exact mapped file moves and renames, evidence-backed
front-matter addition, unsupported date-only structured-metadata removal,
active-link repair, Design classification, NKF-003 closure transfer,
Realization creation, and explicit declaration rebuild.

It governs successor serialization revisions of earlier accepted Decision
and record sources. Stable record IDs remain unchanged. Original revisions
remain recoverable through Git history and existing Evidence.

This Decision does not make `created_at`, `design_disposition`, or
disposition-provenance keys mandatory portable NKF Core fields for external
consumers. Their repository use is accepted here. Broader portable metadata
semantics and enforcement require separate evidence and authority.

## Rationale

Lifecycle-first organization distinguishes proposals, accepted reasoning,
normative meaning, implementation, and snapshot evaluation without requiring
readers to reconstruct the system from history.

Disposition folders make Design navigation useful while explicit front matter
remains canonical and prevents directory inference.

Chronological Decisions remain flat because their stable IDs already provide
order and many Decisions cross topical boundaries. Concise subject filenames
and a thematic index improve navigation without imposing a fragile topic
taxonomy.

Git-introduction timestamps provide exact non-fabricated `created_at`
evidence. They describe first evidenced repository appearance, not proposal,
acceptance, or implementation time.

The explicit source-envelope boundary is necessary because treating YAML front
matter as ordinary CommonMark would make metadata appear to be semantic
headings.

## Alternatives Considered

Keeping every lifecycle directory flat was rejected because it perpetuates
mixed active and historical material.

Organizing every file by topic was rejected because NKF work crosses format,
authority, validation, implementation, and release concerns.

Adding a separate Current System Model layer was rejected because it would
compete with Specifications and Realizations.

Using `resolved` as a Design disposition was rejected because it hides whether
a proposal was Adopted, Rejected, Superseded, or Withdrawn.

Using `accepted` as the adopted Design outcome was rejected because it
conflicts with the native record authority state.

Converting unknown historical event dates to midnight UTC or Git timestamps
was rejected because it fabricates semantic precision.

Using the existing declaration generator was rejected because audit evidence
proved it inferred acceptance and produced incorrect semantic bindings.

## Consequences And Trade-Offs

Most active knowledge paths and source digests will change. Links, release
confirmation paths, tests, declarations, artifact bindings, and indexes must
be updated together.

Accepted immutable sources gain governed successor serialization revisions.
This is a material migration even where prose meaning is unchanged.

Historical Specification revisions and executable Decision inputs move to
Evidence and cease appearing as active Designs. Their bytes and Decision
provenance remain preserved.

Front-matter source-envelope support requires a canonical Markdown/YAML
authority update, checker parsing change, diagnostics, and focused fixtures
before self-validation can pass.

Current-system navigation becomes shorter, but the consolidated Realization
must be maintained whenever architecture, components, interfaces, artifact
mappings, implementation status, confirmation status, or relevant Decision
provenance changes.

## Migration And Recovery

The migration follows the accepted YAML map exactly. A resulting migration
manifest records old path, new path, stable record ID where applicable,
predecessor digest, successor digest, and change classification.

Evidence source snapshots are not rewritten. Other historical Evidence and
Decision inputs move byte-for-byte where mapped. Unsupported historical
relative links inside preserved Evidence remain documented provenance
limitations rather than being silently rewritten.

No destructive Git reset, external repository mutation, push, tag, release,
deployment, or consumer migration is authorized.

Recovery uses checkpoint
`38cb734e143580d360b8ff78b316fb58451ef071`, the accepted path map, the
migration manifest, and ordinary Git history.

## Deferred Work

NKF-008 owns future publication, external-consumer pinning, onboarding,
migration, and handover.

NKF-009 owns governed-artifact secret-scan scope and enforcement expansion.

NKF-004, NKF-005, and NKF-006 retain their existing deferred presentation,
freshness, and additional-root investigations.

## Non-Claims

This Decision does not claim that:

- any mapped file has moved;
- NKF-003 is already closed;
- the canonical front-matter authority pair exists;
- schemas or checker behavior have been updated;
- current-system Realizations have been created;
- `.nourd` declarations are semantically reviewed or current;
- the repository conforms to the accepted target; or
- anything has been published, deployed, or migrated externally.

