# NKF-010 Frontmatter Realization Candidate Audit

## Audit Boundary

This is a separate, read-only assessment of the governed-frontmatter
Realization candidate produced by NKF-010. It was performed after normative,
executable, checker, fixture, knowledge, declaration, and current-system
changes were assembled, but before ADR 0059 supplied Realization confirmation.

The audit distinguishes accepted meaning, candidate Realization, conformance,
and confirmation. It does not accept a Specification, confirm an
implementation, or treat test success as authority.

## Requirements Evaluated

The candidate was evaluated against the NKF-010 requirements and ADR 0058:

1. one required common orientation envelope for every represented
   non-Evidence Markdown document;
2. exact record identity and declared-governance agreement among frontmatter,
   CommonMark H1, and `.nourd`;
3. separate Task state, Design disposition, record governance, and
   Realization confirmation vocabularies;
4. explicit, path-independent Evidence exemption;
5. exact UTC-second creation timestamps and no generic `updated_at`;
6. closed document-class keys and deterministic reference resolution;
7. stable diagnostic coverage for every accepted failure class;
8. complete NKF repository migration without altering preserved Evidence;
9. source, Schema, checker, fixture, declaration, and artifact digest
   coherence; and
10. accurate current-system Realization knowledge.

## Exact Accepted Authority Observed

