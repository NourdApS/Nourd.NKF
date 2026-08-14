# NKF-026 NKF 0.5 Revision 2 Authority Pair Audit

## Audit Boundary

This Evidence records the restarted independent technical audit of the exact
NKF 0.5 revision 2 normative Markdown, executable companion, and unchanged
freshness policy. It follows the prepublication contradiction found while
implementing the pair accepted by
[ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md). The
review used immutable NKF 0.4, the exact adopted Product direction in
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md),
the universal truthful Task-gate requirement in
[ADR 0077](../../decisions/0077-decision-applicability-gate.md), and the
publication sequence in
[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
as governing inputs. It accepts or confirms nothing by itself.

## Exact Clean Inputs

| Input | SHA-256 |
| --- | --- |
| Prospective NKF 0.5 revision 2 Markdown | `0f3b7c085eba4fa92655e20916fccb7013169b5560dd50c241fb4726df31287c` |
| Prospective NKF 0.5 revision 2 executable companion | `2743102a4bddf9a26253fba3982f00bf9c688c819891815221e3ea4ee67c5290` |
| Unchanged NKF 0.5 freshness policy | `5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd` |
| ADR 0116 accepted predecessor Markdown | `d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc` |
| ADR 0116 accepted predecessor executable | `73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2` |
| ADR 0116 Decision | `777ecabcbab3c106f2889661125a923ce0f331a759a4bd2b6b0d18e7ed542ee8` |

## Independent Method

The reviewer discarded every earlier byte target whenever any candidate byte
changed. The final fresh pass independently:

1. verified exact candidate, policy, predecessor, Design, and Decision hashes;
2. strict-parsed both YAML inputs with unique keys and safe YAML restrictions;
3. ran the actual NKF 0.4 deep-reference matcher and resolved every ordinary
   Markdown link from the declared successor destination;
4. checked the distinct successor identity, canonical paths, 0.4 bootstrap
   envelope, exact UTC creation provenance, and immutable predecessor lock;
5. compared the complete executable shapes and 14-entry relationship policy
   to the normative Markdown and all 23 Human-Product-Owner-confirmed Product
   boundaries;
6. rechecked external dependencies, authority inputs, graph revisions,
   baseline review, impact selection, result nullability, release membership,
   and both ADR 0109 adoption stages; and
7. rechecked the retrospective Task-gate transformation for exact byte rules,
   semantic-review authority, rollback, idempotence, and historical honesty.

## Corrected Prepublication Finding

The pair accepted by ADR 0116 required exact preservation of every predecessor
Markdown byte. Implementation then proved that a predecessor Task without a
Decision Applicability Gate could not both remain byte-identical and satisfy
ADR 0077's Human-Product-Owner-confirmed requirement that every Task carry a
truthful gate, including retrospective history.

Revision 2 resolves the contradiction without weakening ADR 0077 or inventing
historical meaning. Exactly and only a predecessor Task missing the gate is
stopped for named semantic review. The reviewer supplies one explicit
retrospective gate whose fixed disclosure says it was added during migration
and does not claim historical extraction. The normalized source is the exact
predecessor bytes followed by UTF-8 `LF LF` and the exact reviewed gate bytes.
Every other predecessor source byte and stable path remains exact.

The original ADR 0116 pair remains immutable accepted prepublication history
under its original identity and paths. Revision 2 uses a distinct identity and
paths. Its closed supersession lock requires both ADR 0116 and a later exact
correction Decision before the predecessor can be declared superseded for 0.5
publication; neither validation nor either lock supplies acceptance.

## Verdict

`CLEAN` for technical acceptance of only the exact three inputs above under
the Human Product Owner's recorded technical-derivation delegation. No
material contradiction, ambiguity, underbinding, migration impossibility,
unapproved Product meaning, or false lifecycle claim remained.

The final candidate creation timestamp is also exact: filesystem birth epoch
`1786620395` is `2026-08-13T11:26:35Z`, matching the revision 2 frontmatter.
The temporary audited inputs and promoted repository files were byte-identical
at the end of the audit. The audit changed no repository file or Git state.

## Non-Claims And Limitations

This audit does not:

- accept either authority pair or change ADR 0116's historical fact;
- derive or confirm Schemas, checker, adopter, fixtures, documentation,
  Realization, release set, archive, or recommendation bytes;
- prove graph semantic completeness or reviewer authority;
- publish, recommend, adopt, or establish readiness for NKF 0.5;
- confirm a Product or Technology Realization; or
- establish remote enforcement, acceptance-binding verification, public
  distribution, or Governing Use readiness.
