---
id: detail-sheet
name: DetailSheet
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/patterns/detail-sheet/DetailSheet.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Patterns/DetailSheet

aliases:
  - ficha
  - ficha de detalle
  - detail sheet
  - vista de entidad
keywords:
  - DetailSheet
  - ficha
  - detalle
  - narrativa
  - multimedia
  - métricas operativas
  - DetailSheetContent
  - DetailSheetProps
  - DetailSheetStatus
  - DetailSheetOperationalMetric
  - DetailSheetMediaMetric
  - DetailSheetAction
tags:
  - data-display
  - composed
  - presentational
  - organism

last_reviewed: 2026-08-07
---

# DetailSheet

## Purpose

Presenta la vista completa de una entidad operativa (estado, identificador, descripción,
filtros contextuales, métricas, gráfico de rendimiento, multimedia y acciones de decisión)
en una sola superficie, alineada con la sección **FICHAS** del PDF de referencia (p.5).

Describe:

- **Responsabilidad principal:** componer, a partir de un único objeto `content`, todas las
  regiones fijas de una "ficha" — no es un primitive nuevo, es una composición de
  `Button`, `LineChartCard`, `MetricCard` y `SelectField` ya existentes en el kit.
- **Problema que resuelve:** unifica el layout de "vista de contexto completo de un
  registro" (header con estado + filtros, cuerpo de dos columnas con narrativa/multimedia
  a la izquierda y métricas/gráfico a la derecha, footer de acciones) sin que cada
  consumidor tenga que rearmarlo a mano.
- **Alcance:** 100% presentacional y controlado por datos estáticos (`content`) — sin
  fetching, sin estado propio, sin lógica de negocio. Los dos botones de icono
  (Configuración/Cerrar) no tienen `onClick` expuesto hoy — ver Known Limitations.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.5
"FICHAS". Confirmado vía `get_text()` (2026-08-07): p.5 contiene verbatim el contenido de
la story (`"#1232142342 - 3408473"`, `"DESCRIPCIÓN"`, `"MÉTRICAS DE RENDIMIENTO DE LA
TAREA"`, `"EN ESPERA"`); p.4 es "INVESTIGATION CARD" (ya cubierta por `InvestigationCard`).
El JSDoc del código citaba "página 4" — corregido a p.5 en `DetailSheet.stories.tsx`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza un `<article aria-label="Ficha de detalle">` con 3 regiones fijas: `header`
  (estados + identificador + herramientas + filtros), `body` (dos columnas: narrativa +
  multimedia a la izquierda, métricas + gráfico a la derecha) y `footer` (label de acciones
  + botones).
- Todo el contenido viene de la prop `content` (`DetailSheetContent`) — no hay `children`
  libres ni slots.
- Compone `SelectField` (filtros de territorio/período, cada uno con una sola opción fija
  igual al valor mostrado — ver Known Limitations), `MetricCard appearance="ficha"`
  (métricas operativas y multimedia), `LineChartCard` (gráfico de rendimiento, `color`
  fijo `#ffffff`) y `Button variant="pdf"` (acciones del footer, 3 variantes visuales
  `a`/`b`/`c`).
- Cada `status` en `content.statuses` se renderiza como `<span>` con
  `--neutral`/`--critical` (fondo `#7f0000`/texto `#ff0404` solo en `critical`).
- Cada acción del footer usa `variant: "a" | "b" | "c"` para el color de fondo del botón
  (`a` → `#c1c1c1`, `b` → `#8a8b87`, `c` → sin color propio, hereda `Button variant="pdf"`).

## This component never

- Hace fetch de datos ni gestiona estado — todo el contenido es estático, vía props.
- Expone `onClick` en los botones de icono (Configuración/Cerrar) ni en las acciones del
  footer más allá de lo que `Button` ya soporta vía `...props` no expuestos aquí — ver
  Known Limitations.
- Introduce variantes nuevas en `MetricCard`/`LineChartCard`/`SelectField`/`Button` — reusa
  las ya existentes (`appearance="ficha"`, `variant="pdf"`) vía composición, no las modifica.
