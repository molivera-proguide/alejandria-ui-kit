---
id: line-chart-card
name: LineChartCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/LineChartCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ChartCard

aliases:
  - tarjeta de línea
  - gráfico de línea
  - line chart
keywords:
  - LineChartCard
  - line chart
  - línea
  - serie temporal
  - SVG
  - área
  - LineChartDatum
  - LineChartCardProps
tags:
  - data-display
  - charts
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# LineChartCard

## Purpose

Presenta un gráfico de línea con área rellena y rejilla horizontal en SVG, dentro de una tarjeta con título y pie en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** conectar puntos numéricos con una línea y un área semitransparente bajo la curva, con etiquetas de eje en la parte inferior, dentro del contenedor `ChartCard`.
- **Problema que resuelve:** visualizar series temporales o de tendencia (p. ej. alertas por hora) sin librerías de charts externas.
- **Alcance:** componente presentacional que compone `ChartCard` y genera SVG puro (`ds-line-chart`); el consumidor provee `data` como array de `LineChartDatum`.

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
- Renderizado de un `<svg class="ds-line-chart">` con `viewBox="0 0 280 120"` (dimensiones fijas en código).
- Cuatro líneas de rejilla horizontal (`.ds-line-chart__grid`) en ticks `0.25`, `0.5`, `0.75` y `1.0` del eje vertical.
- Área rellena (`<path class="ds-line-chart__area">`) bajo la línea, con `fill={color}` y `opacity: 0.18` vía CSS.
- Línea (`<path class="ds-line-chart__line">`) con `stroke={color}` y `stroke-width: 2` vía CSS.
- Un punto (`<circle class="ds-line-chart__point">`, `r={3}`) y una etiqueta (`<text class="ds-line-chart__label">`) por cada entrada en `data`.
- `color` por defecto `"var(--ds-color-teal)"`; aplica a área, línea y puntos.
- `resolvedMax` para escala vertical: `maxValue` o `Math.max(...data.map(item => item.value), 1)`.
- Rutas SVG vacías cuando `data` está vacío (`buildLinePath` y `buildAreaPath` retornan `""`).
- `role="img"` y `aria-label={`Gráfico de línea: ${title}`}` en el SVG.
- Fusión de `className` y `...props` en el `ChartCard` raíz.
- Clave React de cada punto: `item.label`.
- Distribución horizontal uniforme de puntos: `step = plotWidth / (data.length - 1)` cuando `data.length > 1`; un solo punto se centra en el primer índice.

## This component never

