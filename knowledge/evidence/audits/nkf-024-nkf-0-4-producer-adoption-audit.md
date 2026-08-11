# NKF-024 NKF 0.4 Producer Adoption Audit

## Scope

This Evidence records the fresh independent-state audit of NKF's ordinary
post-publication self-Adopt to NKF 0.4. It covers the reviewed recommendation,
published release, installed producer pin, preserved host-superset integration,
pristine-checkout validation, repeat `current`, tracked-byte idempotence,
predecessor preservation, and tamper rejection.

This audit does not accept NKF meaning, exercise technical confirmation,
establish protected-branch enforcement, verify acceptance binding, or make
Governing Use ready.

## Audited Identities

- producer-adoption commit:
  `c5ed38514c30e0e0ba0ffde90e784087bd3a3335`
- release source commit:
  `29880a398c26fbc126b13cdaaebe9cf5b7fe7734`
- archive SHA-256:
  `a7912b92c3b5ec1a0000009edf40f36a8b74b746c2ccc00b7ae76ae14ad79ecd`
- checker SHA-256:
  `425286d383fa2a93461ebbae4fc986c67f987adab3b5545a927b75064c9ed123`
- adopter SHA-256:
  `416b26e7413afebf24fdb97d47cedae613242476839c98250a330c3cdcf0cd65`
- recommendation checkpoint commit: `21d7888`
- release id: `368669248`
- release asset id: `510299079`

## Ordinary Producer Adoption

From clean committed recommendation state, the public subcommand-free Adopt
operation used the reviewed branch-local recommendation and acquired the
archive from the authenticated private Github release. It used no candidate
binding, archive override, SHA override, migration plan, or breaking-approval
flag.

The first invocation reported `updated` from NKF 0.3 to 0.4 with
`classification: non-breaking` and `migration_required: false`. It installed
the exact archive, checker, adopter, and source-commit bindings. Immediate
repeat through the newly installed adopter reported `current` / `no-update`.
The repository's complete `knowledge/` tree had no changed tracked path.

The adopted state retained integration revision 2 and mode `host-superset`:

```text
npm run nkf:check:pinned && npm run nkf:check:host
```

The pinned release check remains first. The preserved producer host step still
verifies agent and onboarding guidance, links, type checking, deterministic
builds, tests, release artifacts, the public projection, and self-conformance.

## Fresh Exact-Commit Audit

A new disposable clone retrieved exact remote commit `c5ed385...`. Before any
build it already contained the installed 0.4 adopter and archive at their exact
digests. After only `npm ci --ignore-scripts`:

- `npm audit` reported zero vulnerabilities at every severity;
- the governed recommendation verifier matched the exact archive, release
  source, checker, adopter, and accepted 0.4 authority pair;
- `npm run nkf:check` passed its pinned step before the host build;
- all 28 test files and 210 tests passed;
- 1,034 links passed with no dead non-exempt link;
- deterministic checker, adopter, and 64-file public-projection builds matched;
- full-bundle self-validation completed with zero diagnostics; and
- authority binding remained `not-evaluated` and Governing Use remained
  `not-ready`, as separately bounded states.

Ordinary authenticated Adopt from that fresh clone re-downloaded the published
release and returned `current` / `no-update`. The Git index identity hash was
`0d09924f0c5810170009bf5c98b52452947e86be424bb753e202657dd5665254`
both before and after, and no tracked path changed.

## Publication And Predecessor Checks

Fresh remote tag resolution reported the 0.4 content-addressed tag at exact
release source `29880a3...`. Authenticated Github metadata reported one
non-draft prerelease asset, 4,164,608 bytes, platform digest
`sha256:a7912b92...79ecd`, and publication time `2026-08-11T15:27:44Z`. A new
asset download independently reproduced SHA-256 `a7912b92...79ecd`.

The diff from the recommendation checkpoint to the producer-adoption commit
changed only the bundle coordinate, installed pin, installed archive and
adopter, and registered 0.4 guidance/integration bindings. It changed no path
under `knowledge/` and no frozen 0.3 contract, distribution, Product fixture,
or Technology fixture path.

## Adversarial Checks

Three isolated repository copies were changed independently. The installed
check failed closed for each intended defect:

- a pin source-commit change: `The verified release manifest differs from the
  installed pin.`
- an appended archive byte: `Release archive digest does not match the
  independent consumer pin.`
- a changed canonical package script: `The project NKF script chain differs
  from the exact installed integration.`

An initial disposable-copy filter incorrectly matched `.github` as though it
were `.git`; those setup failures were discarded because they did not reach
the intended tamper. The clean rerun used exact path-segment exclusions and
produced the three findings above.

## Verdict

`CLEAN` — no material post-adoption finding remains. The branch recommendation
and producer pin select the same immutable published NKF 0.4 archive, ordinary
Adopt is idempotent, the producer's stronger gate is preserved and pristine-
checkout safe, frozen predecessor and project knowledge bytes remain intact,
the two dependency advisories are absent, and the installed boundary rejects
the reviewed integrity failures.

Publication, recommendation, producer adoption, conformance, technical
confirmation, Git state, remote enforcement, acceptance binding, and Governing
Use remain separate facts. No successful Github Actions run or protected-
branch state for this exact Task head was established by this audit.
