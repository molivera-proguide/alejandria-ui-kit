import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  ClipboardList,
  Crosshair,
  Database,
  Eye,
  Filter,
  Layers3,
  Lock,
  MapPin,
  RadioTower,
  Search,
  Shield,
  Target,
  Users
} from "lucide-react";
import { Badge, Button, Card, MetricCard, ProgressRing, TaskCard, TextField } from "@alejandria/ui-kit";
import mapImage from "./assets/alejandria-map.jpg";

const navItems = [
  { label: "Mision", icon: <Target /> },
  { label: "Tareas", icon: <ClipboardList /> },
  { label: "Mapa", icon: <MapPin /> },
  { label: "Datos", icon: <Database /> },
  { label: "Docs", icon: <BookOpen /> }
];

const metrics = [
  { label: "Riesgo operativo", value: "87%", change: "critico", tone: "critical" as const, icon: <AlertTriangle /> },
  { label: "Unidades activas", value: "50", change: "en campo", tone: "good" as const, icon: <Shield /> },
  { label: "Alertas abiertas", value: "23", change: "7 sin leer", tone: "watch" as const, icon: <RadioTower /> },
  { label: "Nodos enlazados", value: "15", change: "red viva", tone: "neutral" as const, icon: <Activity /> }
];

const tasks = [
  {
    code: "#1232142342 - 3408473",
    status: "En espera",
    title: "Verificar zona costera",
    description: "Cruce de datos satelitales y dependencia policial.",
    meta: ["D+02", "Prioridad alta", "Sur"],
    progress: 36,
    tone: "danger" as const
  },
  {
    code: "#1232142342 - 3408474",
    status: "Asignada",
    title: "Evacuacion barrio sur",
    description: "Despacho de recursos con seguimiento visual en mapa.",
    meta: ["Lote 1", "2 horas", "5 unidades"],
    progress: 72,
    tone: "success" as const
  },
  {
    code: "#1232142342 - 3408475",
    status: "Pendiente",
    title: "Analisis de evidencia",
    description: "Validacion de imagenes entrantes y reportes asociados.",
    meta: ["IA", "Fotos", "Operador 08"],
    progress: 44,
    tone: "warning" as const
  }
];

const feed = [
  { id: "EV", text: "Evacuacion del barrio sur iniciada", tag: "D+01" },
  { id: "HC", text: "Helicoptero desplaza Chaco", tag: "D+02" },
  { id: "EV", text: "Ruta costera cerrada por anegamiento", tag: "D+03" },
  { id: "IA", text: "Coincidencia visual encontrada", tag: "D+04" }
];

export function App() {
  return (
    <div className="ops-app">
      <aside className="ops-rail">
        <div className="ops-brand" aria-label="Alejandria">
          <span className="ops-brand__mark">A</span>
          <span className="ops-brand__signal" />
        </div>

        <nav className="ops-nav" aria-label="Principal">
          {navItems.map((item, index) => (
            <button className={index === 0 ? "ops-nav__item ops-nav__item--active" : "ops-nav__item"} key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ops-rail__footer">
          <button className="ops-nav__item" aria-label="Alertas">
            <Bell />
            <span>Alertas</span>
          </button>
          <button className="ops-nav__item" aria-label="Sesion segura">
            <Lock />
            <span>Seguro</span>
          </button>
        </div>
      </aside>

      <main className="ops-main">
        <header className="ops-command">
          <div className="ops-command__title">
            <Badge tone="danger" dot>
              Alerta nueva
            </Badge>
            <h1>Alejandria</h1>
            <p>Centro de control / evacuacion barrio sur</p>
          </div>

          <div className="ops-command__tools">
            <TextField label="Busqueda" placeholder="ID, zona o dependencia" iconLeft={<Search />} />
            <Button variant="secondary" iconLeft={<Filter />}>
              Filtros
            </Button>
            <Button iconLeft={<Crosshair />}>Asignar</Button>
          </div>
        </header>

        <section className="ops-map" aria-label="Mapa operativo">
          <img className="ops-map__image" src={mapImage} alt="" aria-hidden="true" />
          <div className="ops-map__scan" aria-hidden="true" />

          <div className="ops-map__topline">
            <Badge tone="info" dot>
              Los Rios / Rio Negro
            </Badge>
            <div className="ops-timer">
              <span>Tiempo mision</span>
              <strong>00:01:45</strong>
            </div>
          </div>

          <div className="ops-map__marker ops-map__marker--one" />
          <div className="ops-map__marker ops-map__marker--two" />

          <Card
            className="ops-map__panel"
            eyebrow="Mision"
            title="Evacuacion"
            description="Riesgo alto, avance estable y recursos en movimiento."
            actions={<Eye />}
            footer={
              <>
                <Badge tone="success">Lote 1</Badge>
                <Button size="sm" variant="secondary">
                  Ver tarea
                </Button>
              </>
            }
          >
            <div className="ops-map__panel-grid">
              <ProgressRing value={75} label="avance" tone="warning" />
              <div>
                <strong>348 personas</strong>
                <span>fuera de zona critica</span>
                <strong>50 km/h</strong>
                <span>viento operativo</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="ops-metrics" aria-label="Estado operativo">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="ops-lower">
          <div className="ops-board">
            <div className="ops-section-head">
              <div>
                <Badge tone="neutral">5 tareas pendientes</Badge>
                <h2>Tareas en curso</h2>
              </div>
              <Button size="sm" variant="ghost">
                Ver todas
              </Button>
            </div>

            <div className="ops-task-grid">
              {tasks.map((task) => (
                <TaskCard key={task.code} {...task} />
              ))}
            </div>
          </div>

          <div className="ops-side">
            <Card
              eyebrow="Pronostico"
              title="Recursos"
              actions={<Users />}
              footer={
                <>
                  <Badge tone="warning">simulacion</Badge>
                  <Button size="sm" variant="secondary">
                    Recalcular
                  </Button>
                </>
              }
            >
              <div className="ops-resource-list">
                <div>
                  <span>Cobertura</span>
                  <strong>87%</strong>
                </div>
                <div>
                  <span>Disponibles</span>
                  <strong>37</strong>
                </div>
                <div>
                  <span>Bloqueos</span>
                  <strong>0</strong>
                </div>
              </div>
            </Card>

            <Card eyebrow="Log IA" title="Eventos">
              <div className="ops-feed">
                {feed.map((item) => (
                  <div className="ops-feed__item" key={`${item.id}-${item.tag}`}>
                    <Badge tone={item.id === "IA" ? "info" : "neutral"}>{item.id}</Badge>
                    <span>{item.text}</span>
                    <strong>{item.tag}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
