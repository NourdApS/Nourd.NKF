# NKF-008 Release Documentation And Adoption Design Audit

- Audited At: `2026-07-31T02:03:35Z`
- Audited Task:
  `knowledge/tasks/active/NKF-008-publish-and-onboard-consumers.md`
- Audited Design:
  `knowledge/designs/active/release-documentation-and-adoption.md`
- Audited Design SHA-256:
  `d8e3f1184769e7baa93a01c33ed11cf79416ceacc436fc0edb057a1e01adeea8`
- Audit Authority: Codex technical reviewer
- Acceptance Effect: None

## Audit Question

Does the exact proposed direction completely and coherently satisfy NKF-008
without revising native NKF 0.1 meaning, weakening the accepted release
contract, exposing private material, creating a second authority, silently
moving consumer pins, or claiming an external migration?

## Method

The proposal was checked against:

1. every NKF-008 Scope, Public Documentation Requirement, Acceptance
   Criterion, and Guardrail;
2. the accepted release boundary in ADRs 0042 through 0048;
3. the accepted layered-enforcement boundary in ADR 0060;
4. the confirmed current checker, Schema, self-hosting, and workflow
   Realizations;
5. the existing stale prerelease and current private-repository state;
6. authority, security, compatibility, reproducibility, failure recovery,
   consumer experience, public information, and operational-truthfulness
   angles; and
7. the Product and Technology Root Profile boundary.

## Findings Resolved During Review

### Generated Publication Manifest Cycle

The first candidate placed a publication manifest in the committed public-doc
source while requiring that manifest to contain the same source commit. That
would create an impossible Git identity cycle.

The Design now makes `reference/publication.json` a generated staging output,
excludes it from its own file list, and keeps it out of the private source
commit whose identity it records.

### Existing Or Absent Package Metadata

The first candidate said only that installation adds `nkf:check` to
`package.json`, leaving a new repository without defined behavior.

The Design now requires creation of a minimal private package manifest when
none exists and a fail-closed compatible merge when one exists.

### Interrupted Installation Recovery

The first candidate staged new bytes but did not define recovery if one of
several final file replacements failed.

The Design now requires exact predecessor-byte recording, restoration after a
failed replacement, and no deletion of consumer content.

## Requirement Coverage

### Release

Pass at proposal level. The native archive remains the exact accepted
eight-file content-addressed USTAR. The current checker and authority digests
must be rebound through a new confirmation Decision, built from a clean exact
commit, independently verified, and published as a private prerelease. The
stale published predecessor remains historical rather than being overwritten.

### Immutable Recommendation And Pinning

Pass at proposal level. The recommendation catalog is explicit derived state.
The consumer pin stores the full archive digest, derived locator identities,
source commit, checker digest, adopter digest, and installed archive path.
Install, check, update, rollback, and no-update behavior never follows a moving
branch or mutable latest label.

### Consumer Installation

Pass at proposal level. One bundled adopter owns download or offline input,
full release verification, archive caching, pin creation, neutral protocol,
skills, host adapters, registry, integration verifier, package command,
workflow, and initial check. It defines safe conflict behavior instead of
silently replacing project-owned instructions.

### Public Documentation

Pass at proposal level. A dedicated public repository publishes an allowlisted
CommonMark and Mermaid projection from governed private source. The required
subjects, Product and Technology examples, diagrams, version, pre-stable
state, checker availability, exact binding, and explanatory-role notice are
all required. A byte-identical normative mirror provides a public conflict
resolution route without making simplified guidance authoritative.

### Public Information Safety

Pass at proposal level. Publication is allowlist-based and rejects symlinks,
credentials, private paths, sensitive material, and unexpected files. No
checker bytes, consumer knowledge, private Evidence, Tasks, repository
history, or private release credentials are published.

### Authority And Claim Separation

Pass. Specifications remain normative. Design adoption selects a proposal.
Confirmation Decisions bind exact Realizations. Release and documentation
publication, installation, Github workflow execution, and validation are
separate operational observations. Consumer validation cannot accept
knowledge.

### Profile And Compatibility Boundary

Pass. The adopter permits only the concrete Product and Technology Root
Profiles. It does not create a selectable General profile or retain a
historical record structure as a supported parallel NKF contract. Common
meaning remains inherited by both concrete profiles.

### Authorized Exercise

Pass at proposal level. ADR 0042 supplies the existing authority for the NKF
repository to act as the first governed consumer. An isolated synthetic
Product repository plus the NKF repository workflow can prove installation,
local validation, continuous-integration execution, tamper rejection,
no-update, and deliberate rollback or update without changing Agent SDK or
claiming an external migration.

### Failure Safety And Recovery

Pass at proposal level. Release, publication, adoption, and check paths fail
closed at their respective boundaries. Consumer writes are preflighted and
recoverable. Previous content-addressed release bytes remain available for an
explicit rollback.

## Remaining Realization Preconditions

These are implementation obligations, not unresolved defects in the proposed
direction:

1. adopt the exact Design through a Decision;
2. confirm the current release-bound checker and authority inputs;
3. implement and test the adopter and public-doc verifier;
4. author and audit the complete public documentation;
5. build and independently verify a clean exact release;
6. publish and re-observe the private prerelease and public repository;
7. execute the consumer exercise locally and in Github;
8. record external operational Evidence separately;
9. audit the final current Realization and all NKF-008 criteria; and
10. confirm the successor Realization before completing the Task.

## Audit Conclusion

No material semantic, authority, compatibility, security, or completeness
contradiction remains in the exact audited proposal.

The proposal is technically ready for adoption under the Human Product
Owner's delegated NKF-008 completion authority. An administrative move to the
Adopted Design directory and the addition of the adopting Decision identifier
must leave the audited proposal body unchanged; the adopting Decision must
bind the final exact Design digest.

This audit does not adopt the Design, confirm any proposed implementation,
publish anything, establish conformance, or complete NKF-008.

## Adoption Transition Note

The adopted revision is
`knowledge/designs/adopted/release-documentation-and-adoption.md` at SHA-256
`2ce1dc49a3439fd52200eb07cf9169d1094fbc08d888f191a931db31434dda59`.
The transition changed the declared disposition, added `ADR-0064`, and changed
the alternative heading `Use An NPM Package As The Initial Installer` to
`Use A Package Registry As The Initial Installer` so the governed heading
obeys the accepted Title Case grammar without adding `NPM` as a canonical
term. The alternative's meaning and all audited publication and adoption
boundaries remain unchanged.
