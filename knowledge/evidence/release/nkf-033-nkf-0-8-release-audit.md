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

## Round Two — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `62fd53c7ed9070dde28127a5536467cea1bc172d` (`task/NKF-033`, clean before and after) |
| Audited archive | SHA-256 `28df58393547f0cca560c29d7cfe608d5570ab3143bc82c7a68bad1d413c1ba5` |
| Verdict | Not clean: five blocking findings, four should-fix, four notes |

The second round re-derived the first round's conclusions rather than
inheriting them, and confirmed that both first-round blocking findings were
genuinely repaired: the `set` capability claim is now true of the shipped
adopter, verified by running it; the digest and missing-review checks were
proven by construction; the stamp filter was proven by tampering with a
release-stamp member and watching the check report it.

It also found that one of those repairs had introduced a new defect, that
another was incomplete, and that three further instances of the same defect
class survived in shipped bytes.

## Round Two Blocking Findings And Repairs

| Finding | Repair |
| --- | --- |
| Step three's replacement claim was still a false universal: "no other class carries one", when eleven members across six classes carry the marker, three of them in the documentation projection. | Step three names the eight distribution-tree members and the three byte-identical projection copies. |
| The same repair contradicted its own paragraph: it said the host-adapter content carries no version literal while the next sentence listed that content among version-bearing members receiving an injection. The paragraph was consistent before the repair and not after. | The version is injected into the members that state one; the host-adapter content is emitted unchanged because it states none. |
| The authoring protocol claimed `migrate` performs the upgrade. The shipped adopter answers that migrate does not apply to an in-window repository and directs it to Adopt. The sentence lived in the version-neutral source with placeholders, so the generator would have re-emitted it at every future version. | Both the protocol and the skill's command family state that `migrate` fails closed and that Adopt performs the upgrade. |
| Two projection guides stated the out-of-window boundary as NKF 0.1 through 0.6 when it is 0.1 through 0.7, each contradicting its own next section. Carried verbatim through the hand slide, and unreachable by the self-description check because neither file has frontmatter. | Both corrected. |
| The delta review consumed by the isolated exercise was completed by script: states substituted, roles derived from an identifier heuristic, all classifications set alike, a boilerplate finding, and an observation naming a carried node outside the closure. The adoption protocol this release ships says the upgrade never invents review. | The review is performed deliberately, node by node, and the exercise re-run against it. |

## Round Two Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The review verifier matched a member by basename as well as by full path. All four portable skills are named `SKILL.md`, so one skill's digest satisfied another and the recorded digest proved only that some skill had been read. | Members are matched by full path only, with a fixture that records one colliding skill's digest against another and fails. |
| The authoring skill listed `migrate` among the commands that perform governed mechanics. | Corrected with the protocol. |
| The version-surface inventory's table declared three columns and supplied two; every "Why" cell was empty. | Every row carries its reason. |
| The inventory missed a live continuous-integration breakage: the consumer-adoption exercise copied a fixture deleted several window slides ago and failed before reaching any adoption step. Its scan was dot-form-only over three directories while its summary promised every mutable tooling surface. | The exercise starts from the in-window predecessor fixture; the scan covers the workflows and root configuration and matches the hyphenated fixture form; the Boundary states the four populations the inventory deliberately excludes. |

## Round Two Notes And Dispositions

| Note | Disposition |
| --- | --- |
| `release/recommended.json`, `contracts/`, and `fixtures/` carry version coordinates and are outside the inventory's scan. | Recorded in the inventory's Boundary as deliberately excluded: they are data the release tooling and checker bind, not surfaces that compare versions. |
| No verifier covers any of the enumerated surfaces; the inventory is their only control. | Recorded in the Boundary as a point-in-time record rather than an enforced one. |
| Step four's re-read scope named eight members while the enumeration and the check cover twelve. | Step four now names the six guidance classes. |
| Ragged wrapping persists in the repaired step three. | Reflowed. |

## Round Two Judgments

The auditor judged the guidance review "honest in posture, materially
inaccurate in two assertions" — it records the audits' findings as its own
misses and concedes the limit of a coverage claim, while endorsing a step-three
repair its own count contradicts and asserting that the authoring skill's
command family matched the authority when it did not. Both inaccuracies are
corrected above and the review now records both audit rounds.

