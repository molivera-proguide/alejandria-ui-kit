import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eye } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Alejandria/Card",
  component: Card,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    actions: { control: false },
    footer: { control: false },
    children: { control: false }
  },
  args: {
    eyebrow: "Mision",
    title: "Evacuacion",
    description: "Riesgo alto, avance estable y recursos en movimiento."
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 420, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithActionsAndFooter: Story = {
  render: () => (
    <Card
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
      <div style={{ alignItems: "center", display: "grid", gap: 18, gridTemplateColumns: "auto 1fr" }}>
        <ProgressRing value={75} label="avance" tone="warning" />
        <div style={{ display: "grid", gap: 6 }}>
          <strong style={{ fontFamily: "var(--ds-font-display)", fontSize: "1.8rem", lineHeight: 1 }}>
            348 personas
          </strong>
          <span style={{ color: "var(--ds-color-ink-soft)", fontFamily: "var(--ds-font-mono)", fontSize: ".72rem" }}>
            Fuera de zona critica
          </span>
        </div>
      </div>
    </Card>
  )
};

export const BodyOnly: Story = {
  render: () => (
    <Card>
      <div style={{ color: "var(--ds-color-ink-soft)", fontFamily: "var(--ds-font-mono)", fontSize: ".8rem" }}>
        Panel sin encabezado para contenido compacto.
      </div>
    </Card>
  )
};
