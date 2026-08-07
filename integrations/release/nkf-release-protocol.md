# NKF Release Protocol

NKF Version: 0.2

This is the governed procedure by which the Nourd Knowledge Format
repository releases a new NKF version. It is repository process accepted
through ADR 0080, not format meaning. It is part of the versioned set it
releases: correcting this protocol after its version is released requires a
new version.

Releasing is separate from adopting. No repository, including this one,
starts following a released version because the release exists. Adoption is
its own deliberate procedure under the NKF Adoption Protocol.

## Preconditions

A release begins only when:

1. immutable Decisions adopt the change and allocate the version coordinate
   under the accepted versioning rules; and
2. the Human Product Owner has accepted the exact candidate Specification
   revision and its digest-bound executable companion for that version.

Nothing else — implementation progress, passing checks, or conversation —
substitutes for those two facts.

## Procedure

3. Build the complete versioned set from the accepted authority pair: the
   derived Schemas, the checker, the authoring and onboarding protocols, the
   portable skills and host-adapter instruction content, this protocol and
   the adoption protocol, and the fixtures, examples, and documentation
   projection. Every artifact in the set declares the version it serves
   through the exact guidance marker.
4. Prove the set against itself: the full test suite over the version's
   fixtures, deterministic checker and adopter builds, and the guidance and
   documentation verifiers. The publishing repository's own knowledge still
   declares its current earlier version at this stage and continues to
   validate against that version's frozen checker; that is correct, because
   the repository has not adopted the new version yet.
5. Obtain an independent audit of the exact set, repair material findings,
   and obtain the separate Human Product Owner confirmation that the exact
   implementation realizes the accepted authority pair.
6. Produce one content-addressed release archive and manifest for the exact
   confirmed set, verify it by re-download and digest comparison, and retain
   the verification as Evidence. The version is released when this step
   completes.
7. Publish the version's migration meaning with the release: what changed,
   what breaks, and exactly what an adopting repository must do.

## Boundaries

- A release does not accept knowledge, confirm a Realization, prove any
  repository's conformance, or migrate any repository.
- Skipping a step, or representing a later step as satisfied by an earlier
  one, fails the release closed.
- Released sets are immutable. A defect discovered after release is fixed in
  a new version with its own migration meaning.
- Superseded versions leave the working tree when this repository adopts
  their successor; they remain retrievable from version-control history and
  their immutable release archives.
- Breaking-change classification and signaling beyond the published
  migration meaning remains deferred to NKF-020.
