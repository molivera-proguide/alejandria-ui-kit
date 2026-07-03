---
id: data-table
name: DataTable
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/DataTable.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/DataTable

aliases:
  - tabla de datos
  - tabla operativa
  - listado tabular
keywords:
  - DataTable
  - tabla
  - filas
  - columnas
  - listado
  - recursos
  - tareas
  - eventos
  - operaciones
  - DataTableColumn
tags:
  - data-display
  - tables
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# DataTable

## Purpose

Presenta listados tabulares compactos de recursos, tareas o eventos en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** renderizar una tabla HTML con encabezados definidos por columnas y celdas derivadas de filas de datos proporcionadas por el consumidor.
- **Problema que resuelve:** unificar la presentación de listados operativos densos sin acoplar obtención de datos, ordenamiento, paginación ni selección de filas.
- **Alcance:** componente presentacional basado en `<table>` dentro de un contenedor con desplazamiento; el consumidor provee esquema de columnas (`columns`) y contenido de filas (`rows`) como `Record<string, ReactNode>`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado con contenedor externo `<div class="ds-table-wrap">` y tabla interna `<table class="ds-table">`.
- Una fila de encabezado (`<thead>`) por cada entrada en `columns`, en el orden del array.
- Una fila de cuerpo (`<tbody>`) por cada entrada en `rows`, en el orden del array.
- Celdas de encabezado y cuerpo alineadas por columna mediante `data-align={column.align ?? "left"}` en `<th>` y `<td>`.
- `caption` renderizado como `<caption>` nativo solo cuando su valor es truthy.
- Clave React de cada fila: `String(row[rowKey] ?? index)` con `rowKey` por defecto `"id"`.
- Contenido de celda: `row[column.key]`; admite `ReactNode` (strings, números, elementos JSX).
- Fusión de `className` externa con `ds-table-wrap` mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` contenedor vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, ordena, filtra ni pagina datos.
- Renderiza estados vacíos, de carga ni mensajes de error integrados.
- Define selección de filas, filas expandibles ni acciones por fila.
- Compone internamente `Badge`, `Button`, `Card`, `TaskCard` ni otros componentes del kit.
- Aplica variantes visuales de tabla (`dense`, `striped`, `bordered`, etc.).
- Define interactividad de filas ni manejadores de clic en celdas.
- Reenvía `...props` al elemento `<table>` (solo al `<div>` contenedor).
- Aplica estilos responsivos propios mediante media queries.
- Define roles ARIA, `scope` en encabezados ni manejo de teclado propios en la tabla.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `columns` como array no vacío de objetos `DataTableColumn` con `key` y `label`.
- Proporcionar `rows` como array de objetos cuyas claves coincidan con `column.key` para poblar celdas.
- Asegurar unicidad de `row[rowKey]` cuando se mapean listas dinámicas; el valor por defecto de `rowKey` es `"id"`.

## Forbidden

- Inventar props que no existan en `DataTableProps` (`variant`, `size`, `onRowClick`, `sortable`, `selectable`, `children`, `emptyMessage`, etc.).
- Asumir ordenamiento, filtrado o paginación integrados.
- Pasar atributos al `<table>` esperando que el componente los reenvíe; `...props` solo afecta al `<div class="ds-table-wrap">`.
- Confiar en formato automático de números, fechas ni localización de encabezados.
- Anidar otro `DataTable` como hijo (no hay slot `children`).

## Recommendations

- Usar `caption` cuando la tabla requiera título accesible visible (p. ej. `"Tareas recientes"`, `"Recursos"`).
- Pasar `<Badge>` u otros componentes del kit como valor de celda cuando se necesite codificación visual de estado (`DataTable.stories.tsx`).
- Usar `align: "right"` en columnas numéricas y `align: "center"` en columnas de estado o ETA, como en las stories.
- Envolver en un contenedor con ancho mínimo adecuado; la story usa `minWidth: 720` en el decorator de Storybook.
- Preformatear identificadores, cantidades y fechas en el consumidor antes de pasarlos en `rows`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Tables |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/DataTable.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  DataTable,
  type DataTableProps,
  type DataTableColumn
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `DataTable` — componente funcional.
- `DataTableProps` — props del componente.
- `DataTableColumn` — definición de columna para el encabezado y alineación de celdas.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `columns` | `DataTableColumn[]` | — | sí | Definición de columnas. Cada entrada genera un `<th>` y determina qué clave de fila se renderiza en cada `<td>`. |
| `rows` | `Array<Record<string, ReactNode>>` | — | sí | Datos de filas. Los valores se leen por `column.key`; admiten texto u otros `ReactNode`. |
| `caption` | `string` | — | no | Título de la tabla. Renderizado en `<caption>` solo si es truthy. |
| `rowKey` | `string` | `"id"` | no | Clave del objeto fila usada como identificador React (`row[rowKey]`). Si falta o es falsy, se usa el índice del array. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-table-wrap` en el `<div>` contenedor. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` contenedor (`id`, `style`, `data-*`, `aria-*`, etc.). |

### DataTableColumn

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `key` | `string` | — | sí | Identificador de columna. Usado como `key` de React en `<th>` y `<td>`, y para leer `row[key]`. |
| `label` | `string` | — | sí | Texto del encabezado de columna. Renderizado dentro de `<th>`. |
| `align` | `"left" \| "center" \| "right"` | `"left"` | no | Alineación horizontal. Aplica `data-align` en `<th>` y `<td>` de esa columna. |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada en CSS mediante `.ds-table-wrap` y `.ds-table`. Contenedor con superficie glass, borde, radio medio y sombra pequeña; tabla de ancho completo con encabezados en mayúsculas (`text-transform: uppercase` vía CSS en `th` y `caption`), filas separadas por borde inferior y última fila sin borde inferior.

La alineación por columna (`left`, `center`, `right`) no es una variante de componente; es configuración por entrada en `columns` que modifica `text-align` mediante selectores `[data-align="center"]` y `[data-align="right"]`. La alineación `left` usa el valor por defecto de `th` y `td` sin atributo adicional explícito en CSS.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-table` y `.ds-table-wrap`. Sin estados `:hover`, `:focus`, `:active` ni `:selected` definidos en CSS para filas o celdas. |
| With caption | Cuando `caption` es truthy, se renderiza `<caption>` con estilos de etiqueta superior en mayúsculas. |
| Without caption | Cuando `caption` es `undefined` o falsy, no se renderiza elemento `<caption>` (story `WithoutCaption`). |
| Overflow horizontal | `.ds-table-wrap` tiene `overflow: auto`; celdas con `white-space: nowrap` pueden provocar desplazamiento horizontal en contenedores estrechos. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica nativa de tabla HTML (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` y `<caption>` opcional).
- Cuando `caption` está presente, el nombre accesible de la tabla puede derivarse del elemento `<caption>` nativo.
- Los encabezados de columna se exponen como `<th>` sin atributo `scope`.
- El consumidor es responsable de proveer contexto semántico adicional (`aria-label` en el contenedor, descripción de la tabla, relación encabezado-celda) si la tabla requiere más contexto del que ofrece `caption`.
- No es interactivo; filas y celdas no reciben foco ni responden a teclado por diseño del componente.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `role`, etc. en el `<div class="ds-table-wrap">`. El componente no los aplica por defecto ni los reenvía al `<table>`. |
| `<caption>` | Generado solo cuando `caption` es truthy; sin atributos ARIA adicionales del componente. |
| `<th>` | Sin `scope`, `aria-sort` ni otros atributos ARIA aplicados por el componente. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. La tabla no es focusable salvo que el consumidor lo configure en el contenedor mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`DataTable` no define media queries. El contenedor `.ds-table-wrap` aplica `overflow: auto`; las celdas usan `white-space: nowrap`, lo que favorece desplazamiento horizontal en lugar de ajuste de línea dentro de la celda.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Ancho efectivo y scroll dependen del contenedor padre y del contenido de las celdas. |
| Storybook | Decorator con `minWidth: 720` y `padding: 32`; el layout responsivo depende del decorator, no del componente. |
| `README.md` | Describe uso para listados compactos; no hay implementación en `apps/web` ni en `Components.stories.tsx` → `OperationsConsole`. |

---

# Composition

## Purpose in Layout

- **Summary** — listado tabular de recursos, tareas o eventos en paneles operativos.
- **Detail** — vista densa de filas con múltiples atributos por registro (ID, zona, estado, unidades).
- **Container** — envoltorio presentacional con estructura fija (columnas + filas); no admite slots libres ni `children`.

## Parent

- `div` con ancho mínimo en el decorator de `DataTable.stories.tsx` (`minWidth: 720`).
- Paneles de consola o secciones de dashboard donde el consumidor necesite un listado tabular compacto.

## Children

- No admite `children`. El contenido de celdas proviene exclusivamente de `rows[column.key]`, que puede incluir JSX del consumidor (p. ej. `<Badge>`).

## Siblings

- `MetricCard` — fila de KPIs de resumen; no sustituye listados tabulares multi-columna.
- `TaskCard` — tarjeta individual de tarea con progreso; alternativa card-based frente a filas de tabla.
- `Card` — contenedor compuesto con slots libres; puede envolver o preceder a una tabla en la misma vista.
- `Badge` — etiqueta de estado pasada como contenido de celda por el consumidor en las stories.

## Alternatives

- `TaskCard` — presentación card-based de una tarea con código, estado, descripción, meta y barra de progreso; usado en `Components.stories.tsx` y `apps/web` en lugar de tabla.
- Lista de `Card` o elementos custom — cuando cada registro requiere layout rico no tabular.
- `ModuleCard` — navegación por módulo con métricas embebidas; no es listado tabular genérico.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Badge` | Contenido habitual de celdas de estado en `DataTable.stories.tsx`; el consumidor lo pasa en `rows`; `DataTable` no importa `Badge` internamente. |
| `TaskCard` | Alternativa card-based para listas de tareas; usada en consolas demo en lugar de `DataTable`. |
| `MetricCard` | KPI puntual de solo lectura; complemento de resumen sobre una tabla de detalle. |
| `Card` | Contenedor compuesto de paneles; hermano habitual en dashboards; no integra `DataTable` internamente. |
| `Button` | Acciones de consola adyacentes a listados; sin integración directa con filas de tabla. |
| `AlertBanner` | Mensajes de alerta narrativos; no sustituye filas tabulares de datos. |

---

# Content Guidelines

## Labels

- `columns[].label`: descriptor breve de columna (p. ej. `"ID"`, `"Zona"`, `"Estado"`, `"Unidades"`, `"Recurso"`, `"Responsable"`, `"ETA"`). El CSS aplica `text-transform: uppercase` en `th`; no es obligatorio escribir en mayúsculas en la prop.
- `caption`: título de la tabla en contexto operativo (p. ej. `"Tareas recientes"`, `"Recursos"`). El CSS aplica mayúsculas en `caption`.

## Values

- Valores de celda: strings preformateados por el consumidor (p. ej. `"#3408473"`, `"Costa sur"`, `"05"`, `"00:14"`, `"Helicoptero"`).
- Columnas numéricas o de conteo: alinear a la derecha con `align: "right"` como en la columna `units` de la story `Playground`.
- Estados semánticos: preferir `<Badge tone="...">` como `ReactNode` en la celda, siguiendo `DataTable.stories.tsx`.

## Icons

- `DataTable` no expone prop `icon` ni columna de iconos integrada.
- Iconos solo aparecen si el consumidor los incluye dentro del `ReactNode` de una celda.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `label`, `caption` y valores de celda.

---

# Examples

## Basic

```tsx
import { DataTable } from "@alejandria/ui-kit";

const columns = [
  { key: "id", label: "ID" },
  { key: "zone", label: "Zona" },
  { key: "status", label: "Estado" },
  { key: "units", label: "Unidades", align: "right" as const }
];

const rows = [
  { id: "#3408473", zone: "Costa sur", status: "Critica", units: "05" },
  { id: "#3408474", zone: "Barrio sur", status: "Asignada", units: "12" }
];

<DataTable columns={columns} rows={rows} caption="Tareas recientes" />
```

## Variant

Alineación por columna; única variación visual de layout soportada por la implementación actual.

```tsx
import { DataTable } from "@alejandria/ui-kit";

<DataTable
  caption="Recursos"
  columns={[
    { key: "resource", label: "Recurso" },
    { key: "owner", label: "Responsable" },
    { key: "eta", label: "ETA", align: "center" },
    { key: "state", label: "Estado", align: "right" }
  ]}
  rows={[
    { id: "r1", resource: "Helicoptero", owner: "Equipo Norte", eta: "00:14", state: "Activo" },
    { id: "r2", resource: "Dron 1", owner: "Observacion", eta: "00:04", state: "En vuelo" }
  ]}
/>
```

## Composition

```tsx
import { Badge, DataTable } from "@alejandria/ui-kit";

const columns = [
  { key: "id", label: "ID" },
  { key: "zone", label: "Zona" },
  { key: "status", label: "Estado" },
  { key: "units", label: "Unidades", align: "right" as const }
];

const rows = [
  {
    id: "#3408473",
    zone: "Costa sur",
    status: <Badge tone="danger">Critica</Badge>,
    units: "05"
  },
  {
    id: "#3408474",
    zone: "Barrio sur",
    status: <Badge tone="success">Asignada</Badge>,
    units: "12"
  }
];

<div style={{ minWidth: 720, padding: 32 }}>
  <DataTable columns={columns} rows={rows} caption="Tareas recientes" />
</div>
```

---

# Reasoning Examples

## User Request

Mostrar un listado compacto de tareas con ID, zona, estado y unidades en columnas.

### Recommended Components

- `DataTable`

### Why

Patrón de `DataTable.stories.tsx` → `Playground` y descripción en `README.md` para listados de recursos, tareas o eventos.

---

## User Request

Etiquetar el estado de cada fila con color semántico (crítica, asignada, pendiente).

### Recommended Components

- `DataTable` con `<Badge tone="...">` en celdas de la columna de estado

### Why

`DataTable.stories.tsx` pasa `<Badge>` como `ReactNode` en columnas `status` y `state`; `DataTable` no renderiza badges por sí mismo.

---

## User Request

Listar tareas con descripción larga, barra de progreso y meta en tarjetas en un grid.

### Recommended Components

- `TaskCard` ×N

### Why

`TaskCard` cubre el patrón card-based usado en `Components.stories.tsx` → `OperationsConsole` y `apps/web`; `DataTable` no incluye progreso, descripción ni layout de tarjeta.

---

## User Request

Tabla ordenable con paginación y selección de filas.

### Recommended Components

- Ninguno del kit en la implementación actual

### Why

`DataTable` no implementa ordenamiento, paginación ni selección; documentar como limitación conocida o extender en el consumidor.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-surface-glass` | color | `background` de `.ds-table-wrap` |
| `--ds-color-line` | color | `border` de `.ds-table-wrap` y `border-bottom` de `th` y `td` |
| `--ds-radius-md` | radius | `border-radius` de `.ds-table-wrap` |
| `--ds-shadow-sm` | shadow | `box-shadow` de `.ds-table-wrap` |
| `--ds-color-ink` | color | `color` de `.ds-table` |
| `--ds-font-body` | typography | `font-family` de `.ds-table` |
| `--ds-color-ink-soft` | color | `color` de `.ds-table caption` y `.ds-table th` |
| `--ds-font-mono` | typography | `font-family` de `.ds-table caption` y `.ds-table th` |

Nota: el fondo de encabezados `.ds-table th` está hardcodeado (`rgb(0 0 0 / 0.22)`) y no usa token del sistema. Los tamaños de fuente de `caption`, `th` y `td` están hardcodeados (`0.7rem`, `0.68rem`, `0.92rem`).

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/DataTable.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-table-wrap`, `ds-table`)

