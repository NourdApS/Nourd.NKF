---
title: NKF-038 NKF 0.81 Release Audit
summary: Records the fresh independent release audit of the exact NKF 0.81 candidate archive and its isolated producer exercise under release-protocol step six — each round's exact subject and verdict, every finding with its repair or disposition, and what each round verified — as the Evidence the mandatory technical-confirmation Decision binds.
created_at: 2026-09-09T06:00:00Z
---

# NKF-038 NKF 0.81 Release Audit

Under
[NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
the exact NKF 0.81 release candidate receives the fresh independent audit
[ADR 0094](../../decisions/0094-carry-the-set-and-audit-independently.md)
requires and that release-protocol step six defines. Each round is performed by
a separate Claude agent instance with no part in producing the candidate,
working read-only against the release commit and building only in a clean
clone, under the whole-set coverage standard: reproduce the archive, reconcile
every member and digest, verify the guidance review's coverage, execute every
new rule and refusal through the shipped checker and adopter rather than
reading it, reproduce the complete gate, and read the reconciled record for
claims the tree does not support.

## Round One — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `c7d10aa0e0ae0173197be8a5c17d7b89066e0362` (`task/NKF-038`, clean before and after) |
| Audited archive | SHA-256 `9520f1b4bd69e3be9eec8bcc9fc50be94b364561f6a9412e9f393eb26be28612`, 142 entries |
| Verdict | Not clean: two blocking findings, seven should-fix, six notes |

The auditor recomputed the archive digest and rebuilt the archive
byte-identically from a clean clone at the release commit, validated the
manifest against the shipped Schema, reconciled all one hundred forty-two
declared members with their modes and classes, confirmed the five accepted
artifacts carry exactly the
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) digests
in tree and archive, derived the twelve guidance members from the release set
by class and recomputed every recorded digest, read all nine distinct byte sets
in full, checked the one hundred thirty remaining members for version literals,
compared every member of the published 0.8 archive to the tree and found the
0.8 bytes and the 0.8 catalog untouched, executed the closure recompute rule
positively and negatively through the shipped checker, exercised the
stepping-stone refusal, the historical-channel refusal, the noncanonical-URL
refusal, the complete 0.8-to-0.81 update, and the volatile registry's edge
behaviour through the shipped adopter, and reproduced the gate in the clone.

## Round One Blocking Findings And Repairs

**The complete gate did not pass at the release commit.** The commit that
rebound the strict-mode catalog Schema digest changed one line of
`scripts/release/config.mjs` without repinning its governed-artifact
declaration, so `validate:self` and the pinned check each reported one
`artifact.digest-mismatch`. The release packaging ran `npm run check`, which
does not include `validate:self`, which is why the cut succeeded. The
declaration is repinned; the candidate is re-cut because the manifest binds the
release commit.

**A shipped projection member stated the live window falsely.** The projection
README's Current Boundaries section read "NKF 0.8 and older versions are
immutable published history" one sentence after stating that live support is
NKF 0.81 plus NKF 0.8 — the hand-slide defect the guidance review had found in
two guides and missed in the third hand-authored member it claimed to have read
in full. It now reads "NKF 0.71 and older", and the
[guidance review](nkf-038-nkf-0-81-guidance-review.md) records the miss.

## Round One Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The Realization stated a typed link count that did not match the tree | The sentence states that every checked living link resolves, and no count |
| The guidance review said its enumeration is what the adopter's `set` command emits, which is true only for a repository declaring 0.81; this producer's `set` emits the 0.8 set | The review says where the list came from and what `set` emits here |
| The distributed authoring and adoption protocols stated the delta-claim condition NKF 0.8 knew and not the 0.81 recompute | The generator gained a version-gated region; both protocols state the recompute condition in their 0.81 emission while the adopted 0.8 root keeps the 0.8 sentence, and the generation suite proves the gate |
| Release packaging accepted a personal fork as the origin remote | Only `https://github.com/NourdApS/Nourd.NKF.git` is accepted |
| The checker's command-line entry named the 0.8 contract root to derive the repository root | It names the 0.81 root; dispatch by the declared version is unchanged |
| The Realization listed `migrated` among Adopt's outcomes although no 0.81 compatibility entry is breaking | The Realization states three reachable outcomes and why `migrated` is unreachable at 0.81 |
| The Task's progress said the completed adopter work was verified by the complete suite while the gate failed at the release commit | The progress records the round-one findings and the gate state at each cut |