- Renderiza más de una ficha por instancia ni admite `children`.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css` +
  el CSS propio del patrón (`detail-sheet.css`, empaquetado junto al componente).
- Proveer el objeto `content` completo (`DetailSheetContent`) — no hay props opcionales a
  nivel raíz, todas las regiones son obligatorias porque el PDF no define un layout con
  regiones ausentes.

## Forbidden

- Modificar `MetricCard`/`LineChartCard`/`SelectField`/`Button` para agregar variantes
  "ficha-specific" — la regla original de este patrón (`knowledge/patterns/detail-sheet.md`,
  ahora superseded, ver nota en ese archivo) ya prohibía esto explícitamente y sigue
  vigente: toda diferencia visual de contexto se resuelve con CSS contextual
  (`detail-sheet.css`), no con nuevas props en los componentes base.
- Reemplazar los `var(--ds-color-pdf-*)` de `detail-sheet.css` por hex literales — se
  tokenizaron el 2026-08-07 (ver Design Tokens) precisamente porque coincidían con tokens
  ya existentes; volver a hardcodearlos reintroduce la deuda que se cerró.
- Envolver `DetailSheet` con lógica de routing o fetching propia del kit — es
  responsabilidad exclusiva de la app consumidora.

## Recommendations

- Usar `DetailSheet` dentro de un contenedor con `max-width` propio si se necesita un ancho
  distinto al `656px` fijo del patrón — no hay prop de ancho. Por debajo de ese ancho, el
  propio componente se reacomoda solo — ver Responsive Behavior — no hace falta que el
  consumidor agregue su propio media/container query.

---

# Category

| Field | Value |
|--------|-------|
| Type | organism |
| Group | Data Display |
| Package | @alejandria/ui-kit |
| Import | `import { DetailSheet } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  DetailSheet,
  type DetailSheetProps,
  type DetailSheetContent,
  type DetailSheetStatus,
  type DetailSheetStatusVariant,
  type DetailSheetOperationalMetric,
  type DetailSheetMediaMetric,
  type DetailSheetAction
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `DetailSheet` — componente funcional.
- `DetailSheetProps` — `{ content: DetailSheetContent }`.
- `DetailSheetContent` — forma completa del contenido de la ficha.
- `DetailSheetStatus` — `{ label, variant }`.
- `DetailSheetStatusVariant` — unión `"neutral" | "critical"`.
- `DetailSheetOperationalMetric` — `{ label, value, change }`.
- `DetailSheetMediaMetric` — `{ label, value }`.
- `DetailSheetAction` — `{ label, variant: "a" | "b" | "c" }`.

---

# Props

## DetailSheetProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `DetailSheetContent` | sí | Único punto de entrada de datos — no hay otras props. |

## DetailSheetContent

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `statuses` | `DetailSheetStatus[]` | sí | Indicadores de estado en el header (ej. "EN ESPERA", "VENCIDA"). |
| `identifier` | `string` | sí | Título/identificador principal (`<h1>`). |
| `descriptionTitle` | `string` | sí | Título de la sección narrativa (ej. "DESCRIPCIÓN"). |
| `description` | `string` | sí | Texto narrativo largo. |
| `territoryFilter` | `string` | sí | Valor mostrado en el filtro "Territorio" — hoy es la única opción del `SelectField`, no una lista real. |
| `periodFilter` | `string` | sí | Valor mostrado en el filtro "Período" — mismo comportamiento. |
| `operationalMetrics` | `DetailSheetOperationalMetric[]` | sí | Métricas de la región derecha (grid de 3 columnas). |
| `performanceChart` | `{ title, footer, data: LineChartDatum[] }` | sí | Gráfico de rendimiento (`LineChartCard`). |
| `mediaTitle` | `string` | sí | Título de la sección multimedia. |
| `mediaMetrics` | `DetailSheetMediaMetric[]` | sí | Contadores multimedia (Fotos/Videos/Audios). |
| `actionsLabel` | `string` | sí | Label sobre los botones del footer (ej. "ACCIONES"). |
| `actions` | `DetailSheetAction[]` | sí | Botones de decisión del footer. |

## DetailSheetStatus / DetailSheetOperationalMetric / DetailSheetMediaMetric / DetailSheetAction

| Type | Fields |
|------|--------|
| `DetailSheetStatus` | `label: string`, `variant: "neutral" \| "critical"` |
| `DetailSheetOperationalMetric` | `label: string`, `value: string`, `change: string` |
| `DetailSheetMediaMetric` | `label: string`, `value: string` |
| `DetailSheetAction` | `label: string`, `variant: "a" \| "b" \| "c"` |

---

# Variants

No hay variantes visuales públicas — una sola composición canónica (PDF p.5). Las
"variantes" de `status`/`action` son parte del contenido (`DetailSheetStatusVariant`,
el literal `"a"|"b"|"c"` de `DetailSheetAction`), no props de layout.

---

# States

