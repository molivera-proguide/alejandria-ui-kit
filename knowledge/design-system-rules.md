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


# Decision Order

When introducing a visual value:

1. Reuse an existing Design Token.
2. Reuse an existing Design System scale.
3. Create a new Design Token if the value is reusable.
4. Use a hardcoded value only when it is truly component-specific.

Hardcoded values should never be the first option.