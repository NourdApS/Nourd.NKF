---
title: NKF-032 NKF 0.71 Publication
summary: Records the publication of the technically confirmed NKF 0.71 release from the concluded release branch — the exact content-addressed tag, target release commit, publication instant, asset size, and the re-download digest verification proving the published bytes equal the confirmed archive exactly.
created_at: 2026-08-18T03:40:00Z
---

# NKF-032 NKF 0.71 Publication

Under [NKF-032](../../tasks/items/NKF-032-adopt-the-producer-to-published-nkf-0-71.md)
and the Human Product Owner's recorded standing direction, the technically
confirmed NKF 0.71 release was published from the release branch before any
merge, exactly as
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
binds it. This Evidence records the publication facts.

## Publication Facts

| Fact | Value |
| --- | --- |
| Release tag | `release-sha256-3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13` |
| Target release commit | `8727ac6ebedc61482bf8f90c546f9bf179d9f463` |
| Published at | `2026-08-18T02:28:47Z` |
| Channel | Private prerelease on `NourdApS/Nourd.NKF` |
| Asset | `nourd-nkf-sha256-3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13.tar`, 7589376 bytes |
| Release body | The prepared [NKF 0.71 release notes](nkf-0.71-release-notes.md) |

## Verification

The published asset was independently re-downloaded and hashed byte-exact
to the confirmed archive digest
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`, and the
archive itself was reproduced byte-identically at the target release commit
by the deterministic packager immediately before publication — the same
reproduction the clean independent
[release audit](nkf-031-nkf-0-71-release-audit.md) performed. The published
bytes are exactly the audited and confirmed bytes.

This Evidence records observed operational facts. Publication is not
confirmation, recommendation, adoption, or conformance.
