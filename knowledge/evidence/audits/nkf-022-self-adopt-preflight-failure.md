# NKF-022 Self-Adopt Preflight Failure Evidence

- Observed At: `2026-08-10T17:38:22Z`
- Evidence Authority: Exact Task-branch source, governed recommendation,
  published adopter digest, adopter output, post-failure Git status, and
  accepted producer-validation enforcement
- Acceptance Effect: None
- Confirmation Effect: None

## Exact Attempt

The clean `task/NKF-022` worktree had no `.nourd/nkf-release.json`. Its
published adopter SHA-256 was independently calculated as:

```text
e109fbeaf99d7576b56e0fdf1411092b235379a6eba7a58b99db719391c344d0
```

That exactly matched `release/recommended.json`, which names archive
`015a922d...a51f`, release source `7eefe7d`, and checker
`f96d8b8...403c6`. The public operation was invoked with only the project:

```text
node public-docs/tools/nourd-nkf-adopt.mjs --project .
```

It resolved the default governed recommendation and then failed before
mutation with:

```json
{
  "code": "NKF-ADOPTER-FAILED",
  "message": "package.json already defines an incompatible nkf:check command."
}
```

Post-failure Git status was clean and `.nourd/nkf-release.json` remained
absent. The transaction therefore made no partial installation claim.

## Compatibility Finding

The released consumer integration requires the exact package command:

```text
node .nourd/tools/nkf/nourd-nkf-adopt.mjs check --project .
```

The NKF producer repository instead governs a stronger command that verifies
agent guidance, onboarding guidance, living links, TypeScript, deterministic
builds, 192 tests, adopter and public-documentation builds, and self-hosted
full-bundle conformance. `package.json` is a governed artifact with SHA-256
`896b1c69...258f`, and the repository guidance verifier requires this exact
producer chain.

Moving the producer chain into npm `prenkf:check` is not a compatible shim:
the accepted verifier explicitly rejects lifecycle scripts around the
canonical validation path. Replacing the producer command with the consumer
command would remove the established one-command producer gate. Manually
installing only a pin would also be false adoption because installed-state and
repeat-Adopt verification require the exact consumer package command.

## Classification

The exact current release does not support the NKF producer repository's
governed validation superset. Resolving the mismatch requires a consequential
choice between:

1. evolving the released Adopt integration so a producer repository can bind
   an explicitly verified stronger validation chain; or
2. changing the NKF repository's established one-command enforcement model to
   the consumer-only command and relocating producer checks.

Neither direction is a mechanical installation detail. The first changes a
released integration contract; the second changes the repository's confirmed
enforcement topology. NKF-022 therefore stops before either change rather
than weakening policy, editing released bytes, or claiming conformance as
successful self-adoption.

## Non-Claims

This Evidence does not establish adoption, change accepted NKF meaning,
authorize another version, confirm a successor Realization, migrate an
external consumer, establish acceptance binding or Governing Use readiness,
or establish protected merge enforcement.
