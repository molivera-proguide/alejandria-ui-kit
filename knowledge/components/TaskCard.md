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
  - TaskVariant
  - variant
  - kanban
  - resumen
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-08-04
---

# TaskCard

## Purpose

Presenta una tarea operativa con identificador, estado, título, descripción, metadatos, creador y fechas en consolas del Alejandria UI Kit, alineada con la sección **TARJETAS** del PDF de referencia.

Describe:

- **Responsabilidad principal:** mostrar el resumen de una tarea (identificador, estado, título, contexto) con codificación visual por tono mediante el acento de esquina superior derecha.
- **Problema que resuelve:** unificar la estructura de tarjetas de tarea en grids de consola sin acoplar lógica de negocio, navegación ni acciones embebidas.
- **Alcance:** componente presentacional basado en `<article>` con tres variantes visuales (`default`, `kanban`, `resumen`) definidas en PDF TARJETAS p. 3. **No incluye visualización de progreso.**

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` — sección TARJETAS (p. 3). El PDF es la única fuente de verdad para layout, proporciones y jerarquía visual.

- La variante **Full TaskCard** (`variant="default"`) es la implementación canónica (sección superior del PDF).
- La variante **Kanban TaskCard** (`variant="kanban"`) es una presentación compacta alternativa del mismo componente ("Visualización Kanban" del PDF).
- La variante **Resumen TaskCard** (`variant="resumen"`) es la presentación mínima ("Visualización Resumen" del PDF): solo identificador, estado y título.
- Las nuevas variantes futuras deben heredar el mismo lenguaje visual; solo adaptan layout, no redefinen la identidad del componente.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<article>` con clases `ds-task`, `ds-task--{tone}` y `ds-task--{variant}`.
- Esquina superior derecha con chaflán (`clip-path`) obligatorio en `variant="default"`. Dentro del corte flota un triángulo de color vía `.ds-task::before` (coloreado por `--task-accent`) para `tone="success"|"warning"|"danger"`. **Para `tone="neutral"` el chaflán queda vacío (sin triángulo) — así se ve en la tercera card de ejemplo de PDF TARJETAS p.3, que no tiene ningún dibujo de triángulo.** El chaflán y el acento no se renderizan en absoluto en `variant="kanban"` o `variant="resumen"`.
- `code` y `title` obligatorios en la firma de props; siempre renderizados en el DOM.
- `status` por defecto `"En espera"`; `meta` por defecto `[]`; `progress` por defecto `0`; `tone` por defecto `"neutral"`; `variant` por defecto `"default"`.
- **Variante `default` (canónica):** jerarquía identificador → estado → título → descripción → metadatos → detalles (creador, fechas); `max-width: 170px`; `padding: 7.5px 5px`; `gap: 8px` (display scale; ancho medido contra la coordenada vectorial exacta del PDF, no una captura — antes 120px, nunca medido). El bloque de detalles (`creator`/`startDate`/`endDate`) solo se renderiza en `default`, con un gap mayor respecto a `meta` (`.ds-task__details { margin-top: 10px }`, medido contra el PDF — el salto entre "Causa Corion" y "Dependencia" es ~5.5× el gap normal entre líneas).
- **Variante `kanban`:** layout compacto con proporciones apaisadas; solo muestra título, hasta dos entradas de `meta`, identificador y estado; no renderiza `description`; `max-width: 225px`; `padding: 5px`; `gap: 2.5px` (display; medido contra la coordenada vectorial exacta del PDF TARJETAS p.3 — antes 140px).
- **Variante `resumen`:** layout mínimo; solo identificador, estado y título; no renderiza `description` ni `meta`; `max-width: 225px` (misma clase de ancho que `kanban`); `padding: 5px`; `gap: 2.5px` (display).
- **Sin visualización de progreso:** no se renderiza barra, porcentaje ni espacio reservado para avance.
- Fusión de `className` externa y `style` externo en el `<article>` raíz.
- Repaso de atributos nativos de `HTMLAttributes<HTMLElement>` al `<article>` vía `...props` (`id`, `data-*`, `aria-*`, etc.).

