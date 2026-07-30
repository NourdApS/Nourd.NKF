# Designs

This directory contains evolving NKF proposals. A design remains
non-authoritative until its consequential meaning is accepted and recorded in
an immutable Decision or normative specification.

## Resolved proposals

- [`nkf-0.1-product-responsibility-identifiers.md`](nkf-0.1-product-responsibility-identifiers.md)
  records the proposal accepted by ADR 0003 for stable, contract-scoped
  identifiers for the 69 Product body responsibilities.
- [`nkf-record-v2-responsibility-bindings.md`](nkf-record-v2-responsibility-bindings.md)
  records the historical YAML representation and deterministic coverage rules
  accepted by ADR 0005. Its record-version framing is superseded by ADR 0009;
  its binding semantics are retained in the sole NKF 0.1 record definition.

- [`nkf-0.1-authoritative-artifacts.md`](nkf-0.1-authoritative-artifacts.md)
  records the version, canonical Markdown and YAML paths, and YAML contract
  identity accepted by ADR 0008.
- [`nkf-0.1-independent-specification.md`](nkf-0.1-independent-specification.md)
  is the exact proposal accepted as the canonical NKF 0.1 Markdown revision by
  ADR 0010.
- [`reconcile-single-version-artifact-authority.md`](reconcile-single-version-artifact-authority.md)
  records the reconciliation accepted by ADR 0012 between ADR 0007's
  artifact-binding model and ADR 0009's single NKF version namespace.
- [`nkf-0.1-native-record-serialization.md`](nkf-0.1-native-record-serialization.md)
  records the native NKF 0.1 record object shape accepted by ADR 0013. Its
  explicitly deferred vocabularies and other semantic boundaries remain
  undecided.
- [`nkf-0.1-section-role-vocabularies.md`](nkf-0.1-section-role-vocabularies.md)
  records the shared role meanings and core body-specific subsets accepted by
  ADR 0014.
- [`nkf-0.1-semantic-topology-and-binding-vocabularies.md`](nkf-0.1-semantic-topology-and-binding-vocabularies.md)
  records the core semantic-topology and durable-binding vocabularies accepted
  by ADR 0015.
- [`nkf-0.1-extension-declaration-and-resolution.md`](nkf-0.1-extension-declaration-and-resolution.md)
  records the native extension identity, declaration, resolution, round-trip,
  and fail-closed rules accepted by ADR 0016.
- [`nkf-0.1-acceptance-provenance-boundary.md`](nkf-0.1-acceptance-provenance-boundary.md)
  records the no-universal-core-proof boundary and independent result axes
  accepted by ADR 0017.
- [`nkf-0.1-path-and-distribution-boundary.md`](nkf-0.1-path-and-distribution-boundary.md)
  records the fixed `.nourd`, configurable knowledge-root, Markdown coverage,
  declaration cardinality, and qualified symlink rules accepted by ADR 0018.
- [`nkf-0.1-enforcement-and-diagnostics.md`](nkf-0.1-enforcement-and-diagnostics.md)
  records the YAML parse boundary, enforcement partition, validation phases,
  stable diagnostics, and result semantics accepted by ADR 0019 under
  delegated technical authority.
- [`nkf-0.1-presentation-guidance-boundary.md`](nkf-0.1-presentation-guidance-boundary.md)
  supports the current no-native-field and optional-extension boundary
  accepted by ADR 0020 and explicitly revisitable through NKF-004.
- [`nkf-0.1-native-bundle-serialization.md`](nkf-0.1-native-bundle-serialization.md)
  records the closed native manifest and exact non-record representation
  accepted by ADR 0021.
- [`nkf-0.1-replacement-specification.md`](nkf-0.1-replacement-specification.md)
  is the exact review revision accepted and promoted by ADR 0022. It is now a
  historical accepted snapshot after ADR 0027.
- [`nkf-0.1-replacement-contract-set.yaml`](nkf-0.1-replacement-contract-set.yaml)
  is the exact digest-bound executable companion accepted and promoted by ADR
  0022, now historical after ADR 0027.
