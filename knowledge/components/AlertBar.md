---
id: alert-bar
name: AlertBar
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/AlertBar.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/AlertBar

aliases:
  - Alert Sigcat
  - franja de alerta
  - topbar de alerta
keywords:
  - AlertBar
  - alert bar
  - Alert Sigcat
  - AlertBarTone
  - AlertBarProps
  - topbar
tags:
  - feedback
  - presentational
  - atom

last_reviewed: 2026-08-11
---

# AlertBar

## Purpose

- **Responsabilidad principal:** franja full-width con un label centrado, para
  comunicar un estado o conteo (ej. "5 TAREAS PENDIENTES") de forma persistente, no
  bloqueante.
- **Problema que resuelve:** el PDF de referencia ("ALERT" p.22 § "Alert Sigcat")
  tiene esta franja como una pieza propia, distinta de `AlertBanner` (tarjeta con
  ícono/descripción/acción, otro caso de uso, no se toca). Sin `AlertBar`, las
  screens que necesitan este topbar (Familia Tareas, p.5-9 del PDF de screens)
  quedaban sin la pieza real y sin nada que la reemplazara.
- **Alcance:** solo la franja + el label. Los íconos que aparecen a su izquierda en
  las screens reales (colapsar sidebar, atrás, adelante) **no son parte de este
  componente** — se componen aparte en cada screen consumidora.

Exclude: API details, implementation details, usage examples, composition — ver
las secciones correspondientes más abajo.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` p.22
"ALERT" § "Alert Sigcat". Medido 2026-08-11 vía `get_drawings()`/`get_text("dict")`.

---

# Behavioral Contract

## This component guarantees

- Renderiza una franja `width: 100%` con `label` centrado, `role="status"`.
- Dos tonos (`tone="default"` | `tone="alerta"`) — el label cambia de color según
  el tono, el resto de la franja (fondo, borde) no cambia.
- Fusiona `className` externa; repasa atributos nativos de
  `HTMLAttributes<HTMLDivElement>`.

## This component never

- Incluye slots de ícono, descripción o acción — solo `label`. Para esos casos usar
  `AlertBanner`, que es un componente distinto.
- Se cierra ni se auto-descarta — es una franja persistente, no una notificación
  temporal (para eso, ver `Toast`).
- Compone los íconos de navegación (colapsar sidebar, atrás, adelante) que aparecen
  junto a ella en las screens reales — eso es responsabilidad de la screen
  consumidora.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Proveer `label` — es la única prop requerida, sin default.

## Forbidden

- Usar `AlertBar` para notificaciones no bloqueantes con ícono/descripción/acción —
  usar `AlertBanner`.
- Usar `AlertBar` para notificaciones temporales con auto-dismiss — usar `Toast`.

## Recommendations

- Reservar `tone="alerta"` para estados que realmente requieren atención urgente
  (ej. "INCENDIO TIPO A - FASE 1"), no para variar el color sin motivo semántico.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Feedback |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/AlertBar.tsx |

---

# Public API

```tsx
import { AlertBar, type AlertBarProps, type AlertBarTone } from "@alejandria/ui-kit";
```

Tipos exportados:

- `AlertBar` — componente funcional.
- `AlertBarProps` — props del componente.
- `AlertBarTone` — `"default" | "alerta"`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto centrado de la franja. |
| `tone` | `AlertBarTone` | `"default"` | no | `"default"` (blanco) o `"alerta"` (rojo). |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos de la franja raíz. |

---

# Variants

## `default`

Label blanco (`#ffffff`). Ejemplo PDF: "3 ALERTAS NUEVAS".

## `alerta`

Label rojo (`#ff0404`). Ejemplo PDF: "INCENDIO TIPO A - FASE 1".

---

# States

| State | Description |
|--------|-------------|
| Único | Sin estado interno — el componente es puramente presentacional, controlado 100% por `label`/`tone`. |

---

# Accessibility

## Requirements

