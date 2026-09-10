---
title: "NKF-039: Publish The Start Here Website"
summary: Deliver the first Nourd-branded NKF website sample on GitHub Pages, limited to Start Here, with working reading and navigation controls.
created_at: 2026-09-10T00:00:00Z
---

# NKF-039: Publish The Start Here Website

## Human Direction

The Human Product Owner directed: "the website theme and design should follow
the Nourd branding metrials", "let's go for now with hosting it in github
itself", and "i agree with following a sample design and see how it work".
The first iteration must have "the design ready, the controls ready, up and
running in github" and only Start Here, explaining the problem NKF solves,
who it helps, when it fits, and how it works.

This direction starts this bounded implementation and publication Task.
The agent may resolve implementation details, test the delivered sample, and
publish it within this scope. Sample publication does not accept a new Company
brand system, change normative NKF meaning, or confirm the whole Realization.

## Scope And Boundaries

Build a static Astro Starlight website in `website/`, with one Start Here
section and six readable pages: overview, problem, audience, fit, operation, and mechanics.
Use the current Nourd SVG and accepted Philosopher display typeface. Apply the
navy, cream, and orange treatment evidenced by the Company website as this
sample's visual treatment; the Company colour system is still a proposal.
Keep mobile navigation, search, theme selection, keyboard access, and page
navigation functional. Publish through GitHub Pages in this public repository.

The released `public-docs/` projection, the documentation repository, accepted
Specifications and Decisions, and every published archive remain unchanged.
This explanatory website points readers to current release documentation and
does not create a second normative authority. There are no empty future
sections, adoption commands, or speculative capabilities in this iteration.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0064`](../../decisions/0064-release-documentation-and-adoption.md) | record | Public prose explains NKF; the digest-bound normative mirror and separate public projection remain authoritative for their exact released scope. The earlier website deferral applied to private internal use; the present Human Product Owner direction explicitly authorizes this public website sample. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | Mandatory outcomes require direct evidence at the stated verification level. Unknown requirements block completion. Re-extract this gate if the renderer, hosting provider, or scope changes. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Published release bytes remain frozen. This website is outside the release set and changes no consumer pin or released member. |
| [`adr-0136`](../../decisions/0136-adopt-the-public-repository-direction.md) | record | The repository is public; its public documentation projection continues. Preserve protected master review and validation; website publication does not bypass the merge gate. |
| [`adr-0138`](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md) | record | Explain the public 0.81 successor truthfully; do not revive the superseded private-access prerequisite or silently change accepted scope. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Exact promoted Nourd logo and licensed Philosopher font are preserved; desktop and mobile sample styling reviewed directly | proven | human-experience | none |
| Start Here explains problem, audience, fit, and operation; every page has a diagram and was reviewed against current NKF boundaries | proven | data-validity | none |
| Desktop and mobile navigation, search, theme persistence, keyboard access, and responsive reading layout pass direct browser checks | proven | runtime-behaviour | none |
| The complete static website is publicly reachable on GitHub Pages | unknown | none | none |
| The coherent repository change passes the supported authoring gate and preserves released bytes | unknown | none | none |

## Acceptance Criteria

1. A polished, responsive Nourd-branded sample has exactly the approved content
   scope and functional controls, with no placeholder destinations.
2. Explanations distinguish human acceptance, implementation confirmation,
   validation, and operational state, and avoid unsupported onboarding claims.
3. The canonical logo bytes and self-hosted font have explicit provenance and
   redistribution notices; the sample palette is not called accepted Company policy.
4. Browser evidence covers light and dark themes, mobile navigation, search
   returning a relevant result, page navigation, focus, and absence of overflow.
5. The site is accessible anonymously at its GitHub Pages address, and committed
   source includes a reproducible build and deployment workflow.
6. `npm run nkf:check` passes; frozen release and public projection bytes remain
   unchanged. Completion records the actually verified scope and limitations.

## Execution Plan

1. Resolve the current release, accepted explanatory boundaries, and Nourd
   brand source. Create this initial active Task declaration and its Task branch;
   generate navigation using the adopter's deterministic renderer. This is new
   Task creation, not a lifecycle transition of an existing deferred Task.
2. Build the Start Here pages and a restrained branded Starlight shell with
   working built-in controls. Copy only approved public brand assets and licenses.
3. Build and review the rendered sample on desktop and mobile; exercise search,
   theme persistence, navigation, and keyboard access, and correct observed issues.
4. Publish the reviewed static sample on GitHub Pages and verify the public
   response. Add a reproducible GitHub Actions path for subsequent publication.
5. Record implementation and verification, review and seal the coherent governed
   delta, run the canonical gate, and use the deterministic Task conclusion.
   Preserve normal protected merge review; report GitHub operational state separately.

## Brand Source Review

The Company brand root is
`company/brand-and-communication/` in the separate Nourd ApS repository.
The reviewed sources are `website/design-foundation.md`,
`brand/expression/typography.md`, `brand/expression/colour-system.md`,
`brand/expression/visual-direction.md`, `brand/foundations/core.md`, and the
current logo promotion manifest. Company sources remain unmodified.

The promoted logo SVG SHA-256 is
`d386f258f00851066a660f798a9cc1cec24609fdbe6d4cdb62d233512b5b3319`.
Its embedded candidate metadata predates its explicit promotion; the current
manifest and accepted website foundation select these exact bytes.
Philosopher is the accepted display face. The observed Company website uses
navy `#0B1D30`, cream `#F4EFE8`, and orange `#FF8A3D`; global palette and
typographic roles remain open. This sample uses orange with dark text and
accessible darker links on cream. Motion stays calm and respects reduced motion.

