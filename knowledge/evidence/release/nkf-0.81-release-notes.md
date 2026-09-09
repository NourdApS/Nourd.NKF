---
title: NKF 0.81 Release Notes
summary: The publication-ready migration meaning for NKF 0.81, the first successor released from the public repository — the recommended-release catalog as an accepted contract with public channel values, adoption over plain HTTPS with no Github CLI, the adopter-obtaining step, the closed volatile-metadata registry, and the checker's recompute of the delta-review closure; what is new, what breaks, how to adopt, and how to verify.
created_at: 2026-09-08T21:30:00Z
---

# NKF 0.81 Release Notes

## What Is New

NKF 0.81 is the first version released after the `NourdApS/Nourd.NKF`
repository became public on `2026-09-08`. The released NKF 0.8 and 0.71
adopters validate the recommendation catalog against private-channel literals
frozen in their own code, fetch through the Github CLI, and ship a public
projection that calls the release private. NKF 0.81 moves every one of those
assumptions out of code and into the accepted contract, where the next change
is a reviewed revision rather than a silent edit.

- The recommended-release catalog is the accepted contract
  `nkf.recommended-release` with its own JSON Schema. Its channel vocabulary is
  closed and owned by the Specification: `internal-exact-candidate`,
  `public-github-prerelease`, `public-github-release`, and the historical
  `internal-private-github-prerelease` that a catalog through NKF 0.8 may state
  and a 0.81 catalog may not. The two public values carry release visibility
  `public`. NKF 0.81 publishes as a prerelease.
- The adopter resolves the catalog from the raw default-branch URL of the
  public repository and the archive from the canonical release asset URL the
  catalog carries, over plain HTTPS with Node's own fetch. It refuses any
  digest or canonical-URL mismatch before it touches the repository. No
  Github CLI is invoked and there is no fallback; a consumer needs Node.js and
  network access, nothing else. Supplying an explicit recommendation and
  archive offline still bypasses the network.
- The adoption protocol now begins by saying where the adopter comes from:
  `tools/nourd-nkf-adopt.mjs` in the public documentation repository, verified
  against the publication manifest and the recommended adopter digest. That
  step was never written down before.
- The Specification defines a closed registry of exactly three volatile
  operating-system basenames — `.DS_Store`, `Thumbs.db`, `desktop.ini` — that
  onboarding inspection records with a `volatile` classification and excludes
  from the sealed drift digest, at any depth, for regular files only. Nothing
  else changes: no globs, no project-declared additions, no content
  inspection, no deletion, and every other entry keeps its fail-closed
  protection. A macOS Finder visit between sealing and applying no longer
  invalidates the plan.
- The checker recomputes the delta-review closure with the evaluation
  policy's impact propagation and refuses a claim whose recorded closure
  differs, through the one new rule
  `freshness.claim.computed-closure-not-reproduced`. The seal computes the same
  propagated closure. Before this, the seal closed over the directly changed
  inputs alone and the checker trusted what the seal recorded, which is how
  records depending on changed inputs escaped re-review for eight versions in
  the producer's own tree.
- The 0.8-to-0.81 version delta declares two hundred sixteen identical rules
  and exactly one new rule, in no judgment-dependency list, so every existing
  review judgment carries by digest identity and the upgrade is provable on the
  delta claim alone.

## What Breaks

Nothing breaks for an adopted NKF 0.8 repository: the upgrade is non-breaking,
moves no stable path, succeeds no identity, and changes no declaration shape.

Three things change for adopters. The live support window slides to exactly
NKF 0.81 plus NKF 0.8, so a repository declaring NKF 0.71 leaves the live
window and steps through the immutable published NKF 0.8 archive
(`2714fb486b8402a9d5e6dfbf4d10528c714f5480f10e97369dfdf45274c699d5`), with
older repositories stepping through their published archives in turn. The
accepted integration advances to revision five, and Adopt installs the new
chain as part of the ordinary update. And a repository whose sealed
delta-review baseline records a closure narrower than the one the evaluation
policy's propagation computes will now fail conformance on the new rule where
it previously passed; that is the intended effect, and the remedy is to
complete the delta review the 0.81 adopter writes, which seals the propagated
closure, rather than to edit the baseline.

## How To Adopt

Run the one public Adopt operation with the adopter **bundled in the NKF 0.81
archive**, not the adopter already installed in the repository:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

An installed adopter validates the governed recommendation against the
compatibility set and channel literals frozen into it when it was published, so
the NKF 0.8 adopter refuses the NKF 0.81 catalog — its frozen compatibility set
rejects the 0.81 entries before its private-channel literal is even reached —
and fails closed rather than upgrading. The refusal is correct. Obtain the
NKF 0.81 archive from the public release named by the catalog, verify its
digest, and invoke the adopter inside it; from NKF 0.81 onward the adopter
fetches both catalog and archive itself.

An adopted NKF 0.8 repository receives the non-breaking upgrade: the first
invocation writes the exact delta review template — carried judgments
prefilled by digest identity under the accepted version delta, the computed
required fresh set left to a named reviewer — and stops; rerunning with the
completed review performs the mechanical contract rebind and the digest-bound
baseline conversion in one rollback-capable transaction and reports `updated`.
No repository-owner approval is required. A repeat Adopt reports `current`.
Out-of-window repositories fail closed naming their exact stepping-stone
archive.

## How To Verify

Verify the archive digest independently before trusting any content, then
validate the installed repository:

```text
shasum -a 256 <downloaded-archive>.tar
npm run nkf:check
```

The archive digest must equal the content-addressed release tag exactly. The
complete gate validates the installed contract set, the digest-bound baseline
with its recomputed closure, and readiness; a successful run establishes
conformance for the observed snapshot only.