## Round One Notes And Dispositions

- The shipped checker alone, on a 0.8 fixture, reports the 0.8 contract set
  unavailable, because the archive ships only the 0.81 set; beside the
  repository's 0.8 contracts the same bytes validate both 0.8 fixtures ready.
  The Realization now says dispatch reaches a version whose contract set is
  present and that a consumer install carries only the 0.81 set.
- The adopter's five Github CLI invocations are all in the producer's Git
  transition orchestration; none is on the adoption path, whose only network
  is Node's fetch against the default-branch catalog URL and the canonical
  release asset URL. Recorded; no change.
- The 0.8 tree is not re-derived by the generation check; the auditor verified
  the 0.8 bytes against the published archive directly, which is the control
  that applies to a frozen version. Recorded; no change.
- The release protocol's second precondition names the Human Product Owner as
  acceptor while ADR 0140 records delegated acceptance. Already recorded by the
  guidance review for the successor.
- The latest validation result is gitignored and absent from a fresh clone;
  the Realization describes it as an operational file. Recorded; no change.
- Every non-0.81 version literal in the one hundred thirty non-guidance
  members is a deliberate predecessor reference, and the guides'
  stepping-stone digests equal the adopter's constants. Recorded.

## Round One Verified And Passed

The archive digest, member count, byte-identical rebuild, manifest validity and
digests, class and mode agreement, and the five accepted digests; the
Specification mirror and the public adopter copy byte-identical to their
sources; all twelve guidance digests and every count in the guidance review;
the 0.81 and 0.8 generation checks; all one hundred forty-one members of the
published 0.8 archive identical to the tree; the unchanged 0.8 catalog and
producer pin; both 0.81 fixtures passed and ready with zero diagnostics under
the shipped checker; the closure recompute refusal naming the omitted
propagated subject and its admission with the complete closure, and the same
narrow claim admitted under a 0.8 bundle; all two hundred seventeen rule
identifiers present in the checker source and bundle; the 0.71 stepping-stone
refusal naming the published 0.8 archive; the historical-channel,
schema-invalid, and noncanonical-URL refusals before mutation; the complete
0.8-to-0.81 update to `updated` and `current` at integration revision five with
the upgraded project ready under the shipped checker; the volatile registry
tolerating rewritten, deleted, and added registered files at any depth while a
changed regular file, a directory or symbolic link with a registered name, and
a near-miss name each stale the plan; the typecheck, twenty-nine test files and
two hundred seventy-nine tests, build, adopter, public-projection, third-party,
guidance-review, version-label, and link verifiers; the absence of
`realizations/items/` and the retirement Evidence's ten digests equal to the
files' last committed bytes; and the judgment that the set realizes exactly the
seven adopted boundaries with the ten retirements and nothing else.

## Round Two — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `a7aa6d8b0934542abb39581b3f7e55efb6aa7a46` (`task/NKF-038`, clean before and after) |
| Audited archive | SHA-256 `04c6850b199fedc738647706076e989eea56e5013ee89910fe85406a6e1fb868`, 142 entries, checker `f2fe706353ebba7737f2d280cb65f60ec1ea0feb9eef1456644668b41d03c59c` |
| Verdict | Delivery clean of blocking findings: zero blocking, seven should-fix, eleven notes |

Round two was performed by three independent agent instances with divided
scope after a single instance stalled twice on long-running commands: one
reproduced the gate and the archive, one read every guidance member, every
hand-authored projection member, and every reconciled record, and one
exercised the shipped checker and adopter adversarially. All three confirmed
every round-one repair with evidence. The archive was rebuilt byte-identically
from a clean clone at the release commit; the manifest validated against the
shipped Schema with every digest, mode, and class reconciled; the five accepted
artifacts carried the ADR 0140 digests in tree and archive; every member of
the published 0.8 archive with a frozen path was byte-identical to the tree and
the 0.8 catalog was unchanged; the complete gate passed in the clone with
twenty-nine test files and two hundred eighty tests, zero diagnostics from the
full-bundle checker, and a passing pinned chain; the twelve guidance members
and the six hand-authored projection members were read in full without a
stale sentence; and every shipped-tool exercise of round one was repeated with
the same outcomes.