## This component never

- Renderiza barra de progreso, porcentaje de avance ni indicadores de progreso de ningún tipo.
- Obtiene, calcula ni actualiza el progreso de la tarea por sí mismo.
- Compone internamente `ProgressRing`, `Button`, `Badge`, `Card` ni otros componentes del kit.
- Define interactividad, manejadores de clic ni navegación.
- Expone slots `children`, `actions` ni `footer` personalizables.
- Aplica media queries ni breakpoints propios.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `code` y `title` como `string`.
- Consultar `knowledge/references/design-reference.pdf` (TARJETAS) antes de modificar estilos o jerarquía.

## Forbidden

- Inventar props que no existan en `TaskCardProps` (`onClick`, `children`, `icon`, etc.).
- Usar `TaskCard` como contenedor genérico con contenido libre (`Card` cubre ese caso).
- Añadir visualización de progreso, barras, anillos o porcentajes dentro del componente.
- Eliminar o sustituir el acento de esquina superior derecha (`.ds-task::before`).
- Reinterpretar el layout usando patrones visuales de otros componentes (`MetricCard`, `ModuleCard`, etc.).
- Asumir que `progress` produce salida visual (la prop se conserva por compatibilidad de API, pero no se renderiza).
- Confiar en `ProgressRing` dentro de `TaskCard`.
- Usar etiquetas duplicadas en `meta` como `key` sin riesgo de advertencias React (`key={item}`).

## Recommendations

- Agrupar instancias en un grid CSS, como en `TaskCard.stories.tsx` → `Kanban` o `apps/web` (`.ops-task-grid`).
- Usar `variant="default"` para la tarjeta completa canónica y `variant="kanban"` para vistas compactas tipo tablero.
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
| Import | `import { TaskCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  TaskCard,
  type TaskCardProps,
  type TaskTone,
  type TaskVariant
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `TaskCard` — componente funcional.
- `TaskCardProps` — props del componente.
- `TaskTone` — unión de tonos semánticos para la prop `tone`.
- `TaskVariant` — unión de variantes visuales (`"default"` | `"kanban"` | `"resumen"`).

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `code` | `string` | — | sí | Identificador de la tarea. Renderizado en `<span class="ds-task__code">` dentro del encabezado (primer nivel de jerarquía). |
| `title` | `string` | — | sí | Título principal de la tarea. Renderizado en `<h3 class="ds-task__title">`. Montserrat Light 9px display `#8a8b87`, sin mayúsculas (el texto del PDF está en minúsculas/oración, no aplica `text-transform`). |
| `status` | `string` | `"En espera"` | no | Estado operativo. Renderizado en `<span class="ds-task__status">` como bloque independiente bajo el encabezado. Source Code Bold 10px display (PDF 20pt @2×) `#ffffff`, mayúsculas vía CSS (coincide con el texto del PDF, que ya está escrito en mayúsculas). |
| `description` | `string` | — | no | Información secundaria. Renderizada en `<p class="ds-task__description">` solo si es truthy y `variant="default"`. **No corresponde a un campo de la card canónica del PDF** (ver Known Limitations) — es una generalización deliberada de la API, no una omisión. |
| `meta` | `string[]` | `[]` | no | Metadatos adicionales. Cada elemento renderizado como `<span>` en `.ds-task__meta` si el arreglo no está vacío. En la card canónica del PDF corresponde a `Subactividad`/`Causa Corion`; no tiene límite de entradas salvo en `kanban` (máx. 2). |
| `creator` | `string` | — | no | Entidad/dependencia que creó la tarea. Renderizado en `.ds-task__details` solo si `variant="default"`. Corresponde al callout "Creador" de PDF TARJETAS p.3, que señala la línea que en el ejemplo dice literalmente `"Dependencia"`. |
| `startDate` | `string` | — | no | Fecha de inicio, como texto completo ya formateado (p. ej. `"Inicio 21/04/2022"` — el componente no antepone ninguna etiqueta). Renderizado en `.ds-task__details` solo si `variant="default"`. Corresponde al callout "Fecha" de PDF TARJETAS p.3. |
| `endDate` | `string` | — | no | Fecha de vencimiento, mismo formato/comportamiento que `startDate` (p. ej. `"Vencimiento 23/07/2022"`). Renderizado en `.ds-task__details` solo si `variant="default"`. |
| `progress` | `number` | `0` | no | **Legacy — sin salida visual.** Conservada por compatibilidad de API; el componente no renderiza indicadores de avance. |
| `tone` | `TaskTone` | `"neutral"` | no | Tono semántico. Aplica clase `ds-task--{tone}` y define `--task-accent` para el acento de esquina superior derecha. |
| `variant` | `TaskVariant` | `"default"` | no | Variante visual. `"default"` = Full TaskCard canónica; `"kanban"` = presentación compacta PDF; `"resumen"` = presentación mínima PDF. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-task`, el modificador de tono y el modificador de variante en el `<article>` raíz. |
| `style` | `CSSProperties` | — | no | Estilos inline en el `<article>` raíz. |
| `...props` | `HTMLAttributes<HTMLElement>` | — | no | Atributos nativos del `<article>` (`id`, `data-*`, `aria-*`, etc.). |

### TaskTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Valor por defecto. Clase `ds-task--neutral`. **Sin triángulo de acento** — el chaflán queda vacío, coincide con el ejemplo gris de PDF TARJETAS p.3 (que no tiene ningún triángulo dibujado). Antes de 2026-08-04 renderizaba un triángulo gris `#c1c1c1`, que no existe en el PDF. |
| `"success"` | Clase `ds-task--success`. `--task-accent: var(--ds-color-green)`. |
| `"warning"` | Clase `ds-task--warning`. `--task-accent: var(--ds-color-amber)`. |
| `"danger"` | Clase `ds-task--danger`. `--task-accent: var(--ds-color-danger)`. |

