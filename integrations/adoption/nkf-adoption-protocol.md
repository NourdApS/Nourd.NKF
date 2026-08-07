# NKF Adoption Protocol

NKF Version: 0.2

This is the governed procedure by which a repository adopts a released NKF
version. It is process accepted through ADR 0080, not format meaning. It is
part of the versioned set of the version it serves.

Adoption is separate from release. A released version obligates no
repository; each repository migrates deliberately, and prior versions remain
immutable and validatable for repositories that stay on them.

The Nourd Knowledge Format repository is itself the first adopter of every
version it releases: immediately after a release completes, this procedure
runs against the NKF repository before any other repository is asked to
follow it.

## Procedure

1. The repository's owning authority explicitly decides to migrate to the
   released version. Nothing migrates by default, by tooling, or by
   implication.
2. Install the exact released set: a consumer repository through the pinned,
   digest-verified adopter and release artifacts; the NKF repository by
   carrying the released set in its own tree. Installed guidance is the
   version-stamped set from that release.
3. Migrate the knowledge to the version's contract, following the release's
   published migration meaning. For NKF 0.2 this means: the bundle declares
   `nkf_version: "0.2"`; every Task non-record carries its Decision
   Applicability section, with pre-existing completed Tasks gated
   retrospectively and saying so; every frontmatter `title` exactly equals
   its H1; repeated identity bullet blocks leave document bodies, with
   orientation moving into the Task, record, and Design frontmatter keys;
   every same-bundle document reference becomes a deep link to the
   referenced document's exact source path, including gate table cells; and
   record source digests are re-pinned for every edited document.
4. Remove superseded own-version artifacts from the working tree where the
   repository carries them; they remain retrievable from version-control
   history and release archives.
5. Validate the complete bundle with the released version's checker to zero
   diagnostics.
6. Independently audit the completed migration before human review: with a
   fresh reading rather than the migrating session's assumptions, rerun the
   version's checker to zero diagnostics, verify the installed pin, receipt,
   and archive digests, compare the migrated topology and a sample of
   migrated documents against this protocol's promises, and record findings
   as findings in the owning Task instead of declaring success.
7. Record the migration and the audit outcome in the repository's own
   knowledge and close it through the repository's human review. Validation
   is conformance for the observed snapshot; it is not acceptance,
   Realization confirmation, or review.

## Boundaries

- Adoption does not rewrite accepted immutable records; retrospective gate
  sections and envelope migration change document orientation and Task
  bodies under the migrating repository's own authority, with provenance.
- A repository that cannot satisfy the new contract does not misdeclare its
  version; it stays on its current version until it can migrate truthfully.
- Mixed states fail closed: a bundle declaring the new version validates
  only against that version's checker and complete contract.
- Adoption confers no acceptance, confirmation, release recommendation, or
  operational claims beyond the validated snapshot.
