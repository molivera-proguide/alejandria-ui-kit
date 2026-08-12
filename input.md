# input.md — SideBar: ancho medido, sacar edge-toggle, colapso real en Tareas

Consolidado a partir de `drafts/sidebar-ancho-toggle-real.md` + grilling de
`/sdd-refine` (2026-08-12). Brownfield — ver `existing-arch.md` en la raíz del repo
para restricciones de stack no negociables.

**Contexto de origen:** hallazgo de Luna el 2026-08-12 durante `/sdd-checklist` de
`004-familia-tareas`/`005-alert-toast-filter` (ver `knowledge/component-roadmap.md` §
"Gaps nuevos encontrados", entrada "SideBar ancho expandido, probablemente invented").
Deliberadamente separado de esas dos features (ya `CLOSED`) porque ambas prohíben
tocar `SideBar.tsx` y esto contradice además `004-familia-tareas/constitution.md`
MUST-3. Se trata acá como su propia feature.

---

## 1. PROBLEMA

`SideBar.tsx` tiene tres deudas de fidelidad no resueltas, encontradas juntas en la
misma revisión:

1. El ancho expandido (`--ds-size-card-min-w`, 220px) es un token **reutilizado de
   otro componente, nunca medido** contra `design-reference.pdf` p.13. Medición
   preliminar (`get_drawings()` sobre el rect de fondo `#282828`) da ~102px — bien por
   debajo de los 220px actuales. El ancho colapsado (`--ds-size-control-lg`, 48px)
   tiene la misma deuda ("provisional/reutilizado", nunca medido).
2. El componente tiene un edge-toggle propio (`.ds-sidebar__edge-toggle`, chevron
   hand-drawn interno) que es una **tercera forma redundante** de colapsar el menú,
   además del heading "Menú" (ya wireado a `onToggleCollapsed`) y el ícono nuevo del
   topbar (`OpenCloseSidebarIcon`) en las screens de Tareas. El edge-toggle nunca fue
   una pieza firme: su propio changelog lo documenta como "simplificado" y su
   tamaño/posición como "provisionales, no medidos".
3. Las 3 screens de Tareas (`tareas-pendientes`, `tareas-kanban`, `tareas-finalizadas`)
   pasan `collapsed`/`onToggleCollapsed={() => undefined}` estáticos a `SideBar`, y el
   ícono del topbar tiene `onClick={() => undefined}` — el colapso no funciona pese a
   tener los controles visuales.

**Driver:** fidelidad con el PDF fuente (equipo de diseño/QA), no un reclamo de
usuario final sobre el solapamiento en viewports angostos — aunque ese solapamiento
es el síntoma que hizo visible el problema.

---

## 2. USUARIO

Equipo de diseño/QA del kit (Luna). Necesita que `SideBar` calce con el artwork real
de `design-reference.pdf` p.13 (ancho medido, no adivinado) y que el componente no
tenga controles inventados/no confirmados por el PDF (el edge-toggle).

---

## 3. DONE CRITERIA

- [ ] Ancho **expandido** de `.ds-sidebar` medido contra `design-reference.pdf` p.13
      con PyMuPDF (`get_drawings()`/`get_pixmap()` — la página mezcla capturas
      rasterizadas con vectores, no es una hoja de spec limpia).
- [ ] Ancho **colapsado** de `.ds-sidebar--collapsed` medido en el mismo sweep.
- [ ] Si el valor medido difiere de los tokens reutilizados actuales
      (`--ds-size-card-min-w` / `--ds-size-control-lg`), se crean tokens **dedicados**
      del SideBar (`--ds-size-sidebar-expanded-w`, `--ds-size-sidebar-collapsed-w`) en
      `styles.css`, dejando de reutilizar los de otros componentes.
- [ ] `SideBarChevron` y `.ds-sidebar__edge-toggle` eliminados de `SideBar.tsx`
      (componente, DOM, CSS asociado).
- [ ] El heading `.ds-sidebar__menu-heading` (con `menuLabel="Menú"`) queda como
      **único control interno** de colapso, ya wireado a `onToggleCollapsed`.
      Migra la semántica ARIA que tenía el edge-toggle: `role="button"` (o envuelto en
      un `<button>` real), `aria-expanded={!collapsed}`, `aria-label` contextual
      ("Contraer menú" / "Expandir menú").
