# Alejandria Anti-Patterns

This document describes common implementation mistakes observed while building the Alejandria Design System.

Avoid these patterns unless explicitly requested.

---

# Anti-Pattern 01

## Inventing Missing UI

If a visual element is absent from the canonical reference,
assume it is intentionally absent.

Never invent:

- progress bars
- icons
- badges
- buttons
- actions
- labels
- charts

Prefer omission over invention.

---

# Anti-Pattern 02

## Mixing Component Variants

Variants are independent visual representations.

Do not interpolate between variants.

Do not combine characteristics from multiple variants.

Every implementation must correspond to one explicit variant.

---

# Anti-Pattern 03

## Borrowing From Other Components

Do not reuse visual ideas simply because another component uses them.

Example:

A MetricCard uses a progress bar.

This does NOT imply that a TaskCard should have one.

Component identity always takes precedence.

---

# Anti-Pattern 04

## Modernizing Existing Designs

Do not redesign existing components.

Do not make them "cleaner".

Do not make them "more modern".

Do not make them "more minimal".

The objective is fidelity.

Not reinterpretation.

---

# Anti-Pattern 05

## Compressing Whitespace

Do not reduce spacing simply because empty space exists.

Whitespace communicates hierarchy.

Empty space is intentional.

---

# Anti-Pattern 06

## Filling Empty Areas

Unused space does not indicate missing content.

Do not fill visual gaps with:

- icons
- progress indicators
- statistics
- actions
- decorative elements

---

# Anti-Pattern 07

## Ignoring Design Tokens

Do not introduce inline values when an equivalent Design Token already exists.

Always search for reusable tokens first.

---

# Anti-Pattern 08

## Duplicating Tokens

Do not create multiple tokens representing the same visual value.

Extend the existing Design System.

Do not fragment it.

---

# Anti-Pattern 09

## Breaking Public APIs

Visual improvements should not require API changes.

Preserve backwards compatibility whenever possible.

---

# Anti-Pattern 10

## Refactoring Outside the Scope

Do not modify unrelated components.

Do not reorganize the project.

Do not rename APIs.

Do not perform cleanup unrelated to the requested task.

Implement only what is required.

---

# Anti-Pattern 11

## Trusting the Existing Implementation More Than the Reference

When implementation and canonical reference differ:

The reference wins.

Always converge toward the approved design.

---

# Anti-Pattern 12

## Hardcoding Design Language

Components should not define:

- colors
- typography
- spacing scales
- border styles

Consume the Design System.

Do not recreate it.

---

# Anti-Pattern 13

## Mixed Interaction APIs in Composite Components

A Design System component must not expose multiple interaction paradigms
for the same functional responsibility.

Do not combine declarative APIs and explicit APIs when they represent
the same interaction domain.

------------------------------------------------------------------------

### ❌ Incorrect

``` ts
actions?: Action[];

onEdit?: () => void;
onDelete?: () => void;
onClose?: () => void;
```

------------------------------------------------------------------------

### ⚠️ Decision Rule (MANDATORY)

When a component requires actions or interactions, evaluate its
extensibility first.

#### 1. Open or extensible interaction domains

Use the declarative model:

``` ts
actions: Action[];
```

Use this model when:

-   the number of actions may grow
-   the component is reusable across the Design System
-   consumers may extend its behavior

#### 2. Closed or highly specific interaction domains

An explicit model may be preferred when it improves clarity:

``` ts
onEdit?: () => void;
onDelete?: () => void;
onClose?: () => void;
```

An explicit API is appropriate when:

- the action set is fixed by design
- the interaction domain represents a specific, well-defined responsibility
- future extensibility is not expected
- the explicit API is clearer than an equivalent declarative model

------------------------------------------------------------------------

### 🚫 Absolute Rule

Each interaction domain within a component must expose a single interaction model.

Never expose multiple interaction models for the same interaction domain.

### Example

Correct

```ts
onEdit?: () => void;
onDelete?: () => void;

actions?: Action[];
```

Utilities and footer actions are different interaction domains.

---

Incorrect

```ts
actions?: Action[];

onPrimaryAction?: () => void;
onSecondaryAction?: () => void;
```

Both APIs represent the same footer interaction domain.

------------------------------------------------------------------------

### 📌 Applies to

-   Composite cards (InvestigationCard, MetricCard)
-   Dialogs with multiple actions
-   Headers with contextual actions

---

# Anti-Pattern 14
## Unnecessary Abstraction

Do not introduce additional abstraction unless it provides clear value.

Avoid creating:
- wrapper types
- configuration objects
- resolver functions
- indirection layers
- metadata registries

when the existing implementation is already:

- explicit
- stable
- predictable

Abstraction must improve at least one of:

- extensibility
- reusability
- maintainability
- expressiveness

Otherwise, keep the simpler implementation.