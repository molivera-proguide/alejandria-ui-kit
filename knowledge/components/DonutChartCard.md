---
id: donut-chart-card
name: DonutChartCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/DonutChartCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ChartCard

aliases:
  - tarjeta de dona
  - gráfico de anillo
  - donut chart
keywords:
  - DonutChartCard
  - donut
  - dona
  - anillo
  - SVG
  - proporción
  - DonutChartDatum
  - DonutChartStat
  - DonutChartCardProps
tags:
  - data-display
  - charts
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# DonutChartCard

## Purpose

Presenta un gráfico de dona en SVG con estadísticas opcionales flotantes, dentro de una tarjeta con título y pie en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** renderizar segmentos circulares proporcionales a valores numéricos sobre un anillo de seguimiento, con estadísticas de texto opcionales posicionadas de forma absoluta.
- **Problema que resuelve:** visualizar proporciones o distribuciones (p. ej. tareas en fecha vs atrasadas) sin librerías de charts externas.
- **Alcance:** componente presentacional que compone `ChartCard` y genera SVG puro (`ds-donut-chart`) más bloques de estadísticas; el consumidor provee `data`, stats opcionales y `total` de referencia.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Composición interna de `ChartCard` con las props `title` y `footer` recibidas.
- Renderizado de un contenedor `<div class="ds-donut-chart__layout">` con SVG y stats opcionales.
- SVG `<svg class="ds-donut-chart">` con `viewBox="0 0 120 120"` (dimensiones fijas en código).
- Círculo de seguimiento (`<circle class="ds-donut-chart__track">`) siempre visible.
- Un segmento (`<circle class="ds-donut-chart__segment">`) por cada entrada en `data`, con arco calculado mediante `strokeDasharray` y `strokeDashoffset`.
- `chartTotal` para escala de segmentos: `total` si se provee, o `100` por defecto.
- Color de segmento: `item.color` si está definido; si no, ciclo sobre `CHART_COLORS` (tokens `--ds-color-teal`, `--ds-color-blue`, `--ds-color-green`, `--ds-color-amber`, `--ds-color-coral`).
- `primaryStat` renderizado en `<div class="ds-donut-chart__stat ds-donut-chart__stat--primary">` solo cuando es truthy, con `<strong>` para `value` y `<span>` para `label`.
- `secondaryStat` renderizado en `<div class="ds-donut-chart__stat ds-donut-chart__stat--secondary">` solo cuando es truthy, con la misma estructura.
- `role="img"` y `aria-label={`Gráfico de dona: ${title}`}` en el SVG.
- Fusión de `className` y `...props` en el `ChartCard` raíz.
- Clave React de cada segmento: `item.label`.
- Rotación de segmentos: `transform: rotate(-90deg)` vía CSS en `.ds-donut-chart__segment`.

## This component never

