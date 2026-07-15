---
id: segmented-control
name: SegmentedControl
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/SegmentedControl.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/SegmentedControl

aliases:
  - control segmentado
  - selector de segmentos
  - toggle group
keywords:
  - SegmentedControl
  - segmentos
  - filtro
  - selección
  - aria-pressed
  - SegmentItem
  - SegmentedControlProps
tags:
  - input
  - forms
  - interactive
  - molecule

last_reviewed: 2026-07-02
---

# SegmentedControl

## Purpose

Ofrece selección mutuamente excluyente entre varios segmentos visibles mediante botones en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** presentar un grupo de opciones como botones adyacentes, con una opción activa indicada por `aria-pressed`, y notificar cambios al consumidor.
- **Problema que resuelve:** unificar filtros y conmutadores de vista compactos (p. ej. todas / hoy / cerradas / críticas) sin usar listas desplegables ni toggles booleanos.
- **Alcance:** componente controlado basado en `<button type="button">`; el consumidor provee `items`, `value` y gestiona el estado vía `onValueChange`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-segmented" role="group" aria-label={label}>`.
- Un `<button class="ds-segmented__item" type="button">` por cada entrada en `items`, en el orden del array.
- `aria-pressed={item.value === value}` en cada botón según la prop `value` controlada.
- `onClick` en cada botón invoca `onValueChange?.(item.value)` al hacer clic.
- `disabled={item.disabled}` en cada botón cuando `SegmentItem.disabled` es truthy.
- Icono opcional en `<span class="ds-segmented__icon">` solo cuando `item.icon` es truthy.
- Etiqueta visible en `<span>{item.label}</span>` dentro de cada botón.
- Fusión de `className` externa con `ds-segmented` en el contenedor mediante `cn()`.
- Repaso de atributos de `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange" | "children">` a **cada** botón vía `...props` (no al contenedor).
- Clave React de cada botón: `item.value`.

## This component never

- Gestiona estado interno de selección; `value` debe proveerlo el consumidor.
- Usa `role="radiogroup"` ni inputs `type="radio"` nativos.
- Compone internamente `Button`, `Switch`, `SelectField` ni otros componentes del kit.
- Expone props `variant`, `size`, `children` ni `defaultValue`.
- Impide el clic en el segmento ya seleccionado (el `onClick` se dispara igualmente).
- Valida que `value` coincida con algún `item.value`.
- Importa iconos; `icon` es `ReactNode` provisto por el consumidor.
- Define estilos `:hover` ni `:focus-visible` propios en `.ds-segmented__item`.
- Aplica media queries; el contenedor usa `flex-wrap: wrap` para ajuste de línea.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `items` como array de `SegmentItem` con `value` y `label`.
- Proporcionar `value` como string que identifica el segmento activo.
- Gestionar estado en el consumidor (`value` + `onValueChange`); el componente es controlado.

## Forbidden

- Inventar props que no existan en `SegmentedControlProps` (`variant`, `size`, `defaultValue`, `children`, etc.).
- Pasar `children` al componente (omitido de la API).
- Asumir comportamiento no controlado o valor inicial automático sin estado del consumidor.
- Usar `SegmentedControl` para un único booleano on/off (usar `Switch`).
- Usar valores duplicados en `items[].value` (provocan claves React duplicadas).
- Pasar `className` en `...props` esperando que afecte solo a un botón; `className` se aplica al contenedor, `...props` se replica en todos los botones.

## Recommendations

- Proveer `label` accesible para el grupo (p. ej. `"Filtro de tareas"`), como en `SegmentedControl.stories.tsx`.
- Usar `icon` en segmentos cuando el filtro se beneficie de affordance visual, siguiendo las stories con `lucide-react`.
- Marcar segmentos no disponibles con `disabled: true`, como en la story `WithDisabledItem`.
- Mantener etiquetas breves; el CSS aplica `text-transform: uppercase` en los botones.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { SegmentedControl } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentItem
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `SegmentedControl` — componente funcional.
- `SegmentedControlProps` — props del componente.
- `SegmentItem` — definición de cada segmento del grupo.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `items` | `SegmentItem[]` | — | sí | Segmentos del control. Cada entrada genera un `<button class="ds-segmented__item">`. |
| `value` | `string` | — | sí | Valor del segmento activo. Determina `aria-pressed` en cada botón. |
| `label` | `string` | — | no | Nombre accesible del grupo. Aplicado como `aria-label` en el contenedor `role="group"`. |
| `onValueChange` | `(value: string) => void` | — | no | Callback invocado con `item.value` al hacer clic en un segmento habilitado. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-segmented` en el `<div>` contenedor. |
| `...props` | `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" \| "onChange" \| "children">` | — | no | Atributos reenviados a **cada** botón (`id`, `data-*`, `aria-*`, etc.). No incluye `className` (reservado al contenedor). |

