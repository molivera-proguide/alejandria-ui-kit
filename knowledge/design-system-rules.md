# Alejandria Design System Rules

These rules define how UI components must consume the Design System.

The Design System owns the visual language.

Components consume it.

---

# Rule 01

## Tokens First

Before introducing any visual value, always look for an existing Design Token.

Prefer existing:

- color tokens
- typography tokens
- spacing tokens
- border tokens
- radius tokens
- elevation tokens
- transition tokens

Never duplicate an existing token.

---

# Rule 02

## Reuse Before Creating

If an appropriate token already exists, reuse it.

Do not create equivalent tokens with different names.

The Design System should remain cohesive.

---

# Rule 03

## Promote Reusable Values

If a new visual value will likely be reused by multiple components:

Create a Design Token first.

Then consume that token.

Do not hardcode reusable values inside components.

---

# Rule 04

## Hardcoded Values Are the Last Resort

Hardcoded values should only exist when:

- no suitable token exists;
- the value is truly component-specific;
- the value is unlikely to be reused.

Whenever a hardcoded value is introduced, consider whether it belongs in the Design System instead.

---

# Rule 05

## Components Do Not Define the Design Language

Components describe UI.

The Design System defines:

- colors
- spacing
- typography
- borders
- elevations
- transitions

Avoid redefining these primitives inside components.

---

# Rule 06

## Keep the Design System Small

Do not create tokens without a clear purpose.

Every new token should solve a reusable problem.

Avoid:

- duplicate colors
- duplicate spacing values
- duplicate typography scales

A smaller Design System is easier to maintain.

---

# Rule 07

## Preserve Naming Consistency

Follow the existing naming conventions.

Prefer extending the existing taxonomy over inventing new patterns.

Consistency is more important than personal preference.

---

---

# Rule 08

## Contextual Styling

A component may have different visual appearances across contexts.

Contextual styling is preferred when:

- semantic meaning is identical
- structure is identical
- interaction is identical

Do NOT create a new component solely because:

- colors change
- spacing changes
- typography scale changes
- borders change

Prefer contextual CSS or documented variants over component duplication.

---

---

# Rule 09

## Preserve Component Identity

A component should be reused only when its semantic role remains the same.

Visual adaptations are acceptable.

Semantic changes are not.

Ask:

- Does it communicate the same information?
- Does it serve the same purpose?
- Does it expose the same interaction?

If the answer is YES:

Reuse the component.

If the answer is NO:

Create a different component instead of forcing reuse.

---

---

# Rule 10

## Composition Before Specialization

When implementing a Pattern:

Prefer composing existing Design System components.

Do not specialize a component until composition has proven insufficient.

A Pattern should describe how components work together,
not redefine how they behave.

---

# Rule 11

## Responsive Breakpoints

A component or screen adapts to available space with one of two mechanisms. Never invent a third.

- **`@media`** — when the layout depends on the real viewport: page shells and screen-level layouts in `apps/web` (e.g. Operations Console), dark mode, `prefers-reduced-motion`, print.
- **`@container`** — when the component is reused across contexts of differing width within the same viewport (e.g. a `packages/ui/src/patterns` component embedded as a sidebar panel vs. rendered full-width). Requires the component's own root, or a wrapping ancestor, to declare `container-type: inline-size` — without it, `@container` rules never match, including inside Storybook decorators.

Do not use `@media` inside a reusable pattern/component whose rendered width is controlled by the consumer. Do not use `@container` for whole-screen shells that have no meaningful "container" narrower than the viewport.

### Breakpoint scale

Three reference widths, taken from existing measured usage rather than invented:

| Role | Value | Existing evidence |
|--------|------:|--------------------|
| `narrow` | `640px` | `apps/web/src/app.css` — `.ops-main` padding collapse |
| `medium` | `880px` | `apps/web/src/app.css` — `.ops-app` grid collapses to `1fr` |
| `wide` | `1180px` | `apps/web/src/app.css` — `.ops-command` / `.ops-lower` grid collapses to `1fr` |

Use the nearest role's value verbatim in any new `@media` rule.

**`@container` needs an adjustment, not the verbatim value.** A `max-width`/`min-width` container query is evaluated against the query container's **content-box**, not its border-box — if the container element carries its own `padding`/`border` (the common case: the component's root is also the query container), that chrome must be subtracted from the role value before it goes into the condition, or the rule fires at the wrong rendered width — see `packages/ui/src/patterns/detail-sheet/detail-sheet.css` for a real instance (`640px` role → `598.5px` condition after subtracting `40px` padding + `1.5px` border; unadjusted, the rule matched at every width the component could render, and the two-column layout never appeared). Comment the arithmetic at the call site so it can be recomputed if the component's padding/border changes.

Do not introduce a fourth step, or an off-scale value, without registering it here first (Rule 06 — keep the system small). The content-box adjustment above is not a new step — it is the same role, translated into the container's local box model.

### Why there is no `--ds-breakpoint-*` custom property

Unlike color or spacing tokens, these values cannot be consumed with `var()` inside a `@media`/`@container` prelude — CSS custom properties do not resolve inside at-rule conditions, and this project has no build-time preprocessor (no PostCSS `custom-media`, no Sass) to fill that gap. The table above is a **documented literal scale**, not a machine-enforced token: copy the pixel value by hand into the rule, and comment which role it matches — see `detail-sheet.css` for this project's existing convention of commenting non-obvious CSS decisions.

---

# Decision Order

> Superseded by `knowledge/reasoning/decision-order.md`.

When introducing a visual value:

1. Reuse an existing Design Token.
2. Reuse an existing Design System scale.
3. Create a new Design Token if the value is reusable.
4. Use a hardcoded value only when it is truly component-specific.

Hardcoded values should never be the first option.