# NKF-020 Complete-Set Release Audit

## Audit Identity

- **Audited implementation:** commit
  `3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a`
- **Candidate archive:**
  `nourd-nkf-sha256-423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5.tar`
- **Archive SHA-256:**
  `423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`
- **Mode:** Fresh post-action audit using system hashing and USTAR
  extraction, independent source walks and byte comparison, extracted tools,
   separate package processes, and exact-commit GitHub validation
- **Scope:** The complete-set release correction only; no release publication,
  recommendation, consumer migration, breaking-change policy, Task conclusion,
  or protected-merge claim

This audit is Evidence. It does not accept format meaning, confirm a
Realization by itself, publish a release, migrate a consumer, or establish a
protected merge gate.

## Authority And Classification

The accepted NKF 0.2 Specification and release protocol require one complete
frozen set containing the authority and contracts, derived Schemas, checker,
authoring and onboarding protocols, portable skills and host-adapter
instruction content, fixtures, examples, and documentation projection.
ADR 0096 additionally places the deterministic governed command surface in
the set. The previous archive and adopter `set` enumeration carried only 15
pre-manifest members.

The omission is therefore classified as a release-tooling and distribution
defect in realizing already accepted meaning. The correction does not add a
new Product decision or change the accepted NKF 0.2 authority pair.

## Independent Method And Results

1. System `shasum -a 256` produced the exact digest encoded in the candidate
   asset name.
2. System USTAR listing and extraction found exactly 133 regular members:
   132 frozen source members plus `release-manifest.json`.
3. An independent recursive source walk constructed the expected set without
   importing the release allowlist: 21 authority, contract, tool, protocol,
   skill, and host-adapter members; 49 fixture files; 62 public-documentation
   files; and the generated manifest. The extracted member paths matched that
   independent set exactly, with no missing, extra, duplicate, symbolic-link,
   or unsupported entry.
4. Every one of the 132 extracted source members was byte-identical to the
   exact source at the audited commit. The manifest declares NKF 0.2 and binds
   release commit `3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a`.
5. All four canonical protocols and four canonical portable skills carry the
   exact `NKF Version: 0.2` marker. Both complete fixtures contain the
   `tasks/cancelled/README.md` topology required by the current four-state
   contract.
6. The checker extracted from the archive validated the audited repository,
   the Product fixture, and the Technology fixture at full-bundle level with
   zero diagnostics. Their observed snapshot SHA-256 values were respectively
   `53927de71d3bae4b96878330c86e863657f7523f951ff20558062fb7d9744136`,
   `53a247bd7e65cadc75e6aa75a9405fdb2078f5dc4b20163ab962adecb57a430b`,
   and `8a09a6ddf0eb64bbb4469e3c70cb279954c0652dfbd3e06d32cd8042c3a21f7e`.
7. The adopter extracted from the archive independently executed `set` and
   reported all 132 pre-manifest members present. Its SHA-256 was
   `97316a661c14d0fd56dfc47ee9b6e156f0db259d1e5b4f3009055ec7ccb714cd`.
8. The repository verifier independently rechecked the archive digest,
   manifest Schema, checker and authority digests, source provenance, and
   extracted-checker invocation successfully.
9. Two separate clean package processes produced byte-identical archives with
   the same `423b56fd...98d5` digest. Each process reran all 22 test files and
   189 tests, deterministic checker and adopter builds, the 62-file public
   projection, and its two complete examples.
10. GitHub `NKF Contracts` run `31329086006` passed for the exact audited
    commit on draft pull request `2`.

During implementation, one intermediate full check correctly failed
self-hosting after the adopter was rebuilt but before its governed digest was
re-pinned. The deterministic `repin` command updated the two rebuilt adopter
bindings, after which the unchanged complete gate passed. This was a staged
authoring sequence, not an unresolved candidate finding.

## Findings

No unresolved material finding remains inside the complete-set archive
correction. Exact membership, byte integrity, reproducibility, extracted-tool
behavior, fixtures, examples, guidance markers, source provenance, and remote
exact-commit validation all passed.

The following boundaries remain open and are not defects in this correction:

- the corrected archive is not published until the separate confirmation and
  release actions occur;
- the recommended consumer catalog remains on NKF 0.1 until deliberate 0.2
  promotion after publication;
- no consumer is migrated by the release or recommendation;
- NKF-020's breaking-change classification and signaling policy remains
  unresolved and cannot be treated as accepted by this technical audit;
- acceptance-binding verification and protected merge enforcement remain
  separately deferred; and
- authority binding was not evaluated and Governing Use remains not ready.

## Audit Conclusion

The implementation at commit `3d6ea93` faithfully corrects the complete-set
release defect and is suitable for separate delegated technical confirmation
and corrected unconsumed-release publication. The audit makes no claim about
the still-unresolved policy portion of NKF-020.
