---
id: chart-card
name: ChartCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/ChartCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ChartCard

aliases:
  - tarjeta de gráfico
  - contenedor de gráfico
keywords:
  - ChartCard
  - gráfico
  - chart
  - tarjeta
  - título
  - footer
  - SVG
  - ChartCardProps
tags:
  - data-display
  - charts
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# ChartCard

## Purpose

Provee un contenedor reutilizable con título, área de contenido y pie de texto para gráficos en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** envolver contenido de gráfico (`children`) en una tarjeta con jerarquía visual fija: encabezado, cuerpo centrado y pie.
- **Problema que resuelve:** unificar el marco visual de tarjetas con gráficos sin acoplar un tipo de chart ni librería de visualización externa.
- **Alcance:** componente presentacional basado en `<div>` con elementos semánticos `<header>` y `<footer>`; el consumidor o componentes derivados proveen el contenido del gráfico vía `children`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-chart-card">` con estructura fija de tres zonas.
- `title` renderizado siempre en `<header class="ds-chart-card__title">`.
- `children` renderizado siempre en `<div class="ds-chart-card__body">`.
- `footer` renderizado siempre en `<footer class="ds-chart-card__footer">`.
- Fusión de `className` externa con `ds-chart-card` mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Renderiza gráficos por sí mismo (barras, líneas, dona, etc.).
- Obtiene, transforma ni formatea datos numéricos.
- Compone internamente `Card`, `BarChartCard`, `MetricCard` ni otros componentes del kit (los derivados componen `ChartCard`, no al revés).
- Define variantes visuales (`variant`, `tone`, `size`, etc.).
- Define interactividad, tooltips ni animaciones.
- Aplica estilos responsivos propios mediante media queries.
- Define roles ARIA ni manejo de teclado propios en la raíz.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title`, `footer` y `children` en cada instancia.
- Usar `children` para el área de gráfico (SVG, placeholder o contenido custom).

## Forbidden

- Inventar props que no existan en `ChartCardProps` (`variant`, `eyebrow`, `actions`, `data`, etc.).
- Asumir que `ChartCard` extiende o reutiliza `Card` (`ds-card`); usa `ds-chart-card`, implementación paralela.
- Omitir `title` o `footer`; ambos son obligatorios en la firma de props.
- Confiar en slots adicionales más allá de `children`.

## Recommendations

- Preferir `BarChartCard`, `DonutChartCard` o `LineChartCard` cuando el caso de uso coincida con los gráficos SVG incluidos en el kit.
- Agrupar varias tarjetas en un grid, como en la story `Gallery` (`repeat(2, minmax(280px, 1fr))`).
- Preformatear el texto de `footer` en el consumidor como contexto interpretativo del gráfico (p. ej. `"Sur concentra el 42% del total semanal"`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Charts |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/ChartCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  ChartCard,
  type ChartCardProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `ChartCard` — componente funcional.
- `ChartCardProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la tarjeta. Renderizado en `<header class="ds-chart-card__title">`. |
| `footer` | `string` | — | sí | Texto del pie. Renderizado en `<footer class="ds-chart-card__footer">`. |
| `children` | `ReactNode` | — | sí | Contenido del área de gráfico. Renderizado en `<div class="ds-chart-card__body">`. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-chart-card` en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada en CSS mediante `.ds-chart-card` y sus elementos internos. Fondo semitransparente, borde gris, radio extra pequeño, layout en grid con `gap: 10px`, `min-width: 220px` y cuerpo con `min-height: 120px` centrado en flex.

No existen props de variante visual; `title`, `footer` y el contenido de `children` determinan el aspecto funcional, no variantes de estilo.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-chart-card`. Sin estados `:hover`, `:focus`, `:active` ni `:disabled` definidos en CSS. |
| With children | El cuerpo centra su contenido con `display: flex`, `justify-content: center` y `align-items: center`. |
| Empty body | Si `children` es `null` o vacío, el cuerpo conserva `min-height: 120px` sin contenido visible. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa `<header>` y `<footer>` nativos para título y pie; el contenido principal queda en un `<div>`.
- El texto de `title` y `footer` queda expuesto en el árbol de accesibilidad como contenido estático.
- No define rol, nombre accesible ni descripción propios en la raíz; el consumidor puede añadirlos vía `...props`.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.
- Los gráficos SVG en componentes derivados definen su propia accesibilidad (`role="img"`, `aria-label`); `ChartCard` base no aplica atributos ARIA al área de gráfico.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `role`, etc. en el `<div>` raíz. El componente no los aplica por defecto. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo configure mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`ChartCard` no define media queries. Impone `min-width: 220px` en `.ds-chart-card` y `min-height: 120px` en `.ds-chart-card__body`; el ancho efectivo lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Los SVG hijos usan `max-width: 100%` y `width: 100%` cuando aplican clases de chart. |
| Storybook | Decorator con `minWidth: 320` y `padding: 32`; el layout responsivo depende del decorator, no del componente. |
| Story `Gallery` | Grid de dos columnas en el contenedor padre; el colapso depende del grid, no de `ChartCard`. |

