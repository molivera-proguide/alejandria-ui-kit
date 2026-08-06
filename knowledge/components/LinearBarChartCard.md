---
id: linear-bar-chart-card
name: LinearBarChartCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/LinearBarChartCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/LinearBarChartCard

aliases:
  - barras lineal
  - ranking de barras
  - línea de barras
keywords:
  - LinearBarChartCard
  - linear bar chart
  - barras lineal horizontal
  - barras lineal vertical
  - ranking
  - LinearBarDatum
  - LinearBarChartCardProps
tags:
  - data-display
  - charts
  - presentational
  - molecule

last_reviewed: 2026-08-06
---

# LinearBarChartCard

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 9 — GRAFICOS ›
"Barras lineal horizontal" / "Barras lineal vertical"** (`doc[8]`, not `doc[9]`/p.10, which is
`BarChartCard`'s own "Barra tradicional" page — the two pages share the "GRAFICOS" title but are
distinct pages with distinct chart types).

## Purpose

Presenta un gráfico de barras finas (trazos, no rectángulos) en dos orientaciones — ranking
horizontal con valor destacado, o barras verticales agrupadas — dentro del contenedor `ChartCard`.

Describe:

- **Responsabilidad principal:** renderizar líneas finas (2.5px) proporcionales a valores
  numéricos, con un ítem opcionalmente resaltado en rojo (`highlighted`), en orientación horizontal
  (ranking con label+valor) o vertical (barras agrupadas por categoría).
- **Problema que resuelve:** el PDF p.9 muestra un lenguaje visual de "barra lineal" (trazo fino)
  distinto del "Barra tradicional" (rectángulo relleno, 15px de ancho) ya cubierto por
  `BarChartCard` — hasta esta versión no existía ningún componente para esa variante.
- **Alcance:** componente presentacional que compone `ChartCard` y genera HTML/CSS puro (sin SVG,
  a diferencia de `BarChartCard`/`LineChartCard`/`DonutChartCard`); el consumidor provee `data`
  como array de `LinearBarDatum`.

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
- `orientation` por defecto `"horizontal"`: cada dato es una fila con línea (ancho ∝
  `value / resolvedMax`), label y valor grande.
- `orientation="vertical"`: los datos se agrupan por `group` (o por su propio `label` si `group`
  se omite) preservando el orden de aparición; cada grupo renderiza sus barras (altura ∝
  `value / resolvedMax`) con el valor flotando arriba y la etiqueta del grupo abajo.