The auditor judged the delta review's counts and coverage correct and
independently re-derivable — every judgment outside the computed closure
carried, the fresh set exactly the closure and exactly the nodes this branch
authored — while its `semantically-reviewed-delta` claim was manufactured. That
distinction is the finding: the mechanism was proven, the review was not
performed. It is recorded rather than argued with.

The auditor's systemic observation is recorded as the release's own most
important limit: the new deterministic rule is scoped to the frontmatter
description by contract, so every surviving defect across both rounds was body
prose that no verifier this release ships can reach. The whole-set human
re-read is their only control, and across two rounds it missed all of them.

## Round Three — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `42661606b869aee7d2d65d5439aa06eb4f2e12e0` (`task/NKF-033`, clean before and after) |
| Audited archive | SHA-256 `e11de235669734aa580f2449626192e4fa37c80f3d8dd7b39d5b05dca3db24da` |
| Verdict | Not clean: three blocking findings, four should-fix, four notes |

The third round confirmed every round-two repair in shipped bytes — step three
now true and internally consistent, step four's scope matching the verifier,
both `migrate` sentences matching what the shipped adopter actually does when
run, the projection boundaries corrected, full-path digest matching proven by
constructing a basename collision — and judged the replacement delta review
performed rather than manufactured, on the ground that its reasoning about
supersession could not have been produced without reading the Decision it cites.

It then found three blocking defects, two of them in the record rather than the
delivery.

## Round Three Blocking Findings And Repairs

| Finding | Repair |
| --- | --- |
| `THIRD_PARTY_NOTICES.md`, a mutable release-set member, stated its inventory was "bound to the implemented NKF 0.6 checker and adopter source build-input graphs". It entered at the NKF 0.6 implementation and shipped unchanged inside the published 0.7 and 0.71 archives. No verifier reaches it: not a guidance class, no frontmatter, outside the self-description check's roots. | Bound to NKF 0.8. Step four now states three parts — enumerate every member, re-read the guidance classes in full, check every remaining member for a version literal — and requires the review to say which members received which. The review performed part three and records what it found. |
| The round-two repairs corrected the inventory's counts and left the Task's Decision Applicability gate quoting the old ones, so a mandatory gate stated numbers its own cited Evidence contradicted. The same repairs left the gate and the Delivered and Remaining sections describing one audit round when two had run. | The gate cites the inventory's actual counts and states the real round history; Delivered and Remaining are restated. |
| The inventory's Method and Boundary described a scan narrower than the one the audit recorded as repaired: three directories, dot-form only, no workflows or root configuration, and a Boundary promising four exclusions while listing three plus an enforcement caveat. | The scan covers `.github/` and the root configuration and matches the hyphenated form; the enumeration is re-derived at sixty-seven surfaces, forty-five registering `0.8`; the Boundary states three exclusions and separates the absence of any verifier as a limit rather than an exclusion. |

## Round Three Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The delta review's single observation remained bound to a carried node outside the computed closure — scaffold residue the round-two finding had named. | Bound to a judged node in the closure. |
| The inventory's summary said two defects while its section held three, one of which the exhaustive pass had explicitly not found, and a sentence referring to "both of these" was stranded before them. | Rewritten. |
| The guidance review said one of its own repairs introduced a further defect; two did. | Corrected. |
| The consumer-adoption exercise still exits non-zero, now because the governed recommendation selects NKF 0.71 while the adopter requires its own version — expected before publication, but neither the inventory nor this audit disclosed that the breakage recorded as repaired is still red for a different reason. | The inventory states the distinction: the fixture defect is repaired, the exercise is not yet passing, and it turns green at publication. |

## Round Three Notes And Dispositions

| Note | Disposition |
| --- | --- |
| The public adopter copy contains a `NKF Version: 0.8` literal inside an embedded document string, so step three's projection clause is true under a marker-line reading and not under a literal-string reading. | Recorded. The clause is about the guidance marker, which is a line, and the embedded literal is a copy of a member already re-read. |
| Ragged wrapping persists in two round-two-repaired sentences. | Recorded, consistent with the earlier disposition. |
| The three new verifiers do not run in the producer's own gate at this commit, because they are gated on the declared version and the producer declares NKF 0.71. | Correct by design under the pin, and the reason this release exists. It means the whole-set review and the derivation are machine-gated only inside the isolated exercise until the producer adopts NKF 0.8. Recorded as a live limit. |
| The two mixed-delimiter keys in the accepted executable remain. | Unchanged disposition: repairing them would change accepted authority bytes for a cosmetic inconsistency. |

