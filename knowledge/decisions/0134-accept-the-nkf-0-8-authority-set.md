---
id: adr-0134
type: decision
title: "ADR 0134: Accept The NKF 0.8 Authority Set"
summary: Accept the audited NKF 0.8 authority set — the successor Specification, its digest-bound executable companion, the 0.8 evaluation policy, the 0.71-to-0.8 per-rule version delta, and the producer-promotion input — as one inseparable technical authority and producer-promotion set, superseding the NKF 0.71 release-authority selection only at the separately authorized publication and public promotion.
created_at: 2026-08-19T01:30:00Z
---

# ADR 0134: Accept The NKF 0.8 Authority Set

## Context And Problem

[ADR 0133](../decisions/0133-adopt-the-nkf-0-8-generated-distribution-direction.md)
adopted the NKF 0.8 generated-distribution direction and allocated the `0.8`
coordinate. The exact candidate authority set was derived under
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
and received the fresh independent audit the Human Product Owner's standing
acceptance condition requires, recorded in the
[independent authority audit](../evidence/audits/nkf-033-nkf-0-8-independent-authority-audit.md).

The audit returned not clean: nine blocking findings, five should-fix, and
four notes. Seven of the nine blocking findings were predecessor copy-forward
the derivation never enumerated, concentrated in the producer-promotion block,
and one was the complete executable silence on the Specification's own new
whole-set guidance-review requirement. Every blocking and should-fix finding is
repaired and each note is repaired or recorded with an explicit disposition;
the derived artifacts the repair invalidated were reseeded, rebound, and
regenerated, and the complete digest chain was re-verified across twenty-five
bindings.

## Decision

On `2026-08-19`, the Claude technical reviewer, acting under the recorded
delegation in
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
with the Human Product Owner's independent-audit condition satisfied, accepts
the exact repaired bytes as one inseparable NKF 0.8 technical authority and
producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.8 Specification](../specifications/nkf-0.8.md) | `knowledge/specifications/nkf-0.8.md` | `6a5c571d6dcc1a00c52467095e8835458d829c67e5c9e72f9363fe66cec2982e` |
| [NKF 0.8 executable companion](../../contracts/nkf/0.8/nkf.yaml) | `contracts/nkf/0.8/nkf.yaml` | `6d162800ecb2a41fb9b6ead544cc0d5ecd4dc119cd72298138a4d17ccd822326` |
| [NKF 0.8 freshness policy](../../contracts/nkf/0.8/freshness-policy.yaml) | `contracts/nkf/0.8/freshness-policy.yaml` | `7cfb1b40a8b6f86543cb7b6016c6e9b2c1159d2a748c1915d0e9bf51bb82afd4` |
| [NKF 0.71-to-0.8 version-delta declaration](../../contracts/nkf/0.8/version-delta.yaml) | `contracts/nkf/0.8/version-delta.yaml` | `cc17f23a44afcf56b107f3e76e4d761779a4225bd2f8955c51d9781193c9c8b9` |
| [NKF 0.8 producer-promotion input](../evidence/release/nkf-0.8-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.8-producer-promotion.yaml` | `274e978941833d747ff27b7693788c9f07d92139d3c75074c9eccd0a54947d03` |

The accepted set makes a guidance file's frontmatter self-description a checked
conformance position through one added registry rule, requires every
version-bearing member of the complete set to be derived from one
version-neutral authored source with the version injected and no emitted member
an input to producing another, binds the pre-cut whole-set guidance review and
its independent-audit verification to the deterministically enumerated release
set, and slides the live window to exactly NKF 0.8 plus NKF 0.71 with the
published 0.71 archive as the NKF 0.7 stepping stone. The 0.71-to-0.8 version
delta declares two hundred fifteen identical rules and exactly one semantically
new rule, with the evaluation policy's judgment-dependency lists unchanged and
the new rule in none of them, so every existing review judgment remains
carriable by digest identity and the producer promotion is provable through the
delta claim alone.

For NKF 0.8 authority, this Decision establishes the accepted selection. The
accepted NKF 0.71 selection of
[ADR 0131](../decisions/0131-accept-the-nkf-0-71-authority-set.md) remains the
current live release authority, and this Decision supersedes only that
release-authority selection — never its bytes, its historical acceptance fact,
or its other conclusions — effective at the separately authorized NKF 0.8
publication and public producer promotion.

## Scope And Applicability

Faithful derived implementation, fixtures, the candidate-bound promotion
rehearsal, and release-candidate preparation inside
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md);
no publication, recommendation, merge, visibility change, live promotion, or
consumer-meaning acceptance. The producer's own adoption to published NKF 0.8
is separate work on its own stacked pull request. Derived NKF 0.8 artifacts,
the release set, and the promotion bind only these paths and digests; any later
authority byte change requires a fresh governed successor and independent
audit.

## Rationale

The stale label this release corrects lives inside published immutable bytes
and the checks that would have caught it are locked out by the installed pin,
so only an accepted successor can carry the correction, and the Human Product
Owner's standing condition — acceptance under delegation only after a fresh
independent audit — is satisfied by the recorded audit of these exact bytes.
Accepting the promotion input in the same act keeps the acceptance and the
promotion mechanics bound to one digest chain without a self-reference cycle:
the input carries no accepting-Decision digest, and this Decision binds the
input's digest instead.

## Alternatives Considered

Accepting the authority pair without the promotion input was rejected because
the 0.7 and 0.71 lineage proved the input, declaration, and acceptance form one
chain that must freeze together. Deferring acceptance until after
implementation was rejected because the accepted release order derives
implementation from accepted meaning, not the reverse. Accepting the
first-round candidate was not available: the audit returned nine blocking
findings, and the standing condition requires acceptance over repaired bytes.

## Consequences And Trade-Offs

Implementation, fixtures, release membership, and the exercised promotion now
bind these exact digests; any audit-relevant defect found later in the accepted
bytes requires a fresh governed revision and a new independent audit. One rule
joins the stable registry that every future version inherits, and the accepted
integration chain becomes version-keyed, which every future version must
maintain deliberately. Until the separately authorized publication and
promotion, the live producer remains on NKF 0.71 and every 0.8 claim stays
candidate-scoped.

One question is deliberately left open rather than settled here. The audit
recorded that
[ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md)
clause two and the accepted release protocol's step four state the pre-cut
review's scope differently: the Decision says every member of the versioned set
is re-read in full, while the protocol that implements it enumerates every
member and re-reads each shipped protocol and portable skill. The accepted NKF
0.8 Specification follows the accepted protocol's scope and states the
distinction explicitly instead of conflating it. That is a reading of existing
accepted meaning, not new meaning, and it is flagged to the Human Product Owner
for confirmation rather than treated as resolved.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0131](../decisions/0131-accept-the-nkf-0-71-authority-set.md),
  [ADR 0132](../decisions/0132-confirm-the-nkf-0-71-release-candidate.md), or
  any earlier accepted Decision;
- restate, revise, or duplicate
  [ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md);
- derive or confirm implementation, release-set, archive, or Realization
  bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, promote the live producer, commit, push,
  merge, or change visibility; or
- accept consumer Product or Technology meaning.
