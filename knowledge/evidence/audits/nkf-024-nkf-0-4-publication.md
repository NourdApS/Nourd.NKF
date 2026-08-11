# NKF-024 NKF 0.4 Publication Evidence

## Observation Identity

- **Release commit:** `29880a398c26fbc126b13cdaaebe9cf5b7fe7734`
- **Archive SHA-256:**
  `a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`
- **Tag:**
  `release-sha256-a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`
- **Published at:** `2026-08-11T15:27:44Z`
- **Observed through:** remote Git tag resolution, authenticated Github release
  API metadata, authenticated draft and published asset downloads, system byte
  comparison, SHA-256, and separate predecessor re-download
- **Observation completed:** `2026-08-11T15:29:09Z`

This Evidence records time-bound remote publication facts. It does not accept
meaning, exercise technical confirmation, adopt the producer or a consumer,
establish remote enforcement, or make Governing Use ready.

## Draft Verification

After the clean exact-candidate audit and
[ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md)
technical confirmation were committed and pushed, the content-addressed tag
was created at the exact audited release commit. Fresh remote resolution
reported lightweight commit target
`29880a398c26fbc126b13cdaaebe9cf5b7fe7734`.

A private draft prerelease was created with exactly one asset:

`nourd-nkf-sha256-a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd.tar`

Authenticated Github metadata reported 4,164,608 bytes and platform digest
`sha256:a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`.
An authenticated draft download was byte-identical to the audited local
archive at the same SHA-256 before publication.

## Publication And Re-Download

The verified draft was published without changing its tag, name, asset, or
prerelease classification. Authenticated metadata then reported:

- release id `368669248`;
- `draft: false`;
- `prerelease: true`;
- `published_at: 2026-08-11T15:27:44Z`;
- the exact content-addressed
  [release URL](https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd);
  and
- the same sole asset at the same size and platform digest.

The published asset was downloaded again into fresh temporary state. Its
4,164,608 bytes were byte-identical to the audited archive and had SHA-256
`a7912b92...79ecd`. No candidate byte changed between audit, confirmation,
draft upload, publication, or published re-download.

## Immutable Predecessor Reverification

The already published NKF 0.3 predecessor was independently retrieved again.
Its remote lightweight tag still targets source commit
`8a06564e1c91069db19581ca5bfa22770ac95fb5`; its sole 4,003,840-byte asset
still reports and downloads at SHA-256
`34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`.
The 0.4 publication did not replace or mutate the immutable predecessor.

## Recommendation Boundary

This Task branch promotes the governed recommendation from exact NKF 0.3 to
the exact published NKF 0.4 archive. The catalog binds the release commit,
checker, adopter, accepted authority pair, profiles, and all four supported
repository states. Recommendation alone migrates no repository; this producer
still declares and pins NKF 0.3 until the later ordinary public Adopt step.

## Conclusion

NKF 0.4 is authentically published as a private Github prerelease with one
exact independently reverified archive, and the immutable NKF 0.3 predecessor
remains retrievable byte-identically. Publication permanently freezes the 0.4
complete set. Recommendation validation, ordinary producer adoption, repeat
`current`, and the post-adoption audit remain separate steps.
