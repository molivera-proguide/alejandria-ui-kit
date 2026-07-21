# Empty — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 16) > component doc > implemented CSS
- CSS block: `.ds-empty` (styles.css:1228–1273)
- Export: packages/ui/src/components/Empty.tsx
- PDF reference: p.16 EMPTY (knowledge/components/Empty.md; knowledge/references/pdf-text-extract.md § Page 16)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| icon box | 20×20 (`var(--ds-size-icon-xl)`) | px | styles.css:1243–1245; styles.css:103; PDF 40×40 ÷2 | exact display match |
| icon svg | 100% of icon box | — | styles.css:1250–1251 | PDF cites icon size only; fill of well assumed |
| root gap | 8 | px | styles.css:1234 | **PDF p.16 does not annotate inter-element gap** — provisional |
| action padding | — (slot; not styled by Empty) | — | styles.css:1271–1273; PDF padding 10/30 @2× → 5/15 display | button chrome not owned by `.ds-empty__action` |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| root background | transparent | n/a (explicit none) | styles.css:1230; PDF «Fondo: sin fondo» | match |
| icon background | var(--ds-color-pdf-action) → #494949 | --ds-color-pdf-action | styles.css:1240; styles.css:49; PDF fondo #494949 | exact match |
| icon ink | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1241; styles.css:45; PDF ícono #8a8b87 | exact match |
| title text | var(--ds-color-pdf-line-light) → #e6e6e6 | --ds-color-pdf-line-light | styles.css:1255; styles.css:47; PDF título #e6e6e6 | exact match |
| description text | var(--ds-color-pdf-line-light) → #e6e6e6 | --ds-color-pdf-line-light | styles.css:1263; styles.css:47; PDF texto #e6e6e6 | exact match |
| button fill (PDF only) | #494949 | --ds-color-pdf-action | PDF p.16; not applied on `.ds-empty__action` | slot — see open questions |
| button text (PDF only) | #FFFFFF | --ds-color-white | PDF p.16; styles.css:52 | slot — see open questions |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-body) (Montserrat) | 8pt (PDF 16pt ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED (none set) | var(--ds-leading-normal) → 1.2 | none (sentence case in PDF demos) | styles.css:1254–1259 |
| description | var(--ds-font-body) (Montserrat) | 7pt (PDF 14pt ÷2) | 300 (`--ds-font-weight-light`) | UNVERIFIED (none set) | var(--ds-leading-body) → 1.45 | none | styles.css:1262–1268 |
| button label (PDF only) | Montserrat Bold | 8pt (16pt ÷2) | 700 | UNVERIFIED | UNVERIFIED | uppercase in PDF demos | PDF p.16; not styled by Empty |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | 8px (provisional) | — | styles.css:1234 |
| description | — | — | 0 | styles.css:1268 |
| action (PDF button) | 5px / 15px display (10/30 @2×) | — | — | PDF p.16 only — not on `.ds-empty__action` |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-empty | root empty-state layout | styles.css:1228 | yes |
| .ds-empty__icon | icon well | styles.css:1238 | yes |
| .ds-empty__title | title type | styles.css:1254 | yes |
| .ds-empty__description | description type | styles.css:1262 | yes |
| .ds-empty__action | action slot wrapper | styles.css:1271 | yes |
| (no BEM modifiers) | single appearance | knowledge/components/Empty.md; PDF p.16 | n/a |

## Deltas & open questions (facts only — DO NOT resolve)

- **Description color vs muted assumption:** PDF p.16 cites description (Texto) as `#e6e6e6`, same as title — implemented via `--ds-color-pdf-line-light`. `--ds-color-pdf-ink-muted` (`#8a8b87`) matches the **icon** ink only, not the description. Any assumption that description uses muted ink is incorrect against the PDF extract.
- **Inter-element gap:** PDF p.16 does not annotate vertical gap between icon / title / text / button. CSS uses provisional `8px` (styles.css:1234).
- **Icon well radius:** PDF p.16 does not annotate `border-radius` for the icon background; CSS leaves default (square).
- **Action button chrome:** PDF specifies button Montserrat Bold 16pt, `#FFFFFF` text, padding 10/30 @2× → 5/15 display, fill `#494949`. `Empty` does not style slot contents; stories may pass `Button variant="pdf"` whose padding/min-height differ from PDF 5×15 (see Button.spec.md / `.ds-button--sm|--md`). Not an untokenized hex gap — tokens `--ds-color-pdf-action` and `--ds-color-white` exist — but geometry is owned by the consumer node, not `.ds-empty__action`.
- **Viewport centering:** PDF «Centrado en la pantalla» is layout-parent responsibility; `.ds-empty` only centers its own flex children.
- **Letter-spacing:** PDF does not cite tracking for title/text; CSS does not set `letter-spacing` (UNVERIFIED vs artboard).
- **Form (p.17):** PDF extract notes p.17 FORM block is nearly identical to EMPTY; not resolved here whether Form reuses `Empty`.
