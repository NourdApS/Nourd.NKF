# NKF-017 Authority Pair Proposal Audit

- **Observed At:** `2026-07-31T22:55:19Z`
- **Owning Task:** `NKF-017`
- **Accepted Direction:** ADR 0071
- **Candidate Markdown:** `knowledge/evidence/decision-inputs/adr-0072/nkf-0.1.md`
- **Candidate Markdown SHA-256:** `3da17ce0b16be89f3aae8be9d2245a8df161a8e9cc9c4b9afff9c706983e694b`
- **Candidate Executable:** `knowledge/evidence/decision-inputs/adr-0072/nkf.yaml`
- **Candidate Executable SHA-256:** `d2af4ecc0137793f0eafeb55def02956fe6883e035e71bafa2ca4abdccf74a01`

## Audit Result

The exact candidate authority pair is coherent with ADR 0071 and technically
realizable. It preserves one NKF `0.1` version coordinate, leaves the Product
and Technology Root Profiles unchanged, and adds the accepted portable
topology as Common meaning.

The executable candidate parses as strict YAML, binds the exact candidate
Markdown digest, binds the exact current accepted Markdown and executable as
its predecessor baseline, contains seventeen unique required topology paths,
and introduces eight topology diagnostics.

## Boundaries Verified

- The seventeen required paths and native representations match the adopted
  Design.
- Empty navigation files do not create semantic records or authority.
- The canonical map has one managed block while project-owned content outside
  it remains outside NKF rewrite authority.
- Task state and Design disposition come from explicit frontmatter before path
  and index agreement is checked.
- Decision, Specification, current Realization, and Evidence index behavior is
  deterministic without requiring exhaustive historical Evidence links.
- Product and Technology share the Common lifecycle topology; only their Draft
  root and the Technology initial Specification differ during onboarding.
- Continuing conformance, predecessor repair, rollback, receipt lineage,
  idempotence, and deliberate migration remain explicit.
- The candidate does not claim implementation, Realization confirmation,
  consumer migration, publication, or conformance to the successor contract.

## Corrected During Audit

The initial link rule would have accidentally governed unrelated links in
project-owned navigation prose. The candidate now treats only links satisfying
required managed-map or lifecycle-index targets as topology links. Other links
cannot satisfy or alter the topology contract.

The Evidence index rule now has a mechanical boundary: it links every safe
direct Evidence child directory containing represented Evidence Markdown at
any depth, without requiring every immutable Evidence file to be listed.

## Remaining Boundary

The Human Product Owner must accept these exact candidate bytes through ADR
0072 before they replace the current canonical Markdown and executable
companion. Current NKF validation can verify this proposal as governed
Evidence, but cannot accept or implement it.
