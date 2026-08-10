# NKF-020 Unified Adopt Public Documentation Evidence

- Observed At: `2026-08-10T12:35:14Z`
- Evidence Authority: Deterministic clean-source staging, public Git
  publication, second fresh clone, closed-set digest verification, extracted
  release checker execution, and a synthetic default-recommendation consumer
  exercise
- Acceptance Effect: None
- Confirmation Effect: None

## Publication Identity

The clean NKF source commit used for staging was:

```text
7381ac6efd804d9163a00574a759d21cd9e03d62
```

That commit was already contained by `origin/master` through merge commit
`9f6ae00b960ae2a1a9e7e58205cabb14fbd91eee`. Deterministic staging produced
63 files: the closed 62-file public source set plus generated
`reference/publication.json`. The generated manifest SHA-256 was:

```text
2abbf32ddd827b4f5f6d865e74a91b7e03dcb595bcb467613eaa9cfe4a49b21f
```

The exact public projection is:

```text
https://github.com/kaveh6202/Nourd.NKF.Docs
```

Github reported that repository as Public with default branch `master`. The
published commit was:

```text
8c61d7632394c977c22c85c02a0b2afdf58c16d4
```

The manifest binds NKF 0.2, normative Markdown SHA-256
`336876774b4f2ee02a0a74b29616bdaf35df412edd8046ae3cd1cb18fc1b2a02`,
release archive SHA-256
`015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f`,
release source commit `7eefe7d624fa8412e307c44a779c2e5e0afa497a`,
checker SHA-256
`f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`,
and public adopter SHA-256
`e109fbeaf99d7576b56e0fdf1411092b235379a6eba7a58b99db719391c344d0`.

## Independent Fresh-Clone Verification

A second new clone independently resolved public commit `8c61d76`. Excluding
only `.git` implementation metadata, system `diff` found it byte-identical to
the deterministic staged projection. An independent verifier recalculated
all 62 manifest-bound file digests, rejected non-file entries and any member
outside the closed set, and confirmed exactly 63 published files including
the manifest.

The checker extracted from the freshly re-downloaded release archive was then
invoked directly against both published example projects without persisting a
result:

| Example | Root Profile | Snapshot SHA-256 | Entries | Conformance | Diagnostics |
| --- | --- | --- | --- | --- | --- |
| Product | `nkf.profile.product` | `53a247bd7e65cadc75e6aa75a9405fdb2078f5dc4b20163ab962adecb57a430b` | 49 | Passed | None |
| Technology | `nkf.profile.technology` | `8a09a6ddf0eb64bbb4469e3c70cb279954c0652dfbd3e06d32cd8042c3a21f7e` | 52 | Passed | None |

Both observations used the release-bound checker SHA-256 `f96d8b8...403c6`.
Acceptance binding was not requested; Governing Use remained Not Ready or Not
Evaluated according to each exact record state.

## Default Public Adopt Exercise

The adopter from the fresh public clone mechanically inspected separate empty
synthetic Product and Technology repositories. Complete inspection reported
zero project entries in each, so the technical audit recorded the accepted
Category 1 `empty-repository` assessment with confirmation `not-required`,
then sealed each external plan without touching its project.

The documented public command was run without a local recommendation, local
archive, explicit digest, or repository override:

```text
node nourd-nkf-adopt.mjs --project <isolated-project> --plan <sealed-plan>
```

In both profiles it authenticated to the private NKF repository, resolved the
governed recommendation from `master`, downloaded and verified exact archive
`015a922d...a51f`, created the complete selected-profile topology and host
integration, and returned public state `onboarded` with full-bundle
conformance `passed`. The same public command without the Product plan then
returned `current` with the declared non-breaking 0.2 compatibility signal.
The installed canonical `npm run nkf:check` command independently passed in
both projects and named the same archive, release source, checker, and
integration revision.

The exercise proves the published default resolution and both initial profile
paths, plus the Product current path, for these exact empty synthetic
repositories. It does not accept consumer meaning or generalize semantic
category eligibility to another repository.

## Public Information Boundary

The projection contains only the reviewed allowlist. It contains no private
checker bytes, private Tasks or Evidence, credentials, local paths, repository
history, or consumer knowledge. The public adopter requires authorized access
to obtain the private release unless the caller supplies an independently
approved local recommendation and archive.

## Non-Claims

This Evidence does not accept public documentation or consumer meaning,
confirm a later Realization, migrate an external consumer, establish
acceptance binding or Governing Use readiness, or establish protected merge
enforcement.
