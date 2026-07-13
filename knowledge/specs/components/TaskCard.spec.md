# TaskCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-task` (styles.css:585–722)
- Export: packages/ui/src/components/TaskCard.tsx
- PDF reference: p. 1 (per knowledge/components/TaskCard.md — TARJETAS)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css:587 | — |
| corner accent | 38×38 | px | styles.css:600; styles.css:605 | doc matches «38×38px» |
| accent offset | right/top -18 | px | styles.css:602–styles.css:603 | — |
| default max-width | 240 | px | styles.css:610 | doc matches |
| default padding | 15px 10px | px | styles.css:611 | doc matches «padding: 15px 10px (PDF)» |
| default gap | 16 | px | styles.css:609 | doc Variants also state gap 12px — DELTA |
| kanban max-width | 280 | px | styles.css:616 | doc Variants state 300px — DELTA |
| kanban padding | 10 | px | styles.css:617 | doc matches |
| kanban gap | 5 | px | styles.css:615 | doc Variants state 6px — DELTA |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #2a2927 | --ds-color-surface (semantic dup) | styles.css:586 | doc: «PDF TARJETAS» |
| border | #c1c1c1 | --ds-color-line (semantic dup) | styles.css:587 | — |
| code/status text | #ffffff | UNTOKENIZED — candidate | styles.css:646; styles.css:657 | — |
| title/description/meta | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:668; styles.css:679; styles.css:688 | Design Tokens table in doc also lists title under #ffffff in one place — DELTA within doc |
| tone neutral accent | #c1c1c1 | UNTOKENIZED — candidate | styles.css:626 | — |
| tone success accent | var(--ds-color-green) | --ds-color-green | styles.css:630 | — |
| tone warning accent | var(--ds-color-amber) | --ds-color-amber | styles.css:634 | — |
| tone danger accent | var(--ds-color-danger) | --ds-color-danger | styles.css:638 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| code (default) | var(--ds-font-mono) | 14px | 400 | 0 | 0.2 | uppercase | styles.css:645–styles.css:653 |
| status (default) | var(--ds-font-mono) | 18px | 700 | 0 | 0.2 | uppercase | styles.css:656–styles.css:664 |
| title (default) | var(--ds-font-body) | 16px | 300 | 0 | 1.2 | uppercase | styles.css:667–styles.css:675 |
| description | var(--ds-font-body) | 16px | 300 | UNVERIFIED | 1.45 | none | styles.css:678–styles.css:684 |
| meta (default) | var(--ds-font-mono) | 14px | 400 | 0 | 1.35 | uppercase | styles.css:687–styles.css:696 |
| title (kanban) | var(--ds-font-body) | 18px | (inherit 300) | — | 1.15 | uppercase | styles.css:703–styles.css:705 |
| code (kanban) | var(--ds-font-mono) | 13px | — | — | 1.25 | uppercase | styles.css:708–styles.css:710 |
| status (kanban) | var(--ds-font-mono) | 16px | — | — | 1.15 | uppercase | styles.css:713–styles.css:715 |
| meta (kanban) | var(--ds-font-mono) | 13px | — | — | 1.25 | uppercase | styles.css:718–styles.css:721 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| default | 15px 10px | 16px | title margin 20px 0 0 0 | styles.css:609–styles.css:611; styles.css:674 |
| kanban | 10px | 5px | — | styles.css:615–styles.css:617 |
| meta default | — | 5px | — | styles.css:700 |
| meta kanban | — | 2px | — | styles.css:720 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-task--default | density/layout | styles.css:608 | yes |
| .ds-task--kanban | density/layout; hides ::before | styles.css:614; styles.css:620 | yes |
| .ds-task--neutral | accent | styles.css:625 | yes |
| .ds-task--success | accent | styles.css:629 | yes |
| .ds-task--warning | accent | styles.css:633 | yes |
| .ds-task--danger | accent | styles.css:637 | yes |
| selected state | PDF #060606 | knowledge/components/TaskCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Default gap CSS `16px` (styles.css:609) vs doc Variants/Behavioral Contract `gap: 12px` (knowledge/components/TaskCard.md).
- Kanban max-width CSS `280px` (styles.css:616) vs doc `300px`.
- Kanban gap CSS `5px` (styles.css:615) vs doc `6px`.
- Status size CSS `18px` (styles.css:660) vs Props text «20px» in knowledge/components/TaskCard.md.
- Title color CSS `#8a8b87` (styles.css:668) vs some Design Tokens rows listing title with `#ffffff`.
- PDF selected state `#060606` not implemented (knowledge/components/TaskCard.md Known Limitations).