---

# Variants

El PDF TARJETAS (p. 3) define tres presentaciones del mismo componente. Las tres comparten tipografía, colores, tokens y ausencia de progreso. El chaflán y el acento de esquina aplican solo a `default`. Las variantes **solo adaptan layout y densidad informativa**.

## Default (`variant="default"`) — canónica

Implementación de referencia. Corresponde a la sección superior del PDF.

| Aspecto | Especificación |
|---------|----------------|
| Jerarquía | Identificador → estado → título → descripción → metadatos → detalles (creador, fechas) |
| Proporciones | `max-width: 170px`, `width: fit-content`, gap display `8px` |
| Padding | `7.5px 5px` display (PDF 15/10 @2×) |
| Contenido | Renderiza `description`, todas las entradas de `meta`, y `creator`/`startDate`/`endDate` cuando están presentes — es la única variante que renderiza estos tres |
| Acento | `.ds-task::before` obligatorio en `default` para `tone` `success`/`warning`/`danger`; sin triángulo (solo chaflán vacío) en `neutral` |

## Kanban (`variant="kanban"`) — compacta

Presentación alternativa compacta. Corresponde a "Visualización Kanban" del PDF.

| Aspecto | Especificación |
|---------|----------------|
| Jerarquía | Título → metadatos (máx. 2) → identificador → estado |
| Proporciones | `max-width: 225px` display, densidad reducida (`gap: 2.5px`), layout apaisado |
| Padding | `5px` display |
| Contenido | Solo título, primeras dos entradas de `meta`, `code` y `status`; **no** renderiza `description` |
| Acento | Sin acento de esquina ni chaflán (PDF Kanban) |

## Resumen (`variant="resumen"`) — mínima

Presentación más reducida. Corresponde a "Visualización Resumen" del PDF; comparte la clase de ancho de `kanban`.

| Aspecto | Especificación |
|---------|----------------|
| Jerarquía | Identificador → estado → título |
| Proporciones | `max-width: 225px` display (misma clase de ancho que `kanban`), `gap: 2.5px` |
| Padding | `5px` display |
| Contenido | Solo `code`, `status` y `title`; **no** renderiza `description` ni `meta`, aunque se provean |
| Acento | Sin acento de esquina ni chaflán (PDF Resumen) |

