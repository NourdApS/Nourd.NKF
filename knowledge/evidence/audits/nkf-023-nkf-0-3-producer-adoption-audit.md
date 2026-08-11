# NKF-023 NKF 0.3 Producer Adoption Audit

## Scope

This Evidence records the independent post-publication audit of the NKF
producer repository's ordinary public Adopt transaction. It covers the exact
published release, governed recommendation, installed pin and integration,
pristine-checkout conformance, repeat `current`, tamper rejection, and the
correction of one bootstrap defect. It does not accept NKF meaning, confirm a
Realization, establish protected-branch enforcement, or make Governing Use
ready.

## Audited Release And Producer Revisions

- NKF version: `0.3`
- release source commit: `8a06564e1c91069db19581ca5bfa22770ac95fb5`
- archive SHA-256: `34bd74631ddaf027a88ef1ee3fb50b23409fa803d08da0de246fe6f8c4ca47a4`
- checker SHA-256: `804c082c3f1c8beebc24d044f23581cdafcf2fbac40aecbfff1ae0c75fbe807d`
- adopter SHA-256: `9e20219d8b92a0b38086da48311f2d2bfd14f8676fa8256e9efcefaaa938afc5`
- first producer-adoption commit: `b93f23a4a1d5f0c4c2d05bceeef1c5bf3fb8b222`
- corrected producer-adoption commit: `6805d6bca50504f93bbf3b6f99f7dcfff858365f`
- recommendation merge on `master`: `60a0a96`

## Initial Audit Finding

The first fresh-clone audit returned `NOT CLEAN`. Commit `b93f23a4` declared
`dist/nourd-nkf-adopt.mjs` as a governed artifact, but `dist/` was ignored and
the exact file was absent from a pristine checkout. The frozen host-superset
chain invokes the pinned release check before the preserved host build, so
both canonical validation and ordinary Adopt failed `artifact.missing` before
the build could materialize the required file. The already-built task
worktree had hidden this bootstrap defect.

The audit independently rejected rebinding that artifact under `.nourd`: NKF
0.3 correctly rejects governed-artifact paths inside `.nourd`. It verified
that tracking the exact generated `dist/nourd-nkf-adopt.mjs` mirror was the
bounded producer correction. The tracked mirror is byte-identical to the
already-confirmed and frozen adopter member; it preserves the bundle binding
and the fixed pinned-first integration order.

## Corrected Independent Re-Audit

The complete fresh re-audit of exact remote commit `6805d6b...` returned
`CLEAN` with no material finding.

From a new disposable clone, before any build:

- `dist/nourd-nkf-adopt.mjs` was tracked and present at exact SHA-256
  `9e20219d...`;
- `.gitignore` and its governed-artifact digest binding matched;
- after only `npm ci`, the pinned step of `npm run nkf:check` passed before the
  preserved host step;
- the full host-superset chain passed 25 test files and 202 tests, verified 976
  links, reproduced the checker, adopter, and 63-file public projection, and
  completed self-validation with zero diagnostics;
- the host build reproduced the tracked adopter byte-for-byte and left all
  tracked Git state clean; and
- two ordinary subcommand-free Adopt runs returned `current` / `no-update`
  without tracked mutation. Only the ignored validation-result execution ID
  and timestamps changed.

The re-audit freshly downloaded the hosted asset and matched it to the
installed archive at `34bd7463...`. It independently verified all 135 archive
members, 134 manifest byte-and-mode bindings, 18 required classes, the sole
checker `0755` mode, the accepted authority pair, all four Schema digests, the
checker, adopter, release-set self-binding, and release source commit. The
`master` recommendation remained byte-identical and selected that exact 0.3
release.

The registered canonical chain, preserved producer command, protocols,
portable skills, host adapters, integration verifier, and workflow retained
their exact bindings. Pin, script-chain, tracked-adopter, `.gitignore`, and
governed-Markdown tampering failed closed. Breaking-migration diagnostics and
public guides consistently required `repository-owner` approval.

## Version And Authority Assessment

The correction changes producer repository state only: `.gitignore`, its
producer bundle digest, the tracked exact adopter mirror, and the Task audit
account. It does not change the archive, release manifest, recommendation,
release tag, accepted authority, Schema, checker, adopter byte, or any other
published 0.3 member. The publication-triggered freeze therefore remains
intact and this correction does not allocate a new NKF version.

The state boundaries at the clean audit checkpoint are:

- accepted NKF 0.3 meaning: [ADR 0110](../../decisions/0110-accept-the-nkf-0-3-authority-pair.md);
- exact release-candidate technical confirmation: [ADR 0111](../../decisions/0111-confirm-the-nkf-0-3-release-candidate.md);
- publication and recommendation: observed and established;
- producer adoption and pristine-checkout conformance: independently verified
  on the unmerged Task branch;
- remote protected-merge enforcement: not established for the audited head;
  and
- Governing Use: `not-ready` because acceptance-binding verification remains
  outside native structural conformance.

## Audit Limits

Github remained authoritative for live remote state. The reviewer found no
current pull request or Actions run for corrected head `6805d6b...`, and the
private-plan HTTP `403` limitation still prevented independent branch-
protection inspection. The audit changed no live repository file, Git ref,
release, recommendation, or producer state.
