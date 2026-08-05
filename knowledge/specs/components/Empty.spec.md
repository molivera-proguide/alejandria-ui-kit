# Empty — Numeric Specification

- Status: measured; fidelity pass 2026-08-05 (`page.get_drawings()` + `page.get_text("dict")` on `doc[15]`, mediabox 1920×1080 confirms @2×), triggered by user-reported visual issues (icon well should be round; title/description too far apart) — both confirmed real and fixed, see Changelog in `knowledge/components/Empty.md`.
- Source-of-truth order: PDF (page 16) > component doc > implemented CSS
- CSS block: `.ds-empty` (styles.css:1634–1689)
- Export: packages/ui/src/components/Empty.tsx
- PDF reference: p.16 EMPTY (knowledge/components/Empty.md; knowledge/references/pdf-text-extract.md § Page 16)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| icon well (outer) | 32×32 | px | styles.css:1653,1657 | **adjusted 2026-08-05 (post-review):** PDF measures the well at 20×20 (40×40 @2×, see below) with the icon glyph filling only ~40% of that diameter — implementing the well at the literal 20×20 with the SVG at 100% (no padding) made the icon touch the circle's edge; user reported "queda muy justo con el tamaño del ícono." Grown to 32×32 with `padding: 6px` so the icon keeps its prior ~20×20 visual size but with room around it — a practical middle ground, not a new PDF measurement (32px itself isn't PDF-sourced) but directionally consistent with the PDF's own icon-smaller-than-well relationship. |
| icon well (PDF-measured, no longer literal in CSS) | 20×20 (`var(--ds-size-icon-xl)`) | px | styles.css:103; PDF 40×40 ÷2 (`get_drawings()` bbox 40.0×40.0pt @2× on demo 1, 42.37×42.37pt on demo 2) | superseded by the 32×32 well above; kept here as the underlying PDF measurement for reference |
| icon glyph (PDF-measured, informational) | ~16×14 | pt @2× | `get_drawings()` combined bbox of the clipboard icon's 2 path items, demo 1: ≈(431.11,148.34)–(446.97,162.11) = 15.86×13.77pt @2× | icon glyph occupies **well under half** of the 40×40pt @2× well diameter in the PDF — this ratio motivated the direction of the fix above, though the fix doesn't replicate it literally (would make the rendered icon very small) |
| icon border-radius | var(--ds-radius-pill) | px | styles.css:1649 | **fixed 2026-08-05**: was `0` (square) — `get_drawings()`'s own item for the icon well is a closed path of 4 `c` (curve) segments with zero straight edges, i.e. a full circle, confirmed on both demo instances on this page. User-reported: "el ícono está con un fondo redondo gris." |
| icon svg | 100% of icon well's content box (32px well − 6px padding × 2 = 20px) | px | styles.css:1660–1663 | PDF cites icon size only; fill-of-well ratio is an implementation choice either way (see icon glyph row above) |
| icon→title gap | 20 (`var(--ds-space-5)`) | px | styles.css:1655 | **fixed 2026-08-05**: was part of a uniform `gap: 8px` on `.ds-empty`. Measured via glyph/vector bbox deltas: demo 1 (icon bottom y=175.22 → title top y=219.18) = 43.96pt @2× ÷2 ≈ 21.98px; demo 2 (icon bottom y=516.44 → title top y=559.21) = 42.77pt @2× ÷2 ≈ 21.39px. Average ≈21.7px, snapped to the nearest space token (`--ds-space-5` = 20px). |
| title→description gap | 0 | px | styles.css:1666–1672 (no margin set) | **fixed 2026-08-05**: was part of the same uniform `gap: 8px`. Measured: demo 1 (title bottom y=240.65 → description top y=238.72) = **−1.93pt** (bboxes overlap slightly — i.e. no visible gap beyond normal line leading); demo 2 (title bottom y=580.69 → description top y=578.75) = **−1.94pt**. Both demos agree closely: title and description are essentially touching in the PDF. User-reported: "Título y texto están más juntos en el PDF." |
| description→action gap | 24 (`var(--ds-space-6)`) | px | styles.css:1684 (and styles.css:1675 for the title-then-action fallback) | **fixed 2026-08-05**: was part of the same uniform `gap: 8px`. Measured: demo 1 (single-line description bottom y=256.85 → button top y=316.95) = 60.10pt @2× ÷2 ≈ 30.05px; demo 2 (2-line description bottom y=613.68 → button top y=656.98) = 43.30pt @2× ÷2 ≈ 21.65px — the two demos disagree by ~40% (see Deltas below); average ≈25.85px, snapped to `--ds-space-6` (24px). |
| action padding | — (slot; not styled by Empty) | — | styles.css:1687–1689; PDF padding 10/30 @2× → 5/15 display | button chrome not owned by `.ds-empty__action` |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| root background | transparent | n/a (explicit none) | styles.css:1636; PDF «Fondo: sin fondo» | match |
| icon background | var(--ds-color-pdf-action) → #494949 | --ds-color-pdf-action | styles.css:1648; styles.css:49; PDF fondo #494949 — confirmed both from legend text and `get_drawings()`'s own fill `(0.286, 0.286, 0.286)` on the well shape | exact match |
| icon ink | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1651; styles.css:45; PDF ícono #8a8b87 | exact match |
| title text | var(--ds-color-pdf-line-light) → #e6e6e6 | --ds-color-pdf-line-light | styles.css:1667; styles.css:47; PDF título #e6e6e6 | exact match |
| description text | var(--ds-color-pdf-line-light) → #e6e6e6 | --ds-color-pdf-line-light | styles.css:1679; styles.css:47; PDF texto #e6e6e6 | exact match |
| button fill (PDF only) | #494949 | --ds-color-pdf-action | PDF p.16; not applied on `.ds-empty__action` | slot — see open questions |
| button text (PDF only) | #FFFFFF | --ds-color-white | PDF p.16; styles.css:52 | slot — see open questions |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-body) (Montserrat) | 8px (PDF 16pt @2× ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-normal) → 1.2 | none (sentence case in PDF demos) | styles.css:1666–1672 |
| description | var(--ds-font-body) (Montserrat) | 7px (PDF 14pt @2× ÷2) | 300 (`--ds-font-weight-light`) | UNVERIFIED (none set) | var(--ds-leading-body) → 1.45 | none | styles.css:1678–1685 |
| button label (PDF only) | Montserrat Bold | 8px (16pt @2× ÷2) | 700 | UNVERIFIED | UNVERIFIED | uppercase in PDF demos | PDF p.16; not styled by Empty |