- Obtiene datos de API ni interpola series faltantes.
- Renderiza ejes con etiquetas numéricas, leyenda ni tooltips.
- Define interactividad (hover en puntos, clic, zoom).
- Expone prop `children`; omite `children` de `HTMLAttributes<HTMLDivElement>`.
- Soporta múltiples series en el mismo gráfico.
- Usa librerías de visualización externas.
- Aplica animaciones ni transiciones.
- Aplica estilos responsivos propios mediante media queries.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title`, `footer` y `data` en cada instancia.
- Cada `LineChartDatum` debe incluir `label` (string) y `value` (number).

## Forbidden

- Inventar props que no existan en `LineChartCardProps` (`variant`, `children`, `series`, `onPointClick`, etc.).
- Pasar `children` esperando renderizado en el cuerpo.
- Asumir múltiples líneas o colores por punto.
- Usar etiquetas duplicadas en `data` (provocan claves React duplicadas).
- Asumir formato automático de valores numéricos en el gráfico.

## Recommendations

- Usar `maxValue` cuando el rango vertical debe fijarse independientemente del máximo de los datos.
- Usar `color` para alinear el chart con un acento semántico del dashboard.
- Proveer al menos dos puntos para una línea visible entre extremos; con un solo punto solo se renderiza un círculo.
- Redactar `footer` con contexto del pico o tendencia, como en la story (`"Pico registrado a las 18:00 con 38 eventos"`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Charts |
| Package | @alejandria/ui-kit |
| Import | `import { LineChartCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  LineChartCard,
  type LineChartCardProps,
  type LineChartDatum
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `LineChartCard` — componente funcional.
- `LineChartCardProps` — props del componente.
- `LineChartDatum` — punto de datos para la serie.

Funciones internas no exportadas: `buildLinePath`, `buildAreaPath`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la tarjeta. Reenviado a `ChartCard`. |
| `footer` | `string` | — | sí | Pie de la tarjeta. Reenviado a `ChartCard`. |
| `data` | `LineChartDatum[]` | — | sí | Puntos de la serie. Cada entrada genera un `<circle>` y un `<text>`. |
| `color` | `string` | `"var(--ds-color-teal)"` | no | Color de área, línea y puntos. |
| `maxValue` | `number` | máximo de `data` o `1` | no | Valor máximo del eje vertical para escalar posiciones Y. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `ChartCard` raíz. |
| `...props` | `Omit<HTMLAttributes<HTMLDivElement>, "children">` | — | no | Atributos nativos del `<div>` raíz de `ChartCard`. |

### LineChartDatum

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Etiqueta bajo el punto. Usada como clave React y texto del `<text>`. |
| `value` | `number` | — | sí | Valor numérico que determina la posición vertical del punto. |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada. Línea con trazo de 1px display (era 2), área con opacidad 0.18, rejilla horizontal sutil (`stroke: rgb(255 255 255 / 0.08)`), puntos circulares de radio 3, etiquetas en mayúsculas vía CSS (`.ds-line-chart__label`), color teal por defecto.

La prop `color` permite cambiar el acento de área, línea y puntos sin variante de componente adicional.

---

# States

| State | Description |
|--------|-------------|
| Default | Línea, área, rejilla y puntos según `data` y escala `resolvedMax`. Sin estados interactivos en CSS. |
| With custom color | `color` distinto de teal aplica el mismo valor a `fill` del área y puntos y `stroke` de la línea. |
| With maxValue | Escala vertical fijada por `maxValue` explícito. |
| Single point | Con `data.length === 1`, `step` es `0`; solo un punto y etiqueta; `buildLinePath` produce un movimiento inicial (`M x y`) sin segmentos `L`. |
| Empty data | `buildLinePath` y `buildAreaPath` retornan `""`; no hay línea ni área visible. |
| Two or more points | Línea conecta puntos en orden del array con distribución horizontal uniforme. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El SVG usa `role="img"` y `aria-label` con el texto `Gráfico de línea: {title}`.
- Las etiquetas de categoría se renderizan como `<text>` visibles bajo cada punto.
- No hay descripción textual de valores numéricos ni tabla de datos alternativa.
- `title` y `footer` de `ChartCard` quedan en `<header>` y `<footer>`.
- No es interactivo; puntos no reciben foco ni responden a teclado.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="img"` | Aplicado en el `<svg class="ds-line-chart">`. |
| `aria-label` | `Gráfico de línea: ${title}` en el SVG. |
| Atributos vía `...props` | Reenviados al `<div class="ds-chart-card">` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`LineChartCard` no define media queries. El SVG usa `width: 100%`, `max-width: 100%` y `height: auto`. El `viewBox` interno es fijo (`280 × 120`).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Escalado proporcional del SVG al ancho del contenedor. |
| Storybook | Decorator con `minWidth: 320`; story `Gallery` en grid de dos columnas. |
| `apps/web` | Sin uso documentado. |

---

# Composition

## Purpose in Layout

- **Summary** — tendencia temporal (alertas por hora, métricas en el tiempo).
- **Detail** — bloque de serie en galería de charts.
- **Container** — delega marco en `ChartCard`; SVG en el cuerpo.

## Parent

- `ChartCard` — composición interna obligatoria.
- Grid de galería en `ChartCard.stories.tsx` → `Gallery`.

## Children

- No admite `children`.

## Siblings

- `BarChartCard`, `DonutChartCard` — otros charts en la misma galería.
- `MetricCard` — KPI puntual sin tendencia visual.

## Alternatives

- `BarChartCard` — comparación categórica discreta, no serie continua.
- `DonutChartCard` — proporciones en anillo.
- `MetricCard` — valor escalar con `change` textual, sin gráfico.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ChartCard` | Contenedor base; `LineChartCard` lo compone. |
| `BarChartCard` | Chart alternativo para categorías discretas. |
| `DonutChartCard` | Chart alternativo para proporciones. |
| `MetricCard` | KPI sin visualización de tendencia; alternativa cuando basta un valor escalar. |
| `Card` | Contenedor paralelo; sin composición con `LineChartCard`. |

---

# Content Guidelines

## Labels

- `title`: descriptor de la serie (p. ej. `"Alertas por hora"`).
- `data[].label`: marca del eje horizontal (p. ej. `"08"`, `"10"`, `"18"` para horas). El CSS aplica `text-transform: uppercase` en `.ds-line-chart__label`.
- `footer`: interpretación de la tendencia (p. ej. `"Pico registrado a las 18:00 con 38 eventos"`).

## Values

- `data[].value`: magnitud numérica del punto. No se muestra numéricamente en el gráfico; solo posición vertical.
- `maxValue`: escala manual del eje vertical.

## Icons

- `LineChartCard` no expone prop `icon`.

## Localization

- Las stories usan español. El componente no impone idioma.

---

# Examples

## Basic

```tsx
import { LineChartCard } from "@alejandria/ui-kit";

<LineChartCard
  title="Alertas por hora"
  footer="Pico registrado a las 18:00 con 38 eventos"
  data={[
    { label: "08", value: 12 },
    { label: "10", value: 18 },
    { label: "12", value: 24 },
    { label: "14", value: 20 },
    { label: "16", value: 30 },
    { label: "18", value: 38 }
  ]}
/>
```

## Variant

Color de acento personalizado y escala con `maxValue`.

```tsx
import { LineChartCard } from "@alejandria/ui-kit";

<LineChartCard
  title="Eventos críticos"
  footer="Umbral de alerta en 40"
  color="var(--ds-color-coral)"
  maxValue={50}
  data={[
    { label: "Lun", value: 22 },
    { label: "Mar", value: 35 },
    { label: "Mie", value: 41 }
  ]}
/>
```

## Composition

```tsx
import { BarChartCard, DonutChartCard, LineChartCard } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(280px, 1fr))" }}>
  <LineChartCard
    title="Alertas por hora"
    footer="Pico registrado a las 18:00 con 38 eventos"
    data={[
      { label: "08", value: 12 },
      { label: "10", value: 18 },
      { label: "12", value: 24 },
      { label: "14", value: 20 },
      { label: "16", value: 30 },
      { label: "18", value: 38 }
    ]}
  />
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
</div>
```

---

# Reasoning Examples

## User Request

Visualizar evolución de alertas a lo largo del día con pico destacado en el pie.

### Recommended Components

- `LineChartCard`

### Why

Patrón de `ChartCard.stories.tsx` → `LineChart` con seis puntos horarios y footer interpretativo.

---

## User Request

Comparar incidentes entre zonas geográficas en barras.

### Recommended Components

- `BarChartCard`

### Why

`LineChartCard` distribuye puntos en eje horizontal uniforme; no modela categorías discretas con barras.

---

## User Request

Dos series comparativas en el mismo gráfico (alertas vs incidentes).

### Recommended Components

- Ninguno del kit en la implementación actual

### Why

`LineChartCard` solo admite una serie y un `color`; no hay soporte multi-serie.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-teal` | color | Color por defecto de área, línea y puntos (`color` prop default) |
| `--ds-font-display` | typography | `font-family` de `.ds-line-chart__label` |

Nota: la rejilla usa `stroke: rgb(255 255 255 / 0.08)` hardcodeado. Las etiquetas usan `fill: #8a8b87` hardcodeado. La opacidad del área (`0.18`) y el grosor de línea (`2`) están en CSS, no en tokens. `ChartCard` aporta tokens adicionales en el contenedor.

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
packages/ui/src/components/LineChartCard.tsx
```

## Dependencies

- `ChartCard` from `packages/ui/src/components/ChartCard.tsx`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-chart-card`, `ds-line-chart`, `ds-line-chart__grid`, `ds-line-chart__area`, `ds-line-chart__line`, `ds-line-chart__label`)
- Funciones internas `buildLinePath` y `buildAreaPath`

