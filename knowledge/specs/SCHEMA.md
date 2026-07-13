# Numeric Specification Schema

Canonical schema for every `knowledge/specs/components/*.spec.md` file.
All specs in this layer MUST use this structure identically.

## File naming

`knowledge/specs/components/<ExportName>.spec.md`

`<ExportName>` matches the React export name in `packages/ui/src/index.ts`.

## Required document structure

```md
# <Component> — Numeric Specification

- Status: measured | partial | unverified
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-<x>` (styles.css:<start>–<end>)
- Export: packages/ui/src/components/<Component>.tsx
- PDF reference: p.<N> (per knowledge/components/<Component>.md) | none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |

## Color
| Role (e.g. background/border/text) | Value | Matching --ds-* token? | Source | Delta |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |

## Spacing
| Region | Padding | Gap | Margin | Source |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |

## Deltas & open questions (facts only — DO NOT resolve)
- <implemented value> vs <doc/PDF value>, styles.css:<line>
```

## Field rules

1. Every numeric or color value MUST carry a source citation (`styles.css:<line>`, `knowledge/components/<Name>.md`, or PDF page). Never write a bare number.
2. Prefer **implemented CSS** as the measured value in tables; put PDF/doc alternatives in the Delta column or in **Deltas & open questions**.
3. Status meanings:
   - `measured` — CSS block fully scanned; values cited; PDF cross-check done where a page is cited.
   - `partial` — CSS measured, but PDF page not cited in the component doc, or some modifiers lack CSS, or material doc/CSS deltas remain.
   - `unverified` — required values cannot be traced to CSS, doc, or PDF.
4. `UNVERIFIED` is written instead of guessing.
5. Do not invent components, tokens, or values.
6. Structural prose in this layer is English. Spanish from component docs is preserved verbatim when quoting.
7. Do not resolve deltas in this layer — record them only.

## Source-of-truth order

1. PDF page cited by the component doc (`knowledge/references/design-reference.pdf`)
2. Stated numeric values in `knowledge/components/<Name>.md`
3. Implemented CSS in `packages/ui/src/styles.css`

When sources disagree, record both and flag a delta. Do not pick a winner here.
