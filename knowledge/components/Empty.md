---
id: empty
name: Empty
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Empty.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Empty

aliases:
  - estado vacío
  - empty state
  - sin datos
  - sin elementos
keywords:
  - Empty
  - empty
  - empty state
  - EMPTY
  - sin tareas
  - sin investigaciones
  - EmptyProps
tags:
  - feedback
  - empty-state
  - presentational
  - molecule

last_reviewed: 2026-08-05
---

# Empty

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 16 — EMPTY** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 16).

## Purpose

Presenta un estado vacío centrado cuando aún no hay elementos (tareas, investigaciones, u otros conjuntos) en pantallas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** comunicar la ausencia de contenido con ícono, título, texto de apoyo opcional y una acción contextual opcional.
- **Problema que resuelve:** unificar el empty state PDF (sin fondo, tipografía Montserrat, pozo de ícono **circular** `#494949`) sin acoplar copy fija ni un `Button` del kit.
- **Alcance:** componente presentacional basado en `<div class="ds-empty">`; el consumidor provee `title` y, opcionalmente, `description`, `icon` y `action` como `ReactNode`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-empty">` sin fondo propio (`background: transparent`).
- `title` obligatorio en la firma de props; renderizado en `<strong class="ds-empty__title">`.
- `description` renderizada en `<p class="ds-empty__description">` solo cuando su valor es truthy.
- `icon` renderizado en `<span class="ds-empty__icon" aria-hidden="true">` solo cuando es truthy, con pozo **circular** (`border-radius: var(--ds-radius-pill)`; PDF vector confirmado — ver spec), `32×32px` con `padding: 6px` para que el ícono (que mantiene su tamaño visual anterior, ~20×20px) no toque el borde del círculo (ajuste post-revisión de usuario, ver spec).
- `action` renderizado en `<div class="ds-empty__action">` solo cuando es truthy.
- Contenido apilado en columna y centrado horizontalmente (`flex` + `align-items: center` + `text-align: center`), con espaciado **no uniforme** entre elementos (icono→título ~22px, título→descripción ~0px, descripción→acción ~24px — medido del PDF; ver spec), no un `gap` parejo.
- Fusión de `className` externa con `ds-empty` mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Compone internamente `Button`, `AlertBanner`, `Card` ni otros componentes del kit.
- Impone un componente concreto en el slot `action` (acepta cualquier `ReactNode`).
- Expone ejes `variant`, `appearance`, `size` o `tone` (PDF p.16 muestra una sola apariencia).
- Hardcodea copy de las demos PDF («No hay tareas…» / «No hay investigaciones…»).
- Define estados interactivos propios (`hover`, `focus`) en `.ds-empty`.
- Aplica media queries ni breakpoints propios.
- Usa `forwardRef`.
- Centra el bloque en el viewport completo por sí solo (el centrado en pantalla del PDF es responsabilidad del layout padre; el componente solo centra su contenido interno).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title` como `string`.
- Tratar PDF p.16 como referencia canónica de apariencia (escala display = anotación @2× ÷ 2).

## Forbidden

- Inventar props que no existan en `EmptyProps` (`variant`, `tone`, `size`, `children`, etc.).
- Asumir que `action` renderiza un `Button` automáticamente (el consumidor provee el nodo).
- Hardcodear hex reutilizables en lugar de tokens (`--ds-color-pdf-*`, `--ds-color-white`).
- Usar `Empty` como sustituto de `AlertBanner` para alertas operativas con tono semántico.
- Usar `Empty` como contenedor de card/panel (`Card`) con borde, sombra o fondo de superficie.

## Recommendations

- Pasar `icon` con SVG o iconos de `lucide-react` (p. ej. `ClipboardList`, `Search` en las stories).
- En pantallas PDF/reporting, preferir `Button variant="pdf"` (u otro nodo con el mismo rol visual) en `action`; el padding exacto PDF (5×15 display) puede diferir del `Button` del kit — ver spec.
- Usar las stories `NoTasks` y `NoInvestigations` como referencia de copy, no como props por defecto del componente.
- Envolver `Empty` en un contenedor padre que centre el bloque en la región vacía (PDF: «Centrado en la pantalla»).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Feedback |
| Package | @alejandria/ui-kit |
| Import | `import { Empty } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Empty,
  type EmptyProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Empty` — componente funcional.
- `EmptyProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título del estado vacío. Renderizado en `<strong class="ds-empty__title">`. |
| `description` | `string` | — | no | Texto de apoyo. Renderizado en `<p class="ds-empty__description">` solo si es truthy. |
| `icon` | `ReactNode` | — | no | Icono decorativo. Renderizado en `<span class="ds-empty__icon" aria-hidden="true">` solo si es truthy. |
| `action` | `ReactNode` | — | no | Acción contextual (slot libre). Renderizado en `<div class="ds-empty__action">` solo si es truthy. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-empty` en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). |

---

# Variants

## Default

Una sola apariencia pública, alineada a PDF p.16 EMPTY. No hay modificadores BEM `ds-empty--*` ni props de eje visual.

| Elemento | Rol visual (PDF p.16, display ÷2) |
|----------|-----------------------------------|
| Raíz | Sin fondo; columna centrada; gaps no uniformes (ver Spacing en spec) |
| Ícono | Pozo **circular** `32×32` con `padding: 6px` (ícono interior ~`20×20`), `border-radius: var(--ds-radius-pill)`, fondo `#494949`, tinta `#8a8b87` — el pozo PDF mide `20×20` (`40×40` @2×) sin holgura, pero se agrandó tras revisión de usuario para que el ícono no toque el borde (ver spec § Deltas) |
| Título | Montserrat Bold `8px` (`16pt` @2×), `#e6e6e6` |
| Texto | Montserrat Light `7px` (`14pt` @2×), `#e6e6e6` |
| Acción | Slot; el PDF muestra botón Bold `16pt`, blanco sobre `#494949`, padding display `5px` / `15px` — **no** aplicado por `Empty` al slot |

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-empty` con `title`. Sin estados `:hover`, `:focus` ni `:disabled` en CSS del empty. |
| With description | Cuando `description` es truthy, se muestra `.ds-empty__description`. |
| Without description | Cuando `description` es falsy, el párrafo no se renderiza. |
| With icon | Cuando `icon` es truthy, se muestra `.ds-empty__icon` con `aria-hidden="true"`. |
| With action | Cuando `action` es truthy, se muestra `.ds-empty__action`. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- El título (`<strong>`) y la descripción (`<p>`) quedan expuestos como contenido textual en el árbol de accesibilidad.
- El wrapper de icono recibe `aria-hidden="true"` porque el mensaje accesible vive en `title` / `description`.
- La accesibilidad del contenido en `action` depende del nodo insertado (p. ej. `Button` con texto visible).
- El consumidor puede pasar atributos ARIA adicionales vía `...props`; el componente no define `role` ni `aria-live`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-empty__icon`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `role`, etc. en el `<div>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado propio. Si `action` contiene un control enfocable, el foco y la activación dependen de ese control. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Empty` no define media queries. El layout es una columna flex centrada; el ancho y el centrado en viewport los define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Flex column, `align-items: center`, `text-align: center`, gaps no uniformes vía `margin` por elemento (ver spec), no `gap` del contenedor. |
| Storybook decorator | `padding: 32` + `background: var(--ds-color-pdf-surface)` en el contenedor centrado de `Empty.stories.tsx` — necesario porque `Empty` no dibuja fondo propio (título/texto usan `--ds-color-pdf-line-light`, casi blanco) y el addon `backgrounds` de Storybook no está registrado en `.storybook/main.ts` (`parameters.backgrounds` no tiene efecto). |

