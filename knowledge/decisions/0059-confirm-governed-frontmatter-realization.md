---
id: adr-0059
type: decision
summary: Confirm the exact audited NKF-010 Realization revisions that implement the accepted NKF 0.1 governed-frontmatter boundary across contracts, checker behavior, fixtures, knowledge, declarations, and self-hosting.
created_at: 2026-07-30T20:29:37Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
---

# ADR 0059: Confirm Governed Frontmatter Realization

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit authorization to approve and confirm the coherent
  frontmatter adoption
- **Candidate Audit:**
  `knowledge/evidence/audits/nkf-010-frontmatter-realization-candidate-audit.md`

## Context And Problem

ADR 0058 accepted the exact governed-frontmatter Design and NKF 0.1 authority
pair. It explicitly withheld any claim that checker code, Schemas, fixtures,
repository migration, or passing validation had been realized or confirmed.

NKF-010 subsequently produced an exact implementation candidate and migrated
the NKF repository. A separate audit corrected material gaps and found no
remaining implementation defect. The five current Realization candidates
deliberately reference this Decision, so their confirmation requires a
separate authority act rather than implication from their fields or test
results.

## Decision

The authorized technical reviewer confirms the exact Realization revisions
listed below as the current implementation account for the accepted ADR 0058
boundary:

| Record | Source | Confirmed SHA-256 |
| --- | --- | --- |
| `nkf-0.1-native-realization` | `knowledge/realizations/current-system.md` | `b92ecd0ce26dd2ab043841cfb5bc1698363af15302cf71ecc5f3219358eb9175` |
| `nkf-checker-and-validation` | `knowledge/realizations/current/checker-and-validation.md` | `b23ef0940fddd52b906c3a1a1f49cf43cfd5396a996c90789375227b68bf5596` |
| `nkf-contracts-and-schemas` | `knowledge/realizations/current/contracts-and-schemas.md` | `966ccd6013e46d22ead1a1162c9e116169a8dd1bddd8b68f7ad7b8527ce21591` |
| `nkf-release-package` | `knowledge/realizations/current/release-package.md` | `f6d827e07c8f0c397dd5664fab0f93d3a0d892d2515f4fbe56856b2c00d55015` |
| `nkf-self-hosting` | `knowledge/realizations/current/self-hosting.md` | `c179c4592961c194284d4eb779db825ead626206ce5a842d84b7950783aa5251` |

This confirmation includes the exact contract, Schema, checker, fixture,
declaration, governed-artifact, deterministic-build, and self-host mappings
described by those Realizations.

## Scope And Applicability

Confirmation applies only to the independent NKF repository and exact
revisions bound by this Decision. It covers native NKF 0.1 governed
frontmatter, explicit Task and Evidence non-record kinds, checker enforcement,
fixture coverage, the repository knowledge migration, and the consolidated
current-system view.

The release-package Realization is confirmed in its explicitly documented
state: release publication remains stale and deferred rather than silently
becoming current.

## Rationale

The candidate audit checked the semantic allocation, authority bindings,
derived artifacts, migration preservation, frontmatter coverage, reference
graph, diagnostic behavior, and current-system account independently from the
implementation pass. Its exact SHA-256 is
`2416de4b23269899ca234951bc20851c725532e8ff3f3951117a1af85aa06c73`.

The observed staged self-host failure contained exactly five unresolved
references to this not-yet-present Decision. That failure demonstrated that
the checker did not treat a claimed confirmation identifier as
self-validating.

## Alternatives Considered

Treating passing tests or validation as confirmation was rejected because
mechanical evidence cannot exercise human-delegated authority.

Leaving all five Realizations unconfirmed was rejected because the separate
audit found the implementation complete enough to represent the current
system accurately.

Confirming only checker code was rejected because the realized boundary is a
coherent set of authority bindings, Schemas, fixtures, migrated knowledge,
declarations, and self-host behavior.

## Consequences And Trade-Offs

The five exact Realization revisions may now truthfully expose
`confirmation_status: confirmed` and resolve `adr-0059` as their confirmation
provenance.

Adding this Decision creates the eighty-eighth explicit record in the
self-host bundle and requires its own declaration, source digest, section
mapping, coverage, and final validation.

Later changes to any confirmed artifact require a new Realization revision,
new audit evidence proportional to the change, and a later confirmation
Decision. This Decision does not silently confirm future bytes.

## Non-Claims

This Decision does not:

- make validation an acceptance or confirmation authority;
- verify the semantic adequacy of every migrated summary;
- prove external Task operational state;
- publish a checker release;
- migrate or conform an external consumer;
- make ADR 0058 or ADR 0059 part of the NKF version namespace; or
- confirm any later revision by implication.
