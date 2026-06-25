import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChartCard } from "./BarChartCard";
import { ChartCard } from "./ChartCard";
import { DonutChartCard } from "./DonutChartCard";
import { LineChartCard } from "./LineChartCard";

const meta = {
  title: "Alejandria/ChartCard",
  component: ChartCard,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <ChartCard title="Contenedor base" footer="Pie de tarjeta con texto descriptivo">
      <div
        style={{
          alignItems: "center",
          border: "1px dashed rgb(255 255 255 / 0.18)",
          color: "#8a8b87",
          display: "grid",
          fontFamily: "var(--ds-font-display)",
          fontSize: "0.72rem",
          height: 120,
          justifyItems: "center",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          width: "100%"
        }}
      >
        Slot para children
      </div>
    </ChartCard>
  )
};

export const BarChart: Story = {
  render: () => (
    <BarChartCard
      title="Incidentes por zona"
      footer="Sur concentra el 42% del total semanal"
      data={[
        { label: "Norte", value: 18 },
        { label: "Centro", value: 32 },
        { label: "Sur", value: 44 },
        { label: "Este", value: 26 }
      ]}
    />
  )
};

export const DonutChart: Story = {
  render: () => (
    <DonutChartCard
      title="Tareas"
      footer="Seguimiento operativo"
      data={[
        { label: "En fecha", value: 45, color: "#ffffff" },
        { label: "Atrasadas", value: 30, color: "#8a8b87" }
      ]}
      primaryStat={{
        value: "45%",
        label: "En fecha"
      }}
      secondaryStat={{
        value: "30%",
        label: "Atrasadas"
      }}
    />
  )
};

export const LineChart: Story = {
  render: () => (
    <LineChartCard
      title="Alertas por hora"
      footer="Pico registrado a las 18:00 con 38 eventos"
      data={[
        { label: "08", value: 12 },
        { label: "10", value: 18 },
        { label: "12", value: 24 },
        { label: "14", value: 20 },
        { label: "16", value: 30 },
        { label: "18", value: 38 }
      ]}
    />
  )
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(280px, 1fr))" }}>
      <BarChartCard
        title="Incidentes por zona"
        footer="Sur concentra el 42% del total semanal"
        data={[
          { label: "Norte", value: 18 },
          { label: "Centro", value: 32 },
          { label: "Sur", value: 44 },
          { label: "Este", value: 26 }
        ]}
      />
      <DonutChartCard
        title="Tareas"
        footer="Seguimiento operativo"
        data={[
          { label: "En fecha", value: 45, color: "#ffffff" },
          { label: "Atrasadas", value: 30, color: "#8a8b87" }
        ]}
        primaryStat={{
          value: "45%",
          label: "En fecha"
        }}
        secondaryStat={{
          value: "30%",
          label: "Atrasadas"
        }}
      />
      <LineChartCard
        title="Alertas por hora"
        footer="Pico registrado a las 18:00 con 38 eventos"
        data={[
          { label: "08", value: 12 },
          { label: "10", value: 18 },
          { label: "12", value: 24 },
          { label: "14", value: 20 },
          { label: "16", value: 30 },
          { label: "18", value: 38 }
        ]}
      />
      <BarChartCard
        title="Recursos desplegados"
        footer="Incremento del 12% respecto al día anterior"
        data={[
          { label: "Lun", value: 40 },
          { label: "Mar", value: 52 },
          { label: "Mie", value: 48 },
          { label: "Jue", value: 61 },
          { label: "Vie", value: 55 }
        ]}
      />
    </div>
  )
};