## Tonos (`tone`)

Cuatro tonos públicos mediante modificadores BEM y variable CSS local `--task-accent`.

**Chaflán + acento de esquina obligatorios en `default`:** la esquina superior derecha tiene un corte diagonal (`clip-path`, chaflán 31px display, en `.ds-task--default::after`) y `.ds-task::before` renderiza un triángulo de color (`24×24px` display) que flota *dentro* de ese corte con un pequeño gap respecto al borde del chaflán — no queda pegado al borde de la tarjeta. Es un elemento de identidad visual del PDF (TARJETAS p. 3, "Indicador de estado") y no debe eliminarse ni volver a implementarse como triángulo pegado sin chaflán. El chaflán vive en `.ds-task--default::after` (no en `.ds-task--default` directamente) precisamente para que su `clip-path` no recorte también a `.ds-task::before` — `clip-path` en un elemento recorta todo su subárbol de renderizado, pseudo-elementos incluidos.

| Tone | Acento (`--task-accent`) | Regla CSS |
|------|--------------------------|-----------|
| `neutral` | ninguno — `.ds-task--neutral::before` oculta el triángulo | `.ds-task--neutral` |
| `success` | `var(--ds-color-green)` | `.ds-task--success` |
| `warning` | `var(--ds-color-amber)` | `.ds-task--warning` |
| `danger` | `var(--ds-color-danger)` | `.ds-task--danger` |

El tono codifica el estado semántico únicamente mediante el color del acento de esquina. El texto de `status` permanece `#ffffff` según PDF TARJETAS.

**Sin progreso:** `TaskCard` no incluye barra de progreso, porcentaje ni espacio reservado para avance.

---

# States

| State | Description |
|--------|-------------|
| Default variant | `variant="default"`. Tarjeta completa canónica. |
| Kanban variant | `variant="kanban"`. Tarjeta compacta; omite `description` y limita `meta` a dos entradas. |
| Resumen variant | `variant="resumen"`. Tarjeta mínima; omite `description` y `meta` por completo. |
| With description | Solo en `variant="default"`. Cuando `description` es truthy, se muestra `.ds-task__description`. |
| Without description | En `default`, el párrafo no se renderiza si es falsy. En `kanban` y `resumen`, nunca se renderiza. |
| With meta | Cuando `meta.length > 0`, se muestra `.ds-task__meta` en `default`/`kanban`. En `kanban`, máximo dos `<span>`. En `resumen`, nunca se renderiza aunque `meta` tenga entradas. |
| Without meta | Cuando `meta` está vacío, el bloque de metadatos no se renderiza. |
| With details | Solo en `variant="default"`. Cuando al menos una de `creator`/`startDate`/`endDate` es truthy, se muestra `.ds-task__details` con las que estén presentes (cada una es independiente; no hace falta proveer las tres). |
| Without details | Cuando ninguna de las tres está presente, o en `kanban`/`resumen` (se ignoran aunque se provean), el bloque no se renderiza. |

---

# Layout (PDF TARJETAS)

## Full TaskCard — `variant="default"`

Jerarquía canónica, de arriba a abajo:

| Nivel | Elemento DOM | Prop |
|-------|--------------|------|
| 1 | `header.ds-task__header` → `.ds-task__code` | `code` |
| 2 | `span.ds-task__status` | `status` |
| 3 | `h3.ds-task__title` | `title` |
| 4 | `p.ds-task__description` | `description` (opcional) |
| 5 | `div.ds-task__meta` | `meta` (opcional) |
| 6 | `div.ds-task__details` | `creator`, `startDate`, `endDate` (opcionales, independientes entre sí) |

## Kanban TaskCard — `variant="kanban"`

Jerarquía compacta PDF, de arriba a abajo (coincide con el orden real del DOM en `TaskCard.tsx`):