## Round Four — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `bc1bf4400edfe7e0dbc0e49b4d98afe0811a84a6` (`task/NKF-033`, clean before and after) |
| Audited archive | SHA-256 `b014be24c2ab39c3c3dfff521984bcba39acff3e865686f4e708c76859e84484` |
| Verdict | Not clean: four blocking findings, three should-fix, five notes |

The fourth round judged the delivery internally consistent and mutually
confirming — archive, byte-identical rebuild, member set, manifest, bindings,
twelve guidance members, generator, checker rule, adopter, window, and gate —
and found no surviving stale sentence in the shipped guidance. It judged the
delta review performed rather than substituted, verifying that its
`extends`-not-`supersedes` reasoning is grounded in ADR 0134's actual text.

Three of its four blocking findings were in the record produced by the third
round's repairs, and one of those repairs had deleted a true row while holding a
count constant.

## Round Four Blocking Findings And Repairs

| Finding | Repair |
| --- | --- |
| The inventory recorded a scan widened to the hyphenated form and had not implemented it: a differential scan showed sixty-nine surfaces, not sixty-seven, and the rewrite had deleted a true row for the frozen NKF 0.2 release-set file list while holding the count at twenty-two by adding another. The blind spot was recorded as repaired twice before it was. | The scan states the two forms' terminators explicitly, is recorded as a script rather than a description, and computes sixty-nine surfaces, forty-five registering `0.8`, twenty-four adjudicated. Both previously missing surfaces are listed. |
| The Task's Decision Applicability gate propagated the wrong counts, so a mandatory gate again stated numbers its cited Evidence contradicted — the third round's own blocking finding, recurring. | The gate cites the computed counts and bounds the claim by how it was reached. |
| The guidance review's part-three accounting was arithmetically false: four byte-identical copies where there are three, and one hundred twenty-five checked where the complement is one hundred twenty-six. The same document stated three copies elsewhere. | Every count in the enumeration section and the member table is computed from the release set rather than typed, and the paragraph says so. |
| The review's self-accounting said two of its repairs introduced further defects; one repair introduced two. | Corrected. |

## Round Four Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The inventory credited the exhaustive passes with three defects while its own text said an audit found the third. | Each defect is attributed to whichever found it, in its own heading. |
| No shipped guidance said which adopter performs the in-window upgrade. Verified against the published NKF 0.71 adopter: it validates the recommendation against the compatibility set frozen into it and refuses the NKF 0.8 recommendation at its own self-entry, with a message naming no remedy. Standing behaviour, never disclosed — at publication a 0.71 consumer running their installed adopter would be stuck. | The adoption protocol gains a section stating that the adopter bundled with the release performs the upgrade and why an installed one refuses; the release notes state the remedy where an adopter actually looks. |
| The neutrality guard matched the dot form only, so a hyphenated coordinate in the source would have been emitted verbatim into every later version. Zero current instances. | The guard covers both forms, with the hyphenated alternative narrowed to a single-digit major so an ISO date is not read as a coordinate, and a fixture proves it. |

## Round Four Notes And Dispositions

| Note | Disposition |
| --- | --- |
| The adoption protocol, release notes, and acceptance criterion eight say each older repository steps through "its own next archive" when the adopter maps NKF 0.1 through 0.5 all to the published 0.6 archive. | Recorded. The projection's migration guide states it precisely as a table; the prose is imprecise rather than false, and correcting it is carried to the next revision. |
| The Task's round-history sentence was written before the round that made it literally true. | Recorded; the round-four findings make it accurate and the audit record scopes each claim to its round. |
| The public adopter copy's embedded `NKF Version: 0.8` literal is build-time-imported guidance, not a hand-maintained inline copy. | Verified benign; acceptance criterion two's "the adopter's inlined literals included" holds. |
| `package-lock.json` dependency fragments are not NKF coordinates. | Correctly outside the inventory. |
| The two mixed-delimiter keys in the accepted executable remain. | Unchanged disposition. |

