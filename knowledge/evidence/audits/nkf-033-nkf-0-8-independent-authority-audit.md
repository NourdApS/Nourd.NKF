---
title: NKF-033 NKF 0.8 Independent Authority Audit
summary: Records the fresh independent audit of the exact candidate NKF 0.8 authority set — the successor Specification, executable companion, evaluation policy, version-delta declaration, derived Schemas, and producer-promotion input — that the Human Product Owner's standing acceptance condition requires before any acceptance under delegation, with every finding, its repair, and the resulting state.
created_at: 2026-08-19T01:20:00Z
---

# NKF-033 NKF 0.8 Independent Authority Audit

Under [NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md),
the candidate NKF 0.8 authority set derived from
[ADR 0133](../../decisions/0133-adopt-the-nkf-0-8-generated-distribution-direction.md)
received the fresh independent audit the Human Product Owner's standing
acceptance condition requires. An independent reviewer agent with no part in
producing the candidate performed the audit. This Evidence records its exact
subject, findings, dispositions, and the resulting state.

## Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited commit | `fef042f3e16cb29edf9508a01fe3943e94465a0e` (`task/NKF-033`, clean tree before and after) |
| Verdict | Not clean: nine blocking findings, five should-fix, four notes |

The auditor recomputed every claimed digest from bytes, adjudicated all
seventy-four non-current version literals in the candidate Specification and
all one hundred seven in the executable companion line by line, reproduced the
seven derived Schemas byte-identically from the generator in an isolated copy,
re-ran the deterministic version-delta seeding to byte identity, verified the
promotion input's section map against the Specification's sixty-six real
headings in both directions, and confirmed the governance boundaries: no
published byte and no accepted immutable record changed, and nothing in the
candidate claimed acceptance, confirmation, conformance, or publication.

Seven of the nine blocking findings were predecessor copy-forward the
derivation never enumerated, concentrated in the producer-promotion block —
the same defect class this release exists to eliminate, in the same locus
where the [NKF-031 audit](nkf-031-nkf-0-71-independent-authority-audit.md)
found six instances. That the derivation reproduced the class it corrects is
recorded here as a finding about the derivation method, not as an argument
against the direction: a hand-adjudicated token migration over ten thousand
lines is exactly the fallible act NKF 0.8 removes from guidance and has not
removed from authority derivation.

## Blocking Findings And Repairs

| Finding | Locus | Repair |
| --- | --- | --- |
| The window slid but the out-of-window sentence did not, so the normative Markdown admitted a NKF 0.7 repository as in-window while the same Specification and the executable both excluded it. | `knowledge/specifications/nkf-0.8.md` | States `NKF 0.1 through NKF 0.7`. |
| A second, independent out-of-window list in the executable still omitted `0.7`, contradicting the support-window block in the same file. | `contracts/nkf/0.8/nkf.yaml` portable-topology migration | Lists `0.7`. |
| The promotion contract constrained the owning Task to `NKF-031` in four places, so the accepted authority set rejected its own accepted promotion input. | `contracts/nkf/0.8/nkf.yaml` promotion block | All four state `NKF-033`. |
| The promotion digest binding named ADR 0128 as predecessor release authority and required the accepting Decision to supersede a selection ADR 0131 had already superseded. | `contracts/nkf/0.8/nkf.yaml` promotion digest binding | Names ADR 0131 and its release-authority selection. |
| The executable retained the predecessor's first-promotion lineage claim after the Specification prose was corrected to the ordinary case, so the executable silently contradicted the corrected prose. | `contracts/nkf/0.8/nkf.yaml` delta-review lineage effect | States the ordinary delta-proven promotion. |
| The Specification's new prepublication whole-set guidance-review requirement had no executable counterpart at all, leaving the requirement contract-unenforceable — the exact "enforced by nobody" condition this release exists to end. | `contracts/nkf/0.8/nkf.yaml` | Adds the prepublication guidance-review contract: enumeration from `set`, full re-reading of the guidance classes, the recorded member list and per-member reviewed digest, the audit's verification duties, and the explicit statement that derivation does not satisfy it. |

## Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| Both prose and executable claimed that regenerating a published version's members reproduces its frozen bytes exactly. The auditor falsified it against the only published in-window version: regenerating NKF 0.71 from the source reports four mismatches, because 0.71 was frozen before this rule existed. | The claim is scoped to versions published under this rule, and predecessor versions are stated as frozen rather than derived. |
| The self-description rule bound implementations to "the closed version-literal form the executable companion declares", but the declared form was the placeholder `NKF <major>.<minor>` while every other pattern in the same file is a real regular expression. Multi-line description values were also undefined. | The executable declares `'\bNKF ([0-9]+\.[0-9]+)\b'` with its syntax, case sensitivity, and captured group, plus the multi-line resolution rule; the Specification states that the grammar is a regular expression and that every match in the resolved scalar is checked. |
| A promotion key still read `producer_0_6_representation`, stale since NKF 0.7 and carried through 0.71 unchanged. | Reads `producer_0_71_representation`. |
| The `Adopt` operation row still listed "migrated declarations", a subject the executable defines nowhere. The NKF-031 audit deferred this to the next governed revision. | Removed; prose and executable now agree. |
| The derivation contract named no source location and no member set, so the derivation's subject was determinable only from an ungoverned manifest. | The executable declares the source root, the source manifest, and the derived member classes. |

## Notes And Dispositions

| Note | Disposition |
| --- | --- |
| Two Specification sentences named NKF 0.7 as "the predecessor", correct as history but no longer the predecessor relation at 0.8. | Reworded to name the NKF 0.7 migration and revision as acts rather than as the current predecessor. |
| The pre-cut review verifier matched guidance members by path shape and enforced a strict subset of "every member of the versioned set". | Resolved on both sides. The verifier now selects members by their declared release-set class rather than by path shape, and the Specification distinguishes what [ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md) and release-protocol step four state differently: enumeration covers every member without exception, and full re-reading covers every member carrying authored guidance prose. This follows the accepted release protocol's own scope rather than widening it; the distinction is flagged to the Human Product Owner rather than treated as settled. |
| The version-label verifier skipped a file with no version marker, an exemption the accepted contract does not license — it licenses exactly absent frontmatter, absent key, and absent version literal. | Repaired. The verifier resolves the version a file serves from its distribution tree, then its own marker, then the bundle it is installed into, and skips only when none resolves. |
| The 0.8 release set and distribution tree do not exist at the audited commit, so the derivation requirement and the review enumeration were unverifiable against real 0.8 bytes. | Accepted coverage limit of a pre-cut audit. Both are exercised in the release-surfaces phase and re-audited by the separate release audit. |

## Verified And Passed

The auditor recorded the following as verified from bytes rather than from
claims: the complete digest chain across the executable's authority block, the
four accepted predecessor bindings, the promotion input's four bindings, the
thirteen-entry accepted digest map, and all seven Schemas' embedded source
bindings, with no mismatch; byte-identical schema reproduction from the
generator in an isolated copy, with no coordinate leakage in either direction,
and the generator's claim that this version's schema delta is coordinate
rebinding alone confirmed true; byte-identical version-delta reproduction from
the deterministic seeder, with two hundred sixteen rules, two hundred fifteen
identical, and exactly one `semantically-new` rule which is the new guidance
rule; the added rule's absence from all three declared `judgment_dependencies`
lists, which is what makes the NKF 0.71-to-0.8 upgrade provable on the delta
claim alone; seventy-three of seventy-four Specification version literals and
one hundred five of one hundred seven executable version tokens correctly
adjudicated as deliberate history; the promotion input's section map resolving
in both directions with zero orphans, its title byte-identical to the Markdown
H1, and no accepting-Decision digest present; the support window, stepping
stone, and compatibility classification agreeing across prose and executable;
that no published or accepted immutable byte changed; and that
release-protocol step six carries no surviving rule-diff instruction.

## Resulting State

Every blocking and should-fix finding is repaired, and each of the four notes
is either repaired or recorded with an explicit disposition. The repair
invalidated the derived artifacts that depend on the authority bytes, so the
version delta was reseeded, the authority digests rebound, the Schemas
regenerated, and the promotion input, accepted digest map, and bundle
declarations refreshed; the complete digest chain was then re-verified across
twenty-five bindings. The complete gate passes with the full suite green.

This Evidence establishes what the audit found and what was repaired. It
accepts nothing: acceptance of the exact repaired authority set is the
separate Decision that follows it.
