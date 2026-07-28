# NKF-003: Establish independent NKF authority

- **Task:** `NKF-003`
- **Status:** Active
- **Owner:** Nourd ApS
- **Decision authority:** Human Product Owner, Nourd ApS
- **Repository:** `kaveh6202/Nourd.NKF`

## Desired outcome

Establish Nourd Knowledge Format as independent Company-owned Shared
Technology, migrate its accepted specification and implementation provenance
without rewriting history, and create one authoritative path for NKF
specifications, profiles, contracts, conformance, compatibility, and releases.

## Accepted constraints

- NKF is Shared Technology and not a Product.
- This repository is `kaveh6202/Nourd.NKF`, with local checkout
  `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` and
  default branch `master`.
- Nourd Studio's accepted NKF 0.1 Decision and specification remain immutable
  provenance.
- Nourd Studio, Shredwise, and Nourd Agent SDK are consumers of pinned NKF
  contracts and tooling; no consumer owns NKF.
- NKF conformance never supplies semantic acceptance.
- Product and Shared Technology meaning remain distinct through explicit
  profiles.

## Scope

1. Establish the independent repository and technical knowledge authority.
2. Import the exact accepted NKF 0.1 Product specification with source commit
   and digest provenance.
3. Import and classify the NKF-002 checker plan, amendments, implementation,
   fixtures, and results without promoting proposals to accepted meaning.
4. Reconcile the accepted specification with later proposed executable
   contract clarifications.
5. Define the shared NKF core and Product and Shared Technology profile
   boundaries.
6. Establish exact contract ownership, checker distribution, integrity,
   compatibility, migration, and release rules.
7. Provide pinned consumer paths and remove temporary duplicate authority only
   after every consumer migration is verified.

## Out of scope until separately accepted

- rewriting accepted Nourd Studio ADRs or their historical specification;
- accepting a consumer's Product or Shared Technology knowledge;
- moving the Nourd Knowledge Engine into this repository;
- defining a future NKP runtime protocol;
- changing Nourd Studio, Shredwise, or Agent SDK knowledge automatically;
- public licensing, contribution governance, or stable NKF 1.0 release; and
- deleting source material before authority and provenance are reconciled.

## Execution plan

1. Verify the empty remote, local repository identity, and `master` branch.
2. Record the repository authority and migration plan before source import.
3. Inventory exact accepted, proposed, implementation, and operational NKF
   material in Nourd Studio by repository path and commit.
4. Import immutable accepted NKF 0.1 source and acceptance provenance.
5. Import checker work on a migration branch or as explicitly classified
   evidence; do not merge it into normative contracts by implication.
6. Produce a complete authority and compatibility reconciliation identifying
   what remains accepted, proposed, superseded, consumer-specific, or absent.
7. Present each consequential shared-core and profile decision for Human
   Product Owner confirmation.
8. Implement and validate exact accepted contracts with positive and negative
   conformance fixtures.
9. Establish pinned distribution and migrate consumers one at a time.
10. Record the completed authority handover in Company and affected consumer
    knowledge without rewriting accepted history.

## Acceptance criteria

- This repository is the sole current technical authority for future NKF
  specification, contract, checker, compatibility, and release changes.
- The exact accepted NKF 0.1 Product specification is preserved with verifiable
  source commit and digest provenance.
- Later Nourd Studio checker work is classified accurately and no proposal is
  silently promoted.
- Product and Shared Technology profiles have accepted, versioned contracts.
- One checker distribution validates exact supported contracts and fails
  closed on unsupported required meaning.
- Nourd Studio, Shredwise, and Nourd Agent SDK can pin an exact NKF release
  without copying an independently evolving validator.
- Company and consumer records point to this authority while historical
  accepted sources remain traceable.

## Initial source anchors

| Source | Revision | Authority state |
| --- | --- | --- |
| `kaveh6202/Nourd.Studio:knowledge/decisions/0012-initial-knowledge-declaration-contracts.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted Decision |
| `kaveh6202/Nourd.Studio:knowledge/designs/nkf-0.1.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted NKF 0.1 specification |
| `kaveh6202/Nourd.Studio:knowledge/designs/plans/nkf-002-nkf-0-1-conformance-checker.md` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Task plan and migration evidence |
| `kaveh6202/Nourd.Studio:src/core/knowledge/` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Proposed checker implementation evidence |
