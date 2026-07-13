## Intent

The Detail Sheet pattern defines the canonical layout for presenting a single operational entity in focus.

It is not a component.

It is not a page.

It is a composition blueprint used inside applications (Storybook, app screens) to assemble existing Design System components into a structured, high-density information surface.

It represents the “full context view” of a record.

---

## Scope

This pattern defines:

- Region ordering
- Layout structure
- Visual hierarchy
- Composition rules between existing DS components
- CSS context rules for density and overrides

This pattern does NOT define:

- New Design System components
- New variants for existing components
- New public APIs
- Data fetching logic
- State management

---

## Layout Contract

The Detail Sheet is composed of the following fixed regions:

1. Header Region
   - Status indicator
   - Identifier line
   - Title (primary)
   - Optional secondary labels

2. Filters Region
   - Contextual filters (SelectField / SegmentedControl)

3. Metrics & Charts Region
   - LineChartCard (performance)
   - MetricCard grid (operational KPIs)

4. Narrative Region
   - Long-form description block
   - Distinct background surface (#060606)

5. Media Region
   - MetricCard-based counters (photos, videos, audio)

6. Actions Region
   - Primary decision buttons
   - Secondary actions

---

## Composition Rules

Only existing Design System components can be used:

Allowed:
- MetricCard
- LineChartCard
- SelectField
- SegmentedControl
- Button (only if system-semantic variants apply)

Not allowed:
- New components
- Screen-specific component variants
- Ficha-specific UI primitives
- Custom charts or metric widgets

All layout styling must be applied via contextual CSS.

---

## Visual Constraints

- Sheet background: #2a2927
- Narrative surface: #060606
- Borders: #e6e6e6
- Typography differences must be handled via CSS context, not component variants
- Metric density changes (ficha vs reporting) are contextual, not API-level

No Design System component should be modified to match this pattern.

---

## Interaction Model

The Detail Sheet does not introduce new interaction paradigms.

- Use existing Button API only when semantic variants match system rules
- Do not introduce screen-specific action props
- Do not extend components with "ficha" variants
- Actions are handled at composition level, not inside the Design System

---

## Anti-Patterns

This pattern explicitly forbids:

- Creating new DS components for layout regions
- Adding "Detail", "Ficha", or "Sheet" variants to existing components
- Introducing wrapper components around MetricCard or LineChartCard
- Encoding layout structure inside the Design System layer

---

## Reference Mapping

This pattern is derived from:

Design Reference PDF — Page 4 (Fichas)

Each region in the PDF maps directly to a composition layer defined above.

No additional UI elements exist outside this mapping.

---

## Data Model

This pattern must use **static mocked data only**.

- No API calls
- No data fetching
- No external state management
- No hooks for data loading

All content must be defined inside the Storybook story file.

---

## Implementation Target

This pattern must be implemented as a Storybook screen composition:

- Location: `apps/web/src/patterns/detail-sheet/DetailSheet.stories.tsx`
- Supporting files:
  - `apps/web/src/patterns/detail-sheet/DetailSheet.tsx`
  - `apps/web/src/patterns/detail-sheet/detail-sheet.css`

The goal is to render the full Fichas screen in Storybook using mocked data.

The implementation must:

- Match the PDF layout exactly
- Use only allowed DS components
- Apply all visual constraints via CSS context
- Avoid introducing any new Design System exports

---

## Definition of Done

The implementation is considered complete only when:

- [ ] Storybook renders the full Fichas screen without errors
- [ ] All six regions from the Layout Contract are present
- [ ] Only allowed DS components are used
- [ ] No new Design System exports were created or modified
- [ ] All visual differences are handled via CSS context
- [ ] No UI element exists that is not present in the PDF reference
- [ ] No layout logic leaks into ui-kit

---

## Strict Rendering Constraint

If any UI element is not explicitly defined in the PDF reference:

👉 It MUST NOT be implemented.

No decorative elements, placeholders, or inferred UI are allowed.

---

## Scope Boundary

This implementation is strictly limited to:

- Storybook pattern rendering
- CSS styling for layout context
- Composition of existing DS components

It must NOT:

- Create application pages
- Introduce routing
- Integrate with backend systems
- Modify Design System packages