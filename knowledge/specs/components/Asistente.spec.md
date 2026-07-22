# Asistente — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 12) > component doc > implemented CSS
- CSS block: `.ds-asistente` (styles.css:1269–1477)
- Export: packages/ui/src/components/Asistente.tsx
- PDF reference: p.12 ASISTENTE (knowledge/components/Asistente.md; knowledge/references/pdf-text-extract.md § Page 12)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root / shell width | 774 | px | styles.css:1272 / 1291 | **raw @2×** — calibrated display would be ~387px (774÷2); see deltas |
| shell height | 208 | px | styles.css:1289 | **raw @2×** — calibrated ~104px |
| shell padding (PDF) | 20 / 30 | px (@2× annotation) | PDF «Padding: 20px 30px» | **NOT applied as CSS padding** — layout uses absolute offsets inside the shell (inherited from modal pattern) |
| mic hit | 36×20 | px | styles.css:1362–1365 | **raw @2×** |
| mic svg | 28×20 | px | styles.css:1370–1371 | **raw @2×** |
| attach-plus | 11×11 | px | styles.css:1391–1393 | **raw @2×** |
| execute width / min-height | 135 / 25 | px | styles.css:1436–1442 | **raw @2×** |
| border | var(--ds-border-width-hair) → 0.75 | px | styles.css:1287; PDF 0,75pt | hairline; out of ÷2 scope |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| shell background | var(--ds-color-pdf-surface) → #060606 | --ds-color-pdf-surface | styles.css:1286; PDF Fondo #060606 | exact match |
| shell border / greeting | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1287 / 1276; PDF #c1c1c1 | exact match |
| prompt empty / attach / mic / suggestions | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1331 / 1377 / 1386 / 1465; PDF #8a8b87 | exact match |
| prompt typed | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1351–1353; PDF «cuando se escribe pasa a #FFFFFF» | exact match via `:not(:placeholder-shown)` |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| greeting | var(--ds-font-display) (Source Code Pro) | 24px (**raw @2×**; PDF 24pt → display 12px if calibrated) | 400 | var(--ds-tracking-none) | var(--ds-leading-snug) | uppercase in demo copy; CSS has no `text-transform` | styles.css:1275–1282 |
| prompt (tarea) | var(--ds-font-body) (Montserrat) | 18px (**raw @2×**) | 300 (`--ds-font-weight-light`) | none | var(--ds-leading-normal) | none | styles.css:1330–1338 |
| attach | var(--ds-font-body) | 14px (**raw @2×**) | 300 | none | var(--ds-leading-normal) | none | styles.css:1419–1424 |
| suggestions | var(--ds-font-display) | 14px (**raw @2×**) | 400 | none | var(--ds-leading-label) | none | styles.css:1463–1472 |
| execute | var(--ds-font-body) | 13px (**raw @2×**) | 700 | none | — | uppercase (`text-transform`) | styles.css:1427–1443; PDF label «EJECUTAR» — size not annotated on p.12 for the button itself |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | — | — | styles.css:1269–1273 |
| greeting | — | — | 0 0 9px 8px | styles.css:1282; **raw @2×** |
| top row | absolute L34 R22 T16 | var(--ds-space-3) | — | styles.css:1295–1304; **raw @2×** offsets |
| attach | absolute L38 T86 | 10px | — | styles.css:1374–1385; **raw @2×** |
| execute | absolute R34 B21 | — | — | styles.css:1427–1443; **raw @2×** |
| suggestions | 0 10px | 53px | 22px 0 0 | styles.css:1454–1460; **raw @2×** |
| PDF shell padding | 20px 30px (@2×) | — | — | PDF only — not on `.ds-asistente__shell` |

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

- **Scale bug carried forward on purpose:** this component's CSS is at raw @2× PDF scale, not the ÷2 display scale every other PDF-context component in the kit uses. It will render roughly 2× larger relative to siblings if placed together. Deliberately not fixed in this promotion pass (human maintainer's call); flag for a future dedicated calibration pass. (Same values previously lived in `patterns/modal/modal.css`.)
- **Chat/thread behavior is NOT implemented** — this is the static landing shell only (greeting + one prompt entry + static suggestions), not a real conversation surface. PDF explicitly specs «Chat tipo asistente IA» with history-driven behavior.
- **Dynamic per-user suggestions are NOT implemented** — `suggestions` is a plain static prop; PDF says these «van a ser dinámicas, según el perfil o el patrón de uso del usuario.» Computing that is an app-layer concern.
- **No `className` / `...props` / native-HTML-attrs passthrough** — inherited from the original `patterns/modal/Modal.tsx` as-is; divergence from the kit's «props extend native HTML» convention; not newly introduced by this promotion.
- **PDF shell padding 20px 30px** is not applied as CSS `padding` on `.ds-asistente__shell`; layout uses absolute positioning (top/left/right/bottom offsets) carried from the modal pattern.
- **Greeting `text-transform: uppercase`:** PDF cites Uppercase; CSS does not set `text-transform` — demo copy is already uppercase.
- **Execute button type size** is not annotated on PDF p.12 (only the EJECUTAR label appears); CSS uses `13px` bold uppercase from the inherited modal styles.
- **Page-level wrapper** (ex-`.modal-screen` with `min-height: 100vh` + page padding) was dropped from the component; stories supply an equivalent decorator.
