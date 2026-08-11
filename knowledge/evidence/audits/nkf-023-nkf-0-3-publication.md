# NKF-023 NKF 0.3 Publication Evidence

## Observation Identity

- **Release commit:** `8a06564e1c91069db19581ca5bfa22770ac95fb5`
- **Archive SHA-256:**
  `34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`
- **Tag:**
  `release-sha256-34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`
- **Published at:** `2026-08-11T10:57:27Z`
- **Observed through:** authenticated GitHub CLI release metadata, remote Git
  tag resolution, two authenticated asset downloads, system byte comparison,
  SHA-256, and the extracted release verifier
- **Observation completed:** `2026-08-11T11:00:49Z`

This Evidence records time-bound remote publication facts. It does not accept
meaning, confirm a Realization, recommend the release from the default branch,
adopt a repository, establish remote enforcement, or make Governing Use ready.

## Draft Verification

After the clean audit and [ADR 0111](../../decisions/0111-confirm-the-nkf-0-3-release-candidate.md)
technical confirmation were committed and pushed, a lightweight
content-addressed tag was created at the exact audited release commit. Git
object inspection reported type `commit`, and the remote tag resolved to
`8a06564e1c91069db19581ca5bfa22770ac95fb5`.

A private draft prerelease was created with exactly one asset:

`nourd-nkf-sha256-34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4.tar`

Authenticated GitHub metadata reported the asset as uploaded,
`application/x-tar`, 4,003,840 bytes, with platform digest
`sha256:34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`.
The draft asset was independently downloaded. System comparison found it
byte-identical to the audited local archive, and SHA-256 matched the tag and
filename.

The release verifier then proved the archive identity, tag, exact release
commit, checker digest, all 134 source-derived members, and extracted checker
execution against the canonical 0.3 Product fixture.

The first verifier invocation omitted its required digest argument and failed
before verification. A second diagnostic invocation pointed the 0.3 release
checker at the intentionally still-0.2 producer and correctly failed closed
because the extracted 0.3 set does not carry the 0.2 authority set. The
correct prepublication 0.3 fixture invocation passed. These were audit-harness
input errors, not archive findings, and caused no repository or release-byte
mutation.

## Publication And Re-Download

The verified draft was published without changing its tag, asset, name, or
prerelease classification. Authenticated metadata then reported:

- `isDraft: false`;
- `isPrerelease: true`;
- `publishedAt: 2026-08-11T10:57:27Z`;
- the exact content-addressed public release URL; and
- the same sole asset, byte size, and SHA-256 digest.

The published asset was downloaded again into fresh temporary state. The
release verifier reproduced all 134 source members and invoked the extracted
checker against the canonical 0.3 Technology fixture successfully. No frozen
candidate byte changed between audit, confirmation, draft upload, publication,
or published re-download.

## Recommendation Boundary

The task branch now prepares one atomic recommendation change from the private
NKF 0.2 catalog to this exact published NKF 0.3 archive. The updated local
catalog passes `npm run verify:recommended-release` and binds the published
archive, release commit, checker, adopter, accepted authority pair, profiles,
and all three supported repository states.

The NKF default branch still serves the earlier 0.2 catalog until human merge.
Therefore this Evidence does not yet claim public recommendation or ordinary
producer Adopt.

## Conclusion

NKF 0.3 is authentically published as a private GitHub prerelease with one
exact independently reverified archive. Publication freezes that complete set.
Recommendation promotion, producer migration, repeat `current`, and the
post-action audit remain later separate steps.
