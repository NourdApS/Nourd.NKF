# NKF-020 Corrected Release Publication Evidence

- Observed At: `2026-08-09T18:43:29Z`
- Evidence Authority: Local candidate and verifier output plus GitHub Release,
  asset, tag, and exact-commit workflow observations
- Acceptance Effect: None
- Confirmation Effect: None

## Publication Identity

The separately audited and confirmed candidate was published as a non-draft
private prerelease:

```text
https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5
```

GitHub reported:

- exact tag
  `release-sha256-423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`;
- tag target `3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a`;
- one uploaded asset named
  `nourd-nkf-sha256-423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5.tar`;
- asset digest
  `sha256:423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`;
- asset size `3683328` bytes;
- publication time `2026-08-09T18:43:29Z`; and
- prerelease `true` and draft `false`.

The release notes separately state what is new, what breaks, how to adopt,
and how to verify. Publication does not migrate any consumer.

## Independent Remote-Byte Verification

The published asset was downloaded through the authenticated GitHub release
interface into a new temporary directory. System `shasum -a 256` reproduced
the digest encoded in its tag and filename, `cmp` found it byte-identical to
the independently audited local candidate, and system USTAR listing found
exactly 133 members.

The repository's strict release verifier then rechecked the downloaded asset,
its expected digest and filename, manifest, 132 source members, source
provenance, accepted authority digests, checker binding, and extracted checker
invocation against this full bundle. It passed and reported release commit
`3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a` and checker SHA-256
`f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`.

The confirmation-bearing pull-request head `aa04105e5c62365553626e624d9ac7b2e4094180`
also passed GitHub `NKF Contracts` run `31329613099` before publication.

## Recommended Release Binding

After the remote bytes passed, `release/recommended.json` was deliberately
promoted from the retained 0.1 predecessor to this exact 0.2 prerelease. The
catalog binds the archive, source, accepted authority pair, checker, adopter,
visibility, publication time, and Product and Technology root profiles. A
consumer still copies an exact immutable pin and never follows the catalog
dynamically.

## Superseded Publication Boundary

The previously published incomplete archive
`a1a12e4482d430a1555b0bb8dbda9ba716ca3acaadb845c0ef4dd9f632023482`
is no longer the current or recommended release. Its hosted release and tag
remain present because deletion is a separate destructive remote action that
was not performed without explicit authorization. The corrected publication,
catalog, and current-status surfaces do not rely on its deletion.

## Non-Claims

This Evidence does not accept new NKF meaning, confirm a later Realization,
migrate a consumer, republish the public documentation repository, establish
acceptance binding or Governing Use readiness, establish protected merge
enforcement, or resolve NKF-020's breaking-change policy scope.
