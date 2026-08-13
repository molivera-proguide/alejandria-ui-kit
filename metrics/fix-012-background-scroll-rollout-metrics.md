# Fix — fix-012-background-scroll-rollout

## Fix — 2026-08-13T00:00:00Z
- command_origin: pedido directo de Luna
- archivos_tocados: 5 (tareas-pendientes.css, tareas-kanban.css,
  tareas-finalizadas.css, home.css, dashboard.css)
- test_reproductor: sin framework de test instalado — verificación en vivo en las 5
  screens a un ancho que fuerza overflow real (750-850px según la screen): el fondo
  siempre crece hasta cubrir exactamente lo scrolleable
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
- alcance: Login excluido (sin background propio, ver fix-004)
- hallazgo menor sin resolver: ~5.6px de solape dentro de una ChartCard en Home a
  850px — fuera de alcance de este fix, probablemente un min-content impreciso del
  propio componente ChartCard
