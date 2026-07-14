---
id: component-id
name: Component Name
category: layout | navigation | data-display | feedback | input | overlay | utility
status: draft | stable | deprecated
since: 0.0.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Component.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ComponentName

aliases: []
keywords: []
tags: []

last_reviewed: YYYY-MM-DD
---

# Component Name

Component structure follows `knowledge/reasoning/component-archetype.md`.

## Purpose

Goal

Describe:

- Primary responsibility
- Problem solved
- Scope

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Document the public behaviors consumers can always rely on.

## This component guarantees

- ...

## This component never

- ...

---

# Constraints

These rules have the highest priority.

If any example conflicts with these rules,
always follow these rules.

## Required

- ...

## Forbidden

- ...

## Recommendations

- ...

---

# Category

| Field | Value |
|--------|-------|
| Type | atom / molecule / organism |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/... |

---

# Public API

Only document the public API.

Do not expose implementation details.

```tsx
import {
  Component,
  type ComponentProps
} from "@alejandria/ui-kit";
```

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|

---

# Variants

Describe every public visual variant.

## Default

...

---

# States

| State | Description |
|--------|-------------|

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- ...

### ARIA

| Attribute | Usage |
|-----------|-------|

### Keyboard

| Key | Action |
|-----|--------|

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

Do not document layout behavior provided by parent containers.

---

# Composition

## Purpose in Layout

Examples:

- Summary
- Detail
- Action
- Navigation
- Container

## Parent

- ...

## Children

- ...

## Siblings

- ...

## Alternatives

- ...

---

# Related Components

| Component | Relationship |
|-----------|--------------|

---

# Content Guidelines

## Labels

...

## Values

...

## Icons

...

## Localization

...

---

# Examples

## Basic

```tsx
<Component />
```

## Variant

```tsx
<Component variant="..." />
```

## Composition

```tsx
```

---

# Reasoning Examples

## User Request

...

### Recommended Components

- ...

### Why

...

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/...
```

## Dependencies

- ...

## DOM Structure

```text
```

---

# Known Limitations

- ...

---

# Future Improvements

- [ ]

---

# Changelog

| Version | Change |
|----------|--------|