- `role="status"` en la franja raíz — anuncia el contenido a lectores de pantalla
  como una región de estado, sin interrumpir el foco.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="status"` | Fijo en la franja raíz. |

### Keyboard

Ninguno — el componente no es interactivo.

---

# Responsive Behavior

Ninguno — `width: 100%` se adapta al contenedor, sin breakpoints propios.

---

# Composition

## Purpose in Layout

- Topbar / banner de estado persistente.

## Parent

- Cualquier contenedor full-width (ej. `<main>` o un wrapper de topbar de screen).

## Children

- Ninguno — solo texto (`label`).

## Siblings

- En las screens de Familia Tareas: 3 botones de ícono (colapsar sidebar, atrás,
  adelante) a su izquierda, compuestos por la screen, no por `AlertBar`.

## Alternatives

- `AlertBanner` — notificación inline con ícono/descripción/acción.
- `Toast` — notificación temporal centrada con auto-dismiss.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `AlertBanner` | Componente distinto para otro caso de uso — no reemplaza ni es reemplazado por `AlertBar`. |
| `Toast` | Notificación temporal, misma familia visual del PDF "ALERT" p.22, distinto ciclo de vida. |

---

# Content Guidelines

## Labels

- Mayúsculas (el componente aplica `text-transform: uppercase` — el texto de
  entrada puede ir en cualquier caso).

## Values

No aplica — sin valores numéricos propios.

## Icons

No aplica — sin slot de ícono.

## Localization

`label` es texto libre, sin i18n propio del componente.

---

# Examples

## Basic

```tsx
<AlertBar label="3 ALERTAS NUEVAS" />
```

## Variant

```tsx
<AlertBar label="INCENDIO TIPO A - FASE 1" tone="alerta" />
```

## Composition

```tsx
<div className="screen-topbar">
  <button aria-label="Colapsar menú">…</button>
  <button aria-label="Atrás">…</button>
  <button aria-label="Adelante">…</button>
  <AlertBar label="5 TAREAS PENDIENTES" />
</div>
```

---

# Reasoning Examples

## User Request

"Necesito una franja arriba de la pantalla que diga cuántas tareas hay pendientes."

### Recommended Components

- `AlertBar`

### Why

Coincide 1:1 con "Alert Sigcat" del PDF — franja full-width, un label centrado, sin
necesidad de ícono/descripción/acción (eso sería `AlertBanner`, otro componente).

---

# Design Tokens

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-action` | Color | Fondo (`#494949`) |
| `--ds-color-pdf-border` | Color | Borde (`#606060`) |
| `--ds-color-white` | Color | Label, tono `default` |
| `--ds-color-pdf-critical` | Color | Label, tono `alerta` |
| `--ds-font-mono` | Typography | Familia del label (Source Code) |
| `--ds-font-weight-bold` | Typography | Peso del label |
| `--ds-tracking-label` | Typography | Letter-spacing del label |
| `--ds-border-width-hair` | Border | Ancho del borde (0.75px) |

---

# Implementation Notes

## Source File

```text
packages/ui/src/components/AlertBar.tsx
```

## Dependencies

- `../utils/cn` — merge de `className`.

## DOM Structure

```text
<div class="ds-alert-bar ds-alert-bar--{tone}" role="status">
  {label}
</div>
```

---

# Known Limitations

- **Padding/altura aproximados, no medidos del PDF.** La spec anotada solo da
  colores y tipografía del label, no la caja completa — `padding: 10px 24px` es un
  valor razonable, no una medida ÷2 citable. Ver `knowledge/specs/components/AlertBar.spec.md`.
- Solo 2 tonos (`default`/`alerta`) — el PDF solo muestra esos 2 ejemplos, no hay
  evidencia de más.

---

# Future Improvements

- [ ] Medir el padding/altura real si aparece una captura más completa de "Alert Sigcat".

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Creación — `005-alert-toast-filter`, PDF "ALERT" p.22 § "Alert Sigcat". |