- Obtiene datos de API ni calcula porcentajes automáticamente para `primaryStat` / `secondaryStat`.
- Renderiza leyenda integrada con las etiquetas de `data` dentro del SVG.
- Muestra etiquetas de segmento sobre el anillo.
- Define interactividad (hover, clic, selección de segmento).
- Expone prop `children`; omite `children` de `HTMLAttributes<HTMLDivElement>`.
- Usa librerías de visualización externas.
- Aplica estilos responsivos propios mediante media queries en el layout de stats.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title`, `footer` y `data` en cada instancia.
- Cada `DonutChartDatum` debe incluir `label` (string) y `value` (number).

## Forbidden

- Inventar props que no existan en `DonutChartCardProps` (`variant`, `children`, `onSegmentClick`, etc.).
- Asumir que `total` se calcula como suma de `data[].value`; por defecto es `100`.
- Asumir que `primaryStat` y `secondaryStat` se derivan automáticamente de `data`.
- Usar etiquetas duplicadas en `data` (provocan claves React duplicadas).
- Pasar `children` esperando renderizado en el cuerpo.

## Recommendations

- Alinear `total` con la suma esperada de segmentos o con el 100 % de referencia del dominio.
- Preformatear `primaryStat.value` y `secondaryStat.value` en el consumidor (p. ej. `"45%"`).
- Usar colores custom en `data[].color` cuando la paleta por índice no aplique (como en la story: `#ffffff`, `#8a8b87`).
- Proveer `primaryStat` y `secondaryStat` cuando se necesiten cifras destacadas junto al anillo, como en `ChartCard.stories.tsx` → `DonutChart`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Charts |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/DonutChartCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  DonutChartCard,
  type DonutChartCardProps,
  type DonutChartDatum,
  type DonutChartStat
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `DonutChartCard` — componente funcional.
- `DonutChartCardProps` — props del componente.
- `DonutChartDatum` — punto de datos para cada segmento del anillo.
- `DonutChartStat` — par valor/etiqueta para estadísticas flotantes.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la tarjeta. Reenviado a `ChartCard`. |
| `footer` | `string` | — | sí | Pie de la tarjeta. Reenviado a `ChartCard`. |
| `data` | `DonutChartDatum[]` | — | sí | Segmentos del anillo. Cada entrada genera un `<circle class="ds-donut-chart__segment">`. |
| `primaryStat` | `DonutChartStat` | — | no | Estadística principal posicionada a la derecha del layout. Renderizada solo si es truthy. |
| `secondaryStat` | `DonutChartStat` | — | no | Estadística secundaria posicionada abajo a la izquierda. Renderizada solo si es truthy. |
| `total` | `number` | `100` | no | Total de referencia para calcular la longitud de cada arco (`item.value / chartTotal`). |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `ChartCard` raíz. |
| `...props` | `Omit<HTMLAttributes<HTMLDivElement>, "children">` | — | no | Atributos nativos del `<div>` raíz de `ChartCard`. |

### DonutChartDatum

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Identificador del segmento. Usado como clave React; no se renderiza visualmente en el SVG. |
| `value` | `number` | — | sí | Magnitud del segmento respecto a `total`. |
| `color` | `string` | color de `CHART_COLORS[index]` | no | Color del trazo del segmento (`stroke`). |

### DonutChartStat

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `value` | `string` | — | sí | Valor destacado. Renderizado en `<strong>`. |
| `label` | `string` | — | sí | Etiqueta descriptiva. Renderizada en `<span>`. |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada. Anillo con `STROKE = 14`, segmentos con `strokeLinecap="butt"`, track semitransparente, layout relativo con SVG desplazado (`left: 90px`, `width: 120px`) y stats en posición absoluta (primaria centrada verticalmente a la derecha; secundaria abajo a la izquierda).

La personalización por segmento (`DonutChartDatum.color`) y la presencia opcional de `primaryStat` / `secondaryStat` no constituyen variantes de componente; son configuración de datos y contenido.

---

# States

