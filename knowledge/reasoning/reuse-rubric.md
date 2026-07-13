# Reuse vs variant vs new component

Decision tree for growing the component inventory without duplicate identities. Use for **reuse-vs-new** tasks ([decision-order.md](./decision-order.md) §4). Pair with [`component-selection.md`](./component-selection.md).

---

## Decision tree

```text
1. Does an existing export’s Purpose already cover the job?
   YES → REUSE it (compose props / children / patterns). STOP.
   NO  → continue.

2. Is the need the same semantic identity with a different layout or density?
   (Principle 05: variants inherit identity; they adapt layout.)
   YES → ADD A VARIANT on that component. STOP.
   NO  → continue.

3. Is the need only a different tone, size, or visual state of the same control?
   YES → prefer existing variant / tone / size API — not a new component. STOP.
   NO  → continue.

4. Would “borrowing” visuals from another component create a fake hybrid?
   (Anti-Pattern 02–03: no mixing variants; no borrowing across identities.)
   YES → stop and pick the correct identity (selection taxonomy). STOP.
   NO  → continue.

5. Is there a distinct semantic role, stable API, and documented boundary
   against nearest neighbors?
   YES → NEW COMPONENT (document + register in manifest). STOP.
   NO  → do not invent; clarify requirements or compose existing exports.
```

**Default bias:** reuse → variant → new. New is last.

---

## Worked examples

### Example 1 — InvestigationCard API history (correct: new component)

**Situation:** PDF TARJETAS p.2 shows a flight/investigation tile with icon, title, 2×2 metrics, utilities, and PDF-styled actions — not a TaskCard and not a ModuleCard.

**Wrong branch:** Extend **TaskCard** with optional `metricsGrid`, `utilities`, and `actions`, or stretch **ModuleCard** into a non-navigable summary. That merges identities (task vs investigation vs module entry) and violates Principle 05 / Anti-Pattern 02.

**Correct branch:**

1. Purpose of TaskCard / ModuleCard / MetricCard does not cover “investigation entity with action strip.”
2. Not a density variant of TaskCard (different anatomy and PDF page).
3. Distinct role → **new component** `InvestigationCard` with its own API and CSS (`.ds-investigation-card`), documented separately.

**Lesson:** Same “card-shaped” silhouette is not the same component. Anatomy + role decide.

---

### Example 2 — ProgressRing vs DonutChartCard (correct: reuse the right export)

**Situation:** Show “42% of tasks complete” as a single progress value in a mission panel.

**Wrong branch:** Use **DonutChartCard** with one segment, or invent `ProgressDonut`, because both look circular. DonutChartCard is a **distribution** chart inside ChartCard framing; ProgressRing is a **0–100 progress** indicator.

**Correct branch:**

1. Selection taxonomy → **ProgressRing**.
2. Reuse existing `value` / `tone` / `size` API.
3. No new component.

**Lesson:** Visual kinship (rings) is not semantic kinship. Follow the taxonomy boundary.

---

### Example 3 — TaskCard kanban (correct: add a variant)

**Situation:** PDF TARJETAS p.1 shows a compact task tile for boards alongside the full task card.

**Wrong branch:** Ship `KanbanTaskCard` as a separate export that duplicates title/status/meta props and diverges over time.

**Correct branch:**

1. Same semantic identity (task summary).
2. Layout/density difference only → **variant** `variant="kanban"` on **TaskCard**.
3. Reuse the component; do not fork the package surface.

**Lesson:** When identity holds and only layout changes, prefer a variant over a sibling component.

---

### Example 4 — Extra KPI field on MetricCard (correct: reuse / compose; not a new card)

**Situation:** Product wants a sparkline under the MetricCard value.

**Wrong branch:** New `MetricCardWithSparkline` export, or silently add sparkline DOM because “MetricCard already shows numbers.”

**Correct branch (typical):**

1. MetricCard Purpose is label + value + optional change — no sparkline in canonical reference → prefer **omission** or an explicit product request.
2. If approved: either a **documented variant/slot** on MetricCard after design sign-off, or compose **MetricCard** + a separate chart in a **pattern** — not an undeclared hybrid.
3. Do not invent UI absent from the reference (Principle 02 / Anti-Pattern 01).

**Lesson:** Missing decoration is usually intentional; composition/patterns beat silent API growth.

---

## Checklist before opening a new component PR

- [ ] Nearest neighbors named; boundary sentence written.
- [ ] Purpose cannot be satisfied by props/variant on an existing export.
- [ ] Canonical reference (or explicit product request) exists.
- [ ] Doc + Storybook + manifest registration planned ([index.md](../index.md)).
- [ ] No copy-paste of another component’s visual ideas without shared identity.