| Nivel | Elemento DOM | Prop |
|-------|--------------|------|
| 1 | `header.ds-task__header` → `.ds-task__code` | `code` |
| 2 | `span.ds-task__status` | `status` |
| 3 | `h3.ds-task__title` | `title` |
| 4 | `div.ds-task__meta` (máx. 2 `<span>`) | `meta` (opcional) |

## Resumen TaskCard — `variant="resumen"`

Jerarquía mínima PDF, de arriba a abajo:

| Nivel | Elemento DOM | Prop |
|-------|--------------|------|
| 1 | `header.ds-task__header` → `.ds-task__code` | `code` |
| 2 | `span.ds-task__status` | `status` |
| 3 | `h3.ds-task__title` | `title` |

El chaflán de esquina y el acento de color (`.ds-task::before`) aplican solo a `variant="default"` y no forman parte del flujo de contenido.

No se incluye acción embebida ni visualización de progreso. Las acciones pertenecen a componentes hermanos (`Button`) en el patrón Task Board.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica de `<article>` con `<header>` y `<h3>` para estructura de la tarjeta.
- El código, estado, título, descripción y metadatos quedan expuestos como contenido textual.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.
- El consumidor puede pasar atributos ARIA adicionales vía `...props` en el `<article>` raíz.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, etc. en el `<article>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo haga mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`TaskCard` no define media queries. La altura la define el contenido; el ancho lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Altura por contenido; el ancho efectivo depende del grid o flex del padre. |
| Storybook `Tones` | Contenedor padre con `gridTemplateColumns: repeat(2, minmax(260px, 1fr))` y `gap: 14`. |
| `apps/web` `.ops-task-grid` | Grid de 3 columnas en viewport amplio; media queries del consumidor colapsan a 2 columnas (`max-width: 960px`) y 1 columna (`max-width: 640px`). |
| `.ds-task__meta` | `flex-wrap: wrap` permite que chips de metadatos pasen a varias líneas dentro de la tarjeta. |

---

# Composition

## Purpose in Layout

- **Detail** — tarjeta individual de tarea en listas o grids de consola.
- **Summary** — resumen de estado y contexto sin panel compuesto completo.
- **Container** — estructura fija (identificador, estado, título, descripción, meta); no admite `children` libres.

## Parent

- `div.ops-task-grid` en `apps/web/src/App.tsx`.
- `div` con CSS Grid en `TaskCard.stories.tsx` → `Tones` y `Components.stories.tsx` → `OperationsConsole`.
- Contenedor centrado de Storybook con `minWidth: 360` en `TaskCard.stories.tsx`.

## Children

- No admite `children`. Solo contenido derivado de `code`, `title`, `status`, `description`, `meta`, `creator`, `startDate` y `endDate`.

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
| `ProgressRing` | Indicador de progreso circular; `TaskCard` no incluye progreso; usar `ProgressRing` en paneles compuestos (`Card`). |
| `Badge` | Etiqueta compacta de contexto en encabezados de sección; complemento, sin integración interna. |
| `Button` | Acción adyacente al grid de tareas; `TaskCard` no expone slot de acciones. |
| `MetricCard` | KPI de resumen; hermano habitual encima del grid de tareas. |
| `ModuleCard` | Navegación por módulo; alternativa para entrada a módulo, no listado de tareas. |

---

# Content Guidelines

## Labels

- `code`: identificador operativo (p. ej. `"#1232142342 - 3408473"`). Renderizado en mono mayúsculas vía CSS.
- `title`: nombre breve de la tarea (p. ej. `"Verificar zona costera"`). **Sin mayúsculas automáticas** — el PDF lo muestra en oración/minúsculas.
- `status`: estado legible (p. ej. `"En espera"`, `"Asignada"`, `"Pendiente"`, `"Monitoreo"`). Mayúsculas vía CSS (el PDF ya lo muestra en mayúsculas).

## Values

- `meta[]`: strings breves preformateados (p. ej. `"D+02"`, `"Prioridad alta"`). Sin localización ni formato automático — **sin mayúsculas automáticas** desde 2026-08-04 (el PDF muestra estas líneas en oración/minúsculas, mismo rol tipográfico que `title`).
- `creator`: nombre de la entidad/dependencia (p. ej. `"Dependencia 4"`). Texto libre, sin formato automático.
- `startDate` / `endDate`: texto ya formateado por el consumidor, incluyendo la etiqueta (p. ej. `"Inicio 21/04/2022"`, `"Vencimiento 23/07/2022"`) — el componente no antepone "Inicio"/"Vencimiento" automáticamente, a diferencia de lo que su nombre podría sugerir.

## Icons

- `TaskCard` no expone prop `icon` ni slot para iconos.

## Localization

- Las stories y `apps/web` usan español en demás campos; el componente no impone idioma en props de texto.

---

# Examples

## Basic (default)

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  code="#1232142342 - 3408473"
  status="En espera"
  title="Tareas investigativas"
  meta={["Subactividad", "Causa Corion"]}
  creator="Dependencia"
  startDate="Inicio 21/04/2022"
  endDate="Vencimiento 23/07/2022"
  tone="danger"
/>
```

