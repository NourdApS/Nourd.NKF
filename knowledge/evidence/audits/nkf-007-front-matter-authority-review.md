# NKF-007 Front-Matter Authority Review

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T17:11:45Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Reviewed Revisions

| Artifact | SHA-256 |
| --- | --- |
| Adopted Knowledge Architecture Design successor | `0c4b14c62a93c34e1aa9df56d12773d55f2747204ffb00f7d1ac420f6f524f71` |
| Canonical NKF 0.1 Markdown candidate | `054f621bb0598b50ae43c6fd444e5d9e9ced4d897c207d6edd289c766d1792e5` |
| Executable NKF 0.1 YAML candidate | `7ef12360c88c452ccfc80276a3d5e641536dda5dcb9ec0c4ad244af38235e2dd` |
| Bundle Schema candidate | `f6c925c38cba737a8df4cd284ac102824c8257f79811098ecc080dd47855d7f1` |
| Record Schema candidate | `c343660721ea8d8deae9ed91f4b82843b99c3da62f4fe35f7c29446e3ef64243` |
| Validation Result Schema candidate | `8920b810946a965b03e075701e4d8f721af381c371925e39734140b75735e92b` |

The exact ADR 0053 Design input remains preserved at
`knowledge/evidence/decision-inputs/adr-0053/knowledge-architecture-design.md`
with its accepted SHA-256
`e732de725ecf309db3d1194e53a8f846c8262377b1886914e00a306e1f27926f`.

## Design Vocabulary Review

The successor Design uses the NKF lifecycle vocabulary consistently:

- a Design remains governed proposal knowledge;
- acceptance applies to an exact Design record revision;
- Adopted is the Design disposition created when a Decision adopts the
  proposed direction; and
- current normative meaning belongs to Specifications rather than Designs.

This removes the prior ambiguity without rewriting the exact Design input
bound by ADR 0053.

## Normative Pair Review

The Markdown candidate defines one deterministic source model:

1. exact UTF-8 source bytes;
2. an optional bounded safe-YAML front-matter envelope; and
3. a CommonMark body beginning after the closing delimiter.

The complete bytes remain bound by source digests, validation snapshots, and
applicable security scans. Only the body supplies headings, sections,
responsibilities, and canonical human meaning. Arbitrary front-matter keys
gain no portable NKF Core meaning.

The YAML candidate represents the same boundary and adds exactly one stable
diagnostic, `markdown.frontmatter.invalid`, as a conformance-blocking source
error. Strict parsing produced one YAML document with no parser errors. The
YAML Markdown binding equals the reviewed Markdown digest, and Markdown/YAML
severity parity covers 131 diagnostic identities.

## Derived Realization Review

The three core JSON Schema candidates changed only their non-assertive
`x-nkf-source` Markdown and executable digest annotations. Removing that
annotation from predecessor and candidate objects produced byte-structurally
equivalent JSON values for every schema. No schema assertion changed.

The focused TypeScript type check and ten front-matter and diagnostic tests
passed. Those results establish implementation evidence only; they do not
accept the normative pair or confirm the complete checker Realization.

## Conclusion

The exact Markdown and YAML candidates are coherent, complete for the
front-matter source-envelope boundary, and ready for an explicit acceptance
Decision. The schema candidates and checker changes remain derived proposal
realizations until separately confirmed with the completed repository
migration and self-validation.
