import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, AlertTriangle, ArrowRight, Crosshair, Filter, RadioTower, Search, Shield } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { MetricCard } from "./MetricCard";
import { ProgressRing } from "./ProgressRing";
import { TaskCard } from "./TaskCard";
import { TextField } from "./TextField";

const meta = {
  title: "Alejandria/Overview",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const OperationsConsole: Story = {
  render: () => (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 28px 28px, linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 28px 28px, var(--ds-color-paper)",
        color: "var(--ds-color-ink)",
        display: "grid",
        gap: 18,
        minHeight: "100vh",
        padding: 24
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between" }}>
        <div>
          <Badge tone="danger" dot>
            Alerta nueva
          </Badge>
          <h1
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: "2.4rem",
              lineHeight: 1,
              margin: "12px 0 0",
              textTransform: "uppercase"
            }}
          >
            Alejandria UI
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" iconLeft={<Filter />}>
            Filtrar
          </Button>
          <Button iconRight={<ArrowRight />}>Asignar</Button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <MetricCard label="Riesgo operativo" value="87%" change="critico" tone="critical" icon={<AlertTriangle />} />
        <MetricCard label="Unidades activas" value="50" change="en campo" tone="good" icon={<Shield />} />
        <MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" icon={<RadioTower />} />
        <MetricCard label="Nodos enlazados" value="15" change="red viva" icon={<Activity />} />
      </div>

      <div style={{ alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "1.3fr .7fr" }}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <TaskCard
            code="#1232142342 - 3408473"
            status="En espera"
            title="Verificar zona costera"
            description="Cruce de datos con alerta satelital y registro de dependencia."
            meta={["Dependencia Sur", "Prioridad alta", "D+02"]}
            progress={36}
            tone="danger"
          />
          <TaskCard
            code="#1232142342 - 3408474"
            status="Asignada"
            title="Evacuacion barrio sur"
            description="Despacho de recursos y seguimiento visual en mapa operativo."
            meta={["Lote 1", "2 horas", "5 unidades"]}
            progress={72}
            tone="success"
          />
          <TaskCard
            code="#1232142342 - 3408475"
            status="Pendiente"
            title="Analisis de evidencia"
            description="Validacion de imagenes entrantes y correlacion con reportes."
            meta={["IA", "Fotos", "Operador 08"]}
            progress={44}
            tone="warning"
          />
          <TaskCard
            code="#1232142342 - 3408476"
            status="Monitoreo"
            title="Ciberseguridad"
            description="Revision de sesiones y bloqueos sobre el perimetro."
            meta={["Nodo 4", "Red interna", "Bajo"]}
            progress={18}
          />
        </div>

        <Card
          eyebrow="Mision"
          title="Pronostico"
          description="Panel compuesto para estados, progreso, filtros y lectura rapida."
          actions={<Crosshair />}
          footer={
            <>
              <Badge tone="info">todo el pais</Badge>
              <Button size="sm" variant="secondary">
                Ver log
              </Button>
            </>
          }
        >
          <div style={{ alignItems: "center", display: "grid", gap: 18, justifyItems: "center" }}>
            <ProgressRing value={75} label="avance" tone="warning" size="lg" />
            <TextField label="Buscar tarea" placeholder="ID, zona o dependencia" iconLeft={<Search />} />
          </div>
        </Card>
      </div>
    </div>
  )
};