## With description

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  code="#1232142342 - 3408473"
  status="En espera"
  title="Tareas investigativas"
  description="Cruce de datos satelitales y dependencia policial."
  meta={["Subactividad", "Causa Corion"]}
  tone="danger"
/>
```

## Kanban

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  variant="kanban"
  code="#1232142342 - 3408473"
  status="En espera"
  title="Tareas investigativas"
  meta={["Subactividad", "Causa Corion"]}
  tone="danger"
/>
```

## Variant (tones)

```tsx
import { TaskCard } from "@alejandria/ui-kit";

<TaskCard
  code="#1232142342 - 3408474"
  status="Asignada"
  title="Evacuacion barrio sur"
  description="Despacho de recursos con seguimiento visual en mapa."
  meta={["Lote 1", "2 horas", "5 unidades"]}
  tone="success"
/>
<TaskCard
  code="#1232142342 - 3408476"
  status="Monitoreo"
  title="Ciberseguridad"
  description="Revision de sesiones y bloqueos sobre el perimetro."
  meta={["Nodo 4", "Red interna", "Bajo"]}
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

Listar tareas en curso con código, estado y descripción en un grid.

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

`TaskCard` no incluye progreso; `ProgressRing` es un componente separado para progreso circular, usado dentro de `Card` en demos.

---

## User Request

Resaltar tarea crítica con acento de esquina rojo.

### Recommended Components

- `TaskCard` con `tone="danger"`

### Why

`.ds-task--danger` define `--task-accent: var(--ds-color-danger)` para el acento de esquina superior derecha.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `#2a2927` | color | Fondo de `.ds-task` (PDF TARJETAS) |
| `#c1c1c1` | color | `border` de `.ds-task`; `--task-accent` en tono `neutral` |
| `#ffffff` | color | `.ds-task__code`, `.ds-task__title`, `.ds-task__status` |
| `#8a8b87` | color | `.ds-task__description`, `.ds-task__meta` |
| `--ds-radius-xs` | radius | `border-radius` de `.ds-task` |
| `--ds-font-mono` | typography | `.ds-task__code`, `.ds-task__status` |
| `--ds-font-body` | typography | `.ds-task__title`, `.ds-task__description`, `.ds-task__meta` (family corrected 2026-08-04, was `--ds-font-mono`) |
| `--ds-color-green` | color | `--task-accent` en `.ds-task--success` |
| `--ds-color-amber` | color | `--task-accent` en `.ds-task--warning` |
| `--ds-color-danger` | color | `--task-accent` en `.ds-task--danger` |

