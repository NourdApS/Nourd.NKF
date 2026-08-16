---
id: adr-0127
type: decision
title: "ADR 0127: Accept The NKF 0.7 Authority Set"
summary: Accept the exact independently audited NKF 0.7 authority set — specification, executable companion, evaluation policy, per-rule version delta, and serialized producer-promotion input — under the recorded delegation and the Human Product Owner's audit condition.
created_at: 2026-08-17T09:30:00Z
---

# ADR 0127: Accept The NKF 0.7 Authority Set

## Context And Problem

[ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
adopted the NKF 0.7 verifiable-delta-review direction with every
Human-confirmed boundary recorded in the
[NKF 0.7 Design](../designs/items/nkf-0-7-verifiable-delta-review.md).
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
derived the exact candidate authority, exercised it on fixtures and an
isolated copy of the real producer, and amended the candidate twice on that
evidence before any acceptance. The Human Product Owner conditioned delegated
acceptance on an independent audit. Three adversarial rounds were performed
and recorded in the
[NKF 0.7 Independent Authority Audit](../evidence/audits/nkf-028-nkf-0-7-independent-authority-audit.md):
round one found eight defects, round two verified their fixes and found one
rebinding regression with four lesser defects, and round three verified the
complete corrected digest chain clean.

## Decision

On `2026-08-17`, the Claude technical reviewer, acting under the Human
Product Owner's explicit technical-derivation and acceptance delegation, the
Human-confirmed boundaries recorded in
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md),
and the satisfied independent-audit condition, accepts these bytes as one
inseparable NKF 0.7 technical authority and producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.7 Specification](../specifications/nkf-0.7.md) | `knowledge/specifications/nkf-0.7.md` | `5fb91a603982de9741400a95809d359b79aa2883d08d7b4e36d150c9ff204ef0` |
| [NKF 0.7 executable companion](../../contracts/nkf/0.7/nkf.yaml) | `contracts/nkf/0.7/nkf.yaml` | `936c1795fe2facc83cb4c80c82d37fa6622293b24b4e10a70174baf56f86fe9a` |
| [NKF 0.7 freshness policy](../../contracts/nkf/0.7/freshness-policy.yaml) | `contracts/nkf/0.7/freshness-policy.yaml` | `7bee48aac0fef1b1cc968efa25f2a6fb2205c77a0ec3fcf6c82ec17cdd5eeee0` |
| [NKF 0.6-to-0.7 version-delta declaration](../../contracts/nkf/0.7/version-delta.yaml) | `contracts/nkf/0.7/version-delta.yaml` | `dcc65c82512c73a204223a3bac990c951f44e995d5859426479042dbef8fcb37` |
| [NKF 0.7 producer-promotion input](../evidence/release/nkf-0.7-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.7-producer-promotion.yaml` | `afd411e37976f7543ef132a48ccebe5a948dcae7f7377295a09d860c8ab7fc84` |

The Markdown is normative human-readable authority. The executable companion,
policy, and version-delta declaration are accepted only with their exact
mutual digest bindings. The promotion input is non-authoritative serialized
input carrying the complete future native Specification declaration and its
exact destination; validation and that input do not supply acceptance, and
the input deliberately carries no accepting-Decision digest — this Decision
binds the input instead. No member may be substituted independently.

This acceptance covers the per-rule version-delta classifications, the
policy-declared `judgment_dependencies` lists, and the one accepted identity
succession the authority declares. The accepted NKF 0.6 revision 3 selection
of
[ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
remains the current live release authority. Only upon the separately
authorized NKF 0.7 publication and public producer promotion does this
acceptance become the current release-authority selection, at which point the
revision 3 selection becomes accepted history; that Decision, its exact
bytes, and its historical acceptance fact remain immutable governed history
throughout.

## Scope And Applicability

This Decision implements the direction adopted by
[ADR 0126](../decisions/0126-adopt-the-nkf-0-7-verifiable-delta-review-direction.md)
inside
[NKF-028](../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md).
It authorizes faithful derived 0.7 implementation, the candidate-bound
promotion rehearsal into an isolated exact producer copy, and preparation of
the release candidate. It does not authorize Git mutation of the default
branch, publication, recommendation, merge, visibility change, live producer
promotion, or acceptance of consumer meaning; each of those remains a
separately authorized later act.

## Rationale

The audit condition replaces trust in the deriving agent with three
independent adversarial verifications on the exact bytes, recorded as
governed Evidence. Accepting the five artifacts as one inseparable set keeps
the specification, its executable derivation, the evaluation policy, the
delta classifications, and the serialized promotion input in a single
digest-bound authority whose members cannot drift apart silently — the exact
failure class round two caught and the freeze script now prevents.

## Alternatives Considered

Waiting for the Human Product Owner to read and accept the specification
personally was offered and declined in favor of delegated acceptance with an
independent audit. Accepting before the audit was rejected as violating the
recorded condition. Accepting the specification without the promotion input
was rejected because the promotion's declaration bytes would then be
unaccepted implementation input at the exact moment they become a native
accepted record.

## Consequences And Trade-Offs

Derived NKF 0.7 artifacts, the release set, and the promotion bind only these
paths and digests. Any later byte change to any member requires a fresh
governed successor Decision and a fresh independent audit. The candidate
exercise, fresh release audit, technical confirmation, publication,
recommendation, public self-adoption, and merge remain separate later stages
in the accepted release order.

## Non-Claims

This Decision does not:

- rewrite, retract, or de-govern
  [ADR 0125](../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
  or any earlier accepted Decision;
- derive or confirm implementation, release-set, archive, or Realization
  bytes;
- establish repository conformance, release readiness, or Governing Use;
- publish, recommend, release, adopt, promote the live producer, commit,
  push, merge, or change visibility; or
- accept consumer Product or Technology meaning.