## Round Two Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The adopter sealed a review whose reviewer id, finding, and limitation were still the template's sentinels, and the checker then reported the project ready; with every judgment carried, an update could complete on a timestamp alone | The seal refuses a review that still carries any template placeholder, naming the positions; the adopter suite proves the refusal before the completed review is accepted |
| Catalog facts about the archive — checker and adopter digests, authority digests, source commit, byte size — were validated for shape only, so a catalog contradicting the archive it named was accepted and the adopt result echoed the false values | Every acquired archive is reconciled against the catalog that selected it before any staging, refusing `catalog-archive-inconsistent` with the differing keys; four adversarial catalogs are refused in the suite |
| The onboarding drift refusal named no entry, leaving a large repository to be diffed by hand | The refusal names the added, removed, and changed entries from the workspace inspection when it is present |
| The Realization stated that this Task's delta reviews had resealed the producer baseline with the propagated closure, before any reseal and under a 0.8 policy whose seal does not propagate | The row states that the closing delta review reseals under the 0.8 policy and that the propagated closure applies from the first seal under 0.81; the Task progress says the same |
| The publication-manifest generator labelled every release `internal` | The manifest repeats the catalog's visibility and channel |
| The guides said the default path needs `raw.githubusercontent.com` and `github.com` "and nothing else", while release-asset downloads follow a redirect to Github's asset host | Both guides name the redirect host |
| The Realization listed a root `host-adapters/` path that does not exist | The path is removed; the adapters live under the guidance source and the emitted trees |

## Round Two Notes And Dispositions

- The producer gate checked guidance generation for the adopted version's
  tree only, so after the producer adopts 0.81 and 0.81 publishes, the check
  would have become vacuous. The generator now checks every emitted release
  tree when no version is named, and the accepted 0.81 chain names none; the
  0.8 chain this producer still runs is unchanged, and the promotion restamps
  it.
- The version-gated region compares minors as strings, which is the accepted
  coordinate order and is now stated in a comment.
- `inspect` writes the workspace before validating `--created-at`, leaving a
  partial workspace after that one refusal. Recorded for the successor.
- The closure recompute refusal arrives with the expected cascade of
  `freshness.result.noncurrent` diagnostics; consistent, not a defect.
- The `task` subcommand's read-only status view also invokes the Github CLI;
  no adoption, onboarding, or update path does. Recorded.
- The shipped adopter retains the legacy `kaveh6202/Nourd.NKF` coordinate to
  recognise pins written before the move. Recorded; a public reader will see
  the name.
- The producer's self-validation is still NKF 0.8, as ADR 0140 requires until
  publication and promotion; the adopter `check` command emits no diagnostics
  array on success; the checker bundle is untracked and was compared to a
  fresh build; the manifest Schema's vendor annotation keyword was registered
  for strict validation exactly as the checker does. Method statements, not
  findings.
- The release protocol's step three says no member outside the protocols and
  skills declares the version marker; the adopter bundle embeds the guidance
  and so carries the literal. Embedding is not declaring; the wording is
  inexact and recorded for the successor.
- The projection README's boundary that a protected merge gate is outside the
  delivered boundary describes what NKF delivers to a consumer, not this
  producer's gate. Ambiguous, not false; recorded.

## Round Three — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `14bcb44656269379295b6c3d2d7b401290371e16` (`task/NKF-038`, clean before and after) |
| Audited archive | SHA-256 `c24d3e19ac2da4cfc44a4bcaf76211ba72ea90ef44e9eb803b524d4f87b0237d`, 142 entries, checker `f2fe706353ebba7737f2d280cb65f60ec1ea0feb9eef1456644668b41d03c59c` |
| Verdict | Delivery clean of blocking findings: zero blocking, five should-fix, seven notes |

Two independent instances audited the third candidate: one verified every
round-two repair, reproduced the gate and the byte-identical archive, and read
the record; the other exercised the shipped checker and adopter adversarially
against the repaired behaviours. Every round-two repair was confirmed with
evidence — the placeholder refusal naming its positions, the catalog
reconciliation refusing each tampered fact on 0.8 and 0.81 projects while the
untampered catalog updates and returns current, the drift refusal naming the
changed and added entries, the Realization and guide corrections, the
publication manifest's derived availability, and the versionless generation
check bound to the 0.81 chain. The gate passed in the clone with twenty-nine
test files and two hundred eighty tests and zero diagnostics, the archive
rebuilt byte-identically, the manifest and all one hundred forty-two members
reconciled, the five accepted digests held, the twelve guidance digests equalled
the archive bytes, the 0.8 frozen paths and catalog were untouched, and every
regression exercise of the earlier rounds repeated its outcome.

