# MetricCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page 11 METRIC CARD, formerly page 10 MÉTRICAS) > component doc > implemented CSS
- CSS block: `.ds-metric` (styles.css — PDF-context block)
- Export: packages/ui/src/components/MetricCard.tsx
- PDF reference: METRIC CARD, p.11 (page index 10) — confirmed 2026-08-05 via `page.get_text()`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Corrected 2026-08-05 using exact PDF vector path (`page.get_drawings()`) and text-span
(`page.get_text("dict")`) extraction via PyMuPDF, not a screenshot estimate. User reported three
issues, all confirmed as real, evidenced mismatches: (1) card widths varying in Storybook, (2)
`appearance="ficha"` nearly invisible next to `"reporting"`, (3) missing edit/delete utility
buttons that the PDF's own reporting examples show.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css | — |
| width (reporting) | 113 | px | styles.css | **changed 2026-08-05** — PDF vector path: all 4 "reporting" example cards share an identical 225.3×181.7pt @2× bbox → ÷2 = 113×91px. Was no explicit width at all (only `min-height: 66px`) — inside a CSS grid, that let each card's own min-content (driven by label length) force its own track wider than its siblings ("los tamaños de ancho varían" per user report); same pattern family as `.ds-task`/`.ds-investigation-card`/`.ds-module-card`, just surfacing via grid-track auto-sizing instead of `fit-content` directly. |
| height (reporting) | auto | — | styles.css | **added then reverted same day (2026-08-05, third round).** Briefly fixed to 91px from the same vector bbox; that overflowed once a two-word label like "Riesgo operativo" wrapped to 2 lines — `change` was pushed outside the card entirely (user: "Tones tiene un label que quedó fuera del recuadro"). Reverted to `auto`, same reasoning as ficha's height below — a fixed height derived from a raw bbox doesn't account for how many lines the *actual* label content needs, and multi-word labels are exactly the case the PDF's own short single-word examples ("POLICIAS", "RECURSOS") never exercised. |
| grid-template-columns | `minmax(0, 1fr)` | — | styles.css (added 2026-08-05, third round) | **Real browser quirk, not a PDF fidelity item:** `.ds-metric` is `display: grid` with no explicit columns (implicit single auto column). Overriding just `padding-right` (via `.ds-metric--with-utilities`, see below) did not shrink that implicit column's computed width at all — measured `gridTemplateColumns` stayed ~105px regardless of a 32px right padding, so a long label still ran under the utility icons. Making the single column explicit (`minmax(0, 1fr)`) fixed it — confirmed via `getComputedStyle().gridTemplateColumns` before/after (105.042px → 74.667px, matching the padded content width). Left on the base class since it's harmless with or without utilities. |
| width (ficha) | 83 | px | styles.css | **changed 2026-08-05** — PDF vector path: all 3 "En ficha" example tiles share an identical 165.8×109.6pt @2× bbox → ÷2 = 83×55px (width taken; see height note below). Was `width: fit-content` (added 2026-07-28 with no vector measurement backing it — see anti-examples §7 note, now superseded). |
| height (ficha) | auto | — | styles.css | **added then reverted same day (2026-08-05).** Briefly set to a fixed 55px from the same vector bbox; that overflowed once combined with the already-correct label/value/change font-sizes, padding, and gap — content needed ~55px just for the three text rows, before padding — and visibly clipped/overlapped ("se ve roto" per user report). Reverted to `auto` rather than hand-tuning gap/line-height to force-fit a number whose derivation (a raw bbox ÷2, not a measured content-box) wasn't reliable enough to defend over a working auto height. Width is unaffected — it was the dimension the user actually reported as inconsistent, and fixing only it doesn't carry the same overflow risk (text wraps instead of clipping vertically). |
| padding | 5 | px | styles.css | display = 10÷2 — matches the PDF legend directly, unaffected by today's correction |
| gap | 5.5 | px | styles.css | display = 11÷2 |
| utilities gap | 4 | px | styles.css (added 2026-08-05) | mirrors `.ds-investigation-card__utilities`, no independent PDF measurement — reused an existing, already-fidelity-checked pattern rather than re-deriving one |
| utility button | 10×10 | px | styles.css (added 2026-08-05) | mirrors `.ds-investigation-card__utility` (which is itself the real SVG assets' 20×20 artboard ÷2) — same icons (`Editar-20x20.svg`, `Eliminar-20x20.svg`), not redrawn |
| `.ds-metric--with-utilities` padding | `5px 32px 5px 5px` | px | styles.css (added 2026-08-05, third round) | reserves horizontal room so the label can't run under the absolutely-positioned utility icons ("HECTOPASCALES se superpone con los botoncitos" per user report) — same technique as `.ds-investigation-card--with-utilities`. Written as the full shorthand rather than just `padding-right` because the grid quirk above meant the longhand alone had no visible effect until `grid-template-columns` was also made explicit. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background (reporting) | rgb(6 6 6 / 0.2) via --ds-color-pdf-surface-a20 | --ds-color-pdf-surface-a20 | styles.css | token unchanged, but see the third-round Deltas note below — this fill is mathematically invisible against a `--ds-color-pdf-surface` (#060606) backdrop specifically, which is exactly what the Storybook decorator used until this same round. |
| background (ficha) | transparent | — | styles.css | PDF p.11 «Cuando está en ficha: sin fondo» |
| border | #e6e6e6 via --ds-color-pdf-line-light | --ds-color-pdf-line-light | styles.css | doc matches |
| label | #8a8b87 via --ds-color-pdf-ink-muted | --ds-color-pdf-ink-muted | styles.css | doc matches |
| value (neutral) | #ffffff via --ds-color-white | --ds-color-white | styles.css | doc matches |
| value (critical) | #ff0404 via --ds-color-pdf-critical | --ds-color-pdf-critical | styles.css | doc: «#ff0404 (PDF MÉTRICAS)»; applies in both appearances |
| change | #ffffff via --ds-color-white | --ds-color-white | styles.css | doc matches |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label (reporting) | var(--ds-font-mono) | 8px | 700 | 0.41em | 1.25 | uppercase | **changed 2026-08-05** — was 6px, a residual delta already flagged in this spec's own Deltas section before today. PDF legend: "Título: Source Code Bold - 16pt" → ÷2 = 8px, confirmed. |
| label (ficha) | var(--ds-font-body) | inherits 8px | 200 (extralight) | 0 (`--ds-tracking-none`) | inherits | uppercase | size inherits the corrected 8px above (PDF legend gives the ficha title the same 16pt @2×); letter-spacing **changed 2026-08-05** — was inheriting the base's `--ds-tracking-metric` (0.41em, "Inteletrado 410"), which the PDF legend states only for reporting's Source Code title, not ficha's Montserrat one. At 0.41em×8px a label like "HECTOPASCALES" needed far more than the 83px ficha tile could hold and visibly clipped — this, not the height, was the main driver of "se ve roto". |
| value (reporting) | var(--ds-font-body) | 42px | 700 | 0 | 0.95 | none | styles.css — display = 84÷2 |
| value (ficha) | var(--ds-font-body) | 26px | 700 | inherits | inherits | none | styles.css — display = 52÷2 |
| change | var(--ds-font-body) | 8px | 200 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 5px | 5.5px | — | styles.css (display scale) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-metric--critical | value color #ff0404 | styles.css | yes |
| .ds-metric--ficha | transparent bg; label Montserrat Extra Light; value 26px; fixed `width: 83px`/`height: 55px` (changed 2026-08-05, see Dimensions — was `width: fit-content` from 2026-07-28) | styles.css | yes |
| .ds-metric--neutral | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--good | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--watch | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric__topline | structural wrapper | knowledge/components/MetricCard.md | no |
| .ds-metric__utilities / .ds-metric__utility | edit/delete buttons, top-right (added 2026-08-05) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **RESOLVED 2026-08-05:** label size delta (was 6px, flagged as "residual delta" in this spec
  before today) — now 8px, confirmed against the PDF legend's literal "16pt" for both
  reporting and ficha titles.
- Doc cites interlettering PDF 410 → CSS `letter-spacing: 0.41em` via `--ds-tracking-metric` — recorded as matching intent; unit conversion not independently PDF-verified here.
- Ficha value `font-size: 26px` is an untokenized literal (`/* TODO token */`) — design-reference p.11 «En ficha: Número Montserrat Bold 52pt» @2× → display 26px. Confirmed correct 2026-08-05, not changed.
- `#ff0404` via `--ds-color-pdf-critical` vs semantic `--ds-color-danger: #ff3d48` — duplication candidate, unresolved.
- **Added 2026-08-05: `utilities` prop (edit/delete).** PDF vector path shows small pencil/trash
  icon paths (~13–17pt @2× each) inside the top-right corner of all 4 "reporting" example cards;
  no such icons appear inside the 3 "En ficha" tile outlines. Modeled as `MetricUtility[]`,
  structurally identical to `InvestigationCard`'s existing `utilities` prop (same
  `Editar-20x20.svg`/`Eliminar-20x20.svg` assets, same `UTILITY_ORDER`/`UTILITY_METADATA` pattern,
  same `.ds-investigation-card__utility` sizing reused as `.ds-metric__utility`), gated to
  `appearance === "reporting"` only per that PDF evidence. The exact icon pt measurements from
  this page were not used directly to size the buttons (10×10px, from InvestigationCard's own
  20×20 SVG artboard ÷2) — reusing an already-verified real asset size over re-deriving one from a
  noisy vector read follows the lesson recorded in `knowledge/fidelity-pass/next-steps.md` after
  the ModuleCard icon-size mistake earlier this same session.
