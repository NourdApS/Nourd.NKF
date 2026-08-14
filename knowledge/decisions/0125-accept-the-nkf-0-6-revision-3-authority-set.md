---
id: adr-0125
type: decision
title: "ADR 0125: Accept The NKF 0.6 Revision 3 Authority Set"
summary: Accept the exact NKF 0.6 revision 3 technical correction that resolves the revision 2 acceptance-time reference while preserving all confirmed Product meaning.
created_at: 2026-08-14T00:16:32Z
---

# ADR 0125: Accept The NKF 0.6 Revision 3 Authority Set

## Context And Problem

[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)
accepted the exact revision 2 authority and the Human-confirmed two-occurrence
historical containment for
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md). Revision 2
named its future accepting Decision as the unlinked record-ID token
[`adr-0124`](0124-accept-the-nkf-0-6-revision-2-authority-set.md) to avoid a
digest cycle. Before acceptance that token was not a resolvable same-bundle
record reference. After
[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)
was created, the same unchanged token became
resolvable and the accepted checker correctly required a deep link.

Rewriting revision 2 would violate immutable accepted-record history. The
revision 3 successor changes only that acceptance-time reference and the exact
authority-selection bindings needed to select the successor bytes. It keeps
all Human-confirmed Product meaning, including the exact two-occurrence
containment, unchanged.

## Decision

On `2026-08-14`, the Codex technical reviewer, acting under the Human Product
Owner's explicit technical-derivation delegation and the exact Product
boundaries recorded in
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md),
accepts these bytes as one inseparable NKF 0.6 revision 3 technical authority
and producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.6 Specification revision 3](../specifications/nkf-0.6-revision-3.md) | `knowledge/specifications/nkf-0.6-revision-3.md` | `bb602be39dbbb5d7c4f97726ea70a46da6af41cfc5de6c25ab6bac9beddfcb6a` |
| [NKF 0.6 executable companion revision 3](../../contracts/nkf/0.6/revision-3/nkf.yaml) | `contracts/nkf/0.6/revision-3/nkf.yaml` | `7366ea1276282990733339e5bb4464ab9d9259592d5cffb2a84b000f734fd5e4` |
| [NKF 0.6 freshness policy](../../contracts/nkf/0.6/freshness-policy.yaml) | `contracts/nkf/0.6/freshness-policy.yaml` | `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4` |
| [NKF 0.6 revision 3 producer-promotion input](../evidence/release/nkf-0.6-revision-3-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.6-revision-3-producer-promotion.yaml` | `d9f2f36e81a380f0862619093ddfdb45da0352d108e0a525104a4b399007a043` |

The Markdown is normative human-readable authority. The executable companion
is accepted only with its exact Markdown and policy bindings. The unchanged
policy remains accepted only at its exact identity and digest. The promotion
input is non-authoritative serialized input; validation and that input do not
supply acceptance. No member may be substituted independently.

For NKF 0.6 release authority, this Decision supersedes only
[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md)'s
revision 2 four-file current-release-authority selection. That Decision, its exact
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

It authorizes faithful derived revision 3 implementation inside
[NKF-027](../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md).
It does not authorize Git mutation, publication, recommendation, merge,
visibility change, or acceptance of consumer meaning.

## Rationale

A distinct authority identity preserves every immutable acceptance attempt
while preventing two current NKF 0.6 release selections. Auditing this
Decision candidate together with the linked Specification makes the accepting
record resolvable before acceptance and removes the timing-dependent reference.
Exact source, declaration, identity, section, token, occurrence, and Decision
bindings keep the containment deterministic, auditable, non-reusable, and
fail-closed.

## Alternatives Considered

Editing revision 2 or
[ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md) was
rejected because accepted bytes are immutable. Exempting the resolvable
accepting-Decision token in the checker was rejected because it would add a
new exception instead of correcting the source. Publishing first was rejected
because no 0.6 archive has been published and the stronger prepublication
process requires correction first.

## Consequences And Trade-Offs

Derived NKF 0.6 artifacts and release selection bind only the revision 3 paths
and exact digests. Promotion transactionally preserves
[ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md) source bytes,
replaces its native declaration with the locked Evidence representation,
creates the revision 3 Specification declaration, regenerates integration, and
seals the separately reviewed graph. Repeat Adopt verifies the complete
terminal state before returning `current`.

Any later authority or promotion-input byte change requires a fresh governed
successor and independent audit. Candidate Adopt, implementation rehearsal,
technical confirmation, publication, public self-adoption, post-adoption audit,
and merge remain separate later stages.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0122](../decisions/0122-accept-the-nkf-0-6-authority-set.md),
  [ADR 0123](../decisions/0123-accept-the-conformant-nkf-0-6-authority-set.md),
  or [ADR 0124](../decisions/0124-accept-the-nkf-0-6-revision-2-authority-set.md);
- contain any diagnostic beyond the exact two listed above;
- derive or confirm implementation, release-set, archive, licensing-readiness,
  or Realization bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, commit, push, merge, or change visibility;
  or
- accept consumer Product or Technology meaning.
