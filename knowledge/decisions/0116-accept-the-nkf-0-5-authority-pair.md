---
title: "ADR 0116: Accept The NKF 0.5 Authority Pair"
id: adr-0116
type: decision
summary: Accept the exact independently audited NKF 0.5 normative Markdown, executable companion, and freshness policy as the technical realization of ADR 0115's fixed Product direction.
created_at: 2026-08-13T10:00:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-026
decision_authority: Codex technical reviewer under the Human Product Owner's explicit NKF 0.5 technical derivation delegation
---

# ADR 0116: Accept The NKF 0.5 Authority Pair

## Context And Problem

[ADR 0115](0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopts 23 individually Human-Product-Owner-confirmed boundaries for stable
document nodes, YAML-owned lifecycle and graph relationships, contextual
freshness, conservative impact analysis, revision-bound reviewed baselines,
and whole-root readiness. It deliberately leaves exact serialization,
compatibility, Schemas, policy, receipts, migration, checker, adopter, and
release mechanics for the separately directed
[NKF-026](../tasks/active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
technical Task.

The exact prospective pair and policy were repeatedly reviewed and corrected.
The final fresh
[authority-pair audit](../evidence/audits/nkf-026-nkf-0-5-authority-pair-audit.md)
returned `CLEAN` only after bootstrap, migration, stable identity and paths,
closed graph/evaluation serialization, external authority, diagnostics,
release membership, and both self-adoption stages were coherent.

## Decision

On `2026-08-13`, the Codex technical reviewer, acting only under the explicit
technical derivation delegation recorded by the linked Task, accepts these
exact bytes together as the canonical NKF 0.5 authority set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.5 Specification](../specifications/nkf-0.5.md) | `knowledge/specifications/nkf-0.5.md` | `d93e8da4e3abeb7d047d15351f2003d2d242596790fb7db94be994b7e88499dc` |
| [NKF 0.5 executable companion](../../contracts/nkf/0.5/nkf.yaml) | `contracts/nkf/0.5/nkf.yaml` | `73d9cf683a799729fba6fb64e59aefef0477601827f8f0045aec7d95955d3fd2` |
| [NKF 0.5 freshness policy](../../contracts/nkf/0.5/freshness-policy.yaml) | `contracts/nkf/0.5/freshness-policy.yaml` | `5789b935e8df4fa39462846481f3302d072c722fa106da5d136952cb9c993cdd` |

The Markdown is normative human authority. The executable companion is
accepted only with its exact Markdown-digest binding. The freshness policy is
accepted only with its exact identity and companion-digest binding. None may
be replaced independently.

## Scope And Applicability

This Decision accepts the exact technical derivation of the linked Decision
and no new Product boundary. It authorizes derived 0.5 Schemas, checker, adopter,
fixtures, examples, protocols, public documentation, producer declarations,
Realization mapping, and release membership under the linked Task.

NKF 0.5 governs a repository only when that repository deliberately adopts
and declares version `0.5`. NKF 0.1, NKF 0.2, NKF 0.3, and NKF 0.4 remain
immutable authority for repositories declaring those versions.

## Rationale

The accepted set leaves one human-readable meaning authority and one exact
executable representation while separately binding the versioned evaluation
policy. It closes every serialization needed for portable implementation,
preserves external and repository authority, fails closed on incomplete graph
knowledge, and retains the evidence-bounded limitation that semantic
completeness is a named review claim rather than deterministic proof.

The `accepted_bootstrap_lock` is necessary because the exact Specification
source remains a truthful NKF 0.4 Draft envelope during pre-acceptance review.
This Decision supplies the only authorized Draft-to-accepted basis; candidate
Adopt may preserve those exact bytes while making the 0.5 YAML declaration the
current lifecycle authority. Validation and the lock itself cannot accept the
record.

## Alternatives Considered

Writing accepted state into the source before an acceptance Decision was
rejected as a false authority claim. Rewriting audited source bytes after this
Decision was rejected because it would break the exact binding. Keeping
lifecycle truth in Markdown or filesystem placement was rejected because it
would recreate stale content and accepted-record mutation. Treating AI review
as proof of graph completeness was rejected by the linked Decision.

## Consequences And Trade-Offs

All derived 0.5 artifacts must bind these exact digests and implement their
closed behavior. Any authority-set byte change before publication requires a
new exact audit and later governed acceptance. Publication freezes the exact
complete set permanently; a later correction requires a successor NKF
version.

Migration from 0.1 through 0.4 is breaking and requires repository-owner
approval. It preserves canonical Markdown bytes and stable existing paths,
but requires exact declarations, generated navigation, a named whole-root
semantic review, and a confirmed graph baseline before sealing.

## Non-Claims

This Decision does not:

- derive or confirm any Schema, checker, adopter, fixture, documentation,
  Realization, release-set, archive, recommendation, or producer-adoption byte;
- prove the semantic completeness or truth of a consumer graph or baseline;
- accept consumer Product or Technology meaning;
- publish, recommend, adopt, or establish readiness for NKF 0.5;
- confirm the current-system Realization;
- claim the prepublication candidate-Adopt or public self-adoption stages have
  occurred; or
- establish remote enforcement, acceptance-binding verification, public
  distribution, or Governing Use readiness.
