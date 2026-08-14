---
title: NKF-027 Open-Source Licensing Preparation Assessment
summary: Source-grounded assessment of NKF repository ownership evidence, third-party licenses and notices, package and source-header treatment, organization-transfer references, private distribution assumptions, and separately governed public-project policies before Apache-2.0 preparation.
created_at: 2026-08-13T19:01:20Z
---

# NKF-027 Open-Source Licensing Preparation Assessment

## Scope And Method

This Evidence supports
[NKF-027](../../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It assesses licensing preparation only. It does not supply legal advice,
accept a license, change repository visibility, publish a release, confirm a
Realization, or establish conformance.

The assessment inspected:

- all `1,003` tracked repository paths and their file kinds;
- all `188` commits and distinct recorded Git author identities;
- imported Nourd Studio source snapshots and decision inputs;
- root and package licensing metadata;
- the locked dependency graph and license metadata;
- the exact esbuild input graph for the checker and adopter with `write: false`;
- package-provided license and notice files for every bundled runtime package;
- current build, release-set, archive, workflow, recommendation, pin, public
  guidance, and adoption behavior;
- every non-archive occurrence of `kaveh6202/Nourd.NKF`; and
- read-only live Github repository, branch, tag, and release metadata through
  the transferred repository identity.

The official reference set was the unmodified
[Apache License 2.0 text](https://www.apache.org/licenses/LICENSE-2.0.txt),
Apache's descriptive
[application guidance](https://www.apache.org/legal/apply-license.html), the
[SPDX Apache-2.0 entry](https://spdx.org/licenses/Apache-2.0.html), and the
Unicode Consortium's
[Unicode licensing account](https://www.unicode.org/faq/unicode_license.html).
Those external sources own their own current content.

## Current Repository Licensing State

No tracked root `LICENSE`, `NOTICE`, `COPYING`, `THIRD_PARTY_NOTICES`,
`TRADEMARKS`, `GOVERNANCE`, `CONTRIBUTING`, `SECURITY`, or Code of Conduct file
exists at this checkpoint.

`package.json` declares `private: true` and has no `license`, `repository`,
`homepage`, or `bugs` metadata. The root package-lock entry likewise has no
license or repository metadata. `private: true` prevents accidental npm
publication; it does not itself make a repository proprietary, license its
contents, or require the Github repository to remain private.

The three tracked installed release archives for NKF 0.3, 0.4, and 0.5 carry
the built checker and adopter but no root license, NOTICE, or third-party
notice member. They are immutable historical release bytes and cannot be
rewritten. A successor release can stop recommending a defective predecessor
and carry a complete licensing set without changing those archives.

## Repository Authorship And Licensability Evidence

The complete Git history contains three recorded author strings:

- `Kaveh <kaveh.majidi@visma.com>`;
- `kaveh majidy <kaveh.majidi@visma.com>`; and
- `kaveh majidy <kaveh.majidy@gmail.com>`.

No commit under another recorded author identity was found. The imported
Nourd Studio provenance consists of two immutable source snapshots containing
`24` files in total; the importing NKF commit is also recorded under Kaveh's
identity. No Git submodule, symbolic-link entry, tracked `vendor` directory,
or separately vendored package tree was found.

These facts reduce but do not eliminate the ownership question. Repository
history does not prove whether each Kaveh-authored contribution and each
Nourd Studio source byte is personally owned, work made for Nourd ApS, or
assigned to Nourd ApS. The Human Product Owner has directed Nourd ApS
attribution and complete-repository licensing, but the repository carries no
employment, assignment, contributor agreement, or other legal-rights record.
Licensing readiness therefore requires an explicit Company-side confirmation
that Nourd ApS has authority to license those Nourd-authored and imported
bytes. This is a rights-provenance checkpoint, not a finding that Nourd ApS
lacks those rights.

Immutable Evidence may quote, preserve, or bind third-party facts without
making them Nourd-authored. No tracked third-party source was identified
outside package-derived bundled code and Unicode-derived data described
below. A later audit must re-run this inventory against the exact release
candidate.

## Dependency And Bundled-Code Inventory

The lockfile contains `146` installed package entries. Their declared license
counts are:

| SPDX Or Declared License | Package Entries |
| --- | ---: |
| `MIT` | 137 |
| `ISC` | 3 |
| `BSD-2-Clause` | 2 |
| `BSD-3-Clause` | 2 |
| `Apache-2.0` | 2 |

No missing license value or copyleft license appears in the locked package
metadata. These permissive licenses are compatible with distributing Nourd's
own work under Apache-2.0 when each third-party component remains under its
own terms and its required copyright, permission, attribution, and disclaimer
text is retained.

The exact esbuild input graph shows that the distributed checker bundles ten
package identities and the adopter bundles nine:

| Package | Locked Version | Declared License | Checker | Adopter |
| --- | --- | --- | --- | --- |
| `@unicode/unicode-17.0.0` | `1.6.17` | `MIT` package metadata; Unicode-derived data requires separate Unicode notice review | yes | no |
| `ajv` | `8.20.0` | `MIT` | yes | yes |
| `ajv-formats` | `3.0.1` | `MIT` | yes | yes |
| `commonmark` | `0.31.2` | `BSD-2-Clause` plus bundled-file subnotices | yes | yes |
| `entities` | `3.0.1` | `BSD-2-Clause` | yes | yes |
| `fast-deep-equal` | `3.1.3` | `MIT` | yes | yes |
| `fast-uri` | `3.1.5` | `BSD-3-Clause` | yes | yes |
| `json-schema-traverse` | `1.0.0` | `MIT` | yes | yes |
| `mdurl` | `1.0.1` | `MIT` plus a retained Joyent/Node notice | yes | yes |
| `yaml` | `2.9.0` | `ISC` | yes | yes |

The CommonMark package license also identifies benchmark samples under MIT
and a CommonMark specification test file under `CC-BY-SA-4.0`. The esbuild
input graph does not include those benchmark or specification-test files, so
the distributed checker and adopter do not carry that `CC-BY-SA-4.0`
material.

The Unicode package declares MIT in its package metadata and README, but the
checker bundles generated Unicode 17 property and case data. The Unicode
Consortium states that Unicode data files are generally governed by the
Unicode License, whose current SPDX identifier is `Unicode-3.0`. The exact
0.6 third-party notice set must therefore preserve both the package's own MIT
attribution and the applicable Unicode data attribution and license rather
than assuming package metadata erases source-data rights.

Development-only packages and Github Actions are not copied into the NKF
release merely because the repository builds or invokes them. Their own
licenses remain applicable to their installed or remotely executed copies,
but they do not require Nourd to relicense them under Apache-2.0.

## Material Notice Defect

Both build scripts set esbuild `legalComments: "none"`. The built adopter and
checker contain no detected third-party copyright, MIT, BSD, ISC, Apache, or
Unicode license text. The current release archives also carry no separate
license or notice member.

The 0.6 distribution must correct this without modifying earlier archives.
At minimum its exact release set must carry:

1. the unmodified Apache License 2.0 root `LICENSE`;
2. the exact Human-Product-Owner-approved informational root `NOTICE`;
3. a separate third-party notices artifact retaining every required bundled
   runtime copyright, permission, attribution, disclaimer, and Unicode-data
   license; and
4. deterministic verification that the license and notice members correspond
   to the exact bundled dependency graph.

The root `NOTICE` text is fixed by Human direction and cannot also become an
open-ended third-party inventory. A separately named third-party notices file
keeps that exact attribution unchanged while preserving component terms.

## Package Metadata And Source Headers

The package needs at least:

- `license: "Apache-2.0"`;
- current repository metadata for `NourdApS/Nourd.NKF`; and
- matching root package-lock license metadata. npm's lockfile root projection
  does not retain the package repository, homepage, or issue fields.

Keeping `private: true` is appropriate until npm or another package-registry
publication is separately authorized. Open-source licensing and npm
publication are independent.

The Apache license appendix supplies a standard per-file boilerplate and the
Apache Foundation's descriptive guidance recommends short headers in original
source documents. The license itself requires one copy of the license for
recipients and preservation of applicable notices; it does not require
rewriting every historical file merely to add a header.

A blanket header insertion is unsafe for NKF because it would:

- mutate immutable accepted records and historical Evidence;
- alter frozen or exact-digest-bound sources;
- invalidate generated files and fixtures;
- add unsupported comments to strict JSON or other comment-free formats; and
- create large semantic-review and release noise unrelated to authorship.

The technically sound initial boundary is therefore root `LICENSE`, root
`NOTICE`, a complete third-party notices artifact, and package SPDX metadata,
with no mass historical header rewrite. If per-file headers are later desired,
the exact eligible Nourd-owned, mutable, comment-capable source classes and
generated-file exclusions should be decided and applied prospectively under a
separate mechanically verified rule.

## Organization Transfer And Reference Classification

Read-only Github API evidence at this checkpoint reports:

- repository `NourdApS/Nourd.NKF`;
- visibility `private`;
- default branch `master`;
- `archived: false`; and
- `disabled: false`.

Both old and new Git HTTPS endpoints resolve to remote `master` commit
`af036489...`. The current organization endpoint reports active branch
`task/NKF-025` at `d753383...` and the 0.5 release tag at exact source commit
`777ea9a3...`. The existing 0.5 prerelease remains private and its live
release and asset URLs now use `NourdApS/Nourd.NKF`. The configured local
remote still uses the old redirected endpoint; changing it is Git-state
mutation and is not authorized by this assessment.

There are `68` candidate regular-file paths containing
`kaveh6202/Nourd.NKF` at this checkpoint after excluding the three immutable
tracked `.tar` archives. The inventory was reproduced from the union of
tracked paths and non-ignored candidate paths, then matched literally and
sorted. It divides into these treatment classes:

| Class | Paths | Required Treatment |
| --- | ---: | --- |
| Immutable historical Decisions, Evidence, accepted Designs, and Specifications | 32 | Preserve exact bytes and provenance. Use successor records for current identity. |
| Frozen 0.2 through 0.5 executable contracts and Schemas | 9 | Preserve. Their repository constants are part of immutable version authority. |
| Historical public Specification mirrors | 4 | Preserve as mirrors of frozen sources. |
| Completed or cancelled Task history | 2 | Preserve historical facts. |
| Immutable adopted current Design direction | 1 | Preserve the accepted exact bytes; current authority still belongs to a later exact Specification rather than the Design. |
| Living/current Task or Evidence review | 3 | Review individually; update only where the statement claims current identity rather than historical context. |
| Current source, tests, workflows, and fixtures | 10 | Derive 0.6 current-identity and distribution behavior; keep predecessor fixtures exact where they test old versions. |
| Built, installed, or public derived adopter copies | 3 | Never hand-edit; rebuild or migrate from accepted current source. |
| Current recommendation and installed pin | 2 | Preserve until a deliberate 0.6 recommendation and adoption transaction replaces them. |
| Mutable current documentation | 1 | Update through the successor repository-identity and public-boundary authority. |
| Immutable confirmed release-documentation Realization | 1 | Preserve and create a successor current Realization rather than editing it. |

The exact per-path classification ledger is:

### Immutable Historical Decisions, Evidence, Designs, And Specifications

- `knowledge/decisions/0001-independent-nkf-authority.md`
- `knowledge/decisions/0042-release-distribution.md`
- `knowledge/decisions/0064-release-documentation-and-adoption.md`
- `knowledge/decisions/0065-confirm-current-release-bound-checker.md`
- `knowledge/designs/adopted/initial-release-distribution.md`
- `knowledge/designs/adopted/release-documentation-and-adoption.md`
- `knowledge/evidence/audits/nkf-007-current-structure-inventory.md`
- `knowledge/evidence/audits/nkf-008-public-documentation-publication.md`
- `knowledge/evidence/audits/nkf-008-release-publication-and-local-adoption.md`
- `knowledge/evidence/audits/nkf-011-remote-enforcement-activation.md`
- `knowledge/evidence/audits/nkf-015-publication-and-verification.md`
- `knowledge/evidence/audits/nkf-020-release-publication.md`
- `knowledge/evidence/audits/nkf-020-unified-adopt-public-documentation.md`
- `knowledge/evidence/audits/nkf-020-unified-adopt-publication.md`
- `knowledge/evidence/audits/nkf-024-dependency-security-baseline.md`
- `knowledge/evidence/audits/nkf-024-nkf-0-4-publication.md`
- `knowledge/evidence/audits/nkf-026-nkf-0-5-publication.md`
- `knowledge/evidence/audits/nkf-whole-repository-development-support-audit.md`
- `knowledge/evidence/audits/pre-remediation-repository-audit.md`
- `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-proposal.yaml`
- `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-release-manifest-schema-proposal.json`
- `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-specification-proposal.md`
- `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-manifest-schema-proposal.json`
- `knowledge/evidence/decision-inputs/adr-0054/nkf-0.1.md`
- `knowledge/evidence/decision-inputs/adr-0054/nkf.yaml`
- `knowledge/evidence/decision-inputs/adr-0072/nkf-0.1.md`
- `knowledge/evidence/decision-inputs/adr-0072/nkf.yaml`
- `knowledge/specifications/nkf-0.2.md`
- `knowledge/specifications/nkf-0.3.md`
- `knowledge/specifications/nkf-0.4.md`
- `knowledge/specifications/nkf-0.5.md`
- `knowledge/specifications/nkf-0.5-revision-2.md`

### Frozen Executable Contracts And Schemas

- `contracts/nkf/0.2/nkf.yaml`
- `contracts/nkf/0.2/schemas/release-manifest.schema.json`
- `contracts/nkf/0.3/nkf.yaml`
- `contracts/nkf/0.3/schemas/release-manifest.schema.json`
- `contracts/nkf/0.4/nkf.yaml`
- `contracts/nkf/0.4/schemas/release-manifest.schema.json`
- `contracts/nkf/0.5/nkf.yaml`
- `contracts/nkf/0.5/revision-2/nkf.yaml`
- `contracts/nkf/0.5/schemas/release-manifest.schema.json`

### Historical Public Specification Mirrors

- `public-docs/reference/nkf-0.2.md`
- `public-docs/reference/nkf-0.3.md`
- `public-docs/reference/nkf-0.4.md`
- `public-docs/reference/nkf-0.5.md`

### Completed Task History

- `knowledge/tasks/completed/NKF-003-independent-nkf-authority.md`
- `knowledge/tasks/completed/NKF-008-publish-and-onboard-consumers.md`

### Immutable Adopted Current Design Direction

- `knowledge/designs/items/nkf-0-6-corrective-release-and-open-source-licensing.md`

### Living Or Current Task And Evidence Review

- `knowledge/evidence/audits/nkf-027-open-source-licensing-preparation-assessment.md`
- `knowledge/tasks/deferred/NKF-012-activate-protected-merge-gate.md`
- `knowledge/tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md`

### Current Source, Tests, Workflows, And Fixtures

- `.github/workflows/nkf-consumer-adoption.yml`
- `scripts/adoption/nourd-nkf-adopt.mjs`
- `scripts/package-release.mjs`
- `scripts/release/core.mjs`
- `scripts/verify-recommended-release.mjs`
- `test/adopter.test.ts`
- `test/release-manifest-0-3-schema.test.ts`
- `test/release-manifest-0-4-schema.test.ts`
- `test/release-manifest-schema.test.ts`
- `test/release-set-0-4.test.ts`

### Built, Installed, Or Public Derived Adopter Copies

- `.nourd/tools/nkf/nourd-nkf-adopt.mjs`
- `dist/nourd-nkf-adopt.mjs`
- `public-docs/tools/nourd-nkf-adopt.mjs`

### Current Recommendation And Installed Pin

- `.nourd/nkf-release.json`
- `release/recommended.json`

### Mutable Current Documentation

- `README.md`

### Immutable Confirmed Realization

- `knowledge/realizations/current/release-documentation-and-adoption.md`

The public documentation repository `kaveh6202/Nourd.NKF.Docs` is a separate
repository identity and was not verified as transferred. This NKF-only scope
does not authorize renaming, relicensing, or changing its visibility.

## Private Release And Authenticated Adoption Assumptions

The current 0.5 recommendation declares channel
`internal-private-github-prerelease`, release visibility `private`, and old
repository URLs. The installed pin declares repository
`kaveh6202/Nourd.NKF`. The adopter:

- requires exactly that old repository argument;
- obtains the recommendation through the Github API path for the old owner;
- expects private-release URLs under the old owner;
- requires an authenticated `gh` session for the default remote path; and
- supports a separately supplied local recommendation and archive for offline
  use.

The consumer-adoption workflow likewise uses `${{ github.token }}` and
downloads from the old repository name. Git transport currently redirects,
but executable correctness must not assume that every API, asset, raw-content,
token-scope, or automation path redirects forever.

NKF 0.6 must use `NourdApS/Nourd.NKF` for new current distribution behavior
and test private authenticated acquisition at that identity. A later public
visibility decision would require a separate acquisition and trust analysis:
the current default path remains authentication-dependent even if the
repository becomes readable without credentials. Licensing preparation does
not authorize changing that channel or visibility.

## Separate Public-Project Policy Documents

None of the following is required to make the root Apache-2.0 grant itself
valid. They address different public-project risks and must remain separate:

| Document | Assessment | Human Product Boundary Still Required |
| --- | --- | --- |
| `TRADEMARKS.md` | Recommended before public forks are encouraged. Apache-2.0 section 6 already withholds a general trademark grant, but a separate policy can reduce false-endorsement and unofficial-fork confusion. | Exact permitted nominative use, logo use, fork naming, compatibility claims, enforcement, and contact terms. |
| `SECURITY.md` | Strongly recommended before public visibility or external use because it provides a non-public vulnerability-reporting route and supported-version expectations. | Contact channel, disclosure process, response expectations, supported versions, and whether security advisories are used. |
| `CONTRIBUTING.md` | Recommended before external pull requests are invited. Apache-2.0 section 5 supplies a default contribution rule, but it does not decide review, provenance, DCO, CLA, or acceptance policy. | Whether contributions are accepted; DCO, CLA, or neither; review authority; sign-off; test and provenance expectations. |
| `GOVERNANCE.md` | Optional for licensing, but needed before claiming community governance. A Company-maintained project can state that Nourd ApS retains decision authority without promising open governance. | Maintainer roles, decision rights, succession, release authority, dispute handling, and community participation. |
| Code of Conduct | Recommended when public contribution or community interaction is enabled; not required for read-only source availability. | Selected standard, scope, enforcement authority, reporting route, and consequence process. |

No consequential text for these policies is accepted by this assessment.

## Readiness Findings

### Proven At This Checkpoint

- The requested standard license is Apache License 2.0 with SPDX identifier
  `Apache-2.0`.
- The live repository identity is `NourdApS/Nourd.NKF` and remains private.
- The dependency metadata contains only permissive license families.
- The exact bundled runtime package set is known.
- The published 0.5 build and release bytes omit required third-party notice
  material; the prospective 0.6 set now carries that material separately.
- Old repository references have a bounded path inventory and cannot be
  globally replaced safely.

### Blocking Before A Licensed NKF 0.6 Release

- Company-side confirmation of Nourd ApS rights over the Kaveh-authored and
  imported Nourd Studio bytes must be recorded or supplied as an authoritative
  external fact.
- The candidate third-party notices set now includes the Unicode-derived data
  terms and exactly covers the implemented ten-package checker graph and
  nine-package adopter graph. The same deterministic verifier must pass on the
  exact release candidate and the result still requires independent audit.
- Root license, exact NOTICE, package metadata, archive membership, source and
  release URLs, adopter behavior, and tests are implemented prospectively but
  do not establish licensing readiness until exact-candidate verification and
  the unresolved Company-rights fact are reconciled.
- The 0.6 Design and revision-3 authority set are adopted and accepted,
  respectively. Exact candidate exercise, independent implementation and
  licensing audit, technical confirmation, and any publication remain
  incomplete and separate.

### Not Blocked By Licensing Preparation Alone

- `private: true` may remain until package publication is separately chosen.
- Github visibility may remain private while Apache-2.0 preparation is
  completed.
- Immutable prior release archives and historical records remain unchanged.
- Trademark, governance, contribution, security, and community policy can be
  decided separately, provided no public-readiness claim hides their stated
  absence.
