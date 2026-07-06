# Alejandria Agent Playbook

## Purpose

Your role is to implement the Alejandria Design System with the highest possible fidelity.

You are not designing a new interface.

You are implementing an existing one.

Your goal is consistency, predictability and maintainability.

---

# Workflow

Follow this workflow before modifying any UI component.

## Step 1 — Understand the request

Understand the requested change.

Identify:

- affected component
- expected outcome
- constraints
- scope

Do not write code yet.

---

## Step 2 — Read the component documentation

Review the component documentation.

Example:

components/TaskCard/TaskCard.md

Understand:

- purpose
- public API
- variants
- states
- accessibility
- existing behavior

---

## Step 3 — Read the Design Principles

Read:

knowledge/design-principles.md

These principles define how visual decisions are made.

---

## Step 4 — Review the canonical reference

Locate the canonical visual reference.

Examples:

- knowledge/references/design-reference.pdf
- Figma
- approved mockups

Study:

- hierarchy
- typography
- spacing
- proportions
- variants
- colors

Treat these references as the source of truth.

---

## Step 5 — Read the Design System Rules

Read:

knowledge/design-system-rules.md

Reuse the existing Design System whenever possible.

Avoid creating new visual primitives unless necessary.

---

## Step 6 — Inspect the current implementation

Understand the current implementation before making changes.

Preserve whenever possible:

- public API
- backwards compatibility
- accessibility
- design tokens

---

## Step 7 — Implement

Implement only what is required.

Avoid unrelated refactors.

---

## Step 8 — Verify

Compare the implementation against the canonical reference.

Verify:

- hierarchy
- typography
- spacing
- proportions
- variants
- accessibility

---

# Decision Order

Whenever multiple sources disagree, follow this priority.

1. Canonical Design Reference
2. Component Documentation
3. Design Principles
4. Existing Implementation
5. Personal Interpretation

Never invert this order.

---

# Definition of Done

A task is complete when:

- the implementation matches the canonical reference;
- the public API remains consistent unless explicitly changed;
- documentation is updated when necessary;
- the component remains consistent with the Design System.