| State | Description |
|--------|-------------|
| Default | Ficha completa con todo el `content` provisto — no hay estado de carga/vacío/error definido (sin fetching, ver Behavioral Contract). |
| Status `neutral` | Texto blanco, sin fondo. |
| Status `critical` | Fondo `#7f0000`, texto `#ff0404`. |
| Action `a` | Fondo `#c1c1c1`. |
| Action `b` | Fondo `#8a8b87`. |
| Action `c` | Sin color propio — hereda el fondo por defecto de `Button variant="pdf"`. |

---

# Layout (PDF p.5 "FICHAS")

| Región | Elemento DOM | Contenido |
|--------|--------------|-----------|
| Header | `header.detail-sheet__header` | Estados + identificador (izq.), botones de icono + filtros (der.) |
| Body — izquierda | `div.detail-sheet__body-left` | Narrativa (descripción) + multimedia (contadores + preview) |
| Body — derecha | `div.detail-sheet__body-right` | Métricas operativas (grid 3 cols) + `LineChartCard` |
| Footer | `footer.detail-sheet__actions` | Label + fila de botones de decisión |

---

# Accessibility

## Requirements

- `<article aria-label="Ficha de detalle">` como raíz semántica.
- Cada región interactiva/informativa tiene `aria-label` propio (`"Estado"`, `"Filtros
  contextuales"`, `"Descripción"`, `"Archivos multimedia"`, `"Vista previa multimedia"`,
  `"Métricas operativas"`, `"Métricas de rendimiento"`).
- Botones de icono (Configuración/Cerrar) tienen `aria-label` fijo; los íconos SVG llevan
  `aria-hidden="true"`.
- `SelectField`, `MetricCard`, `LineChartCard`, `Button` internos heredan la accesibilidad ya
  documentada en sus propios `knowledge/components/*.md`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-label` | Raíz (`"Ficha de detalle"`) y cada región (`"Estado"`, `"Filtros contextuales"`, etc.). |
| `aria-hidden="true"` | Íconos SVG decorativos (Settings, X, ícono de play, barra de progreso). |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Navega entre botones de icono, controles de `SelectField` y botones de acción — comportamiento nativo de cada componente compuesto. |

---

# Responsive Behavior

`max-width: 656px` fijo, `width: 100%` dentro de ese máximo. Agregado 2026-08-13
(`knowledge/design-system-rules.md` Rule 11): el propio `.detail-sheet` declara
`container-type: inline-size` y define un `@container` — no `@media` — porque este
componente se reusa a anchos distintos dentro de la misma pantalla (panel lateral angosto
vs. vista completa), no según el viewport.

Por debajo del rol `narrow` de la escala (640px de ancho renderizado del componente — la
condición real en CSS es `598.5px`, ajustada por el content-box del propio padding/border;
ver comentario en `detail-sheet.css`), tanto `.detail-sheet__header` como `.detail-sheet__body`
colapsan de 2 columnas a 1. Esto evita que `.detail-sheet__metrics` (3 `MetricCard` fijos de
83px = piso duro de 261px) se desborde del panel. Story `PanelAngosto` en Storybook verifica
esto con un wrapper de 320px (el addon de Viewport de Storybook no sirve para probar esto —
mide el iframe completo, no el contenedor real).

**Límite de alcance conocido:** por debajo de ~301px de ancho de contenedor (261px del piso
de `.detail-sheet__metrics` + 40px de padding), el desborde puede reaparecer incluso apilado —
no hay un paso más angosto que `narrow` en la escala hoy.

---

# Composition

## Purpose in Layout

- **Detail** — vista de contexto completo de una entidad operativa.
- **Container** — estructura fija; no admite `children` libres.

## Parent

- Cualquier contenedor del consumidor (panel lateral, modal de detalle, página dedicada).

## Children

- No admite `children` — todo el contenido viene de `content`.

## Siblings

- `InvestigationCard` — resumen compacto de una entidad; `DetailSheet` es la vista completa
  equivalente (mismo dominio, distinto nivel de detalle).

## Alternatives

- `InvestigationCard` — cuando alcanza un resumen compacto en grid, sin narrativa/multimedia
  ni gráfico de rendimiento.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `MetricCard` | Compuesto internamente (`appearance="ficha"`) para métricas operativas y multimedia. |
| `LineChartCard` | Compuesto internamente para el gráfico de rendimiento. |
| `SelectField` | Compuesto internamente para los filtros de territorio/período. |
| `Button` | Compuesto internamente (`variant="pdf"`) para las acciones del footer. |
| `InvestigationCard` | Alternativa de menor densidad para el mismo dominio (entidades operativas). |

---

# Content Guidelines

## Labels

- `identifier`: identificador único de la entidad (ej. `"#1232142342 - 3408473"`).
- `descriptionTitle`/`mediaTitle`/`actionsLabel`: títulos de sección en mayúsculas (vía CSS
  o directamente en el string, ver stories).

## Values

- `operationalMetrics[].value`/`change`, `mediaMetrics[].value`: strings preformateados, sin
  procesamiento interno.

## Icons

- Configuración (`Settings` de `lucide-react`) y Cerrar (`X` de `lucide-react`) — fijos, no
  configurables vía props.

## Localization

- Contenido en español en la story de referencia; el componente no impone idioma (todo el
  texto llega vía `content`, salvo los `aria-label` fijos del código).

---

# Examples

## Ficha completa (PDF p.5)

```tsx
<DetailSheet
  content={{
    statuses: [
      { label: "EN ESPERA", variant: "neutral" },
      { label: "VENCIDA", variant: "critical" }
    ],
    identifier: "#1232142342 - 3408473",
    descriptionTitle: "DESCRIPCIÓN",
    description: "Tarea investigativa con una subactividad generada el dia 04 de marzo.",
    territoryFilter: "TODO EL PAÍS",
    periodFilter: "NOV - FEB",
    operationalMetrics: [
      { label: "TAREAS", value: "13", change: "Allanamientos" }
    ],
    performanceChart: {
      title: "MÉTRICAS DE RENDIMIENTO DE LA TAREA",
      footer: "NOV - FEB",
      data: [{ label: "NOV", value: 60 }]
    },
    mediaTitle: "ARCHIVOS MULTIMEDIA",
    mediaMetrics: [{ label: "Fotos", value: "13" }],
    actionsLabel: "ACCIONES",
    actions: [{ label: "DECISIÓN A", variant: "a" }]
  }}
