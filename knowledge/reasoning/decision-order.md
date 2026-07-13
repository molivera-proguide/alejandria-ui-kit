# Decision Order (authoritative)

**Status:** authoritative for all Alejandría agent decisions  
**Supersedes:** the “Decision Order” sections in [`agent-playbook.md`](../agent-playbook.md) and [`design-system-rules.md`](../design-system-rules.md)

Those two sections answered different questions and conflicted when read as a single ranked list (canonical reference #1 vs design token #1). This document is the **only** Decision Order. Pick the procedure for your **task type**, then follow that list in order. Never invent a third ranking.

---

## How to use this document

1. Classify the task (table below).
2. Open only the matching procedure.
3. Resolve disagreements with that procedure’s priority — do not mix lists across task types.
4. If the task spans types (e.g. new component + new color), run **reuse-vs-new** / **component-selection** first, then **new-value** / **visual-fidelity** as needed.

| Task type | Use when | Procedure |
|-----------|----------|-----------|
| Visual-fidelity change | Match PDF / mock / approved reference; fix drift | §1 |
| New-value introduction | Add or choose a color, space, type, radius, motion value | §2 |
| Component selection | Choose which existing export to use | §3 |
| Reuse vs variant vs new | Decide whether to extend or invent a component | §4 |

Related: [`component-selection.md`](./component-selection.md), [`reuse-rubric.md`](./reuse-rubric.md).

---

## Reconciliation (what each old order still governs)

| Former source | Intent preserved here | No longer authoritative as a global #1 |
|---------------|----------------------|------------------------------------------|
| Playbook — Canonical Reference first | Visual-fidelity tasks (§1) | Token-first for visual matching |
| Rules — Design Token first | New-value introduction (§2) | Canonical reference for inventing pixels |

---

## §1 — Visual-fidelity change

Goal: the UI matches the approved visual source. Prefer omission over invention ([design-principles.md](../design-principles.md) P01–P02; [visual-analysis-protocol.md](../visual-analysis-protocol.md)).

**Priority (never invert):**

1. **Canonical design reference** — PDF / Figma / approved mock cited by the component doc.
2. **Numeric spec** — [`knowledge/specs/components/<Name>.spec.md`](../specs/README.md) (measured facts + recorded deltas; does not invent winners).
3. **Component documentation** — [`knowledge/components/<Name>.md`](../components/).
4. **Design principles** — [`design-principles.md`](../design-principles.md).
5. **Design system rules + anti-patterns** — [`design-system-rules.md`](../design-system-rules.md), [`anti-patterns.md`](../anti-patterns.md).
6. **Existing implementation** — `packages/ui` source + Storybook (consistency check, not a license to redesign).
7. **Personal interpretation** — last; prefer asking over inventing.

**Concrete inputs:** specs, component docs, `styles.css` / tokens for *what is implemented*; PDF for *what is intended*. Do not silently “normalize” spacing or palette during fidelity work unless the task is explicitly an M5 gated resolution.

---

## §2 — New-value introduction

Goal: every new visual value enters through the token vocabulary when appropriate ([design-system-rules.md](../design-system-rules.md) Rules 01–06; [tokens/README.md](../tokens/README.md); [design-language.md](../guidelines/design-language.md)).

**Priority (never invert):**

1. **Reuse an existing Design Token** — `--ds-*` in `packages/ui/src/styles.css` / [token-plan.md](../tokens/token-plan.md).
2. **Reuse an existing scale step** — e.g. `--ds-space-1..6`, shared `--ds-text-*`, weight/leading/tracking scales ([design-language.md](../guidelines/design-language.md)).
3. **Consult inventory + migration disposition** — [tokens-inventory.md](../specs/tokens-inventory.md), [migration-map.md](../tokens/migration-map.md). If the value is `visual-gated`, do **not** apply a look-changing merge/normalize without sign-off (Fidelity / M5).
4. **Create a new token** only if the value is reusable or encodes a named role (Rule 06) — extend `--ds-<category>-<role>` (Rule 07); register in plan/map/manifest when documenting.
5. **Component-local literal** only when truly geometry- or paint-specific (`keep-as-is` class) — never the first option.
6. **Never invent unmeasured numbers** — cite M1 specs / inventory.

Hardcoded values must not be the first option. Drift (off-grid spacing, one-off hexes) is never minted as a scale token.

---

## §3 — Component selection

Goal: pick the exported component whose **semantic role** matches the need.

**Priority:**

1. Read [`component-selection.md`](./component-selection.md) — role + nearest-neighbor boundaries.
2. Confirm against [`knowledge/components/<Name>.md`](../components/) Purpose / When not to use.
3. Confirm the export exists in `packages/ui/src/index.ts` and (when documented) the [manifest](../design-system-manifest.json).
4. Prefer composition of existing exports over a new primitive (see §4).

Do not pick by visual similarity alone (Anti-Pattern 03 — borrowing from other components).

---

## §4 — Reuse vs variant vs new component

Goal: grow the system without duplicate identities.

**Priority:**

1. Follow [`reuse-rubric.md`](./reuse-rubric.md) decision tree.
2. Prefer **reuse** → **add a variant** → **new component** (in that order).
3. A new component requires a distinct semantic role, not only a layout tweak (Principle 05 — component identity).
4. Register new artifacts in the manifest before treating them as part of the knowledge base ([index.md](../index.md) ground rules).

---

## Cross-cutting defaults

- **Entry:** start at [`knowledge/index.md`](../index.md).
- **Plan:** [`roadmap.md`](../roadmap.md) for milestone scope (e.g. do not apply visual-gated token rows outside Fidelity).
- **Workflow shell:** [`agent-playbook.md`](../agent-playbook.md) still describes *how to work*; this file governs *how to decide when sources conflict*.
