---
id: module-card
name: ModuleCard
category: navigation
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/ModuleCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ModuleCard

aliases:
  - tarjeta de módulo
  - module tile
  - tarjeta navegable
keywords:
  - ModuleCard
  - módulo
  - navegación
  - dashboard
  - operaciones
  - investigaciones
  - ciberseguridad
  - evidencias
  - métricas
  - KPI
  - grid de módulos
tags:
  - navigation
  - cards
  - interactive
  - molecule

last_reviewed: 2026-07-02
---

# ModuleCard

## Purpose

Presenta un módulo operativo navegable con icono identificador, título y métricas resumidas en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** ofrecer un punto de entrada interactivo a un módulo (investigaciones, ciberseguridad, evidencias, etc.) mostrando indicadores clave embebidos en la tarjeta.
- **Problema que resuelve:** unificar identidad visual del módulo, resumen numérico y acción de navegación en un único control clicable, sin depender de `Button` ni `Card` compuestos manualmente.
- **Alcance:** componente interactivo basado en `<button>`; el consumidor provee icono, título, lista de métricas y maneja `onClick` o navegación externa.

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<button type="button">` con clase `ds-module-card` por defecto.
- `title`, `icon` y `metrics` obligatorios en la firma de props.
- Cada entrada de `metrics` renderizada como fila con etiqueta (`metric.label`) y valor (`metric.value`).
- El contenedor del icono lleva `aria-hidden="true"`.
- Fusión de `className` externa con `ds-module-card` mediante `cn()`.
- Repaso de atributos nativos de `ButtonHTMLAttributes<HTMLButtonElement>` al botón raíz vía `...props` (`disabled`, `aria-label`, `id`, `data-*`, etc.).
- Estilos de hover y `:focus-visible` definidos en `.ds-module-card:hover` y `.ds-module-card:focus-visible`.

## This component never

- Obtiene, calcula ni formatea datos de métricas.
- Expone variantes visuales, tonos ni props de layout.
- Renderiza `children` ni slots adicionales.
- Compone internamente `Button`, `Card`, `MetricCard` ni otros componentes del kit.
- Define roles ARIA personalizados ni etiquetas accesibles automáticas.
- Implementa estados `loading` ni estilos propios para `:disabled`.
- Aplica media queries ni breakpoints propios.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title` como `string`, `icon` como `ReactNode` y `metrics` como arreglo de `{ label: string; value: string | number }`.
- Usar etiquetas (`label`) únicas dentro de cada instancia para evitar claves React duplicadas (`key={metric.label}`).

## Forbidden

- Inventar props que no existan en `ModuleCardProps` (`variant`, `tone`, `children`, `footer`, etc.).
- Asumir variantes visuales o estilos por tono de métrica.
- Anidar otro `ModuleCard` o `Button` dentro del icono o métricas (no hay slots).
- Confiar en que el componente navegue por sí solo; requiere `onClick` o lógica del consumidor.
- Asumir formato automático de `value` numérico (se renderiza tal cual en el DOM).

## Recommendations

