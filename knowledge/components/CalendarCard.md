---
id: calendar-card
name: CalendarCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/CalendarCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/CalendarCard

aliases:
  - tarjeta de calendario
  - calendar tile
  - widget de fechas
  - event tile
keywords:
  - CalendarCard
  - calendar
  - calendario
  - fecha
  - day
  - month
  - CALENDAR CARD
  - CalendarCardProps
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-07-21
---

# CalendarCard

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 15 — CALENDAR CARD** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 15).

## Purpose

Presenta un tile estático de fecha/evento (día, mes y descripción opcional) en pantallas PDF/reporting del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** mostrar una fecha compacta (`day` + `month`) con texto de apoyo opcional sobre la superficie PDF cálida (`#2a2927`) y borde hairline.
- **Problema que resuelve:** unificar el widget CALENDAR CARD del PDF sin acoplar un date-picker, grilla de mes ni lógica de agenda.
- **Alcance:** molécula presentacional basada en `<article class="ds-calendar-card">`; anatomía fija (`day` / `month` / `description?`); sin `children` libres.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<article class="ds-calendar-card">` con fondo opaco `var(--ds-color-pdf-surface-warm)` y borde `var(--ds-border-width-hair) solid var(--ds-color-pdf-line)`.
- `day` y `month` obligatorios; renderizados como dos líneas apiladas dentro de `.ds-calendar-card__date` (misma tipografía «Fecha»).
- `description` renderizada en `<p class="ds-calendar-card__description">` solo cuando su valor es truthy.
- Layout raíz en una columna (`display: grid`) con gap provisional `var(--ds-space-2)`.
- Padding raíz `7.5px 5px` (misma literal que `.ds-task--default` para PDF 15/10 @2×).
- Fusión de `className` externa con `ds-calendar-card` mediante `cn()`.
- Repaso de atributos nativos de `Omit<ComponentPropsWithoutRef<"article">, "children">` al `<article>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Implementa date-picking, grilla de calendario, selección de rango ni interacción de agenda.
- Expone ejes `variant`, `appearance`, `size` o `tone` (PDF p.15 muestra una sola apariencia).
- Admite `children` libres (omitidos de las props del host).
- Compone internamente `TaskCard`, `Card`, `Button` ni otros componentes del kit.
- Usa `forwardRef`.
- Define estados interactivos propios (`hover`, `focus`) en `.ds-calendar-card`.
- Aplica media queries ni breakpoints propios.
- Impone un `width`/`min-width` distinto al `max-width: 140px` provisional (reutilizado de `.ds-task--kanban`; PDF no anota tamaño).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `day` y `month` como `string`.
- Tratar PDF p.15 como referencia canónica de apariencia (escala display = anotación @2× ÷ 2).

## Forbidden

- Inventar props que no existan en `CalendarCardProps` (`variant`, `tone`, `size`, `children`, `onSelect`, etc.).
- Convertir el componente en un date-picker o calendario interactivo.
- Hardcodear hex reutilizables en lugar de tokens (`--ds-color-pdf-surface-warm`, `--ds-color-pdf-line`, `--ds-color-white`, `--ds-color-pdf-ink-muted`).
- Usar `CalendarCard` como contenedor genérico con contenido libre (`Card` cubre ese caso).
- Asumir que el layout día/mes apilado es una medición PDF (es una interpretación; ver spec).

## Recommendations

- Pasar `month` en abreviatura uppercase como en el PDF (`"AGO"`).
- Usar la story `Playground` como referencia de copy canónica PDF.
- Agrupar instancias en un grid CSS con `gap: 10`, como en `CalendarCard.stories.tsx` → `List`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Import | `import { CalendarCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  CalendarCard,
  type CalendarCardProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `CalendarCard` — componente funcional.
- `CalendarCardProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `day` | `string` | — | sí | Día de la fecha (PDF «Fecha»). Renderizado en `<span class="ds-calendar-card__day">`. |
| `month` | `string` | — | sí | Mes de la fecha (PDF «Fecha»). Renderizado en `<span class="ds-calendar-card__month">`. |
| `description` | `string` | — | no | Texto de apoyo. Renderizado en `<p class="ds-calendar-card__description">` solo si es truthy. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-calendar-card` en el `<article>` raíz. |
| `...props` | `Omit<ComponentPropsWithoutRef<"article">, "children">` | — | no | Atributos nativos del `<article>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). Sin `children`. |