## DOM Structure

```text
div.ds-chart-card
├── header.ds-chart-card__title
├── div.ds-chart-card__body
│   └── svg.ds-line-chart[role=img]
│       ├── line.ds-line-chart__grid × 4
│       ├── path.ds-line-chart__area
│       ├── path.ds-line-chart__line
│       └── g × data.length
│           ├── circle.ds-line-chart__point
│           └── text.ds-line-chart__label
└── footer.ds-chart-card__footer
```

Constantes internas: `CHART_WIDTH = 280`, `CHART_HEIGHT = 120`, `CHART_PADDING_X = 12`, `CHART_PADDING_Y = 10`, `LABEL_HEIGHT = 18`.

---

# Known Limitations

- Una sola serie; sin soporte multi-línea ni leyenda.
- Sin ejes numéricos etiquetados, tooltips ni valores sobre puntos.
- Sin interactividad (hover, clic).
- `viewBox` fijo (`280 × 120`).
- Con `data` vacío no hay línea ni área.
- Con un solo punto la línea no conecta segmentos visibles.
- Etiquetas duplicadas en `data` generan claves React duplicadas.
- Sin animaciones.
- Sin uso en `apps/web` ni en `Components.stories.tsx`.
- Sin tests en el repositorio.
- Colores de rejilla y etiquetas hardcodeados.
- `buildLinePath` y `buildAreaPath` no están exportadas ni testeadas de forma aislada.

---

# Future Improvements

- [ ] Soporte multi-serie con colores por serie
- [ ] Etiquetas de eje Y y tooltips en puntos
- [ ] Manejo de `data` vacío con placeholder
- [ ] Exportar o testear `buildLinePath` y `buildAreaPath`
- [ ] Integración en consola demo
- [ ] Animación de trazo si se define en diseño

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `LineChartCard`, `LineChartCardProps` y `LineChartDatum` con SVG puro (línea, área, rejilla, puntos), composición de `ChartCard` y documentación JSDoc en español. Stories en `ChartCard.stories.tsx` (`LineChart`, `Gallery`). Export en `packages/ui/src/index.ts`. |
