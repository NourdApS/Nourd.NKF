---
id: adr-0140
type: decision
title: "ADR 0140: Accept The NKF 0.81 Authority Set"
summary: Accept the audited NKF 0.81 authority set — the successor Specification, its digest-bound executable companion, the 0.81 evaluation policy, the 0.8-to-0.81 per-rule version delta, and the producer-promotion input — as one inseparable technical authority and producer-promotion set after a three-round independent audit whose last round found no material finding, superseding the NKF 0.8 release-authority selection only at the separately authorized publication and public promotion.
created_at: 2026-09-08T20:05:00Z
---

# ADR 0140: Accept The NKF 0.81 Authority Set

## Context And Problem

[ADR 0138](0138-adopt-the-nkf-0-81-public-adoption-direction.md) adopted the
NKF 0.81 direction and allocated the coordinate, and
[ADR 0139](0139-adopt-the-delta-closure-propagation-repair.md) adopted the
delta-closure propagation repair as its seventh boundary, after the Human
Product Owner confirmed every boundary verbatim on `2026-09-08`. Neither
accepted an authority set. The release protocol's first precondition is that
immutable Decisions adopt the change and allocate the coordinate; its second is
that the exact candidate Specification revision and its digest-bound
executable companion are accepted. This Decision is the second.

The candidate set was derived from the accepted NKF 0.8 set by one recorded
mechanical derivation with authored insertions, and audited three times by
independent agent instances as recorded in the
[independent authority audit](../evidence/audits/nkf-038-nkf-0-81-independent-authority-audit.md).
The first round found six material and seven minor findings; the second found
eleven repaired and two further material findings that no label-neutralized
diff could show, because the 0.8 producer-promotion block and lineage paragraph
carried identical literals; the third found every finding repaired, the digest
chain closed, the Schemas byte-identical on regeneration, and no material
finding. Two minor findings from the third round were repaired afterwards and
are stated as such.

## Decision

On `2026-09-08`, the Claude technical reviewer, acting under the delegation
recorded in
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
with the Human Product Owner's independent-audit condition satisfied, accepts
the exact repaired bytes as one inseparable NKF 0.81 technical authority and
producer-promotion set:

| Artifact | Canonical Path | Accepted SHA-256 |
| --- | --- | --- |
| [NKF 0.81 Specification](../specifications/nkf-0.81.md) | `knowledge/specifications/nkf-0.81.md` | `b6a3991cde1121a87842e2464e16145346e72c7ee82b2040621bad851bb1da45` |
| [NKF 0.81 executable companion](../../contracts/nkf/0.81/nkf.yaml) | `contracts/nkf/0.81/nkf.yaml` | `004969c10d74191274f74a4dce0b9aebb983d52a70ee3351e05e18086dc78cb4` |
| [NKF 0.81 freshness policy](../../contracts/nkf/0.81/freshness-policy.yaml) | `contracts/nkf/0.81/freshness-policy.yaml` | `742f72d81531e48b3af2453affb3548faa85064f0dcca7e39b8e3962a7a25de4` |
| [NKF 0.8-to-0.81 version-delta declaration](../../contracts/nkf/0.81/version-delta.yaml) | `contracts/nkf/0.81/version-delta.yaml` | `9908a65fbd31e1c7e5c6ce9f70769d54142a57e0a446643b0abea51c07ccdf42` |
| [NKF 0.81 producer-promotion input](../evidence/release/nkf-0.81-producer-promotion.yaml) | `knowledge/evidence/release/nkf-0.81-producer-promotion.yaml` | `cee895a59ef8366d1dc50ca199e4fa8e6c3d7e166e8adf3a50f2eceb681bbb88` |

