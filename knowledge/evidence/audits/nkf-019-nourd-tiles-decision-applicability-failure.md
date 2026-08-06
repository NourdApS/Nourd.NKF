# NKF-019 Nourd Tiles Decision Applicability Failure

## Scope And Method

This Evidence records a read-only inspection of four Nourd Tiles Task
records that together exhibit the failure class motivating `NKF-019`: a
conditional technology decision losing its conditions in successor Tasks, and
lower-level validation evidence being represented as higher-level outcome
success. It does not evaluate, accept, or change Nourd Tiles meaning, does not
judge Nourd Tiles conformance, and does not authorize any Nourd Tiles or
Wonderer change.

The inspection was performed on `2026-08-06`, completing at
`2026-08-06T21:26:43Z`, against the Human Product Owner's local Nourd Tiles
working copy at Git HEAD `0b40a8cca1480718d80af7a1e47305e8dad31aac` with a
dirty working tree. The digests below bind the exact observed working-tree
bytes, not a committed revision.

## Bound Inputs

| Input | SHA-256 |
| --- | --- |
| `knowledge/tasks/completed/tiles-007-develop-first-wonderer-cartographic-style-candidate.md` | `48d71fb34bfd39ee9bbf01bedf8cf8e1630bee890aced73fef512da2976cbe3e` |
| `knowledge/tasks/completed/tiles-008-define-first-wonderer-hybrid-map-boundary.md` | `76933a5ce5c15e9e342e6811281b5763a86d5abd75879d315ca586ed0f801d79` |
| `knowledge/tasks/completed/tiles-009-build-first-complete-local-map-experience.md` | `01fa444de62fd710446ba6ac328e33da685b3f537c3af6ace07699617e0166cb` |
| `knowledge/tasks/active/tiles-012-verify-hostable-package-in-sample-android-app.md` | `a191258d620885c630362f003b2b1019a6e04068938fc3b88c87b4d4620a2242` |

## Observations

The following statements are drawn directly from the bound sources.

`TILES-007` records that the Wonderer Product record "already confirms the
Mapbox Maps SDK with a replaceable routing boundary" as the Android pilot
baseline, and carries that inherited baseline as a constraint on local style
work.

`TILES-008` records that the Human Product Owner "explicitly rejected
deferring custom LiDAR terrain", making custom LiDAR-derived true 3D terrain
a mandatory first-iteration requirement. It records the negative finding that
"the documented Android raster-DEM path states that Mapbox Terrain DEM is the
only supported raster DEM source", concluding Mapbox "cannot be treated as a
supported renderer for Nourd-owned LiDAR terrain". It records that MapLibre
Native "marks native Android true 3D terrain as unavailable" and that
"MapLibre GL JS terrain support does not resolve the native Wonderer
requirement". It selects ArcGIS Maps SDK for Kotlin conditionally: the choice
"remains provisional until the local experience proof passes".

`TILES-009` records a completed emulator proof built on ArcGIS Maps SDK for
Kotlin, and separately records that Human Product review remained outstanding.

`TILES-012` records a sample Android harness that consumes the verified
package archives and "renders" through MapLibre GL JS with the elevation
archive "as a Mapbox Terrain-RGB source". Its verification report declared
`passed-local-sample-consumer`. The Task then records that the first physical
audit "proved a full-size render buffer, button callbacks, process survival,
and screenshot capture, but it recorded only that a synthetic pan gesture was
sent. It did not prove that the camera moved. It also treated a pitched
raster view as evidence of terrain without proving that the local elevation
product created non-flat relief." The Human Product Owner rejected the
apparent result "after observing that the map could not be navigated and that
no meaningful three-dimensional terrain was visible in any presentation
mode", and the prior closure conclusion was withdrawn.

## Findings

1. An accepted conditional decision existed: a mature renderer was selected
   conditional on a proved custom-terrain path, with recorded negative
   findings against Mapbox raster-DEM support and against MapLibre native
   Android true 3D terrain.
2. A successor harness changed the effective renderer to MapLibre GL JS
   without a recorded re-extraction of the applicable decisions, their
   conditions, or the recorded negative findings.
3. Validation levels were mixed: data validity (archive digests), adapter
   compatibility (archives readable by the renderer), runtime behaviour
   (navigation, rendered relief), and human experience review were folded
   into one automated `passed-local-sample-consumer` claim.
4. Proxy evidence — valid elevation bytes, button callbacks, differing
   screenshots, and a sent synthetic gesture — was represented as proof that
   navigation worked and terrain rendered, before either outcome had been
   directly observed.
5. Direct human inspection contradicted the automated claim: navigation
   failed and the renderer received no effective elevation.

## Interpretation

No NKF 0.1 contract required the successor Tasks to extract applicable
accepted decisions with their conditions, to classify the mandatory
custom-terrain capability as proven, unsupported, or unknown for the changed
renderer, or to state the validation level actually reached. The failure
therefore passed every deterministic NKF check available to the consumer.
This supports classifying `NKF-019` as an NKF Specification and contract gap
rather than only a consumer authoring failure, while the consumer-side
misrepresentation of proxy evidence remains a real authoring failure that a
format can expose but not fully prevent.

## Limitations

- The observed working tree was uncommitted; the bound digests identify the
  observed bytes only.
- The inspection covered the four named Tasks, not the complete Nourd Tiles
  or Wonderer knowledge, and records no judgement of either repository's
  overall state.
- Statements about what the harness proved are taken from the Nourd Tiles
  records themselves; the harness code and its reports were not independently
  re-executed.

## Relevance

This Evidence grounds the `NKF-019` Problem statement, Finding
Classification, and the Decision Applicability Gate Design. It supplies the
concrete failure chain that the gate's extraction, capability-finding,
verification-level, and direct-outcome rules must make structurally visible.
