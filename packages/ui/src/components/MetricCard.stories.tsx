import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, AlertTriangle, RadioTower, Shield } from "lucide-react";
import { MetricCard } from "./MetricCard";

const meta = {
  title: "Alejandria/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "good", "watch", "critical"]
    }
  },
  args: {
    label: "Riesgo operativo",
    value: "87%",
    change: "critico",
    tone: "critical"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 340, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(4, minmax(180px, 1fr))" }}>
      <MetricCard label="Riesgo operativo" value="87%" change="critico" tone="critical"/>
      <MetricCard label="Unidades activas" value="50" change="en campo" tone="good"/>
      <MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch"/>
      <MetricCard label="Nodos enlazados" value="15" change="red viva"/>
    </div>
  )
};