---

# Composition

## Purpose in Layout

- **Feedback** — mensaje de ausencia de datos en una región vacía.
- **Detail** — copy de guía más acción opcional para crear el primer elemento.
- **Container** — anatomía fija (ícono, título, descripción, acción); no admite `children` libres.

## Parent

- Región de lista, tabla o panel sin filas (p. ej. futuro empty de `DataTable`).
- Contenedor centrado de Storybook en `Empty.stories.tsx`.
- Cualquier layout que centre el bloque en la pantalla/región vacía (PDF p.16).

## Children

- No admite `children`. Solo contenido derivado de `title`, `description`, `icon` y `action`.

## Siblings

- `Button` — frecuentemente insertado en el slot `action` (`NoTasks`, `NoInvestigations`); no hay composición interna.
- `AlertBanner` — feedback con tono semántico y fondo de consola; no es empty state PDF.
- `Card` — panel con superficie, borde y slots compuestos; no sustituye EMPTY.

## Alternatives

- `AlertBanner` — alerta operativa con `tone`; no describe «aún no hay elementos».
- `Card` — contenedor compuesto; no es el empty state sin fondo de p.16.
- Texto plano o `div` custom — sin tipografía ni pozo de ícono del kit.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Button` | Usado en stories dentro del slot `action` (`variant="pdf"`); `Empty` no lo importa ni lo compone. |
| `AlertBanner` | Hermano de feedback con slots `icon` / `title` / `description` / `action`, pero anatomía y contexto visual distintos (consola + `tone` vs EMPTY PDF sin fondo). |
| `Card` | Contenedor de detalle con superficie; no solapa el rol empty state. |
| `DataTable` | Consumidor potencial: empty rows / sin datos (roadmap). |

---

# Content Guidelines

## Labels

- `title`: frase corta afirmando la ausencia (PDF: `"No hay tareas pendientes"`, `"No hay investigaciones"`).
- `action` (cuando es botón): etiqueta en mayúsculas de acción primaria (PDF: `"CREÁ UNA TAREA"`, `"NUEVA ENTIDAD"`).

## Values

- No aplica; `Empty` no muestra métricas numéricas.

## Icons

- Pasar iconos como `ReactNode` en `icon`.
- Demos usan `lucide-react`: `ClipboardList` (tareas), `Search` (investigaciones).
- `.ds-empty__icon` reserva contenedor display `20×20` px (PDF `40×40` @2×).

## Localization

- Las stories usan español (rioplatense) como en el PDF. El componente no impone idioma.

---

# Examples

## Basic

```tsx
import { Empty } from "@alejandria/ui-kit";