/>
```

---

# Reasoning Examples

## User Request

Mostrar la vista completa de un caso/tarea con descripción, métricas, gráfico de
rendimiento y acciones de decisión.

### Recommended Components

- `DetailSheet`

### Why

Único componente del kit que compone las 6 regiones de la ficha PDF p.5 en una sola
superficie — `InvestigationCard` no llega a este nivel de detalle.

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-surface-warm` (`#2a2927`) | color | Fondo de la ficha |
| `--ds-color-pdf-surface` (`#060606`) | color | Fondo de la región narrativa y del preview multimedia |
| `--ds-color-pdf-line` (`#c1c1c1`) | color | Borde de la ficha; fondo de la acción `variant="a"` |
| `--ds-color-pdf-line-light` (`#e6e6e6`) | color | Borde de narrativa/multimedia/filtros/gráfico |
| `--ds-color-pdf-ink-muted` (`#8a8b87`) | color | Títulos secundarios (narrativa, multimedia, acciones); fondo de la acción `variant="b"` |
| `--ds-color-pdf-critical` (`#ff0404`) | color | Texto de status `critical`; barra de progreso multimedia |
| `--ds-color-pdf-action` (`#494949`) | color | Track de la barra de progreso multimedia |
| `--ds-color-white` (`#ffffff`) | color | Texto sobre fondos oscuros (título, acciones, footer del chart) |
| `--ds-border-width-hair` (`0.75px`) | border | Todos los bordes hairline del componente |
| `#7f0000` | color | Fondo de status `critical` — sin token equivalente en el kit, queda literal |
| `--ds-font-mono` | typography | Estados del header |
| `--ds-font-display` | typography | Identificador principal (`<h1>`) |
| `--ds-font-body` | typography | Narrativa, títulos secundarios, filtros |

**Tokenizado 2026-08-07:** todos los colores/bordes de `detail-sheet.css` que coincidían
exactamente con un token `--ds-*` existente se migraron a `var(--ds-*)` (verificado sin
regresión visual vía `getComputedStyle` en Storybook). Quedan literales solo los valores
sin equivalente exacto: `#7f0000` (fondo crítico) y un puñado de `rgb(0 0 0 / α)`/gradientes
del preview multimedia cuyo alpha no coincide con ningún token de opacidad del kit.

---

# Implementation Notes

