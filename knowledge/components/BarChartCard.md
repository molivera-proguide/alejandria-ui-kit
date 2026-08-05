---
id: bar-chart-card
name: BarChartCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/BarChartCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ChartCard

aliases:
  - tarjeta de barras
  - gráfico de barras
keywords:
  - BarChartCard
  - bar chart
  - barras
  - SVG
  - gráfico
  - BarChartDatum
  - BarChartCardProps
tags:
  - data-display
  - charts
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# BarChartCard

## Purpose

Presenta un gráfico de barras verticales en SVG dentro de una tarjeta con título y pie en consolas del Alejandria UI Kit, alineado con la sección **GRAFICOS** del PDF de referencia (p.9, bloque "Barras").

Describe:

- **Responsabilidad principal:** renderizar barras verticales proporcionales a valores numéricos, con etiquetas de eje en la parte inferior, dentro del contenedor `ChartCard`.
- **Problema que resuelve:** ofrecer visualización compacta de series categóricas (zonas, días, recursos) sin dependencia de librerías de charts externas.
- **Alcance:** componente presentacional que compone `ChartCard` y genera SVG puro (`ds-bar-chart`); el consumidor provee `data` como array de `BarChartDatum`.

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
- Renderizado de un `<svg class="ds-bar-chart">` con `viewBox="0 0 280 120"` (dimensiones fijas en código).
- Una barra (`<rect class="ds-bar-chart__bar">`) y una etiqueta (`<text class="ds-bar-chart__label">`) por cada entrada en `data`, en el orden del array.
- Altura de barra proporcional a `item.value / resolvedMax`, donde `resolvedMax` es `maxValue` o `Math.max(...data.map(item => item.value), 1)`.
- Color de barra: `item.color` si está definido; si no, ciclo sobre `CHART_COLORS` (tokens `--ds-color-pdf-line`, `--ds-color-pdf-ink-muted`, `--ds-color-pdf-surface`). Corregido 2026-08-05: antes era un ciclo de 5 colores (`--ds-color-teal`/`blue`/`green`/`amber`/`coral`) que no corresponde a la leyenda del PDF ("Barra tradicional: 15px de ancho - #c1c1c1 - #8a8b87 - #060606").
- `.ds-bar-chart__bar` tiene un borde sutil (`--ds-color-pdf-line-a60`, 0.75) agregado 2026-08-05: el color más oscuro del ciclo (`#060606`) es casi idéntico al fondo de `.ds-chart-card`, así que sin borde esa barra desaparece.
- Etiquetas de barra centradas bajo cada barra con `textAnchor="middle"`.
- `role="img"` y `aria-label={`Gráfico de barras: ${title}`}` en el SVG.
- Fusión de `className` y `...props` en el `ChartCard` raíz (no en el SVG).
- Clave React de cada grupo de barra: `item.label`.

## This component never

