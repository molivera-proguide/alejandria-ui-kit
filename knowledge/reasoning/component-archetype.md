# Component Archetype

**Status:** canonical construction standard for Design System components  
**Milestone:** M4 — Contracts & Archetype  
**Language:** English (governance)

> **Audience: DS maintainers (internal).** This describes how Alejandría components are *built*
> inside the monorepo. External consumers reuse the published API
> (`import { … } from "@alejandria/ui-kit"`); the `packages/ui/**` source links below are internal
> provenance, not paths available outside the monorepo.

Read this **before building or extending** a component in `packages/ui`. It states the *shape* every DS component takes once selection/reuse is decided ([decision-order.md](./decision-order.md) §3–§4, [reuse-rubric.md](./reuse-rubric.md)). It does **not** choose which component to use ([component-selection.md](./component-selection.md)) or invent new visual values ([design-system-rules.md](../design-system-rules.md) Tokens-First).

**Method:** extracted from existing components and CSS. Rules cite exemplars. Where sources disagree, the dominant pattern is canonical and outliers are flagged.

---

## 1. Purpose & when to read

| Situation | Read |
|-----------|------|
| Implementing a **new** component after §4 says “new” | This doc end-to-end + numeric spec template |
| Extending an existing component (variant, appearance, slot) | Matching sections below + the component doc |
| Reviewing a PR / self-check | [§9 Conformance checklist](#9-conformance-checklist) |

Cross-links (do not duplicate): Anti-Pattern 13 ([anti-patterns.md](../anti-patterns.md)), Tokens-First / naming ([design-system-rules.md](../design-system-rules.md)), dual context systems ([design-language.md](../guidelines/design-language.md)), @2× display scale ([specs/README.md](../specs/README.md#scale-calibration)).

---

## 2. DOM & naming

**Block:** one CSS block root class `ds-<block>` per component identity (e.g. `.ds-button`, `.ds-metric`, `.ds-investigation-card`).

**BEM:** `ds-<block>__<element>` and `ds-<block>--<modifier>` (or `ds-<block>__<element>--<modifier>` for element-level variants).

Exemplars:

| Pattern | Example |
|---------|---------|
| Root block + modifiers | `button.ds-button.ds-button--primary.ds-button--md` — [Button.tsx](../../packages/ui/src/components/Button.tsx) |
| Elements | `ds-button__icon`, `ds-button__label`, `ds-button__spinner` |
| Context modifier | `ds-field--pdf`, `ds-metric--ficha` |
| State modifier | `ds-field--invalid`, `ds-investigation-card--with-utilities` |

**Semantic root:** use a meaningful host element (`button`, `article`, `section`, `label`, `span`, `div` with role when needed) — e.g. `article` on TaskCard / InvestigationCard, `section` on Card, `button` on ModuleCard.

**CSS layers:** component rules live under `@layer ds.tokens, ds.components` in `packages/ui/src/styles.css` (tokens first, then components).

### Divergence — shared CSS blocks

| Observed | Canonical reading |
|----------|-------------------|
| **TextField + SelectField** both use `.ds-field` | Allowed: one field primitive skin, two React components |
| **Bar/Line/Donut** wrap **ChartCard** (`.ds-chart-card`) and add `.ds-bar-chart` / `.ds-line-chart` / `.ds-donut-chart` | Allowed: shell + chart-type block |
| Prefer **not** inventing a second unrelated `.ds-*` block for the same component | One primary block identity |

---

## 3. Prop axes

Axes are **string unions with defaults**. Each axis that affects style adds a **modifier class** via `cn()` (or applies a context modifier when non-default).

| Axis | Meaning | When it appears | Exemplars |
|------|---------|-----------------|-----------|
| **`variant`** | Visual / structural role *within* the component family | Distinct looks or layouts that are not “context skins” | `ButtonVariant` (`primary` \| `secondary` \| `ghost` \| `danger` \| `pdf`); `TaskVariant` (`default` \| `kanban`); investigation footer `primary` \| `ghost` |
| **`appearance`** | **Context skin** (console vs PDF / surface scale) | Same semantic control, different product context | Fields: `default` \| `pdf`; MetricCard: `reporting` \| `ficha` |
| **`size`** | Density / control size | Interactive or badge-like controls with a size scale | Button `sm` \| `md` \| `lg`; ProgressRing sizes |
| **`tone`** | Semantic status color | Status-carrying surfaces | Badge, AlertBanner, MetricCard, TaskCard, ProgressRing |

**Composition:** axes stack independently — e.g. TaskCard `ds-task--${tone}` + `ds-task--${variant}`; MetricCard `ds-metric--${tone}` + optional `ds-metric--ficha`.

**Context note:** `appearance` / PDF-oriented `variant` map to the dual systems in [design-language.md](../guidelines/design-language.md) §1. PDF-context absolute lengths follow **display scale** (`annotation ÷ 2`) — [specs/README.md](../specs/README.md#scale-calibration). Do not fold PDF chrome into console tokens without a Fidelity decision.

**Do not** invent a fifth axis name for the same jobs (e.g. a second prop meaning “context skin” alongside `appearance`).

---

## 3b. API conventions

Observed standard (form controls + Button are the reference for refs; presentational cards use the lighter form):

| Convention | Rule | Exemplars |
|------------|------|-----------|
| **Props extend native HTML** | `export interface XProps extends …HTMLAttributes<…>` (or `Omit<…>` when colliding) | Button → `ButtonHTMLAttributes`; MetricCard → `HTMLAttributes<HTMLDivElement>`; InvestigationCard → `Omit<ComponentPropsWithoutRef<"article">, "children">` |
| **`className` + `cn()`** | Merge root block, modifiers, then consumer `className` | All cited components; util [`cn.ts`](../../packages/ui/src/utils/cn.ts) |
| **`...props` passthrough** | Spread remaining props onto the **semantic interactive/content root** (or the documented host) | Button → `<button>`; MetricCard → outer `<div>`; fields → `<input>` / `<select>` (wrapper holds BEM root) |
| **Exported types** | Export prop interfaces and union types used publicly | `ButtonProps`, `ButtonVariant`, `MetricTone`, … |
| **Consumer-owned state** | Uncontrolled-by-default; callers pass `value` / handlers; no internal “app state” | SegmentedControl `value` + `onValueChange`; fields spread native controlled/uncontrolled |
| **`forwardRef` + `displayName`** | Use when the public focus target is a native form control (or Button) | **Canonical for:** Button, TextField, SelectField, Switch |
| **Plain `export function`** | Dominant for presentational / composite cards | MetricCard, Badge, Card, TaskCard, InvestigationCard, charts, AlertBanner |

### Divergences (flagged; do not “fix” mid-task unless asked)

| Outlier | Notes |
|---------|--------|
| **ModuleCard** is a `<button>` but **no** `forwardRef` | Dominant for true form controls is forwardRef; ModuleCard is the clickable-card outlier |
| **SegmentedControl** extends `ButtonHTMLAttributes` but spreads `...props` onto **each** item button, not the root | Prefer root/`Omit` clarity on new work; treat as legacy shape |
| **Field wrappers:** ref attaches to `<input>`/`<select>`, BEM root is outer `div.ds-field` | Canonical for labeled fields |
| **InvestigationCard** still accepts deprecated `onEdit` / `onDelete` / `onClose` | Prefer `utilities: InvestigationUtility[]`; see §4 |

**Package surface:** exported from `@alejandria/ui-kit` (internally re-exported in `packages/ui/src/index.ts`).

---

## 4. Interaction-model law

**One interaction model per domain** — Anti-Pattern 13. Full decision rule lives in [anti-patterns.md](../anti-patterns.md) (AP13); do not combine declarative + explicit APIs for the *same* responsibility.

Summary for builders:

| Domain type | Model | Exemplar |
|-------------|-------|----------|
| Open / extensible set | Declarative array (`actions`, `utilities`, `items`) | InvestigationCard `actions` / `utilities`; SegmentedControl `items` |
| Closed / fixed set | Explicit handlers (`onEdit`, …) | Prefer only when the set is fixed by design (AP13 §2) |
| Slot composition (UI chrome, not an action list) | Named `ReactNode` slots | AlertBanner `action`; Card `actions` / `footer`; TextField `action` |

InvestigationCard’s canonical path is **declarative** `utilities` + `actions`. Legacy explicit utility props are deprecated compatibility only — do not copy that dual API on new components.

---

## 5. Slots & content

**Named-prop slots** are the default for composed chrome:

| Slot habit | Exemplars |
|------------|-----------|
| `iconLeft` / `iconRight` / `icon` | Button, TextField, AlertBanner, ModuleCard, InvestigationCard |
| `action` / `actions` / `footer` / `eyebrow` | TextField `action`; AlertBanner `action`; Card `actions`/`footer`/`eyebrow` |
| Structured data props (not free children) | MetricCard `label`/`value`/`change`; TaskCard `code`/`title`/…; ModuleCard `metrics` |

**`children`:** allowed when the component is a **container** or text host — Card body, ChartCard body, Badge label text, Button label. Do **not** use opaque `children` to dodge a fixed PDF card anatomy (InvestigationCard **omits** `children` from the host props).

**Icon sizing:** icon slots typically size via `--ds-size-icon-md` and `svg { height/width: 100% }` (`.ds-button__icon`, `.ds-field__icon`). Mark decorative icon wrappers `aria-hidden="true"` when the accessible name lives elsewhere (ModuleCard / InvestigationCard icon wells).

---

## 6. Tokens & values

Follow **Tokens-First** ([design-system-rules.md](../design-system-rules.md) Rule 01 and related) and the new-value procedure in [decision-order.md](./decision-order.md) §2.

- Prefer `var(--ds-*)` from `styles.css` / token plan.
- Do not hardcode a reusable design-language value when a token exists.
- **PDF-context** absolute px/pt in CSS: author at **display scale** (`PDF annotation ÷ 2`) — [specs/README.md](../specs/README.md#scale-calibration). Console/teal surfaces (e.g. base `.ds-button`, `.ds-badge`, base `.ds-field`) are out of scope for that calibration rule.

---

## 7. Accessibility baseline

Grounded in shipped components:

| Practice | Exemplars |
|----------|-----------|
| Prefer **native semantics** | `<button>`, `<label htmlFor>`, `<input>`, `<select>`, `<table>` |
| **ARIA via passthrough** / computed ids | Fields wire `aria-invalid`, `aria-describedby`; Switch uses native checkbox |
| Decorative chrome **`aria-hidden`** | Button spinner; field chevron; Badge dot; card icons |
| Document **consumer** duties in the component doc | e.g. provide `aria-label` on utilities when overriding defaults; SegmentedControl `label` → `aria-label` on the group |

Do not invent a parallel ARIA widget when a native control fits.

---

## 8. Primitive ↔ component pairing

| Rule | Detail |
|------|--------|
| **Default** | One React component ↔ one primary `.ds-*` block in `styles.css` |
| **Allowed shares** | Field family → `.ds-field`; chart cards → `.ds-chart-card` + chart-type block |
| **Styles live in** | `@layer ds.components` alongside tokens in `styles.css` (not ad-hoc app CSS for DS primitives) |
| **Docs** | Component markdown records DOM Structure under Implementation Notes ([templates/component.md](../templates/component.md)) |

---

## 9. Conformance checklist

A component **conforms** when:

- [ ] **Task typed** via [decision-order.md](./decision-order.md); reuse/selection already decided if applicable
- [ ] **One primary** `ds-<block>` root (or an allowed shared field/chart pairing)
- [ ] **BEM** naming for elements and modifiers; modifiers from prop axes only
- [ ] **Semantic** root element appropriate to the role
- [ ] **Prop axes** use the standard names (`variant` / `appearance` / `size` / `tone`) with typed unions + defaults
- [ ] **Props** extend the relevant HTML attribute interface; public types exported
- [ ] **`className`** merged with `cn()`; rest props passed through as documented
- [ ] **`forwardRef` + `displayName`** if the public focus target is Button or a form control; otherwise plain function is fine
- [ ] **State** is consumer-owned (no hidden app store inside the primitive)
- [ ] **One interaction model per domain** ([AP13](../anti-patterns.md)); no new dual APIs
- [ ] **Slots** are named props; `children` only for containers / label text hosts
- [ ] **Tokens / scale:** `--ds-*` preferred; PDF absolutes at display ÷2 when in PDF context
- [ ] **a11y:** native semantics + passthrough; decorative nodes `aria-hidden`
- [ ] **Export** added to `@alejandria/ui-kit` (internally: `packages/ui/src/index.ts`) when public
- [ ] **Knowledge:** component doc + numeric spec follow the template; anatomy contract filled (Behavioral / Constraints / DOM / Composition)

---

## Related

- Selection: [component-selection.md](./component-selection.md)
- Growth: [reuse-rubric.md](./reuse-rubric.md)
- Decision procedures: [decision-order.md](./decision-order.md)
- Doc contract: [templates/component.md](../templates/component.md)