| Artifact | Observed SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be` |
| `contracts/nkf/0.1/nkf.yaml` | `b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd` |
| `knowledge/designs/adopted/governed-frontmatter.md` | `cae728944979f2341d431606da7b5362e2a25b254b3f8c318e5f6790a57c6312` |

The Markdown digest equals the YAML authority binding and
`src/checker/bindings.ts`. The executable digest equals the checker binding.
ADR 0058 records the same Design and authority-pair revisions.

## Exact Derived Artifacts Observed

| Artifact | Observed SHA-256 |
| --- | --- |
| Bundle Schema | `05f9303d799f8e07a64dc2fb571317ca3d28491dd02d5ed0a446b77065468a1f` |
| Record Schema | `397f83707112022b16f7860882e3b48afb83b9c46c62cc82043483e7a727859b` |
| Validation-result Schema | `155f94a6c3ff7c86a57c58590fa9d3a6a2afc609a5ab6a9a6191a9c9e9708248` |
| Release-manifest Schema | `00058b5e86f29edb005f0a4125125c32ccd18a986a244c69f60f8605cab11f23` |
| Checker source | `025d6129a1f9b0ccb2b64da749834995e70a44de620fde95e830e0bdf4a69276` |
| Checker bindings | `aff8a851347a40a712ce0621a8b91bcbc968645c1644ccb3a203555032d79d1c` |
| Deterministic build | `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7` |

All four Schemas carry the accepted authority-pair source annotation. The
three validation-time Schema digests equal the checker bindings. The bundle
Schema alone changes an assertion by adding explicit `task` and `evidence`
non-record kinds; the other Schema assertion graphs remain predecessor
compatible.

## Exact Realization Candidates Observed

| Record | Observed SHA-256 |
| --- | --- |
| `nkf-0.1-native-realization` | `b92ecd0ce26dd2ab043841cfb5bc1698363af15302cf71ecc5f3219358eb9175` |
| `nkf-checker-and-validation` | `b23ef0940fddd52b906c3a1a1f49cf43cfd5396a996c90789375227b68bf5596` |
| `nkf-contracts-and-schemas` | `966ccd6013e46d22ead1a1162c9e116169a8dd1bddd8b68f7ad7b8527ce21591` |
| `nkf-release-package` | `f6d827e07c8f0c397dd5664fab0f93d3a0d892d2515f4fbe56856b2c00d55015` |
| `nkf-self-hosting` | `c179c4592961c194284d4eb779db825ead626206ce5a842d84b7950783aa5251` |

These exact revisions expose `confirmation_status: confirmed` and
`confirmation_decisions: [adr-0059]` as a staged candidate. The reference
cannot become valid or authoritative until the Decision exists and exercises
the separately authorized confirmation act.

## Verification Performed

- `git diff --check` passed.
- TypeScript type checking passed.
- Fourteen test files excluding the intentionally staged self-host test
  passed 101 of 101 tests.
- Deterministic build verification reproduced
  `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`.
- Strict contract loading, diagnostic parity, Schema compilation, valid
  Product and Technology fixtures, negative frontmatter cases, explicit
  Evidence behavior, duplicate Task identity, and source-binding checks
  passed.
- Repository validation passed contract, parse, Schema, project, and security
  phases. Its only diagnostics were five
  `markdown.frontmatter.reference.unresolved` errors, one for each exact
  Realization candidate's staged `adr-0059` reference.
- The bundle represented 87 candidate records and 46 non-records, including
  this separate audit Evidence, before the confirmation Decision. It bound 62
  governed artifacts, including both Task files required to make the valid
  fixtures complete.
- A body-byte comparison against the predecessor commit found changes only in
  the canonical Specification, five current Realizations, and the Task index.
  Every other predecessor Markdown body remained byte-identical after
  removing its old and new frontmatter envelopes.
- No pre-existing file under `knowledge/evidence/` changed. New NKF-010 audit
  Evidence is additive.

## Findings Corrected During The Audit

1. The canonical Specification frontmatter identified NKF-010, but its body
   still called NKF-007 and ADR 0056 the current revision boundary. The body
   now identifies NKF-010 and ADR 0058 while preserving predecessor
   provenance.
2. The two new valid-fixture Task sources participated in fixture
   conformance but were absent from the self-host bundle's governed artifact
   set. Both are now digest-bound.
3. A negative Technology test reclassified a Specification source as a
   non-record without changing its frontmatter class. The test now supplies
   valid common-only non-record orientation before exercising the intended
   missing-Specification rule.
4. Initial tests did not directly prove safe-envelope parsing for exempt
   Evidence, Evidence-record orientation exemption, or duplicate Task
   identity rejection. Dedicated negative coverage now passes.
5. Adding ADR 0059 resolved the staged source references and unlocked the
   record-contract phase. That phase exposed unsupported section roles and
   incomplete Design responsibility bindings in the new Design and Decision
   declarations. The declarations now use only body-contract-supported roles
   and bind every required Design and Decision responsibility.

## Independent Consistency Assessment

The Markdown and YAML define the same applicability matrix, field vocabulary,
Evidence boundary, conditional lifecycle shapes, reference namespaces, and
diagnostics. The checker implements those deterministic allocations without
claiming summary adequacy, Task operational truth, acceptance, or
confirmation.

The repository migration is coherent with the accepted model: every
non-Evidence representation receives its applicable orientation; Evidence
classification is explicit; declaration and artifact digests are current;
and predecessor substantive bodies remain unchanged except where this Task
intentionally revises current authority, Realization, or navigation.

The current release package remains explicitly stale and deferred. That is a
pre-existing publication boundary rather than a defect in the native
frontmatter Realization.

## Post-Confirmation Completion Pass

After ADR 0059 was added and the derived declaration findings above were
corrected:

- repository self-validation passed every applicable phase with no
  diagnostic;
- the Technology profile binding was verified;
- all 88 records were evaluated;
- all 15 test files and 102 tests passed;
- type checking, build, and deterministic build verification passed; and
- the accepted Markdown/YAML pair, Schema bindings, 46 non-record
  representations, 62 governed artifacts, and complete knowledge coverage
  remained coherent.

Authority-binding verification remains not requested in the native
full-bundle run. That state does not weaken structural conformance and does
not turn declared acceptance or confirmation into verified external
authority.

## Audit Outcome

No unresolved material implementation, migration, representation, or
authority-binding defect remains within the accepted NKF-010 scope.

The five earlier unresolved `adr-0059` references were an intentional
authority-stage precondition, not a checker or migration defect. ADR 0059 now
supplies that separate confirmation act, and the post-confirmation completion
pass proves the resulting native bundle conforms without treating conformance
as confirmation.