- Obtiene datos de API ni transforma series temporales.
- Renderiza ejes numéricos, leyenda, tooltips ni valores sobre las barras.
- Define interactividad (hover, clic, selección de barra).
- Expone prop `children`; omite `children` de `HTMLAttributes<HTMLDivElement>`.
- Aplica animaciones ni transiciones al gráfico.
- Usa librerías de visualización externas (D3, Recharts, etc.).
- Aplica estilos responsivos propios mediante media queries.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title`, `footer` y `data` en cada instancia.
- Cada `BarChartDatum` debe incluir `label` (string) y `value` (number).

## Forbidden

- Inventar props que no existan en `BarChartCardProps` (`variant`, `color` global, `children`, `onBarClick`, etc.).
- Pasar `children` esperando que se rendericen en el cuerpo de la tarjeta.
- Asumir leyenda, tooltips o formato automático de valores numéricos.
- Usar etiquetas duplicadas en `data` (provocan claves React duplicadas).

## Recommendations

- Usar `maxValue` cuando el eje debe normalizarse a un máximo fijo distinto del máximo de los datos.
- Usar `color` por datum para destacar una barra específica; de lo contrario confiar en la paleta por índice.
- Redactar `footer` como contexto interpretativo del gráfico, como en las stories (`"Sur concentra el 42% del total semanal"`).
- Agrupar en grid de galería siguiendo `ChartCard.stories.tsx` → `Gallery`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Charts |
| Package | @alejandria/ui-kit |
| Import | `import { BarChartCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  BarChartCard,
  type BarChartCardProps,
  type BarChartDatum
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `BarChartCard` — componente funcional.
- `BarChartCardProps` — props del componente.
- `BarChartDatum` — punto de datos para cada barra.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la tarjeta. Reenviado a `ChartCard`. |
| `footer` | `string` | — | sí | Pie de la tarjeta. Reenviado a `ChartCard`. |
| `data` | `BarChartDatum[]` | — | sí | Serie de barras. Cada entrada genera un grupo `<g>` con `<rect>` y `<text>`. |
| `maxValue` | `number` | máximo de `data` o `1` | no | Valor máximo del eje vertical para escalar alturas de barra. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `ChartCard` raíz. |
| `...props` | `Omit<HTMLAttributes<HTMLDivElement>, "children">` | — | no | Atributos nativos del `<div>` raíz de `ChartCard` (`id`, `style`, `data-*`, `aria-*`, etc.). |

### BarChartDatum

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Etiqueta bajo la barra. Usada como clave React y texto del `<text>`. |
| `value` | `number` | — | sí | Valor numérico que determina la altura de la barra. |
| `color` | `string` | color de `CHART_COLORS[index]` | no | Color de relleno del `<rect>`. Acepta tokens CSS (`var(--ds-color-pdf-line)`) o valores hex. |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada. Barras verticales con `rx={2}`, separación fija (`barGap = 10`), ancho de barra calculado según cantidad de datos, etiquetas en mayúsculas vía CSS (`.ds-bar-chart__label`), SVG responsivo al ancho del contenedor (`width: 100%`, `max-width: 100%`).

La paleta por defecto rota cinco tokens de color del design system. El color por datum (`BarChartDatum.color`) permite personalizar barras individuales sin variante de componente.

---

# States

| State | Description |
|--------|-------------|
| Default | Barras renderizadas según `data` y escala `resolvedMax`. Sin estados `:hover`, `:focus` ni `:active` en CSS para barras. |
| With maxValue | Cuando `maxValue` se provee explícitamente, las alturas se escalan contra ese valor aunque los datos no lo alcancen. |
| Empty data | Con `data` vacío, `barWidth` es `0` y no se renderizan barras visibles; `resolvedMax` es `1`. |
| Custom colors | Cuando `item.color` está definido, sustituye el color de la paleta por índice para esa barra. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El SVG del gráfico usa `role="img"` y `aria-label` con el texto `Gráfico de barras: {title}`.
- Las etiquetas de categoría se renderizan como `<text>` visibles en el SVG; no hay tabla de datos alternativa ni descripción textual de valores numéricos.
- `title` y `footer` de `ChartCard` quedan expuestos como texto estático en `<header>` y `<footer>`.
- No es interactivo; barras no reciben foco ni responden a teclado.
- El consumidor puede añadir atributos ARIA al contenedor vía `...props` en el `ChartCard` raíz.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="img"` | Aplicado en el `<svg class="ds-bar-chart">`. |
| `aria-label` | `Gráfico de barras: ${title}` en el SVG. |
| Atributos vía `...props` | Reenviados al `<div class="ds-chart-card">` raíz; no al SVG. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`BarChartCard` no define media queries. El SVG usa `width: 100%`, `max-width: 100%` y `height: auto` (regla compartida `.ds-bar-chart`). El `viewBox` interno es fijo (`280 × 120`); el escalado es proporcional al ancho del contenedor.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Dimensiones de trazado fijas en código; escala visual vía SVG responsive. |
| Storybook | Decorator con `minWidth: 320`; story `Gallery` usa grid de dos columnas en el padre. |
| `apps/web` | Sin uso documentado en la aplicación demo. |

---

# Composition

## Purpose in Layout

- **Summary** — comparación de categorías (zonas, días de la semana, recursos) en dashboards operativos.
- **Detail** — bloque de visualización en galería de charts junto a dona y línea.
- **Container** — delega el marco en `ChartCard`; el SVG ocupa `ds-chart-card__body`.

## Parent

- `ChartCard` — composición interna obligatoria.
- Grid de galería en `ChartCard.stories.tsx` → `Gallery`.
- Decorator de Storybook con `minWidth: 320`.

## Children

- No admite `children`. El cuerpo contiene únicamente el SVG generado internamente.

## Siblings

- `DonutChartCard`, `LineChartCard` — otros tipos de chart en la misma galería Storybook.
- `MetricCard` — KPI escalar sin barras; complemento de resumen.
- `Card` — contenedor paralelo no relacionado con charts.

## Alternatives

- `LineChartCard` — series temporales o de tendencia con línea y área.
- `DonutChartCard` — proporciones de un total con segmentos circulares.
- `MetricCard` — valor puntual sin visualización de serie.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ChartCard` | Contenedor base; `BarChartCard` lo compone y pasa `title`, `footer`, `className` y `...props`. |
| `DonutChartCard` | Chart alternativo en la misma familia; comparte `ChartCard` y paleta `CHART_COLORS`. |
| `LineChartCard` | Chart alternativo para series continuas; comparte `ChartCard`. |
| `Card` | Contenedor paralelo; no compone ni extiende `BarChartCard`. |
| `MetricCard` | KPI de solo lectura; alternativa cuando no se necesita gráfico de barras. |

---

# Content Guidelines

## Labels

- `title`: descriptor del gráfico (p. ej. `"Incidentes por zona"`, `"Recursos desplegados"`).
- `data[].label`: categoría corta bajo cada barra (p. ej. `"Norte"`, `"Centro"`, `"Lun"`, `"Mar"`). El CSS aplica `text-transform: uppercase` en `.ds-bar-chart__label`.
- `footer`: interpretación del dato (p. ej. `"Sur concentra el 42% del total semanal"`, `"Incremento del 12% respecto al día anterior"`).

## Values

- `data[].value`: número positivo usado para altura de barra. Sin formato automático en el gráfico; los valores no se muestran sobre las barras.
- `maxValue`: escala manual del eje cuando el consumidor necesita un rango fijo.

## Icons

- `BarChartCard` no expone prop `icon` ni iconos en barras o etiquetas.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `title`, `footer` y `data[].label`.

---

# Examples

## Basic

```tsx
import { BarChartCard } from "@alejandria/ui-kit";

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
```

## Variant

Color personalizado por barra y escala con `maxValue`.

```tsx
import { BarChartCard } from "@alejandria/ui-kit";

<BarChartCard
  title="Recursos desplegados"
  footer="Incremento del 12% respecto al día anterior"
  maxValue={80}
  data={[
    { label: "Lun", value: 40 },
    { label: "Mar", value: 52, color: "var(--ds-color-coral)" },
    { label: "Mie", value: 48 },
    { label: "Jue", value: 61 },
    { label: "Vie", value: 55 }
  ]}
/>
```

## Composition

```tsx
import { BarChartCard, DonutChartCard, LineChartCard } from "@alejandria/ui-kit";

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

Comparar incidentes entre cuatro zonas geográficas en un dashboard.

### Recommended Components

- `BarChartCard`

### Why

Patrón de `ChartCard.stories.tsx` → `BarChart` y `Gallery`; barras categóricas con etiquetas `Norte`, `Centro`, `Sur`, `Este`.

---

## User Request

Mostrar evolución de alertas a lo largo del día por hora.

### Recommended Components

- `LineChartCard`

### Why

`BarChartCard` no modela series temporales continuas; `LineChartCard` incluye línea, área y rejilla horizontal.

---

## User Request

Proporción de tareas en fecha vs atrasadas con porcentajes destacados.

### Recommended Components

- `DonutChartCard`

### Why

`BarChartCard` no admite estadísticas flotantes (`primaryStat`, `secondaryStat`); `DonutChartCard` combina dona y stats.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-line` | color | Color por defecto de barra (índice 0 en `CHART_COLORS`) — corregido 2026-08-05, antes `--ds-color-teal` |
| `--ds-color-pdf-ink-muted` | color | Color por defecto de barra (índice 1) — corregido 2026-08-05, antes `--ds-color-blue` |
| `--ds-color-pdf-surface` | color | Color por defecto de barra (índice 2) — corregido 2026-08-05, antes `--ds-color-green`. Idéntico al fondo de la card; ver `.ds-bar-chart__bar` borde. |
| `--ds-font-display` | typography | `font-family` de `.ds-bar-chart__label` |

Nota: el color de etiquetas (`fill: #8a8b87`) está hardcodeado. La clase `.ds-bar-chart__bar` no tiene reglas CSS; el relleno se aplica inline en el atributo `fill` del `<rect>`. `ChartCard` aporta tokens adicionales en el contenedor (ver `ChartCard.md`).

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
packages/ui/src/components/BarChartCard.tsx
```

## Dependencies

- `ChartCard` from `packages/ui/src/components/ChartCard.tsx`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-chart-card`, `ds-bar-chart`, `ds-bar-chart__label`)

