# NKF Adoption Protocol

NKF Version: 0.81

This is the governed procedure by which a repository adopts the current
recommended NKF release. It is derived process, not format meaning; the
accepted NKF 0.81 Specification remains the authority when any derived
instruction conflicts. It is part of the complete versioned set it serves.

Adoption is separate from release. A release obligates no repository. Each
repository remains authoritative for its own meaning and compatibility
approvals.

## Obtaining The Adopter

Before the first command, obtain the adopter itself. It is published in the
public documentation projection at `tools/nourd-nkf-adopt.mjs`, beside a
`reference/publication.json` manifest that records the projection's exact
file digests and the recommended adopter digest. Download both from the public
documentation repository at its published commit, compute the adopter's
SHA-256, and confirm it equals the manifest's adopter digest and the
`adopter_sha256` the recommendation catalog states. Run an adopter only after
those digests agree. No command-line tool, session, or credential is required
for this step or for any step below; a consumer needs Node.js and network
access, or the offline inputs.

## One Public Operation

The public operation is **Adopt**, invoked without a subcommand:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

The adopter resolves `release/recommended.json` over plain HTTPS from the
governed NKF repository's default branch, validates it against the accepted
`nkf.recommended-release` contract and its closed channel vocabulary, and
exposes the exact target version, archive SHA-256, source commit, checker
digest, adopter digest, channel, and applicable compatibility signal. It then
downloads the archive from the catalog's canonical release-asset locator over
plain HTTPS and refuses it before any project mutation unless its SHA-256
equals the catalog's archive digest. The mutable reviewed recommendation is
only a selection channel. The verified full archive digest and the installed
consumer pin are the immutable trust anchors.

For an approved offline release, supply both the exact reviewed recommendation
and its archive:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --recommendation <recommended.json> \
  --archive <content-addressed-release.tar>
```

## State Resolution And The Support Window

Live support covers the current version plus one predecessor: NKF 0.81 and
NKF 0.8. Adopt observes the repository and selects one internal path:

| Repository state | Required input | Result |
| --- | --- | --- |
| Supported unadopted Empty or Tiny Knowledge repository | Reviewed sealed onboarding plan and completed whole-root review | `onboarded` |
| Adopted NKF 0.8 repository | The completed delta review of the computed required set | `updated` |
| NKF 0.81 repository without the recommended release or integration | None beyond release access | `updated` |
| NKF 0.81 repository already on the exact recommendation | None | `current` |
| Repository declaring a version below NKF 0.8 | Out of window | Fails closed naming the exact stepping-stone release archive |

An out-of-window repository migrates through immutable published archives as
stepping stones, each hop using that archive's own bundled adopter with an
explicit archive and digest: a repository one step below the window steps
through the published NKF 0.8 archive, and older
repositories step through their next published archive in turn. The refusal
names the exact next stepping-stone release; nothing migrates silently.

Internal capture, seal, installation, refresh, and upgrade mechanics are not
public choices. The public outcome remains Adopt.

## Initial Adoption

Initial semantic assessment remains agent-led under the
[Pre-Adoption Onboarding Protocol](../onboarding/nkf-onboarding-protocol.md).
After complete review and candidate sealing, pass the sealed plan and a
writable review path; Adopt writes the exact whole-root review template,
stops, and completes onboarding only after a named reviewer completes it:

```text
node nourd-nkf-adopt.mjs --project <project-root> \
  --plan <sealed-plan.yaml> --review <review.yaml>
```

An unadopted repository without a sealed plan fails before mutation. Mature or
uncertain unadopted repositories remain unsupported under deferred NKF-014.
Later category support must extend Adopt rather than add a public command.

## Which Adopter Performs The Upgrade

Run the adopter bundled with the release being adopted, not the one already
installed. An installed adopter validates the governed recommendation against
the compatibility set frozen into it at its own publication, so an adopter
published before this version refuses this version's recommendation rather than
upgrading through it. That refusal is correct — a frozen adopter cannot vouch
for a set it never saw — but it is not self-explanatory, so the remedy is
stated here: acquire this version's archive, verify its digest, and invoke the
adopter inside it.

The same applies at every hop of a stepping-stone chain, where each hop already
uses that archive's own bundled adopter.

## Non-Breaking 0.8-To-0.81 Upgrade

The recommendation declares compatibility from each in-window predecessor
with a consistent `migration_required` value and summary. Updating an exact
conformant NKF 0.8 repository to NKF 0.81 is `non-breaking` and requires no
repository-owner approval: no stable path moves, no identity succeeds, no
declaration changes shape, and canonical Markdown bytes are preserved. The
upgrade still never invents review. The first Adopt invocation writes the
exact upgrade review template — carried judgments prefilled by digest
identity under the accepted 0.8-to-0.81 version-delta declaration and the
evaluation policy's declared judgment dependencies, the computed required
fresh set left to a named reviewer — and stops. Rerun with the completed
review:

```text
node nourd-nkf-adopt.mjs --project <project-root> --review <review.yaml>
```

The upgrade performs, in one rollback-capable transaction: the mechanical
contract rebind to the 0.81 set, conversion of the reviewed baseline to the
digest-bound 0.81 contract with computed per-judgment carry-forward, and the
integration refresh. A delta claim is admitted only when the performed set
contains the computed closure; whole-root review remains the recovery path.
The checker recomputes that closure with the evaluation policy's impact
propagation and refuses a claim whose recorded closure differs from it.
The semantic reviewer's act does not accept canonical Product or Technology
meaning.

Under NKF 0.81 the deterministic Task conclusion also seals its own
successor baseline through the mechanically-concluded claim, so a concluded
repository never lands one step stale; a conclusion whose graph delta
exceeds the closed transition vocabulary fails before mutation with the
ordinary review-and-seal path as recovery.

## Producer Promotion

The NKF producer's candidate-bound promotion is a separate, producer-only
path with two authorized stages and its own accepted serialized input and
accepting Decision, its stage reviews performed as delta reviews with
whole-root review as the recovery path. No ordinary consumer update can
invoke it; a non-producer repository supplying promotion inputs fails before
mutation.

## Transaction And Verification

Every mutating route:

1. verifies the recommendation and content-addressed archive;
2. validates the predecessor with its own pinned adopter and checker where
   applicable;
3. stages the complete target outside live paths;
4. runs the target full-bundle checker on the staged candidate;
5. applies one rollback-capable transaction;
6. verifies the installed pin, integration, archive, bundle, and readiness;
   and
7. reports `onboarded`, `updated`, or `current` with the exact target and
   compatibility context.

After success, independently audit the pin, receipt where applicable, archive
digest, upgraded contract set, representative documents, and a fresh checker
run. Record findings in the owning Task and conclude through the repository's
human review.

## Boundaries

- A repository that cannot satisfy the target contract remains on its prior
  version; it never misdeclares a mixed state.
- Adopt does not rewrite accepted immutable meaning by implication. Consumer
  authority owns every semantic upgrade decision.
- A successful result proves the observed operational application and
  conformance only. It does not accept knowledge, confirm a Realization,
  publish a release, or prove remote enforcement.