- Proporcionar `onClick` cuando la tarjeta deba navegar o ejecutar una acción.
- Agrupar instancias en un contenedor con grid CSS, como en la story `GridExample` (`repeat(auto-fit, minmax(240px, 1fr))`).
- Pasar `aria-label` explícito si el título visible no describe suficientemente la acción del botón.
- Usar iconos de módulo de `packages/ui/src/Icons` (180×180 px) como en las stories de Storybook.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/ModuleCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  ModuleCard,
  type ModuleCardProps,
  type ModuleMetric
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `ModuleCard` — componente funcional.
- `ModuleCardProps` — props del componente.
- `ModuleMetric` — forma de cada entrada en `metrics`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título del módulo. Renderizado en `<span class="ds-module-card__title">`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `icon` | `ReactNode` | — | sí | Contenido del icono del módulo. Renderizado dentro de `<div class="ds-module-card__icon" aria-hidden="true">`. |
| `metrics` | `ModuleMetric[]` | — | sí | Lista de métricas resumidas. Cada elemento renderiza etiqueta y valor en `.ds-module-card__metric`. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-module-card` en el `<button>` raíz. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | no | Manejador de clic del botón raíz. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | no | Atributo `type` del elemento `<button>`. |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | no | Atributos nativos del botón (`disabled`, `aria-label`, `id`, `name`, `form`, `data-*`, etc.). |

### ModuleMetric

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Etiqueta de la métrica. Usada como `key` en el mapeo y renderizada en `.ds-module-card__metric-label`. |
| `value` | `string \| number` | sí | Valor de la métrica. Renderizado en `.ds-module-card__metric-value` sin formato adicional. |

---

# Variants

No existen variantes públicas. El componente aplica una única apariencia mediante la clase `ds-module-card` y sus elementos internos.

## Default

Única variante visual implementada. Fondo oscuro (`#060606`), borde gris, icono centrado, título en mono mayúsculas, divisor horizontal y filas de métricas con etiqueta a la izquierda y valor a la derecha.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-module-card`. `min-width: 260px`, `min-height: 260px`, borde `#c1c1c1`. |
| Hover | Borde `var(--ds-color-teal)`, sombra `0 16px 42px rgb(0 0 0 / 0.22)`, `transform: translateY(-2px)`. |
| Focus-visible | `outline: none`, anillo de enfoque `box-shadow: 0 0 0 3px rgb(108 224 199 / 0.24)`. |
| Disabled | Atributo `disabled` nativo del `<button>` vía `...props`. Sin reglas CSS específicas en `.ds-module-card:disabled`. |

---

# Accessibility

Describe solo el comportamiento accesible implementado por el componente.

## Requirements

- Usa semántica nativa de `<button>`; el contenido textual interno (título y métricas) forma parte del nombre accesible del control.
- El contenedor del icono está marcado `aria-hidden="true"`; el icono no se expone a tecnologías asistivas desde el componente.
- El consumidor es responsable de proveer nombre accesible suficiente (`aria-label`) y de la accesibilidad del `ReactNode` pasado en `icon` si se retira `aria-hidden` externamente (no soportado por la API).
- El consumidor es responsable de manejar `disabled` y feedback de acción.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-module-card__icon`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, etc. en el `<button>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Activa el botón (comportamiento nativo). |
| `Space` | Activa el botón (comportamiento nativo). |
| `Tab` | Mueve el foco al/desde el botón (comportamiento nativo). |

---

# Responsive Behavior

Documenta solo el comportamiento responsivo implementado por el componente mismo.

`ModuleCard` no define media queries. Impone `min-width: 260px` y `min-height: 260px` en `.ds-module-card`.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Tamaño mínimo fijo; el ancho efectivo lo define el contenedor padre. |
| Storybook `GridExample` | Contenedor padre con `gridTemplateColumns: repeat(auto-fit, minmax(240px, 1fr))` y `gap: 20`; el colapso responsivo depende del grid del padre, no del componente. |
| Icono `<img>` | `.ds-module-card__icon img` fija `height` y `width` a 110px con `object-fit: contain`. |

---

# Composition

## Purpose in Layout

- **Navigation** — punto de entrada clicable a un módulo operativo.
- **Summary** — muestra métricas resumidas del módulo antes de navegar al detalle.
- **Container** — agrupa icono, título y KPIs en una tarjeta unificada (estructura fija, sin slots libres).

## Parent

- `div` con CSS Grid para selección de módulos (story `GridExample`).
- Contenedor centrado de Storybook (`layout: "centered"`).
- Sección de consola o dashboard donde el consumidor dispone las tarjetas en filas o grids.

## Children

- No admite `children`. Solo contenido derivado de `icon`, `title` y `metrics`.

## Siblings

- Otras instancias de `ModuleCard` en el mismo grid de módulos.
- `MetricCard` — KPIs independientes en filas de resumen sin navegación por módulo.
- `Card` — paneles de detalle compuesto adyacentes al grid de módulos.
- `Button` — acciones discretas en encabezados o footers, no sustituto de la tarjeta de módulo.

## Alternatives

