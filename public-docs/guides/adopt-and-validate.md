# Adopt And Validate

This guide applies to the exact internal NKF 0.1 release recorded in
`../reference/publication.json`. NKF 0.1 is pre-stable. The checker is private;
the documentation and adopter are public.

## Already Structured Projects Only

This guide installs the pinned NKF integration around an already complete
native NKF 0.1 bundle. For an empty or small-document greenfield repository,
begin with [Initial Onboarding](initial-onboarding.md). Do not manually create
native YAML merely to satisfy this install prerequisite.

## Before Installation

The project must already contain:

- a project-root `.nourd` directory;
- `.nourd/knowledge/bundle.yaml`;
- a project-contained `knowledge_root`;
- exactly one root record; and
- either `nkf.profile.product` or `nkf.profile.technology`.

The owning project authority must approve adoption. Installation does not
accept or migrate project knowledge by implication.

Node.js 22 or later is required. For authenticated download, install `gh` and
log in to an account authorized for the private NKF repository.

## Install From The Private Release

Read the exact `release.archive_sha256` and `adopter.sha256` values from
`../reference/publication.json`. Verify the downloaded public adopter against
the latter, then run:

```sh
node nourd-nkf-adopt.mjs install \
  --project /absolute/path/to/project \
  --github-repository kaveh6202/Nourd.NKF \
  --sha256 0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727
```

For an approved offline archive:

```sh
node nourd-nkf-adopt.mjs install \
  --project /absolute/path/to/project \
  --archive /absolute/path/to/nourd-nkf-sha256-0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727.tar \
  --sha256 0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727
```

The full digest is the trust anchor. The derived tag and asset name are only
locators.

## What Installation Adds

The adopter preflights all targets and then installs:

- the content-addressed release archive;
- `.nourd/nkf-release.json`;
- the self-contained adopter;
- the AI-neutral authoring protocol;
- byte-identical `.agents` and `.claude` skills;
- thin `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and Copilot adapters;
- an integration registry and verifier;
- `npm run nkf:check`; and
- an exact-commit Github workflow.

Existing unrelated instruction content is preserved. An incompatible command,
owned workflow path, malformed adapter marker, symbolic link, or path escape
fails closed instead of being overwritten.

## Normal Authoring

An AI or human author should:

1. begin from the knowledge map and consolidated current Realization;
2. resolve the owning Task and record the execution plan;
3. change only the affected lifecycle and authority boundaries;
4. synchronize Markdown, frontmatter, declarations, relationships, indexes,
   and applicable artifact digests;
5. keep Designs as proposals and Decisions as disposition provenance;
6. run focused checks while editing; and
7. run exactly `npm run nkf:check` before handoff.

Agent instruction discovery differs by host. The installed neutral protocol is
the one complete workflow. Thin host files and portable skills only make that
same workflow discoverable. Every candidate output receives the same
mechanical check regardless of which human, model, agent, or tool produced it.

## Local And Continuous Integration Checks

Run:

```sh
npm run nkf:check
```

The installed adopter verifies its own digest, integration files, release pin,
cached archive, and embedded release manifest before invoking the verified
checker at `full-bundle`.

The Github workflow runs the same project command against the exact candidate
commit. Workflow presence and a passing run are not branch protection. The
current NKF 0.1 adoption path does not claim a protected merge gate.

## Read The Result

`.nourd/validation-result.json` is replaced by the latest full-bundle run. It
reports:

- selected profile and contract bindings;
- checker identity and digest;
- validated snapshot digest and entry count;
- phase states;
- deterministic diagnostics; and
- conformance and governing-use results.

A pass is not an acceptance or Realization-confirmation act.
