# Visual Analysis Protocol

## Purpose

This document defines how AI agents must analyze visual references before implementing UI.

The goal is not to generate code faster.

The goal is to maximize fidelity between the original design and the implemented component.

Implementation is forbidden until the complete visual analysis has finished.

---

# Core Principle

Never implement what you think the designer meant.

Implement only what is visibly present.

If something is ambiguous, preserve the ambiguity and ask for clarification instead of inventing a solution.

The design reference is the source of truth.

---

# Fundamental Rules

- Never redesign layouts.
- Never modernize the UI.
- Never simplify compositions.
- Never merge visual groups.
- Never split visual groups.
- Never replace a layout with one that seems more common.
- Never infer responsive behavior unless explicitly documented.
- Never normalize spacing.
- Never improve typography.
- Never "clean up" the interface.

Every visible decision should be considered intentional.

---

# Visual Analysis Pipeline

Implementation MUST follow these passes in order.

Do not skip passes.

Do not combine passes.

---

## PASS 0 — Suspend Assumptions

Before starting the analysis:

Forget common dashboard layouts.

Forget Material Design.

Forget Ant Design.

Forget Bootstrap.

Forget previous implementations.

Forget patterns from other screens.

Assume the designer intentionally made every visible decision.

Your job is to discover the design, not to recreate one from memory.

---

## PASS 1 — Screen Segmentation

Ignore implementation.

Ignore components.

Identify only the major visual regions.

Questions:

- How many independent regions exist?
- Where does each region begin and end?
- Which region visually dominates?
- Which regions are secondary?

Output:

- Region list
- Region hierarchy

---

## PASS 2 — Information Hierarchy

Ignore spacing.

Ignore colors.

Identify communication hierarchy.

Questions:

- What does the user read first?
- What is visually emphasized?
- What is contextual information?
- What is supporting information?

Output:

Ordered reading hierarchy.

---

## PASS 3 — Visual Grouping

Detect groups before detecting components.

Questions:

- Which elements visually belong together?
- Which spacing suggests grouping?
- Which separators define boundaries?

Never regroup elements differently.

---

## PASS 4 — Component Discovery

Only now identify reusable components.

Examples:

- Cards
- Badges
- Chips
- Buttons
- Lists
- Tabs
- Inputs
- Panels

Do not invent reusable components.

If something appears unique, keep it unique.

---

## PASS 5 — Component Composition

For every detected component identify:

- children
- visual order
- nested groups
- alignment
- spacing relationships

Do not optimize composition.

---

## PASS 6 — Layout Analysis

Only after components are identified.

Identify:

- rows
- columns
- alignment
- padding
- gap
- margins
- distribution

Never estimate from memory.

Use only visible evidence.

---

## PASS 7 — Typography

Identify:

- hierarchy
- font size relationships
- weight
- alignment
- casing
- spacing

Do not normalize typography.

Respect visual proportions.

---

## PASS 8 — Tokens

Infer only after all previous passes.

Identify:

- colors
- borders
- radius
- elevation
- shadows
- opacity

Reuse existing design tokens whenever possible.

If a token does not exist, report it.

Do not create new tokens automatically.

---

## PASS 9 — Interaction Analysis

Infer interaction only from visual evidence.

Possible interaction cues:

- Buttons
- Hover affordances
- Navigation
- Editable fields
- Actions
- Status indicators

Never invent interactions.

---

## PASS 10 — Fidelity Review

Before implementation ask:

Did I move anything?

Did I regroup anything?

Did I simplify anything?

Did I replace a layout?

Did I infer missing information?

Did I invent spacing?

Did I invent hierarchy?

Did I add visual polish?

If any answer is YES:

Stop.

Return to analysis.

**Before declaring implementation done**, run the checkable numeric gate: [`reasoning/fidelity-validation.md`](./reasoning/fidelity-validation.md) (spec comparison, @2× display-scale check, token/reuse check). That document operationalizes this pass; it does not replace Passes 0–9.

Contrastive failure modes: [`guidelines/anti-examples.md`](./guidelines/anti-examples.md).

---

# Missing Information

If the visual reference does not provide enough information:

Do not invent.

Instead report:

- Missing state
- Missing spacing
- Missing behavior
- Missing interaction
- Missing typography

---

# Expected Deliverable Before Coding

Before generating React components the agent should be capable of describing:

- Screen regions
- Reading hierarchy
- Visual groups
- Component inventory
- Layout tree
- Typography hierarchy
- Interaction model
- Design ambiguities

Only after this analysis should implementation begin.

---

# Success Criteria

A successful implementation is not the most elegant implementation.

It is the implementation that most faithfully reproduces the design reference.

Visual fidelity always has higher priority than implementation preferences.

The goal is replication, not reinterpretation.