---
id: alert-stack
name: Alert Stack
category: pattern
status: draft
storybook: Alejandria/AlertBanner/Tones
source: packages/ui/src/components/AlertBanner.stories.tsx
last_reviewed: 2026-07-03
---

# Alert Stack

## Purpose

Vertical list of alert severities for reviewing multiple concurrent operational signals.

## Responsibilities

- Stack multiple `AlertBanner` instances in a single column.
- Show the full tone range (info, success, warning, danger).
- Pair each banner with an appropriate icon and description.

## Layout structure

Single-column CSS grid:

```
display: grid
gap: 12
```

Demo order in `Tones`: info → success → warning → danger. Equal width banners.

## Components involved

| Component | Role |
|-----------|------|
| `AlertBanner` ×4 | Severity banners |

External: `lucide-react` (`Info`, `CheckCircle2`, `RadioTower`, `AlertTriangle`).

## Composition rules

- One banner per operational signal; do not nest banners.
- Use tone-appropriate icons.
- Stack is vertical only; do not place banners in a horizontal row.
- Action slots are optional; for inline resolution actions use Actionable Alert.

## Responsive behavior

Full-width banners in a single column. Story decorator sets `minWidth: 620`. No additional breakpoints.

## When to use

- Reviewing multiple concurrent alerts of different severities.
- Tone galleries and alert inventory views.

## When not to use

- Single critical alert with a resolution action (use Actionable Alert).
- Page-level alert chip in a header (use Command Header `Badge`).
- Toast/notification systems (not implemented).

## Related patterns

- [Actionable Alert](./actionable-alert.md)
- [Command Header](./command-header.md)
- [Operations Console](./operations-console.md)

## Known limitations

- No stacking limit, dismiss controls, or grouping.
- Not composed with Command Header or Operations Console in any story.
- No live feed or chronological ordering semantics beyond story order.
---
