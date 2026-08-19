---
title: NKF 0.8 Release Notes
summary: The publication-ready migration meaning for NKF 0.8, the successor that derives every version-bearing guidance member from one version-neutral source instead of copying it forward — what is new, what breaks, how to adopt, and how to verify — authored as governed Evidence for the publisher to carry into the release body.
created_at: 2026-08-19T03:00:00Z
---

# NKF 0.8 Release Notes

## What Is New

NKF 0.8 ends a defect class rather than its latest instance. Every NKF release
so far has left a stale version label behind somewhere, and the most recent one
is inside the published, immutable NKF 0.71 archive: the onboarding skill's
description directs an agent to "prepare its NKF 0.7 candidate" while its own
marker declares 0.71. The cause was that cutting a version copied the
predecessor's guidance tree and edited the one line a check enforced.

- Every version-bearing guidance member — the authoring, onboarding, release,
  and adoption protocols, the portable skills, and the host-adapter
  instruction content — is now derived from one version-neutral authored
  source with the version injected. No emitted member is an input to producing
  another, the source may state no literal NKF version at all, and a member
  whose committed bytes differ from its derivation is invalid. A sentence
  cannot go stale in a file that is forbidden to state a version.
- A guidance file's own frontmatter `description` is a checked conformance
  position. The new rule `guidance.self-description.version-mismatch` fails a
  version literal there that contradicts the version the file serves, so the
  exact position that carried the published defect now fails closed in every
  repository declaring NKF 0.8 rather than only in the producer. The body stays
  deliberately unchecked: window tables and stepping-stone chains name earlier
  versions on purpose.
- The pre-cut whole-set guidance review is enforced. The member list is
  computed from the version's own release set through the adopter's `set`
  command, every guidance member must be named with the digest reviewed, and
  the independent audit verifies that coverage instead of the superseded
  rule-diff standard the release protocol still named.
- The 0.71-to-0.8 version delta declares two hundred fifteen identical rules
  and exactly one new rule, which belongs to no declared judgment-dependency
  list, so every existing review judgment carries by digest identity and the
  upgrade is provable on the delta claim alone.

The mechanism proved itself during its own cut: the whole-set review found a
stale `0.71` in the emitted 0.8 adoption protocol, traced it to a bare literal
the generator's neutrality guard did not match, and both the sentence and the
guard were corrected before the archive was built.

## What Breaks

Nothing breaks for an adopted NKF 0.71 repository: the upgrade is
non-breaking, moves no stable path, succeeds no identity, and changes no
declaration shape.

Two things change for adopters. The live support window slides to exactly
NKF 0.8 plus NKF 0.71, so a repository declaring NKF 0.7 leaves the live
window and steps through the immutable published NKF 0.71 archive
(`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`), with
older repositories stepping through their published archives in turn. And the
accepted integration advances to revision four, adding the three deterministic
guidance verifiers to the accepted chain; Adopt installs the new chain as part
of the ordinary update.

A repository whose installed guidance carries a version literal in its
frontmatter `description` that disagrees with its declared version will now
fail conformance where it previously passed. That is the intended effect of the
new rule, and correcting it means reinstalling the guidance through Adopt
rather than editing the file.

## How To Adopt

Run the one public Adopt operation with the adopter **bundled in the NKF 0.8
archive**, not the adopter already installed in the repository:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

This matters and has never been written down. An installed adopter validates
the governed recommendation against the compatibility set frozen into it when
it was published, so the NKF 0.71 adopter refuses the NKF 0.8 recommendation —
it fails closed with an invalid-or-ambiguous compatibility message rather than
upgrading. The refusal is correct and the message names no remedy, so: acquire
the NKF 0.8 archive, verify its digest, and invoke the adopter inside it. The
same rule already applies at every stepping-stone hop.

An adopted NKF 0.71 repository receives the non-breaking upgrade: the first
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
complete gate validates the installed contract set, the digest-bound baseline,
and readiness; a successful run establishes conformance for the observed
snapshot only.
