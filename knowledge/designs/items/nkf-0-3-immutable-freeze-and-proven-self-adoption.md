---
id: design-nkf-023-immutable-freeze-and-proven-self-adoption
type: design
title: NKF 0.3 Immutable Freeze And Proven Self-Adoption
summary: This Design defines release-triggered immutability, exact-candidate self-adoption before publication, and a verified host-superset integration that preserves one public Adopt operation and the NKF producer gate.
created_at: 2026-08-10T21:22:44Z
record_lifecycle: immutable
record_status: accepted
task: NKF-023
design_disposition: adopted
design_decisions:
  - adr-0109
decision_authority: Human Product Owner, Nourd ApS
proposal_authority_effect: Adopted by ADR 0109 as process and Product direction; the exact NKF 0.3 authority-pair revision still requires separate acceptance.
proposal_evidence: NKF-022 self-adopt failure, NKF-023 recommendation assessment, and confirmed Human Product Owner direction.
implementation_evidence: None; this is a Design proposal.
---

# NKF 0.3 Immutable Freeze And Proven Self-Adoption

## Design Kind Problem And Scope

This is an NKF versioning, release, adoption, compatibility, and integration
Design under
[NKF-023](../../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md).
It addresses two connected failures exposed after NKF 0.2 publication:

1. accepted authority allowed an unconsumed published release to be replaced
   under the same version; and
2. release validation did not prove that the final archive could install into
   the NKF producer repository without replacing its stronger canonical gate.

The Design allocates the correction to NKF 0.3. It does not alter any frozen
0.2 byte, add a second public adoption command, weaken the producer gate,
implement the deferred [NKF-021](../../tasks/deferred/NKF-021-task-scope-gate.md)
Task Scope Gate, extend unsupported brownfield onboarding, or make validation
an acceptance act.

## Governing Inputs And Constraints

- [ADR 0076](../../decisions/0076-versioned-contract-evolution.md) keeps
  accepted versions immutable after first consumer adoption but retains a
  pre-consumption correction path. The Human Product Owner has confirmed that
  publication, not adoption, becomes the successor freeze trigger.
- [ADR 0080](../../decisions/0080-release-and-adoption-process.md) separates
  release from adoption, freezes both protocols in the versioned set, and
  requires this repository to carry the first real adoption.
- [ADR 0084](../../decisions/0084-replace-the-unconsumed-0-2-release.md) is
  immutable history for an explicit 0.2 replacement exception. NKF 0.3 must
  supersede its prospective applicability rather than rewrite it.
- [ADR 0094](../../decisions/0094-carry-the-set-and-audit-independently.md)
  requires the complete set and an independent post-action audit.