## DOM Structure

```text
div.ds-chart-card
├── header.ds-chart-card__title
├── div.ds-chart-card__body
│   └── svg.ds-bar-chart[role=img]
│       └── g × data.length
│           ├── rect.ds-bar-chart__bar
│           └── text.ds-bar-chart__label
└── footer.ds-chart-card__footer
```

Constantes internas (no exportadas): `CHART_WIDTH = 280`, `CHART_HEIGHT = 120`, `CHART_PADDING_X = 8`, `CHART_PADDING_Y = 8`, `LABEL_HEIGHT = 18`, `barGap = 10`.

---

# Known Limitations

- Sin ejes numéricos, leyenda, tooltips ni valores sobre barras.
- Sin interactividad (hover, clic, selección).
- `viewBox` y dimensiones de trazado fijas en código (`280 × 120`).
- Con `data` vacío no se renderizan barras (`barWidth = 0`).
- Etiquetas duplicadas en `data` generan claves React duplicadas (`key={item.label}`).
- Sin animaciones ni transiciones.
- Sin uso en `apps/web` ni en `Components.stories.tsx`.
- Sin tests unitarios ni de integración en el repositorio.
- No hay reglas CSS para `.ds-bar-chart__bar`; estilos de barra solo vía atributo `fill` inline.
- `maxValue` menor que algún `value` puede producir barras que exceden el área de trazado.