- [ ] El ícono `OpenCloseSidebarIcon` del topbar en las 3 screens de Tareas queda como
      **control externo adicional**, wireado al mismo `onToggleCollapsed` del
      consumidor — no reemplaza al heading, coexisten sin redundancia visual (el
      edge-toggle desaparece).
- [ ] Las 3 screens (`TareasPendientes`, `TareasKanban`, `TareasFinalizadas`) ganan
      `useState` local real de colapso, **independiente por screen** (sin estado
      compartido ni persistencia entre navegaciones — no hay routing).
- [ ] `specs/004-familia-tareas/constitution.md` MUST-3 enmendada explícitamente para
      reflejar que Kanban y Finalizadas dejan de ser "composiciones estáticas" en este
      punto específico (colapso de SideBar), documentando el motivo y la fecha.
- [ ] `knowledge/components/SideBar.md` actualizado: Behavioral Contract, DOM
      Structure, Props (si cambia algo del contrato público), Accessibility, Design
      Tokens, Known Limitations (sacar las entradas ya resueltas del edge-toggle/
      anchos no medidos), Changelog → nueva entrada `0.2.0` (breaking change de DOM:
      desaparece `button.ds-sidebar__edge-toggle` del árbol).
- [ ] Verificación manual en Storybook (sin framework de test):
      `SideBar` (`Expanded`, `Collapsed`, `Playground`) + las 6 screens consumidoras
      (`Home`, `Dashboard`, `CargaDeFormulario`, `TareasPendientes`, `TareasKanban`,
      `TareasFinalizadas`) — confirmar que el nuevo ancho no rompe ningún layout y que
      el toggle real funciona desde ambos controles (heading + ícono topbar) en las 3
      screens de Tareas.
- [ ] `DECISIONS.md` registra por qué esto se separó de `004`/`005` y qué
      constitution quedó enmendada.

---

## 4. OUT OF SCOPE

- No se toca layout ni contenido de `Home`, `Dashboard`, `CargaDeFormulario` más allá
  de que sigan funcionando correctamente con el nuevo ancho (una regresión visual ahí
  sería un bug de esta feature, pero no se les agrega/cambia nada más).
- La variante p.6 (tabs + barra de progreso) de Tareas Pendientes sigue descartada —
  decisión previa de `004-familia-tareas`, no se reabre acá.
- El glifo exacto del edge-toggle ("panel de dos rectángulos" vs. chevron, pendiente
  en Known Limitations) queda **moot**: se elimina el control, no se corrige su
  glifo.
- No se agrega estado global, fetch, ni routing real — mismo criterio que
  `004-familia-tareas` PROHIBITED-3.
- Las 3 screens de Tareas siguen sin exportarse en `packages/ui/src/index.ts`
  (`004-familia-tareas` PROHIBITED-4, no se toca).

---

## 5. RESTRICCIONES TÉCNICAS

- Medir con PyMuPDF (`get_drawings()`/`get_pixmap()`/`get_text()`), nunca a ojo —
  gate de `knowledge/visual-analysis-protocol.md` (PASS 9) +
  `knowledge/reasoning/fidelity-validation.md` antes de fijar cualquier geometría
  nueva.
- **Dos fuentes de medición, no una:**
  - `knowledge/references/design-reference.pdf` p.13 ("SIDE BAR") — hoja de
    componente aislado, ya en el repo (== `Alejandria - UI Toolkit (3).pdf`, v3,
    mismo tamaño en bytes).
  - `C:\Users\LunaVioletaGonzalez\Downloads\Alejandria - Agosto 2026.pdf` (112.9MB,
    **no commiteado** — `DECISIONS.md` D008) — mockups de las screens reales, p.5
    (Tareas Pendientes), p.8 (Kanban), p.9 (Finalizadas), para ver el SideBar *en
    contexto* y confirmar el hallazgo de solapamiento en viewports angostos. No
    asumir que "no está en el repo" significa "no se puede consultar" — ya hay un
    precedente documentado en `DECISIONS.md` de ese error.