<Empty title="No hay tareas pendientes" />
```

## Variant

No hay variantes públicas. Las dos demos PDF son **copy** distinta sobre la misma apariencia:

```tsx
import { ClipboardList, Search } from "lucide-react";
import { Button, Empty } from "@alejandria/ui-kit";

<Empty
  icon={<ClipboardList />}
  title="No hay tareas pendientes"
  description="Empezá creando una tarjeta para tu tarea."
  action={<Button variant="pdf">CREÁ UNA TAREA</Button>}
/>

<Empty
  icon={<Search />}
  title="No hay investigaciones"
  description="Empezá sumando una entidad a tu investigación."
  action={<Button variant="pdf">NUEVA ENTIDAD</Button>}
/>
```

## Composition

```tsx
import { ClipboardList } from "lucide-react";
import { Button, Empty } from "@alejandria/ui-kit";

<div
  style={{
    display: "grid",
    placeItems: "center",
    minHeight: "100%"
  }}
>
  <Empty
    icon={<ClipboardList />}
    title="No hay tareas pendientes"
    description="Empezá creando una tarjeta para tu tarea."
    action={
      <Button variant="pdf" size="sm">
        CREÁ UNA TAREA
      </Button>
    }
  />
</div>
```

---

# Reasoning Examples

## User Request

Mostrar un empty state cuando no hay tareas, con botón para crear una.

### Recommended Components

- `Empty` + `Button variant="pdf"` en `action`

### Why

Patrón de `Empty.stories.tsx` → `NoTasks` alineado a PDF p.16.

---

## User Request

Banner de alerta crítica con tono danger.

### Recommended Components

- `AlertBanner tone="danger"`

### Why

`Empty` no tiene `tone` ni acento lateral; es ausencia de elementos, no alerta operativa.

---

## User Request

Panel con borde, título y cuerpo libre.

### Recommended Components

- `Card`

### Why

`Empty` no admite `children`, fondo de superficie ni slots de card; PDF p.16 es sin fondo.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-action` | color | Fondo de `.ds-empty__icon` (`#494949`) |
| `--ds-color-pdf-ink-muted` | color | Color del ícono en `.ds-empty__icon` (`#8a8b87`) |
| `--ds-color-pdf-line-light` | color | Color de título y descripción (`#e6e6e6`); color base de `.ds-empty` |
| `--ds-size-icon-xl` | size | ~ícono interior efectivo del pozo (`32px` pozo − `6px` padding × 2 = `20px`, coincide con el token aunque ya no se referencia directo en CSS — ver spec) |
| `--ds-radius-pill` | radius | `border-radius` del pozo de ícono (círculo completo — PDF vector confirmado) |
| `--ds-space-5` | space | `margin-bottom` de `.ds-empty__icon` (`20px`, medido ÷2 del gap icono→título, ~21.7px promedio) |
| `--ds-space-6` | space | `margin-bottom` de `.ds-empty__description` y `margin-top` de `.ds-empty__title + .ds-empty__action` (`24px`, medido ÷2 del gap descripción→acción, ~25.9px promedio) |
| `--ds-font-body` | typography | `font-family` de título y descripción (Montserrat) |
| `--ds-font-weight-bold` | typography | Peso del título |
| `--ds-font-weight-light` | typography | Peso de la descripción |
| `--ds-leading-normal` | typography | `line-height` del título |
| `--ds-leading-body` | typography | `line-height` de la descripción |