## Visual Explanation Direction

During implementation, the Human Product Owner added: "try to use visuals and
graphs and diagrams to explain stuff . it is visually easier to grasp the
information". Each Start Here page therefore includes a diagram: an overview
connection, scattered versus connected knowledge, a participant map, a
conceptual-fit matrix, or the export example's lifecycle. Visuals supplement
readable text, keep authority distinctions explicit, and make no new format rules.

## Mechanics Page Direction

The Human Product Owner added: "i need another page explaning the mechanics
of NKF, only the high levels and in there i would like to have more diagrams
and charts". The approved section therefore includes a sixth page, The
Mechanics. It explains bundle layers, identity versus revision fingerprints,
knowledge relationships, the review baseline, and validation using three
diagrams. It is conceptual explanation, not a procedural adoption tutorial.

## Implementation Review

The six-page website and its diagrams were reviewed against the current
Specification and the authoring protocol. Each visual has a readable text
equivalent. Fingerprints in the mechanics diagram are explicitly illustrative;
the graph describes declared knowledge, and no diagram supplies acceptance or
claims to model unobserved runtime behavior. The promoted logo and font hashes
match the reviewed Company assets. The complete font license is distributed.

The initial five-page browser suite passed all five scenarios; the expanded
suite covers the six-page section. A footer link initially relied on colour
alone and was corrected to remain underlined. Mobile menu checks target visible
links because the native navigation wrapper uses display contents. The actual
menu, light theme, and phone-size diagrams were directly observed.

The first hosted install exposed an incomplete optional-dependency entry in the
locally regenerated lockfile. It was replaced through a clean network-backed
install using the hosted Node/npm generation, followed by a clean npm ci check.

The existing repository instruction-discovery verifier treats a third-party
CLAUDE.md under nested website/node_modules as an undeclared project adapter.
Canonical repository checks therefore run without those generated website
dependencies present, matching the NKF CI job; website CI installs and tests its
independent package in a separate job. No checker or enforcement rule is changed.
A sandboxed full test run reached 280 passing tests and one localhost-listen
EPERM failure; the required final run uses authorized localhost access.
