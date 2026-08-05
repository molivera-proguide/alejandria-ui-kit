# Asistente — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 12) > component doc > implemented CSS
- CSS block: `.ds-asistente` (styles.css:1425–1632)
- Export: packages/ui/src/components/Asistente.tsx
- PDF reference: p.12 ASISTENTE (knowledge/components/Asistente.md; knowledge/references/pdf-text-extract.md § Page 12)

**2026-08-05 — ÷2 calibration applied.** The long-deferred scale bug ("second sizing pass, deferred twice") is fixed. Re-measured directly from `page.get_drawings()` / `page.get_text("dict")` on PDF page index 11 (1920×1080 = @2× artboard, confirmed via `page.mediabox`): shell vector rect = (249.0, 234.3)–(1023.4, 442.0) → 774.4×207.7pt @2×. Every dimension previously in this component's CSS matched the *raw* @2× pt value 1:1 (e.g. shell width 774px vs measured 774.4pt, execute button 135×25px vs measured 134.7×24.5pt, attach-plus 11px vs measured 11.2pt, suggestions margin-top 22px vs measured 22.2pt) — conclusive proof the whole block skipped the ÷2 step every other PDF-context component applies. All values below are halved.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root / shell width | 387 | px | styles.css:1428 / 1448; PDF vector 774.4pt÷2 | calibrated (was 774, raw @2×) |
| shell height | 104 | px | styles.css:1446; PDF vector 207.7pt÷2 | calibrated (was 208, raw @2×) |
| mic hit | 18×10 | px | styles.css:1519 / 1522; PDF mic glyph bbox ≈19.6×35.1pt÷2 | calibrated (was 36×20) |
| mic svg | 14×10 | px | styles.css:1526–1527 | calibrated (was 28×20) |
| attach-plus | 6×6 | px | styles.css:1547 / 1549; PDF plus-lines 11.2×11.2pt÷2 | calibrated (was 11×11) |
| execute width / min-height | 67 / 12 | px | styles.css:1598 / 1592; PDF vector 134.7×24.5pt÷2 | calibrated (was 135/25) |
| border | var(--ds-border-width-hair) → 0.75 | px | styles.css:1443; PDF stroke lw 0.322pt (own artboard-unit, not annotation) | hairline token, unchanged — out of ÷2 scope like every other PDF-context component |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| shell background | var(--ds-color-pdf-surface) → #060606 | --ds-color-pdf-surface | styles.css:1442; PDF fill (0.024,0.024,0.024) | exact match |
| shell border / greeting | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1443 / 1432; PDF stroke (0.757,...) / text span color 0xc1c1c1 | exact match |
| prompt empty / attach / mic / suggestions | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1487 / 1534 / 1515 / — ; PDF text spans color 0x8a8b87 | exact match |
| prompt typed | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1507–1509; PDF «cuando se escribe pasa a #FFFFFF» | exact match via `:not(:placeholder-shown)` |
| execute fill | var(--ds-color-pdf-action) → #494949 | --ds-color-pdf-action | PDF vector fill (0.286,0.286,0.286) ≈ #494949 | confirmed against vector fill; not previously cross-checked |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| greeting | var(--ds-font-display) (Source Code Pro) | 12px | 400 | var(--ds-tracking-none) | var(--ds-leading-snug) | uppercase in demo copy | styles.css:1431–1439; PDF text span size 24.0pt÷2, font SourceCodeVariable-Roman |
| prompt (tarea) | var(--ds-font-body) (Montserrat) | 9px | 300 (`--ds-font-weight-light`) | none | var(--ds-leading-normal) | none | styles.css:1486–1495; PDF text span size 18.0pt÷2, font Montserrat-Light |
| attach | var(--ds-font-body) | 7px | 300 | none | var(--ds-leading-normal) | none | styles.css:1575–1581; PDF text span size 14.0pt÷2, font Montserrat-Light |
| suggestions | var(--ds-font-display) | 7px | 400 | none | var(--ds-leading-label) | none | styles.css:1619–1632; PDF text span size 14.0pt÷2, font SourceCodeVariable-Roman |
| execute | var(--ds-font-body) | 6.5px | 700 | none | — | uppercase (`text-transform`) | styles.css:1583–1599; PDF text span size 13.0pt÷2, font Montserrat-Bold |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | — | — | styles.css:1425–1429 |
| greeting | — | — | 0 0 5px 4px | styles.css:1438; PDF greeting↔shell gap 9.3pt÷2, left offset 7.8pt÷2 |
| top row | absolute L17 R11 T8 | var(--ds-space-3) | — | styles.css:1451–1461; PDF prompt/mic offsets from shell origin ÷2 |
| attach | absolute L19 T43 | 5px | — | styles.css:1530–1541; PDF icon offset 37.7/90.1pt÷2 |
| execute | absolute R17 B10 | — | — | styles.css:1583–1599; PDF shell-edge offsets 34.0/20.6pt÷2 |
| suggestions | 0 5px | 26px | 11px 0 0 | styles.css:1610–1617; PDF list offset 9.6pt÷2, item gap 52.6pt÷2, shell↔list gap 22.2pt÷2 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-asistente | root column | styles.css:1269 | yes |
| .ds-asistente__greeting | saludo | styles.css:1275 | yes |
| .ds-asistente__shell | panel dialog | styles.css:1285 | yes |
| .ds-asistente__top | prompt + mic row | styles.css:1295 | yes |
| .ds-asistente__prompt (+ .ds-field overrides) | prompt field chrome reset | styles.css:1307–1353 | yes |
| .ds-asistente__mic | voice button | styles.css:1355 | yes |
| .ds-asistente__attach / __attach-plus / __attach-label | attach affordance | styles.css:1374–1424 | yes |
| .ds-asistente__execute | execute Button overrides | styles.css:1427–1451 | yes |
| .ds-asistente__suggestions / __suggestion | quick tasks | styles.css:1454–1475 | yes |
| (no BEM modifiers) | single appearance | knowledge/components/Asistente.md; PDF p.12 | n/a |