- [ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
  establishes one public Adopt operation, immutable consumer pins, explicit
  predecessor compatibility, and authority approval for breaking migration.
- [NKF-022](../../tasks/cancelled/NKF-022-pin-nkf-repository-to-released-nkf-0-2.md)
  proves the frozen 0.2 consumer integration cannot replace the producer's
  stronger `nkf:check` command truthfully.
- The Human Product Owner confirmed that the existing private 0.2
  recommendation remains unchanged during 0.3 development, no repository is
  onboarded to it, and verified 0.3 promotion replaces it atomically.

## Proposed Direction

### Publication-Triggered Freeze

An NKF version remains a candidate while its exact authority pair, complete
set, implementation, migration, and audit findings are still being reviewed.
Candidate changes may accumulate coherently under the owning Task and do not
allocate another version merely because candidate bytes change.

Publication of the exact content-addressed release archive and manifest under
its release tag freezes that version's complete set. From that moment, any
change to any complete-set member belongs to a new NKF version, even when:

- no repository adopted the release;
- the defect appears immediately after publication;
- the correction changes only guidance, checker, adopter, fixture, example,
  documentation projection, or release protocol bytes; or
- the correction appears backward compatible.

A defective release may stop being recommended or be marked withdrawn or
superseded operationally. Its tag, archive, manifest, source provenance,
accepted authority, confirmation record, and audit Evidence remain
retrievable and are never deleted, overwritten, or rebound to new bytes.

Recommendation state, Task lifecycle, audit Evidence, publication
observations, and other repository records outside the enumerated complete set
do not independently allocate a format version. They may report, select, or
withdraw a release but cannot revise its frozen meaning.

### Exact-Candidate Self-Adoption Gate

Before publication, release tooling constructs the one exact candidate
archive that would be published. A fresh isolated clone of the candidate
source then exercises the same Adopt transaction against those exact archive
bytes through an internal candidate binding. This is a release exercise, not
a public recommendation, release, or completed repository adoption.

The candidate exercise must:

1. verify archive identity, manifest, source commit, complete membership,
   checker, adopter, authority pair, and supported profiles;
2. install the candidate pin and integration atomically into the fresh clone;
3. preserve the producer's stronger canonical gate;
4. invoke the candidate archive's checker against the resulting complete
   repository;
5. run the complete producer gate with zero diagnostics;
6. repeat the same exact-candidate Adopt operation and require `current`; and
7. pass an independent audit from fresh source and extraction.

Any failure returns the version to candidate work. It does not authorize
editing a published release later. Technical confirmation may bind only the
exact candidate that passed this gate and the independent audit.

### Verified Host-Superset Integration

Ordinary consumers retain the default installed integration: their canonical
`nkf:check` invokes the pinned release's installed checker and installation
verification.

A repository with an established stronger gate may use a host-superset
integration only when Adopt can prove, rather than infer, all of the following:

- the canonical public command remains `npm run nkf:check`;
- that command invokes the exact pinned release check;
- the host's additional checks remain in the same fail-closed command chain;
- the installed pin records the selected integration mode and exact expected
  script state;
- repeat Adopt verifies the complete chain before returning `current`; and
- missing, reordered, bypassed, or conflicting script state fails closed.

An arbitrary pre-existing `nkf:check` is never accepted merely because it
returns success. The producer repository receives no identity-based bypass;
the host-superset mechanism is a general integration contract available only
to a repository whose exact stronger chain is explicitly represented and
verified.

The exact package fields, pin fields, invocation order, and recursion-safe
implementation are derived technical design. They must realize these product
constraints without adding another user-facing operation.

### Release Adoption And Recommendation Order

Release and adoption remain distinct:

1. candidate authority is accepted and implementation is derived;
2. the complete candidate is tested and independently audited;
3. delegated technical confirmation binds the exact candidate;
4. exactly those bytes are published once and thereby frozen;
5. the governed recommendation moves atomically from 0.2 to that exact 0.3
   archive;
6. the NKF repository runs ordinary no-override public Adopt as the first real
   adopter;
7. repeat Adopt must return `current`; and
8. a fresh independent post-action audit verifies the installed state.

Candidate self-adoption proves publishability; post-publication self-adoption
proves the real public channel. Neither substitutes for the other.

### Migration And Compatibility

One subcommand-free Adopt operation continues to resolve supported state and
return only `onboarded`, `migrated`, `updated`, or `current`.

The proposed compatibility declarations are:

| From | To | Proposed Classification | Rationale |
| --- | --- | --- | --- |
| unadopted supported repository | 0.3 | initial adoption | No predecessor NKF authority exists; semantic assessment and any required category confirmation still precede mutation. |
| 0.1 | 0.3 | breaking | The repository crosses the accepted 0.2 contract changes and the new 0.3 release boundary. |
| 0.2 | 0.3 | breaking | The repository changes its declared version, frozen guidance and integration, and release pin; explicit repository authority must approve that governed migration even if most knowledge shapes remain compatible. |
| 0.3 | recommended 0.3 | non-breaking | Exact-version installation refresh does not change declared format meaning. |

Tooling validates these declarations and approval presence but does not infer
semantic compatibility. The Human Product Owner owns the final
predecessor-relative classifications.

## Responsibilities Interactions And Information Flows

The Human Product Owner owns the freeze boundary, supported public operation,
compatibility classifications, withdrawal meaning, and exact authority-pair
acceptance. The technical reviewer owns implementation assessment and later
confirmation only under the recorded delegation.

The Specification owns versioning and claim meaning. The executable companion
mirrors it. Release tooling owns deterministic set construction,
candidate-bound exercise, reproducibility, and publication inputs. Adopt owns
state resolution, transactionality, exact pinning, integration verification,
and result states. The checker owns conformance diagnostics, not acceptance or
publication. Independent audit owns fresh adversarial verification and records
failures as findings.

Information flows from accepted candidate meaning to derived complete-set
bytes, exact candidate archive, isolated candidate adoption, independent
audit, technical confirmation, one publication, atomic recommendation,
ordinary self-adoption, and post-action audit. No later step may silently
change an earlier exact byte binding.

## Alternatives And Trade-Offs

### Keep The Consumer-Triggered Freeze

Allow correction under the same version while no consumer exists. Rejected by
confirmed direction: publication already creates externally referenceable
authority, tags, archives, audit claims, and potential cached bytes.

### Delete And Reissue An Unconsumed Release

Remove the old tag and archive, then publish corrected bytes under the same
version. Rejected: adoption count cannot prove nobody downloaded, cached, or
referenced the release, and deletion destroys provenance.

### Restore NKF 0.1 During Development

Point the current recommendation back to the independently verified 0.1
archive. Rejected for the interim: the frozen public 0.2 Adopt executable only
accepts a target-0.2 compatibility catalog, so this would break the public
operation unless frozen tooling also changed.

### Pause Public Adopt During Development

Publish a non-recommended or unavailable catalog state until 0.3. Valid but
not selected: the current frozen adopter would expose only a generic invalid
catalog failure. The confirmed private interim instead retains 0.2, permits no
new onboarding, and replaces it atomically with verified 0.3.

### Weaken Or Relocate The Producer Gate

Replace `nkf:check` with the consumer-only command and move producer checks to
another script or workflow. Rejected: the canonical local and exact-commit
gate would no longer prove the producer repository's complete requirements in
one place.

### Special-Case The NKF Repository

Bypass integration checks when the repository identity is Nourd.NKF.
Rejected: identity is not proof, consumers could imitate it, and a hidden
producer exception would not define a reusable or auditable contract.

### Dogfood Only After Publication

Keep the 0.2 order and discover integration defects after the release freezes.
Rejected: a post-freeze failure can only produce a later version. Candidate
exercise is necessary to keep a known failure out of the published set.

## Failure Safety Recovery And Operations

Candidate construction, installation, or audit failure leaves the source
version unpublished and the existing recommendation unchanged. Candidate
transactions roll back partial project writes. A changed candidate invalidates
all prior candidate digests, self-adoption results, audit Evidence, and
technical confirmation; every exact-byte step must repeat.

Publication failure does not permit a partially uploaded set to be called
released or recommended. Once the exact archive is authentically published,
its bytes are frozen even if later recommendation or self-adoption fails. The
failure is recorded, the release is not promoted or is withdrawn, and the
correction begins a later version.

Host-superset verification fails closed for missing pin fields, package drift,
recursion, absent installed release checks, or a host chain that no longer
matches its exact declaration. It never falls back silently to consumer mode
or trusts an exit code without exact integration verification.

## Validation And Decision Evidence

Current Evidence establishes that the 0.2 archive and ordinary consumer paths
verify, the real producer self-adoption fails before mutation, the 0.1 release
remains reproducible after its deterministic build, and direct 0.1
recommendation rollback is incompatible with the frozen 0.2 adopter.

On `2026-08-10`, the Human Product Owner confirmed the remaining Product
boundary: migration from NKF 0.2 to NKF 0.3 is classified `breaking`, so Adopt
must disclose it and obtain explicit repository-owner approval before
mutation even though the migration is designed to preserve existing
knowledge. Together with the previously confirmed freeze, interim
recommendation, single-operation, and self-adoption boundaries, this supplied
the Product authority for [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
to adopt the exact Design revision. Later authority-pair acceptance must bind
exact Markdown and executable bytes separately. Passing tests, candidate
self-adoption, audit, technical confirmation, publication, recommendation,
and repository adoption remain distinct evidence and authority events.

## Unresolved Matters

No Product boundary remains unresolved in this adopted Design. Exact technical
fields and algorithms remain derived implementation work subject to
independent review, and the deferred
[NKF-021 scope gate](../../tasks/deferred/NKF-021-task-scope-gate.md) remains
outside this Task.
