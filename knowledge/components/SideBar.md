---
id: side-bar
name: SideBar
category: navigation
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/SideBar.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/SideBar

aliases:
  - menú lateral
  - side bar
  - nav rail
  - navegación
keywords:
  - SideBar
  - sidebar
  - SIDE BAR
  - menú
  - colapsable
  - SideBarProps
  - SideBarItem
tags:
  - navigation
  - chrome
  - app-shell
  - molecule
  - controlled

last_reviewed: 2026-07-22
---

# SideBar

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 13 — SIDE BAR** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 13).

## Purpose

Presenta el menú central colapsable de la plataforma Alejandría, desde el que se navegan módulos y opciones de utilidad.

Describe:

- **Responsabilidad principal:** renderizar un rail de navegación con lista primaria declarativa, lista secundaria opcional (módulos), logo y toggle de colapso controlado.
- **Problema que resuelve:** unificar el chrome SIDE BAR PDF (fondo `#282828`, ítems con bajada/badge/estado, navegación secundaria `#2a2927`, animación de ancho) sin acoplar un router.
- **Alcance:** componente de app-shell basado en `<nav class="ds-sidebar">`; el consumidor provee `items` / `secondaryItems`, controla `collapsed` / `onToggleCollapsed` y cablea navegación vía `onClick`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<nav class="ds-sidebar">` con modificador `ds-sidebar--collapsed` cuando `collapsed` es truthy.
- Estado de colapso **solo controlado**: requiere `collapsed` + `onToggleCollapsed` (sin estado interno; mismo convenio que `SegmentedControl`).
- Encabezado con slot `logo` opcional y botón `.ds-sidebar__toggle` con `aria-expanded={!collapsed}` e `aria-label` «Contraer menú» / «Expandir menú».
- Lista primaria desde `items` como `<ul class="ds-sidebar__list">` de botones `<button type="button">` dentro de `<li>`.
- Lista secundaria renderizada solo si `secondaryItems?.length` es truthy, dentro de `.ds-sidebar__secondary`.
- `menuLabel` / `secondaryLabel` renderizados en `.ds-sidebar__menu-label` solo cuando son truthy (sin defaults hardcodeados).
- Ítem seleccionado con clase `ds-sidebar__item--selected` y `aria-current="page"`.
- Capas opcionales por ítem: `caption` → `.ds-sidebar__item-caption`; `badge` → `.ds-sidebar__badge`; `status` → `.ds-sidebar__status`.
- Colapso por CSS (mismo DOM): oculta copy, labels de menú, badge y status; anima `width` en `.ds-sidebar`.
- Fusión de `className` externa con `ds-sidebar` mediante `cn()`.
- Repaso de atributos nativos de `Omit<ComponentPropsWithoutRef<"nav">, "children">` al `<nav>` raíz vía `...props`.

## This component never

- Mantiene estado interno de colapso o de selección.
- Implementa routing (`href`, `<a>`, integración con React Router / Next).
- Recolorea el bitmap del ícono seleccionado a `#FFFFFF` (los assets compartidos son `<img>` multi-color no tintables; ver Known Limitations).
- Inventa un SVG de flechas/chevron para «Flechas de navegación»; el toggle usa `HamburguesaIcon`.
- Implementa la pantalla completa «Asistente» (PDF p.12) ni el flujo «aparece completa en la pantalla del asistente».
- Expone ejes `variant`, `appearance`, `size` o `tone`.
- Usa `forwardRef`.
- Compone internamente otros componentes del kit (solo importa `HamburguesaIcon` + `cn`).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `items`, `collapsed` y `onToggleCollapsed`.
- Tratar PDF p.13 como referencia canónica de apariencia (escala display = anotación @2× ÷ 2).
- Dar altura al contenedor padre (`height: 100%` en `.ds-sidebar`).

## Forbidden

