# ADR 0051: Govern Self-Hosting Heading Migration

- **Status:** Accepted
- **Task:** `NKF-003`
- **Accepted:** 30 July 2026
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's explicit dynamic-root feature delegation
- **Scope:** Mechanical NKF self-hosting migration only

## Context

NKF requires every participating H1, H2, and H3 in a governed Markdown record
to use Unicode 17 Title Case except exact protected canonical terms. Earlier
NKF Decisions, Designs, and Evidence were created before that rule became
enforceable against this repository itself. Some exact accepted Decision
snapshots therefore contain headings that do not conform.

Silently editing accepted Decisions would violate their immutable-snapshot
rule. Treating the files as non-records would falsely remove governing
technical knowledge from the NKF bundle. Adding arbitrary canonical phrases
merely to bypass Title Case would misuse the canonical-term mechanism.

The committed predecessors remain exact historical provenance in Git. A
controlled later revision is required for the current self-hosted
serialization.

## Decision

Authorize one explicit mechanical migration of participating H1, H2, and H3
heading text in current NKF record sources so those headings conform to the
accepted Title Case algorithm and project canonical-term set.

The migration:

- applies only to record sources selected by the NKF self-hosting bundle;
- changes heading case only;
- does not alter body prose, code fences, source snapshots, identifiers,
  status, authority, rationale, consequences, or accepted semantic meaning;
- preserves the committed predecessor bytes as immutable historical
  provenance;
- produces new exact source digests and regenerated declarations;
- is accepted only as the current serialization revision needed for
  Technology-profile self-hosting; and
- must pass source-digest, complete-heading, body-contract, and full-bundle
  validation before its realization is confirmed.

Byte-preserved imported Nourd Studio snapshots remain untouched and are
represented as explicit non-record provenance.

## Compatibility

This is a source-digest change for affected records. A consumer pinned to an
earlier exact record revision must not treat the new digest as identical.
Stable record identity and semantic meaning remain continuous; Git and this
Decision provide the explicit revision provenance.

No general exception to immutable Decisions or Title Case is created.

## Consequences

NKF can govern its existing Decisions, Designs, Evidence, Specification,
Technology root, and Realization as native records without weakening the
current Markdown rule or hiding legacy knowledge.

Declaration generation must remain reproducible from the exact current
Markdown sources. Validation cannot establish that the heading-only revision
preserved meaning; that conclusion is the bounded human technical review
accepted here.

## Non-Claims

This Decision does not:

- accept a prose or semantic change in an earlier record;
- change imported source snapshots;
- create a general migration permission;
- waive exact source binding or acceptance provenance;
- verify external acceptance bindings; or
- confirm checker, schema, bundle, or release realization by itself.
