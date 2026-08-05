# CalendarCard — Numeric Specification

- Status: measured; fidelity pass 2026-08-05 (`page.get_drawings()` + `page.get_text("dict")` on `doc[14]`, mediabox 1920×1080 confirms @2×) found and fixed 4 real deltas — see Changelog in `knowledge/components/CalendarCard.md`.
- Source-of-truth order: PDF (page 15) > component doc > implemented CSS
- CSS block: `.ds-calendar-card` (styles.css:398–407)
- Export: packages/ui/src/components/CalendarCard.tsx
- PDF reference: p.15 CALENDAR CARD (knowledge/components/CalendarCard.md; knowledge/references/pdf-text-extract.md § Page 15)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 (`var(--ds-border-width-hair)`) | px | styles.css:400; styles.css:96; PDF Borde 0,75pt (measured stroke width 0.583pt — close, hairline rendering variance, not scaled) | hairline — not scaled |
| border-radius | 0 | px | styles.css:401; `get_drawings()` item `('re', Rect(279.22,185.69,423.24,329.72), 1)` — a plain rect, zero curve items | **fixed 2026-08-05**: was `var(--ds-radius-xs)` (2px), an assumed "same as `.ds-task`" convention never checked against this page's own vector — the PDF draws this card with square corners, no bezier curve at all |
| root width | 72 | px | styles.css:406; `get_drawings()` rect bbox 144.02×144.02pt @2× (a literal square) ÷2 | **fixed 2026-08-05**: was `max-width: 140px` (unmeasured, reused from `.ds-task--kanban`'s compact-tile cap) — combined with the story decorator's `width: fit-content`, the card was rendering as small as ~59px (content-driven) in `WithoutDescription`, confirmed via `getComputedStyle` before the fix |
| root padding | 7.5px 5px | px | styles.css:405; `.ds-task--default` styles.css:819; PDF Padding 15px 10px | exact display match (15/10 @2× ÷2); same literal as `.ds-task--default` |
| root gap | 4 (`var(--ds-space-1)`) | px | styles.css:404; styles.css:90 | **fixed 2026-08-05**: was `var(--ds-space-2)` (8px), provisional/unmeasured. Now measured indirectly from `get_text("dict")` glyph bboxes — gap between month's bbox bottom (y=261.50) and description's first-line bbox top (y=268.80) = 7.30pt @2× ÷2 ≈ 3.65px, rounded to the nearest space token (`--ds-space-1` = 4px). See caveat below on bbox-derived gap precision. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:399; styles.css:44; PDF Fondo #2a2927 — confirmed both from legend text and `get_drawings()`'s own fill `(0.165, 0.161, 0.153)` on the card rect | exact match |
| border | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:400; styles.css:46; PDF Borde #c1c1c1 | exact match |
| day/month text | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:415; styles.css:52; PDF Fecha #ffffff | exact match |
| description text | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:424; styles.css:45; PDF Descripción #8a8b87 | exact match |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| day | var(--ds-font-body) (Montserrat) | 15px (PDF 30pt @2× ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-tight) → 1.05 (measured ~1.006 from baseline gap, see Deltas) | uppercase | styles.css:413–420 |
| month | var(--ds-font-body) (Montserrat) | 15px (PDF 30pt @2× ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-tight) → 1.05 (measured ~1.006, see Deltas) | uppercase | styles.css:413–420 (comma-selector with day) |
| description | var(--ds-font-body) (Montserrat) | 6px (PDF 12pt @2× ÷2) | 300 (`--ds-font-weight-light`) | UNVERIFIED (none set) | var(--ds-leading-body) → 1.45 (measured ~1.167 from bbox baseline gaps, see Deltas — **not** changed in code, flagged only) | none (PDF Uppercase only on Fecha) | styles.css:423–429 |

**Fixed 2026-08-05:** `font-size` on all three rows was the literal CSS unit `pt` (`15pt`/`6pt`), not `px` — `1pt = 1.333px`, so both rendered ~33% oversized (confirmed via `getComputedStyle`: `15pt` → `20px` computed, `6pt` → `8px` computed). Corrected to `15px`/`6px` literal.

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 7.5px 5px | 4px (`--ds-space-1`, measured) | — | styles.css:404–405 |
| date block | — | (stacked lines via `display: grid`) | — | styles.css:409–410 |
| description | — | — | 0 | styles.css:429 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-calendar-card | root tile surface + grid layout | styles.css:398 | yes |
| .ds-calendar-card__date | date block wrapper | styles.css:409 | yes |
| .ds-calendar-card__day | day type (shared with month) | styles.css:413 | yes |
| .ds-calendar-card__month | month type (shared with day) | styles.css:414 | yes |
| .ds-calendar-card__description | description type | styles.css:423 | yes |
| (no BEM modifiers) | single appearance | knowledge/components/CalendarCard.md; PDF p.15 | n/a |

## Deltas & open questions (facts only — DO NOT resolve)

- **Day/month stacked vs inline:** PDF text layer loses position (same caveat as p.2 timeline). Implementation stacks `day` above `month` inside `.ds-calendar-card__date`. This is an **assumption**, not a measured PDF layout. Baseline gap between day and month (223.34→253.52 = 30.18pt @2×) is consistent with two stacked lines at ~font-size line-height, supporting (not proving) the stacked reading.
- **Root gap — fixed 2026-08-05, method caveat:** PDF p.15 has no direct annotation for the gap between the Fecha block and Descripción, so this was derived indirectly: `get_text("dict")` gives month's bbox bottom (y=261.50) and description's first-line bbox top (y=268.80), a 7.30pt @2× delta → 3.65px ÷2, rounded to `--ds-space-1` (4px). Bbox-derived gaps carry more noise than a literal PDF annotation (font ascender/descender padding baked into each bbox can shift the true visual gap either direction) — cross-checked for plausibility against the day→month baseline gap (30.18pt vs 30pt font-size, ratio 1.006, i.e. bboxes track real typography tightly for this font), which raised confidence enough to apply the fix, but this number is lower-confidence than a directly-annotated PDF value.
- **Width — fixed 2026-08-05:** PDF p.15's own vector (`get_drawings()`) draws the card as a literal square, bbox `Rect(279.216, 185.694, 423.238, 329.716)` = 144.02×144.02pt @2× ÷2 = 72.01×72.01px display. CSS now sets `width: 72px` (display scale), replacing `max-width: 140px` — that value was reused verbatim from `.ds-task--kanban`'s already-provisional compact-tile width, never itself measured against this page, and (combined with the story decorator's `width: fit-content`) let the card shrink to ~59px in `WithoutDescription` instead of holding either 140 or the real 72.
- **Padding math:** PDF Padding `15px 10px` is a @2× annotation → display ÷2 = `7.5px 5px`. CSS reuses the same literal already present on `.ds-task--default` (`padding: 7.5px 5px;` styles.css:819).
- **Border-radius — fixed 2026-08-05:** PDF does not annotate a radius value in its legend text, but its own vector item for this card is `('re', Rect(...), 1)` — a plain rectangle path, no bezier curve segments at all. CSS now sets `border-radius: 0` (previously `--ds-radius-xs`, an assumed "same surface combo as `.ds-task`" convention that was never checked against this page's own geometry — unlike `.ds-task`'s cards, which do draw rounded corners in their own PDF pages).
- **Letter-spacing:** PDF does not cite tracking for Fecha/Descripción; CSS does not set `letter-spacing` (UNVERIFIED vs artboard).
- **Description line-height — measured, not resolved:** baseline gaps between the description's 3 wrapped lines (281.21→295.21→309.22, both deltas ≈14.0pt @2×) at font-size 12pt @2× give a real line-height ratio of ~1.167, vs the kit's shared `--ds-leading-body` token (1.45) — a ~24% difference. **Not changed in code**: `--ds-leading-body` is consumed by many already-reviewed components (TaskCard, InvestigationCard, ChartCard, MetricCard, SideBar), so overriding it here alone is a bigger cross-cutting call than this single page's evidence supports on its own. Flagged for a dedicated `--ds-leading-body` calibration pass (same category of deferred work as Asistente's ÷2 pass before it was finally done).