---

# Composition

## Purpose in Layout

- **Container** — marco visual para gráficos operativos en dashboards y paneles de consola.
- **Summary** — tarjeta compacta con título, visualización y pie interpretativo.
- **Detail** — bloque de visualización adyacente a KPIs o tablas en la misma vista.

## Parent

- `div` con ancho mínimo en el decorator de `ChartCard.stories.tsx` (`minWidth: 320`).
- Grid de galería en la story `Gallery` (`gridTemplateColumns: repeat(2, minmax(280px, 1fr))`).

## Children

- Cualquier `ReactNode` en `children`: placeholder en la story `Base`, o SVG renderizado por `BarChartCard`, `DonutChartCard` y `LineChartCard`.

## Siblings

- `BarChartCard`, `DonutChartCard`, `LineChartCard` — especializaciones que componen `ChartCard` internamente.
- `MetricCard` — KPI escalar de solo lectura; complemento de resumen, no sustituto de gráfico.
- `Card` — contenedor compuesto paralelo con slots distintos; no comparte estilos ni estructura.

## Alternatives

- `Card` — paneles compuestos con `eyebrow`, `title`, `description`, `actions`, `footer` y `children` libres; no orientado a gráficos SVG fijos.
- `MetricCard` — valor KPI puntual sin visualización chart.
- Librería de charts externa dentro de `ChartCard` — posible vía `children`, pero no hay integración ni ejemplos en el repositorio.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `BarChartCard` | Compone `ChartCard` y renderiza SVG de barras verticales en `children`. |
| `DonutChartCard` | Compone `ChartCard` y renderiza SVG de dona con estadísticas opcionales en `children`. |
| `LineChartCard` | Compone `ChartCard` y renderiza SVG de línea con área rellena en `children`. |
| `Card` | Contenedor paralelo (`ds-card`); no extiende ni usa `ChartCard`. Documentado en `Card.md`. |
| `MetricCard` | Alternativa para KPI escalar sin gráfico; mencionado como alternativa en `MetricCard.md`. |

---

# Content Guidelines

## Labels

- `title`: descriptor breve del gráfico (p. ej. `"Contenedor base"`, `"Incidentes por zona"`, `"Tareas"`, `"Alertas por hora"`). El CSS aplica `text-transform: uppercase` y `letter-spacing: 0.25em` en `.ds-chart-card__title`.

## Values

- `footer`: texto interpretativo o de contexto (p. ej. `"Pie de tarjeta con texto descriptivo"`, `"Sur concentra el 42% del total semanal"`, `"Seguimiento operativo"`). Sin formato automático; el consumidor preformatea porcentajes y fechas.

## Icons

- `ChartCard` no expone prop `icon` ni slot para iconos en título o pie.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `title` y `footer`.

---

# Examples

## Basic

```tsx
import { ChartCard } from "@alejandria/ui-kit";

<ChartCard title="Contenedor base" footer="Pie de tarjeta con texto descriptivo">
  <div>Slot para children</div>
</ChartCard>
```

## Variant

`ChartCard` no expone variantes visuales. La única configuración es el contenido de `children`.