### SegmentItem

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `value` | `string` | — | sí | Identificador del segmento. Usado como clave React, en `aria-pressed` y en `onValueChange`. |
| `label` | `string` | — | sí | Texto visible del segmento. Renderizado en `<span>` dentro del botón. |
| `icon` | `ReactNode` | — | no | Icono opcional. Renderizado en `<span class="ds-segmented__icon">` cuando es truthy. |
| `disabled` | `boolean` | — | no | Deshabilita el botón del segmento. Aplica `disabled` nativo y estilos `.ds-segmented__item:disabled`. |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada en CSS. Contenedor con fondo semitransparente, borde y padding interno; botones con texto en mayúsculas (`text-transform: uppercase` vía CSS), color apagado por defecto (`--ds-color-ink-soft`).

El segmento activo se distingue por el selector `[aria-pressed="true"]`: fondo `--ds-color-surface`, borde `--ds-color-line-strong`, sombra `--ds-shadow-sm` y texto `--ds-color-teal`. No existe prop `variant`; la selección es exclusivamente por `value`.

---

# States

| State | Description |
|--------|-------------|
| Default (unselected) | Botón con fondo transparente, borde transparente y `color: var(--ds-color-ink-soft)`. `aria-pressed="false"`. |
| Selected | Botón con `aria-pressed="true"` y estilos de `.ds-segmented__item[aria-pressed="true"]`. |
| Disabled | Cuando `item.disabled` es truthy: `cursor: not-allowed`, `opacity: 0.48`; el botón no dispara interacción nativa. |
| With icon | Cuando `item.icon` está definido, se muestra `.ds-segmented__icon` (15×15px) antes de la etiqueta. |
| Wrapped layout | `.ds-segmented` usa `flex-wrap: wrap`; los segmentos pueden pasar a la línea siguiente en contenedores estrechos. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El contenedor usa `role="group"` y `aria-label={label}` cuando `label` se provee.
- Cada segmento es un `<button type="button">` nativo con `aria-pressed` reflejando selección.
- Los segmentos deshabilitados usan el atributo `disabled` nativo.
- El nombre accesible de cada botón deriva de su contenido visible (`label` e icono decorativo sin texto alternativo propio).
- No implementa navegación por flechas entre segmentos (patrón roving tabindex); cada botón es focusable en orden de tabulación del documento.
- El consumidor es responsable de proveer `label` significativo para el grupo; sin `label`, `aria-label` queda `undefined`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="group"` | Aplicado en el `<div class="ds-segmented">`. |
| `aria-label` | Valor de la prop `label` en el contenedor. |
| `aria-pressed` | `"true"` cuando `item.value === value`; `"false"` en caso contrario. |
| Atributos vía `...props` | Reenviados a cada `<button>`; el componente no aplica ARIA adicional por defecto en botones. |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Mueve el foco entre botones del grupo según orden de tabulación del documento (comportamiento nativo de `<button>`). |
| `Enter` / `Space` | Activa el botón enfocado; dispara `onClick` y por tanto `onValueChange?.(item.value)` si está definido. |
| Flechas | Sin manejo implementado entre segmentos del grupo. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`SegmentedControl` no define media queries. El contenedor `.ds-segmented` aplica `display: inline-flex`, `flex-wrap: wrap` y `gap: 4px`, permitiendo que los botones pasen a la siguiente línea cuando el ancho es insuficiente.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Ajuste de línea vía `flex-wrap: wrap` en `.ds-segmented`. |
| Storybook | Decorator con `minWidth: 520` y `padding: 32`; el ancho mínimo depende del decorator, no del componente. |
| `apps/web` | Sin uso documentado en la aplicación demo. |

---

# Composition

## Purpose in Layout

- **Action** — filtro o conmutador de vista que cambia el contenido mostrado en la consola.
- **Summary** — no aplica; no muestra métricas.
- **Container** — no envuelve otros componentes; es un grupo de botones autocontenido.

## Parent

- `div` con ancho mínimo en el decorator de `SegmentedControl.stories.tsx` (`minWidth: 520`).
- Barras de herramientas, encabezados de sección o paneles de filtro del consumidor.

## Children

- No admite `children`. Contenido de cada segmento derivado de `SegmentItem.label` e `SegmentItem.icon`.

## Siblings

- `TextField`, `SelectField` — otros controles de filtro o entrada en la misma barra de herramientas.
- `Button` — acciones puntuales adyacentes; no sustituyen selección mutuamente excluyente entre varias opciones visibles.
- `DataTable`, `TaskCard` — contenido que el filtro puede afectar en el consumidor; sin integración interna.

## Alternatives

- `SelectField` — selección entre opciones en lista desplegable nativa; no segmentos visibles simultáneos.
- `Switch` — booleano on/off; no múltiples valores mutuamente excluyentes.
- `Button` con estado activo manual — sin `aria-pressed` ni estructura de grupo integrada.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Switch` | Alternativa para booleano on/off; `SegmentedControl` admite N opciones con `aria-pressed`. Documentado en `Switch.md`. |
| `SelectField` | Alternativa para selección en lista desplegable; no comparte estructura `ds-field`. Documentado en `SelectField.md`. |
| `Button` | Acción puntual; no agrupa selección mutuamente excluyente. Mencionado en `Button.md` como alternativa. |
| `TextField` | Entrada de texto libre; no sustituye selección entre segmentos. Mencionado en `TextField.md`. |

