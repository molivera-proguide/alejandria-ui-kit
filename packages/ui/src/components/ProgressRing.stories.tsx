import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Alejandria/ProgressRing",
  component: ProgressRing,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "success", "warning", "danger"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 }
    }
  },
  args: {
    value: 75,
    label: "avance",
    tone: "warning",
    size: "md"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 20 }}>
      <ProgressRing value={45} label="red" />
      <ProgressRing value={72} label="avance" tone="success" />
      <ProgressRing value={75} label="mision" tone="warning" />
      <ProgressRing value={18} label="riesgo" tone="danger" />
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 20 }}>
      <ProgressRing value={75} label="sm" tone="warning" size="sm" />
      <ProgressRing value={75} label="md" tone="warning" size="md" />
      <ProgressRing value={75} label="lg" tone="warning" size="lg" />
    </div>
  )
};
