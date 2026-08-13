# NKF-026 NKF 0.5 Authority Pair Audit

## Audit Boundary

This Evidence records the independent technical review of the exact
prospective NKF 0.5 normative Markdown, executable companion, and separately
versioned freshness policy before technical acceptance or implementation.
The review used immutable NKF 0.4, the exact adopted direction in
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md),
and the publication sequence in
[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
as governing inputs. It accepts or confirms nothing by itself.

## Exact Clean Inputs

| Input | SHA-256 |
| --- | --- |
| Prospective NKF 0.5 Markdown | `d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc` |
| Prospective NKF 0.5 executable companion | `73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2` |
| Prospective NKF 0.5 freshness policy | `5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd` |
| Accepted NKF 0.4 Markdown | `7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1` |
| Accepted NKF 0.4 executable companion | `a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217` |

## Independent Method

The reviewer restarted from zero whenever any candidate byte changed. The
final pass independently:

1. verified all three exact hashes and both predecessor bindings;
2. strict-parsed each YAML input as one safe mapping with unique string keys
   and no aliases, anchors, merge keys, tags, or parser diagnostics;
3. compared all 14 relationship-policy entries, exact order, source and target
   node kinds, propagation, class, and purpose coverage;
4. compared the 194 Markdown and executable diagnostics for identity,
   severity, blocking effect, and phase;
5. reviewed every adopted Product boundary from ADR 0115 against Markdown,
   executable serialization, migration, graph, freshness, baseline, receipt,
   readiness, topology, and authority behavior;
6. tested bootstrap, predecessor migration, Task identity, stable paths,
   generated lifecycle navigation, external dependencies, authority inputs,
   exact revision inputs, and validation-result closure for implementability;
7. checked release membership, compatibility, archive self-reference, and the
   two distinct ADR 0109 candidate and public adoption stages; and
8. resolved every relative Markdown link from the declared canonical path.

## Corrected Findings

Earlier exact candidates were rejected and discarded for material defects,
including an acceptance/manifest cycle, incomplete release classes and modes,
an impossible Draft-to-accepted bootstrap, Task identity loss, open receipt
and evaluation shapes, incomplete relationship authority, ambiguous external
dependency direction, missing graph revision inputs, contradictory legacy
conversion, incomplete validation-result fields, stale resolver wording, and
missing authority-observation identity.

The final corrections establish:

- one Decision-bound `accepted_bootstrap_lock` that preserves the audited
  Draft source bytes while making validation incapable of supplying
  acceptance;
- separate exact predecessor and converted declaration projections for legacy
  sources, including record-only repository-owner-approved authority mapping
  and exact document authority preservation;
- stable Task IDs and stable canonical Markdown paths with generated
  lifecycle navigation outside canonical document nodes;
- complete closed graph, baseline, request, result, receipt, changed-input,
  external-dependency, and authority-input serialization;
- exact relationship endpoint, cycle, source-authority, policy, and revision
  behavior; and
- exact prepublication candidate Adopt plus audit followed by unchanged
  publication and ordinary public producer self-adoption plus audit.

## Verdict

`CLEAN` for technical acceptance of only the exact three inputs above under
the Human Product Owner's recorded derivation delegation. No material
contradiction, ambiguity, underbinding, migration impossibility, or unapproved
Product meaning remained in the final pass.

## Non-Claims And Limitations

This audit does not:

- accept the authority pair or freshness policy;
- derive or confirm Schemas, checker, adopter, fixtures, documentation,
  Realization, release-set, or archive bytes;
- prove graph semantic completeness or reviewer authority;
- publish, recommend, adopt, or establish readiness for NKF 0.5;
- confirm a Product or Technology Realization; or
- establish remote enforcement, acceptance-binding verification, public
  distribution, or Governing Use readiness.
