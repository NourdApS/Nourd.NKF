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

## Active proposals

- [`nkf-0.1-replacement-specification.md`](nkf-0.1-replacement-specification.md)
  is the proposed authority-coherent replacement for the accepted canonical
  NKF 0.1 Markdown revision; its Product meaning is intended to remain
  unchanged. Its exact executable companion proposal is
  [`nkf-0.1-replacement-contract-set.yaml`](nkf-0.1-replacement-contract-set.yaml).
- [`nkf-0.1-replacement-contract-set.yaml`](nkf-0.1-replacement-contract-set.yaml)
  is the proposed complete executable companion bound to the exact replacement
  Markdown digest. It is non-authoritative until the pair is accepted.
- [`nkf-0.1-executable-completeness-gaps.md`](nkf-0.1-executable-completeness-gaps.md)
  records the normative gaps that prevent an honest complete YAML realization
  and the proposed order for resolving them.

## Superseded proposals

- [`nkf-0.1-json-schema-realization.md`](nkf-0.1-json-schema-realization.md)
  retains the earlier root-field and incomplete-record assumptions and must
  not guide realization after ADRs 0013 through 0018.
