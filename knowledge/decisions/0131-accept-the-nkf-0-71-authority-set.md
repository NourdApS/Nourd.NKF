---
id: adr-0131
type: decision
title: "ADR 0131: Accept The NKF 0.71 Authority Set"
summary: Accept the audited NKF 0.71 corrective-successor authority set — the reconciled successor Specification, its digest-bound executable companion, the 0.71 evaluation policy, the 0.7-to-0.71 per-rule version delta, and the producer-promotion input — as one inseparable technical authority and producer-promotion set, superseding the NKF 0.7 release-authority selection only at the separately authorized publication and public promotion.
created_at: 2026-08-17T18:46:00Z
---

# ADR 0131: Accept The NKF 0.71 Authority Set

## Context And Problem

[ADR 0130](../decisions/0130-adopt-the-nkf-0-71-corrective-successor-direction.md)
adopted the NKF 0.71 corrective-successor direction and allocated the `0.71`
coordinate. The exact candidate authority set was derived under
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md) and
received the fresh independent audit the Human Product Owner's standing
acceptance condition requires, recorded in the
[independent authority audit](../evidence/audits/nkf-031-nkf-0-71-independent-authority-audit.md):
a first round returned six blocking predecessor copy-forward findings
inside the executable companion's deterministic-mechanics chapter, all
were repaired, and the second round returned clean over the repaired
bytes with the complete digest chain reverified and two non-blocking
notes recorded with their dispositions.

## Decision

On `2026-08-17`, the Claude technical reviewer, acting under the recorded
delegation in
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md) with the
Human Product Owner's independent-audit condition satisfied, accepts the
exact audited bytes as one inseparable NKF 0.71 technical authority and
producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.71 Specification](../specifications/nkf-0.71.md) | `knowledge/specifications/nkf-0.71.md` | `ec6d7fd733a989eb86580bd3a9d77405d3c02d5402429190ad8d171c4414ae98` |
| [NKF 0.71 executable companion](../../contracts/nkf/0.71/nkf.yaml) | `contracts/nkf/0.71/nkf.yaml` | `65b5bec3dd16cd1872216b2dc17acbe77f1a363e76112f675a271e337cf6ec1a` |
| [NKF 0.71 freshness policy](../../contracts/nkf/0.71/freshness-policy.yaml) | `contracts/nkf/0.71/freshness-policy.yaml` | `20c7b5f4e34f88da6c8365a59cee913020263c2c4ab36796602a2a7cb0ab1ae4` |
| [NKF 0.7-to-0.71 version-delta declaration](../../contracts/nkf/0.71/version-delta.yaml) | `contracts/nkf/0.71/version-delta.yaml` | `21089afc8155a98410960e2fa7cf19344e1e5ca010095a0f7975dc783d730c01` |
| [NKF 0.71 producer-promotion input](../evidence/release/nkf-0.71-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.71-producer-promotion.yaml` | `9f942eae2b25417d3f4ade577587d04577982aa969f51a6ac045e83865cc431a` |

The accepted set reconciles the topology contradiction in prose and
executable explicitly, corrects every copy-forward version label, defines
the seal-completing conclusion through the `mechanically-concluded` claim
with its closed transition vocabulary and computed conclusion carry, and
slides the live window to exactly NKF 0.71 plus NKF 0.7 under the standing
conditional policy. The 0.7-to-0.71 version delta declares two hundred
thirteen identical rules and exactly two semantically new conclusion rules,
with the evaluation policy's judgment-dependency lists unchanged, so every
existing review judgment remains carriable by digest identity and the
producer promotion is provable through the delta claim alone.

For NKF 0.71 authority, this Decision establishes the accepted selection.
The accepted NKF 0.7 selection of
[ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
remains the current live release authority, and this Decision supersedes
only that release-authority selection — never its bytes, its historical
acceptance fact, or its other conclusions — effective at the separately
authorized NKF 0.71 publication and public producer promotion.

## Scope And Applicability

Faithful derived implementation, fixtures, the candidate-bound promotion
rehearsal, and release-candidate preparation inside
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md); no
publication, recommendation, merge, visibility change, live promotion, or
consumer-meaning acceptance. Derived NKF 0.71 artifacts, the release set,
and the promotion bind only these paths and digests; any later authority
byte change requires a fresh governed successor and independent audit.

## Rationale

The sixth-audit findings live inside accepted immutable bytes, so only an
accepted successor can correct them, and the Human Product Owner's standing
condition — acceptance under delegation only after a fresh independent
audit — is satisfied by the recorded audit of these exact bytes. Accepting
the promotion input in the same act keeps the acceptance and the promotion
mechanics bound to one digest chain without a self-reference cycle: the
input carries no accepting-Decision digest, and this Decision binds the
input's digest instead.

## Alternatives Considered

Accepting the authority pair without the promotion input was rejected
because the 0.7 lineage proved the input, declaration, and acceptance form
one chain that must freeze together. Deferring acceptance until after
implementation was rejected because the accepted release order derives
implementation from accepted meaning, not the reverse.

## Consequences And Trade-Offs

Implementation, fixtures, release membership, and the exercised promotion
now bind these exact digests; any audit-relevant defect found later in the
accepted bytes requires a fresh governed revision and a new independent
audit, exactly as the 0.7 lineage's rehearsal-driven revision did. Until
the separately authorized publication and promotion, the live producer
remains on NKF 0.7 and every 0.71 claim stays candidate-scoped.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0128](../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md),
  [ADR 0129](../decisions/0129-confirm-the-nkf-0-7-release-candidate.md), or
  any earlier accepted Decision;
- derive or confirm implementation, release-set, archive, or Realization
  bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, promote the live producer, commit,
  push, merge, or change visibility; or
- accept consumer Product or Technology meaning.