> **Interno (mantenedores).** Las rutas de esta sección son fuente del monorepo; no forman
> parte de la API publicada de `@alejandria/ui-kit`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/patterns/detail-sheet/DetailSheet.tsx
```

## Dependencies

- `Button`, `LineChartCard` (+ `LineChartDatum`), `MetricCard`, `SelectField` — todos de
  `packages/ui/src/components/`
- `lucide-react` (`Settings`, `X`)
- `packages/ui/src/patterns/detail-sheet/detail-sheet.css` (hoja propia, importada
  directamente por el componente — no vive en `styles.css`)

## DOM Structure

```text
article.detail-sheet[aria-label="Ficha de detalle"]
├── header.detail-sheet__header
│   ├── div.detail-sheet__header-main → status-row + h1.detail-sheet__title
│   └── div.detail-sheet__header-tools → icon-row (Settings/X) + filters (SelectField ×2)
├── div.detail-sheet__body
│   ├── div.detail-sheet__body-left
│   │   ├── section.detail-sheet__narrative
│   │   └── section.detail-sheet__media → MetricCard × mediaMetrics.length + preview
│   └── div.detail-sheet__body-right
│       ├── section.detail-sheet__metrics → MetricCard × operationalMetrics.length
│       └── section.detail-sheet__charts → LineChartCard
└── footer.detail-sheet__actions → label + Button × actions.length
```

---

# Known Limitations

- Los botones de icono (Configuración, Cerrar) no exponen `onClick` — son visuales/
  decorativos hoy, sin wiring a ninguna acción.
- `SelectField` de territorio/período se renderiza con una única opción (el propio valor
  mostrado) — no es un filtro funcional, es la representación visual de un valor ya
  elegido.
- Un color (`#7f0000`, fondo de status `critical`) y algunos `rgb(0 0 0 / α)`/gradientes del
  preview multimedia quedan como literales en `detail-sheet.css` — no tienen token `--ds-*`
  equivalente en el kit hoy (ver Design Tokens). El resto de los colores/bordes ya está
  tokenizado (2026-08-07).
- Anteriormente vivía en `apps/web/src/patterns/detail-sheet/` como composición de demo, sin
  exportarse desde `@alejandria/ui-kit`; se movió a `packages/ui/src/patterns/detail-sheet/`
  y se exportó desde `index.ts` el 2026-07-28 (`knowledge/component-roadmap.md`, fila
  "Export `DetailSheet`"). El brief original de este patrón
  (`knowledge/patterns/detail-sheet.md`) fue escrito **antes** de esa decisión y prohibía
  explícitamente exportarlo como componente del kit — quedó superseded por esa promoción;
  ver nota en ese archivo y `DECISIONS.md` (2026-08-07).
- Sin tests unitarios ni de integración (sin framework de test instalado).
- El colapso a 1 columna vía `@container` (ver Responsive Behavior) no cubre anchos por
  debajo de ~301px de contenedor — `.detail-sheet__metrics` puede volver a desbordarse ahí.
  No hay un paso más angosto que `narrow` en `knowledge/design-system-rules.md` Rule 11 hoy.

---

# Future Improvements

- [ ] Exponer `onClick` en los botones de icono si un consumidor los necesita funcionales.
- [ ] Tokenizar o registrar como excepción documentada el fondo `#7f0000` de status
  `critical` (sin equivalente hoy).
- [ ] Layout responsivo (colapso a una columna en viewports angostos).

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Composición inicial en `apps/web/src/patterns/detail-sheet/` (demo only, no exportado del kit), según el brief `knowledge/patterns/detail-sheet.md`. |
| 0.1.0 | Movido a `packages/ui/src/patterns/detail-sheet/` y exportado desde `packages/ui/src/index.ts` (2026-07-28, `knowledge/component-roadmap.md` fila "Export DetailSheet") — decisión que supera las restricciones del brief original de patrón. |
| 0.1.0 | Documentación de componente + spec numérica creadas (2026-08-07), a pedido de Luna tras notar que `DetailSheet` (junto con `LinearBarChartCard`) quedaba exportado sin `knowledge/components/*.md` ni registro en el manifest — ver `DECISIONS.md`. |
| 0.1.0 | **Cierre de 2 pendientes (2026-08-07, mismo día):** (1) cita de página PDF corregida — confirmado vía `get_text()` que p.5 (no p.4) contiene el contenido real de la ficha; corregido el JSDoc de `DetailSheet.stories.tsx`. (2) Tokenizados en `detail-sheet.css` todos los colores/bordes hairline que coincidían exactamente con un token `--ds-*` existente (`--ds-color-pdf-surface-warm`, `--ds-color-pdf-surface`, `--ds-color-pdf-line`, `--ds-color-pdf-line-light`, `--ds-color-pdf-ink-muted`, `--ds-color-pdf-critical`, `--ds-color-pdf-action`, `--ds-color-white`, `--ds-border-width-hair`) — verificado sin regresión visual (`getComputedStyle` en Storybook, mismos valores RGB antes/después). `#7f0000` y los `rgb(0 0 0 / α)`/gradientes del preview multimedia quedaron literales por no tener token equivalente. |
