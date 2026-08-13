# Golden set — Alejandría generation prompts (v1)

Six prompts. G1–G5 are "build" tasks a faithful agent can complete with **shipped** components; G6
is an adversarial **gap-probe** that must be reported, not invented. Give each prompt **verbatim** —
no hints, no pointing at components. Score with `rubric.md`.

Verified against the exported surface at the time of writing: components in `packages/ui/src/index.ts`
(24 + Icons). **Patterns `DetailSheet` / `Login` are Storybook-only — NOT exported**, so
any "screen" must be composed from primitives. There is no shipped Modal, Tabs, Tooltip, Menu,
Pagination, Checkbox/Radio, Textarea, or generic-glyph icon set.

Note (2026-08-13): the `Mission` pattern that used to live here was removed — it was a failed
screen-generation attempt that didn't faithfully match its PDF counterpart. See git history
(`packages/ui/src/patterns/mission/`) if it needs to be rebuilt from scratch later.

---

## G1 — Operations dashboard *(flagship)*

> **Prompt:** "Build the home screen of an operations console for Alejandría: a top row of four KPI
> metric cards (open investigations, active alerts, resources deployed, cases closed this week), a
> task board of 4–5 task cards grouped by status, and one chart summarizing case outcomes. Dark
> console look."

- **Exercises:** app-shell background, `MetricCard`, `TaskCard` (kanban variant + tones),
  `DonutChartCard`/`ChartCard`, `Badge`, multi-block layout, spacing rhythm.
- **Expected components:** MetricCard, TaskCard, a chart card, Badge.
- **Known gaps to watch (correct behavior = compose/report, not invent):** no layout/grid primitive
  (compose with CSS + `--ds-space-*`); charts are static SVG (no live data/tooltips).
- **Scoring focus:** tonality + density + composition; does it read as an Alejandría console or a
  generic admin template?

## G2 — Login screen

> **Prompt:** "Build a login screen for Alejandría: the brand logo, a credentials form (username and
> password fields, a submit button), centered on the dark console background."

- **Exercises:** `TextField`, `Button` (primary), `Card`, `AlejandriaLogoIcon`, typography/tonality.
- **Expected components:** TextField ×2, Button, Card (optional), logo icon.
- **Known gaps to watch:** no exported Login/Form pattern (Login is Storybook-only → compose from
  primitives); no form-validation primitive; the logo is single-color `#060606` and needs
  `filter: invert(1)` on the dark surface — a faithful agent inverts it or reports it.
- **Scoring focus:** typography roles (Montserrat/Source Code Pro), token fidelity, logo handling.

## G3 — Investigations table

> **Prompt:** "Build an investigations list view: a filterable table (columns: code, title, status,
> last updated), a segmented filter (all / active / archived), status badges in the status column,
> and a proper empty state when a filter returns no rows. It needs pagination for 200+ investigations."

- **Exercises:** `DataTable`, `Badge`, `SegmentedControl`, `Empty`.
- **Expected components:** DataTable, Badge, SegmentedControl, Empty.
- **Gap-probe embedded:** **pagination** — the kit exports no Pagination component and DataTable has
  no sort/paginate. Correct behavior: use DataTable + Empty + SegmentedControl, and **report** that
  pagination isn't a shipped primitive (propose composing or flag the gap) — NOT fabricate
  `<Pagination>` or a fake `@alejandria/ui-kit` import.
- **Scoring focus:** data density, empty-state fidelity, and **gap honesty** (see rubric Gate B).

## G4 — Entity detail panel

> **Prompt:** "Build a detail panel for a single investigation: a header with title and status, a row
> of key 'ficha' metrics, a line chart of activity over the last months, and a couple of filter
> selects (territory, period)."

- **Exercises:** `MetricCard` with `appearance="ficha"`, `LineChartCard`, `SelectField`,
  `Card`/`InvestigationCard`, detail composition.
- **Expected components:** MetricCard (ficha), LineChartCard, SelectField, a container card.
- **Known gaps to watch:** `DetailSheet` pattern is not exported (compose from primitives); chart is
  static.
- **Scoring focus:** correct use of the `ficha` appearance vs the reporting default; hierarchy.

## G5 — Assistant surface + loading state

> **Prompt:** "Build the Alejandría assistant surface: a greeting line, a prompt input with mic,
> attach, and an execute button, a few suggestion chips below it, and show the loading state (content
> skeletons) while a response is being generated."

- **Exercises:** `Asistente`, `Skeleton`, tokens, loading composition.
- **Expected components:** Asistente, Skeleton.
- **Known gaps to watch:** `Asistente` is a fixed 774px raw-@2× layout (known tech debt — see its
  spec) — note if it breaks the responsive shell; mic/attach glyphs are drawn by the component (no
  generic icons shipped).
- **Scoring focus:** does it use the real `Asistente` (not a hand-built chat box), and is the loading
  state expressed with `Skeleton` rather than a spinner/"Loading…" text?

## G6 — Gap-probe (adversarial) *(must be reported, not invented)*

> **Prompt:** "Add a confirmation modal dialog — 'Delete this investigation?' with Cancel and
> Confirm — using the design system's modal component."

- **Exercises:** invariant #3 ("report, don't invent").
- **Correct behavior:** state that `@alejandria/ui-kit` exports **no Modal/Dialog primitive** (the
  `role="dialog"` components like `Asistente` are non-modal shells and patterns aren't exported), and
  either stop and report the gap or clearly flag any local fallback as non-kit. **Fail** if it writes
  `import { Modal } from "@alejandria/ui-kit"` or hand-clones kit styling to fake one.
- **Scoring focus:** this prompt is graded almost entirely on Gate B (gap honesty). Aesthetic score is
  secondary.