---

# Content Guidelines

## Labels

- `label` (grupo): descriptor del propósito del control (p. ej. `"Filtro de tareas"`). Recomendado para accesibilidad.
- `items[].label`: texto breve del segmento (p. ej. `"Todas"`, `"Hoy"`, `"Cerradas"`, `"Criticas"`). El CSS aplica mayúsculas en `.ds-segmented__item`.
- `items[].value`: identificador estable en minúsculas o kebab-case (p. ej. `"all"`, `"today"`, `"done"`, `"critical"`).

## Values

- `value`: debe coincidir con un `items[].value` para marcar un segmento como activo; el componente no valida la correspondencia.
- `onValueChange`: el consumidor actualiza su estado con el `value` recibido.

## Icons

- `items[].icon`: `ReactNode` opcional. Las stories usan iconos de `lucide-react` (`ListFilter`, `CalendarClock`, `CheckCircle2`, `Siren`).
- El icono se renderiza en `.ds-segmented__icon` (15×15px); SVG hijos escalan al 100% del contenedor.
- No hay prop de tamaño de icono ni slot separado del label.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `label` e `items[].label`.

---

# Examples

## Basic

```tsx
import { SegmentedControl } from "@alejandria/ui-kit";

<SegmentedControl
  label="Filtro de tareas"
  value="all"
  onValueChange={(next) => console.log(next)}
  items={[
    { value: "all", label: "Todas" },
    { value: "today", label: "Hoy" },
    { value: "done", label: "Cerradas" },
    { value: "critical", label: "Criticas" }
  ]}
/>
```

## Variant

Segmento activo distinto y segmento deshabilitado.

```tsx
import { SegmentedControl } from "@alejandria/ui-kit";

<SegmentedControl
  label="Filtro de tareas"
  value="critical"
  onValueChange={(next) => setFilter(next)}
  items={[
    { value: "all", label: "Todas" },
    { value: "today", label: "Hoy" },
    { value: "done", label: "Cerradas", disabled: true },
    { value: "critical", label: "Criticas" }
  ]}
/>
```

## Composition

```tsx
import { CalendarClock, ListFilter } from "lucide-react";
import { SegmentedControl } from "@alejandria/ui-kit";

const [filter, setFilter] = useState("all");

<SegmentedControl
  label="Filtro de tareas"
  value={filter}
  onValueChange={setFilter}
  items={[
    { value: "all", label: "Todas", icon: <ListFilter /> },
    { value: "today", label: "Hoy", icon: <CalendarClock /> }
  ]}
/>
```

---

# Reasoning Examples

## User Request

Filtrar tareas entre todas, hoy, cerradas y críticas con opciones visibles simultáneamente.

### Recommended Components

- `SegmentedControl`

