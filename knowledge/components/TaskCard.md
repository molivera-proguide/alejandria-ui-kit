---
id: task-card
name: TaskCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/TaskCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/TaskCard

aliases:
  - tarjeta de tarea
  - task tile
  - tarjeta operativa
keywords:
  - TaskCard
  - tarea
  - task
  - progreso
  - progress
  - status
  - code
  - meta
  - tone
  - TaskTone
  - operaciones
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# TaskCard

## Purpose

Presenta una tarea operativa con código, estado, título, descripción, metadatos y barra de progreso en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** mostrar el resumen de una tarea en curso (identificador, estado, avance, contexto) con codificación visual por tono.
- **Problema que resuelve:** unificar la estructura de tarjetas de tarea en grids de consola sin acoplar lógica de negocio, navegación ni acciones embebidas.
- **Alcance:** componente presentacional basado en `<article>`; el consumidor provee datos de la tarea y opcionalmente tono semántico; el componente limita `progress` al rango 0–100.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<article>` con clases `ds-task` y `ds-task--{tone}` por defecto.
- `code` y `title` obligatorios en la firma de props; siempre renderizados en el DOM.
- `status` por defecto `"En espera"`; `meta` por defecto `[]`; `progress` por defecto `0`; `tone` por defecto `"neutral"`.
- `progress` limitado al rango 0–100 mediante `Math.max(0, Math.min(100, progress))`.
- Variable CSS inline `--task-progress` establecida en el `<article>` raíz como `{clampedProgress}%`.
- `description` renderizada en `<p class="ds-task__description">` solo cuando es truthy.
- Cada entrada de `meta` renderizada como `<span>` en `.ds-task__meta` solo cuando `meta.length > 0`.
- Pie con barra de progreso (`.ds-task__progress-track` con `aria-hidden="true"`) y etiqueta `{progress}% avance` siempre visibles.
- Fusión de `className` externa y `style` externo con estilos internos (`--task-progress`) en el `<article>` raíz.
- Repaso de atributos nativos de `HTMLAttributes<HTMLElement>` al `<article>` vía `...props` (`id`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni actualiza el progreso de la tarea por sí mismo.
- Compone internamente `ProgressRing`, `Button`, `Badge`, `Card` ni otros componentes del kit.
- Define interactividad, manejadores de clic ni navegación.
- Expone slots `children`, `actions` ni `footer` personalizables.
- Aplica `role="progressbar"` ni atributos ARIA de progreso en la barra.
- Aplica media queries ni breakpoints propios.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `code` y `title` como `string`.
- Pasar `progress` como número entre 0 y 100 (valores fuera del rango se recortan internamente).

## Forbidden

- Inventar props que no existan en `TaskCardProps` (`variant`, `onClick`, `children`, `icon`, etc.).
- Usar `TaskCard` como contenedor genérico con contenido libre (`Card` cubre ese caso).
- Asumir que `tone="neutral"` aplica acento visual (no hay regla CSS para `--task-accent` en tono neutral).
- Confiar en `ProgressRing` dentro de `TaskCard` (la barra de progreso es implementación propia).
- Usar etiquetas duplicadas en `meta` como `key` sin riesgo de advertencias React (`key={item}`).

## Recommendations

- Agrupar instancias en un grid CSS, como en `TaskCard.stories.tsx` → `Tones` (`repeat(2, minmax(260px, 1fr))`) o `apps/web` (`.ops-task-grid`).
- Usar `tone="danger"` para tareas críticas, `tone="success"` para asignadas, `tone="warning"` para pendientes, según demos.
- Usar `key={task.code}` al mapear listas, como en `apps/web/src/App.tsx`.
- Reservar `meta` para chips contextuales breves (p. ej. `"D+02"`, `"Prioridad alta"`, `"Sur"`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/TaskCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  TaskCard,
  type TaskCardProps,
  type TaskTone
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `TaskCard` — componente funcional.
- `TaskCardProps` — props del componente.
- `TaskTone` — unión de tonos semánticos para la prop `tone`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `code` | `string` | — | sí | Identificador de la tarea. Renderizado en `<span class="ds-task__code">` dentro del encabezado. |
| `title` | `string` | — | sí | Título de la tarea. Renderizado en `<h3 class="ds-task__title">`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `status` | `string` | `"En espera"` | no | Estado operativo. Renderizado en `<span class="ds-task__status">` en el encabezado. Color vía `var(--task-accent)`. |
| `description` | `string` | — | no | Descripción de la tarea. Renderizada en `<p class="ds-task__description">` solo si es truthy. |
| `meta` | `string[]` | `[]` | no | Lista de metadatos contextuales. Cada elemento renderizado como `<span>` en `.ds-task__meta` si el arreglo no está vacío. |
| `progress` | `number` | `0` | no | Porcentaje de avance (0–100). Recortado internamente; define `--task-progress` y la etiqueta `{n}% avance`. |
| `tone` | `TaskTone` | `"neutral"` | no | Tono semántico. Aplica clase `ds-task--{tone}` y define `--task-accent` en CSS para tonos con reglas. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-task` y el modificador de tono en el `<article>` raíz. |
| `style` | `CSSProperties` | — | no | Estilos inline fusionados con `--task-progress` en el `<article>` raíz. |
| `...props` | `HTMLAttributes<HTMLElement>` | — | no | Atributos nativos del `<article>` (`id`, `data-*`, `aria-*`, etc.). |

### TaskTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Valor por defecto. Clase `ds-task--neutral`. Sin regla CSS que defina `--task-accent`. |
| `"success"` | Clase `ds-task--success`. `--task-accent: var(--ds-color-green)`. |
| `"warning"` | Clase `ds-task--warning`. `--task-accent: var(--ds-color-amber)`. |
| `"danger"` | Clase `ds-task--danger`. `--task-accent: var(--ds-color-danger)`. |

---

# Variants

Describe every public visual variant.

## Default

Cuatro tonos públicos mediante modificadores BEM y variable CSS local `--task-accent`. Todas las instancias comparten estilos base de `.ds-task`: fondo con gradiente y `var(--ds-color-surface)`, borde `var(--ds-color-line)`, `border-radius: var(--ds-radius-xs)`, `box-shadow: var(--ds-shadow-sm)`, `min-height: 170px`, `padding: 16px`, acento decorativo en esquina vía `::before` con `background: var(--task-accent)`.

| Tone | Acento (`--task-accent`) | Regla CSS |
|------|--------------------------|-----------|
| `neutral` | No definido | Clase `ds-task--neutral` sin reglas en `styles.css`; acento de estado y barra pueden quedar sin color. |
| `success` | `var(--ds-color-green)` | `.ds-task--success` |
| `warning` | `var(--ds-color-amber)` | `.ds-task--warning` |
| `danger` | `var(--ds-color-danger)` | `.ds-task--danger` |

La barra de progreso (`.ds-task__progress-fill`) usa `width: var(--task-progress, 0%)` con fondo y sombra `var(--task-accent)`. El estado (`.ds-task__status`) usa `color: var(--task-accent)`.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-task` según `tone`. Sin estados `:hover`, `:focus` ni `:disabled` en CSS. |
| With description | Cuando `description` es truthy, se muestra `.ds-task__description`. |
| Without description | Cuando `description` es falsy, el párrafo no se renderiza. |
| With meta | Cuando `meta.length > 0`, se muestra `.ds-task__meta` con un `<span>` por entrada. |
| Without meta | Cuando `meta` está vacío, el bloque de metadatos no se renderiza. |
| Progress | Pie siempre visible: pista `.ds-task__progress-track` (`aria-hidden="true"`) y etiqueta `{clampedProgress}% avance` en `.ds-task__progress-label`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica de `<article>` con `<header>`, `<h3>` y `<footer>` para estructura de la tarjeta.
- El código, estado, título, descripción, metadatos y etiqueta de progreso quedan expuestos como contenido textual.
- La pista de progreso visual lleva `aria-hidden="true"`; el porcentaje se comunica solo mediante el texto visible `{n}% avance`.
- No define `role="progressbar"`, `aria-valuenow`, `aria-valuemin` ni `aria-valuemax` en la barra.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.
- El consumidor puede pasar atributos ARIA adicionales vía `...props` en el `<article>` raíz.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-task__progress-track`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, etc. en el `<article>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo haga mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`TaskCard` no define media queries. Impone `min-height: 170px`; el ancho lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Altura mínima fija; el ancho efectivo depende del grid o flex del padre. |
| Storybook `Tones` | Contenedor padre con `gridTemplateColumns: repeat(2, minmax(260px, 1fr))` y `gap: 14`. |
| `apps/web` `.ops-task-grid` | Grid de 3 columnas en viewport amplio; media queries del consumidor colapsan a 2 columnas (`max-width: 960px`) y 1 columna (`max-width: 640px`). |
| `.ds-task__meta` | `flex-wrap: wrap` permite que chips de metadatos pasen a varias líneas dentro de la tarjeta. |

---

# Composition

## Purpose in Layout

- **Detail** — tarjeta individual de tarea en listas o grids de consola.
- **Summary** — resumen de estado, metadatos y avance sin panel compuesto completo.
- **Container** — estructura fija (encabezado, título, descripción, meta, pie); no admite `children` libres.

## Parent

- `div.ops-task-grid` en `apps/web/src/App.tsx`.
- `div` con CSS Grid en `TaskCard.stories.tsx` → `Tones` y `Components.stories.tsx` → `OperationsConsole`.
- Contenedor centrado de Storybook con `minWidth: 360` en `TaskCard.stories.tsx`.

## Children

- No admite `children`. Solo contenido derivado de `code`, `title`, `status`, `description`, `meta` y `progress`.

## Siblings

- `Badge` — etiqueta de conteo en encabezado de sección (`"5 tareas pendientes"`) adyacente al grid de tareas.
- `Button` — acción `"Ver todas"` en `.ops-section-head` de `apps/web`.
- `Card` — paneles compuestos de misión o pronóstico en la misma vista.
- `MetricCard` — fila de KPIs encima del grid de tareas.
- Otras instancias de `TaskCard` en el mismo grid.

## Alternatives

- `Card` — contenedor genérico con slots libres; requiere componer manualmente equivalente a `TaskCard`.
- `ProgressRing` — indicador circular de avance; no incluye código, estado ni metadatos de tarea.
- `ModuleCard` — navegación por módulo con métricas; no sustituye tarjeta de tarea individual.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Card` | Contenedor compuesto con slots libres; alternativa cuando la estructura fija de `TaskCard` no aplica. |
| `ProgressRing` | Indicador de progreso circular; `TaskCard` usa barra lineal propia, no compone `ProgressRing`. |
| `Badge` | Etiqueta compacta de contexto en encabezados de sección; complemento, sin integración interna. |
| `Button` | Acción adyacente al grid de tareas; `TaskCard` no expone slot de acciones. |
| `MetricCard` | KPI de resumen; hermano habitual encima del grid de tareas. |
| `ModuleCard` | Navegación por módulo; alternativa para entrada a módulo, no listado de tareas. |