---

# Future Improvements

- [ ] Mostrar valores numéricos sobre o dentro de las barras
- [ ] Leyenda y tooltips si se definen en el diseño
- [ ] Manejo explícito de `data` vacío con mensaje o placeholder
- [ ] Validación de etiquetas únicas o claves compuestas
- [ ] Tests de escala, colores y accesibilidad del SVG
- [ ] Integración en consola demo (`apps/web` o `Components.stories.tsx`)

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `BarChartCard`, `BarChartCardProps` y `BarChartDatum` con SVG puro, composición de `ChartCard` y documentación JSDoc en español. Stories en `ChartCard.stories.tsx` (`BarChart`, `Gallery`). Export en `packages/ui/src/index.ts`. |
| 0.1.1 | Pasada de fidelidad visual contra PDF GRAFICOS p.9, bloque "Barras" (leyenda leída de la captura del usuario, cruzada con `page.get_drawings()`/`get_text()`): `CHART_COLORS` pasó de un ciclo arcoíris de 5 colores a un ciclo gris de 3 (`#c1c1c1`/`#8a8b87`/`#060606`), fiel a la leyenda. Agregado un borde sutil a `.ds-bar-chart__bar` porque el color más oscuro del ciclo es casi idéntico al fondo de la card y sin borde desaparecía. Detectado (no resuelto): el fondo lavado de la story `Gallery` en Storybook era el mismo bug de decorador ya visto en `Empty` — arreglado en `ChartCard.stories.tsx`, no en este archivo. |
