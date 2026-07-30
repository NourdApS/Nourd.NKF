# NKF-007 Design Classification Review

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T16:37:33Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Purpose

This review classifies the material currently stored under
`knowledge/designs/` by semantic role before any move. It does not infer
authority from the directory, current header, generated declaration, or
implementation. Proposed Design disposition is based on the document's
content and relevant Decisions.

## Design Records

The following Markdown documents contain Design meaning and remain Designs:

| Current document | Reviewed disposition | Provenance |
| --- | --- | --- |
| `nkf-0.1-acceptance-provenance-boundary.md` | Adopted | ADR 0017 |
| `nkf-0.1-authoritative-artifacts.md` | Superseded | Adopted through ADR 0008; material contract-identity framing replaced through ADRs 0009 and 0012 |
| `nkf-0.1-common-and-root-profile-proposal.md` | Adopted | ADRs 0049 and 0050 |
| `nkf-0.1-enforcement-and-diagnostics.md` | Adopted | ADR 0019 |
| `nkf-0.1-extension-declaration-and-resolution.md` | Adopted | ADR 0016 |
| `nkf-0.1-initial-release-distribution.md` | Adopted | ADRs 0042 through 0044 |
| `nkf-0.1-json-schema-realization.md` | Superseded | Historical realization proposal; replaced through ADRs 0013 through 0023 and later schema confirmations |
| `nkf-0.1-native-bundle-serialization.md` | Adopted | ADR 0021 |
| `nkf-0.1-native-record-serialization.md` | Adopted | ADR 0013 |
| `nkf-0.1-path-and-distribution-boundary.md` | Adopted | ADR 0018 |
| `nkf-0.1-presentation-guidance-boundary.md` | Adopted | ADR 0020; revisitable through NKF-004 |
| `nkf-0.1-product-responsibility-identifiers.md` | Adopted | ADR 0003, with record-version framing later reconciled by ADR 0009 |
| `nkf-0.1-product-technology-common-comparison.md` | Adopted | Comparison and proposed allocation accepted through ADR 0050 |
| `nkf-0.1-replacement-json-schemas.md` | Superseded | Historical proposal confirmed through ADR 0023 and replaced by later source-bound schema revisions |
| `nkf-0.1-section-role-vocabularies.md` | Adopted | ADR 0014 |
| `nkf-0.1-semantic-topology-and-binding-vocabularies.md` | Adopted | ADR 0015 |
| `nkf-0.1-technology-root-profile-specification-proposal.md` | Adopted | ADR 0050 |
| `nkf-record-v2-responsibility-bindings.md` | Superseded | Adopted through ADR 0005; independent record-version model superseded by ADR 0009 |
| `reconcile-single-version-artifact-authority.md` | Adopted | ADR 0012 |
| `nkf-007-knowledge-architecture-proposal.md` | Active | NKF-007; no accepting Decision |

No reviewed Design currently has evidenced Rejected or Withdrawn disposition.
Those directories remain valid empty states and must not be populated by
inference.

## Audit And Finding Records

The following documents report inspected gaps or implementation findings
rather than propose a Design with alternatives and trade-offs. They should
move to `evidence/audits/` without changing their bytes beyond link repair
where a later governed migration explicitly permits it:

| Current document | Reviewed role |
| --- | --- |
| `nkf-0.1-checker-realization-gaps.md` | Pre-checker realization gap audit |
| `nkf-0.1-executable-completeness-gaps.md` | Executable-completeness audit |
| `nkf-0.1-native-checker-realization-findings.md` | Native checker implementation findings |

Their existing Design declarations were generated rather than semantically
reviewed and must not be retained merely to avoid migration work.

## Historical Specification Revisions

The following Markdown documents are exact proposed or accepted historical
Specification revisions. Their bodies define specification meaning rather
than Design alternatives and trade-offs. The current normative revision
already lives at `knowledge/specifications/nkf-0.1.md`.

They should move to the relevant `evidence/decision-inputs/` group as
historical authority inputs:

| Current document | Decision provenance |
| --- | --- |
| `nkf-0.1-independent-specification.md` | ADR 0010 |
| `nkf-0.1-replacement-specification.md` | ADR 0022 |
| `nkf-0.1-pre-checker-specification-proposal.md` | ADR 0027 |
| `nkf-0.1-schema-status-reconciled-specification-proposal.md` | ADR 0029 |
| `nkf-0.1-checker-findings-resolved-specification-proposal.md` | ADR 0036 |
| `nkf-0.1-invocation-precondition-specification-proposal.md` | ADR 0039 |
| `nkf-0.1-release-contract-specification-proposal.md` | ADR 0045 |

Reclassification as Evidence does not retroactively change what an ADR
accepted. It makes their present repository role explicit: preserved
historical inputs, not current Design work or current normative authority.

## Historical Executable Inputs

All 24 JSON and seven YAML files currently stored directly under Designs are
historical proposal, review, schema, contract, example, or exact
Decision-input artifacts. No current executable authority is loaded from
those paths. The current executable companion and schemas live under
`contracts/nkf/0.1/`.

The historical files should move byte-for-byte into grouped
`evidence/decision-inputs/` directories:

| Group | Material |
| --- | --- |
| `adr-0022-0023/` | Replacement contract set; initial bundle and record schema proposals |
| `adr-0025/` | Validation-result schema proposal and example |
| `adr-0027-0028/` | Pre-checker contract and three schema proposals |
| `adr-0029-0030/` | Schema-status-reconciled contract and three schema proposals |
| `adr-0032-0033/` | YAML-grammar-corrected contract and three schema proposals |
| `adr-0036-0037/` | Checker-findings-resolved contract and three schema proposals |
| `adr-0039-0040/` | Invocation-precondition contract and three schema proposals |
| `adr-0043-0046/` | Release-manifest schema, release contract, and four source-bound schema proposals |

The migration map must place every artifact exactly once and update active
links. Evidence bytes themselves are not normalized.

## Review Conclusion

The current Designs directory contains four different semantic roles:

1. 20 actual Design records including the active NKF-007 proposal;
2. three audit or finding records;
3. seven historical Specification revisions; and
4. 31 historical executable Decision inputs.

A disposition-only directory move without first reclassifying these roles
would preserve the original semantic error. The target migration must perform
role classification before Design disposition placement.
