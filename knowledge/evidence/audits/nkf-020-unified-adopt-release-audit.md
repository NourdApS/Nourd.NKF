# NKF-020 Unified Adopt Release Audit

## Audit Identity

- **Audited implementation:** commit
  `7eefe7d624fa8412e307c44a779c2e5e0afa497a`
- **Candidate archive:**
  `nourd-nkf-sha256-015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f.tar`
- **Archive SHA-256:**
  `015a922d17a6c29895af1df199485bde209f1ca165bc2bcbfe39f7a9b0b4a51f`
- **Audit completed:** `2026-08-10T11:18:11Z`
- **Mode:** Fresh post-action review using two clean package processes,
  system hashing and USTAR extraction, an independent source walk and byte
  comparison, extracted tools, isolated Product and Technology consumers,
  and a real NKF 0.1 predecessor

This audit is Evidence. It does not accept meaning, supply Human Product
Owner judgement, confirm a Realization by itself, publish a release, migrate
an external consumer, or establish remote enforcement.

## Accepted Boundary Under Review

[ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
accepts one public, subcommand-free Adopt operation. The governed
recommendation selects an exact content-addressed release. Compatibility is
declared relative to each supported predecessor and remains Human Product
Owner judgement. The 0.1-to-0.2 path is breaking and cannot mutate governed
knowledge without explicit repository-authority approval.

## Independent Method And Results

1. `npm run nkf:check` passed on the exact implementation: 22 test files and
   192 tests, deterministic checker, adopter, and 62-file public-documentation
   builds, 877 living links, and self full-bundle conformance with zero
   diagnostics. Authority binding remained not evaluated and Governing Use
   remained not ready.
2. Two separate clean `package:release` processes each reran the complete
   implementation suite and produced byte-identical 3,714,560-byte archives
   at SHA-256 `015a922d...a51f` from commit `7eefe7d...497a`.
3. System USTAR extraction found 133 regular members. An independent recursive
   source walk, without importing the release allowlist, derived 21 core,
   protocol, skill, adopter, checker, and host-adapter members; 49 fixture
   members; and 62 public-documentation members. All 132 source paths matched
   the extracted paths exactly and every extracted member was byte-identical
   to the audited source. The remaining member was the generated manifest.
4. The extracted checker SHA-256 was
   `f96d8b818bc2bcac64fe65cfc46a4ff9bfdd0c31a6783b72cec05484f10403c6`.
   It validated the audited repository, Product fixture, and Technology
   fixture at full-bundle level with zero diagnostics. Their observed snapshot
   SHA-256 values were respectively
   `8bf97cdb25ffe892da89a3aa72b6459cc7ba64056f5ac6dde15c827cbd7bf534`,
   `53a247bd7e65cadc75e6aa75a9405fdb2078f5dc4b20163ab962adecb57a430b`,
   and `8a09a6ddf0eb64bbb4469e3c70cb279954c0652dfbd3e06d32cd8042c3a21f7e`.
5. The extracted adopter SHA-256 was
   `e109fbeaf99d7576b56e0fdf1411092b235379a6eba7a58b99db719391c344d0`.
   Its deterministic `set` operation enumerated all 132 pre-manifest members
   as present with their exact digests.
6. The public consumer exercise used the candidate archive and an audit-only
   exact recommendation. It onboarded isolated Product and Technology
   repositories, installed the complete package command and integration,
   validated both at full-bundle level, refreshed a native 0.2 repository,
   returned `current` on repetition, and rejected archive, pin, integration,
   and governed-knowledge tampering. The repository recommendation was then
   restored to the last actually published release pending confirmation.
7. A real NKF 0.1 consumer was created with the predecessor adopter and archive
   from source commit `53ae5217f68731d953f3bf616a578adeb033bb03` and passed its
   predecessor checker. The candidate's public no-subcommand operation first
   returned `NKF-ADOPT-BREAKING-APPROVAL-REQUIRED`, exposing the predecessor,
   `breaking` classification, migration requirement, exact target digest, and
   required approval argument. Independent preflight tree snapshots contained
   24 files and retained the identical SHA-256
   `37eece16e2ba535e288353e56e20b717160a7766c2be6236bd80a4d67d4ec55e`.
   With `--accept-breaking human-product-owner`, the extracted candidate
   adopter returned `migrated`, gated the existing active Task, validated the
   0.2 candidate, and pinned the exact archive, checker, and adopter. A repeat
   public invocation returned `current`.
8. A public-guidance search found no invocation of `onboard`, `install`,
   `update`, or `migrate`; all published examples invoke the subcommand-free
   Adopt operation. Internal inspect, seal, migration, integration, and Task
   mechanics remain explicitly non-public implementation paths.

One audit invocation initially named a nonexistent Technology fixture path and
correctly failed before checking it. Repeating the invocation with the actual
`fixtures/valid/technology-0-2` path passed. This was an audit-harness input
error, not a candidate finding.

## Findings And Boundaries

No unresolved material finding remains in the audited implementation or
candidate archive. The following facts remain separate:

- separate Realization confirmation is still required before publication;
- release publication and authenticated re-download have not yet occurred;
- `release/recommended.json` continues to name the last actually published
  release until the new exact hosted release exists;
- public-documentation publication is a later operational action;
- no external consumer has adopted the release;
- validation does not verify historical acceptance bindings; and
- protected merge enforcement remains deferred under NKF-012.

## Audit Conclusion

The exact implementation and archive faithfully realize the accepted unified
Adopt and predecessor-relative compatibility boundary. They are suitable for
separate confirmation and release publication. This audit makes no
confirmation, publication, or external-consumer claim.