- [`nkf-0.1-executable-completeness-gaps.md`](nkf-0.1-executable-completeness-gaps.md)
  records the gaps subsequently resolved through ADRs 0013 through 0021 and
  the coherent pair accepted by ADR 0022.
- [`nkf-0.1-replacement-json-schemas.md`](nkf-0.1-replacement-json-schemas.md)
  records the historical derived JSON Schema realization confirmed by ADR
  0023. Its exact bundle and record review artifacts are
  [`nkf-0.1-bundle-schema-proposal.json`](nkf-0.1-bundle-schema-proposal.json)
  and
  [`nkf-0.1-record-schema-proposal.json`](nkf-0.1-record-schema-proposal.json).
- [`nkf-0.1-checker-realization-gaps.md`](nkf-0.1-checker-realization-gaps.md)
  records the three conformance-critical gaps resolved through ADRs 0024
  through 0030 before checker implementation.
- [`nkf-0.1-validation-result-schema-proposal.json`](nkf-0.1-validation-result-schema-proposal.json)
  is the structural precursor reviewed for ADR 0025. Its positive review
  example is
  [`nkf-0.1-validation-result-example.json`](nkf-0.1-validation-result-example.json).
- [`nkf-0.1-pre-checker-specification-proposal.md`](nkf-0.1-pre-checker-specification-proposal.md)
  and
  [`nkf-0.1-pre-checker-contract-proposal.yaml`](nkf-0.1-pre-checker-contract-proposal.yaml)
  are the exact authority revisions accepted and promoted by ADR 0027, now
  historical after ADR 0029.
- [`nkf-0.1-pre-checker-bundle-schema-proposal.json`](nkf-0.1-pre-checker-bundle-schema-proposal.json),
  [`nkf-0.1-pre-checker-record-schema-proposal.json`](nkf-0.1-pre-checker-record-schema-proposal.json),
  and
  [`nkf-0.1-pre-checker-validation-result-schema-proposal.json`](nkf-0.1-pre-checker-validation-result-schema-proposal.json)
  are the exact source-bound schemas confirmed and promoted by ADR 0028, now
  historical after ADR 0030.
- [`nkf-0.1-schema-status-reconciled-specification-proposal.md`](nkf-0.1-schema-status-reconciled-specification-proposal.md)
  and
  [`nkf-0.1-schema-status-reconciled-contract-proposal.yaml`](nkf-0.1-schema-status-reconciled-contract-proposal.yaml)
  are the exact authority revisions accepted and promoted by ADR 0029. The
  Markdown remains current; the YAML is historical after ADR 0032.
- [`nkf-0.1-schema-status-reconciled-bundle-schema-proposal.json`](nkf-0.1-schema-status-reconciled-bundle-schema-proposal.json),
  [`nkf-0.1-schema-status-reconciled-record-schema-proposal.json`](nkf-0.1-schema-status-reconciled-record-schema-proposal.json),
  and
  [`nkf-0.1-schema-status-reconciled-validation-result-schema-proposal.json`](nkf-0.1-schema-status-reconciled-validation-result-schema-proposal.json)
  are the exact source-bound schemas confirmed by ADR 0030, now historical
  after ADR 0033.
- [`nkf-0.1-yaml-grammar-corrected-contract-proposal.yaml`](nkf-0.1-yaml-grammar-corrected-contract-proposal.yaml)
  is the historical strict-YAML executable companion accepted and promoted by
  ADR 0032, now superseded as current authority by ADR 0036.
- [`nkf-0.1-yaml-grammar-corrected-bundle-schema-proposal.json`](nkf-0.1-yaml-grammar-corrected-bundle-schema-proposal.json),
  [`nkf-0.1-yaml-grammar-corrected-record-schema-proposal.json`](nkf-0.1-yaml-grammar-corrected-record-schema-proposal.json),
  and
  [`nkf-0.1-yaml-grammar-corrected-validation-result-schema-proposal.json`](nkf-0.1-yaml-grammar-corrected-validation-result-schema-proposal.json)
  are the exact source-bound schemas confirmed and promoted by ADR 0033, now
  historical after ADR 0037.
