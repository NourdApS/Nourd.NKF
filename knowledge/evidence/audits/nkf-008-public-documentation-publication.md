# NKF-008 Public Documentation Publication Evidence

- Observed At: `2026-07-31T02:57:30Z`
- Evidence Authority: Local deterministic staging, remote Github repository
  observations, a fresh public clone, digest verification, and checker output
- Acceptance Effect: None
- Confirmation Effect: None

## Publication Identity

The governed publication source was clean private NKF commit:

```text
c03d889b8d8ed459e330d9f4e52c9837aa621974
```

Deterministic staging produced 24 files: 23 allowlisted source files plus the
generated non-circular `reference/publication.json` binding. The generated
manifest SHA-256 was:

```text
196549e11acf5ed3e3481a1385369e797bfa951f492e86993009d25623a52f26
```

The public projection is:

```text
https://github.com/kaveh6202/Nourd.NKF.Docs
```

Github reported that repository as Public with default branch `master`. The
exact observed publication commit was:

```text
002dd567522bbcba6d250b4f878c2ff3fb778026
```

## Independent Remote Verification

A fresh clone from the public HTTPS locator was byte-identical to the staged
projection after excluding only its Git metadata.

Independent verification recalculated every one of the 23 manifest-bound
file digests. All matched. The manifest binds:

- NKF version `0.1`;
- visible `pre-stable` status;
- explanatory publication role;
- source commit
  `c03d889b8d8ed459e330d9f4e52c9837aa621974`;
- normative Markdown SHA-256
  `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be`;
- internal release SHA-256
  `0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`;
- checker SHA-256
  `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`;
  and
- public adopter SHA-256
  `b2fb0580705782dec45e96fdcce298c691a4d9842e120d1b036104c46567bb88`.

## Complete Published Examples

The completion audit found that the first published examples were explanatory
sketches rather than complete runnable projects. The final publication
replaced them with exact project trees generated from the validated Product
and Technology fixtures.

The pinned checker was then run directly against both projects from the fresh
public clone:

| Example | Root Profile | Conformance | Diagnostics |
| --- | --- | --- | --- |
| Product | `nkf.profile.product` | Passed | None |
| Technology | `nkf.profile.technology` | Passed | None |

The Technology example includes and verifies one governed source artifact.
The Product example includes every canonical Markdown source and explicit
non-record representation.

## Public Information Boundary

The final projection contains only the closed allowlist. It contains no
private checker bytes, internal Task or Evidence tree, consumer knowledge,
credentials, personal paths, repository history, analytics, runtime service,
or deployment secret.

The exact normative Markdown mirror is public and digest-bound. Explanatory
guides, examples, diagrams, the adopter, Github rendering, and the
publication manifest do not become an independent NKF authority.

## Non-Claims

This Evidence does not:

- accept or confirm the documentation;
- make the private checker release public;
- accept example or consumer meaning;
- establish protected merge enforcement;
- verify historical acceptance bindings; or
- establish conformance for any project other than the two exact observed
  public example snapshots.