## DOM Structure

```text
div.ds-table-wrap
└── table.ds-table
    ├── caption (solo si caption es truthy)
    ├── thead
    │   └── tr
    │       └── th[data-align] × columns.length
    └── tbody
        └── tr × rows.length
            └── td[data-align] × columns.length
```

---

# Known Limitations

- Sin ordenamiento, filtrado, paginación, selección de filas ni filas expandibles.
- Sin estado vacío, de carga ni mensaje cuando `rows` está vacío.
- Sin interactividad de filas (`onRowClick`, hover de fila, etc.).
- `...props` y `className` solo aplican al `<div>` contenedor, no al `<table>`.
- Encabezados `<th>` sin atributo `scope`; sin `aria-sort` ni soporte de tabla accesible avanzada.
- Celdas con `white-space: nowrap`; contenido largo provoca overflow horizontal en lugar de ajuste de línea.
- Fondo de encabezado hardcodeado; migración incompleta a tokens del design system.
- No define variantes visuales (`dense`, `striped`, etc.).
- No compone ni importa `Badge`; el uso con badges depende enteramente del consumidor.
- Sin uso en `apps/web/src/App.tsx` ni en `Components.stories.tsx` → `OperationsConsole`.
- Sin documentación JSDoc en `DataTable.tsx` según convenciones del repositorio.
- Sin tests unitarios ni de integración en el repositorio.
- Si `row[rowKey]` falta en varias filas, React puede reutilizar nodos incorrectamente al usar el índice como fallback.

---

# Future Improvements

- [ ] Ordenamiento, filtrado o paginación si se definen en el diseño del kit
- [ ] Estado vacío y mensaje cuando `rows.length === 0`
- [ ] `scope="col"` u otras mejoras de accesibilidad en `<th>`
- [ ] Reenvío opcional de atributos al `<table>` o prop dedicada para ello
- [ ] Variante densa o striped si se definen en tokens y diseño
- [ ] Migrar fondo de `th` hardcodeado a token de superficie
- [ ] Documentación JSDoc en `DataTable.tsx`, `DataTableProps` y `DataTableColumn`
- [ ] Integración en `Components.stories.tsx` o `apps/web` para demostrar uso en consola completa
- [ ] Tests de renderizado de columnas, filas, caption y alineación

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `DataTable`, `DataTableProps` y `DataTableColumn` con estilos `ds-table-wrap` y `ds-table`. Stories en Storybook (`Playground`, `WithoutCaption`, `DenseOperationalRows`). Export en `packages/ui/src/index.ts`. Mención en `README.md`. Uso documentado de `Badge` como contenido de celda en `DataTable.stories.tsx` y referencia cruzada en `Badge.md`. |
