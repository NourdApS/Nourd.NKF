---
title: NKF-036 NKF 0.8 Public Documentation Publication
summary: Records the publication of the deterministic NKF 0.8 public-documentation projection to the public documentation repository — the clean staging commit, the published commit, the manifest digest, the fresh-clone byte and digest verification, the repository's observed move to the NourdApS organization — and records as a separate fact that the NKF-035 adoption Task closed with its front-page and Realization reconciliation step partly done.
created_at: 2026-09-08T10:58:00Z
---

# NKF-036 NKF 0.8 Public Documentation Publication

This records the publication of the NKF 0.8 public-documentation projection
under
[NKF-036](../../tasks/items/NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md).
It is Evidence of an operational act. It accepts no meaning, confirms no
Realization, and changes no published NKF byte.

## The State Before Publication

| Fact | Value |
| --- | --- |
| Public repository tip before publication | `8c61d7632394c977c22c85c02a0b2afdf58c16d4` |
| Its published version | NKF 0.2 |
| Its publication date | `2026-08-10` |
| Frozen `public-docs/` versions never projected | 0.3, 0.4, 0.5, 0.6, 0.7, 0.71, 0.8 |

The producer's front page stated this lag honestly: every published archive
carries its complete projection, and this repository did not claim the mirror
had moved from its last independently observed 0.2 state. Anyone reading the
public explanation or downloading the public adopter between `2026-08-10` and
this publication received NKF 0.2 material.

## Staging

Deterministic staging ran `scripts/stage-public-docs.mjs` against a clean
source tree at `master` commit
`d3f0e84f7a6febc9a305fab687bdfbf8d0683ae1`, the merge of the NKF-035
adoption, into an empty workspace outside the project. The script verified the
public-docs source set first, then copied the closed 62-file public member set
and generated `reference/publication.json`.

| Fact | Value |
| --- | --- |
| Staging source commit | `d3f0e84f7a6febc9a305fab687bdfbf8d0683ae1` |
| Staged files | 63, the 62 public members plus the generated manifest |
| Manifest SHA-256 | `b7188516f265f24f98fbc658076c17f9d97da07c0d0d3333c6f1dcbc48f9aee9` |
| Manifest `nkf_version` | `0.8` |
| Bound normative Markdown SHA-256 | `6a5c571d6dcc1a00c52467095e8835458d829c67e5c9e72f9363fe66cec2982e` |
| Bound release archive SHA-256 | `2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5` |
| Bound release source commit | `1c8c31948d73e6d79ee36c1b13985ca6db031e5b` |
| Bound checker SHA-256 | `52d491cc25da898444bf33568e92b058fca4559fd1863902ad48504899d5985a` |
| Bound public adopter SHA-256 | `5e3288081d75e7ab9914f56498c3157e85be7ede7f89477f111fd09007d58d85` |

The staged bytes are the frozen NKF 0.8 `public-docs/` members exactly as
published in the archive; no member was edited.

## Publication

In a clone of the public repository, every tracked file was removed, the staged
projection was copied in whole, and the result was committed and pushed to
`master`.

| Fact | Value |
| --- | --- |
| Published commit | `b953e7bacca9db119a084b1021d418900699484b` |
| Pushed at | `2026-09-08T10:55Z` |
| Remote tip after push | `b953e7bacca9db119a084b1021d418900699484b` on `refs/heads/master` |
| Repository as addressed | `https://github.com/kaveh6202/Nourd.NKF.Docs.git` |
| Repository as reported by Github during push | moved to `https://github.com/NourdApS/Nourd.NKF.Docs.git` |

Github accepted the push through the old address and reported that the
repository had moved to the NourdApS organization. The producer's front page
and the immutable
[ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) name the
original `kaveh6202/Nourd.NKF.Docs` location. The Decision's bytes are
history and stay unchanged; the front page is reconciled under this Task to
name the current location while noting that the original address redirects.

## Verification

A second fresh clone independently resolved `master` at
`b953e7bacca9db119a084b1021d418900699484b`. Excluding only `.git`, a recursive
`diff` found it byte-identical to the deterministic staging output. An
independent digest pass then recomputed every manifest-bound file digest.

| Check | Result |
| --- | --- |
| Fresh clone tip equals published commit | yes |
| Recursive `diff` against staging, excluding `.git` | byte-identical |
| Files in the fresh clone, excluding `.git` | 63 |
| Manifest-bound digests recomputed | 62, zero mismatches |
| Files outside the manifest plus manifest | none |
| Published adopter bytes SHA-256 | `5e3288081d75e7ab9914f56498c3157e85be7ede7f89477f111fd09007d58d85`, equal to the manifest and to the recommended adopter digest |

The public adopter now available for download is the exact NKF 0.8 adopter the
producer itself has installed.

## A Fact About The Closed Adoption Task

[NKF-035](../../tasks/items/NKF-035-adopt-the-producer-to-published-nkf-0-8.md)
listed "reconcile the front page and the current-system Realization" as its
fifth scope item and closed on `2026-08-19` with acceptance criterion seven
stating that the governed record states the adopted reality with pre-adoption
statements corrected. The front page's status section and one paragraph of the
Realization were reconciled. The front page's Start Here rows still named
NKF 0.71 as the running format and linked the NKF 0.71 adoption protocol; the
Realization's summary and its Governed Meaning Realized opening still declared
that the producer runs NKF 0.71; its durable-mapping table still carried
NKF 0.7 checker, adopter, pin, baseline-policy, and test-count facts; and the
specifications map still said the producer declares the published 0.7 release.

That is a fact about a closed Task. This Evidence records it. It does not
reopen, amend, or qualify the Task, and the reconciliation itself is performed
under
[NKF-036](../../tasks/items/NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md).

## Boundary

This Evidence records operational acts observed at one moment. Publication of
explanatory documentation and an exact digest-bound mirror accepts no NKF
meaning, confirms no Realization, changes no repository or release visibility,
and migrates no consumer. Github, rather than this Evidence, remains
authoritative for the public repository's later state.