| State | Description |
|--------|-------------|
| Default | Anillo con segmentos según `data` y `total`. Sin estados interactivos en CSS. |
| With primaryStat | Muestra bloque `.ds-donut-chart__stat--primary` con valor grande (`font-size: 1.75rem`). |
| With secondaryStat | Muestra bloque `.ds-donut-chart__stat--secondary` con valor mediano (`font-size: 1.35rem` en `strong`). |
| Without stats | Solo SVG y track; sin nodos de estadística. |
| Partial total | Si la suma de `data[].value` es menor que `total` (p. ej. 45 + 30 con `total` default 100), el anillo no se completa. |
| Custom colors | Colores hex o tokens en `data[].color` sustituyen la paleta por índice. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El SVG usa `role="img"` y `aria-label` con el texto `Gráfico de dona: {title}`.
- Las estadísticas (`primaryStat`, `secondaryStat`) se renderizan como texto HTML visible (`<strong>`, `<span>`) cuando se proveen.
- Las etiquetas de `DonutChartDatum.label` no se exponen visualmente en el gráfico; solo las stats opcionales aportan texto descriptivo adicional.
- `title` y `footer` de `ChartCard` quedan en `<header>` y `<footer>`.
- No es interactivo; segmentos no reciben foco ni responden a teclado.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="img"` | Aplicado en el `<svg class="ds-donut-chart">`. |
| `aria-label` | `Gráfico de dona: ${title}` en el SVG. |
| Atributos vía `...props` | Reenviados al `<div class="ds-chart-card">` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`DonutChartCard` no define media queries. El layout usa posicionamiento absoluto fijo para stats (`.ds-donut-chart__stat--primary`, `--secondary`) y SVG con ancho fijo de `120px` desplazado con `left: 90px`. El contenedor `.ds-donut-chart__layout` tiene `min-height: 132px` y `width: 100%`.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Posiciones de stats y SVG son fijas en CSS; pueden solaparse o desbordar en contenedores estrechos. |
| Storybook | Decorator con `minWidth: 320`; story `Gallery` en grid de dos columnas. |
| `apps/web` | Sin uso documentado. |

---

# Composition

## Purpose in Layout

- **Summary** — proporción de estados (en fecha vs atrasadas) con cifras destacadas.
- **Detail** — bloque de distribución en galería de charts.
- **Container** — delega marco en `ChartCard`; cuerpo con layout de dona y stats.

## Parent

- `ChartCard` — composición interna obligatoria.
- Grid de galería en `ChartCard.stories.tsx` → `Gallery`.

## Children

- No admite `children`. El cuerpo contiene el layout generado internamente.

## Siblings

- `BarChartCard`, `LineChartCard` — otros charts en la misma galería.
- `MetricCard` — KPI escalar; no muestra proporciones en anillo.

## Alternatives

- `BarChartCard` — comparación categórica con barras verticales.
- `ProgressRing` — indicador circular de avance con valor y etiqueta central; no segmentos múltiples.
- `MetricCard` — valor puntual sin visualización de distribución.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ChartCard` | Contenedor base; `DonutChartCard` lo compone. |
| `BarChartCard` | Chart alternativo; comparte `ChartCard` y paleta `CHART_COLORS`. |
| `LineChartCard` | Chart alternativo para series temporales. |
| `ProgressRing` | Indicador circular de progreso único; no compone `DonutChartCard` ni comparte implementación SVG. |
| `MetricCard` | KPI textual; alternativa sin gráfico de proporciones. |
| `Card` | Contenedor paralelo; sin relación de composición. |

---

# Content Guidelines

## Labels

- `title`: descriptor del gráfico (p. ej. `"Tareas"`).
- `primaryStat.label` / `secondaryStat.label`: etiqueta de la estadística (p. ej. `"En fecha"`, `"Atrasadas"`).
- `data[].label`: identificador interno; no visible en el chart; usar strings únicos.
- `footer`: contexto operativo (p. ej. `"Seguimiento operativo"`).

## Values

- `data[].value`: magnitud numérica del segmento respecto a `total`.
- `primaryStat.value` / `secondaryStat.value`: strings preformateados (p. ej. `"45%"`, `"30%"`).
- `total`: referencia de escala; por defecto `100` aunque la suma de `data` sea menor.

## Icons

- `DonutChartCard` no expone prop `icon` ni iconos en segmentos o stats.

## Localization

- Las stories usan español. El componente no impone idioma.

---

# Examples

## Basic

```tsx
import { DonutChartCard } from "@alejandria/ui-kit";

<DonutChartCard
  title="Tareas"
  footer="Seguimiento operativo"
  data={[
    { label: "En fecha", value: 45, color: "#ffffff" },
    { label: "Atrasadas", value: 30, color: "#8a8b87" }
  ]}
  primaryStat={{
    value: "45%",
    label: "En fecha"
  }}
  secondaryStat={{
    value: "30%",
    label: "Atrasadas"
  }}
/>
```

## Variant

`total` explícito y colores de paleta por índice.

```tsx
import { DonutChartCard } from "@alejandria/ui-kit";

<DonutChartCard
  title="Cobertura"
  footer="Distribución por región"
  total={75}
  data={[
    { label: "Norte", value: 25 },
    { label: "Sur", value: 50 }
  ]}
  primaryStat={{
    value: "50",
    label: "Sur"
  }}
/>
```

## Composition

```tsx
import { BarChartCard, DonutChartCard, LineChartCard } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(280px, 1fr))" }}>
  <DonutChartCard
    title="Tareas"
    footer="Seguimiento operativo"
    data={[
      { label: "En fecha", value: 45, color: "#ffffff" },
      { label: "Atrasadas", value: 30, color: "#8a8b87" }
    ]}
    primaryStat={{ value: "45%", label: "En fecha" }}
    secondaryStat={{ value: "30%", label: "Atrasadas" }}
  />
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
</div>
```

---

# Reasoning Examples

## User Request

Mostrar proporción de tareas en fecha vs atrasadas con porcentajes destacados.

