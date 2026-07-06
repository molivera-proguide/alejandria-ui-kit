# Alejandria Design Principles

These principles define how visual decisions are made throughout the Alejandria Design System.

Every component must follow these principles.

When uncertainty exists, these principles take precedence over personal interpretation.

---

# Principle 01

## Fidelity over Interpretation

Visual fidelity is more important than aesthetic interpretation.

When the implementation differs from the canonical reference, the reference always wins.

Never modernize or redesign a component unless explicitly requested.

---

# Principle 02

## Prefer Omission over Invention

If a visual element is not present in the canonical reference, assume it is intentionally absent.

Never introduce visual elements without explicit justification.

Examples:

- progress bars
- icons
- badges
- shadows
- animations
- decorative effects

---

# Principle 03

## Whitespace Has Meaning

Whitespace is part of the design.

Do not compress layouts to fill empty space.

Spacing communicates hierarchy.

Empty space is intentional.

---

# Principle 04

## Hierarchy Before Decoration

Visual hierarchy should be created through:

- spacing
- typography
- position
- alignment

not through decorative elements.

---

# Principle 05

## Component Identity Is Sacred

Every component has a recognizable visual identity.

Variants inherit that identity.

Variants may adapt layout.

Variants must not redefine the component.

---

# Principle 06

## Variants Are Explicit

Components may have multiple variants.

Variants must always be explicitly declared.

Never interpolate between two variants.

Never combine visual characteristics from different variants.

---

# Principle 07

## Consistency Beats Creativity

The objective is implementation.

Not reinterpretation.

Consistency across the design system is more valuable than local visual improvements.

---

# Principle 08

## Documentation Is Part of the Component

Documentation is part of the implementation.

Whenever a component changes, its documentation should evolve accordingly.

Implementation and documentation should never diverge.

---

# Principle 09

## Preserve Public Contracts

Visual improvements should not introduce breaking API changes.

Whenever possible:

- preserve props
- preserve variants
- preserve accessibility
- preserve backwards compatibility

---

# Principle 10

## Small, Focused Changes

Implement the smallest change necessary to satisfy the request.

Avoid unrelated refactors.

Avoid changing components outside the requested scope.

Prefer incremental improvements over large rewrites.