- `Button` — acciones puntuales sin icono grande ni métricas embebidas.
- `MetricCard` — indicador KPI de solo lectura sin interacción de navegación.
- `Card` — contenedor genérico con slots libres para detalle, no navegación estructurada por módulo.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `MetricCard` | Alternativa de solo lectura para KPIs puntuales; `ModuleCard` embebe métricas similares pero en tarjeta navegable. |
| `Card` | Contenedor de detalle compuesto; no reemplaza la navegación por módulo de `ModuleCard`. |
| `Button` | Acción discreta; `ModuleCard` es un `<button>` con estilos propios (`ds-module-card`), no compone `Button`. |
| `TaskCard` | Tarjeta de tarea con estructura fija; hermano potencial en dashboards, sin composición interna. |
| `Badge` | Complemento de estado en otros contextos; no usado por `ModuleCard`. |

---

# Content Guidelines

## Labels

- `title`: nombre corto del módulo en mayúsculas (p. ej. `"INVESTIGACIONES"`, `"CIBERSEGURIDAD"`). El CSS aplica `text-transform: uppercase`; no es obligatorio escribir en mayúsculas en la prop.
- `metrics[].label`: descriptor breve de la métrica (p. ej. `"Casos abiertos"`, `"Alertas"`, `"Incidentes"`). Renderizado en mono mayúsculas vía CSS.

## Values

- `metrics[].value`: número o string preformateado por el consumidor (p. ej. `15`, `"154"`). Sin localización, unidades ni formato automático.

## Icons

- Demos de Storybook usan `<img src={Icons.*Icon} alt="..." />` importados desde `../Icons` (SVG de módulo 180×180 px). El CSS escala imágenes dentro del icono a 110×110 px.
- Cualquier `ReactNode` es válido en `icon`; el contenedor reserva `min-height: 140px` centrado.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `title` y `metrics`.

---

# Examples

## Basic

```tsx
import { ModuleCard } from "@alejandria/ui-kit";

<ModuleCard
  title="INVESTIGACIONES"
  icon={<img src="/path/to/investigaciones.svg" alt="Investigaciones" />}
  metrics={[
    { label: "Casos abiertos", value: 15 },
    { label: "Alertas", value: 4 }
  ]}
  onClick={() => {/* navegar al módulo */}}
/>
```

## Variant

No existen variantes públicas. Todas las instancias usan la apariencia por defecto de `ds-module-card`.

```tsx
<ModuleCard
  title="CIBERSEGURIDAD"
  icon={<img src="/path/to/ciberseguridad.svg" alt="Ciberseguridad" />}
  metrics={[
    { label: "Incidentes", value: 12 },
    { label: "Críticos", value: 2 }
  ]}
/>
```

## Composition

```tsx
<div
  style={{
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    width: "100%"
  }}
>
  <ModuleCard
    title="INVESTIGACIONES"
    icon={<img src="/path/to/investigaciones.svg" alt="Investigaciones" />}
    metrics={[{ label: "Casos abiertos", value: 15 }, { label: "Alertas", value: 4 }]}
  />
  <ModuleCard
    title="EVIDENCIAS"
    icon={<img src="/path/to/evidencias.svg" alt="Evidencias" />}
    metrics={[{ label: "Archivos", value: 154 }, { label: "Pendientes", value: 8 }]}
  />
  <ModuleCard
    title="GÉNERO"
    icon={<img src="/path/to/genero.svg" alt="Género" />}
    metrics={[{ label: "Casos", value: 42 }, { label: "Seguimientos", value: 9 }]}
  />
</div>
```

---

# Reasoning Examples

## User Request

Mostrar un grid de módulos operativos (investigaciones, ciberseguridad, evidencias) con métricas resumidas y navegación al hacer clic.

### Recommended Components

- `ModuleCard` ×N

### Why

`ModuleCard` combina icono, título y métricas en un `<button>` navegable. El patrón coincide con `GridExample` en `ModuleCard.stories.tsx`.

---

## User Request

Mostrar KPIs de riesgo y alertas en una fila superior del dashboard sin navegación por módulo.

### Recommended Components

- `MetricCard`

