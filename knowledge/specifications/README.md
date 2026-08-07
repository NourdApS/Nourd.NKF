---
title: Specifications
summary: Specifications own current accepted normative NKF meaning.
created_at: 2026-07-28T22:01:17Z
---

# Specifications

Specifications own current accepted normative NKF meaning.

[NKF 0.2](nkf-0.2.md) is the accepted successor specification produced under
NKF-019: it adds the Decision Applicability Gate, the versioned-set
evolution rules, and the title-free dynamic frontmatter, with its
digest-bound executable companion at `contracts/nkf/0.2/nkf.yaml`. ADR 0081
accepts the exact pair. It governs repositories that declare NKF 0.2;
repositories migrate deliberately under the adoption protocol.

[NKF 0.1](nkf-0.1.md) is the accepted canonical specification. ADR 0073
accepts its corrected current portable-topology revision and exact
digest-bound executable YAML companion at `contracts/nkf/0.1/nkf.yaml`. It
remains immutable authority for repositories that declare NKF 0.1.

The Specification contains the automatically applicable non-selectable Common
Specification and the Product and Technology Root Profiles. A bundle must
select Product or Technology; General is not a selectable root.

Earlier authority pairs and derived artifacts remain immutable historical
provenance under Decisions, Evidence, Git, and source snapshots. Realizations
describe the current implementation but cannot override this Specification.
