import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinearBarChartCard } from "./LinearBarChartCard";

const meta = {
  title: "Alejandria/LinearBarChartCard",
  component: LinearBarChartCard,
  parameters: {
    layout: "centered"
  },
  decorators: [
    // Same "ChartCard's own bg is translucent" caveat as ChartCard.stories.tsx.
    (Story) => (
      <div style={{ background: "var(--ds-color-pdf-surface)", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof LinearBarChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * PDF GRAFICOS p.9 "Barras lineal horizontal" — "HISTÓRICO INCENDIOS", `doc[8]`. Top-ranked row
 * ("Córdoba", 30%) is `highlighted` per the PDF's own red accent on the first item.
 */
export const Horizontal: Story = {
  render: () => (
    <LinearBarChartCard
      title="Histórico incendios"
      footer="Noviembre - Febrero"
      data={[
        { label: "Córdoba", value: 30, highlighted: true },
        { label: "Neuquén", value: 28 },
        { label: "Santa Cruz", value: 25 },
        { label: "Chaco", value: 20 }
      ]}
    />
  )
};

/**
 * PDF GRAFICOS p.9 "Barras lineal vertical" — "PRECIPITACIONES ESTACIONALES", `doc[8]`. Values in
 * `mm`; one bar per month is `highlighted` per the PDF's own red accent.
 */
export const Vertical: Story = {
  render: () => (
    <LinearBarChartCard
      title="Precipitaciones estacionales"
      footer="Promedio regional"
      orientation="vertical"
      unit="mm"
      data={[
        { group: "NOV", label: "60mm", value: 60 },
        { group: "NOV", label: "55mm", value: 55 },
        { group: "NOV", label: "45mm", value: 45 },
        { group: "DIC", label: "55mm", value: 55 },
        { group: "DIC", label: "42mm", value: 42 },
        { group: "ENE", label: "60mm", value: 60, highlighted: true },
        { group: "ENE", label: "54mm", value: 54 },
        { group: "FEB", label: "45mm", value: 45 },
        { group: "MAR", label: "42mm", value: 42 }
      ]}
    />
  )
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(280px, 1fr))" }}>
      <LinearBarChartCard
        title="Histórico incendios"
        footer="Noviembre - Febrero"
        data={[
          { label: "Córdoba", value: 30, highlighted: true },
          { label: "Neuquén", value: 28 },
          { label: "Santa Cruz", value: 25 },
          { label: "Chaco", value: 20 }
        ]}
      />
      <LinearBarChartCard
        title="Precipitaciones estacionales"
        footer="Promedio regional"
        orientation="vertical"
        unit="mm"
        data={[
          { group: "NOV", label: "60mm", value: 60 },
          { group: "NOV", label: "55mm", value: 55 },
          { group: "NOV", label: "45mm", value: 45 },
          { group: "DIC", label: "55mm", value: 55 },
          { group: "DIC", label: "42mm", value: 42 },
          { group: "ENE", label: "60mm", value: 60, highlighted: true },
          { group: "ENE", label: "54mm", value: 54 },
          { group: "FEB", label: "45mm", value: 45 },
          { group: "MAR", label: "42mm", value: 42 }
        ]}
      />
    </div>
  )
};
