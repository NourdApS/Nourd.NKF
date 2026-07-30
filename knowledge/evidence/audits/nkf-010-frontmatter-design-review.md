# NKF-010 Frontmatter Design Review

## Question And Boundary

This review evaluates the exact Active Design revision at
`knowledge/designs/active/governed-frontmatter.md` with SHA-256
`a319e26f2ddae8d41e20264e92f05f6b153ba33eeef45652bc6be1198246f392`.

It asks whether the proposed direction is internally coherent with accepted
NKF authority before adoption. It is Evidence. It does not adopt the Design,
accept normative meaning, confirm a Realization, or establish conformance.

## Verified Facts

1. The Design preserves the one NKF `0.1` version namespace and treats the
   change as a pre-stable successor serialization revision.
2. It keeps the CommonMark body responsible for substantive canonical human
   meaning while allocating bounded document-orientation metadata to the
   frontmatter envelope.
3. It requires deterministic equality for `title`, record identity, and
   declared governance rather than creating conflict precedence.
4. It keeps Task operational authority, Design disposition, record authority,
   Realization confirmation, semantic review, and conformance distinct.
5. It excludes Evidence through an explicit representation kind rather than
   inferring exemption from path.
6. It does not introduce `updated_at` or claim that a present summary proves
   semantic adequacy.
7. It defines exact Task identities so lifecycle-record Task references can be
   resolved without making Tasks NKF records.

## Findings Corrected Before This Review

1. An earlier draft proposed `specification_status: current` without a
   deterministic format-coordinate scope. The field was removed because
   record authority, governing Decisions, successor provenance, and bundle
   context already own Specification applicability.
2. An earlier draft proposed status-directory agreement when directories were
   named `active`, `deferred`, or `completed`. That inference was removed from
   NKF Core because repository topology is configurable and directory location
   must not become authority by convention.
3. Decision provenance examples initially used display identifiers such as
   `ADR-0058`. The Design now requires exact NKF record IDs such as
   `adr-0058` for deterministic resolution.
4. Task non-records initially lacked a separate identity field. `task_id` is
   now required and unique.

## Independent Consistency Assessment

The revised field allocation is coherent:

- common orientation applies to every non-Evidence Markdown representation;
- record orientation mirrors existing declaration fields exactly;
- Design disposition retains its independent vocabulary and provenance;
- Realization confirmation declares a separately reviewable axis;
- Task fields represent an external operational projection and traceability
  graph without giving NKF execution authority; and
- Evidence retains byte-preserving exemption.

The proposed closed native key vocabulary is consistent with NKF's fail-closed
extension model. A future field must be allocated by accepted Core, Root
Profile, or extension meaning rather than appearing silently.

## Residual Review Obligations

The Design is ready to proceed to exact normative drafting, but adoption must
remain contingent on:

1. exact Markdown and YAML contract wording using the same applicability
   matrix and vocabularies;
2. checker diagnostics that distinguish syntax, required-key, unsupported-key,
   mismatch, lifecycle, and reference-resolution failures;
3. fixture coverage for both records and non-records;
4. repository migration leaving every Evidence byte unchanged;
5. exact digest rebinding of all changed source and governed artifacts; and
6. a separate final audit of the realized system.

## Review Outcome

No unresolved conceptual contradiction blocks normative drafting. This review
supports adoption only after the exact Design disposition, normative
authority pair, and governing Decision are bound together.

## Exact Adoption Candidate Verification

The adopted candidate differs from the reviewed Active revision only through
the expected immutable accepted record-governance fields, Adopted disposition,
Decision provenance, and authority-boundary wording. Its exact SHA-256 is
`cae728944979f2341d431606da7b5362e2a25b254b3f8c318e5f6790a57c6312`.

The exact normative pair reviewed against the Design is:

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be` |
| `contracts/nkf/0.1/nkf.yaml` | `b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd` |

The Markdown and YAML allocate the same applicability classes, required
fields, Evidence exemption, lifecycle distinctions, reference namespaces, and
diagnostic outcomes. ADR 0058 binds these exact candidates. This verification
does not confirm their implementation.
