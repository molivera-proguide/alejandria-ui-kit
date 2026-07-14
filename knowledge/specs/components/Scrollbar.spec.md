# Scrollbar — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 13) > component doc > implemented CSS
- CSS block: `.ds-scrollbar` (styles.css:1545–1569)
- Export: packages/ui/src/components/Scrollbar.tsx
- PDF reference: p.13 MISCELÁNEAS (knowledge/components/Scrollbar.md); vectors via PDF drawings

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| track width | 7.5 | px | styles.css:1550; PDF drawing w 15.088989 ÷2 | PDF artboard 15.09; display 7.54→7.5 |
| thumb width | 4.5 | px | styles.css:1563; PDF drawing w 8.984 ÷2 | PDF 8.98; display 4.49→4.5 |
| thumb lateral inset | 1.5 | px | styles.css:1562; PDF left inset 2.889 ÷2 | PDF right inset 3.216 ÷2 ≈1.61; CSS uses 1.5 both sides |
| thumb end inset (extremes) | 4.5 | px | styles.css:1560–1561; PDF top gap 9.118 ÷2 | — |
| demo track height (story) | 121.5 | px | Scrollbar.stories.tsx; PDF h 242.756 ÷2 | not a CSS default on `.ds-scrollbar` (`height: 100%`) |
| demo thumb height (PDF pose) | 21.08 | px | PDF h 42.159 ÷2 | achieved via thumbSize 17.4% of 121.5 ≈ 21.1 |
| border-radius track/thumb | 999 | px | styles.css:1554, styles.css:1565; PDF capsule beziers | — |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| track fill | var(--ds-color-pdf-action) (#494949) | --ds-color-pdf-action | styles.css:1555; PDF fill (0.286,0.286,0.286) | exact match |
| thumb fill | var(--ds-color-pdf-surface-warm) (#2a2927) | --ds-color-pdf-surface-warm | styles.css:1566; PDF fill (0.165,0.161,0.153) | exact match |
| page demo bg (story only) | #e6e6e6 | --ds-color-pdf-line-light | Scrollbar.stories.tsx; PDF page fill ≈0.902 | story uses token hex equivalent |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| — | — | — | — | — | — | — | no text in component |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| thumb vs track (lateral) | inset 1.5px | — | — | styles.css:1562 |
| thumb vs track (end at value=0) | top 4.5px | — | — | styles.css:1560 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-scrollbar | track chrome | styles.css:1545 | yes |
| .ds-scrollbar__thumb | thumb chrome + position calc | styles.css:1557 | yes |
| (no BEM modifiers) | — | knowledge/components/Scrollbar.md | n/a |

## Related: `.ds-scroll-area` utility (not this component)

`Scrollbar` is a **visual indicator** (props drive thumb position). For a region that actually scrolls, apply `.ds-scroll-area` (optional `.ds-scroll-area--x` / `--y`) in `styles.css` — native overflow styled with `--ds-color-pdf-action` thumb, transparent track, WebKit thickness **7.5px** (same as `.ds-scrollbar` track width). Documented in [Scrollbar.md](../../components/Scrollbar.md). Firefox: thin + color only (no pill radius).

## Deltas & open questions (facts only — DO NOT resolve)
- PDF track height 242.76 and thumb height 42.16 are demo pose sizes; CSS track uses `height: 100%`, thumb height via `--ds-scrollbar-thumb-size` default 17.4% (styles.css:1547).
- PDF left/right thumb insets differ slightly (2.889 vs 3.216 artboard px); CSS uses symmetric 1.5 display px.
- Track/thumb width rounded to 0.5px steps (7.5 / 4.5) from ÷2 of PDF floats.
- No hover, focus-visible, disabled, or horizontal geometry in PDF p.13 or CSS block.
- `aria-orientation="vertical"` only; no horizontal drawing on p.13.