## Round Three Should-Fix Findings And Repairs

| Finding | Repair |
| --- | --- |
| The placeholder refusal matched the sentinel tokens exactly, so a reviewer id, finding, or limitation of a single space sealed and passed | Blank or whitespace-only values are refused with the placeholders, and the adopter suite proves it |
| The Realization's summary called the candidate technically confirmed before any confirmation Decision existed, and its gate sentence typed a test count one behind the tree | The summary states the candidate is under audit ahead of confirmation; the gate sentence carries no typed count and points to this Evidence for the counts at each cut |
| The guidance review described the adopt guide's host sentence as it read before the round-two repair | The review describes the current sentence |
| The onboarding guide said any later project change stales the plan, which the volatile registry makes overbroad | The guide states the registry's exception |
| The Task's progress recorded round one only | The progress records every round and cut |

## Round Three Notes And Dispositions

- A catalog stating the stable `public-github-release` channel is accepted
  offline with no corroboration, because neither the release manifest nor the
  consumer pin carries a channel; the archive digest remains the trust anchor
  and the pin records nothing about the channel it was adopted under. Recorded
  for the successor: a manifest or pin field for the channel would let the
  adopter reconcile it.
- The guides describe the release-asset redirect host rather than naming it,
  because Github controls that host. A firewall-configuring reader still lacks
  a hostname; recorded.
- The producer's self-validation reports readiness not evaluated with a
  candidate graph revision ahead of the sealed baseline, consistent with the
  reseal this Task performs at its close. Method statement.
- The adopter has no `--help`; the checker does. Cosmetic; recorded.
- Tampering the archive digest alone is refused as a noncanonical URL, and a
  tag or asset-name mismatch is refused as an inconsistent catalog without a
  `refusal` key. Both refuse before mutation; the diagnostics are less specific
  than the reconciled-key path. Recorded.
- The closure refusal arrives with its consistent cascade; the shipped checker
  alone cannot validate a 0.8 fixture without the 0.8 contract set. Both as in
  the earlier rounds.
- The shipped adopter retains the legacy repository coordinate for
  pre-0.71 pins. As in round two.

## Round Four — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited release commit | `a211c4761e24345ca3ce8e3fea520c85cf7fe907` (`task/NKF-038`, clean before and after) |
| Audited archive | SHA-256 `2e617fcf3350672c3b023f19dc3855c61ec342ee9a802f607fa9c2571efbe97f`, 142 entries, checker `f2fe706353ebba7737f2d280cb65f60ec1ea0feb9eef1456644668b41d03c59c`, adopter `1ffcf550e05b27bb49584616e455f188c660888c12b464afc214a439220e625f` |
| Verdict | Delivery clean: zero blocking, zero should-fix, six notes |

One independent instance verified every round-three repair with evidence,
exercising the blank-value refusal through the archive's own adopter on a 0.8
project — refused with the project unchanged, then `updated` and `current` at
integration revision five with the completed review — and reading the
Realization, guidance review, onboarding guide, and Task as repaired. It
reproduced the gate in a clean clone with twenty-nine test files and two
hundred eighty tests and zero diagnostics, rebuilt the archive
byte-identically, validated the manifest, reconciled all one hundred forty-two
members and every top-level digest, confirmed the five accepted digests and
the twelve guidance digests, confirmed the 0.8 frozen paths and catalog
untouched, ran the archive's checker on both 0.81 fixtures to ready with zero
diagnostics, and read every reconciled record with every relative link
resolving.

## Round Four Notes And Dispositions

- The release notes said the 0.8 adopter refuses a catalog that states the
  public channel; exercised, it refuses on its frozen compatibility set first.
  The sentence now says so.
- The projection says the 0.81 archive is published and downloadable by
  anyone; true from the publication that ships this projection, as with the
  publication manifest it names. Recorded.
- The Task's mandatory capabilities read `unknown` until the Completion Result
  classifies them at close; a mid-Task reader sees the table one step behind
  the prose. Method note.
- The adopter has no `--help`, as in round three.
- The fifth accepted digest binds the producer-promotion input, which is not a
  release-set member and is verified in the tree only, by design.
- The producer's readiness is not evaluated until the closing reseal, as in
  every round.

## Resulting State

