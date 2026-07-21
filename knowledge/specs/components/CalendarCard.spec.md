# CalendarCard — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 15) > component doc > implemented CSS
- CSS block: `.ds-calendar-card` (styles.css:395–426)
- Export: packages/ui/src/components/CalendarCard.tsx
- PDF reference: p.15 CALENDAR CARD (knowledge/components/CalendarCard.md; knowledge/references/pdf-text-extract.md § Page 15)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 (`var(--ds-border-width-hair)`) | px | styles.css:397; styles.css:96; PDF Borde 0,75pt | hairline — not scaled |
| border-radius | var(--ds-radius-xs) → 2px | px | styles.css:398; styles.css:37 | PDF does not annotate radius; kit convention (same as `.ds-task`) |
| root max-width | 140 | px | styles.css:402; `.ds-task--kanban` precedent | **PDF p.15 does not annotate width** — provisional, reused from TaskCard's compact-tile max-width, not independently measured |
| root padding | 7.5px 5px | px | styles.css:402; `.ds-task--default` styles.css:819; PDF Padding 15px 10px | exact display match (15/10 @2× ÷2); same literal as `.ds-task--default` |
| root gap | 8 (`var(--ds-space-2)`) | px | styles.css:401; styles.css:89 | **PDF p.15 does not annotate root gap** — provisional |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:396; styles.css:44; PDF Fondo #2a2927 | exact match |
| border | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:397; styles.css:46; PDF Borde #c1c1c1 | exact match |
| day/month text | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:411; styles.css:52; PDF Fecha #ffffff | exact match |
| description text | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:420; styles.css:45; PDF Descripción #8a8b87 | exact match |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| day | var(--ds-font-body) (Montserrat) | 15pt (PDF 30pt ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-tight) → 1.05 | uppercase | styles.css:409–416 |
| month | var(--ds-font-body) (Montserrat) | 15pt (PDF 30pt ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-tight) → 1.05 | uppercase | styles.css:409–416 (comma-selector with day) |
| description | var(--ds-font-body) (Montserrat) | 6pt (PDF 12pt ÷2) | 300 (`--ds-font-weight-light`) | UNVERIFIED (none set) | var(--ds-leading-body) → 1.45 | none (PDF Uppercase only on Fecha) | styles.css:419–425 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 7.5px 5px | 8px (provisional, `--ds-space-2`) | — | styles.css:401–402 |
| date block | — | (stacked lines via `display: grid`) | — | styles.css:405–406 |
| description | — | — | 0 | styles.css:425 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-calendar-card | root tile surface + grid layout | styles.css:395 | yes |
| .ds-calendar-card__date | date block wrapper | styles.css:405 | yes |
| .ds-calendar-card__day | day type (shared with month) | styles.css:409 | yes |
| .ds-calendar-card__month | month type (shared with day) | styles.css:410 | yes |
| .ds-calendar-card__description | description type | styles.css:419 | yes |
| (no BEM modifiers) | single appearance | knowledge/components/CalendarCard.md; PDF p.15 | n/a |

## Deltas & open questions (facts only — DO NOT resolve)

- **Day/month stacked vs inline:** PDF text layer loses position (same caveat as p.2 timeline). Implementation stacks `day` above `month` inside `.ds-calendar-card__date`. This is an **assumption**, not a measured PDF layout.
- **Root gap:** PDF p.15 does not annotate gap between the Fecha block and Descripción. CSS uses provisional `var(--ds-space-2)` → `8px` (styles.css:401), same treatment as Empty’s provisional root gap.
- **Max-width:** PDF p.15 does not annotate a width. CSS now sets `max-width: 140px` (display scale), reused verbatim from `.ds-task--kanban`'s already-provisional compact-tile width rather than a newly invented value — chosen so `.ds-calendar-card__description` wraps into a tile shape instead of stretching to one line. Still not a PDF-measured value; flag for design confirmation.
- **Padding math:** PDF Padding `15px 10px` is a @2× annotation → display ÷2 = `7.5px 5px`. CSS reuses the same literal already present on `.ds-task--default` (`padding: 7.5px 5px;` styles.css:819).
- **Border-radius:** PDF does not annotate radius; CSS uses `--ds-radius-xs` (same surface combo as `.ds-task`).
- **Letter-spacing:** PDF does not cite tracking for Fecha/Descripción; CSS does not set `letter-spacing` (UNVERIFIED vs artboard).
