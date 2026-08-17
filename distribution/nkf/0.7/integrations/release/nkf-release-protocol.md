# NKF Release Protocol

NKF Version: 0.7

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
4. Review every member of the versioned set against the complete current
   rule set: enumerate the exact member list deterministically — the
   adopter `set` command emits every member with its digest and version
   stamp — and re-read each shipped protocol and portable skill in full
   against this version's accepted authority pair, not only against the
   rules that changed, correcting any sentence that describes a rule that
   is not the current rule, including rules reversed in any earlier round.
   Record the enumerated member list, each reviewed digest, and every
   correction so the independent audit can verify the review covered the
   whole set.
5. Prove the set against itself: the full test suite over the version's
   fixtures, deterministic checker and adopter builds, and the guidance and
   documentation verifiers. The publishing repository's own knowledge still
   declares its current earlier version at this stage and continues to
   validate against that version's frozen checker; that is correct, because
   the repository has not adopted the new version yet.
6. Produce one content-addressed candidate archive and manifest for the
   exact set, adopt it into an isolated copy of the exact candidate source
   repository, and complete the ordinary-authoring rehearsal and complete
   producer gate there.
7. Obtain a fresh independent audit of the exact candidate, including
   verification that the guidance review of step four was performed against
   the actual rule diff, and repair material findings; any repaired byte
   restarts from step six.
8. Author the mandatory technical-confirmation Decision as a post-audit,
   outside-the-archive governance record binding the exact release commit,
   archive digest, checker and adopter digests, and the exact audit
   evidence. The Decision is invalid without its bound audit, and no waiver
   exists. Publication before this Decision is a protocol violation. Only
   then, under separate authorization, publish the exact audited bytes,
   verify them by re-download and digest comparison, and retain the
   verification. The version is released when this step completes.
9. Publish the version's migration meaning with the release, written for
   human readers: short named sections stating what is new, what breaks,
   how to adopt, and how to verify. A compressed single-paragraph summary
   is not acceptable publication.
10. Refresh the repository front page as part of the release: its status
   section states the released version, this repository's own adoption
   state, and the recommended consumer catalog state, with resolving
   links only.

## Boundaries

- A release does not accept knowledge, confirm a Realization, prove any
  repository's conformance, or migrate any repository.
- Skipping a step, or representing a later step as satisfied by an earlier
  one, fails the release closed.
- A released set is immutable once any consumer has adopted it; a defect
  found after consumption is fixed in a new version with its own migration
  meaning. Until first consumption, a correction re-accepts the candidate
  pair and replaces the unconsumed release under the recorded governance
  exception.
- Superseded versions leave the working tree when this repository adopts
  their successor; they remain retrievable from version-control history and
  their immutable release archives.
- Breaking-change classification and signaling beyond the published
  migration meaning remains deferred to NKF-020.
