# Handoff — Iniciar Fase 1 (/sdd-refine) para drafts de componentes de formulario
Fecha: 2026-08-07
Tipo: GATE
Sesión de origen: Fase 0 (/sdd-scan) recién cerrada — Fase 1 (/sdd-refine) no iniciada
Próximo comando sugerido: `/sdd-refine`

---

## Contexto del proyecto
`alejandria-ui-kit` construye componentes de UI a partir del PDF de diseño (`knowledge/references/design-reference.pdf`), con `knowledge/` como fuente de verdad visual. El PDF se actualizó hoy a una v3 con contenido nuevo de formularios.
→ Ver: `existing-arch.md`, `CLAUDE.md`, `knowledge/index.md`, `knowledge/references/pdf-text-extract.md`

## Estado al momento del handoff

✅ Completado:
- Fase 0 (`/sdd-scan`): `existing-arch.md` + `graph/domain.yaml` generados, confirmados y commiteados (`c4eec3e`).
- `knowledge/references/pdf-text-extract.md` regenerado para la v3 del PDF (18→24 páginas). Extracción verbatim vía PyMuPDF (`fitz`), con page-map completo y diffs v2→v3 anotados por página.
- Verificación cruzada del spec de SCROLLBAR (p.24, nueva) contra `Scrollbar.tsx`/`styles.css`: **coincide** (#494949 track, #2a2927 handle, medidas ÷2 consistentes) — no es un gap de implementación, solo la primera vez que tiene página propia en el PDF.

🔄 En curso:
- Ninguno — el trabajo de esta sesión (scan + extract) queda cerrado.

🚧 Bloqueado / pendiente de decisión:
- Ninguno — `knowledge/references/design-reference.pdf` (v3) y su extract quedaron commiteados en esta misma sesión.

## Caminos descartados (intentados sin éxito)
- **Leer el PDF con el tool nativo `Read` (pages param)** — falló porque `pdftoppm`/poppler no está instalado en este entorno Windows.
- **Extraer texto con `fitz`/PyMuPDF imprimiendo a stdout sin especificar encoding** — falló con `UnicodeEncodeError` (la consola Windows usa cp1252 por default, que no soporta ligaduras como 'ﬁ' presentes en p.22). Solucionado escribiendo directo a archivo con `encoding='utf-8'`.

## Foco de la próxima sesión

Correr `/sdd-refine` sobre `drafts/`, con foco en los componentes **FORM** (PDF v3 p.17–21: Login, Input, Checkables, Adjuntos, Datepicker — ver `knowledge/references/pdf-text-extract.md`). Concretamente:

1. Redactar en `drafts/` el brief de Form a partir de las 5 sub-specs (p.17–21).
2. Durante el grilling, decidir alcance de arquitectura: ¿un `Form` compuesto único, o field primitives sueltos (label/input/checkable/file-upload/datepicker) que se combinan? — el PDF especifica visual, no arquitectura de componentes.
3. **Preguntar explícitamente si estos 3 hallazgos adyacentes entran en esta feature o quedan afuera:**
   - **p.22 ALERT** trae un patrón de diálogo confirm/cancel ("Confirmación de acción") que resuelve el gap **Modal/Dialog** ya señalado como High priority en `knowledge/component-roadmap.md` (hallazgo del eval baseline, no de esta sesión).
   - **p.23 FILTER** es sección nueva pero con spec explícitamente incompleta (nota del propio diseñador en el PDF: "Me falta desarrollar el desplegable del funnel") — no debería entrar en scope sin confirmar con diseño.
   - **p.24 SCROLLBAR** no es un gap (ver arriba) — mencionar solo si conviene actualizar la cita desactualizada en el comment de `Scrollbar.tsx` (dice "PDF p.13 MISCELÁNEAS", título que ya no existe desde v2). Cosmético, candidato a `/sdd-fix` aparte, no bloqueante.
4. `knowledge/component-roadmap.md` todavía dice que Form "no está listo, el diseño lo sigue trabajando" (nota del 2026-08-06) — esa nota queda **desactualizada** por esta v3; actualizarla como parte de esta feature o en un fix aparte, a decisión del humano.

## Decisiones relevantes
No hay `DECISIONS.md` todavía — sin feature/brief abierto, nada que trazar.

## Skills / comandos sugeridos para la próxima sesión
- `/sdd-refine` — el único comando de esta próxima sesión (mismo acotamiento que el handoff de Fase 0).

## Información redactada
Ninguna.
