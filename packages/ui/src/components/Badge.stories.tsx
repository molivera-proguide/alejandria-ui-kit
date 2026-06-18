import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Alejandria/Badge Chip",
  component: Badge,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "danger"]
    }
  },
  args: {
    children: "En espera",
    tone: "neutral",
    dot: true
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 360, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      <Badge tone="neutral" dot>
        En espera
      </Badge>
      <Badge tone="info" dot>
        Todo el pais
      </Badge>
      <Badge tone="success" dot>
        Lote 1
      </Badge>
      <Badge tone="warning" dot>
        Simulacion
      </Badge>
      <Badge tone="danger" dot>
        Alerta nueva
      </Badge>
    </div>
  )
};

export const WithoutDot: Story = {
  args: {
    children: "Critico",
    tone: "danger",
    dot: false
  }
};
