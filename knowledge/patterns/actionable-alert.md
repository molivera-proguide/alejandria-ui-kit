---
id: actionable-alert
name: Actionable Alert
category: pattern
status: draft
storybook: Alejandria/AlertBanner/WithAction
source: packages/ui/src/components/AlertBanner.stories.tsx
last_reviewed: 2026-07-03
---

# Actionable Alert

## Purpose

Critical alert with an inline resolution action for operator response workflows.

## Responsibilities

- Communicate a high-severity signal with title and description.
- Provide a primary destructive/resolution action in the banner `action` slot.
- Keep icon, content, and action in one horizontal banner layout.

## Layout structure

Single `AlertBanner` with `action` slot populated. Internal banner layout is a three-region grid: icon | content | action.

Story configuration:

- `tone="danger"`
- Title: “Alerta critica”
- Description: zone requires immediate reassignment
- `icon`: `AlertTriangle`
- `action`: `Button` size `sm`, variant `danger`, label “Resolver”

## Components involved

| Component | Role |
|-----------|------|
| `AlertBanner` | Alert shell with `action` slot |
| `Button` | Resolution action (`sm`, `danger`) |

External: `lucide-react` (`AlertTriangle`).

## Composition rules

- Use the `action` slot; do not place buttons inside `description`.
- Prefer `danger` tone + danger button for critical resolution.
- Keep action labels short and imperative (“Resolver”).
- Do not stack multiple actionable alerts unless each signal needs its own action (combine with Alert Stack only when intentional).

## Responsive behavior

Story decorator `minWidth: 620`. Banner internal grid may compress on narrow widths; no dedicated breakpoints.

## When to use

- Critical alerts that require an immediate operator response.
- Inline resolution CTAs without leaving the alert context.

## When not to use

- Passive multi-severity review (use Alert Stack).
- Header-level alert chips without body copy (use Command Header `Badge`).
- Non-critical informational notices without actions.

## Related patterns

- [Alert Stack](./alert-stack.md)
- [Command Header](./command-header.md)
- [Operations Console](./operations-console.md)

## Known limitations

- Only one Storybook example.
- Not shown combined with Alert Stack or Command Header.
- No dismiss, acknowledge, or undo flows.
---
