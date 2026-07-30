# ADR 0014: Accept NKF 0.1 Section-Role Vocabularies

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 29 July 2026
- **Accepted:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

The accepted NKF 0.1 record model requires each semantic section to have one
body-contract-controlled role, but the accepted authority pair does not
provide complete role meanings or allowed subsets for all ten core Product
body contracts.

The later NKF-002 checker contains proposed role names and subsets. Checker
data is implementation evidence, not semantic authority, and supplied no
authoritative meanings for those names.

## Decision

The exact proposal at
[`../designs/nkf-0.1-section-role-vocabularies.md`](../designs/nkf-0.1-section-role-vocabularies.md),
with SHA-256
`322e5d1d03f5fb02e348d5319586541a651718e9e978626bab8f782418d9b660`,
is accepted for native NKF 0.1.

The accepted boundary includes:

- the 38 shared role names and exact classification meanings;
- the allowed role subset for each of the ten unversioned core body
  identities;
- one role per declared semantic section;
- one shared meaning for a repeated role name across body contracts;
- strict separation of role classification from section authority,
  responsibility coverage, semantic adequacy, truth, safety, acceptance, and
  conformance;
- fail-closed handling of unknown and body-unsupported roles;
- the requirement that role `unresolved` has section authority `unresolved`;
- the distinction between role `evidence` and authority class `evidence`; and
- the restriction that last-resort role `content` cannot declare
  responsibilities.

Human review remains necessary to determine whether a declared role accurately
classifies the source meaning.

## Compatibility

The role vocabulary belongs to the sole NKF 0.1 version namespace. Imported
`/v1` body identities remain evidence only and are not supported current
identities.

A profile-defined namespaced body contract requires its own separately
accepted role vocabulary. The core list does not authorize profile roles by
analogy.

Changing a role meaning, removing a role, changing an allowed subset, or
weakening a guardrail is an NKF format change governed by ADR 0006.

## Not Decided

This Decision does not accept replacement Markdown or YAML bytes, entity or
binding vocabularies, extensions, acceptance proof, path resolution, schemas,
checker behavior, fixtures, distribution, a release, conformance, or consumer
migration.
