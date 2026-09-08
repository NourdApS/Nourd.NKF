# Contributing

NKF is governed knowledge as much as it is code. Read this before opening a pull
request.

## How Change Happens Here

Every consequential change starts from an owning Task under `knowledge/tasks/`,
created by explicit direction from the Human Product Owner. Proposals are
Designs, accepted directions are Decisions, and normative meaning lives only in
accepted Specifications. A passing check, a merged commit, or a working
implementation never accepts knowledge by itself. Read `AGENTS.md` and
`knowledge/README.md` first; they describe the boundaries in full.

Because of this, an unsolicited pull request that changes accepted meaning,
contracts, Schemas, checker behaviour, or published bytes will not be merged
as-is. Open an issue describing the problem and the evidence instead. If the
Human Product Owner opens a Task for it, the work proceeds under that Task and
you are welcome to carry it.

## What You Can Send Directly

- Bug reports with a reproduction against a named NKF version.
- Findings classified as a specification issue, a checker or distribution bug,
  a migration issue, or a consumer nonconformance, with evidence.
- Documentation corrections to non-frozen files. Published versions under
  `distribution/` and `public-docs/` are frozen; corrections to them land in
  the next version.

## Before You Open A Pull Request

Use Node.js 22 or later, install with `npm ci`, and run the one supported
validation command:

```sh
npm run nkf:check
```

It must pass. Do not weaken a contract, checker, fixture, test, or workflow to
make it pass. Report the failure instead.

## Review And Merge

Every pull request is reviewed by the Human Product Owner, and merging is their
act. The exact-commit `NKF Contracts` workflow runs on every push and pull
request and is required on `master`.

## Licensing

Contributions are accepted under the Apache License 2.0 that covers this
repository, with no separate contributor agreement. By submitting a
contribution you agree to license it under those terms.