Round one's two blocking findings, round two's seven should-fix findings,
round three's five should-fix findings, and
every should-fix finding of round one are repaired, and every note is recorded
with its disposition, and the fourth round found the delivery clean. The
commit that records this round changes no release-set member byte, so the
archive cut from it differs from the audited one only in the release commit its
manifest names, as it did for NKF 0.8; that archive is the one the
technical-confirmation Decision binds.

Four rounds is the fact worth carrying, and their shape repeats NKF 0.8's:
the delivery converged early — the catalog contract, the plain-HTTPS path, the
volatile registry, and the closure recompute never regressed — while the
findings after round one were in the hand-maintained record, in the guides the
generator does not own, and in mechanics no rule reached: a review left at its
placeholders, catalog facts nobody reconciled, a drift refusal that named
nothing. Each was closed by a mechanism rather than a sentence. This Evidence
confirms nothing; the mandatory audit-bound confirmation is the separate
Decision that follows.

## Subsequent PR Audit And Corrections — 2026-09-09

The Codex technical reviewer subsequently audited PR 24 at
`c2c4dd989c2e46a281c54628605d7d25e3234547`. That review reproduced a
false-readiness defect in the closure checker, identified contradictory
authority-acceptance provenance, and found that the Task described a mocked
fetch test as a local-server exercise. The preceding four-round audit remains
historical evidence for its exact candidate; its clean result does not dispose
of these later findings or confirm corrected bytes.

### Acceptance Provenance Correction

ADR 0140 declares that the Claude technical reviewer accepted its five-artifact
authority set under the Task's delegation. The Design instead assigns that
acceptance to the Human Product Owner, as does the release protocol, and the
Task's enumerated technical delegation does not explicitly include authority-set
acceptance. The reviewed sources do not establish the human acceptance or
explicit delegation needed to reconcile those statements. Authoring an
acceptance Decision and passing an independent technical audit do not supply
the missing authority act.

ADR 0140 is preserved byte-for-byte as an immutable historical declaration.
Its acceptance provenance is unresolved for publication reliance. A prospective
human acceptance or explicit delegation, recorded in a governed successor at
the exact applicable artifact digests after audit, is required. A direction
to repair audit findings does not retroactively accept those bytes. If the
predecessor-binding repair changes the authority set, that revised set must
receive its own audit and acceptance; accepting the old set would not accept
the revision. Current summaries must report this distinction.

### HTTPS Evidence Correction

The original test substituted `globalThis.fetch` and returned local file bytes.
It demonstrated adapter behavior, not a listening server, TLS, native fetch,
or a network redirect. The Task now describes that evidence accurately, and
the original test is named as a substituted transport test.

The added controlled integration test in `test/adopter.test.ts` passed on
`2026-09-09`. It leaves native fetch unchanged and routes TLS sockets for the
three allowlisted hosts to a temporary loopback HTTPS server. A generated local
certificate covers the three hostnames and is trusted only by the adopter
child. The server records the catalog request, the canonical asset request,
and a cross-host redirect to the final asset. Installation binds the expected
archive digest. Removing certificate trust refuses the catalog; altering the
served archive refuses its digest; both refusals preserve the project tree.
The first sandboxed run could not listen on loopback (`EPERM`); the run with
local-server permission passed. No public DNS, live GitHub availability, or
published 0.81 adoption is claimed. This focused correction is not a new
independent release audit or technical confirmation.

### Delegated P1 Repair — 2026-09-09

After the preceding findings, the Human Product Owner explicitly directed:
"i need you to audit the P1 yourself and execute at will". The Codex technical
reviewer audited the reproduced bypass and selected exact digest-bound
predecessor history. [ADR 0142](../../decisions/0142-accept-the-bound-predecessor-repair.md)
accepts the second unpublished authority revision under that prospective,
bounded delegation. It does not retroactively accept ADR 0140 and does not
claim an independent second-person audit.

The original exploit is now a source-derived regression in
`test/mechanics.test.ts`: seal a whole-root baseline with Product applying to
Realization, change the Product, and seal the resulting two-subject delta.
The valid seal establishes readiness. Erasing the closure including its
initiating subject, carrying the required Realization, forging carried
provenance, omitting or corrupting history, padding the closure, relabeling a
carrying delta as whole-root, and laundering an invalid earlier delta through
a later seal are refused. Local tests also retain valid voluntary extra review
and the mechanical transition's closed vocabulary.