## Round Five — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `15b4287fedb4e6071ae6e4047e9ba2f023286dfc` (`task/NKF-033`, clean before and after) |
| Audited archive | SHA-256 `b783efa23f69daae56301f46ba0ee2cfc24a7ba6d6af0e1c2c5b9d0d2330cd0a` |
| Verdict | Delivery clean: zero blocking defects. Record not clean: one blocking finding. |

The fifth round was deliberately weighted toward the delivery, because the two
previous rounds had found their defects almost entirely in this Task's
hand-written record. It rebuilt the archive byte-identically in a clean clone,
reconciled all one hundred forty-one members and their modes, validated the
manifest and every binding digest, re-derived the guidance member list by class
and verified all twelve recorded digests against archive bytes, re-read all
twelve guidance members in full, and — the part earlier rounds proved necessary
— executed every command claim rather than reading it: `set`, `migrate`,
`refs`, `record --scaffold`, `review --scaffold`, `repin`, `linkify`, and Adopt
end to end. It found no sentence in shipped guidance describing a rule,
boundary, command, or capability that is not the current one.

It also proved the round-four adoption disclosure true in both directions on the
same genuine NKF 0.71 consumer: the published 0.71 adopter refuses the NKF 0.8
recommendation with an invalid-or-ambiguous compatibility message naming no
remedy, and the shipped NKF 0.8 adopter completes the upgrade to `updated`. The
adoption protocol's new section and the release notes' remedy are literally
accurate.

## Round Five Blocking Finding And Repair

| Finding | Repair |
| --- | --- |
| The version-surface inventory and the Task gate both stated seventy surfaces as sixty-nine, and forty-six registering `0.8` as forty-five. The cause is the round-four repair itself: the script written to end hand-typed counts is a tracked file naming every coordinate from `0.1` to `0.8`, so it is a version surface by its own definition and counts itself, and the recorded numbers were the values from before it existed. The third consecutive round to find a false count in this record. | Both documents state the computed totals and disclose that the scan counts itself, because excluding it would be a special case that hid a real surface to make a number tidier. The guidance review's remaining self-tallies are replaced by a description of what the rounds established, with the per-round tables here as the only record of the count. |

## Round Five Notes And Dispositions

| Note | Disposition |
| --- | --- |
| Round one's record states two hundred sixty-three tests; the suite is now two hundred sixty-eight. Each round's claim is scoped to its round, so neither is false, but no section carried a current count. | The Resulting State below states the count at the audited commit. |
| `linkify` cannot run to completion on the producer repository: it would retarget a plain reference inside an immutable Decision source and correctly refuses. Standing behaviour, undisclosed anywhere. | Recorded. The refusal is consistent with the accepted immutability rule and is not a shipped-guidance falsehood; disclosing it is carried to the next revision. |
| Two mixed-delimiter keys in the accepted executable remain. | Unchanged disposition. |

## Resulting State

Every blocking and should-fix finding from all five rounds is repaired; every
note is repaired or recorded with an explicit disposition. At the audited commit
the complete gate passes all fifteen stages with two hundred sixty-eight of two
hundred sixty-eight tests green and no diagnostic. Each round's repairs
change release-set member bytes, so each round invalidates the prior archive,
exercise, and audit by construction, and the candidate is re-cut, re-exercised,
and re-audited before the technical-confirmation Decision.

Five rounds is the fact worth carrying out of this release, and their shape
matters more than their number. Every round after the first found defects
created by the previous round's repairs. The delivery converged early — the
generator, the self-description rule, and the three verifiers were correct from
the round in which they were delivered and never regressed, and the fifth round
found the delivery clean after executing every capability claim rather than
reading it. The hand-maintained record did not converge: rounds three, four, and
five found their defects almost entirely in this Task's own Evidence and gate,
in prose and in typed counts, including one round's repair being defective
because the script it introduced to end typed counts counted itself.

The narrow lesson is mechanised: counts come from recorded scripts, and the one
tally that cannot be computed — a reviewer's own failures — is now described
rather than counted. The broad lesson is that the generated distribution ends
stale version labels and does nothing about stale claims, and this release is its
own best evidence for both halves of that sentence.

This Evidence establishes what the audit found and what was repaired. It
confirms nothing: the mandatory audit-bound technical confirmation is the
separate Decision that follows the clean round.