- **Storybook missing-dark-decorator bug, confirmed here too (4th+ occurrence).**
  `MetricCard.stories.tsx`'s meta-level decorator had no background; `.ds-metric`'s 20%-opacity
  black washed out light gray on Storybook's default canvas, which also made the utility icons'
  `#c1c1c1` stroke blend into the card and disappear. Fixed the same way as `Empty`/`ChartCard`.
  Separately, the `Scales` ("Reporting vs Ficha") story's "En ficha" example had no container at
  all — `appearance="ficha"` has no background of its own by design ("sin fondo, respeta el fondo
  de la ficha que lo contiene"), so demoing it with nothing behind it made it read as "casi no se
  ve" per the user's report, even once the general canvas fix was in place. Added a dedicated dark
  panel wrapper (`--ds-color-pdf-surface-warm`) around just that example, matching the PDF's own
  illustration (which also shows the ficha tiles sitting inside a warm dark container, not bare).
- **Second-round user review (2026-08-05, same day) caught two more real bugs the first pass
  introduced/missed:** the `Scales` story's "Reporting" example never had `utilities` added (only
  `Tones` did), so it looked inconsistent with every other reporting example once utilities
  shipped — added there too. And the ficha fixed-height + inherited letter-spacing combination
  described above actually clipped content ("se ve roto") rather than just looking small — both
  fixed in the same follow-up (height reverted to `auto`, letter-spacing set to
  `--ds-tracking-none` for the ficha label specifically). Confirms the value of having the user
  look at Storybook herself before a fix ships — my own build+screenshot check the first time
  didn't catch either issue.
