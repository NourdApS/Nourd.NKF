---
title: Specifications
summary: Specifications own current accepted normative NKF meaning.
created_at: 2026-07-28T22:01:17Z
---

# Specifications

Specifications own current accepted normative NKF meaning.

[NKF 0.2](nkf-0.2.md) is the accepted successor specification produced under
[NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md): it adds the Decision Applicability Gate, the versioned-set
evolution rules, and the title-free dynamic frontmatter, with its
digest-bound executable companion at `contracts/nkf/0.2/nkf.yaml`. [ADR 0081](../decisions/0081-accept-nkf-0-2-authority-pair.md)
accepts the exact pair. It governs repositories that declare NKF 0.2;
repositories migrate deliberately under the adoption protocol. NKF 0.1
remains immutable authority for repositories that declare it; its accepted
sources live in Git history and the 0.1 release archives rather than in
this working tree.

[NKF 0.3](nkf-0.3.md) is the accepted successor Specification under
[NKF-023](../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md).
[ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md) accepts its
exact normative Markdown and digest-bound executable companion. It establishes
publication-triggered freeze, one deterministic complete release-set contract,
and explicit predecessor compatibility while preserving the 0.2 Product and
Technology knowledge contracts. Derived implementation, technical
confirmation, publication, recommendation, and repository adoption remain
separate later boundaries. This repository continues to declare NKF 0.2 until
it deliberately adopts the published 0.3 release.


The Specification contains the automatically applicable non-selectable Common
Specification and the Product and Technology Root Profiles. A bundle must
select Product or Technology; General is not a selectable root.

Earlier authority pairs and derived artifacts remain immutable historical
provenance under Decisions, Evidence, Git, and source snapshots. Realizations
describe the current implementation but cannot override this Specification.
