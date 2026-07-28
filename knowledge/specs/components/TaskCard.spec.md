# TaskCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-task` (styles.css — PDF-context block)
- Export: packages/ui/src/components/TaskCard.tsx
- PDF reference: p. 3 (per knowledge/components/TaskCard.md — TARJETAS)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| corner accent | 19×19 | px | styles.css | display = 38÷2 |
| accent offset | right/top -9 | px | styles.css | display = -18÷2 |
| default max-width | 120 | px | styles.css | display = 240÷2 |
| default padding | 7.5px 5px | px | styles.css | display = 15/10 ÷2 |
| default gap | 8 | px | styles.css | was `--ds-space-4` → 8px calibrated |
| kanban max-width | 140 | px | styles.css | display = 280÷2 |
| kanban padding | 5 | px | styles.css | display = 10÷2 |
| kanban gap | 2.5 | px | styles.css | display = 5÷2 |
| `style` width/maxWidth | dropped | — | TaskCard.tsx (added 2026-07-28) | a consumer-supplied `style` prop has `width`/`maxWidth` stripped before being applied — closes a real gap where a wide grid column caused an agent to override the kanban cap via inline style instead of fixing the column. See anti-examples §9. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #2a2927 | --ds-color-pdf-surface-warm | styles.css | doc: «PDF TARJETAS» |
| border | #c1c1c1 | --ds-color-pdf-line | styles.css | — |
| code/status text | #ffffff | --ds-color-white | styles.css | — |
| title/description/meta | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| tone neutral accent | #c1c1c1 | --ds-color-pdf-line | styles.css | — |
| tone success accent | var(--ds-color-green) | --ds-color-green | styles.css | — |
| tone warning accent | var(--ds-color-amber) | --ds-color-amber | styles.css | — |
| tone danger accent | var(--ds-color-danger) | --ds-color-danger | styles.css | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| code (default) | var(--ds-font-mono) | 7px | 400 | 0 | 0.2 | uppercase | display = 14÷2 |
| status (default) | var(--ds-font-mono) | 9px | 700 | 0 | 0.2 | uppercase | display = 18÷2 |
| title (default) | var(--ds-font-body) | 8px | 300 | 0 | 1.2 | uppercase | display = 16÷2 |
| description | var(--ds-font-body) | 8px | 300 | UNVERIFIED | 1.45 | none | display = 16÷2 |
| meta (default) | var(--ds-font-mono) | 7px | 400 | 0 | 1.35 | uppercase | display = 14÷2 |
| title (kanban) | var(--ds-font-body) | 9px | (inherit 300) | — | 1.15 | uppercase | display = 18÷2 |
| code (kanban) | var(--ds-font-mono) | 6.5px | — | — | 1.25 | uppercase | display = 13÷2 |
| status (kanban) | var(--ds-font-mono) | 8px | — | — | 1.15 | uppercase | display = 16÷2 |
| meta (kanban) | var(--ds-font-mono) | 6.5px | — | — | 1.25 | uppercase | display = 13÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| default | 7.5px 5px | 8px | title margin 10px 0 0 0 | styles.css (display scale) |
| kanban | 5px | 2.5px | — | styles.css |
| meta default | — | 2.5px | — | styles.css |
| meta kanban | — | 1px | — | styles.css (hairline-sized gap from 2÷2) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-task--default | density/layout | styles.css | yes |
| .ds-task--kanban | density/layout; hides ::before | styles.css | yes |
| .ds-task--neutral | accent | styles.css | yes |
| .ds-task--success | accent | styles.css | yes |
| .ds-task--warning | accent | styles.css | yes |
| .ds-task--danger | accent | styles.css | yes |
| selected state | PDF #060606 | knowledge/components/TaskCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Doc Variants historically cited pre-calibration @2× numbers (gap 12px / kanban 300px / etc.); CSS now at display scale — compare docs after documentation pass.
- PDF selected state `#060606` not implemented (knowledge/components/TaskCard.md Known Limitations).
