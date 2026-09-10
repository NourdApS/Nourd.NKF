# NKF website

The first public website sample contains only **Start Here**: an introduction,
the problem, audience, conceptual fit, how NKF works, and its high-level mechanics. Every page includes a
diagram with a text explanation. Astro Starlight supplies search, responsive
navigation, theme selection, table of contents, and previous/next links.

This is explanatory website source, outside the immutable NKF release set.
It does not replace `public-docs/` or the released normative reference.
The owning Task is
[NKF-039](../knowledge/tasks/items/NKF-039-publish-the-start-here-website.md).

## Develop and verify

Use Node.js **22.19 or later** (verified with 22.23.2), then from this directory:

```sh
npm ci
npm run build
npx playwright install chromium
npm test
npm run preview
```

The preview is under `/Nourd.NKF/`. Search is indexed at build time, so test
it in the built preview, not the development server. The browser suite checks
all six pages, light/dark accessibility, widths down to 320px, search-result
navigation, mobile menu, theme persistence, skip link, and internal resources.
Automated accessibility checks supplement visual review; they are not a full
accessibility certification.

## Publication

The intended public address is <https://nourdaps.github.io/Nourd.NKF/>.
`.github/workflows/nkf-website.yml` builds and tests the site for pull requests,
then publishes the built artifact on changes to `master` using GitHub Pages.
Pages must use the **GitHub Actions** build source. Deployment permissions are
limited to the deployment job. The repository's NKF validation gate is unchanged.

The initial sample may be published from the owning Task branch under the
Human Product Owner's explicit sample-publication direction. That temporary
bootstrap trigger is removed once the initial sample is verified; normal
subsequent publication follows `master`. GitHub's deployment record identifies
the exact published source. Merging remains the repository's review act.

## Nourd brand provenance

Copied from the separate Company's current brand materials, without modifying
their source:

- `brand/assets/logo/current/nourd-logo.svg`, selected by the promotion
  manifest release `20260725t102155z-e6c99a9a`. SHA-256:
  `d386f258f00851066a660f798a9cc1cec24609fdbe6d4cdb62d233512b5b3319`.
  The SVG's embedded candidate metadata is historical; the current promotion
  manifest and accepted website design foundation select these exact bytes.
- `brand/assets/fonts/original/legacy-library/philosopher-latin-400-normal.woff2`.
  SHA-256: `aa134eeaa3e21f618aadf4347ca88893f72aef19cd9ecde6cfe449f3d0b5fa25`.
  Philosopher is the accepted Company display face. Its complete SIL Open Font
  License and copyright notice accompany the font in
  [Philosopher-OFL.txt](public/brand/Philosopher-OFL.txt), sourced from
  [Google Fonts](https://github.com/google/fonts/blob/main/ofl/philosopher/OFL.txt).

The sample follows the corporate website's observed navy `#0B1D30`, cream
`#F4EFE8`, and orange `#FF8A3D`. The global Company palette and full typography
role system remain open; these are this sample's application choices, not new
accepted Company standards. A system sans face serves body copy and controls.
Orange buttons use dark text; light-theme text links use an accessible darker
orange. Reduced-motion preferences are respected.

The Nourd name and logo remain Nourd brand assets; the repository's Apache
license does not grant trademark rights. Philosopher remains under SIL OFL.
Astro and Starlight are MIT licensed; exact dependency versions and integrity
are recorded in `package-lock.json` with their package license metadata.
