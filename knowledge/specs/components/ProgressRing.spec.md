# ProgressRing — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-progress` (styles.css:879–953)
- Export: packages/ui/src/components/ProgressRing.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:887 | none cited |
| border-radius | 999 | px | styles.css:888 | none cited |
| inner inset | 8 | px | styles.css:900 | none cited |
| width sm | 78 | px | styles.css:905 | none cited |
| width md | 112 | px | styles.css:909 | none cited |
| width lg | 148 | px | styles.css:913 | none cited |
| radial stop | 54% / 55% | % | styles.css:885 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| default accent | var(--ds-color-blue) | --ds-color-blue | styles.css:880 | — |
| track remainder | rgb(255 255 255 / 0.09) | UNTOKENIZED — candidate | styles.css:886 | — |
| surface hole | var(--ds-color-surface) | --ds-color-surface | styles.css:885 | — |
| border | var(--ds-color-line) | --ds-color-line | styles.css:887 | — |
| ::before border | rgb(255 255 255 / 0.08) | UNTOKENIZED — candidate | styles.css:897 | — |
| label | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:946 | — |
| success/warning/danger accents | green/amber/danger tokens | matching --ds-* | styles.css:916–styles.css:925 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| value md | var(--ds-font-display) | 1.72rem | 700 | UNVERIFIED | 0.9 | none | styles.css:928–styles.css:933 |
| value sm | var(--ds-font-display) | 1.18rem | 700 | — | — | none | styles.css:937–styles.css:938 |
| value lg | var(--ds-font-display) | 2.15rem | 700 | — | — | none | styles.css:941–styles.css:942 |
| label | var(--ds-font-mono) | 0.62rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:945–styles.css:951 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| label | — | — | margin-top 4px | styles.css:950 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-progress--sm | width 78px | styles.css:904 | yes |
| .ds-progress--md | width 112px | styles.css:908 | yes |
| .ds-progress--lg | width 148px | styles.css:912 | yes |
| .ds-progress--success | accent green | styles.css:916 | yes |
| .ds-progress--warning | accent amber | styles.css:920 | yes |
| .ds-progress--danger | accent danger | styles.css:924 | yes |
| .ds-progress--neutral | applied in TSX | knowledge/components/ProgressRing.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- `ds-progress--neutral` has no dedicated CSS (knowledge/components/ProgressRing.md).
- PDF page not cited (`variant="console"` only — see `variant="pdf"` section below for the one
  that does have a citation).

---

# `variant="pdf"` — added 2026-08-06

- Status: measured
- Source-of-truth order: PDF (page 9) > component doc > implemented CSS
- CSS block: `.ds-progress-pdf*` (styles.css, right after `.ds-progress__label`)
- PDF reference: p.9 "GRAFICOS" › "Torta" (`doc[8]`, mediabox 1920×1080 confirms @2×) — **not**
  `doc[9]`/p.10's own "Torta" (`DonutChartCard`'s reference), a different page/spec entirely.
- Trigger: user pointed at a screenshot of the "GRAFICOS" p.9 page and asked to verify uncovered
  chart types; this gauge was initially proposed as a new component or a `DonutChartCard`
  extension, then corrected by the user to extend the existing `ProgressRing` instead — its
  `value`/`tone`/`label`/`size` API already matches this PDF gauge's shape exactly.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| diameter (md) | 36 | px | styles.css `--ds-size-progress-pdf-md` | `get_drawings()` outer arc bbox 71.66×71.66pt @2× ÷2 = 35.83px, rounded to 36 |
| diameter (sm) | 25 | px | styles.css `--ds-size-progress-pdf-sm` | **not independently measured** — extrapolated from md using the same sm:md ratio (0.696) as `variant="console"`'s own sm:md sizes (78:112) |
| diameter (lg) | 48 | px | styles.css `--ds-size-progress-pdf-lg` | **not independently measured** — extrapolated using the console md:lg ratio (1.321, 112:148) |
| progress-arc stroke (md) | 7.5 | px | ProgressRing.tsx `PDF_PROGRESS_STROKE.md` | PDF «Porcion completada: 15pt de grosor» @2× ÷2 — exact match to `get_drawings()`'s own stroke width (`15.0`), no delta |
| track stroke (md) | 3.5 | px | ProgressRing.tsx `PDF_TRACK_STROKE.md` | PDF «Eje: 7pt de grosor» @2× ÷2 — exact match to `get_drawings()`'s own stroke width (`7.0`), no delta |
| progress-arc/track stroke (sm/lg) | 5.2/2.4 (sm), 9.9/4.6 (lg) | px | ProgressRing.tsx | extrapolated from md using the same sm:md:lg ratios above — not measured |
| ring→label gap | 4 (`--ds-space-1`) | px | styles.css `.ds-progress-pdf` `gap` | measured: `get_text()` bbox of "Evacuados" (top=376.71) minus the ring's own outer bbox bottom (367.16) = 9.55pt @2× ÷2 ≈ 4.78px, snapped to the nearest space token |

## Size scale recalibration — 2026-08-06, same day, user feedback after Storybook review

The table above (36/25/48px) was the **first pass** implementation. The user reported it read as
too small in practice and, at `size="sm"`/`"md"`, the number text visibly touched the progress
arc — a real bug: `.ds-progress-pdf__value`/`__label` had a **fixed** `font-size` (9px/10px)
regardless of `size`, so the smaller rings had proportionally *more* crowding, not less. Fix:

