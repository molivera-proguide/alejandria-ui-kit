import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskCard } from "./TaskCard";

const meta = {
  title: "Alejandria/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "success", "warning", "danger"]
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 }
    }
  },
  args: {
    code: "#1232142342 - 3408473",
    status: "En espera",
    title: "Verificar zona costera",
    description: "Cruce de datos satelitales y dependencia policial.",
    meta: ["D+02", "Prioridad alta", "Sur"],
    progress: 36,
    tone: "danger"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 360, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(260px, 1fr))" }}>
      <TaskCard
        code="#1232142342 - 3408473"
        status="En espera"
        title="Verificar zona costera"
        description="Cruce de datos satelitales y dependencia policial."
        meta={["D+02", "Prioridad alta", "Sur"]}
        progress={36}
        tone="danger"
      />
      <TaskCard
        code="#1232142342 - 3408474"
        status="Asignada"
        title="Evacuacion barrio sur"
        description="Despacho de recursos con seguimiento visual en mapa."
        meta={["Lote 1", "2 horas", "5 unidades"]}
        progress={72}
        tone="success"
      />
      <TaskCard
        code="#1232142342 - 3408475"
        status="Pendiente"
        title="Analisis de evidencia"
        description="Validacion de imagenes entrantes y reportes asociados."
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
  )
};