- **Third-round user review (2026-08-05, same day), three more findings, all real:**
  1. Reporting's own fixed height (91px, added in round one) had the identical overflow problem as
     ficha's did — a two-word label wrapping to 2 lines pushed `change` outside the card. Reverted
     to `auto`, same fix as ficha's height above, for the same reason (a bbox-derived height
     doesn't know how many lines the actual label content will need).
  2. **The card's own 20%-opacity fill was invisible because the Storybook decorator's backdrop
     was the exact same color the fill is built from.** `.ds-metric`'s bg is
     `rgb(6 6 6 / 0.2)` — literally `--ds-color-pdf-surface` (#060606) at 20% alpha. Compositing
     that over a `--ds-color-pdf-surface` backdrop mathematically resolves back to
     `--ds-color-pdf-surface` exactly (0.2×6 + 0.8×6 = 6) — the card was rendering, just
     indistinguishable from "no background," which the user correctly read as "tienen un recuadro
     blanco" (looks like an empty bordered box) rather than a rendering bug in the fill itself.
     Changed the decorator to `--ds-color-pdf-surface-warm` (#2a2927) — still dark (consistent with
     "pantalla de reporting" being a dark screen) but distinct enough from the fill's own base
     color that the 20%-opacity darkening is now visible as an actual box.
  3. **A real CSS grid bug, not a PDF-fidelity issue:** `.ds-metric--with-utilities`'s
     `padding-right: 32px` (added in round two, meant to reserve room for the utility icons) had
     no effect on layout at all — `getComputedStyle` confirmed the property WAS `32px`, but
     `.ds-metric`'s implicit single grid column (no `grid-template-columns` was ever set) still
     computed its own width as if that padding were `0`. A long single-word label
     ("HECTOPASCALES", no space to wrap at) ran straight through the reserved padding and under
     the edit/delete icons. Fixed two ways together: made the single column explicit
     (`grid-template-columns: minmax(0, 1fr)` on the base class — confirmed via
     `getComputedStyle().gridTemplateColumns` that this is what actually made the padding-right
     take effect, 105.042px → 74.667px), and added `overflow-wrap: break-word` to
     `.ds-metric__label` so a long single-word label wraps instead of overflowing even when there's
     no more padding to give it (belt-and-suspenders, since the root cause was the grid column, not
     the wrapping behavior itself).
- **Fourth-round request (2026-08-05, same day): fixed the `Scales` story's demo data, not any
  CSS.** It was mixing three different metrics from the same PDF section — `"Hectopascales"` as
  the label (that word is actually the *reference* field for a different metric, "Humedad"),
  `"1013"` as the value (doesn't match any real value on that PDF page — 87/37/0 are the real
  ones), `"PRECIPITACIONES"` as the reference (that's actually a third metric's own title). The
  PDF's real "Reporting vs Ficha" example is one consistent metric — título "HUMEDAD", número
  grande "87%", referencia "Hectopascales" — now used on both sides of the comparison. Also
  resolves the overlap risk from a structural angle: "Humedad" is short enough to never reach the
  utility icons regardless of the CSS fixes above, so this story no longer depends on them to look
  correct.