- [`nkf-0.1-native-checker-realization-findings.md`](nkf-0.1-native-checker-realization-findings.md)
  records five conformance-critical findings exposed by native checker
  realization. All five are resolved through ADRs 0034 through 0040.
- [`nkf-0.1-checker-findings-resolved-specification-proposal.md`](nkf-0.1-checker-findings-resolved-specification-proposal.md)
  and
  [`nkf-0.1-checker-findings-resolved-contract-proposal.yaml`](nkf-0.1-checker-findings-resolved-contract-proposal.yaml)
  are the exact authority pair accepted and promoted by ADR 0036, now
  historical after ADR 0039.
- [`nkf-0.1-checker-findings-resolved-bundle-schema-proposal.json`](nkf-0.1-checker-findings-resolved-bundle-schema-proposal.json),
  [`nkf-0.1-checker-findings-resolved-record-schema-proposal.json`](nkf-0.1-checker-findings-resolved-record-schema-proposal.json),
  and
  [`nkf-0.1-checker-findings-resolved-validation-result-schema-proposal.json`](nkf-0.1-checker-findings-resolved-validation-result-schema-proposal.json)
  are the exact source-bound schemas confirmed and promoted by ADR 0037, now
  historical after ADR 0040.
- [`nkf-0.1-invocation-precondition-specification-proposal.md`](nkf-0.1-invocation-precondition-specification-proposal.md)
  and
  [`nkf-0.1-invocation-precondition-contract-proposal.yaml`](nkf-0.1-invocation-precondition-contract-proposal.yaml)
  are the exact current authority pair accepted and promoted by ADR 0039.
- [`nkf-0.1-invocation-precondition-bundle-schema-proposal.json`](nkf-0.1-invocation-precondition-bundle-schema-proposal.json),
  [`nkf-0.1-invocation-precondition-record-schema-proposal.json`](nkf-0.1-invocation-precondition-record-schema-proposal.json),
  and
  [`nkf-0.1-invocation-precondition-validation-result-schema-proposal.json`](nkf-0.1-invocation-precondition-validation-result-schema-proposal.json)
  are the exact current source-bound schemas confirmed and promoted by ADR
  0040.

## Active Proposals

All five checker-derived authority findings are accepted through ADRs 0034,
0035, and 0038. ADRs 0039 and 0040 reflect their exact semantics in the
current canonical authority pair and source-bound schemas. Checker updates
and the complete 115-rule fixture-reference matrix are confirmed as the exact
development Realization through ADR 0041.

Checker distribution and release realization have not yet been proposed or
accepted as an exact contract or implementation. ADR 0042 accepts one
content-addressed Github Release archive as the initial distribution boundary.
[`nkf-0.1-initial-release-distribution.md`](nkf-0.1-initial-release-distribution.md)
records the exact archive, manifest, integrity, pinning, release mechanics,
normative Markdown delta, and executable YAML delta accepted by ADR 0044 under
explicit Human Product Owner delegation. Its accepted structural schema design
is
[`nkf-0.1-release-manifest-schema-proposal.json`](nkf-0.1-release-manifest-schema-proposal.json).
The coherent full authority pair accepted and promoted by ADR 0045 is preserved
in
[`nkf-0.1-release-contract-specification-proposal.md`](nkf-0.1-release-contract-specification-proposal.md)
and
[`nkf-0.1-release-contract-proposal.yaml`](nkf-0.1-release-contract-proposal.yaml).
Source-bound schemas, checker rebinding, and package Realization remain
pending.

Deferred presentation-extension work remains governed separately by NKF-004.
Deferred expiry and authority-freshness investigation remains governed by
NKF-005.

## Superseded proposals

- [`nkf-0.1-json-schema-realization.md`](nkf-0.1-json-schema-realization.md)
  retains the earlier root-field and incomplete-record assumptions and must
  not guide realization after ADRs 0013 through 0018.
