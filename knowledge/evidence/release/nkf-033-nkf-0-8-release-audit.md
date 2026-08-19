---
title: NKF-033 NKF 0.8 Release Audit
summary: Records the fresh independent release audit of the exact NKF 0.8 candidate archive and its isolated producer exercise, performed under the corrected release-protocol step six, with every finding, its repair, and the acceptance-criteria verdicts.
created_at: 2026-08-19T04:00:00Z
---

# NKF-033 NKF 0.8 Release Audit

Under [NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md),
the exact NKF 0.8 release candidate received the fresh independent audit
[ADR 0094](../../decisions/0094-carry-the-set-and-audit-independently.md)
requires and that release-protocol step six defines. An independent reviewer
agent with no part in producing the candidate performed it against the
corrected step six — whole-set coverage, not the superseded rule-diff standard.

## Round One — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `ae151e0965b354062d2cb40e48e204de2c92775b` (`task/NKF-033`, clean before and after) |
| Audited archive | SHA-256 `b6906074702171009628205922f4a2b9a6e5f4009ad7674e89f671de404d6706` |
| Verdict | Not clean: two blocking findings, seven should-fix, four notes |

The auditor recomputed the archive digest and independently rebuilt the
archive byte-identically from the release commit, reconciled all one hundred
forty-one declared members against the archive with their modes, validated the
manifest against the shipped schema, derived the guidance member list from the
release set by class rather than trusting the review, recomputed all twelve
recorded digests from the archive bytes, reproduced the guidance derivation
from a clean checkout, exercised the new rule end to end through the shipped
checker, exercised the stepping-stone ladder through the shipped adopter, and
reproduced the complete gate in a clean clone with real dependencies.

Both blocking findings were stale sentences in the release protocol itself —
the artifact that defines the whole-set review — and both had been read past by
that review. Their repair and the review's record of them are described in the
[guidance review](nkf-033-nkf-0-8-guidance-review.md).

## Blocking Findings And Repairs

| Finding | Repair |
| --- | --- |
| Step four claimed the adopter's `set` command "emits every member with its digest and version stamp". For every version carrying a release-set contract — which is every version the protocol governs — `set` returns the accepted members with paths, classes, and modes; the branch computing digests is unreachable. The authoring protocol and the executable companion both stated it correctly, so the release would have shipped a self-contradiction. | Step four states what `set` emits and that the reviewer computes each reviewed digest from the member's exact bytes. |
| Step three asserted that "every artifact in the set declares the version it serves through the exact guidance marker". Eleven of the one hundred forty-one members do. The four host-adapter members carry no version literal at all, which the guidance review's own next section records. | Step three scopes the claim to the four shipped protocols and the portable skills and states that the host-adapter content deliberately carries none. |

## Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The guidance review recorded the twelve members as eight distinct byte sets. There are nine. | Corrected; each portable skill is emitted into both host directories and the `GEMINI` adapter is byte-identical to `CLAUDE`. |
| The review's public-documentation finding overstated the exposure: five of the eleven members are derived, six are hand-authored, and there are three guides rather than two. | Corrected against the actual byte identities. |
| The review verifier never compared a recorded digest to the member's bytes — any 64-hex token beside the member passed, which made the recorded digests decorative. | The digest must now equal the member's bytes, proven by a fixture recording a wrong digest. |
| The review verifier failed open when no review existed: a release that omitted or misnamed the review passed with nothing checked. | An unpublished versioned set with no review now fails, proven by a fixture. |
| The exercise's post-adopt restamp ran the generator in write mode over every target, so a shipped member differing from its derivation would have been silently repaired inside the exercise copy before the gate. | The generator gains a stamp filter; the restamp writes only the adopted-version roots and then proves the release-stamp members already match. |
| The current-system Realization did not mention the generated distribution, the new verifiers, or NKF 0.8, while [ADR 0060](../../decisions/0060-layered-contract-enforcement.md) requires a successor Realization for an enforcement-surface change. | The Realization records the NKF 0.8 candidate state and the new enforcement surface. |
| The Task's Decision Applicability gate read `unknown` for every mandatory capability, and the exhaustive version-surface inventory the plan required had never been written down. | The inventory is recorded as [Evidence](../audits/nkf-033-nkf-0-8-version-surface-inventory.md), and the gate is re-extracted against delivered reality. |