- `resolvedMax` = `maxValue` o `Math.max(...data.map(d => d.value), 1)`.
- `highlighted: true` en un `LinearBarDatum` pinta línea/barra, label y valor en
  `--ds-color-pdf-critical` (PDF «Número o referencia destacada: #ff0404»).
- `unit` (default `"%"`) se agrega como sufijo literal a cada valor mostrado (el PDF usa `"%"` en
  el ranking horizontal y `"mm"` en el ejemplo vertical).
- Fusión de `className` y `...props` en el `ChartCard` raíz.
- Clave React: `${label}-${index}` (horizontal) o `${group.label}-${index}` (barras dentro de un
  grupo, vertical).

## This component never

- Obtiene datos de API ni transforma series temporales.
- Renderiza ejes numéricos, leyenda ni tooltips.
- Define interactividad (hover, clic, selección).
- Expone prop `children`; omite `children` de `HTMLAttributes<HTMLDivElement>`.
- Usa SVG (a diferencia de `BarChartCard`/`LineChartCard`/`DonutChartCard`) — es HTML/CSS puro.
- Aplica un `track` de fondo detrás de la línea/barra: el PDF no dibuja ninguno (solo la línea
  proporcional al valor, sin barra de fondo completa).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title`, `footer` y `data` en cada instancia.
- Cada `LinearBarDatum` debe incluir `label` (string) y `value` (number).
- Para `orientation="vertical"` con más de una barra por grupo, usar `group` para agruparlas —
  sin `group`, cada dato es su propio grupo de una sola barra.

## Forbidden

- Inventar props que no existan en `LinearBarChartCardProps` (`variant`, `color` global,
  `children`, `onBarClick`, etc.).
- Confundir este componente con `BarChartCard` (rectángulos tradicionales, PDF p.10) — son páginas
  y lenguajes visuales distintos del mismo PDF, no variantes de un mismo componente.
- Asumir que `unit` formatea el número (redondeo, separadores); es un sufijo literal.

## Recommendations

- Usar `orientation="horizontal"` para rankings (mayor a menor, con el primero `highlighted`).
- Usar `orientation="vertical"` + `group` para series agrupadas por categoría/tiempo (meses, etc.).
- Redactar `footer` como rango o contexto (PDF: `"Noviembre - Febrero"`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Charts |
| Package | @alejandria/ui-kit |
| Import | `import { LinearBarChartCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  LinearBarChartCard,
  type LinearBarChartCardProps,
  type LinearBarChartOrientation,
  type LinearBarDatum
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `LinearBarChartCard` — componente funcional.
- `LinearBarChartCardProps` — props del componente.
- `LinearBarChartOrientation` — unión `"horizontal" | "vertical"`.
- `LinearBarDatum` — punto de datos.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la tarjeta. Reenviado a `ChartCard`. |
| `footer` | `string` | — | sí | Pie de la tarjeta. Reenviado a `ChartCard`. |
| `data` | `LinearBarDatum[]` | — | sí | Serie de barras/líneas. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | no | Lenguaje visual del PDF a usar. |
| `unit` | `string` | `"%"` | no | Sufijo agregado a cada valor mostrado. |
| `maxValue` | `number` | máximo de `data` o `1` | no | Valor máximo para escalar longitudes/alturas. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `ChartCard` raíz. |
| `...props` | `Omit<HTMLAttributes<HTMLDivElement>, "children">` | — | no | Atributos nativos del `<div>` raíz de `ChartCard`. |

### LinearBarDatum

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Horizontal: etiqueta de la fila. Vertical: valor mostrado sobre la barra (no la etiqueta del grupo). |
| `value` | `number` | — | sí | Valor numérico que determina el largo/alto de la línea. |
| `group` | `string` | `label` (vertical) | no | Solo vertical: agrupa varias barras bajo una misma etiqueta de grupo. |
| `highlighted` | `boolean` | `false` | no | Pinta línea/barra + textos en `--ds-color-pdf-critical`. |

---

# Variants

## Horizontal (default)

Ranking: línea fina (ancho fijo de columna, 2.5px de trazo) + label + valor grande en negrita,
una fila por dato. PDF «HISTÓRICO INCENDIOS».

## Vertical

Barras agrupadas: líneas finas verticales (2.5px), valor flotando arriba de cada una, etiqueta de
grupo (p. ej. mes) debajo del clúster. PDF «PRECIPITACIONES ESTACIONALES».

| Elemento | Rol visual (PDF p.9, display ÷2) |
|----------|-----------------------------------|
| Línea/barra | 2.5px de trazo, `--ds-color-pdf-line-light` (`#e6e6e6`) por defecto, `--ds-color-pdf-critical` (`#ff0404`) si `highlighted` |
| Título (`ChartCard`) | Heredado de `.ds-chart-card__title` — no específico de este componente |
| Label horizontal / grupo vertical | `8px`, Montserrat ExtraLight, `--ds-color-white` |
| Valor grande (horizontal) | `10px`, Montserrat Bold, `--ds-color-white` |
| Valor chico (vertical, sobre la barra) | `5px`, Montserrat ExtraLight, `--ds-color-pdf-line-light` |

---

# States

| State | Description |
|--------|-------------|
| Default | Líneas renderizadas según `data` y escala `resolvedMax`. Sin `:hover`/`:focus`. |
| Highlighted | `highlighted: true` en un datum pinta esa fila/barra + textos en rojo crítico. |
| Empty data | Con `data` vacío no se renderiza ninguna fila/grupo; `resolvedMax` es `1`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Es HTML/CSS puro (no SVG): el texto de cada label/valor ya es contenido textual accesible por
  defecto, sin necesitar `role="img"`/`aria-label` como en `BarChartCard`/`LineChartCard`.
- `title` y `footer` de `ChartCard` quedan expuestos como texto estático en `<header>`/`<footer>`.
- No es interactivo; las líneas/barras no reciben foco.

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`LinearBarChartCard` no define media queries. Hereda el `max-width: 280px` de `.ds-chart-card`.
La orientación horizontal usa `display: grid` con columnas fijas; la vertical usa `display: flex`
con `justify-content: space-between` para distribuir los grupos.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Ancho de línea (horizontal) y alto de barra (vertical) son porcentuales dentro de un contenedor de ancho/alto fijo. |
| Storybook decorator | Mismo patrón que `ChartCard.stories.tsx`: `background: var(--ds-color-pdf-surface)` — necesario porque `.ds-chart-card`'s propio fondo es translúcido. |

---

# Composition

## Purpose in Layout

- **Summary** — ranking de categorías (regiones, causas) o serie agrupada por tiempo (meses).
- **Detail** — bloque de visualización junto a `BarChartCard`/`DonutChartCard`/`LineChartCard`.
- **Container** — delega el marco en `ChartCard`.

## Parent

- `ChartCard` — composición interna obligatoria.
- Grid de galería en `LinearBarChartCard.stories.tsx` → `Gallery`.

## Children

- No admite `children`. El cuerpo contiene únicamente las filas/grupos generados internamente.

## Siblings

- `BarChartCard` — barras rectangulares tradicionales (PDF p.10); **no** es la misma familia
  visual pese al nombre similar.
- `DonutChartCard`, `LineChartCard` — otros tipos de chart en la misma galería.

## Alternatives

- `BarChartCard` — cuando el diseño pide rectángulos rellenos (p.10), no líneas finas (p.9).
- `ProgressRing` (`variant="pdf"`) — cuando se necesita un único valor de progreso, no una serie.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ChartCard` | Contenedor base; `LinearBarChartCard` lo compone igual que `BarChartCard`/`DonutChartCard`/`LineChartCard`. |
| `BarChartCard` | Hermano de la misma sección PDF "GRAFICOS" pero de una página distinta (p.10 vs p.9) y lenguaje visual distinto (rectángulo vs línea). |
| `ProgressRing` | `variant="pdf"` cubre la otra mitad de p.9 (el gauge "Torta"), no las barras lineales. |

---

# Content Guidelines

## Labels

- `title`: descriptor del gráfico (PDF: `"Histórico incendios"`, `"Precipitaciones estacionales"`).
- `data[].label`: horizontal → categoría (`"Córdoba"`); vertical → el valor mismo como string (`"60mm"`).
- `footer`: rango o contexto (PDF: `"Noviembre - Febrero"`).

## Values

- `data[].value`: número usado para la longitud/altura de la línea. `unit` es solo un sufijo de
  presentación, no afecta el cálculo de escala.

## Icons

- No expone prop `icon`.

## Localization

- Las stories usan español. El componente no impone idioma.

---

# Examples

## Basic

```tsx
import { LinearBarChartCard } from "@alejandria/ui-kit";

<LinearBarChartCard
  title="Histórico incendios"
  footer="Noviembre - Febrero"
  data={[
    { label: "Córdoba", value: 30, highlighted: true },
    { label: "Neuquén", value: 28 },
    { label: "Santa Cruz", value: 25 },
    { label: "Chaco", value: 20 }
  ]}
/>
```

## Variant

```tsx
import { LinearBarChartCard } from "@alejandria/ui-kit";

<LinearBarChartCard
  title="Precipitaciones estacionales"
  footer="Promedio regional"
  orientation="vertical"
  unit="mm"
  data={[
    { group: "NOV", label: "60mm", value: 60 },
    { group: "NOV", label: "55mm", value: 55 },
    { group: "ENE", label: "60mm", value: 60, highlighted: true },
    { group: "FEB", label: "45mm", value: 45 }
  ]}
/>
```

---

# Reasoning Examples

## User Request

Mostrar un ranking de regiones por porcentaje, con la más afectada destacada.

### Recommended Components

- `LinearBarChartCard` (orientation por defecto `"horizontal"`)

### Why

Patrón de `LinearBarChartCard.stories.tsx` → `Horizontal`, fiel a PDF p.9 «HISTÓRICO INCENDIOS».

---

## User Request

Comparar incidentes entre cuatro zonas con barras rectangulares clásicas.

### Recommended Components

- `BarChartCard`

### Why

`LinearBarChartCard` es el lenguaje visual de "línea fina" de p.9; para rectángulos tradicionales
(p.10) usar `BarChartCard`.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-line-light` | color | Línea/barra por defecto y label de grupo (vertical) |
| `--ds-color-pdf-critical` | color | Línea/barra + textos cuando `highlighted` |
| `--ds-color-white` | color | Label (horizontal) y valor grande (horizontal) |
| `--ds-font-body` | typography | `font-family` de todos los textos |
| `--ds-font-weight-bold` / `--ds-font-weight-light` | typography | Peso de valor grande vs labels |
| `--ds-radius-pill` | radius | `border-radius` de cada línea/barra (extremos redondeados) |

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
packages/ui/src/components/LinearBarChartCard.tsx
```

## Dependencies

- `ChartCard` from `packages/ui/src/components/ChartCard.tsx`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-linear-bar-chart*`)

## DOM Structure

```text
div.ds-chart-card
├── header.ds-chart-card__title
├── div.ds-chart-card__body
│   └── div.ds-linear-bar-chart.ds-linear-bar-chart--horizontal|--vertical
│       ├── (horizontal) div.ds-linear-bar-chart__row[.--highlighted] × data.length
│       │   ├── span.ds-linear-bar-chart__track > span.ds-linear-bar-chart__bar-horizontal
│       │   ├── span.ds-linear-bar-chart__label
│       │   └── span.ds-linear-bar-chart__value
│       └── (vertical) — un solo grid, sin wrapper por grupo (ver Known Limitations/Changelog):
│           ├── div.ds-linear-bar-chart__bar-vertical[.--highlighted] × data.length (fila 1, una columna de grid por barra)
│           │   └── span.ds-linear-bar-chart__bar-value
│           └── span.ds-linear-bar-chart__group-label × groups.length (fila 2, `grid-column: span N` sobre las columnas de su grupo)
└── footer.ds-chart-card__footer
```

---

# Known Limitations

- Sin ejes numéricos, leyenda ni tooltips.
- Sin interactividad (hover, clic, selección).
- `unit` es un sufijo literal, no un formateador de número.
- Con muchos datos horizontales o grupos verticales muy poblados, el layout no reduce
  automáticamente el tamaño de fuente — puede desbordar si el contenedor es muy angosto.
- Sin animaciones ni transiciones.
- Sin uso en `apps/web`.
- Sin tests unitarios ni de integración en el repositorio.

---

# Future Improvements

- [ ] Confirmar con design el color de línea por defecto exacto (PDF legend dice `#FFFFFF`, el
  vector medido en `doc[8]` es `#e6e6e6` — ver spec)
- [ ] Evaluar soporte de eje/grid horizontal si se agregan datasets con muchos valores dispersos

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.1 | Fix post-revisión de usuario (misma sesión): `orientation="vertical"` anidaba cada grupo en su propio contenedor flex (`.ds-linear-bar-chart__group` > `.ds-linear-bar-chart__group-bars`), con `gap: 15px` *dentro* de un grupo pero `justify-content: space-between` *entre* grupos de distinto tamaño de flex — como los grupos tienen distinta cantidad de barras (1 a 3 en el ejemplo), el espacio distribuido por `space-between` no era el mismo entre cada par de barras, dando un espaciado visualmente inconsistente ("no tiene las barras separadas por el mismo espacio de forma consistente"). El PDF mide un espaciado centro-a-centro uniforme (~17.7px) en **toda** la fila, sin importar el límite de grupo. Reescrito a un único CSS grid (`grid-template-columns: repeat(N, 1fr)`, una columna por barra, `column-gap: 15px` parejo) — cada barra ocupa una columna explícita (`gridColumn`) y cada etiqueta de grupo usa `grid-column: start / span count` para centrarse exactamente sobre las columnas de sus propias barras, sin wrapper por grupo. |
| 0.1.0 | Componente nuevo — GRAFICOS p.9 "Barras lineal horizontal/vertical" (`doc[8]`) no tenía ningún componente asociado (el roadmap listaba "Gráficos p.9–10 ✅✅" atribuyendo ambas páginas a `ChartCard`/`BarChartCard`/`DonutChartCard`/`LineChartCard`, pero esos solo cubren p.10 — corregido en `component-roadmap.md`). Medido con PyMuPDF (`get_drawings()`/`get_text()` sobre `doc[8]`): línea/barra 5pt@2×÷2=2.5px, título 16pt→8px, número grande 20pt→10px, número chico 10pt→5px, referencia 16pt→8px, color destacado `#ff0404`. Nota: los tamaños de fuente y el grosor de línea de esta página miden consistentemente ~0.887× los valores redondos que cita la propia leyenda del PDF (16pt→14.19pt medido, 20pt→17.74pt medido, 5pt→4.436pt medido) — un artefacto de escala uniforme de este diagrama específico; se usaron los valores redondos de la leyenda, no los medidos, ver spec. Implementado en HTML/CSS puro (no SVG, a diferencia de los otros charts) por ser más simple para filas con texto flanqueando la línea. Ajuste post-verificación en Storybook: el `gap` entre barras verticales de un mismo grupo pasó de `4px` (inventado) a `15px` (medido de `get_drawings()`, centro-a-centro ~17.7px menos el grosor de 2.5px) porque las etiquetas de valor flotantes se superponían con 4px. |
