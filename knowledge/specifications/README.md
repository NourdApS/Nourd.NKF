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

[NKF 0.3](nkf-0.3.md) is the immutable published predecessor Specification under
[NKF-023](../tasks/completed/NKF-023-release-nkf-0-3-with-immutable-freeze-and-proven-self-adoption.md).
[ADR 0110](../decisions/0110-accept-the-nkf-0-3-authority-pair.md) accepts its
exact normative Markdown and digest-bound executable companion. It establishes
publication-triggered freeze, one deterministic complete release-set contract,
and explicit predecessor compatibility while preserving the 0.2 Product and
Technology knowledge contracts. Its implementation was separately confirmed,
published, recommended, and adopted by this repository; every 0.3 byte remains
immutable.

[NKF 0.4](nkf-0.4.md) is the accepted non-breaking dependency-security
successor under
[NKF-024](../tasks/completed/NKF-024-release-nkf-0-4-dependency-security-maintenance.md).
[ADR 0113](../decisions/0113-accept-the-nkf-0-4-authority-pair.md) accepts its
exact normative Markdown and digest-bound executable companion under the
maintenance delegation in
[ADR 0112](../decisions/0112-allocate-nkf-0-4-security-maintenance.md). Derived
implementation, technical confirmation, publication, recommendation, and
repository adoption remain separate later boundaries.

[NKF 0.5 revision 2](nkf-0.5-revision-2.md) is the immutable accepted,
published, recommended, and producer-adopted predecessor under
[NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
and
[ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md).
Its digest-bound executable companion lives at
`contracts/nkf/0.5/revision-2/nkf.yaml`; the accepted freshness policy remains
at `contracts/nkf/0.5/freshness-policy.yaml`. The producer now declares and
pins 0.5, while the released record-repin defect remains immutable and is
allocated to the distinct 0.6 successor.

The original [NKF 0.5 prepublication source](nkf-0.5.md) and executable pair
accepted by [ADR 0116](../decisions/0116-accept-the-nkf-0-5-authority-pair.md)
remain immutable historical provenance.
[ADR 0119](../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
supersedes that pair only as the authority selected for 0.5 publication.

[NKF 0.6 revision 3](nkf-0.6-revision-3.md) is the current exact technically
accepted corrective and licensing-preparation successor under
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
and [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md).
It supersedes only [ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)'s
revision 2 four-file release-authority selection. [ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md)
remains immutable historical Evidence under the exact two-occurrence
containment accepted by
[ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md).
While the producer still declares 0.5, the
revision 3 Markdown and promotion input are represented as candidate Evidence;
the executable and policy are accepted prospective authority artifacts.
Derived Schemas, checker, adopter,
Realization, candidate exercise, release, publication, recommendation, and
public producer adoption remain separate and unconfirmed.

The exact [NKF 0.6 revision 2](nkf-0.6-revision-2.md) authority remains
immutable historical provenance. [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
supersedes only its current-release selection; it does not alter the revision 2
bytes or the other conclusions recorded by
[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md).


The Specification contains the automatically applicable non-selectable Common
Specification and the Product and Technology Root Profiles. A bundle must
select Product or Technology; General is not a selectable root.

Earlier authority pairs and derived artifacts remain immutable historical
provenance under Decisions, Evidence, Git, and source snapshots. Realizations
describe the current implementation but cannot override this Specification.
