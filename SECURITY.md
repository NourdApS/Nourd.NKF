# Security Policy

## Supported Versions

NKF is pre-stable. Live support covers the current recommended version and one
predecessor, as declared in `release/recommended.json`. At the time of writing
that is NKF 0.8 and NKF 0.71. Older versions are immutable published history
and receive no fixes; a repository on one of them migrates through its
published stepping-stone archives.

## Reporting A Vulnerability

Do not open a public issue for a suspected vulnerability.

Use Github's private vulnerability reporting for this repository: open the
Security tab, choose Advisories, and report a vulnerability. Include the NKF
version, the exact archive SHA-256 if known, a reproduction, and the impact you
observe.

Reports are acknowledged as soon as practical. A confirmed defect in a released
version is fixed in a new NKF version under the governed release protocol;
released bytes are never modified in place. The report and the fix are
recorded in the repository's governed Evidence once the fix is published.

## Scope

In scope: the NKF checker, the adopter, the contracts and Schemas, the
onboarding and authoring protocols, and the release and publication tooling in
this repository.

Out of scope: consumer repositories' own knowledge and configuration, Github's
platform, and third-party dependencies except where this repository's use of
them creates the exposure.