## Notes And Dispositions

| Note | Disposition |
| --- | --- |
| Two mixed-delimiter keys in the accepted executable companion, `recollected_or-hand-maintained-list` and `may_be_first-functional-exercise`. | Recorded, not repaired. Both are valid YAML and neither changes meaning; repairing them would change accepted authority bytes and require re-accepting the set for a cosmetic inconsistency. Carried to the next governed revision. |
| The version-dispatch suite's temporary-directory prefix still named the predecessor. | Repaired. |
| Ragged line wrapping where a longer token was substituted into fixed-width source. | Repaired in the release protocol's two corrected steps; the remaining instances are cosmetic consequences of variable-width injection into fixed-width prose and are recorded rather than reflowed. |
| After publication, the version-label verifier treats the 0.8 distribution tree as frozen and the review verifier skips the 0.8 review. | Correct by design: both are cut-time controls, and a published set is immutable. No action. |

## Judgments The Audit Was Asked To Make

The auditor judged the three findings the guidance review recorded rather than
fixed to be honest and correctly reasoned, and confirmed that the
public-documentation finding's underlying defect — a stepping-stone table
naming the NKF 0.7 archive digest under an NKF 0.71 label with no row for a 0.7
repository — was actually fixed in the shipped bytes.

The auditor judged the exercise's two producer-side steps to be legitimate
rehearsal rather than masking: the declared chain is character-identical to the
one the producer guidance verifier expects at NKF 0.8, `package.json` is
producer configuration and not a release-set member, and the restamp touches
only members that are not release-set members. Its implementation was
unguarded, which is the should-fix now repaired.

The auditor judged the delta review honest: three hundred eighteen carried plus
eleven fresh, the eleven equal to the computed closure and equal to exactly the
eleven knowledge nodes this branch authored, with nothing carried that should
have required fresh review.

## Verified And Passed

Recorded as verified from bytes: the archive digest and a byte-identical
independent rebuild; one hundred forty-one declared members reconciled against
the archive with no extra and no missing member and every declared mode
matching; every archive member equal to its release-commit working-tree bytes;
the manifest valid against the shipped schema with every authority, policy,
version-delta, schema, checker, adopter, and licensing digest matching; the
guidance member list derived independently by class with all twelve recorded
digests equal to the archive bytes and all four recorded corrections present;
every version literal in the shipped distribution tree stating NKF 0.8 or a
legitimate predecessor reference; the neutrality guard rejecting both a
prefixed and an unprefixed literal; the new rule present in the specification
table, the executable registry, and the self-description block, implemented
from the contract's declared regular expression rather than a second copy,
firing on the reproduced NKF 0.71 defect and silent on body mentions and
multi-line scalars; the exercise result; the window and stepping-stone ladder
consistent across specification, executable, adopter, checker bindings, release
notes, and projection, and exercised through the shipped adopter; no published
byte and no accepted immutable record changed; and the complete gate reproduced
in a clean clone at two hundred sixty-three of two hundred sixty-three tests
with zero diagnostics and a clean tree after building.

## Resulting State

Every blocking and should-fix finding is repaired; the four notes are repaired
or recorded with an explicit disposition. The repairs change release-set member
bytes, so the prior archive, exercise, and audit are invalidated by construction
and the candidate is re-cut, re-exercised, and re-audited before the
technical-confirmation Decision.

This Evidence establishes what the audit found and what was repaired. It
confirms nothing: the mandatory audit-bound technical confirmation is the
separate Decision that follows the clean round.
