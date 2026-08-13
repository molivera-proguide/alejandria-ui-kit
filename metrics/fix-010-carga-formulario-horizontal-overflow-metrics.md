# Fix — fix-010-carga-formulario-horizontal-overflow

## Fix — 2026-08-13T00:00:00Z
- command_origin: reporte directo de Luna
- archivos_tocados: 2 (carga-de-formulario.css, styles.css § .ds-sidebar)
- test_reproductor: sin framework de test instalado — verificación en vivo (Browser
  pane, resize a distintos anchos hasta encontrar el punto de desborde real en 768px,
  getBoundingClientRect antes/después de scroll)
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
- alcance: solo CargaDeFormulario + ajuste compartido de SideBar — el mismo patrón
  probablemente existe en otras screens con background, pendiente de confirmación de
  Luna antes de extenderlo