- Inventar props de routing (`href`, `to`, `Link`).
- Hardcodear la lista de menú dentro del componente (AP13: set abierto → array declarativo).
- Aplicar filtros CSS para fingir el recoloreo del ícono seleccionado.
- Inventar un asset de flecha no presente en `Icons/Menu`.
- Sustituir el fondo del chip de estado (`#282828`) para «arreglar» contraste sobre navegación secundaria.

## Recommendations

- Pasar íconos como `<img src={…Icon} alt="" />` desde `@alejandria/ui-kit` Icons (mismo patrón que `ModuleCard` / `InvestigationCard`).
- Cablear selección en el consumidor (mapear `selected` / `onClick` sobre `items`).
- Usar la story `Playground` como referencia del toggle controlado con `useState` en el story, no en el componente.
- Para módulos en secundaria, reutilizar títulos en mayúsculas como en `ModuleCard.stories.tsx` (p. ej. `CATÁSTROFES` + `CatastrofesIcon`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Chrome |
| Package | @alejandria/ui-kit |
| Import | `import { SideBar } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  SideBar,
  type SideBarProps,
  type SideBarItem
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `SideBar` — componente funcional.
- `SideBarProps` — props del componente.
- `SideBarItem` — forma de cada ítem declarativo.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `items` | `SideBarItem[]` | — | sí | Lista primaria/utilitaria (AP13: set abierto). |
| `collapsed` | `boolean` | — | sí | Estado colapsado controlado. |
| `onToggleCollapsed` | `() => void` | — | sí | Alterna el colapso (controlado). |
| `logo` | `ReactNode` | — | no | Slot de logo en `.ds-sidebar__logo`. |
| `menuLabel` | `string` | — | no | Encabezado sobre la lista primaria (p. ej. «Menú»). |
| `secondaryLabel` | `string` | — | no | Encabezado opcional sobre la lista secundaria (conveniencia; el PDF no muestra label visible). |
| `secondaryItems` | `SideBarItem[]` | — | no | Lista de módulos / navegación secundaria. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-sidebar`. |
| `...props` | `Omit<ComponentPropsWithoutRef<"nav">, "children">` | — | no | Atributos nativos del `<nav>` raíz. Sin `children`. |

### SideBarItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | `ReactNode` | sí | Icono del ítem. |
| `label` | `string` | sí | Etiqueta visible. |
| `caption` | `string` | no | Bajada (PDF «Bajada»). |
| `badge` | `number` | no | Contador de notificación. |
| `status` | `string` | no | Chip de estado (p. ej. «EN VIVO»). |
| `selected` | `boolean` | no | Estado seleccionado (línea izquierda 2pt). |
| `onClick` | `() => void` | no | Handler de navegación (sin `href`). |

---

# Variants

## Default / Expanded

Apariencia completa alineada a PDF p.13 SIDE BAR. Modificador BEM ausente cuando `collapsed={false}`.

| Elemento | Rol visual (PDF p.13, display ÷2) |
|----------|-----------------------------------|
| Raíz | Fondo `#282828`, padding `10px` (`20px` @2×), sombra derecha provisional, ancho reutilizado `--ds-size-card-min-w` (220px) |
| Ícono | Pozo `25×25` (`50×50` @2×; provenance `--ds-size-icon-50`) |
| Seleccionado | Fondo `#2a2927` + `border-left: 2px solid #fff` |
| Bajada | Source Code Regular `7pt` (`14pt` @2×), `#8a8b87` |
| Badge | Montserrat Bold `8.5pt` (`17pt` @2×), blanco sobre `#e30000` |
| Estado | Montserrat Medium `5pt` (`10pt` @2×), uppercase, `#c1c1c1` sobre `#282828` |
| Secundaria | Fondo `#2a2927` |

## Collapsed

Modificador `ds-sidebar--collapsed`: ancho `--ds-size-control-lg` (48px); oculta copy, menu-label, badge y status (rail de íconos).

---

# States

| State | Description |
|--------|-------------|
| Expanded | `collapsed={false}`; muestra labels, captions, badges y status. |
| Collapsed | `collapsed={true}` + clase `ds-sidebar--collapsed`; solo íconos (y toggle). |
| Item selected | `item.selected`; clase `ds-sidebar__item--selected` + `aria-current="page"`. |
| Item with caption / badge / status | Capas opcionales renderizadas solo si truthy / `badge != null`. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Raíz semántica `<nav>`.
- Toggle con `aria-expanded` y `aria-label` contextual.
- Ítems como botones nativos (activables con Enter/Space).
- Ítem seleccionado con `aria-current="page"`.
- Wrappers de ícono de ítem con `aria-hidden="true"` (el nombre accesible vive en `label`).
- El consumidor puede pasar `aria-label` / `aria-labelledby` en el `<nav>` vía `...props`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-expanded` | En `.ds-sidebar__toggle` (`!collapsed`). |
| `aria-label` | En el toggle («Contraer menú» / «Expandir menú»). |
| `aria-current="page"` | En el botón del ítem cuando `selected`. |
| `aria-hidden="true"` | En `.ds-sidebar__item-icon`. |

### Keyboard

| Key | Action |
|-----|--------|
| Tab | Mueve el foco entre toggle e ítems. |
| Enter / Space | Activa el botón enfocado (toggle o ítem). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`SideBar` no define media queries. El colapso es un eje de estado controlado, no un breakpoint.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. `width` anima entre tokens reutilizados; overflow hidden. |
| Storybook decorator | `padding: 32` + altura fija en `SideBar.stories.tsx` (mismo razonamiento que `ModuleCard` / `CalendarCard`: fondo opaco propio). |

---

# Composition

## Purpose in Layout

- **App shell** — rail de navegación principal de la consola PDF.
- **Navigation** — lista primaria de utilidades + secundaria de módulos.
- **Container** — anatomía fija; no admite `children` libres.

## Parent

- Layout de app-shell con altura definida.
- Contenedor de Storybook en `SideBar.stories.tsx`.

## Children

- No admite `children`. Contenido derivado de `logo`, `items` y `secondaryItems`.

## Siblings

- `Scrollbar` — chrome de navegación/desplazamiento; mismo Group Chrome.
- `ModuleCard` — tile de módulo; los ítems secundarios suelen reutilizar los mismos Icons de Modules.
- `SegmentedControl` — precedente de API controlada (`value` + handler).

## Alternatives

- Nav custom / rail de `apps/web` — no es el SIDE BAR del kit.
- Lista de `Button` ghost — sin anatomía PDF de bajada/badge/estado ni colapso.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Scrollbar` | Hermano Chrome (Group Chrome); no solapa el rol de menú. |
| `ModuleCard` | Proveedor de iconografía/títulos de módulos para `secondaryItems`. |
| `SegmentedControl` | Precedente de estado controlado sin uncontrolled default. |
| `InvestigationCard` / `ModuleCard` | Patrón `<img src={IconUrl}>` para assets compartidos. |

---

# Content Guidelines

## Labels

- `menuLabel`: encabezado corto (PDF: `"Menú"`).
- Ítems fijos típicos: Mis tareas, Historial, Reportes, Notificaciones, Mi cuenta, Configuración, Ayuda, Cerrar sesión.
- Módulos en secundaria: títulos en mayúsculas como en ModuleCard (p. ej. `"CATÁSTROFES"`).

## Values

- `badge`: entero de no leídos (PDF muestra contadores).
- `status`: chip uppercase corto (PDF: `"EN VIVO"`).

## Icons

- Usar iconos compartidos del paquete (`Icons/*`).
- Mapeo de stories: Historial→`HistorialIcon`, Reportes→`ReportsIcon`, Notificaciones→`NotificacionesIcon`, Mi cuenta→`UsuarioIcon`, Configuración→`ConfiguracionIcon`, Ayuda→`AyudaIcon`, Cerrar sesión→`CerrarSesionIcon`, Mis tareas→`MenuBandejaIcon` (**inferido**), Catástrofes→`CatastrofesIcon`.
- Toggle: `HamburguesaIcon` (ver open question de flechas).

## Localization

- Labels y `aria-label` del toggle están en español en la implementación actual. El consumidor controla el copy de ítems.

---

# Examples

## Basic

```tsx
import {
  SideBar,
  HistorialIcon,
  MenuBandejaIcon
} from "@alejandria/ui-kit";

<SideBar
  menuLabel="Menú"
  collapsed={false}
  onToggleCollapsed={() => {}}
  items={[
    {
      icon: <img src={MenuBandejaIcon} alt="" />,
      label: "Mis tareas",
      selected: true
    },
    {
      icon: <img src={HistorialIcon} alt="" />,
      label: "Historial"
    }
  ]}
/>
```

## Variant

```tsx
import { useState } from "react";
import { SideBar, CatastrofesIcon, NotificacionesIcon } from "@alejandria/ui-kit";

function AppShellNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideBar
      menuLabel="Menú"
      collapsed={collapsed}
      onToggleCollapsed={() => setCollapsed((v) => !v)}
      items={[
        {
          icon: <img src={NotificacionesIcon} alt="" />,
          label: "Notificaciones",
          badge: 2
        }
      ]}
      secondaryItems={[
        {
          icon: <img src={CatastrofesIcon} alt="" />,
          label: "CATÁSTROFES",
          status: "EN VIVO"
        }
      ]}
    />
  );
}
```

## Composition

Ver story `Playground` en `SideBar.stories.tsx` (estado de colapso + selección en el story).

---

# Reasoning Examples

## User Request

Menú lateral colapsable con utilidades y un módulo Catástrofes.

### Recommended Components

- `SideBar`

### Why

Rol PDF p.13 SIDE BAR; lista declarativa + `secondaryItems` con `CatastrofesIcon`.

---

## User Request

Links con `href` y React Router.

### Recommended Components

- `SideBar` con `onClick` que llame a `navigate(...)` en el consumidor.

### Why

El kit es router-agnostic; no hay prop `href`.

---

## User Request

Empty state cuando no hay tareas.

### Recommended Components

- `Empty`

### Why

`SideBar` es chrome de navegación, no feedback de ausencia de datos.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-shell` | color | Fondo de `.ds-sidebar` y chip `.ds-sidebar__status` (`#282828`) |
| `--ds-color-pdf-notification` | color | Fondo de `.ds-sidebar__badge` (`#e30000`) |
| `--ds-color-pdf-surface-warm` | color | Fondo secundaria / ítem seleccionado (`#2a2927`) |
| `--ds-color-pdf-ink-muted` | color | Color de tinta muted / caption (`#8a8b87`) |
| `--ds-color-pdf-line` | color | Texto del chip de estado (`#c1c1c1`) |
| `--ds-color-white` | color | Label / badge / línea seleccionada |
| `--ds-color-black-a24` | color | Sombra derecha provisional |
| `--ds-size-card-min-w` | size | Ancho expandido (provisional/reutilizado, 220px) |
| `--ds-size-control-lg` | size | Ancho colapsado (provisional/reutilizado, 48px) |
| `--ds-duration-md` | motion | Transición de `width` |
| `--ds-ease-standard` | motion | Easing de la transición |
| `--ds-font-body` | typography | Labels, badge, menu-label |
| `--ds-font-mono` | typography | Caption (bajada) y status (brief de build; PDF copy dice Montserrat Medium para Estado) |
| `--ds-font-weight-regular` | typography | Caption / label |
| `--ds-font-weight-medium` | typography | Status (Montserrat Medium) |
| `--ds-font-weight-bold` | typography | Badge |
| `--ds-radius-pill` | radius | Badge |

Nota: el tamaño de ícono `25px` es literal calibrado (÷2 de asset 50×50); se cita `--ds-size-icon-50` como provenance en comentario CSS, sin redefinir ese token (@2× crudo por convención).

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
packages/ui/src/components/SideBar.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `HamburguesaIcon` from `packages/ui/src/Icons`
- `styles.css` (bloque `.ds-sidebar`)

## DOM Structure

```text
nav.ds-sidebar[.ds-sidebar--collapsed]
├── div.ds-sidebar__header
│   ├── span.ds-sidebar__logo (solo si logo)
│   └── button.ds-sidebar__toggle
├── div.ds-sidebar__menu
│   ├── span.ds-sidebar__menu-label (solo si menuLabel)
│   └── ul.ds-sidebar__list
│       └── li → button.ds-sidebar__item[.ds-sidebar__item--selected]
│           ├── span.ds-sidebar__item-icon
│           ├── span.ds-sidebar__item-copy
│           │   ├── span.ds-sidebar__item-label
│           │   └── span.ds-sidebar__item-caption (solo si caption)
│           ├── span.ds-sidebar__badge (solo si badge)
│           └── span.ds-sidebar__status (solo si status)
└── div.ds-sidebar__secondary (solo si secondaryItems?.length)
    ├── span.ds-sidebar__menu-label (solo si secondaryLabel)
    └── ul.ds-sidebar__list (misma anatomía de ítem)
```

---

# Known Limitations

- **Icono seleccionado `#FFFFFF` no implementado:** los assets compartidos son SVGs multi-color aplanados servidos como `<img src>`; no son tintables con `currentColor`/`fill`. Solo se implementa la línea izquierda 2pt blanca + lift de fondo.
- **«Flechas de navegación» sin asset:** no hay chevron/arrow en `Icons/Menu`; el toggle usa `HamburguesaIcon`. Open question para design. El PDF tampoco aclara con qué ícono se colapsa el menú — y `HamburguesaIcon`, por nombre/carpeta, parece pertenecer conceptualmente a la opción «Menú» en sí, no a una acción de colapsar/expandir un panel ya abierto. Confirmar con design si corresponde un ícono distinto para el toggle.
- **«Mis tareas» → `MenuBandejaIcon`:** mapeo inferido (bandeja/inbox), no confirmado por el PDF.
- Anchos expandido/colapsado no medidos en PDF; se reutilizan tokens existentes.
- `logo` es un slot libre sin variante para el estado colapsado: un wordmark de texto se recorta contra el ancho reducido (`overflow: hidden` en `.ds-sidebar`). El PDF solo anota «Logo» sin distinguir tratamiento por estado; el consumidor debe pasar un logo compacto/isotipo si necesita verse bien colapsado.
- Sombra derecha y paddings de badge/status: valores provisionales (sin medición PDF de blur/spread ni caja).
- Chip de estado `#282828` sobre secundaria `#2a2927`: contraste bajo heredado del PDF; no se «arregla» en código.
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Expanded`, `Collapsed`, `Playground`).

---

# Future Improvements

- [ ] Resolver con design el asset de «Flechas de navegación» y confirmar si `HamburguesaIcon` (nominalmente el ícono de la opción «Menú») debe reemplazarse por un ícono de toggle dedicado
- [ ] Confirmar mapeo de ícono «Mis tareas»
- [ ] Medir anchos expandido/colapsado y sombra en artboard
- [ ] Evaluar íconos tintables / swap condicional si design exige ícono blanco al seleccionar
- [ ] Integrar en un patrón/screen de app-shell cuando se documente

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `SideBar` / `SideBarProps` / `SideBarItem` con estilos `ds-sidebar` según PDF p.13 SIDE BAR; export `NotificacionesIcon`; stories `Expanded`, `Collapsed`, `Playground`. |
