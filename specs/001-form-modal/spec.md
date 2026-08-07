# Spec — 001-form-modal

## User Stories

### US-1 — FormTextInput
- Given un consumidor del kit necesita un input de texto (variante `login` o `default`)
- When lo renderiza con label, valor y estado (activo / error / disabled)
- Then ve los estilos exactos de PDF v3 p.17 (login) o p.18 (default) según
  variante, con label flotante Source Code Light y transición CSS simple
  estático↔activo.

### US-2 — FormSelect
- Given un consumidor necesita un select único o multiselect
- When el campo está activo
- Then el desplegable se superpone al input sin empujar layout, y al elegir
  una opción el desplegable se centra en ella (PDF p.18).

### US-3 — FormCheckable
- Given un consumidor necesita checkbox, radio o switch, con o sin descripción
- When renderiza el componente con `description` opcional
- Then ve los colores/estilos exactos de PDF p.19 según el sub-tipo elegido.

### US-4 — FormFileUpload
- Given un consumidor necesita subir uno o más archivos (PDF/JPG/PNG/DOC)
- When arrastra un archivo sobre la zona o hace click
- Then ve highlight de la zona (drag) o el selector nativo (click), y el
  estado "empty" se superpone al input activo (PDF p.20).

### US-5 — FormDatePicker
- Given un consumidor necesita elegir fecha y hora
- When abre el calendario
- Then ve el grid de días y el selector de hora con los estilos de PDF p.21
  (layout de grid confirmado contra la página del PDF, no solo el extract).

### US-6 — Modal (Confirmación de acción)
- Given un consumidor necesita confirmar una acción irreversible
- When invoca el Modal con título, texto y 2 acciones
- Then ve el diálogo con los estilos exactos de PDF p.22 y puede confirmar o
  cancelar vía las 2 acciones configurables.

## Fuera de scope (v1)
- **FILTER (p.23)** — spec incompleta; el propio diseñador la marca sin
  terminar ("me falta desarrollar el desplegable del funnel").
- **Fix de comentario desactualizado en `Scrollbar.tsx`** — cosmético, no es
  gap de implementación; va por `/sdd-fix` aparte.
- **Validación con lógica (client/server)** — el kit es de componentes puros,
  sin persistencia; `error` es solo visual, controlado por el consumidor.
- **Autoguardado / abandono de formulario** — responsabilidad de quien
  consume el kit, no del kit en sí.
- **Estados `readonly` y `loading`** — no especificados por el PDF; se piden
  como feature aparte si un consumidor los necesita.
- **Variantes "Alert Sigcat" y "Tarea realizada" (p.22)** — son
  notificaciones, no diálogos modales; no resuelven el gap Modal/Dialog.
- **Drag&drop avanzado** (preview de archivo, progreso, reorder) — el PDF no
  especifica esta interacción más allá de la intención del diseñador.

## Measurable Process Outcomes (DX)
- **DX-001**: el agente completa la implementación de esta feature con menos
  de 2 ciclos de autocorrección (Rework) por componente.
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
