# NKF-023 Interim Recommendation Assessment

- Observed At: `2026-08-10T20:41:26Z`
- Evidence Authority: Exact repository history, authenticated release download,
  current release verifier, historical source commit, and current published
  adopter source
- Acceptance Effect: None
- Confirmation Effect: None

## Historical NKF 0.1 Release Verification

Repository history before the first 0.2 recommendation records the exact NKF
0.1 recommendation as archive SHA-256
`0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727`,
source commit `37c0f557e0b936b1f2e56706c936ef619aacdd9d`, checker SHA-256
`a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`,
and size `1227776` bytes.

The exact named asset was downloaded from the authenticated private GitHub
release. Independent hashing reproduced the catalog SHA-256 and size. The
current strict release verifier then verified its archive identity, manifest,
tag, release source commit, checker digest, and source provenance against a
detached checkout of `37c0f55`.

The first extracted-checker invocation failed because the raw historical Git
checkout did not contain its governed generated `dist/nourd-nkf-adopt.mjs`
artifact. Running that commit's locked `npm ci` and deterministic build
materialized the expected artifact. Repeating the exact release verification
then passed and invoked the extracted 0.1 checker successfully against the
rebuilt historical source. The initial failure is retained because raw-source
and built-source verification are materially different observations.

## Rollback Compatibility Finding

The current public Adopt executable is an immutable NKF 0.2 release member.
Its recommendation parser requires all of the following together:

- target `nkf_version` exactly `0.2`;
- state exactly `recommended`;
- predecessor compatibility entries for 0.1 and 0.2;
- 0.1 classified breaking; and
- 0.2 classified non-breaking.

The verified historical 0.1 recommendation predates that catalog shape and
targets `nkf_version` `0.1`. Replacing `release/recommended.json` with those
healthy historical bytes would therefore make the currently distributed
public Adopt command reject the governed recommendation as invalid. Restoring
the historical 0.1 adopter or widening the current 0.2 adopter would change a
frozen released-set member and is prohibited by the confirmed
release-triggered freeze direction.

No recommendation bytes were changed. The technically honest interim choices
are therefore to keep the existing 0.2 recommendation until it can be replaced
atomically by 0.3, or to pause public Adopt entirely until 0.3. Selecting
between continued temporary recommendation and deliberate public unavailability
is a Product-facing availability decision.

## Non-Claims

This Evidence does not recommend NKF 0.1 or 0.2, adopt any repository, accept
an NKF 0.3 Design or authority pair, confirm a Realization, authorize a
temporary availability state, publish or withdraw a release, establish
acceptance binding, or establish Governing Use readiness.