```tsx
import { ChartCard } from "@alejandria/ui-kit";

<ChartCard title="Área custom" footer="Contenido definido por el consumidor">
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="40" fill="var(--ds-color-teal)" />
  </svg>
</ChartCard>
```

## Composition

```tsx
import { BarChartCard, ChartCard, DonutChartCard, LineChartCard } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(280px, 1fr))" }}>
  <BarChartCard
    title="Incidentes por zona"
    footer="Sur concentra el 42% del total semanal"
    data={[
      { label: "Norte", value: 18 },
      { label: "Centro", value: 32 },
      { label: "Sur", value: 44 },
      { label: "Este", value: 26 }
    ]}
  />
  <LineChartCard
    title="Alertas por hora"
    footer="Pico registrado a las 18:00 con 38 eventos"
    data={[
      { label: "08", value: 12 },
      { label: "10", value: 18 },
      { label: "12", value: 24 }
    ]}
  />
</div>
```

---

# Reasoning Examples

## User Request

Marco visual con título y pie para un gráfico SVG custom.

### Recommended Components

- `ChartCard`

### Why

`ChartCard` expone el slot `children` sin acoplar tipo de chart; la story `Base` demuestra un placeholder en el cuerpo.

---

## User Request

Gráfico de barras de incidentes por zona con pie interpretativo.

### Recommended Components

- `BarChartCard`

### Why

`BarChartCard` compone `ChartCard` y renderiza el SVG de barras; patrón de `ChartCard.stories.tsx` → `BarChart`.

---

## User Request

Panel de misión con eyebrow, acciones y cuerpo libre para formularios.

### Recommended Components

- `Card`

### Why

`ChartCard` exige `title` y `footer` como strings fijos y no admite `eyebrow`, `actions` ni la estructura de `Card`.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-radius-xs` | radius | `border-radius` de `.ds-chart-card` |
| `--ds-color-ink` | color | `color` base de `.ds-chart-card` |
| `--ds-font-display` | typography | `font-family` de `.ds-chart-card__title` |
| `--ds-font-body` | typography | `font-family` de `.ds-chart-card__footer` |

Nota: el fondo (`rgb(6 6 6 / 0.2)`), el borde (`rgb(193 193 193 / 0.6)`), el color del título (`#8a8b87`) y el color del pie (`#ffffff`) están hardcodeados y no usan tokens del sistema.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/ChartCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-chart-card`, `ds-chart-card__title`, `ds-chart-card__body`, `ds-chart-card__footer`)

## DOM Structure

```text
div.ds-chart-card
├── header.ds-chart-card__title
├── div.ds-chart-card__body
│   └── children
└── footer.ds-chart-card__footer
```

---

# Known Limitations

- No renderiza ningún tipo de gráfico por sí mismo; requiere `children` o un componente derivado.
- No comparte implementación ni estilos con `Card` (`ds-card`).
- Sin estados interactivos (`hover`, `focus`, `disabled`) ni animaciones.
- Sin media queries; el layout responsivo depende del contenedor padre.
- Colores de título y pie hardcodeados; migración incompleta a tokens del design system.
- Sin uso en `apps/web/src/App.tsx` ni en `Components.stories.tsx` → `OperationsConsole`.
- Sin tests unitarios ni de integración en el repositorio.
- No mencionado en `README.md`.

---

# Future Improvements

- [ ] Migrar colores hardcodeados de título, pie, fondo y borde a tokens del design system
- [ ] Integración en `Components.stories.tsx` o `apps/web` para demostrar uso en consola completa
- [ ] Tests de renderizado de `title`, `footer` y `children`
- [ ] Storybook dedicado por componente derivado si se separan las stories

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `ChartCard` y `ChartCardProps` con estilos `ds-chart-card` y documentación JSDoc en español. Stories en Storybook bajo `Alejandria/ChartCard` (`Base`, `BarChart`, `DonutChart`, `LineChart`, `Gallery`). Export en `packages/ui/src/index.ts`. Referencias cruzadas en `Card.md` y `MetricCard.md`. |
