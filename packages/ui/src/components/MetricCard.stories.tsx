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
    // Outer decorator stays opaque `--ds-color-pdf-surface-warm` (#2a2927) — deliberately NOT the
    // same `--ds-color-pdf-surface` (#060606) the card's own 20%-opacity fill is built from:
    // rgb(6 6 6 / 0.2) composited over a #060606 backdrop resolves back to #060606 exactly, so the
    // "fondo con 20% opacidad" the PDF calls for was rendering as visually indistinguishable from
    // no background at all (Storybook backgrounds addon is not registered, so this decorator is
    // the only thing standing in for the real "pantalla de reporting"). A backdrop lighter than
    // the fill's own base color lets the darkening actually show.
    (Story) => (
      <div style={{ background: "var(--ds-color-pdf-surface-warm)", minWidth: 340, padding: 32 }}>
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
        display: "flex",
        flexWrap: "wrap",
        gap: 14
      }}
    >
      <MetricCard
        label="Riesgo operativo"
        value="87%"
        change="critico"
        tone="critical"
        utilities={[{ type: "edit", onClick: () => undefined }, { type: "delete", onClick: () => undefined }]}
      />
      <MetricCard
        label="Unidades activas"
        value="50"
        change="en campo"
        tone="good"
        utilities={[{ type: "edit", onClick: () => undefined }, { type: "delete", onClick: () => undefined }]}
      />
      <MetricCard
        label="Alertas abiertas"
        value="23"
        change="7 sin leer"
        tone="watch"
        utilities={[{ type: "edit", onClick: () => undefined }, { type: "delete", onClick: () => undefined }]}
      />
      <MetricCard
        label="Nodos enlazados"
        value="15"
        change="red viva"
        tone="neutral"
        utilities={[{ type: "edit", onClick: () => undefined }, { type: "delete", onClick: () => undefined }]}
      />
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
        {/* PDF METRIC CARD p.11's own "Reporting vs Ficha" example: título "HUMEDAD", número
            grande "87%", referencia "Hectopascales" — was mixing three different metrics from
            that same PDF section ("Hectopascales" as label, "1013"/"PRECIPITACIONES" belong to a
            third, Precipitaciones). "Humedad" is short enough to never wrap or reach the utility
            icons, unlike "Hectopascales". */}
        <MetricCard
          label="Humedad"
          value="87%"
          change="Hectopascales"
          appearance="reporting"
          utilities={[{ type: "edit", onClick: () => undefined }, { type: "delete", onClick: () => undefined }]}
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
        {/* appearance="ficha" has no background of its own by design — PDF legend: "sin fondo,
            respeta el fondo de la ficha que lo contiene". Demoing it on Storybook's own light
            canvas with no wrapper made it nearly invisible; this dark panel stands in for the
            real ficha container it's always meant to sit inside. */}
        <div style={{ background: "var(--ds-color-pdf-surface-warm)", display: "flex", padding: 16 }}>
          <MetricCard
            label="Humedad"
            value="87%"
            change="Hectopascales"
            appearance="ficha"
          />
        </div>
      </div>
    </div>
  )
};