**Fixed 2026-08-05:** `font-size` on title/description was the literal CSS unit `pt` (`8pt`/`7pt`), not `px` — corrected to `8px`/`7px`, closing out the carried-forward `pt`-vs-`px` finding for this component (the last one flagged in `next-steps.md`).

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | none (removed 2026-08-05; was 8px uniform) | — | styles.css:1634–1644 |
| icon | 6px (new, post-review — see Dimensions) | — | bottom 20px (`--ds-space-5`, measured) | styles.css:1655–1656 |
| description | — | — | bottom 24px (`--ds-space-6`, measured); top 0 | styles.css:1684 |
| title + action (no description) | — | — | top 24px (`--ds-space-6`, measured) on `.ds-empty__title + .ds-empty__action` | styles.css:1674–1676 |
| action (PDF button) | 5px / 15px display (10/30 @2×) | — | — | PDF p.16 only — not on `.ds-empty__action` |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-empty | root empty-state layout | styles.css:1634 | yes |
| .ds-empty__icon | icon well (now circular) | styles.css:1646 | yes |
| .ds-empty__title | title type | styles.css:1666 | yes |
| .ds-empty__title + .ds-empty__action | fallback gap when description is omitted | styles.css:1674 | yes |
| .ds-empty__description | description type | styles.css:1678 | yes |
| .ds-empty__action | action slot wrapper | styles.css:1687 | yes |
| (no BEM modifiers) | single appearance | knowledge/components/Empty.md; PDF p.16 | n/a |

## Deltas & open questions (facts only — DO NOT resolve)

- **Icon well grown beyond its PDF-measured size (second-round user request):** the well's outer diameter is now `32px`, not the PDF-measured `20px` (`--ds-size-icon-xl`) — a deliberate, documented deviation from the literal PDF measurement, made because implementing the well at its exact measured size with the SVG filling it edge-to-edge (no padding) made the icon touch the circle's border, which the user flagged as "muy justo." The PDF itself supports padding existing (its own icon glyph fills well under half the well's diameter — see Dimensions), just not this specific 32px number, which is a practical choice rather than a new measurement.
- **Description color vs muted assumption:** PDF p.16 cites description (Texto) as `#e6e6e6`, same as title — implemented via `--ds-color-pdf-line-light`. `--ds-color-pdf-ink-muted` (`#8a8b87`) matches the **icon** ink only, not the description. Any assumption that description uses muted ink is incorrect against the PDF extract.
- **Description→action gap disagrees between the PDF's own two demos** (see Dimensions above: 30.05px vs 21.65px, a ~40% spread) — the fix uses the average snapped to `--ds-space-6` (24px), but this is a real inconsistency in the source PDF itself, not a measurement artifact of one demo; a future dedicated look (e.g. checking whether the 2-line vs 1-line description wrap affects the design tool's own auto-layout gap) could resolve which figure (if either) is the "intended" one.
- **Action button chrome:** PDF specifies button Montserrat Bold 16pt, `#FFFFFF` text, padding 10/30 @2× → 5/15 display, fill `#494949`. `Empty` does not style slot contents; stories may pass `Button variant="pdf"` whose padding/min-height differ from PDF 5×15 (see Button.spec.md / `.ds-button--sm|--md`). Not an untokenized hex gap — tokens `--ds-color-pdf-action` and `--ds-color-white` exist — but geometry is owned by the consumer node, not `.ds-empty__action`.
- **Viewport centering:** PDF «Centrado en la pantalla» is layout-parent responsibility; `.ds-empty` only centers its own flex children.
- **Letter-spacing:** PDF does not cite tracking for title/text; CSS does not set `letter-spacing` (UNVERIFIED vs artboard).
- **Form (p.17):** PDF extract notes p.17 FORM block is nearly identical to EMPTY; not resolved here whether Form reuses `Empty`.