Nota: `--task-accent` alimenta `.ds-task::before` solo en `variant="default"` y solo para `tone` `success`/`warning`/`danger` (`neutral` no renderiza triángulo). Tipografía confirmada contra los text-spans reales del PDF (2026-08-04): identificador 10px/700; estado 10px/700; título 9px/300 sin mayúsculas; meta 9px/300 sin mayúsculas (mismo rol "Párrafo" que título — antes usaba fuente mono y mayúsculas, ambos incorrectos); `creator`/`startDate`/`endDate` (`.ds-task__details`) mismo rol "Párrafo" que meta/título — 9px/300 sin mayúsculas, con `margin-top: 10px` extra para el gap de grupo medido contra el PDF; descripción 8px/300 (campo sin equivalente directo en el PDF, ver Known Limitations). `gap: 8px` en default.

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
packages/ui/src/components/TaskCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-task`, `ds-task::before`, `ds-task--{tone}`, `ds-task--{variant}`, `ds-task--default::after` (fondo/borde/chaflán del corte, capa separada de `::before`), `ds-task__header`, `ds-task__code`, `ds-task__status`, `ds-task__title`, `ds-task__description`, `ds-task__meta`, `ds-task__details`)

## DOM Structure

### `variant="default"`

```text
article.ds-task.ds-task--{tone}.ds-task--default
├── ::after (fondo + borde + chaflán de esquina, z-index: -1 — capa separada del acento)
├── ::before (acento de esquina superior derecha, flota sobre el chaflán de ::after)
├── header.ds-task__header
│   └── span.ds-task__code
├── span.ds-task__status
├── h3.ds-task__title
├── p.ds-task__description (solo si description es truthy)
├── div.ds-task__meta (solo si meta.length > 0)
│   └── span (× meta.length)
└── div.ds-task__details (solo si creator/startDate/endDate — al menos una truthy)
    ├── span (creator, solo si truthy)
    ├── span (startDate, solo si truthy)
    └── span (endDate, solo si truthy)
```

### `variant="kanban"`

```text
article.ds-task.ds-task--{tone}.ds-task--kanban
├── header.ds-task__header
│   └── span.ds-task__code
├── span.ds-task__status
├── h3.ds-task__title
└── div.ds-task__meta (solo si meta.length > 0; máx. 2 span)
```

### `variant="resumen"`

```text
article.ds-task.ds-task--{tone}.ds-task--resumen
├── header.ds-task__header
│   └── span.ds-task__code
├── span.ds-task__status
└── h3.ds-task__title
```

---

# Known Limitations

- `progress` permanece en la API por compatibilidad pero no produce salida visual.
- `meta` usa `item` como `key`; etiquetas duplicadas generan advertencias de React.
- No expone `children`, acciones embebidas, navegación ni estado interactivo.
- No hay estado visual `selected` (`#060606` del PDF); requeriría API adicional.
- **`description` no tiene un campo equivalente en la card canónica del PDF.** Extrayendo los text-spans reales (PyMuPDF, 2026-08-04), el contenido pasa directo de título/estado a `Subactividad` — no hay párrafo intermedio en la card. El texto usado originalmente como `description` en las stories era en realidad una leyenda de diseño de otra parte de la página TARJETAS, no contenido de la card (ya corregido en las stories — ver `WithDescription`). **Decisión confirmada 2026-08-04: se mantiene como generalización deliberada de la API**, no como error a corregir; los consumidores que necesiten un resumen adicional pueden usarla aunque el PDF no la muestre.
- Sin tests unitarios ni de integración en el repositorio.

---

# Future Improvements