### Recommended Components

- `DonutChartCard`

### Why

Patrón de `ChartCard.stories.tsx` → `DonutChart` con `primaryStat`, `secondaryStat` y segmentos de 45 / 30.

---

## User Request

Comparar valores absolutos por zona en barras verticales.

### Recommended Components

- `BarChartCard`

### Why

`DonutChartCard` modela proporciones en anillo; no incluye ejes categóricos con barras.

---

## User Request

Avance del 75 % de una única operación en círculo.

### Recommended Components

- `ProgressRing`

### Why

`DonutChartCard` segmenta múltiples valores en un anillo; `ProgressRing` es un indicador de progreso único usado en `Card` en demos.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-teal` | color | Color por defecto de segmento (índice 0 en `CHART_COLORS`) |
| `--ds-color-blue` | color | Color por defecto de segmento (índice 1) |
| `--ds-color-green` | color | Color por defecto de segmento (índice 2) |
| `--ds-color-amber` | color | Color por defecto de segmento (índice 3) |
| `--ds-color-coral` | color | Color por defecto de segmento (índice 4) |
| `--ds-font-body` | typography | `font-family` de `.ds-donut-chart__stat strong` y `span` |

Nota: el track usa `stroke: #8a8b87` hardcodeado. Los colores de stats (`#fff`, `#8a8b87`) están hardcodeados. Posiciones del SVG (`left: 90px`) y stats son fijas en CSS. `ChartCard` aporta tokens adicionales en el contenedor.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/DonutChartCard.tsx
```

## Dependencies

- `ChartCard` from `packages/ui/src/components/ChartCard.tsx`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-chart-card`, `ds-donut-chart`, `ds-donut-chart__layout`, `ds-donut-chart__track`, `ds-donut-chart__segment`, `ds-donut-chart__stat`, `ds-donut-chart__stat--primary`, `ds-donut-chart__stat--secondary`)

## DOM Structure

```text
div.ds-chart-card
├── header.ds-chart-card__title
├── div.ds-chart-card__body
│   └── div.ds-donut-chart__layout
│       ├── svg.ds-donut-chart[role=img]
│       │   ├── circle.ds-donut-chart__track
│       │   └── circle.ds-donut-chart__segment × data.length
│       ├── div.ds-donut-chart__stat--primary (si primaryStat)
│       │   ├── strong
│       │   └── span
│       └── div.ds-donut-chart__stat--secondary (si secondaryStat)
│           ├── strong
│           └── span
└── footer.ds-chart-card__footer
```

Constantes internas: `SIZE = 120`, `STROKE = 14`, `RADIUS = (SIZE - STROKE) / 2`, `CENTER = SIZE / 2`, `CIRCUMFERENCE = 2 * π * RADIUS`.

---

# Known Limitations

- `total` por defecto es `100`, no la suma de `data[].value`; el anillo puede quedar incompleto (story: 45 + 30 con total implícito 100).
- `DonutChartDatum.label` no se muestra en el gráfico ni en leyenda integrada.
- Sin tooltips, interactividad ni animaciones.
- Layout de stats y SVG con posiciones absolutas/fijas; frágil en contenedores estrechos.
- Etiquetas duplicadas en `data` generan claves React duplicadas.
- `primaryStat` y `secondaryStat` deben preformatearse en el consumidor; no se calculan desde `data`.
- Sin uso en `apps/web` ni en `Components.stories.tsx`.
- Sin tests en el repositorio.
- Colores de track y stats hardcodeados.

---

# Future Improvements

- [ ] Calcular `total` como suma de `data` cuando no se provee explícitamente
- [ ] Leyenda o etiquetas de segmento visibles en el SVG
- [ ] Layout responsivo de stats sin posicionamiento absoluto fijo
- [ ] Tooltips e interactividad si se definen en diseño
- [ ] Tests de arcos, colores y renderizado condicional de stats
- [ ] Integración en consola demo

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `DonutChartCard`, `DonutChartCardProps`, `DonutChartDatum` y `DonutChartStat` con SVG puro, stats opcionales y composición de `ChartCard`. Documentación JSDoc en español. Stories en `ChartCard.stories.tsx` (`DonutChart`, `Gallery`). Export en `packages/ui/src/index.ts`. |
