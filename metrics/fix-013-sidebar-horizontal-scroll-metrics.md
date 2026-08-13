# Fix — fix-013-sidebar-horizontal-scroll

## Fix — 2026-08-13T00:00:00Z
- command_origin: reporte directo de Luna (capturas de TareasPendientes/Home)
- archivos_tocados: 1 (packages/ui/src/styles.css — .ds-sidebar)
- test_reproductor: sin framework de test instalado — verificación en vivo
  (getBoundingClientRect antes/después de scrollear al máximo horizontal): sidebar
  pasa de left:0 a left:-95px, queda fuera de vista, no se mezcla con contenido
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