- [ ] Deprecar y eliminar la prop `progress` en una versión mayor.
- [ ] Clave estable alternativa a `meta` item para listas con etiquetas repetidas.
- [ ] Estado visual `selected` alineado con PDF (`#060606`) vía prop o atributo de datos.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `TaskCard`, `TaskCardProps` y `TaskTone` con estilos `ds-task`, barra de progreso vía `--task-progress` y stories en Storybook (`Playground`, `Tones`). Uso en `Components.stories.tsx` y `apps/web/src/App.tsx`. |
| 0.1.0 | Refinamiento visual Phase 1 (PDF TARJETAS): fondo `#2a2927`, borde `#c1c1c1`, tipografía PDF, Storybook con canvas oscuro; JSDoc en fuente. |
| 0.1.0 | Corrección PDF: eliminada visualización de progreso; restaurado acento de esquina obligatorio; jerarquía identificador → estado → título → descripción → meta; `progress` legacy sin salida visual. |
| 0.1.0 | Variantes `default` (Full TaskCard canónica) y `kanban` (compacta PDF); stories `Default` y `Kanban`; proporciones `max-width` y layout por variante. |
| 0.1.0 | Pasada de fidelidad visual contra PDF TARJETAS p. 3, primer intento (medición pixel-level sobre captura): chaflán real (`clip-path`) en `default`, `kanban` `max-width` 140px→159px, nueva variante `resumen`, DOM de `kanban` documentado correctamente (`code → status → title → meta`). |
| 0.1.0 | Pasada de fidelidad visual, corrección same-day: el `clip-path` del chaflán vivía en `.ds-task--default` junto con `::before`, y `clip-path` recorta todo el subárbol de un elemento — el acento nunca se veía. Movido el fondo/borde/chaflán a `.ds-task--default::after` (capa separada, `z-index:-1`) para que `::before` no quede recortado. Re-medidos chaflán/acento/anchos contra las coordenadas vectoriales exactas del PDF (PyMuPDF, no una captura): chaflán 31px, acento 24×24px, `default` `max-width` 120px→170px (nunca medido antes), `kanban`/`resumen` `max-width` →225px. La regla de calibración ÷2 (`specs/README.md`) sigue vigente; lo que cambió es la fuente del número en pt, no la regla. |
| 0.1.0 | Pasada de fidelidad visual, tercera corrección same-day (feedback de usuario: card muy baja, `neutral` con punta gris incorrecta): extraídos los text-spans reales del PDF (fuente, tamaño, color exactos por PyMuPDF) en vez de asumir la taxonomía tipográfica. Corregido `.ds-task__code` (7px/400/line-height literal `0.2` → 10px/700/`--ds-leading-body`; el `0.2` era un valor atípico frente a todo el resto del archivo y aplastaba la caja de línea — causa principal de "necesita ser más alto"), `.ds-task__status` (mismo fix de line-height, 9px→10px), `.ds-task__title` (8px→9px, quitado `text-transform: uppercase` — el PDF no lo tiene en mayúsculas), `.ds-task__meta` (fuente mono→`--ds-font-body`, 7px→9px, quitado uppercase — mismo rol "Párrafo" que título). `tone="neutral"` deja de renderizar el triángulo de acento (antes gris `#c1c1c1`): la tercera card de ejemplo del PDF no tiene ningún triángulo dibujado, solo el chaflán vacío. Detectado (no resuelto en este paso): `description` no corresponde a ningún campo real de la card en el PDF; el agrupamiento visual del bloque `meta` (gap mayor entre Causa Corion→Dependencia) tampoco se reproducía. |
| 0.1.0 | Pasada de fidelidad visual, cuarta corrección same-day (a pedido de usuario: mantener `description` y modelar los campos que señalan los callouts "Creador"/"Fecha" del PDF con props tipadas, no como strings sueltos en `meta`). Agregadas `creator`, `startDate`, `endDate` a `TaskCardProps`, renderizadas en un nuevo `div.ds-task__details` — solo en `variant="default"`, con `margin-top: 10px` que reproduce el gap de grupo medido en el PDF entre `meta` y este bloque (antes no reproducido, ver limitación cerrada arriba). Corregido un bug real detectado en el camino: `description` se filtraba a `variant="kanban"` si el consumidor la pasaba, contradiciendo el contrato documentado ("`kanban` no renderiza `description`") — ahora gateado a `variant === "default"` explícitamente. Actualizadas las stories: `canonicalTask` ya no incluye `description` (no es contenido real de la card canónica) ni los cinco `meta` originales (los tres últimos ahora son `creator`/`startDate`/`endDate`); nueva story `WithDescription` para no perder cobertura de ese campo. `description` queda confirmada como generalización deliberada de la API (ver Known Limitations), no como pendiente de eliminar. |
