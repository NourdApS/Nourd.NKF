# NKF-007 Target Architecture Review

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T16:46:38Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Reviewed Inputs

| Input | SHA-256 |
| --- | --- |
| `knowledge/designs/nkf-007-knowledge-architecture-proposal.md` | `e732de725ecf309db3d1194e53a8f846c8262377b1886914e00a306e1f27926f` |
| `knowledge/designs/nkf-007-knowledge-migration-map.yaml` | `d49c6270212674c14e0bfd64610a0bbe2de0783b44242a59558eb31460a4b7ce` |
| `knowledge/evidence/nkf-007-current-structure-inventory.md` | `2d63229ad93b00f641dcd655b6f3675ff56e571c09dbc271dd3efc467a6ffd60` |
| `knowledge/evidence/nkf-007-design-classification-review.md` | `3345d2615569503d25dea2fc998fbc7424e224065878701c204bf4f829006e51` |
| `knowledge/evidence/nkf-007-front-matter-parser-finding.md` | `10d5131454f39f9f5192c4364127729c2338d070f6fbfb493457d4e10e31105a` |
| `knowledge/evidence/nkf-pre-remediation-repository-audit.md` | `893f8c78555c429db0f4dc726a1138bceeb562f571c02a58334849fb07cbd5c1` |

## Requirement Review

| Requirement | Evidence | Result |
| --- | --- | --- |
| Use `Task → Design → Decision → Specification → Realization → Validation` | Design governing inputs and proposed topology | Pass |
| Do not add a Current System Model layer or authority | Current System Model is explicitly the entry Realization | Pass |
| Start audits from current implementation rather than complete history | Entry-point navigation begins at `realizations/current-system.md` | Pass |
| Make knowledge human navigable | Task state, Design disposition, concise Decision names, current Realizations, and curated indexes are separated | Pass |
| Give every Design an explicit coherent disposition | Active, Adopted, Rejected, Superseded, and Withdrawn are defined separately from record authority | Pass |
| Reclassify non-Design material | 20 Designs, three audits/findings, seven historical Specifications, and 31 executable inputs are mapped by role | Pass |
| Replace procedural filenames | All 52 Decision targets use stable four-digit IDs and durable subject nouns | Pass |
| Preserve technical path constraints | Every Decision target retains the required four-digit basename prefix | Pass |
| Require non-Evidence front matter and UTC `created_at` | Evidence-backed Git-introduction method and exact front-matter shape are defined | Pass |
| Do not fabricate event times | Unsupported date-only event metadata is removed or preserved in Evidence rather than assigned midnight or Git time | Pass |
| Preserve Evidence | Source snapshots remain in place and all Evidence or historical input moves are byte-preserving | Pass |
| Close NKF-003 honestly | Completed outcomes and incomplete publication, consumer, structure, and enforcement obligations have explicit Task destinations | Pass |
| Create complete current Realizations | One consolidated entry Realization and four supporting current Realizations are specified | Pass |
| Repair self-host semantic inference | Explicit reviewed declarations replace keyword and filename inference | Pass |
| Preserve out-of-scope enforcement and deployment | Secret-scan expansion transfers to NKF-009; publication and consumers transfer to NKF-008 | Pass |
| Cover every existing knowledge file | Machine review parsed the YAML map and covered all 163 current files exactly once | Pass |
| Avoid path collisions | Machine review found no duplicate migration target | Pass |

## Findings Resolved During Review

### Front Matter Was Not Outside CommonMark

The initial proposal treated front matter as a repository convention but did
not account for CommonMark interpreting it as a Setext heading. The Design now
requires a minimal native source-envelope boundary: exact source digests and
secret scans retain the complete bytes, while heading and section parsing
receives only the CommonMark body.

### Mechanical Verb Removal Was Insufficient

The first filename map removed leading verbs but retained temporary phrases
such as pre-checker, rebound, and findings-resolved. The revised targets use
durable subjects such as validation authority pair, source-bound JSON Schemas,
checker-ready authority pair, and release checker.

### Cosmetic Evidence Movement Could Break Provenance

The target rules now preserve Evidence bytes and leave the existing
NKF-003 source-reconciliation record in place. Evidence indexes provide
navigation without forcing a uniform move that would require rewriting
preserved content.

## Review Boundary

This review proves that the exact target architecture and path map are
decision-ready. It cannot prove the migration is realized. Post-migration
predecessor and successor digests, semantic-change classification, links,
declarations, current Realizations, checker behavior, and validation remain
required evidence.

## Conclusion

The exact reviewed Design and migration map are coherent with the Human
Product Owner's NKF-007 direction and are approved for an explicit acceptance
Decision. No current document may move or rename until that Decision records
the reviewed digests and the non-claims above.
