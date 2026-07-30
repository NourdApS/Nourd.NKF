# NKF Pre-Remediation Whole-Repository Audit

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T15:52:40Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Purpose

This record preserves the independent, read-only whole-repository audit
completed immediately before the Human Product Owner redirected NKF toward a
Current System Model and a fundamental knowledge-structure repair.

The audit distinguishes verified realization facts from blockers, material
concerns, and recommendations. It does not accept meaning, confirm a changed
Realization, or establish conformance for a later repository state.

## Audited Boundary

The audit examined the local `master` worktree in the independent
`kaveh6202/Nourd.NKF` repository. At that boundary:

- local `HEAD` and `origin/master` were
  `aa4bfb41ab2944e4e03fa659a95321f465aca25c`;
- the dynamic-root and self-hosting work remained uncommitted;
- the worktree contained 68 modified and 16 untracked paths; and
- the published prerelease still targeted the earlier Product-only release
  checkpoint `50fbc53c7ec1022598029780b5159d5a91c4a087`.

## Verified Facts

- Repository identity, remote, branch, and ownership boundaries matched
  repository instructions.
- The canonical NKF 0.1 Markdown SHA-256 was
  `8fa484035c2fccf401cb966cf39ae57e17d214178c0153ad43d53790d7832e50`.
- The executable YAML SHA-256 was
  `fd60ad052ff5b58a20b285fec03aede560cd84d18221f7b2d88b7db7fdf67dbd`.
- The bundle, record, and validation-result schema SHA-256 values matched ADR
  0052.
- The portable checker SHA-256 was
  `9d7f63778c8794ef5326b4704d0daac5c6eac7e65c5df17bd4c95d19d1fd8f57`.
- Type checking, build-integrity verification, and all 90 tests in 15 test
  files passed.
- The production dependency audit reported no known vulnerabilities.
- The NKF self-host bundle represented all 103 Markdown files under
  `knowledge/` exactly once as 85 records and 18 non-records.
- All 60 declared governed-artifact digests matched.
- A fresh full-bundle check selected `nkf.profile.technology`, passed with zero
  diagnostics, and produced snapshot
  `46dd06d6a362b9941dda61f9c950ada328836b0f4a0d983f3eca91cb500c2105`
  over 284 inputs.
- Governing Use Ready was `not-ready`; 54 accepted declarations had no
  verified acceptance binding and 31 declarations were Draft.
- The bounded self-hosting migration changed only headings in the 43 audited
  tracked record sources: all 494 changed content lines were H1, H2, or H3
  lines.
- In an isolated temporary checkout, two declaration-generator executions
  reproduced the checked-in `.nourd/knowledge` tree byte-for-byte.

## Material Finding One: Generated Semantic Bindings

The self-host declaration generator assigns responsibilities through heading
keyword scoring. When no heading matches, it silently selects the first
section. Audit reproduction found 236 zero-match bindings affecting 83 of 85
records.

The generated Technology root provides a concrete error: responsibility
`technology-map` is bound to `Technology Definition` even though the exact
`Technology Map` section exists and receives no responsibility.

The generator creates typed record relationships only for the Technology
root, canonical Specification, and native Realization. Accepted Decisions that
explicitly supersede earlier Decisions therefore serialize with empty
relationships despite the current Specification requiring a typed
`supersedes` or `extends` relationship for correction, extension,
replacement, or reversal.

The passing result consequently proves declaration conformance, not semantic
adequacy or truthful responsibility and relationship mapping. ADR 0052
correctly listed semantic adequacy as a non-claim, but confirmation did not
surface the concrete scale and examples of the gap.

## Material Finding Two: Inferred Acceptance

The generator classifies every Markdown path matching
`decisions/<four digits>-*.md` as an accepted immutable Decision. It does not
derive or verify that status from exact accepted authority.

The NKF Technology root is also hardcoded as accepted. Its declaration binds
source digest
`70bc4ed863f2821898c92c57020190ba040f05ee0158c4963775ca4745fd06fb`,
but the audit found no repository Decision that binds and accepts that exact
root revision. ADR 0050 accepts the exact canonical Specification and
executable YAML pair, while ADR 0052 confirms derived self-hosting
Realization.

The unavailable acceptance bindings prevent the result from claiming
Governing Use Ready, but generation must still not infer an acceptance claim.

## Material Finding Three: Governed-Artifact Secret Coverage

Technology governed artifacts participate in Governed Validation Inputs and
the validated snapshot. The accepted native secret scope and checker scan,
however, cover only the bundle manifest, direct YAML declarations, and
Markdown under `knowledge_root`.

An adversarial temporary Technology fixture placed a registry-matching Github
token in a governed TypeScript artifact and updated its declared artifact
digest. Full-bundle validation still passed, emitted no
`security.secret-pattern` diagnostic, and marked the security phase passed.

The checker matches the accepted scan scope, so this is a contract-coverage
issue rather than an implementation deviation. Changing it requires governed
specification, contract, fixture, checker, release, and migration treatment.

## Material Finding Four: Repository And Release Durability

The current Common, Product, and Technology authority pair, derived schemas,
checker changes, self-host declarations, and ADRs 0049 through 0052 existed
only in the local worktree at the audited boundary.

The published prerelease was internally consistent but remained the earlier
Product-only package. No committed checkpoint or released package supplied
the current dynamic-root contract to another consumer.

## Additional Concerns

- The Decision index described several historical authority pairs and schema
  realizations as current simultaneously.
- The authority map assigned repository identity and working rules to root
  `README.md` and `AGENTS.md`, while neither file participated in the
  self-host validated snapshot.
- Twenty-nine non-Markdown proposal and schema artifacts referenced by
  accepted Decisions were not Governed Validation Inputs.
- The source-reconciliation Evidence retained an unresolved provenance limit:
  the imported checker archive digest could not be reproduced and the
  recorded Studio source commits were not independently reachable at the
  recorded audit time.
- The one-time heading-normalization tool remained capable of rewriting
  current record sources after the governed migration.
- The generator had no documented operator command or automated
  regeneration-equality gate in the ordinary development check.
- Six unresolved relative links existed only inside deliberately preserved,
  partial source snapshots; active repository knowledge links resolved.

## Audit Conclusion

The Common, Product, and Technology architecture and the derived mechanical
checker realization were coherent enough to produce current local
conformance. The repository was not ready for a new release or consumer
migration because semantic declaration review, acceptance derivation,
governed-artifact security coverage, current authority durability, and
knowledge navigation still required governed repair.

The audit recommended addressing semantic declaration truthfulness first,
then acceptance state, secret coverage, Governed Validation Input coverage,
navigation and indexes, confirmation safety, committed authority, and a new
dynamic-root prerelease.

## Post-Audit Direction

After reviewing these findings, the Human Product Owner identified a more
fundamental missing layer: NKF needs a Current System Model that consolidates
the current accepted architecture, topology, design, and Realization map so
agents can audit from a trustworthy current baseline and selectively follow
Decision provenance.

The Human Product Owner also identified poor knowledge navigation, unresolved
Design disposition, file-naming problems, and missing human-readable
front-matter and UTC timestamp rules. Those problems are now owned by
`NKF-007`; the findings above remain preserved input rather than being fixed
piecemeal against the old structure.