Nota: el PDF p.16 también especifica el botón de acción (texto `--ds-color-white`, fondo `--ds-color-pdf-action`, padding display `5px`/`15px`). Eso **no** se aplica en `.ds-empty__action` porque `action` es un slot libre.

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
packages/ui/src/components/Empty.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-empty`, `ds-empty__icon`, `ds-empty__title`, `ds-empty__description`, `ds-empty__action`)

## DOM Structure

```text
div.ds-empty
├── span.ds-empty__icon[aria-hidden="true"] (solo si icon es truthy)
│   └── {icon}
├── strong.ds-empty__title
├── p.ds-empty__description (solo si description es truthy)
└── div.ds-empty__action (solo si action es truthy)
    └── {action}
```

---

# Known Limitations

- No expone `children`, `variant`, `tone`, `size` ni composición interna de `Button`.
- El chrome exacto del botón PDF no vive en `.ds-empty__action`; depende del nodo en `action`.
- Sin centrado viewport automático; el padre debe centrar el bloque.
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Playground`, `NoTasks`, `NoInvestigations`).

---

# Future Improvements

- [ ] Confirmar con design el gap descripción→acción exacto (PDF muestra ~30px en un demo y ~22px en el otro; se usó el promedio redondeado a `--ds-space-6`, ver spec § Deltas)
- [ ] Integrar como empty state de `DataTable` / listas cuando el patrón se documente
- [ ] Resolver si Form (PDF p.17) es un componente distinto o reutiliza `Empty`

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `Empty` / `EmptyProps` con estilos `ds-empty` según PDF p.16 EMPTY, y stories `Playground`, `NoTasks`, `NoInvestigations`. |
| 0.1.1 | Fidelity pass 2026-08-05 contra PDF p.16 (`doc[15]`, medido con PyMuPDF), a partir de dos observaciones de usuario confirmadas: (1) el pozo de `.ds-empty__icon` pasa de cuadrado (sin radio) a **circular** (`--ds-radius-pill`) — el vector PDF es un path cerrado de 4 curvas `c`, sin lados rectos, en ambos demos de la página; (2) el `gap: 8px` uniforme del contenedor se reemplaza por márgenes por elemento que reflejan tres gaps muy distintos medidos en el PDF: icono→título ~22px (`--ds-space-5`), título→descripción ~0px (casi tocándose — la observación de usuario), descripción→acción ~24px (`--ds-space-6`, promedio de un rango 21.65–30.05px entre los dos demos de la página). De paso, cerró el bug `pt`→`px` carried-forward en `font-size` de título/descripción (`8pt`/`7pt` → `8px`/`7px`, ~33% sobredimensionados). |
| 0.1.2 | Ajuste post-revisión 2026-08-05: usuario reportó que el círculo del ícono "queda muy justo con el tamaño del ícono" (el SVG llenaba el pozo al 100%, tocando el borde). Pozo agrandado de `20×20` (`--ds-size-icon-xl`, el tamaño exacto medido en el PDF) a `32×32` con `padding: 6px`, dejando el ícono en su tamaño visual anterior (~`20×20`) pero con aire alrededor. No es una medición PDF nueva — es un ajuste de usuario en una dirección que el PDF sí respalda (su propio glifo de ícono ocupa bien menos de la mitad del diámetro del pozo, ~16×14pt @2× dentro de un pozo de 40×40pt @2×), pero sin llevar el número a ese extremo. |