## Deltas & open questions (facts only — DO NOT resolve)

- **Scale bug fixed 2026-08-05:** this component's CSS was at raw @2× PDF scale instead of the ÷2 display scale every other PDF-context component in the kit uses (root/shell width 774→387, height 208→104, mic 36×20→18×10, attach-plus 11→6, execute 135×25→67×12, all offsets and font-sizes halved). See spec header for the vector-measurement evidence. Verified in Storybook (`Default`, `Playground`, including the typed-text `:not(:placeholder-shown)` state) before commit.
- **Chat/thread behavior is NOT implemented** — this is the static landing shell only (greeting + one prompt entry + static suggestions), not a real conversation surface. PDF explicitly specs «Chat tipo asistente IA» with history-driven behavior.
- **Dynamic per-user suggestions are NOT implemented** — `suggestions` is a plain static prop; PDF says these «van a ser dinámicas, según el perfil o el patrón de uso del usuario.» Computing that is an app-layer concern.
- **No `className` / `...props` / native-HTML-attrs passthrough** — inherited from the original `patterns/modal/Modal.tsx` as-is; divergence from the kit's «props extend native HTML» convention; not newly introduced by this promotion.
- **PDF shell padding legend ("20px 30px")** was not used as the source for shell padding — cross-checking it against the vector-measured prompt offset (33.5pt÷2≈16.75 vs the legend's 30) shows the legend's own numbers are ALSO raw @2× despite the "px" label, not pre-halved design notes. Layout continues to use absolute positioning (top/left/right/bottom offsets) derived directly from vector measurements rather than that padding note.
- **Greeting `text-transform: uppercase`:** PDF cites Uppercase; CSS does not set `text-transform` — demo copy is already uppercase.
- **Execute button type size** confirmed via vector text span (13.0pt @2× → 6.5px), not just inherited from modal styles.
- **Page-level wrapper** (ex-`.modal-screen` with `min-height: 100vh` + page padding) was dropped from the component; stories supply an equivalent decorator.
