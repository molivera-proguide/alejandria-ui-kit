# Token Layer Overview

Milestone 2a documentation for Alejandría design tokens.
This layer proposes vocabulary only. **No values are applied to `styles.css` here** (that is M2b).

## Model: primitive vs semantic

```text
Primitive tokens          Semantic tokens
(raw measured values)  →  (role aliases that point at primitives)
```

| Tier | Purpose | Example |
|------|---------|---------|
| **Primitive** | Store a concrete measured value from M1 | `--ds-space-3: 12px`, `--ds-color-pdf-ink-muted: #8a8b87` |
| **Semantic** | Name a role in [design-language.md](../guidelines/design-language.md); alias a primitive | `--ds-color-text-secondary: var(--ds-color-ink-soft)` |

Rules:

1. Existing `--ds-*` names/values are the **baseline** and stay byte-identical unless a **visual-gated** proposal is signed off.
2. Prefer extending `--ds-<category>-<role>` (Rule 07).
3. Do not create a token for a single-use paint/geometry value unless it encodes a named role (Rule 06) — see `keep-as-is` rows in [migration-map.md](./migration-map.md).
4. Every proposed value cites M1 inventory / specs — no invented numbers.

## Namespaces (proposed extensions)

| Namespace | Tier | Status |
|-----------|------|--------|
| `--ds-color-*` | both | Existing + PDF primitives + opacity helpers |
| `--ds-font-*` | primitive | Existing families |
| `--ds-font-weight-*` | primitive | **New** |
| `--ds-text-*` | semantic/primitive | **New** shared sizes (reuse ≥2 only) |
| `--ds-tracking-*` | primitive | **New** |
| `--ds-leading-*` | primitive | **New** |
| `--ds-space-*` | primitive | **New** |
| `--ds-size-*` | primitive | **New** (control/icon dimensions, reuse ≥2) |
| `--ds-border-width-*` | primitive | **New** |
| `--ds-radius-*` | primitive | Existing + `--ds-radius-pill` |
| `--ds-shadow-*` / `--ds-focus-ring` | primitive | Existing |
| `--ds-duration-*` / `--ds-ease-*` | primitive | **New** |

## How to extend

1. Confirm the value exists in `knowledge/specs/tokens-inventory.md` (or a new M1 re-measure).
2. Check [design-language.md](../guidelines/design-language.md) for the role.
3. Prefer an existing token (Rule 01–02).
4. If reusable (count ≥2 or clear semantic role), add to [token-plan.md](./token-plan.md) and a row in [migration-map.md](./migration-map.md).
5. Classify the change: `mechanical` | `visual-gated` | `keep-as-is`.
6. Do **not** edit `styles.css` until M2b executes the map after any required sign-offs.

## Related artifacts

| Artifact | Path |
|----------|------|
| Design language | `knowledge/guidelines/design-language.md` |
| Token plan | `knowledge/tokens/token-plan.md` |
| Migration map (M2b work-order) | `knowledge/tokens/migration-map.md` |
| M1 inventory | `knowledge/specs/tokens-inventory.md` |
| M1 component specs | `knowledge/specs/components/*.spec.md` |
