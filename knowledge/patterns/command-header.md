---
id: command-header
name: Command Header
category: pattern
status: draft
storybook: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/Components.stories.tsx
last_reviewed: 2026-07-03
---

# Command Header

## Purpose

Page-level context strip that communicates alert state, mission title, and primary operator tools.

## Responsibilities

- Show urgent alert status via `Badge`.
- Present the page title as a display-scale heading.
- Group primary actions (filter, assign) on the trailing edge.
- Establish the top visual hierarchy for operational screens.

## Layout structure

Horizontal flex row (`alignItems: center`, `justifyContent: space-between`, `gap: 12`):

1. **Title block (left)** — danger `Badge` (“Alerta nueva”) above uppercase display `h1` (`2.4rem`, `var(--ds-font-display)`).
2. **Tool cluster (right)** — flex row (`gap: 10`) with secondary then primary `Button`.

## Components involved

| Component | Role |
|-----------|------|
| `Badge` | Alert state (`tone="danger"`, `dot`) |
| `Button` | Filtrar (`variant="secondary"`, `iconLeft`), Asignar (`iconRight`) |

External: `lucide-react` (`Filter`, `ArrowRight`). Native `h1` for the title.

## Composition rules

- Alert `Badge` sits above the title, not beside tools.
- Tools order: secondary/filter action first, primary/assign action last.
- Title uses display font and uppercase treatment.
- Do not embed search in this Storybook variant (search lives inside the Mission Panel in Operations Console). A search field appears in the demo app header only, not in this story.

## Responsive behavior

No breakpoints. The flex row does not wrap; narrow widths may squeeze the title and tools.

## When to use

- Top of operational dashboards that need alert context and primary actions.
- As the header region of Operations Console.

## When not to use

- In-card headers (use `Card` `eyebrow` / `title` / `actions` slots).
- Module grids or chart galleries that have no page chrome.
- Standalone filter bars without page title (use Filter Pair).

## Related patterns

- [Operations Console](./operations-console.md)
- [Mission Panel](./mission-panel.md)
- [Filter Pair](./filter-pair.md)
- [Actionable Alert](./actionable-alert.md)

## Known limitations

- Not extracted as a reusable component; duplicated conceptually with `apps/web` `ops-command` but with different tool sets (demo adds `TextField` search).
- No subtitle/mission context line in the Storybook variant.
- No responsive stacking of title and tools.
---
