---
id: adr-0142
type: decision
title: "ADR 0142: Accept The Bound Predecessor Repair"
summary: Adopt and accept the second unpublished NKF 0.81 authority revision for independently verified predecessor baselines under the Human Product Owner's explicit P1 self-audit and execution delegation, preserving the first authority revision and all published bytes.
created_at: 2026-09-09T13:20:00Z
---

# ADR 0142: Accept The Bound Predecessor Repair

## Context And Problem

The subsequent PR audit reproduced a false-ready 0.81 delta baseline: deleting
its recorded closure and carrying a required dependent review still passed.
The checker reconstructed predecessor revisions from the same closure claim
it was checking. The closed baseline envelope supplied no independently bound
predecessor input, despite the recomputation obligation adopted in
[ADR 0139](0139-adopt-the-delta-closure-propagation-repair.md).

The Human Product Owner explicitly delegated the P1 audit and execution to the
Codex technical reviewer: "i need you to audit the P1 yourself and execute at
will", recorded in [NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
The reviewer resolves and audits this bounded corrective revision under that
prospective delegation. This is a delegated self-audit, not an independent
second-person audit or an assertion that the Human Product Owner personally
accepted exact bytes. It does not retroactively establish the missing
acceptance delegation claimed by [ADR 0140](0140-accept-the-nkf-0-81-authority-set.md).

## Decision

Adopt the bound-predecessor repair and accept exactly this five-artifact
second authority revision under the P1 delegation:

| Canonical Artifact | Accepted SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.81.md` | `bb6d2b58c544718b17b84076f3317aecac5a36aaa5c59a56fc82f277b3612014` |
| `contracts/nkf/0.81/nkf.yaml` | `e016a72e923e56f80ce125fb6b9fe7dfd58b4dfab2308ec3a8b27f1f9fda3fbb` |
| `contracts/nkf/0.81/freshness-policy.yaml` | `742f72d81531e48b3af2453affb3548faa85064f0dcca7e39b8e3962a7a25de4` |
| `contracts/nkf/0.81/version-delta.yaml` | `0a319702b967477ab6dbc183bedaef3c256e123d5424b1c77d56e96b7fb120bb` |
| `knowledge/evidence/release/nkf-0.81-producer-promotion.yaml` | `6939756c2ff8614f20b58c5a64aac7af14bf78deed6c269e3ce258f8dc40f25e` |

The predecessor binding names the exact historical file and its SHA-256.
The checker verifies the chain to a fully performed 0.81 whole-root review
or a supported frozen 0.8 baseline, recomputes the closure from the actual
prior revisions and judgment bases, requires exact closure equality, and
checks carried judgments against their bound predecessor. A mechanical
conclusion also binds its predecessor and preserves the existing closed Task
transition vocabulary. Sealing preserves history as part of the same logical
application transaction. Missing, corrupt, ambiguous, or unsupported proof
fails closed; whole-root review remains deliberate recovery.

## Scope And Applicability

This selection succeeds the 0.81 authority selection in
[ADR 0140](0140-accept-the-nkf-0-81-authority-set.md) for the unpublished
candidate only. The exact first five artifacts are preserved below
`knowledge/evidence/release/nkf-0.81-authority-revision-1/` and at commit
`c2c4dd989c2e46a281c54628605d7d25e3234547`; their old acceptance declaration
and immutable Decisions retain their historical bytes. Published NKF 0.8
remains the producer's authority and recommendation.

## Rationale

The self-audit compared the first revision's stated closure obligation with
its absent predecessor carrier, the sealed successor representation, the
0.8-to-0.81 migration, and the Task conclusion path. Digest-bound external
history supplies the missing reproducible input without recursively adding
baseline bytes to graph identity. The checker can now distinguish changed
subjects from voluntary extra review and refuse both narrowed and widened
closure claims. Checking the chain prevents a forged prior delta from
laundering an omitted review through a later seal.

The baseline-envelope rule becomes semantically-new relative to 0.8. There
are now two such rules and two hundred fifteen identical rules; neither new
rule appears in a judgment-dependency list, so the existing eligible judgments
remain carriable. This is an explicit pre-publication authority revision;
it is not a silent change to published 0.8 semantics or a claim that old
unpublished 0.81 candidates already carried this proof.

## Alternatives Considered

Trusting the claimed closure, treating every performed node as changed, and
checking only closure containment were rejected because each confuses an
assertion with the predecessor facts or rejects legal voluntary review.
Permanently refusing all delta review would close the false-ready result but
lose the adopted delta capability. Embedding recursive raw baseline bytes
would grow the serialized chain unnecessarily. Content-addressed historical
files keep exact predecessor bytes stable and shareable.

## Consequences And Trade-Offs

Unpublished first-revision 0.81 delta baselines without predecessor proof
cannot establish readiness under this revision. A new whole-root review or
an exact supported predecessor enables recovery; old history is never
fabricated. The evidence establishes digest and structural consistency, not
semantic truth or external reviewer authority. More historical files are
retained, and validation observes the reachable history chain. The release
candidate must be rebuilt, exercised, audited, and confirmed at its own exact
bytes before publication; earlier candidate confirmation does not extend.

## Non-Claims

This Decision accepts no implementation, test, archive, or public projection
bytes and confirms no Realization. It authorizes no publication,
recommendation, producer promotion, merge, or new Task completion. The earlier
[ADR 0141](0141-confirm-the-nkf-0-81-release-candidate.md) remains bound only
to its prior candidate archive. The self-audit and execution delegation is
limited to this P1 repair and supplies no general delegation over NKF.
