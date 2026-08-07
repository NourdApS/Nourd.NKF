---
id: adr-0054
type: decision
title: "ADR 0054: Front-Matter Authority Pair"
summary: ADR 0053 adopted the NKF-007 repository knowledge-architecture direction and authorized the minimum native source-envelope meaning required for honest front-matter use. Its exact Design input remains immutable Decision provenance.
created_at: 2026-07-30T17:12:13Z
record_lifecycle: immutable
record_status: accepted
task: NKF-007
decision_authority: Codex technical reviewer under the Human Product Owner's explicit authorization for NKF-007 supporting changes
---

# ADR 0054: Front-Matter Authority Pair

- **Review Evidence SHA-256:** `db4651f51c69369cddd831c73b4f6f189328af0e32544a0e3d6d59f8d4f22d03`

## Context

[ADR 0053](0053-repository-knowledge-architecture.md) adopted the [NKF-007](../tasks/completed/NKF-007-knowledge-structure-and-confirmation.md) repository knowledge-architecture direction and
authorized the minimum native source-envelope meaning required for honest
front-matter use. Its exact Design input remains immutable Decision
provenance.

The adopted Design was then placed under `designs/adopted/` while its metadata
still said Active and some wording used acceptance and adoption
interchangeably. The current checker also interpreted standard front matter
as CommonMark, where it could become a false Setext heading.

## Decision

NKF distinguishes the concepts precisely:

- a Design is governed proposal knowledge containing alternatives and
  trade-offs;
- acceptance governs an exact Design record revision;
- Adopted is the Design disposition established when a Decision adopts the
  direction proposed by that Design; and
- the resulting Decision and Specification, not the Design, own current
  authority.

Where [ADR 0053](0053-repository-knowledge-architecture.md) says it accepts the exact repository-architecture Design, that
acceptance governs the exact record revision with SHA-256
`e732de725ecf309db3d1194e53a8f846c8262377b1886914e00a306e1f27926f`.
[ADR 0053](0053-repository-knowledge-architecture.md) adopts the direction proposed by that Design. This Decision accepts
the terminology-corrected successor Design record revision:

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/knowledge-architecture.md` | `0c4b14c62a93c34e1aa9df56d12773d55f2747204ffb00f7d1ac420f6f524f71` |

NKF accepts the exact front-matter-enabled NKF 0.1 authority pair:

| Authority Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `054f621bb0598b50ae43c6fd444e5d9e9ced4d897c207d6edd289c766d1792e5` |
| `contracts/nkf/0.1/nkf.yaml` | `7ef12360c88c452ccfc80276a3d5e641536dda5dcb9ec0c4ad244af38235e2dd` |

The complete Markdown source bytes remain the source-binding, snapshot, and
applicable security-scan input. A bounded safe-YAML front-matter envelope is
parsed separately. Only the following CommonMark body supplies canonical
human meaning, headings, sections, responsibilities, and Title Case inputs.
NKF Core assigns no portable meaning to arbitrary front-matter keys.

## Compatibility

This is a successor serialization revision within pre-stable NKF 0.1. It does
not introduce another NKF version coordinate or a sub-versioned record
contract.

Sources without an opening exact `---` line remain CommonMark-only sources.
Sources using a valid envelope gain no semantic meaning by implication.
Malformed, unsafe, non-mapping, empty, multi-document, or unclosed envelopes
fail with `markdown.frontmatter.invalid`.

## Derived Realization State

The bundle, record, and validation-result Schema candidates are rebound to the
accepted pair without changing their assertion graphs:

| Derived Candidate | SHA-256 |
| --- | --- |
| Bundle Schema | `f6c925c38cba737a8df4cd284ac102824c8257f79811098ecc080dd47855d7f1` |
| Record Schema | `c343660721ea8d8deae9ed91f4b82843b99c3da62f4fe35f7c29446e3ef64243` |
| Validation Result Schema | `8920b810946a965b03e075701e4d8f721af381c371925e39734140b75735e92b` |

These digests record reviewed candidates. Their schema binding, checker
implementation, fixtures, complete repository migration, current-system
Realizations, and self-hosting result remain to be confirmed together.

## Non-Claims

This Decision does not:

- confirm the checker or schema Realization;
- establish portable semantics for `created_at`, `design_disposition`, or
  other repository keys;
- claim that the repository currently conforms;
- publish or deploy a checker or release;
- migrate an external consumer; or
- make validation supply acceptance or Realization confirmation.