### Why

`MetricCard` es presentacional y de solo lectura. `ModuleCard` es interactivo y está pensado para entrada a módulos, no para filas de resumen sin acción de navegación.

---

## User Request

Añadir un pie con botones secundarios debajo de las métricas del módulo.

### Recommended Components

- Ninguno dentro de `ModuleCard`

### Why

`ModuleCard` no expone slot `footer`, `children` ni composición con `Button`. Usar `Card` para paneles con acciones o extender el componente.

---

## User Request

Colorear la métrica "Críticos" en rojo cuando supera un umbral.

### Recommended Components

- `ModuleCard` (sin estilos condicionales en la API actual)

### Why

No existe prop de tono ni variantes por métrica. El valor se renderiza en `.ds-module-card__metric-value` con color `#ffffff` fijo. La diferenciación visual requeriría cambios en el componente o CSS externo no soportado por la API.

---

# Design Tokens

Solo incluye tokens consumidos directamente por el componente.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-radius-xs` | radius | `border-radius` de `.ds-module-card` |
| `--ds-color-ink` | color | `color` base de `.ds-module-card` |
| `--ds-color-teal` | color | `border-color` en `.ds-module-card:hover` |
| `--ds-font-mono` | typography | `font-family` de `.ds-module-card__title` y `.ds-module-card__metric-label` |
| `--ds-font-display` | typography | `font-family` de `.ds-module-card__metric-value` |

Nota: la mayoría de colores del componente están hardcodeados (`#060606`, `#c1c1c1`, `#8a8b87`, `#ffffff`) y no usan tokens del sistema. El anillo de foco usa `rgb(108 224 199 / 0.24)` inline, equivalente a `--ds-focus-ring`, pero no referencia la variable CSS.

---

# Implementation Notes

Esta sección está dirigida a quienes extienden el componente.

Leer después de:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/ModuleCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-module-card`, `ds-module-card__icon`, `ds-module-card__headline`, `ds-module-card__title`, `ds-module-card__divider`, `ds-module-card__metrics`, `ds-module-card__metric`, `ds-module-card__metric-label`, `ds-module-card__metric-value`)

## DOM Structure

```text
button.ds-module-card
├── div.ds-module-card__icon[aria-hidden="true"]
│   └── {icon}
├── div.ds-module-card__headline
│   └── span.ds-module-card__title
├── hr.ds-module-card__divider
└── div.ds-module-card__metrics
    └── div.ds-module-card__metric (× metrics.length)
        ├── span.ds-module-card__metric-label
        └── span.ds-module-card__metric-value
```

---

# Known Limitations

- No expone variantes, tonos ni props de tamaño.
- No admite `children`, slots de acciones ni pie de tarjeta.
- No formatea ni localiza valores numéricos.
- `metrics` usa `metric.label` como `key`; etiquetas duplicadas generan advertencias de React.
- El contenedor del icono fuerza `aria-hidden="true"`, ocultando el icono (y su `alt` si es `<img>`) para lectores de pantalla.
- Sin estilos CSS para `:disabled`; el estado deshabilitado depende del comportamiento nativo del navegador.
- Sin estado `loading` ni indicador de progreso.
- Colores mayoritariamente hardcodeados; migración incompleta a tokens del design system.
- Sin uso documentado en `apps/web`; solo evidencia en Storybook (`Investigaciones`, `Ciberseguridad`, `Evidencias`, `Género`, `GridExample`).
- `onClick` opcional: sin manejador, el control sigue siendo semánticamente un botón interactivo.

---

# Future Improvements

- [ ] Estilos `:disabled` coherentes con el design system
- [ ] Migrar colores hardcodeados a tokens (`--ds-color-*`)
- [ ] Usar `var(--ds-focus-ring)` en lugar del valor inline en `:focus-visible`
- [ ] Prop opcional de tono o variante visual por módulo
- [ ] Clave estable alternativa a `metric.label` para listas con etiquetas repetidas

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `ModuleCard`, `ModuleCardProps` y `ModuleMetric` con estilos `ds-module-card` y stories en Storybook. |