The checker verifies exact historical bytes and graph identity, complete
judgment coverage, the supported policy and version delta, carried judgment
values and performing provenance, and exact closure equality. A chain must
reach a fully performed 0.81 whole-root anchor or supported frozen 0.8 review.
Historical files enter the validation snapshot and may not use symlinks.
The sealer preserves predecessor bytes; the adopter applies new history and
baseline bytes within its staged transaction, including Task transitions and
0.8-to-0.81 conversion.

The proof establishes structural and digest consistency. It cannot verify the
semantic truth of an authored performed-review assertion or replace external
human authority. The first authority revision remains exact source evidence
from `NourdApS/Nourd.NKF` commit
`c2c4dd989c2e46a281c54628605d7d25e3234547`:

| Original path | Preserved bytes | SHA-256 |
| --- | --- | --- |
| `knowledge/specifications/nkf-0.81.md` | [1-nkf-0.81.md](nkf-0.81-authority-revision-1/1-nkf-0.81.md) | `b6a3991cde1121a87842e2464e16145346e72c7ee82b2040621bad851bb1da45` |
| `contracts/nkf/0.81/nkf.yaml` | [2-nkf.yaml](nkf-0.81-authority-revision-1/2-nkf.yaml) | `004969c10d74191274f74a4dce0b9aebb983d52a70ee3351e05e18086dc78cb4` |
| `contracts/nkf/0.81/freshness-policy.yaml` | [3-freshness-policy.yaml](nkf-0.81-authority-revision-1/3-freshness-policy.yaml) | `742f72d81531e48b3af2453affb3548faa85064f0dcca7e39b8e3962a7a25de4` |
| `contracts/nkf/0.81/version-delta.yaml` | [4-version-delta.yaml](nkf-0.81-authority-revision-1/4-version-delta.yaml) | `9908a65fbd31e1c7e5c6ce9f70769d54142a57e0a446643b0abea51c07ccdf42` |
| `knowledge/evidence/release/nkf-0.81-producer-promotion.yaml` | [5-nkf-0.81-producer-promotion.yaml](nkf-0.81-authority-revision-1/5-nkf-0.81-producer-promotion.yaml) | `cee895a59ef8366d1dc50ca199e4fa8e6c3d7e166e8adf3a50f2eceb681bbb88` |

This repaired working tree is outside ADR 0141's exact candidate confirmation.
Publication, recommendation, producer promotion, and merge remain separate.

The producer-upgrade test then exposed an omitted promotion heading declaration
and one unlinked Task reference in that accepted revision. The checker refused
them. [ADR 0143](../../decisions/0143-bind-the-predecessor-repair-promotion.md)
selects the corrected navigation bindings without changing P1 semantics. The
second five-artifact revision remains byte-for-byte under
`nkf-0.81-authority-revision-2/`, at the digests recorded by ADR 0142.
The sealer also verifies the resulting proof before success, rolls back a
rejected successor and newly added history, and permits whole-root recovery
after history loss. Regression checks cover both rollback and recovery.

## Final Corrected Candidate Audit — 2026-09-09

The Human Product Owner explicitly directed committing the current repair,
closing [NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
and making its pull request ready for merge, with a lower-cost documentation
sweep. GPT-5.6 Luna independently swept the documentation and audited the
corrected release set and archive; the Codex technical reviewer performed the
exact producer exercise and reviewed its semantic delta under the recorded
delegation. The earlier audit rounds and their original findings remain
history and do not supply this verdict.

| Audited binding | Exact value |
| --- | --- |
| Release commit | `e5b06343b94b2b0a5b0986d43c893dfd7e5d63e2` |
| Archive SHA-256 | `070d3222af5274cbec51153fb2c9eac6f2befc336470e3f7de2792cbd16a6851` |
| Checker SHA-256 | `1a268c93d9f484389885c02336ebd8464718967249036e79de03ddf7cd775008` |
| Adopter SHA-256 | `12272609c5d0ca7bcc6d5bc67b919f86f1dfee1a1d53409f10549e419c32ffa5` |
| Complete release set | 142 members: 141 source members and the generated manifest |
| Completed semantic review SHA-256 | `fa4a044fef2bd0bc48fe004b74d4913eefb596c00d4a245da8307d9c1b6ee5c8` |

The independent audit recomputed the archive hash, checked all 141
manifest-listed member hashes, matched the five current authority artifacts
to [ADR 0143](../../decisions/0143-bind-the-predecessor-repair-promotion.md),
and verified all twelve final guidance digests against the full reread in the
[guidance review](nkf-038-nkf-0-81-guidance-review.md). It checked the P1 source
proof and its adversarial regression cases: exact predecessor history and
chain validation, exact carried values and provenance, independently computed
mandatory closure, missing or altered history, unsafe paths, malformed closure
sets, rollback, whole-root recovery, and closed mechanical transitions.
Twenty-four version-specific 0.8 contract, Specification, and distribution
members remain byte-identical to the published archive
`2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`.
Existing accepted Decisions, the 0.8 recommendation, and the producer pin are
unchanged.

The final literal sweep found one remaining stale diagnostic: an invalid
0.81 onboarding plan was described as a 0.4 plan. The source and generated
adopter copies now name 0.81; a direct invalid-plan exercise verified the
corrected message. The exact candidate exercise script also still selected
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md).
It now supplies the current exact promotion selection in
[ADR 0143](../../decisions/0143-bind-the-predecessor-repair-promotion.md).
These findings are repaired, not waived. No other actionable stale claim or
archive-integrity finding remains in this audit.

