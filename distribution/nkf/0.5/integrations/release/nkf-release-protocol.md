# NKF Release Protocol

NKF Version: 0.5

This protocol governs construction, exact-candidate exercise, independent
audit, technical confirmation, and one authenticated publication of an NKF
0.5 release. It is operational process carried in the complete versioned set;
it does not itself accept format meaning or confirm a Realization.

## Preconditions

Before packaging, require a clean exact source commit, an accepted authority
pair, derived Schemas and tooling, a complete
`contracts/nkf/0.5/release-set.yaml`, and a passing `npm run nkf:check`. The
existing recommendation and every published predecessor remain unchanged.

## Construct One Exact Candidate

1. Check out the exact release commit from the declared repository.
2. Run the complete accepted development check.
3. Build the checker and adopter twice and require byte-identical outputs.
4. Reproduce every release-set coverage selector from the clean built source
   and require exact equality with the sole `members` enumeration.
5. Verify the accepted Specification, executable companion, and all derived
   Schema digests.
6. Construct the closed release manifest. Its `files` array binds every
   release-set member except `release-manifest.json` in exact member order.
7. Validate the manifest with the manifest Schema.
8. Assemble the canonical USTAR archive twice from the release-set members and
   require byte-identical archives and SHA-256 digests.
9. Verify source provenance, archive safety, exact membership, all file
   digests, checker help, and fixture conformance from the extracted archive.

Any changed candidate byte invalidates prior candidate identity, self-adoption
results, audit Evidence, and technical confirmation.

## Prove Exact-Candidate Self-Adoption

Create a fresh isolated clone of the exact release commit. Install its locked
dependencies and run the deterministic build to materialize its declared
governed build artifacts, requiring the rebuilt checker to equal the
manifest-bound checker. Then use the adopter carried by the candidate archive
with an internal local recommendation binding to that exact archive digest.
This is not public recommendation or adoption.

Require the transaction to:

- disclose and receive the already authorized breaking 0.4-to-0.5 migration;
- consume a named whole-root semantic review, seal the exact candidate graph
  baseline, and refuse mutation when that review is incomplete or disputed;
- preserve the repository's declared host-superset gate and exact host check;
- install the archive, pin, adopter, canonical guidance, adapters, and
  integration verification atomically;
- migrate the bundle to 0.5 and pass the extracted candidate checker;
- run the complete producer `npm run nkf:check` chain with zero diagnostics;
  and
- return `current` on an immediate second exact-candidate Adopt.

Rollback or any mismatch leaves the candidate unpublished and the existing
recommendation unchanged.

## Independent Audit And Technical Confirmation

An independent reviewer works from fresh source and extraction. The audit
must cover release-set reproduction, archive and manifest reproducibility,
accepted authority and Schema bindings, checker and adopter execution, 0.1
through 0.4 migrations, same-version refresh, host-superset preservation,
self-adoption, idempotence, rollback, and tamper rejection.

Only after a clean audit may the delegated technical reviewer create an
external Decision binding the exact release commit, archive digest, and
checker digest. That Decision is outside the archive and changes no candidate
byte.

## Publish Exactly Once

Create a draft prerelease whose lightweight tag and single asset name derive
from the archive SHA-256. Re-download the draft asset and repeat exact archive,
manifest, source, and executable checks. Publish exactly the audited and
technically confirmed bytes. Publication freezes every complete-set member;
the release can never be deleted, overwritten, replaced, or rebound.

After publication, recommendation promotion and repository adoption remain
separate operations governed by the adoption protocol. A failed later step
may remove the release from recommendation or mark it withdrawn or
superseded, but correction requires a later NKF version.

## Reporting Boundaries

Report authority-pair acceptance, Realization confirmation, checker
conformance, candidate audit, publication, recommendation, repository
adoption, Git state, remote enforcement, and Governing Use readiness as
separate facts.
