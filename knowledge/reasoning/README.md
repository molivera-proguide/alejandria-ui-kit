# Reasoning layer

Deterministic decision procedures for Alejandría agents. This folder is the **reasoning spine** (M3) plus the **component construction standard** (M4): how to decide, which component to pick, when to grow the system, and what shape a component takes when built.

It does **not** replace measured specs, tokens, or component API docs — it tells you which of those to consult and in what order.

---

## Documents

| Doc | Role |
|-----|------|
| [decision-order.md](./decision-order.md) | **Authoritative** Decision Order, keyed by task type. Supersedes the partial orders in `agent-playbook.md` and `design-system-rules.md`. |
| [component-selection.md](./component-selection.md) | Semantic taxonomy: role + neighbor boundary for every package export. |
| [reuse-rubric.md](./reuse-rubric.md) | Decision tree: reuse → variant → new component, with worked examples. |
| [component-archetype.md](./component-archetype.md) | Canonical construction shape: DOM/BEM, prop axes, API, interaction model, slots, tokens/scale, a11y, conformance checklist. |

**Relation:** classify the task → `decision-order.md` → for selection use `component-selection.md` → for inventory growth use `reuse-rubric.md` → when **building or extending**, follow `component-archetype.md`.

---

## Entry

Start at [`knowledge/index.md`](../index.md). Active plan: [`roadmap.md`](../roadmap.md).