Release packaging passed all 281 tests in 29 files, deterministic checker and
adopter builds, the public projection, and notices verification. The controlled
native HTTPS test verifies real TLS certificate and hostname checking, an
allowlisted cross-host redirect, exact installation, and refusal of untrusted
TLS and tampered bytes. It does not claim a live public 0.81 release exists.

The exact archive was then exercised in a fresh isolated producer clone.
Source-provenance reproduction rebuilt all 141 source members from the
manifest-bound commit. The promotion review was a delta, not a whole-root
fallback: its computed closure is exactly the new native
`record:nkf-0.81-specification`, reviewed as eligible and governing against its
accepted purpose section and exact native declaration; 358 unchanged judgments
carry with their predecessor values and provenance. The independent reviewer
parsed and checked this one-fresh, 358-carried review scope. The shipped
checker verifies the resulting predecessor proof and requires readiness.
First Adopt returned `updated`, repeat Adopt returned `current`, host-superset
integration remained intact, and the full `npm run nkf:check` passed inside the
promoted copy. The digest-bound 0.8-to-0.81 promotion is therefore proven for
this exact candidate.

This audit clears the corrected release set for a fresh technical confirmation.
As in the previous release order, the confirmation archive is cut from the
clean commit that records this audit, with every source member checked
byte-identical to this audited archive. Only its manifest's source-commit
binding changes; the resulting exact archive is verified and exercised again
before confirmation. Publication, recommendation, live producer promotion,
and merge remain separate Human Product Owner acts.

### Audit-Recording Recut And Final Exercise

The independent reviewer verified archive `a27cb34350e5a27efd835825f7255528a61d937fcd1180c7db56119e689682e3`
at release commit `fa0efa056db17f5336a3b7a93142d58f41110cf7` against the audited archive above:
all 141 source members are byte-identical, and the manifests differ only in
`source.release_commit`. The new commit contains this audit's completed
corrected-candidate findings and exercise. The final archive again passed the
isolated exercise: `updated`, then `current`, host-superset integration, full
producer gate passed, and 141 source members reproduced from a clean clone.
The final semantic review SHA-256 is
`15466062760ef2eab985f05b826308a152de68dc533223570450ac4efde60f26`;
its closure is again exactly the new native Specification, with one fresh
judgment and 358 carried judgments. No whole-root fallback was used.

[ADR 0144](../../decisions/0144-confirm-the-repaired-nkf-0-81-candidate.md)
records the separate delegated technical confirmation of these exact bytes.
The root still declares and pins 0.8. No release publication, recommendation,
live producer promotion, or merge is performed by this confirmation.

### Hosted Runner Test Budget

GitHub validation of commit `e5b06343b94b2b0a5b0986d43c893dfd7e5d63e2`
ran all 281 tests and reported one failure: the expanded source-derived P1
regression exceeded the global 60-second test timeout. It reported no failed
correctness assertion. The same complete regression passed locally in about
25 seconds. This test now uses the suite's existing `scaledTimeout(60_000)`
integration allowance, retaining every assertion, refusal, rollback, and
recovery case. The change affects only the test harness, outside the release
set; all 141 confirmed source-member bytes remain unchanged. Local handoff
validation and remote merge enforcement are checked separately on the final
Task-close commits.