The accepted set makes the recommended-release catalog the closed contract
`nkf.recommended-release` with a channel vocabulary of `internal-exact-candidate`,
the historical `internal-private-github-prerelease` that a catalog through
NKF 0.8 may state and a 0.81 catalog may not, `public-github-prerelease`, and
`public-github-release`, resolved over plain HTTPS with the archive digest and
installed pin as the only trust anchors and no command-line tool; adds one
closed registry of exactly three volatile operating-system basenames that
onboarding records and excludes from the drift digest; requires the checker to
recompute the delta-review closure with the evaluation policy's impact
propagation and to refuse a claim whose recorded closure differs, through one
added registry rule; and slides the live window to exactly NKF 0.81 plus
NKF 0.8 with the published 0.8 archive as the NKF 0.71 stepping stone. The
0.8-to-0.81 version delta declares two hundred sixteen identical rules and
exactly one semantically-new rule, in no judgment-dependency list, so every
existing review judgment remains carriable by digest identity and the producer
promotion is provable through the delta claim alone.

For NKF 0.81 authority, this Decision establishes the accepted selection. The
accepted NKF 0.8 selection of
[ADR 0134](0134-accept-the-nkf-0-8-authority-set.md) remains the current live
release authority, and this Decision supersedes only that release-authority
selection — never its bytes, its historical acceptance fact, or its other
conclusions — effective at the separately authorized NKF 0.81 publication and
public producer promotion.

## Scope And Applicability

This Decision accepts exactly the five artifacts above at exactly the digests
above. It governs derivation of the NKF 0.81 Schemas, release set, checker,
adopter, guidance, projection, fixtures, and tests from that authority under
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
Any change to any accepted byte before publication re-derives and re-accepts
the set; after publication it begins a new version. The release set is
derived at cut time and is outside this acceptance, as it was for 0.8.

## Rationale

The set realizes the seven confirmed boundaries and nothing else, and three
audit rounds compared it to the direction, to its predecessor, and to itself.
The second round's two material findings were exactly the defect class the 0.8
acceptance audit had named — predecessor copy-forward in the producer-promotion
block — and the repaired set names [NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md) and [ADR 0134](0134-accept-the-nkf-0-8-authority-set.md) where the 0.8 set had
named [NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md) and [ADR 0131](0131-accept-the-nkf-0-71-authority-set.md). Accepting after the third round rather than the
first is the cost of a derivation that copies a predecessor: the copy carries
the predecessor's literals until an audit that reads for meaning finds them.

The recommended-release contract and the volatile registry enter accepted
meaning because both are safety boundaries that existed only in tooling, and a
boundary only code knows cannot be reviewed as meaning. The closure recompute
enters the Specification as an explicit obligation so the seal and the checker
cannot drift apart again.

## Alternatives Considered

Accepting after the first audit round with the material findings repaired but
not re-audited was rejected; the second round found two material defects the
repairs had not touched. Accepting a four-file set was rejected because
[ADR 0134](0134-accept-the-nkf-0-8-authority-set.md) established that the
producer-promotion input is part of the inseparable set the promotion consumes.
Leaving the inherited `freshness.policy.digest` at the 0.6 value, as 0.71 and
0.8 had, was rejected because 0.81 is a new authority and a stated digest
should bind the bytes it names.

## Consequences And Trade-Offs

The NKF 0.81 authority exists and is bound by digest. Implementation may now
derive from it; nothing in it may change without re-acceptance. The two
post-third-round repairs — two line wraps and one digest value — were not
independently audited and are recorded as such in the audit Evidence. NKF 0.8
remains the live release authority and this producer keeps declaring, pinning,
and installing it until the separately authorized publication and promotion.

## Non-Claims

This Decision accepts no Schema, release set, checker, adopter, generator,
guidance, projection, fixture, or test bytes; those are derived from this
authority and confirmed separately. It confirms no Realization, establishes no
conformance, authorizes no publication, recommendation, or producer promotion,
concludes no Task, and does not edit
[ADR 0134](0134-accept-the-nkf-0-8-authority-set.md) or any other immutable
record. The candidate Specification remains represented as Evidence in this
repository until the promotion creates its native record.
