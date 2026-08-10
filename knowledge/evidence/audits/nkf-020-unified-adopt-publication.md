# NKF-020 Unified Adopt Publication Evidence

- Observed At: `2026-08-10T11:48:45Z`
- Evidence Authority: Audited local candidate plus authenticated GitHub
  Release metadata, fresh asset download, system byte comparison, and strict
  release verification
- Acceptance Effect: None
- Confirmation Effect: None

## Publication Identity

The separately audited and technically confirmed candidate was published as a
non-draft private prerelease:

```text
https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f
```

GitHub reported:

- exact tag
  `release-sha256-015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f`;
- tag target `7eefe7d624fa8412e307c44a779c2e5e0afa497a`;
- one uploaded asset named
  `nourd-nkf-sha256-015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f.tar`;
- asset digest
  `sha256:015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f`;
- asset size `3714560` bytes;
- publication time `2026-08-10T11:48:45Z`; and
- prerelease `true`.

The human-readable notes have separate What Is New, What Breaks, How To
Adopt, and How To Verify sections. They name the subcommand-free public Adopt
operation and the breaking 0.1-to-0.2 migration. Publication does not migrate
any consumer.

## Independent Remote-Byte Verification

The published asset was downloaded through the authenticated GitHub release
interface into a new temporary directory. System `shasum -a 256` reproduced
the digest encoded in its tag and filename. System `cmp` found it byte-identical
to the independently audited local candidate.

The repository's strict release verifier independently rechecked the fresh
download, expected digest and filename, manifest, 132 source members, source
provenance, accepted authority digests, checker binding, and extracted checker
invocation against this full bundle. It passed and reported release commit
`7eefe7d624fa8412e307c44a779c2e5e0afa497a` and checker SHA-256
`f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`.

## Recommended Release Binding

Only after the hosted bytes passed, `release/recommended.json` was deliberately
promoted to this exact 0.2 prerelease. The catalog binds the archive, source,
accepted authority pair, checker, adopter, compatibility declarations,
visibility, publication time, and Product and Technology root profiles. A
consumer copies an exact immutable pin and never follows the catalog
dynamically.

## Remaining Publication Boundary

The public-documentation repository has not yet been republished from this
recommendation-bearing source commit. Its separate staged publication and
fresh remote verification remain required before NKF-020 concludes.

Earlier hosted 0.2 releases and tags remain present. Deleting them is a
separate destructive remote action and is not required for the new exact
recommendation to resolve.

## Non-Claims

This Evidence does not accept new NKF meaning, confirm a later Realization,
migrate an external consumer, establish acceptance binding or Governing Use
readiness, establish protected merge enforcement, or conclude NKF-020.