---

# Variants

## Default

Una sola apariencia pública, alineada a PDF p.15 CALENDAR CARD. No hay modificadores BEM `ds-calendar-card--*` ni props de eje visual.

| Elemento | Rol visual (PDF p.15, display ÷2) |
|----------|-----------------------------------|
| Raíz | Fondo `#2a2927`, borde hairline `#c1c1c1`, padding `7.5px 5px` |
| Fecha (`day` / `month`) | Montserrat Bold `15pt` (`30pt` @2×), `#ffffff`, uppercase |
| Descripción | Montserrat Light `6pt` (`12pt` @2×), `#8a8b87`; sin `text-transform` |

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-calendar-card` con `day` y `month`. Sin estados `:hover`, `:focus` ni `:disabled` en CSS del tile. |
| With description | Cuando `description` es truthy, se muestra `.ds-calendar-card__description`. |
| Without description | Cuando `description` es falsy, el párrafo no se renderiza. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El `<article>` raíz agrupa el contenido de fecha y descripción en el árbol de accesibilidad.
- `day`, `month` y `description` quedan expuestos como contenido textual.
- El consumidor puede pasar atributos ARIA adicionales vía `...props`; el componente no define `role` ni `aria-live`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-labelledby`, etc. en el `<article>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado propio (tile presentacional, no interactivo). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`CalendarCard` no define media queries. El layout es una columna grid con `max-width: 140px` provisional (reutilizado de `.ds-task--kanban` / TaskCard compact tile; PDF no anota ancho).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. `display: grid`, gap provisional `8px`. |
| Storybook decorator | `padding: 32` en contenedor `fit-content` (`CalendarCard.stories.tsx`), mismo patrón que `TaskCard`. El card dibuja fondo opaco propio; no hace falta override de canvas. |

---

# Composition

## Purpose in Layout

- **Data display** — tile de fecha/evento en listas o paneles PDF.
- **Container** — anatomía fija (fecha + descripción); no admite `children` libres.

## Parent

- Listas o stacks de eventos (p. ej. story `List`).
- Contenedor centrado de Storybook en `CalendarCard.stories.tsx`.
- Cualquier layout PDF/reporting que necesite un marcador de fecha estático.

## Children

- No admite `children`. Solo contenido derivado de `day`, `month` y `description`.

## Siblings

- `TaskCard` — tarjeta operativa con tono/variante; misma superficie PDF cálida y padding 7.5/5 en `default`.
- `Card` — contenedor compuesto de consola con slots; no es el tile de fecha PDF.
- `Empty` — empty state sin fondo; no solapa el rol calendar tile.

## Alternatives

- `TaskCard` — tarea operativa con código/estado/meta; no es un widget de fecha.
- `Card` — panel con `children` / `footer`; no es CALENDAR CARD.
- Date-picker / calendario de terceros — fuera del alcance de PDF p.15 (tile estático).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `TaskCard` | Hermano Cards PDF: misma combinación de tokens de superficie/borde y literal de padding `7.5px 5px` en `.ds-task--default`. |
| `InvestigationCard` | Hermano Cards con anatomía fija y `Omit<…, "children">` en el host. |
| `Card` | Contenedor de detalle con superficie de consola; no solapa el rol calendar tile. |
| `Empty` | Precedente de `description?` opcional y gap raíz provisional. |

---

# Content Guidelines

## Labels

- `day`: número o etiqueta corta del día (PDF: `"13"`).
- `month`: abreviatura de mes en mayúsculas (PDF: `"AGO"`).
- `description`: frase breve del evento (PDF: `"Reunión con el teniente por el proyecto"`).

## Values

- No aplica métricas numéricas distintas de la fecha textual.

## Icons

- No hay slot de ícono en PDF p.15.

## Localization

- Las stories usan español (rioplatense) como en el PDF. El componente no impone idioma ni formatea fechas.

---

# Examples

## Basic

```tsx
import { CalendarCard } from "@alejandria/ui-kit";

<CalendarCard day="13" month="AGO" description="Reunión con el teniente por el proyecto." />
```

## Variant

No hay variantes públicas. La story `WithoutDescription` omite el texto de apoyo:

```tsx
import { CalendarCard } from "@alejandria/ui-kit";