---

# Content Guidelines

## Labels

- `code`: identificador operativo (p. ej. `"#1232142342 - 3408473"`). Renderizado en mono mayúsculas vía CSS.
- `title`: nombre breve de la tarea (p. ej. `"Verificar zona costera"`). Mayúsculas vía CSS en `.ds-task__title`.
- `status`: estado legible (p. ej. `"En espera"`, `"Asignada"`, `"Pendiente"`, `"Monitoreo"`). Sin formato automático.

## Values

- `progress`: número 0–100; el componente muestra `{n}% avance` con sufijo fijo en español.
- `meta[]`: strings breves preformateados (p. ej. `"D+02"`, `"Prioridad alta"`). Sin localización ni formato automático.

## Icons

- `TaskCard` no expone prop `icon` ni slot para iconos.

## Localization

- La etiqueta de progreso usa el sufijo fijo `" avance"` en español dentro del componente.
- Las stories y `apps/web` usan español en demás campos; el componente no impone idioma en props de texto.

---

# Examples

## Basic

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  code="#1232142342 - 3408473"
  title="Verificar zona costera"
  description="Cruce de datos satelitales y dependencia policial."
  progress={36}
  tone="danger"
/>
```

## Variant

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  code="#1232142342 - 3408474"
  status="Asignada"
  title="Evacuacion barrio sur"
  description="Despacho de recursos con seguimiento visual en mapa."
  meta={["Lote 1", "2 horas", "5 unidades"]}
  progress={72}
  tone="success"
/>
<TaskCard
  code="#1232142342 - 3408476"
  status="Monitoreo"
  title="Ciberseguridad"
  description="Revision de sesiones y bloqueos sobre el perimetro."
  meta={["Nodo 4", "Red interna", "Bajo"]}
  progress={18}
/>
```

## Composition

```tsx
<div
  style={{
    display: "grid",
    gap: 14,
    gridTemplateColumns: "repeat(2, minmax(260px, 1fr))"
  }}
>
  {tasks.map((task) => (
    <TaskCard key={task.code} {...task} />
  ))}
</div>
```

---

# Reasoning Examples

## User Request

Listar tareas en curso con código, estado, descripción y barra de avance en un grid.

### Recommended Components

- `TaskCard` ×N

### Why

Patrón de `TaskCard.stories.tsx` → `Tones`, `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx` → `.ops-task-grid`.

---

## User Request

Panel de misión con eyebrow, título, cuerpo libre y pie con acciones.

