---
id: adr-0076
type: decision
summary: After first consumer adoption of an NKF version, every contract-meaning change ships as a new immutable NKF version; the Decision Applicability Gate correction is allocated NKF 0.11.
created_at: 2026-08-06T22:10:25Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0076: Versioned Contract Evolution

## Context And Problem

NKF 0.1 evolved in place while it had no external consumers: NKF-010 through
NKF-017 revised the canonical Specification and executable companion under
the pre-stable evolution rule without changing the version coordinate.
Adopted repositories now exist and pin NKF 0.1 releases. Continuing to mutate
NKF 0.1 meaning in place would silently change the contract those
repositories declare.

The accepted NKF 0.1 versioning rule also states that a minor version only
adds backward-compatible optional vocabulary, which leaves no room for a
pre-stable corrective release that strengthens requirements, while NKF `1.0`
remains reserved for the first public stable release.

On `2026-08-06`, while adopting the NKF-019 Decision Applicability Gate
direction, the Human Product Owner directed that there be a defined process
for updating and versioning NKF, that every release be versioned now that
other repositories use NKF 0.1, and that the gate correction be NKF `0.11`.

## Decision

1. After the first consumer adoption of an NKF version, every change to NKF
   contract meaning ships as a new `<major>.<minor>` version with its own
   immutable accepted Specification revision, digest-bound executable
   companion, derived Schemas, and versioned release. Accepted versions are
   never mutated in place.
2. Before NKF `1.0`, a minor version MAY include breaking changes when it
   ships with explicit migration meaning. This supersedes, for successor
   versions, the NKF 0.1 rule that a minor version only adds
   backward-compatible optional vocabulary. NKF `1.0` remains reserved for
   the first public stable release.
3. NKF keeps one current version namespace at a time. A bundle declares
   exactly one `nkf_version`. A checker that does not support the declared
   version fails closed rather than validating against another version's
   meaning.
4. Consumers migrate deliberately. A repository that declares an earlier
   supported version remains valid against that version's immutable meaning;
   nothing migrates by implication of a newer version existing.
5. The NKF-019 Decision Applicability Gate correction is allocated NKF
   `0.11` and is the first version produced under this process.

## Scope And Applicability

This Decision governs how the NKF repository evolves and versions NKF
contract meaning from now on, and allocates the `0.11` coordinate to the
NKF-019 correction. It does not itself define gate meaning, revise a
Specification, implement a checker, publish a release, or migrate any
consumer repository.

## Rationale

Version-per-change preserves every adopted repository's declared contract as
immutable authority while allowing NKF to keep correcting evidenced failures
before `1.0`. Deliberate migration keeps consumer meaning under consumer
control. Allowing pre-stable minors to break with explicit migration is the
smallest change that reconciles the reserved `1.0` with the need to ship a
strengthened Task contract.

## Alternatives Considered

Continuing in-place pre-stable evolution was rejected because consumers now
pin and declare NKF 0.1. Requiring a major version for every breaking change
was rejected because `1.0` is reserved for stability, not for the next
correction. Introducing a third version component or sub-versioned contracts
was rejected because NKF keeps one version namespace and one coordinate.
Leaving versioning to release artifacts alone was rejected because the
declared `nkf_version` is the contract identity a bundle validates against.

## Consequences And Trade-Offs

The repository carries versioned contract trees and version-specific
Specification documents; historical versions remain as immutable authority
rather than being rewritten. Each correction now costs a full versioned
authority pair, derived artifacts, and a release. Checkers report an
unsupported declared version as a failure instead of guessing, which makes
version drift visible instead of silent.

## Non-Claims

This Decision does not:

- accept the NKF 0.11 Specification or executable companion;
- implement, validate, or confirm any Realization;
- publish or release any artifact;
- migrate, invalidate, or reclassify any consumer repository; and
- change the meaning of the accepted NKF 0.1 authority for repositories that
  declare it.