<CalendarCard day="13" month="AGO" />
```

## Composition

```tsx
import { CalendarCard } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 10 }}>
  <CalendarCard day="13" month="AGO" description="Reunión con el teniente por el proyecto." />
  <CalendarCard day="21" month="ABR" description="Resumen minimo e indispensable de la tarea a realizar." />
  <CalendarCard day="23" month="JUL" description="Subactividad — Causa Corion." />
</div>
```

---

# Reasoning Examples

## User Request

Mostrar un evento del 13 de agosto con descripción corta.

### Recommended Components

- `CalendarCard`

### Why

Patrón de `CalendarCard.stories.tsx` → `Playground` alineado a PDF p.15.

---

## User Request

Selector de fecha interactivo para filtrar un reporte.

### Recommended Components

- No usar `CalendarCard` (tile estático). Componer control de fecha fuera del kit o un patrón futuro.

### Why

PDF p.15 es un widget de fecha/evento estático, no un date-picker.

---

## User Request

Tarjeta de tarea con código, estado y tono danger.

### Recommended Components

- `TaskCard tone="danger"`

### Why

`CalendarCard` no tiene `tone`, `code` ni `status`; es solo fecha + descripción.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface-warm` | color | Fondo de `.ds-calendar-card` (`#2a2927`) |
| `--ds-color-pdf-line` | color | Color del borde (`#c1c1c1`) |
| `--ds-border-width-hair` | border | Ancho del borde (`0.75px`) |
| `--ds-radius-xs` | radius | `border-radius` de la raíz |
| `--ds-space-2` | space | Gap raíz entre bloque de fecha y descripción (`8px`, provisional) |
| `--ds-color-white` | color | Color de `.ds-calendar-card__day` / `__month` |
| `--ds-color-pdf-ink-muted` | color | Color de `.ds-calendar-card__description` (`#8a8b87`) |
| `--ds-font-body` | typography | `font-family` de fecha y descripción (Montserrat) |
| `--ds-font-weight-bold` | typography | Peso de día/mes |
| `--ds-font-weight-light` | typography | Peso de la descripción |
| `--ds-leading-tight` | typography | `line-height` de día/mes |
| `--ds-leading-body` | typography | `line-height` de la descripción |

Nota: el padding `7.5px 5px` es literal reutilizada de `.ds-task--default` (PDF 15/10 @2×); no hay token de padding dedicado.

---

# Implementation Notes

This section is intended for maintainers extending the component.

> **Interno (mantenedores).** Las rutas de esta sección (Source File, Dependencies, DOM Structure)
> son fuente del monorepo (`packages/ui/**`); no forman parte de la API publicada de
> `@alejandria/ui-kit`. Un consumidor externo usa el import de arriba y `@alejandria/ui-kit/style.css`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/CalendarCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-calendar-card`, `ds-calendar-card__date`, `ds-calendar-card__day`, `ds-calendar-card__month`, `ds-calendar-card__description`)

## DOM Structure

```text
article.ds-calendar-card
├── div.ds-calendar-card__date
│   ├── span.ds-calendar-card__day
│   └── span.ds-calendar-card__month
└── p.ds-calendar-card__description (solo si description es truthy)
```

---

# Known Limitations

- No expone `children`, `variant`, `tone`, `size` ni interacción de calendario.
- El layout día/mes apilado es una interpretación (la capa de texto del PDF pierde posición; misma caveat que p.2).
- El gap raíz (`8px`) no está anotado en PDF p.15; es provisional (ver spec).
- El tile tiene un `max-width: 140px` provisional (no medido en PDF; reutilizado del compact tile de TaskCard / `.ds-task--kanban`).
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Playground`, `WithoutDescription`, `List`).

---

# Future Improvements

- [ ] Confirmar con design si día/mes van apilados o en línea
- [ ] Confirmar gap inter-bloque y éventual `width` / `min-width`
- [ ] Integrar en un patrón de lista de eventos cuando se documente

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `CalendarCard` / `CalendarCardProps` con estilos `ds-calendar-card` según PDF p.15 CALENDAR CARD, y stories `Playground`, `WithoutDescription`, `List`. |
