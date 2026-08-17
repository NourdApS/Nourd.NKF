---
id: nkf-release-documentation-and-adoption
type: realization
title: NKF Release Documentation And Adoption
summary: This Realization describes the NKF-015 successor release-documentation and adoption surface, including agent-led initial onboarding and its updated public adopter while preserving the confirmed native archive.
created_at: 2026-07-31T02:26:24Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
confirmation_status: confirmed
confirmation_decisions:
  - adr-0068
  - adr-0070
---

# NKF Release Documentation And Adoption

## Realization Identity And Kind

This Realization describes the current successor implementation of the
release, documentation, and adoption direction accepted by [ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) and
extended for initial onboarding by [ADR 0067](../../decisions/0067-initial-greenfield-onboarding.md). [ADR 0066](../../decisions/0066-confirm-release-documentation-and-adoption.md) confirms the predecessor
revision. [ADR 0068](../../decisions/0068-confirm-initial-greenfield-onboarding.md) confirms this exact audited successor after its separate
local, remote, and public observations were recorded. [ADR 0069](../../decisions/0069-agent-led-initial-onboarding.md) adopts the
agent-led successor. [ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md) confirms the exact [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) revision after its
publication and fresh-clone verification were recorded separately.

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

The adopter and onboarding source and deterministic build boundary is:

- `scripts/adoption/nourd-nkf-adopt.mjs`;
- `scripts/onboarding/core.mjs`;
- `scripts/build-adopter.mjs`;
- `scripts/verify-adopter.mjs`;
- `dist/nourd-nkf-adopt.mjs`; and
- `test/adopter.test.ts`.

The pre-adoption guidance boundary is:

- `integrations/onboarding/nkf-onboarding-protocol.md`;
- the two byte-identical `nkf-onboarding` skills;
- `scripts/verify-onboarding-guidance.mjs`; and
- `test/onboarding-guidance.test.ts`.

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

Specifications own NKF meaning. [ADR 0065](../../decisions/0065-confirm-current-release-bound-checker.md) confirms the current release-bound
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

`inspect`, `seal`, and `onboard` now precede the existing `install`, `check`,
`status`, `integration-check`, and `update` commands. A participating agent
first reviews the complete repository and records its recommendation and any
required human confirmation. The executable commands then create an external
candidate workspace, bind the assessment, complete mechanical project
snapshot, semantic resolution, and candidate bytes, generate native
declarations, validate a complete staged project, and apply it
transactionally. A same-plan repeat and a same-pin reinstall return
`no-update` only after full project validation passes.

## External Authority And Operational State Boundaries

The predecessor prerelease remains a stale historical operational fact. The
successor content-addressed archive is now published as a private prerelease,
re-downloaded byte-for-byte, independently verified, and recorded in the
recommended-release catalog. The exact release and local consumer observations
are retained in [NKF-008](../../tasks/completed/NKF-008-publish-and-onboard-consumers.md) Evidence.

The public projection is observed at
`https://github.com/kaveh6202/Nourd.NKF.Docs`. Its final public commit is
`002dd567522bbcba6d250b4f878c2ff3fb778026`, and its publication manifest
binds private source commit
`c03d889b8d8ed459e330d9f4e52c9837aa621974`. A fresh public clone matched
every staged byte and all 23 manifest-bound digests.

Github consumer workflow run `30599982716` passed the hardened exact-release
exercise on commit `5a435d54145c31bc091857b1f30520213bdfe6a8`.
Those observations govern the predecessor public projection. The local
[NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) successor contains additional onboarding guidance, exact protocol and
skill mirrors, and a new adopter digest.

The exact [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) source commit
`b50493ddb42c87ed426eeb3bb11d3568652d8130` passed contract run
`30628878063` and consumer-adoption run `30628889305`, both without
annotations. The successor public projection is exact commit
`772d57370a094269ee1d9287ae871b0b3c7f64de`; its manifest binds 27 source
files plus itself to the private source commit and adopter SHA-256
`7533a029053beaccd8f6fec939c2198c5909fd8b5a37a4ba9b5bc0c205bbc7c8`.
A second fresh clone matched every staged byte and both example projects
passed with zero diagnostics.

The [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) successor replaces deterministic semantic eligibility with the
agent-led procedure adopted by [ADR 0069](../../decisions/0069-agent-led-initial-onboarding.md). Its private source commit is
`53ae5217f68731d953f3bf616a578adeb033bb03`. The deliberate recommendation
binds public adopter SHA-256
`c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387`
while retaining the unchanged confirmed native archive, checker, and authority
digests. The allowlisted public projection was observed at exact commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90`; its generated publication
manifest SHA-256 is
`40c77be1543d916946ba09733b2264033f75e7c7e9e4963b5f15291b89dfe2b5`.
A fresh clone matched all 28 staged files and every one of the 27
manifest-bound digests. Both complete example projects passed the confirmed
checker with zero diagnostics. The [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) publication Evidence owns those
time-bound observations.

Live URLs, run identifiers, timestamps, visibility, and publication state
remain owned by their Evidence and external systems rather than by this
durable implementation account.

## Compatibility Verification And Recovery

Focused tests now exercise empty and small-document Product and Technology
onboarding, exact candidate edits, ambiguity, limits, lifecycle deferral,
CommonMark line endings, final and intermediate symbolic links, duplicate and
escaping paths, relevant instruction and package-surface drift, owned-path
conflicts, rollback, existing conventions and source bytes, same-plan
no-update, already-structured installation, full-bundle validation, and
release, pin, skill, and governed Markdown tampering. Eleven adopter tests and
two onboarding-guidance tests cover that boundary.

The public-doc verifier checks the exact 27-file source allowlist, normative
mirror, adopter, onboarding-protocol, and skill mirrors, required subjects,
nine Mermaid diagrams, internal
relative links outside the immutable Specification mirror, forbidden
private-path or credential material, and conformance of both complete
published Product and Technology example projects. Deterministic build
verification compares two adopter builds and the committed output.

The [NKF-015](../../tasks/completed/NKF-015-agent-led-initial-onboarding.md) successor passes nineteen test files with 136 tests,
deterministic checker and adopter builds, guidance verification, public
documentation verification, and full-bundle self-validation once the
deliberate recommendation is bound to the successor adopter. The public
projection was separately published and freshly verified. These observations
do not confirm the revision; [ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md) supplies the separate confirmation act.

The predecessor clean exact release source commit, reproducible archive construction,
independent verification, private prerelease upload, remote re-download,
local published-release consumer exercise, public projection, remote
public-byte verification, Github consumer-workflow execution, and final
adversarial audit remain complete. The native archive is unchanged because no
native authority, Schema, or checker byte changed. [NKF-013](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) successor remote
execution, public publication, fresh-byte verification, final audit, and
confirmation are now complete and separately evidenced.

Installation and onboarding validate a complete isolated candidate before
mutation. Inspection binds relevant instruction, package, workflow,
integration-target, and Git-branch state before resolution. Application
rejects path escapes and symbolic links, preserves predecessor bytes, keeps
post-write verification inside the transaction, restores replaced files and
removes created paths after handled failure, and retains content-addressed
archives for explicit rollback.

The
[completion audit](../../evidence/audits/nkf-008-completion-audit.md) records
no unresolved material finding. [ADR 0066](../../decisions/0066-confirm-release-documentation-and-adoption.md) supplies confirmation separately
from the passing checks and external publication observations.
The later
[NKF-013 Completion Audit](../../evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md)
records the initial-onboarding successor review and repaired findings. ADR
0068 separately confirms this exact revision.