- `SideBar` debe seguir siendo **controlado-only**: sin estado interno de colapso
  (`collapsed` + `onToggleCollapsed` siguen siendo requeridos, sin default
  uncontrolled). Este draft no cambia esa garantía.
- Sin framework de test instalado — verificación manual en Storybook.
- `knowledge/design-system-rules.md` es la autoridad de estilos.
- Convención de tokens: `--ds-*` en `styles.css`.
- No instalar framework de test ni linter como efecto colateral.

---

## 6. UI / FLUJO

**Antes:**
```
div.ds-sidebar-shell
├── nav.ds-sidebar[.ds-sidebar--collapsed]
│   ├── div.ds-sidebar__header (logo)
│   ├── div.ds-sidebar__menu
│   │   ├── div.ds-sidebar__menu-heading (¡ya wireado a onToggleCollapsed!)
│   │   └── ul.ds-sidebar__list ...
│   └── div.ds-sidebar__secondary ...
└── button.ds-sidebar__edge-toggle   ← SACAR
    └── svg (SideBarChevron left|right)
```

**Después:**
```
nav.ds-sidebar[.ds-sidebar--collapsed]   ← sin wrapper .ds-sidebar-shell si ya no
│                                          hace falta straddlear el borde (confirmar
│                                          en /sdd-implement si el shell sigue
│                                          necesario por otro motivo de layout)
├── div.ds-sidebar__header (logo)
├── div.ds-sidebar__menu
│   ├── div.ds-sidebar__menu-heading   ← único control interno, ahora con
│   │                                    role="button" + aria-expanded + aria-label
│   └── ul.ds-sidebar__list ...
└── div.ds-sidebar__secondary ...
```

- **Control interno:** click en el heading "Menú" → `onToggleCollapsed()` (ya
  funcionaba; ahora además lleva la semántica ARIA migrada del edge-toggle).
- **Control externo (por consumidor):** click en `OpenCloseSidebarIcon` del topbar,
  en las 3 screens de Tareas → mismo `onToggleCollapsed` vía `useState` local de cada
  screen. Ambos controles disparan el mismo estado controlado — no hay dos fuentes de
  verdad.
- **Anchos:** valores finales pendientes del sweep PyMuPDF (Done Criteria #1/#2) —
  este documento no fija un número, eso es trabajo de `/sdd-implement` con evidencia
  medida, no una decisión de producto a asumir acá.
- **Independencia entre screens:** cada una de las 3 screens de Tareas mantiene su
  propio `useState` de colapso — no se sincroniza entre `TareasPendientes`,
  `TareasKanban`, `TareasFinalizadas` (no hay routing que las conecte).

---

## Referencias

- `knowledge/component-roadmap.md` § "Gaps nuevos encontrados" — hallazgo original.
- `knowledge/components/SideBar.md` — contrato actual a actualizar.
- `specs/004-familia-tareas/constitution.md` MUST-3 / PROHIBITED-1 — a enmendar
  (MUST-3) y a razonar explícitamente por qué esta feature nueva sí puede tocar
  `SideBar.tsx` pese al PROHIBITED-1 de esa constitution ya `CLOSED` (constitutions
  distintas, features distintas — no se edita el PROHIBITED-1 de 004, solo se explica
  la relación en `DECISIONS.md`).
- `specs/005-alert-toast-filter/constitution.md` — mismo tipo de PROHIBITED sobre
  `SideBar`, misma relación que con `004`.
- `specs/003-home-dashboard/`, `specs/002-bg-texture/` — consumidores `CLOSED` que no
  se modifican pero deben seguir funcionando.
- `packages/ui/src/components/SideBar.tsx` — a modificar.
- `packages/ui/src/screens/tareas-pendientes|tareas-kanban|tareas-finalizadas/` — a
  cablear.
- `knowledge/references/design-reference.pdf` p.13 — fuente de medición del
  componente aislado.
- `C:\Users\LunaVioletaGonzalez\Downloads\Alejandria - Agosto 2026.pdf` p.5/8/9 —
  fuente de medición de las screens en contexto.
- `DECISIONS.md` D008 — por qué el segundo PDF no está commiteado, y el precedente
  del error de no consultarlo por asumir que no estaba disponible.
