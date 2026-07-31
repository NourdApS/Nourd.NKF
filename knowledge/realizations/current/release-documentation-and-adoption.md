---
id: nkf-release-documentation-and-adoption
type: realization
title: NKF Release Documentation And Adoption
summary: This Realization describes the current NKF-008 release rebinding, public documentation projection, pinned consumer adopter, and authorized consumer exercise.
created_at: 2026-07-31T02:26:24Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
confirmation_status: confirmed
confirmation_decisions:
  - adr-0066
---

# NKF Release Documentation And Adoption

## Realization Identity And Kind

This Realization describes the confirmed current implementation of the
release, documentation, and adoption direction accepted by ADR 0064 and
confirmed by ADR 0066.

## Governed Meaning Realized

The implementation preserves the native eight-file NKF 0.1 release archive
and adds three separate derived surfaces:

1. one recommended internal release catalog;
2. one allowlisted public documentation projection; and
3. one content-addressed consumer adopter.

The release distributes the accepted authority and confirmed checker. Public
documentation explains NKF and publishes an exact normative Markdown mirror.
The adopter installs and checks a deliberate consumer pin. None of those
derived surfaces accepts consumer knowledge or changes NKF 0.1 meaning.

## Durable Mapping

The release source boundary is:

- `scripts/release/config.mjs`;
- `scripts/release/core.mjs`;
- `scripts/package-release.mjs`;
- `scripts/verify-release.mjs`; and
- `scripts/verify-recommended-release.mjs`;
- `release/recommended.json`; and
- `.gitignore`, which excludes archive products while allowing the reviewed
  recommendation.

The adopter source and deterministic build boundary is:

- `scripts/adoption/nourd-nkf-adopt.mjs`;
- `scripts/build-adopter.mjs`;
- `scripts/verify-adopter.mjs`;
- `dist/nourd-nkf-adopt.mjs`; and
- `test/adopter.test.ts`.

The public documentation boundary is:

- `public-docs/`;
- `scripts/build-public-docs.mjs`;
- `scripts/verify-public-docs.mjs`;
- `scripts/stage-public-docs.mjs`; and
- `test/public-docs.test.ts`.

The consumer exercise boundary is:

- `scripts/exercise-consumer-adoption.mjs`; and
- `.github/workflows/nkf-consumer-adoption.yml`.

The public normative mirror and public adopter are deterministic copies of
the canonical Markdown Specification and built adopter. The committed
publication source does not contain `reference/publication.json`; staging
generates that non-circular binding from a clean exact source commit and the
recommended release catalog.

## Responsibilities And Ownership Boundaries

Specifications own NKF meaning. ADR 0065 confirms the current release-bound
checker and six exact release inputs. Release tooling owns deterministic
construction and verification. Github owns observed Release and repository
state.

The private NKF repository owns the reviewed public-doc source, allowlist, and
publication mechanism. The public docs repository is a projection and cannot
accept edits as NKF authority.

Each consumer authority owns adoption, knowledge acceptance, update, rollback,
and migration. The adopter preserves unrelated instruction content and fails
closed on incompatible owned paths.

## Interfaces Dependencies Locators And Resolution

The adopter is one self-contained Node.js 22 executable. It accepts an
independent full archive SHA-256 plus either a local archive path or the exact
private Github repository locator. It derives the tag and asset name, verifies
the archive and manifest, and installs:

- `.nourd/nkf-release.json`;
- a cached content-addressed archive;
- the exact adopter;
- the neutral protocol;
- two byte-identical portable skills;
- four thin instruction adapters;
- a canonical integration registry and verifier;
- one `npm run nkf:check` command; and
- one exact-commit Github workflow.

`install`, `check`, `status`, `integration-check`, and `update` are the
supported commands. A same-pin reinstall returns `no-update` only after the
current installation and full project validation pass.

## External Authority And Operational State Boundaries

The predecessor prerelease remains a stale historical operational fact. The
successor content-addressed archive is now published as a private prerelease,
re-downloaded byte-for-byte, independently verified, and recorded in the
recommended-release catalog. The exact release and local consumer observations
are retained in NKF-008 Evidence.

The public projection is observed at
`https://github.com/kaveh6202/Nourd.NKF.Docs`. Its final public commit is
`002dd567522bbcba6d250b4f878c2ff3fb778026`, and its publication manifest
binds private source commit
`c03d889b8d8ed459e330d9f4e52c9837aa621974`. A fresh public clone matched
every staged byte and all 23 manifest-bound digests.

Github consumer workflow run `30599982716` passed the hardened exact-release
exercise on commit `5a435d54145c31bc091857b1f30520213bdfe6a8`.
Live URLs, run identifiers, timestamps, visibility, and publication state
remain owned by their Evidence and external systems rather than by this
durable implementation account.

## Compatibility Verification And Recovery

Focused tests exercise Product and Technology installation, local full-bundle
validation, same-pin no-update, private-release tampering, pin tampering,
skill tampering, governed Markdown tampering, and conflicting consumer-owned
workflow preservation.

The public-doc verifier checks the exact 23-file source allowlist, normative
mirror, adopter mirror, required subjects, eight Mermaid diagrams, internal
relative links outside the immutable Specification mirror, forbidden
private-path or credential material, and conformance of both complete
published Product and Technology example projects. Deterministic build
verification compares two adopter builds and the committed output.

The clean exact release source commit, reproducible archive construction,
independent verification, private prerelease upload, remote re-download,
local published-release consumer exercise, public projection, remote
public-byte verification, Github consumer-workflow execution, and final
adversarial audit are complete.

Installation stages all target bytes, rejects path escapes and symbolic links,
preserves predecessor bytes, restores replaced files after an interrupted
replacement, and retains content-addressed archives for explicit rollback.

The
[completion audit](../../evidence/audits/nkf-008-completion-audit.md) records
no unresolved material finding. ADR 0066 supplies confirmation separately
from the passing checks and external publication observations.