### Recommended Components

- `Card`

### Why

`TaskCard` no admite `children`, `footer` ni slots de acciones; `Card` cubre paneles compuestos.

---

## User Request

Indicador circular de avance del 75% en un panel de mapa.

### Recommended Components

- `ProgressRing`

### Why

`TaskCard` usa barra lineal integrada; `ProgressRing` es un componente separado para progreso circular, usado dentro de `Card` en demos.

---

## User Request

Resaltar tarea crítica con acento rojo en estado y barra de progreso.

### Recommended Components

- `TaskCard` con `tone="danger"`

### Why

`.ds-task--danger` define `--task-accent: var(--ds-color-danger)` para estado, esquina decorativa y barra.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-surface` | color | Fondo de `.ds-task` |
| `--ds-color-line` | color | `border` de `.ds-task` |
| `--ds-radius-xs` | radius | `border-radius` de `.ds-task` |
| `--ds-shadow-sm` | shadow | `box-shadow` de `.ds-task` |
| `--ds-color-ink` | color | `color` base y `.ds-task__code` |
| `--ds-font-mono` | typography | `font-family` de `.ds-task__code`, `.ds-task__meta`, `.ds-task__progress-label` |
| `--ds-font-display` | typography | `font-family` de `.ds-task__title` |
| `--ds-font-body` | typography | `font-family` de `.ds-task__description` |
| `--ds-color-ink-soft` | color | `color` de `.ds-task__description` y `.ds-task__progress-label` |
| `--ds-color-ink-muted` | color | `color` de `.ds-task__meta` |
| `--ds-color-green` | color | `--task-accent` en `.ds-task--success` |
| `--ds-color-amber` | color | `--task-accent` en `.ds-task--warning` |
| `--ds-color-danger` | color | `--task-accent` en `.ds-task--danger` |

Nota: `--task-accent` y `--task-progress` son variables CSS locales (la segunda definida inline por el componente). El gradiente de fondo usa `rgb(255 255 255 / 0.04)` hardcodeado. La pista de progreso usa `rgb(255 255 255 / 0.08)` sin token dedicado. El tono `neutral` no define `--task-accent` en CSS.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/TaskCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-task`, `ds-task--{tone}`, `ds-task__header`, `ds-task__code`, `ds-task__status`, `ds-task__title`, `ds-task__description`, `ds-task__meta`, `ds-task__footer`, `ds-task__progress-track`, `ds-task__progress-fill`, `ds-task__progress-label`)

## DOM Structure

```text
article.ds-task.ds-task--{tone}[style="--task-progress: N%"]
├── header.ds-task__header
│   ├── span.ds-task__code
│   └── span.ds-task__status
├── h3.ds-task__title
├── p.ds-task__description (solo si description es truthy)
├── div.ds-task__meta (solo si meta.length > 0)
│   └── span (× meta.length)
└── footer.ds-task__footer
    ├── span.ds-task__progress-track[aria-hidden="true"]
    │   └── span.ds-task__progress-fill
    └── span.ds-task__progress-label
```

---

# Known Limitations

- `tone="neutral"` aplica `ds-task--neutral` pero no hay regla CSS que defina `--task-accent`; estado, esquina `::before` y barra pueden quedar sin color de acento.
- La etiqueta de progreso usa el sufijo fijo `" avance"` en español; no es configurable.
- La barra de progreso no expone semántica `progressbar` ni `aria-valuenow`.
- El pie de progreso se renderiza siempre, incluso con `progress={0}`.
- `meta` usa `item` como `key`; etiquetas duplicadas generan advertencias de React.
- No expone `children`, acciones, navegación ni estado interactivo.
- Sin tests unitarios ni de integración en el repositorio.
- No compone `ProgressRing` aunque ambos muestran progreso en la consola.

---

# Future Improvements

- [ ] Regla `.ds-task--neutral` con `--task-accent` definido
- [ ] Prop o slot para personalizar la etiqueta de progreso (i18n)
- [ ] `role="progressbar"` con `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] Ocultar pie de progreso cuando `progress` es 0 o añadir prop para ello
- [ ] Clave estable alternativa a `meta` item para listas con etiquetas repetidas
- [ ] Documentación JSDoc en `TaskCard.tsx` según convenciones del repositorio

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `TaskCard`, `TaskCardProps` y `TaskTone` con estilos `ds-task`, barra de progreso vía `--task-progress` y stories en Storybook (`Playground`, `Tones`). Uso en `Components.stories.tsx` y `apps/web/src/App.tsx`. |
