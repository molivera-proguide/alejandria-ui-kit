# InvestigationCard — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-investigation-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/InvestigationCard.tsx
- PDF reference: p. 4 (per knowledge/components/InvestigationCard.md — INVESTIGATION CARD, formerly TARJETAS p.2 in PDF v1)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Corrected 2026-08-04 using exact PDF vector path (`page.get_drawings()`) and text-span
(`page.get_text("dict")`) extraction via PyMuPDF on page index 3, not a screenshot estimate — same
method used for TaskCard's fidelity pass that day. Two real bugs found: (1) `max-width` was
undercalibrated (140px, never measured against the vector path) combined with `width: fit-content`,
which let the two action buttons wrap onto separate rows whenever their combined width didn't need
the full 140px; (2) four `font-size` declarations used a literal CSS `pt` unit instead of `px` — CSS
`pt` is a fixed physical unit (1pt = 1.333px), so those four elements rendered ~33% larger than the
÷2 rule intends. **This `pt`-instead-of-`px` bug also exists in `CalendarCard`, `Empty`, and
`SideBar`** (same batch of components, not yet audited this session).

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| width | 165 | px | styles.css | changed 2026-08-04 — PDF vector path (330.3pt @2×) → ÷2 = 165px. Was `max-width: 140px` (invented, never measured) + `width: fit-content` (let it shrink below even that on short content — see .ds-task's Dimensions notes for the same pattern in TaskCard). |
| padding | 7.5px 5px | px | styles.css | display = 15/10 ÷2 — matches the PDF legend directly, unaffected |
| gap | 6 | px | styles.css | was `--ds-space-3` → 6px calibrated |
| with-utilities padding-right | 36 | px | styles.css | display = 72÷2 |
| utility button | 10×10 | px | styles.css | was `--ds-size-icon-xl` 20 → 10 |
| icon | 25×25 | px | styles.css | display = 50÷2 — PDF vector path (drawing bbox ~46×46pt @2×) → ÷2 ≈ 23×23px measured, current 25×25 is ~2px over; left unchanged, within measurement noise and not independently confirmed as a defect |
| action padding | 2.5px 10px | px | styles.css | display = 5/20 ÷2 — matches PDF legend directly |
| action button (PDF example) | ~53.5×10.25 | px | PDF vector path only, not a CSS rule | both example buttons (drawing bbox ~107×20.5pt @2×) happen to be equal width because "ACCIÓN A"/"ACCIÓN B" are equal-length strings — not applied as a fixed CSS width, buttons stay content-sized; not enough evidence to force equal/fixed button width for arbitrary consumer labels |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(0 0 0 / 0.7) | --ds-color-black-a70 | styles.css | confirmed 2026-08-04 — PDF vector fill (0,0,0), matches legend «#000000 70% transparencia» exactly |
| border | #606060 | --ds-color-pdf-border | styles.css | confirmed 2026-08-04 — PDF vector stroke (0.376,0.376,0.376) ≈ #606060, matches legend exactly |
| title/value/action text | #ffffff | --ds-color-white | styles.css | confirmed 2026-08-04 via PDF text-span extraction |
| metric label | #c1c1c1 | --ds-color-pdf-line | styles.css | confirmed 2026-08-04 — PDF text-span color is literally `0xc1c1c1` |
| action primary/ghost rest bg | #494949 | --ds-color-pdf-action | styles.css | **corrected twice 2026-08-04.** First pass read the PDF's two fills as two permanent variant colors (primary=#8a8b87, ghost=#494949) and swapped them relative to the CSS at the time. User then confirmed against the source design that this page's "ACCIÓN A" (fill ≈ #8a8b87, PDF vector (0.541,0.545,0.529)) is a **hover** state capture, not a distinct resting color — "ACCIÓN B" (fill ≈ #494949, (0.286,0.286,0.286)) is the shared resting state for both variants. Neither button is transparent at rest either way. |
| action primary/ghost hover bg | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | added 2026-08-04 (second pass) for `primary` — this is the color the PDF's "ACCIÓN A" shows, now modeled as `:hover`, not as `primary`'s permanent background. **Third pass same day:** user asked for `ghost`'s hover to match `primary`'s exactly, so `ghost:hover` was changed from `--ds-color-pdf-action-hover` (#5a5a5a) to this same `--ds-color-pdf-ink-muted` — `primary` and `ghost` are now identical in every state (rest and hover), not just at rest. |
| focus ring | 0 0 0 2px rgb(193 193 193 / 0.45) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |
| disabled opacity | 0.58 | UNTOKENIZED — candidate | styles.css | — |

## Typography

Font-size **unit** corrected 2026-08-04 for all four rows below: CSS literal `pt` → `px`. The
*numbers* were already right (correctly halved from the PDF's `@2×` pt values); only the unit was
wrong. `1pt = 1.333px` in CSS, so all four elements were rendering ~33% larger than intended before
this fix.

| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 6.5px | 300 | 0.04em | 1.2 | uppercase | PDF text-span: `SourceCodeVariable-Roman`, 13.0pt @2×, `#ffffff` → ÷2 = 6.5px. Unit was `6.5pt` (bug, see above). |
| metric value | var(--ds-font-body) | 7px | 700 | UNVERIFIED | 1.15 | uppercase | PDF text-span: `Montserrat-Bold`, 14.6pt @2×, `#ffffff` → ÷2 ≈ 7.3px, rounded to 7px (matches the PDF legend's rounded "14pt" ÷2 exactly). Unit was `7pt` (bug). |
| metric label | var(--ds-font-body) | 5px | 200 | UNVERIFIED | 1.2 | none | PDF text-span: `Montserrat-ExtraLight`, 9.7pt @2×, `#c1c1c1` → ÷2 ≈ 4.85px, rounded to 5px. Unit was `5pt` (bug). |
| action | var(--ds-font-body) | 5.5px | 700 | UNVERIFIED | 1 | uppercase | PDF text-span: `Montserrat-Bold`, 10.6pt @2×, `#ffffff` → ÷2 ≈ 5.3px, rounded to 5.5px (matches the PDF legend's rounded "11pt" ÷2 exactly). Unit was `5.5pt` (bug). Two overlapping text objects exist at the identical bbox in the PDF (`#ffffff` and `#8a8b87`) — treated as a design-file layering artifact, not two intended states; `#ffffff` was kept since it matches the legend's explicit button text color. |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 7.5px 5px | 6px | — | styles.css (display scale) |
| utilities | — | 4px | top 7.5px / right 5px absolute | calibrated |
| metrics | — | 6px 8px | — | was space-3 / space-4 |
| metric cell | — | 2px | — | was `--ds-space-1` |
| actions | — | 5px | margin-top 2px | styles.css — PDF vector gap between the two button rects is ~8.8pt @2× ≈ 4.4px display, matches the current 5px closely, unchanged |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-investigation-card--with-utilities | extra padding-right | styles.css | yes |
| .ds-investigation-card__action--primary | #494949 fill at rest, #8a8b87 on hover (corrected 2026-08-04) | styles.css | yes |
| .ds-investigation-card__action--ghost | #494949 fill at rest, #8a8b87 on hover (changed 2026-08-04 — rest was transparent, hover was #5a5a5a; both now match `primary` exactly) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Local action styles intentionally diverge from global `Button` tokens (knowledge/components/InvestigationCard.md: «estilos PDF #494949 son locales»).
- **`ghost` no longer means transparent.** The prop/variant name `ghost` is unchanged (out of scope — an API naming decision, not a CSS fidelity fix), but its visual treatment now matches the PDF's resting-state button (filled `#494949`), which is not what "ghost" conventionally implies in most design systems. A future consumer skimming just the type name (`InvestigationActionVariant = "primary" | "ghost"`) without reading the CSS could reasonably expect transparency and be surprised.
- **`primary` and `ghost` are now visually identical in every state** — same rest color (`#494949`) and, per explicit user request, the same hover color (`#8a8b87`) too. `InvestigationActionVariant` currently has zero visual effect; it only exists as a semantic/API distinction. This is a real, deliberate reading of the PDF's single static example (one button captured mid-hover, one at rest) rather than two permanently distinct variant colors — confirmed with the user, not independently re-verifiable from the static PDF alone (a PDF export can't show two DOM states of one element). If a future redesign gives `primary`/`ghost` genuinely distinct colors in either state, this note is the reason today's are identical and should be revisited alongside it.
- Icon container size (25×25px) has a ~2px delta against the PDF vector measurement (~23×23px) that was not resolved this session — low confidence in the vector bbox actually corresponding 1:1 to the CSS box (could include glyph padding), so left as-is rather than churned on weak evidence.
- Action button width is content-sized (not fixed) — the PDF's two example buttons happen to be equal width only because "ACCIÓN A"/"ACCIÓN B" are equal-length strings. Not enough evidence either way to force a fixed/equal button width for consumer-supplied labels of different lengths.
