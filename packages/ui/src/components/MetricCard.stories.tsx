import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricCard } from "./MetricCard";

const meta = {
  title: "Alejandria/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "alejandria-dark",
      values: [
        { name: "alejandria-dark", value: "#060606" },
        { name: "alejandria-paper", value: "#eef4f3" }
      ]
    }
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "good", "watch", "critical"]
    },
    appearance: {
      control: "select",
      options: ["reporting", "ficha"]
    }
  },
  args: {
    label: "Riesgo operativo",
    value: "87%",
    change: "critico",
    tone: "critical",
    appearance: "reporting"
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
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
        width: "100%"
      }}
    >
      <MetricCard label="Riesgo operativo" value="87%" change="critico" tone="critical" />
      <MetricCard label="Unidades activas" value="50" change="en campo" tone="good" />
      <MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" />
      <MetricCard label="Nodos enlazados" value="15" change="red viva" tone="neutral" />
    </div>
  )
};

export const Scales: Story = {
  name: "Reporting vs Ficha",
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
        width: "100%"
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <span
          style={{
            color: "#8a8b87",
            fontFamily: "var(--ds-font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          }}
        >
          Reporting
        </span>
        <MetricCard
          label="Hectopascales"
          value="1013"
          change="PRECIPITACIONES"
          appearance="reporting"
        />
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <span
          style={{
            color: "#8a8b87",
            fontFamily: "var(--ds-font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          }}
        >
          En ficha
        </span>
        <MetricCard
          label="Hectopascales"
          value="1013"
          change="PRECIPITACIONES"
          appearance="ficha"
        />
      </div>
    </div>
  )
};
