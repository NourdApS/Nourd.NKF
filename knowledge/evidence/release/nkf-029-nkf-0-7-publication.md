---
title: NKF-029 NKF 0.7 Publication
summary: Records the Human Product Owner-authorized publication of the exact confirmed NKF 0.7 release archive from the task branch — tag, target release commit, publication facts, and the re-download digest verification against the technically confirmed bytes.
created_at: 2026-08-17T22:45:00Z
---

# NKF-029 NKF 0.7 Publication

On `2026-08-17`, under the Human Product Owner's explicit authorization
recorded in
[NKF-029](../../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md)
— publish from the branch, without merging to `master` — the delegated
technical reviewer published the exact NKF 0.7 release candidate confirmed by
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md).

## Publication Facts

| Fact | Value |
| --- | --- |
| Tag | `release-sha256-c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |
| Target release commit | `e5b265e87da6c12b73b4749f8d24b41b996cc77a` |
| Published at | `2026-08-17T10:30:39Z` |
| Channel | Private GitHub prerelease on `NourdApS/Nourd.NKF` |
| Asset | `nourd-nkf-sha256-c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f.tar` |
| Asset size | `8228864` bytes |
| Release body | The prepared [release notes](nkf-0.7-release-notes.md) sections |

## Verification

The published asset was re-downloaded from the release and its SHA-256
digest computed:
`c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` — exactly
the archive digest bound by
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md),
targeted at exactly the confirmed release commit. The publication carries
the confirmed bytes unmodified.

Publication freezes every member of this version's complete set. This
Evidence records publication facts. It does not itself recommend, adopt,
promote the producer, merge, or change repository visibility, and the
`master` branch was deliberately not merged first: the release publishes
from the concluded `task/NKF-028` branch at the confirmed release commit.
