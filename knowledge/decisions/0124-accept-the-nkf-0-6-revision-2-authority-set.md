---
id: adr-0124
type: decision
title: "ADR 0124: Accept The NKF 0.6 Revision 2 Authority Set"
summary: Accept the exact independently audited NKF 0.6 revision 2 authority and producer-promotion set with the Human-confirmed two-occurrence historical containment.
created_at: 2026-08-13T23:55:38Z
---

# ADR 0124: Accept The NKF 0.6 Revision 2 Authority Set

## Context And Problem

[ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)
accepted the original four-file NKF 0.6 release-authority selection. The first
native producer-promotion rehearsal then proved that preserving
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) as ordinary
Evidence was insufficient. Its immutable source contains exactly two otherwise
reportable same-bundle references: one to
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
and one to
[ADR 0121](../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md).

The Human Product Owner explicitly confirmed that
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) remains byte-exact,
digest-bound, graph-visible historical Evidence rather than current release
authority, and that only those two exact occurrences may be contained through
a closed non-reusable rule. Every other deep-link violation remains enforced.
The resulting distinct four-file authority target received a fresh independent
read-only audit and returned `CLEAN`.

## Decision

On `2026-08-13`, the Codex technical reviewer, acting under the Human Product
Owner's explicit technical-derivation delegation and exact later containment
confirmations recorded in
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md),
accepts these bytes as one inseparable NKF 0.6 revision 2 technical authority
and producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.6 Specification revision 2](../specifications/nkf-0.6-revision-2.md) | `knowledge/specifications/nkf-0.6-revision-2.md` | `6cda03da38ebf5f68fa5565805ea720acf8edff1598a3a43c91f1bf839934f12` |
| [NKF 0.6 executable companion revision 2](../../contracts/nkf/0.6/revision-2/nkf.yaml) | `contracts/nkf/0.6/revision-2/nkf.yaml` | `86eb49c83f89261f30f9eb8f39aef93755058e9314eeb804b925fbed19f65cb1` |
| [NKF 0.6 freshness policy](../../contracts/nkf/0.6/freshness-policy.yaml) | `contracts/nkf/0.6/freshness-policy.yaml` | `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4` |
| [NKF 0.6 revision 2 producer-promotion input](../evidence/release/nkf-0.6-revision-2-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.6-revision-2-producer-promotion.yaml` | `f530ddec1704a6d2e1ea99124cdde1471716b35352c58ab972a4c1f274277933` |

The Markdown is normative human-readable authority. The executable companion
is accepted only with its exact Markdown and policy bindings. The unchanged
policy remains accepted only at its exact identity and digest. The promotion
input is non-authoritative serialized input; validation and that input do not
supply acceptance. No member may be substituted independently.

For NKF 0.6 release authority, this Decision supersedes only
[ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md)'s
original four-file current-release-authority selection. That Decision, its exact
bytes, historical acceptance fact, and conclusions outside that narrow
selection remain immutable governed history.

The exact containment covers only these ordered diagnostics in the unchanged
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) source:

1. `markdown.reference.deep-link.required` for
   [`NKF-027`](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md) in `Scope And
   Applicability`, occurrence `1`; and
2. `markdown.reference.deep-link.required` for
   [`ADR 0121`](../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md) in `Alternatives
   Considered`, occurrence `1`.

Every source, declaration, identity, path, section, token, occurrence, and
digest must match the accepted promotion input. Any mismatch, reuse, third
occurrence, or other deep-link violation fails closed.

## Scope And Applicability

This Decision implements the direction adopted by
[ADR 0121](../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md),
the release order of
[ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md),
and the later Human-confirmed containment boundary above. It adds no other
Product meaning and creates no reusable historical-record exemption.

It authorizes faithful derived revision 2 implementation inside
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It does not authorize Git mutation, publication, recommendation, merge,
visibility change, or acceptance of consumer meaning.

## Rationale

A distinct authority identity preserves every immutable acceptance attempt
while preventing two current NKF 0.6 release selections. Exact source,
declaration, identity, section, token, occurrence, and Decision bindings keep
the containment deterministic, auditable, non-reusable, and fail-closed.

## Alternatives Considered

Editing [ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) or
[ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md) was
rejected because accepted Decision bytes are immutable. A general Evidence or
producer exemption was rejected because it would exceed the Human-confirmed
boundary. Publishing first was rejected because no 0.6 archive has been
published and the stronger prepublication process requires correction first.

## Consequences And Trade-Offs

Derived NKF 0.6 artifacts and release selection bind only the revision 2 paths
and exact digests. Promotion transactionally preserves
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) source bytes,
replaces its native declaration with the locked Evidence representation,
creates the revision 2 Specification declaration, regenerates integration, and
seals the separately reviewed graph. Repeat Adopt verifies the complete
terminal state before returning `current`.

Any later authority or promotion-input byte change requires a fresh governed
successor and independent audit. Candidate Adopt, implementation rehearsal,
technical confirmation, publication, public self-adoption, post-adoption audit,
and merge remain separate later stages.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) or
  [ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md);
- contain any diagnostic beyond the exact two listed above;
- derive or confirm implementation, release-set, archive, licensing-readiness,
  or Realization bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, commit, push, merge, or change visibility;
  or
- accept consumer Product or Technology meaning.
