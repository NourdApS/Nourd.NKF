# NKF-024 NKF 0.4 Authority Pair Audit

## Audit Boundary

This is a fresh technical review of the exact prospective NKF 0.4 normative
Markdown and executable companion before their acceptance or use as derived
implementation authority. It compares them to the immutable NKF 0.3 pair and
to the fixed maintenance direction in
[ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md).
It accepts or confirms nothing by itself.

## Exact Inputs

| Input | SHA-256 |
| --- | --- |
| Accepted NKF 0.3 Markdown | `0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e` |
| Accepted NKF 0.3 executable companion | `e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f` |
| Prospective NKF 0.4 Markdown | `7298d1a55dcd74d4cc96368648aadbd6a70b5cf4c62d2a1c7f528e7c9181bab1` |
| Prospective NKF 0.4 executable companion | `a84fcc1e99567b6716e3281efedbbc87c978ffa465cd4cb5d8cac1d46ad0d217` |

## Independent Review Method

The review began again from the exact predecessor and candidate bytes. It:

1. compared the complete Markdown documents and complete executable mappings;
2. normalized only intended version-coordinate, path, URI, digest, provenance,
   and compatibility changes, then inspected every remaining difference;
3. strict-parsed the executable YAML as one UTF-8 mapping with unique keys and
   no alias expansion;
4. checked the Markdown-to-executable digest binding and both predecessor
   digest bindings;
5. compared format vocabulary, profiles, topology, body contracts, lifecycle,
   authority, validation, release-set, archive, and security meaning; and
6. inspected the four supported compatibility entries separately from release
   and adoption procedure.

## Finding And Correction

The first mechanical candidate accidentally changed the CommonMark version
text from `0.31.2` to `0.41.2` because an unrestricted coordinate replacement
matched the `0.3` prefix inside `0.31.2`. The same error appeared in the
executable grammar marker. Both candidate bytes were corrected back to
`CommonMark 0.31.2`, all dependent digests were recomputed, and the review was
restarted against the corrected exact pair above.

No other hidden version substring, vocabulary, parser, topology, authority,
validation, release, or security delta remained.

## Final Comparison

| Boundary | Final Result |
| --- | --- |
| Format meaning | Exact NKF 0.3 Product, Technology, and Common meaning preserved |
| Version identity | Current coordinate, paths, URIs, and artifact bindings move to `0.4` |
| Predecessor authority | Exact accepted 0.3 Markdown and executable digests are bound |
| Compatibility | 0.1 and 0.2 remain breaking and approval-gated; 0.3 to 0.4 is non-breaking with no knowledge migration; 0.4 refresh is non-breaking |
| Release freeze | Complete-set publication and candidate/public self-adoption rules are unchanged |
| Security maintenance | Patched dependency closure is allocated to derived 0.4 release bytes without adding format behavior |
| YAML structure | One strict mapping, no parse errors, expected contract and version |
| Authority symmetry | Markdown and executable companion express the same successor boundary |

## Verdict

`CLEAN` for technical acceptance of the exact pair above under
[ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md)'s
delegation. The pair introduces no unapproved normative or compatibility
change. Schema, checker, adopter, fixture, public-documentation, archive,
publication, recommendation, producer-adoption, and post-adoption claims
remain separate derived boundaries requiring their own verification.
