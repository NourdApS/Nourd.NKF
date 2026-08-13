# NKF-026 NKF 0.5 Publication Evidence

## Observation Identity

- **Release commit:** `777ea9a3a87591de36494296db4437c5b4343ce2`
- **Archive SHA-256:**
  `e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9`
- **Tag:**
  `release-sha256-e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9`
- **Published at:** `2026-08-13T17:28:02Z`
- **Observed through:** remote Git tag resolution, authenticated Github release
  metadata, authenticated draft and published asset downloads, system byte
  comparison, and SHA-256
- **Observation completed:** `2026-08-13T17:30:56Z`

This Evidence records time-bound remote publication facts. It does not accept
meaning, exercise technical confirmation, adopt the producer or a consumer,
establish remote enforcement, verify acceptance binding, or make Governing Use
ready.

## Draft Verification

After the clean exact-candidate audit and
[ADR 0120](../../decisions/0120-confirm-the-nkf-0-5-release-candidate.md)
technical confirmation were committed and pushed, the content-addressed tag
was created at exact audited release commit
`777ea9a3a87591de36494296db4437c5b4343ce2`. Fresh remote resolution returned
that exact target.

A private draft prerelease was created with exactly one asset:

`nourd-nkf-sha256-e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9.tar`

Authenticated Github metadata reported 5,260,800 bytes, asset id `513286151`,
and platform digest
`sha256:e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9`.
An authenticated draft download was byte-identical to the audited local
archive before publication.

## Publication And Re-Download

The verified draft was published without changing its tag, name, asset, or
prerelease classification. Authenticated metadata then reported:

- release id `370089834`;
- `draft: false`;
- `prerelease: true`;
- `published_at: 2026-08-13T17:28:02Z`;
- the exact content-addressed
  [release URL](https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9);
  and
- the same sole asset at the same size and platform digest.

The published asset was downloaded again into fresh temporary state. Its
5,260,800 bytes were byte-identical to the independently audited archive and
had SHA-256 `e4677933...f99d9`. No complete-set byte changed between candidate
audit, technical confirmation, draft upload, publication, or published
re-download.

## Recommendation Boundary

This Task branch promotes the governed recommendation from exact NKF 0.4 to
the exact published NKF 0.5 archive. The catalog binds the release commit,
checker, adopter, accepted revision 2 authority pair, profiles, and all five
supported repository states. Migration from NKF 0.1 through NKF 0.4 is
breaking and requires explicit repository-owner approval; exact 0.5 refresh
is non-breaking. The separate branch-local recommended-release verifier passed
with the exact archive, source, checker, adopter, and authority bindings.
Recommendation alone migrates no repository: this producer still declares and
pins NKF 0.4 until the required ordinary public Adopt step.

## Conclusion

NKF 0.5 is authentically published as a private Github prerelease with one
exact independently reverified archive. Publication permanently freezes its
181-member complete set. Recommendation validation passed separately; ordinary
producer self-adoption, repeat `current`, and the independent post-adoption
audit remain separate steps.
