---
id: filter-field
name: FilterField
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FilterField.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FilterField

aliases:
  - campo filter
  - filtro+búsqueda
keywords:
  - FilterField
  - filter field
  - search
  - FilterFieldProps
  - funnel
tags:
  - input
  - presentational
  - molecule

last_reviewed: 2026-08-11
---

# FilterField

## Purpose

- **Responsabilidad principal:** campo compuesto de filtro+búsqueda — ícono de
  filtro+chevron afuera a la izquierda, input oscuro con lupa adentro a la derecha,
  sin label flotante.
- **Problema que resuelve:** el PDF de referencia ("FILTER" p.23) especifica este
  componente con medidas y colores exactos. El kit lo tenía resuelto como un hack
  (`Button` secundario con ícono de Lucide + `TextField` con label visible) sin base
  real en el PDF — Luna lo señaló explícitamente durante el fidelity-check de
  `004-familia-tareas`.
- **Alcance:** el campo completo (filtro+input). El comportamiento del ícono de
  filtro queda decorativo — el propio PDF lo deja sin definir ("me falta desarrollar
  el desplegable del funnel").

Exclude: API details, implementation details, usage examples, composition.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` p.23
"FILTER". Medido 2026-08-11 vía anotaciones explícitas de la propia página (spec
sheet, no mockup a medir a ojo).

---

# Behavioral Contract

## This component guarantees

- Renderiza ícono de filtro (`FiltroIcon`, reusado del set existente) + chevron
  afuera a la izquierda, seguido de un `<input>` con lupa adentro a la derecha.
- El input mide `400×50px` — medida final, no `@2×÷2` (única excepción de esta
  feature a esa convención, confirmada explícitamente con Luna).
- Repasa todas las props nativas de `InputHTMLAttributes<HTMLInputElement>`
  (`value`, `onChange`, `placeholder`, `defaultValue`, `aria-label`, etc.) — el
  campo interno es un `<input>` real.
- Reenvía `ref` al `<input>` interno (`forwardRef`).

## This component never

- Muestra un label flotante — a diferencia de `TextField`, no tiene esa prop ni ese
  comportamiento.
- Abre un desplegable al clickear el ícono de filtro — es decorativo, el PDF no
  especifica esa interacción.
- Sigue la convención `@2×÷2` en su medida — es la única excepción de esta feature.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Si se necesita accesibilidad de label (no hay uno visible), proveer
  `aria-label`/`aria-labelledby` vía las props nativas repasadas.

## Forbidden

- Asumir que el ícono de filtro tiene alguna acción — es decorativo por diseño.
- Cambiar la medida `400×50px` sin una decisión de producto explícita (ver
  `DECISIONS.md` — es la única excepción a `@2×÷2` de esta feature).

## Recommendations

- Usar `placeholder` para indicar qué se puede filtrar, ya que no hay label
  visible.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Input |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/FilterField.tsx |

---

# Public API

```tsx
import { FilterField, type FilterFieldProps } from "@alejandria/ui-kit";
```

Tipos exportados:

- `FilterField` — componente funcional (`forwardRef`).
- `FilterFieldProps` — alias de `InputHTMLAttributes<HTMLInputElement>`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `...props` | `InputHTMLAttributes<HTMLInputElement>` | — | no | Todas las props nativas de un `<input>` (`value`, `onChange`, `placeholder`, `defaultValue`, `aria-label`, etc.). Ninguna es requerida — el componente funciona sin props (input vacío). |

---

# Variants

Una sola variante — sin prop `variant`. El PDF solo muestra un tratamiento.

---

# States

| State | Description |
|--------|-------------|
| Vacío/con valor | Estados nativos del `<input>` — sin estado interno propio del componente. |

---

# Accessibility

## Requirements

- Sin label visible — el consumidor **debe** proveer `aria-label` o
  `aria-labelledby` si necesita accesibilidad de nombre para el campo.
- El ícono de filtro tiene `aria-hidden="true"` (decorativo, sin acción).
- El ícono de lupa tiene `aria-hidden="true"` (decorativo, informativo).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Fijo en el ícono de filtro y en el ícono de lupa. |

### Keyboard

| Key | Action |
|-----|--------|
| (nativo del `<input>`) | El campo es un `<input>` real — foco/tipeo nativos del navegador. El ícono de filtro no es focuseable (no es un `<button>`, es decorativo). |

---

# Responsive Behavior

Ninguno — ancho fijo `400px`, sin breakpoints propios (mismo criterio que el resto
del kit para elementos con medida citada del PDF).

---

# Composition

## Purpose in Layout

- Filtro/búsqueda en toolbars de screens (ej. `screens/tareas-pendientes/`,
  `screens/tareas-kanban/`, `screens/tareas-finalizadas/`).

## Parent

- Cualquier fila de toolbar (`display: flex`).

## Children

- Ninguno propio — el ícono de filtro, chevron, input y lupa son internos, no
  slots configurables.

## Siblings

- `SegmentedControl`, `SelectField`, u otros controles de filtro en la misma
  toolbar.

## Alternatives

- `TextField` — campo con label flotante, sin ícono de filtro compuesto. Usar
  cuando no se necesite el patrón filtro+búsqueda específico del PDF "FILTER".

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `TextField` | Alternativa sin el ícono de filtro compuesto — `TextField` es en sí mismo un componente inventado (no basado en el PDF), pendiente de limpieza aparte (ver `DECISIONS.md`). |

---

# Content Guidelines

## Labels

No aplica — sin label visible.

## Values

- `placeholder`/`value` son texto libre.

## Icons

- Ícono de filtro: `FiltroIcon` (reusado, ya existe en `Icons/Menu/`).
- Ícono de lupa: `Search` de `lucide-react`.
- Chevron: `ChevronDown` de `lucide-react`.

## Localization

No aplica — sin texto propio del componente (todo viene de props del consumidor).

---

# Examples

## Basic

```tsx
<FilterField aria-label="Buscar tarea" placeholder="ID, zona o dependencia" />
```

## Variant

```tsx
<FilterField aria-label="Filtrar" defaultValue="Investigación" />
```

## Composition

```tsx
<div className="toolbar">
  <SegmentedControl ... />
  <FilterField aria-label="Buscar tarea" placeholder="ID, zona o dependencia" />
</div>
```

---

# Reasoning Examples

## User Request

"Necesito el campo de filtro+búsqueda que aparece en las pantallas de Tareas."

### Recommended Components

- `FilterField`

### Why

Coincide 1:1 con "FILTER" del PDF p.23 — ícono+chevron+input+lupa, sin label. Un
`Button`+`TextField` (patrón anterior) no reproduce el ícono de filtro compuesto ni
la medida exacta (400×50px).

---

# Design Tokens

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface` | Color | Fondo del input (`#060606`) |
| `--ds-color-pdf-border` | Color | Borde (`#606060`) |
| `--ds-color-white` | Color | Texto del input |
| `--ds-color-pdf-ink-muted` | Color | Ícono de filtro, lupa, placeholder |
| `--ds-font-body` | Typography | Familia del texto (Montserrat) |
| `--ds-font-weight-regular` | Typography | Peso del texto |
| `--ds-border-width-hair` | Border | Ancho del borde (0.75px) |

---

# Implementation Notes

## Source File

```text
packages/ui/src/components/FilterField.tsx
```

## Dependencies

- `lucide-react` (`ChevronDown`, `Search`).
- `../Icons` (`FiltroIcon`, reusado).
- `../utils/cn` — merge de `className`.

## DOM Structure

```text
<div class="ds-filter-field">
  <span class="ds-filter-field__toggle" aria-hidden="true">
    <img src={FiltroIcon} alt="" />
    <ChevronDown />
  </span>
  <div class="ds-filter-field__input-wrap">
    <input class="ds-filter-field__input" />
    <Search class="ds-filter-field__search-icon" aria-hidden="true" />
  </div>
</div>
```

---

# Known Limitations

- **El ícono de filtro es puramente decorativo.** El propio PDF deja el
  comportamiento del desplegable sin definir ("me falta desarrollar el desplegable
  del funnel") — decisión explícita de no construir nada funcional por ahora.
- **`400×50px` es la única medida de este componente sin `@2×÷2`** — confirmado
  explícitamente con Luna, no una interpretación propia. Ver `DECISIONS.md`.

---

# Future Improvements

- [ ] Desplegable funcional del ícono de filtro, si se define el comportamiento en
  una iteración futura.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Creación — `005-alert-toast-filter`, PDF "FILTER" p.23. Reemplaza el hack `Button`+`TextField` usado en `004-familia-tareas`. |
