# NKF-017 Portable Topology Design Audit

## Audit Identity

- **Audited At:** `2026-07-31T21:56:24Z`
- **Audited Revision:** `knowledge/designs/active/complete-portable-onboarding-topology.md`
- **SHA-256:** `cffe98ca08599304ee87022a6c3c9c152c0cc84e137cb834ce2bd38d4f679282`
- **Owning Task:** `NKF-017`
- **Audit Effect:** Evidence only; no Design adoption, Specification
  acceptance, Realization confirmation, or release effect

## Method

The review compared the exact Design against:

- the NKF-017 problem, scope, guardrails, required decisions, and acceptance
  criteria;
- canonical NKF 0.1 Common, Product, Technology, project-organization,
  frontmatter, Evidence, Task, Design, validation-input, and compatibility
  meaning;
- ADR 0053's explicitly repository-local knowledge organization;
- the accepted NKF-013 and NKF-015 onboarding Designs and Decisions;
- the current onboarding plan, generator, transaction, receipt, tests, and
  public guidance;
- the bound Nourd Agent SDK Category 2 exercise; and
- human navigation, agent navigation, Knowledge Engine consumption, Git
  durability, deterministic enforcement, rollback, idempotence, pre-stable
  migration, Product use, Technology use, and monolithic-application use.

## Verified Strengths

1. The proposal derives the portable lifecycle from already-shared Common
   meanings rather than copying NKF's local ADR 0053 layout by implication.
2. It retains one selected Product or Technology Root Profile and does not
   introduce a selectable Common, Generic, layout profile, topology version,
   or record sub-version.
3. It gives empty lifecycle areas durable, readable index files instead of
   non-persistent empty directories or hidden placeholders.
4. It keeps directories and indexes non-authoritative while making explicit
   frontmatter and declarations the source for Task state, Design
   disposition, record type, acceptance, and confirmation.
5. It fixes the observed duplicate-map behavior through one canonical
   `README.md` and an exact managed navigation block rather than suffix
   allocation or silent replacement.
6. It distinguishes Product and Technology semantic additions without
   creating separate lifecycle protocols.
7. It makes the promised topology continuously enforceable and includes
   explicit index-completeness checks for Tasks, Designs, Decisions,
   Specifications, and current Realizations.
8. It preserves unresolved pre-NKF material without inferring placement and
   requires project-authority review before any semantic move.
9. It provides a receipt-bound predecessor repair path with fail-closed drift
   handling, transaction rollback, and idempotence.
10. It explicitly requires the NKF self-hosted Technology bundle to migrate
    and leaves Agent SDK mutation outside this Task.

## Findings Corrected During Audit

The first reviewed draft treated every required index as `navigation`. That
conflicted with the established Evidence exemption and this repository's
`evidence/README.md` representation. The Design now requires that path as an
`evidence` non-record and does not require frontmatter there.

The first draft also described predecessor-byte preservation too broadly. The
revised Design now requires byte preservation of the project-owned CommonMark
body outside the managed block unless authority explicitly approves a
candidate semantic edit, while avoiding an undisclosed second authority copy.

The first draft did not state lifecycle index completeness or the NKF
self-hosting migration strongly enough. The revised Design now requires
explicit state-to-path and index agreement without path inference and names
the self-host migration as part of NKF-017 realization.

## Material Concerns Remaining For Authority

The proposal deliberately adds seventeen required Common paths, sixteen of
which are navigation or Evidence indexes and one of which is the
current-system Realization. This is more initial material than the predecessor
scaffold. The cost is real but directly serves the Human Product Owner's
complete, durable, and navigable topology requirement.

Continuing enforcement makes the change a pre-stable compatibility boundary,
not a harmless generator enhancement. Every adopted repository must use its
currently bound predecessor release until it deliberately migrates to the
successor. This is consistent with NKF's one-version namespace but requires
clear release and migration guidance.

Per-state indexes make Task and Design drift mechanically visible, but the
checker must compare explicit frontmatter to placement and links in that
direction. An implementation that infers state from a folder would violate
the proposal.

The managed navigation block gives deterministic ownership to only one part
of an existing project-owned `README.md`. Implementation must preserve all
bytes outside that exact block and fail on ambiguous or drifted boundaries.

These are consequential trade-offs requiring Human Product Owner adoption;
they are not unresolved internal contradictions in the revised proposal.

## Requirement Coverage

| NKF-017 Boundary | Design Coverage | Audit Result |
| --- | --- | --- |
| Exact portable Common topology | `Common Portable Topology` | Covered |
| Product and Technology additions | `Product And Technology Additions` | Covered |
| Durable empty areas | Required index files | Covered |
| Continuing checker enforcement | `Continuing Enforcement` | Covered |
| One map and collision policy | `Canonical Knowledge Map Reconciliation` | Covered |
| Existing flat knowledge | `Existing And Partial Topology` | Covered without inference |
| Task and Design navigation | `Lifecycle Placement And Index Completeness` | Covered |
| Predecessor migration | `Predecessor Repair` | Covered |
| NKF self-hosting migration | `Predecessor Repair` | Covered |
| Consumer byte and authority safety | Map reconciliation and failure safety | Covered with explicit authority boundary |
| Test and audit matrix | `Validation And Decision Evidence` | Covered |
| Agent SDK mutation exclusion | Scope and predecessor repair | Covered |

## Audit Conclusion

The exact revised Design is coherent, implementable, aligned with the
Human Product Owner's stated complete-topology intent, and sufficiently
specific for an authority decision. No unresolved technical contradiction
blocks adoption.

The Design remains Active and Draft. Its five consequential semantic
boundaries remain unaccepted until the Human Product Owner explicitly adopts
them. A passing NKF check can establish structural conformance of this
proposal record only; it cannot supply that adoption.
