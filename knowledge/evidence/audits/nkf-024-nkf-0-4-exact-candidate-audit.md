# NKF-024 NKF 0.4 Exact Candidate Audit

## Audit Identity

- **Audited release commit:**
  `29880a398c26fbc126b13cdaaebe9cf5b7fe7734`
- **Candidate archive:**
  `nourd-nkf-sha256-a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd.tar`
- **Archive SHA-256:**
  `a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`
- **Checker SHA-256:**
  `425286d383fa2a93461ebbae4fc986c67f987adab3b5545a927b75064c9ed123`
- **Adopter SHA-256:**
  `416b26e7413afebf24fdb97d47cedae613242476839c98250a330c3cdcf0cd65`
- **Audit completed:** `2026-08-11T15:11:08Z`
- **Mode:** Fresh read-only review from an exact remote branch clone, independent
  archive parsing, extraction and reproduction, clean dependency installation,
  separate builds, extracted tools, candidate producer adoption, and the full
  compatibility and adversarial suite

This Evidence does not accept NKF meaning, confirm the implementation, publish
or recommend a release, mutate the live producer, establish remote enforcement,
verify acceptance binding, or make Governing Use ready.

## Accepted Boundary Under Review

[ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md)
allocates only a non-breaking dependency-security successor to immutable NKF
0.3. [ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md)
accepts the exact 0.4 maintenance pair. The candidate must therefore preserve
0.3 format behavior, change no frozen 0.3 member, remove the two affected lock
resolutions, carry one complete release enumeration, keep 0.1 and 0.2 breaking
approval gates, and update 0.3 without migration, approval, knowledge change,
or host-integration weakening.

The first private archive at SHA-256 `3d4ebdc9...` was superseded before this
audit. Its exercise exposed a stale producer expectation that still requested
breaking approval and expected `migrated` for 0.3. Correcting the exercise then
exposed that the adopter updated the neutral protocol without rebinding the
producer host registry. The adopter transaction and exact producer regression
were corrected, the release source changed, and this audit restarted from new
isolated state over only the replacement candidate identified above.

## Independent Method And Results

1. A fresh clone of the remote Task branch resolved exact commit
   `29880a398c26fbc126b13cdaaebe9cf5b7fe7734` with a clean tracked tree. Raw
   POSIX USTAR inspection verified 136 unique safe regular-file members in
   canonical order: 135 use mode `0644`, and
   `dist/nourd-nkf-checker.mjs` is the sole `0755` member.
2. Strict YAML parsing and independent release-manifest inspection verified
   all 135 pre-manifest path, mode, size, and SHA-256 bindings. The sole release
   set covers all 136 archive members, one generated manifest, and all 18
   closed classes without an uncovered or multiply classified member.
3. The exact accepted authority bytes bind at Markdown SHA-256
   `7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1`
   and executable SHA-256
   `a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217`.
   All four 0.4 Schema digests, checker, adopter, fixtures, examples,
   protocols, skills, host adapters, and public documentation match their
   manifest and source bindings.
4. A clean `npm ci --ignore-scripts` and independent `npm audit --json`
   reported zero known vulnerabilities. The lock resolves `fast-uri` `3.1.5`
   and development-only `nanoid` `3.3.18`; the focused tests reject the
   literal-backslash URI-authority path and prove `nanoid` is absent from both
   distributed runtimes.
5. Two clean-clone builds reproduced the exact checker and adopter digests
   above and matched the extracted archive bytes. The tracked source tree
   remained clean. Fresh packaging reproduced the exact candidate archive
   byte-for-byte at SHA-256 `a7912b92...79ecd`.
6. The fresh full suite passed 28 test files and 210 tests. It independently
   exercised initial Product and Technology onboarding, non-breaking 0.3
   update, exact producer host-registry rebinding, approval-gated preserving
   0.1 and 0.2 migration, idempotence, rollback, archive and pin integrity,
   package-chain preservation, knowledge-tamper rejection, and Task mechanics.
7. The checker extracted from the archive passed the 0.4 Product and Technology
   fixtures and both public examples at full-bundle level with zero
   diagnostics. Authority binding remained `not-evaluated` and Governing Use
   remained correctly `not-ready`.
8. The extracted public adopter updated a pristine exact producer clone from
   pinned 0.3 to candidate 0.4 without a breaking approval token, returned
   `updated`, left the complete `knowledge/` tree byte-identical, preserved the
   pinned-first host-superset integration, and passed the complete producer
   gate. A second ordinary candidate Adopt returned `current`. All 135
   source-derived release members were reproduced from the exact release
   commit during that exercise.
9. An exact diff from the merged pre-Task baseline `8c7916d` to the release
   commit found no change in the accepted 0.3 Specification, executable
   contracts, distribution, 0.3 Product or Technology fixtures, or public 0.3
   reference. Historic-commit regression builds also reproduced the frozen
   predecessor artifacts from their own lock and build instructions.

The isolated review used `/private/tmp/nkf-024-audit.ku2UPL`. Candidate source,
archive, extraction, consumer state, and generated release bytes remained
outside the live Task worktree. No repository source, Git reference, remote
release, recommendation, or live producer state was changed by the audit.

## Findings And Boundaries

The verdict is `CLEAN`. No material candidate finding remains.

The following facts remain separate and are not supplied by this audit:

- delegated technical confirmation requires a later exact Decision;
- the 0.4 tag, Github Release, and asset do not yet exist;
- the 0.4 recommendation and real producer pin do not yet exist;
- retrievability of the already published 0.3 asset is a separate live-remote
  observation, although every frozen 0.3 source member reviewed here is
  unchanged;
- a post-publication producer-adoption audit remains mandatory; and
- remote merge enforcement, acceptance binding, and Governing Use readiness
  were not established.

## Audit Conclusion

The exact implementation and archive faithfully realize the accepted NKF 0.4
maintenance, security, compatibility, complete-set, and producer-integration
boundaries. They are suitable for separate delegated technical confirmation
and exact publication. This conclusion performs neither act.
