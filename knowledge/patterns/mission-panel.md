---
id: mission-panel
name: Mission Panel
category: pattern
status: draft
storybook: Alejandria/Card/WithActionsAndFooter
also_in: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/Card.stories.tsx
last_reviewed: 2026-07-03
---

# Mission Panel

## Purpose

Focused mission summary: progress, key figures, and quick actions inside a `Card` shell — used as a sidebar panel or standalone mission widget.

## Responsibilities

- Frame mission context with eyebrow, title, and description.
- Anchor progress with `ProgressRing`.
- Surface key figures or a search field in the body.
- Provide footer status (`Badge`) and a secondary action (`Button`).

## Layout structure

Two Storybook variants:

### WithActionsAndFooter (canonical)

`Card` with:

- Header: eyebrow “Mision”, title, description, `actions` icon.
- Body: grid `auto 1fr` — `ProgressRing` left, stat block right (`strong` value + mono caption).
- Footer: success `Badge` + secondary `Button` (“Ver tarea”).

### Operations Console side card

`Card` with:

- Header: eyebrow, title “Pronostico”, description, `Crosshair` action.
- Body: centered stack — `ProgressRing` (lg, warning) above `TextField` search.
- Footer: info `Badge` + secondary `Button` (“Ver log”).

## Components involved

| Component | Role |
|-----------|------|
| `Card` | Shell with header/body/footer slots |
| `ProgressRing` | Mission progress |
| `Badge` | Status chip in footer |
| `Button` | Secondary footer action |
| `TextField` | Task search (Operations Console variant only) |

External: `lucide-react` (`Eye`, `Crosshair`, `Search`).

## Composition rules

- Always use `Card` slots (`eyebrow`, `title`, `description`, `actions`, `footer`, children) rather than custom chrome.
- `ProgressRing` is the visual anchor in the body.
- Footer pairs status `Badge` with a small secondary `Button`.
- Inline stat blocks in `WithActionsAndFooter` bypass `MetricCard`; do not mix both patterns in the same panel body without intent.
- Body layout may be horizontal (ring + stats) or vertical (ring + field); both are valid mission panel compositions.

## Responsive behavior

Stories use fixed decorator widths (`minWidth: 420` for Card stories; panel sits in `0.7fr` column in Operations Console). No breakpoints.

## When to use

- Sidebar or overlay mission summaries on operational views.
- Compact progress + action widgets for a single mission focus.

## When not to use

- Full KPI strips (use Metrics Row).
- Multi-task workload grids (use Task Board).
- Body-only content without mission chrome (trivial `Card` body-only story is not this pattern).

## Related patterns

- [Operations Console](./operations-console.md)
- [Command Header](./command-header.md)
- [Task Board](./task-board.md)
- [Metrics Row](./metrics-row.md)

## Known limitations

- Three body layouts exist across Storybook and demo app without a shared `MissionPanel` component.
- Map-overlay variant (`ops-map__panel`) lives only in `apps/web`, not Storybook.
- Inline typography for stats does not use `MetricCard`.
- Not a full Ficha (detail sheet) screen.
---
