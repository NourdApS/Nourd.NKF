# NKF-008 Release Publication And Local Adoption Evidence

- Observed At: `2026-07-31T02:33:42Z`
- Evidence Authority: Local build and verification output plus Github Release
  API observations
- Acceptance Effect: None
- Confirmation Effect: None

## Source And Build

The clean release source checkpoint was:

```text
37c0f557e0b936b1f2e56706c936ef619aacdd9d
```

The release packager ran the complete engineering check, built the checker and
adopter deterministically, verified the public documentation source, built the
checker twice, assembled the archive twice, validated the release manifest,
and invoked the verified packaged checker against the valid Product fixture.

The resulting exact asset was:

| Property | Observed Value |
| --- | --- |
| Archive SHA-256 | `0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727` |
| Asset name | `nourd-nkf-sha256-0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727.tar` |
| Size | `1227776` bytes |
| Checker SHA-256 | `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7` |
| Release tag | `release-sha256-0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727` |

Independent local verification confirmed the archive digest, canonical
eight-file USTAR layout, embedded manifest, source provenance, every bound
artifact digest, and packaged checker invocation.

## Remote Publication Observation

Github observed a non-draft private prerelease at:

```text
https://github.com/kaveh6202/Nourd.NKF/releases/tag/release-sha256-0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727
```

The release:

- targeted exact source commit
  `37c0f557e0b936b1f2e56706c936ef619aacdd9d`;
- was marked as a prerelease;
- reported publication time `2026-07-31T02:33:42Z`;
- contained exactly the expected named asset;
- reported asset digest
  `sha256:0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`;
  and
- reported asset state `uploaded`.

The asset was downloaded again through the authenticated Github release
interface into a new temporary directory. The downloaded bytes were
byte-identical to the locally verified candidate and passed the independent
release verifier and packaged-checker invocation again.

The predecessor prerelease was retained as historical publication Evidence.
It was not overwritten or relabeled as current.

## Recommended Release Binding

`release/recommended.json` records the exact release, checker, authority,
adopter, channel, visibility, and supported Product and Technology profiles.

The local recommended-release verifier passed. The catalog is deliberate
current Realization state. A consumer copies its exact values into an
immutable local pin and never follows the catalog dynamically.

## Local Consumer Exercise

The re-downloaded remote asset and public adopter were exercised against an
isolated synthetic Product Git repository owned by the NKF test boundary.

The observed result was:

```json
{
  "contract": "nkf.consumer-adoption-exercise",
  "state": "passed",
  "release_sha256": "0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727",
  "install_state": "installed",
  "check_state": "passed",
  "no_update_state": "no-update",
  "integration_tamper_rejected": true,
  "knowledge_tamper_rejected": true,
  "project_kind": "isolated-synthetic-product"
}
```

The exercise installed the release, pin, adopter, neutral protocol, portable
skills, host adapters, integration registry and verifier, package command, and
Github workflow without manual assembly.

## Remaining Operational Preconditions

This Evidence does not yet establish:

- public documentation publication;
- remote public-projection byte verification;
- Github execution of the consumer-adoption workflow;
- protected merge enforcement;
- an external Agent SDK migration;
- final Realization confirmation; or
- NKF-008 completion.

The successful release and local consumer exercise establish publication and
validation observations only. They do not accept consumer knowledge.