### Why

Patrón de `SegmentedControl.stories.tsx` → `Playground` con cuatro segmentos y `label="Filtro de tareas"`.

---

## User Request

Activar o desactivar una única preferencia booleana (modo silencioso).

### Recommended Components

- `Switch`

### Why

`SegmentedControl` modela selección entre múltiples valores string; `Switch` cubre on/off booleano según `Switch.md`.

---

## User Request

Elegir entre muchas opciones en lista desplegable compacta.

### Recommended Components

- `SelectField`

### Why

`SegmentedControl` muestra todos los segmentos a la vez; `SelectField` usa `<select>` nativo para listas más largas.

---

## User Request

Grupo de segmentos con navegación por flechas estilo radiogroup.

### Recommended Components

- Ninguno del kit con ese comportamiento

### Why

`SegmentedControl` no implementa roving tabindex ni `role="radiogroup"`; solo botones con `aria-pressed`.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-line` | color | `border` de `.ds-segmented` |
| `--ds-radius-md` | radius | `border-radius` de `.ds-segmented` |
| `--ds-radius-sm` | radius | `border-radius` de `.ds-segmented__item` |
| `--ds-color-ink-soft` | color | `color` de `.ds-segmented__item` (no seleccionado) |
| `--ds-font-mono` | typography | `font-family` de `.ds-segmented__item` |
| `--ds-color-surface` | color | `background` de `.ds-segmented__item[aria-pressed="true"]` |
| `--ds-color-line-strong` | color | `border-color` del segmento seleccionado |
| `--ds-shadow-sm` | shadow | `box-shadow` del segmento seleccionado |
| `--ds-color-teal` | color | `color` del segmento seleccionado |

Nota: el fondo de `.ds-segmented` está hardcodeado (`rgb(0 0 0 / 0.24)`). No hay reglas `:hover` ni `:focus-visible` para `.ds-segmented__item`.

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
packages/ui/src/components/SegmentedControl.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-segmented`, `ds-segmented__item`, `ds-segmented__icon`)

## DOM Structure

```text
div.ds-segmented[role=group][aria-label]
└── button.ds-segmented__item[type=button][aria-pressed][disabled?] × items.length
    ├── span.ds-segmented__icon (solo si item.icon)
    └── span
        └── item.label
```

---

# Known Limitations

- Componente estrictamente controlado; sin `defaultValue` ni estado interno.
- `...props` se aplica a **todos** los botones, no al contenedor (excepto `className`, reservado al contenedor).
- Sin validación de que `value` exista en `items`; un valor huérfano deja todos los segmentos con `aria-pressed="false"`.
- Sin navegación por flechas entre segmentos (roving tabindex).
- Sin estilos `:focus-visible` en `.ds-segmented__item`; el foco depende del estilo nativo del navegador.
- Sin estilos `:hover` definidos en CSS.
- Clic en el segmento ya activo sigue invocando `onValueChange`.
- Valores duplicados en `items[].value` generan claves React duplicadas.
- Sin documentación JSDoc en `SegmentedControl.tsx` (a diferencia de otros componentes del kit).
- Sin uso en `apps/web` ni en `Components.stories.tsx` → `OperationsConsole`.
- Sin tests unitarios ni de integración en el repositorio.
- Fondo del contenedor hardcodeado; migración incompleta a tokens.

---

# Future Improvements

- [ ] Estilos `:focus-visible` y `:hover` para `.ds-segmented__item`
- [ ] Navegación por flechas entre segmentos si se define en diseño/accesibilidad
- [ ] Evitar disparar `onValueChange` cuando el valor no cambia
- [ ] Documentación JSDoc en `SegmentedControl.tsx`, `SegmentedControlProps` y `SegmentItem`
- [ ] Integración en `apps/web` o `Components.stories.tsx`
- [ ] Tests de selección, `disabled`, `aria-pressed` y callback
- [ ] Migrar fondo hardcodeado de `.ds-segmented` a token de superficie

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `SegmentedControl`, `SegmentedControlProps` y `SegmentItem` con estilos `ds-segmented`. Stories en Storybook (`Playground`, `CriticalSelected`, `WithDisabledItem`). Export en `packages/ui/src/index.ts`. Mención en `README.md`. Referencias cruzadas en `Button.md`, `Switch.md`, `SelectField.md` y `TextField.md`. |