| Property | sm | md | lg | Basis |
|----------|---:|---:|---:|-------|
| diameter | 33px | **48px** | 63px | `md` = the first pass's extrapolated `lg` (36×1.321); `sm`/`lg` re-derived from this new `md` ×0.696/×1.321 |
| progress-arc stroke | 6.9px | 9.9px | 13.1px | same ×0.696/×1.321 ratio applied to the new `md`'s 9.9px (= first pass's `lg` stroke, unchanged in value, just promoted) |
| track stroke | 3.2px | 4.6px | 6.1px | same ratio, new `md`'s 4.6px (= first pass's `lg` track stroke) |
| value font-size | 6px | **9px** | 12px | **new**: previously fixed at 9px for every size; now scales ×0.696/×1.321 from the PDF's own literal measurement (still 9px, now specifically at `md`) |
| label font-size | 7px | **10px** | 13px | **new**: previously fixed at 10px for every size; same treatment as value font-size |

Net effect: the PDF's own literal 36px/7.5px/3.5px/9px/10px measurement no longer corresponds to
any single named `size` — it sits between `sm` (33px) and `md` (48px). This is a deliberate
user-directed choice (make the previously-extrapolated `lg` the new default `md`), not a
correction of a measurement error — the original measurement itself is still accurate and
recorded in the Dimensions table above for provenance. Scaling stroke *and* font together (not
diameter alone) keeps the text-to-ring-diameter ratio constant across all three sizes, so `sm` is
no longer at higher risk of crowding than `md` — confirmed visually in Storybook (`Sizes` story)
after the fix, no size shows the number touching the arc.

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| progress arc + value text, tone=warning | #e3a500 | --ds-color-pdf-warning (new token) | `get_drawings()` stroke `(0.89, 0.647, 0.0)` on the outer arc; `get_text()` span color `0xe3a500` on "75%" | exact match — the only tone this PDF page actually shows a live example of |
| progress arc + value text, tone=danger | #ff0404 | --ds-color-pdf-critical (existing token) | PDF legend «Número: ... #e3a500 - #ff0404 - #28a500» — cited but not drawn on this page's single example | color from legend, not independently drawn/measured on this page |
| progress arc + value text, tone=success | #28a500 | --ds-color-pdf-success (new token) | same as above | color from legend, not independently drawn/measured on this page |
| progress arc + value text, tone=neutral | #8a8b87 | --ds-color-pdf-ink-muted | none — no PDF example for a 4th/neutral state | **not a PDF value** — chosen so `tone="neutral"` doesn't fall back to an invented hue; flagged, not resolved |
| track | #e6e6e6 | --ds-color-pdf-line-light | `get_drawings()` stroke `(0.902, 0.902, 0.902)` on the inner arc; PDF «Eje: ... #e6e6e6» | exact match |
| label text | #e6e6e6 | --ds-color-pdf-line-light | `get_text()` span color `0xe6e6e6` on "Evacuados" | exact match |

## Typography
| Element | Font family | Size (at `size="md"`, post-recalibration) | Weight | Source | Delta |
|---------|-------------|-------------------------------------------:|--------|--------|-------|
| value (`.ds-progress-pdf__value`) | var(--ds-font-body) | 9px | 700 | PDF «Número: Montserrat Bold - 18pt» @2× ÷2 | exact match — `get_text()` span size `18.0`, no ratio artifact (unlike the "Barras lineal" section of the same page, see `LinearBarChartCard.spec.md`) |
| label (`.ds-progress-pdf__label`) | var(--ds-font-body) | 10px | 300 | PDF «Título: Montserrat Extra Light - 20pt» @2× ÷2 | exact match — `get_text()` span size `20.0` |

Both sizes above are set **inline per `size`** (`PDF_VALUE_FONT`/`PDF_LABEL_FONT` in
ProgressRing.tsx), not fixed in CSS — see the size-scale recalibration section above for the
sm/lg values (6px/7px and 12px/13px) and why this changed from a first-pass fixed font-size.

## Deltas & open questions (facts only — DO NOT resolve)
- **sm/lg sizes, stroke widths, and (as of the 2026-08-06 recalibration) font sizes are
  extrapolated, not measured** — this PDF page shows exactly one instance of this gauge
  ("Evacuados"), which after the recalibration sits between `sm` and `md`, not exactly at any
  named size. See Dimensions above.
- **`tone="neutral"` has no PDF example** — color chosen (`--ds-color-pdf-ink-muted`) is a
  reasonable default, not a measured/cited value.
- **Ring start angle (12 o'clock, clockwise) is not confirmed by the PDF** — a single static "75%"
  raster doesn't unambiguously reveal where the arc begins; this matches `variant="console"`'s own
  `conic-gradient` convention (`from 0deg` = 12 o'clock) for consistency between the two variants,
  not independent PDF evidence.
- **Not wrapped in `ChartCard`** — the PDF's shared "GRAFICOS" legend (`Fondo`/`Borde`/`Padding`)
  technically applies to this gauge too when shown in a reporting screen, same as
  `BarChartCard`/`DonutChartCard`/`LineChartCard`/`LinearBarChartCard`, but `ProgressRing` is kept
  as a bare atom (no self-wrapping) — consistent with its existing `variant="console"` usage
  pattern (composed inside `Card` by the consumer, not self-chroming).
- **`variant` default flipped `"console"` → `"pdf"` (2026-08-06, user-directed)** — a public API
  default change, not just a story change. `variant="console"`'s own code/CSS is untouched and
  still fully functional for any consumer that passes it explicitly; only its Storybook stories
  (`Playground`/`Tones`/`Sizes`) were removed and replaced by what were `PdfGauge`/`PdfTones`/
  `PdfSizes`, renamed to those same three names now that `pdf` is the default.
