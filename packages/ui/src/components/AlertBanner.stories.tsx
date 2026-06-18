import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle2, Info, RadioTower } from "lucide-react";
import { AlertBanner } from "./AlertBanner";
import { Button } from "./Button";

const meta = {
  title: "Alejandria/AlertBanner",
  component: AlertBanner,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "success", "warning", "danger"]
    },
    icon: { control: false },
    action: { control: false }
  },
  args: {
    tone: "info",
    title: "Nueva senal recibida",
    description: "Se detecto actividad relevante en la zona monitoreada."
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 620, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <AlertBanner tone="info" icon={<Info />} title="Nueva senal recibida" description="Revision disponible para operador." />
      <AlertBanner tone="success" icon={<CheckCircle2 />} title="Mision estabilizada" description="El avance supera el umbral esperado." />
      <AlertBanner tone="warning" icon={<RadioTower />} title="Comunicacion intermitente" description="Una unidad reporta latencia alta." />
      <AlertBanner tone="danger" icon={<AlertTriangle />} title="Alerta critica" description="La zona requiere reasignacion inmediata." />
    </div>
  )
};

export const WithAction: Story = {
  args: {
    tone: "danger",
    title: "Alerta critica",
    description: "La zona requiere reasignacion inmediata.",
    icon: <AlertTriangle />,
    action: (
      <Button size="sm" variant="danger">
        Resolver
      </Button>
    )
  }
};
