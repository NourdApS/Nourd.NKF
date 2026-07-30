# NKF-007 Final Repository Audit

## Question And Boundary

This audit evaluates the NKF-007 candidate repository from normative,
architectural, semantic, structural, enforcement, provenance, navigation, and
self-hosting angles before final Realization confirmation.

It is Evidence. It does not accept meaning, adopt a Design direction, confirm
a Realization, publish a release, or create a conformance result by
implication.

## Verified Facts

1. ADR 0056 accepts one digest-bound NKF 0.1 authority pair:
   - normative Markdown SHA-256
     `52daa84db3067e39d8868f190874bb3a75328589d00127fecd7cb299312fa4ed`;
   - executable YAML SHA-256
     `9bd57b1a3c9992ff30a50d5e90ba7f7ef55d56f5aa4a38a5a463e711e07a1136`.
2. The executable companion binds the exact normative Markdown digest and
   uses `nkf.record` as the single NKF 0.1 native record contract.
3. The current Design vocabulary is coherent:
   - a Design proposes a direction;
   - a Decision adopts, rejects, or supersedes that direction;
   - an owner may withdraw it;
   - acceptance applies to an exact record revision;
   - disposition and record authority are independent axes.
4. The three core JSON Schemas bind the accepted pair and preserve the
   predecessor assertion graphs apart from non-assertive source-binding
   annotations.
5. Every current Design has exactly one front-matter disposition that agrees
   with its directory and has the required Decision or supersession
   provenance.
6. The candidate self-host bundle has 84 explicit record declarations and 42
   explicit non-record entries. All 126 Markdown files under `knowledge/` are
   represented exactly once, with no missing, duplicate, or extra path.
7. Every declared record source and all 60 governed artifacts exist and match
   their declared SHA-256 digest.
8. All 103 non-Evidence Markdown files inspected across current repository
   sources and fixtures have a first-line front-matter envelope and an exact
   UTC-seconds `created_at` value.
9. Decision filenames follow the current numeric-subject convention. Current
   Design and Task directory placement agrees with explicit disposition or
   state.
10. No symlink exists outside ignored dependency and Git internals.
11. Current navigation and record links resolve. Byte-preserved historical
    Evidence retains some predecessor-location links by design; its original
    finding was not rewritten.
12. `npm run check` passes:
    - TypeScript type checking;
    - 15 test files and 93 tests;
    - build;
    - deterministic build verification.
13. The candidate build identity is `nourd-nkf-checker` with SHA-256
    `2d32d43b43788d3d874c7ffef4e01fa370d6467d93fc5c6f62fb088b269e4bc3`.
14. A non-persisting full-bundle validation passes all applicable phases with
    zero diagnostics and a verified Technology Profile binding. Acceptance
    authority binding was not requested and remains not evaluated.

## Material Concerns Resolved In NKF-007

- The current system no longer has to be reconstructed by reading every
  historical Design and Decision. A consolidated Realization entry view and
  four supporting Realizations now exist.
- Designs, Decisions, Specifications, Realizations, Tasks, and Evidence have
  distinct responsibilities and navigable locations.
- Procedural Decision filenames and mixed Design classifications have been
  replaced by concise subjects and explicit dispositions.
- Required front matter is separated from CommonMark semantic meaning while
  exact source bytes remain validation inputs.
- Heuristic declaration generation and one-time heading normalization are no
  longer active tools.
- The self-host declarations are explicit rather than inferred from paths,
  filenames, headings, or keywords.

## Remaining Confirmation Blockers

At the time of this audit, three steps remain:

1. update the current-system and supporting Realizations from candidate or
   stale language to the exact observed implementation state;
2. record an immutable Decision confirming those exact Realization and
   implementation revisions without claiming publication or authority
   verification; and
3. add that Decision’s declaration, refresh the complete bundle, rerun all
   gates, and persist only the latest passing full-bundle result.

## Deferred Gaps And Boundaries

These are not NKF-007 failures:

- release publication and consumer onboarding remain deferred to NKF-008;
- broad governed-artifact secret scanning remains deferred to NKF-009;
- validation expiry and authority freshness remain deferred to NKF-005;
- portable presentation guidance remains deferred to NKF-004;
- root models beyond the current Product and Technology Profiles remain
  deferred to NKF-006;
- the existing release configuration remains bound to the earlier release
  baseline until NKF-008 deliberately rebinds and verifies it; and
- passing validation does not verify acceptance authority, semantic adequacy,
  publication, or consumer migration.

## Recommendation

Proceed with the three remaining confirmation steps. Do not change the
accepted authority pair, publish a release, or migrate an external consumer
inside NKF-007.
