# NKF-015 Publication And Verification Evidence

- Observed At: `2026-07-31T18:40:52Z`
- Evidence Authority: Deterministic staging, private and public Git
  observations, Github repository metadata, fresh-clone byte comparison,
  manifest digest verification, and pinned-checker output
- Acceptance Effect: None
- Confirmation Effect: None

## Private Source Identity

The clean, conformant NKF source revision used for public staging was:

```text
53ae5217f68731d953f3bf616a578adeb033bb03
```

That revision was observed on `origin/master` in
`kaveh6202/Nourd.NKF`. Its local `npm run nkf:check` passed before
publication. Exact-commit `NKF Contracts` run `30655408945` subsequently
passed for that same revision. Its `Validate` job `91238448061` completed in
one minute and five seconds with successful checkout, Node.js setup, locked
dependency installation, contract validation, and cleanup steps.

## Publication Identity

Deterministic staging produced 28 files: 27 closed-allowlist source files plus
the generated non-circular `reference/publication.json`. The generated
publication manifest SHA-256 was:

```text
40c77be1543d916946ba09733b2264033f75e7c7e9e4963b5f15291b89dfe2b5
```

The exact public projection is:

```text
https://github.com/kaveh6202/Nourd.NKF.Docs
```

Github reported the repository as Public with default branch `master`. The
published commit was:

```text
a14766ca1bdc67bfd8fb9e6d73355fc019017a90
```

The manifest binds:

- NKF version `0.1` and visible `pre-stable` status;
- private source commit
  `53ae5217f68731d953f3bf616a578adeb033bb03`;
- normative Markdown SHA-256
  `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be`;
- unchanged internal archive SHA-256
  `0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`;
- unchanged checker SHA-256
  `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`;
  and
- successor public adopter SHA-256
  `c33766982d3354a01558bf1f0903314eb98537e38c50585c9cd94c7c24aae387`.

No new native archive was created because the accepted Specification,
executable companion, Schemas, confirmed checker, and existing archive bytes
did not change.

## Independent Fresh-Clone Verification

A second fresh public clone resolved exact commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90`. Excluding only `.git`
implementation metadata, it matched the deterministic staged projection with
no byte difference. All 27 manifest-bound file digests matched.

The confirmed checker was then invoked directly against both published
examples without persisting results:

| Example | Root Profile | Snapshot SHA-256 | Entries | Conformance | Diagnostics |
| --- | --- | --- | --- | --- | --- |
| Product | `nkf.profile.product` | `66933cb68be22dd228afaf4ba0bc7f56a9fc91a6e32811336e7ef0edc4d0a7bf` | 9 | Passed | None |
| Technology | `nkf.profile.technology` | `219e874a710d3b59dd5aa38f411bb0aa07151d262890739910e9218f247d94f8` | 13 | Passed | None |

Both observations used checker SHA-256
`a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`.
Acceptance binding was not requested and Governing Use remained Not Ready or
Not Evaluated according to each declared record state.

## Public Information Boundary

The public projection contains only the reviewed allowlist. It publishes the
portable onboarding skills, neutral onboarding protocol, explanatory guides,
complete examples, exact normative Markdown mirror, and public-safe adopter.
It does not publish private checker bytes, private knowledge, Tasks, Evidence,
credentials, local paths, repository history, or release authentication.

## Consumer Boundary

Consumer-repository onboarding is not part of NKF-015. The Human Product
Owner removed that operation from the Task and retained it for separate manual
execution. No consumer repository was modified by this publication.

## Non-Claims

This Evidence does not:

- accept public documentation or consumer meaning;
- confirm a Realization;
- turn the public projection into NKF authority;
- make the private native archive public;
- establish acceptance binding or Governing Use readiness; or
- establish protected merge enforcement.
