import type { Meta, StoryObj } from "@storybook/react-vite";
import { Scrollbar } from "./Scrollbar";

const meta = {
  title: "Alejandria/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "pdf-misc",
      values: [{ name: "pdf-misc", value: "#e6e6e6" }]
    }
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 }
    },
    thumbSize: {
      control: { type: "range", min: 8, max: 60, step: 0.1 }
    }
  },
  args: {
    value: 0,
    thumbSize: 17.4,
    label: "Desplazamiento vertical"
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          height: 121.5,
          justifyContent: "center",
          padding: 48
        }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Scrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Reference pose (PDF p.13): thumb near the top of the track. */
export const Playground: Story = {};

export const Positions: Story = {
  render: () => (
    <div style={{ alignItems: "stretch", display: "flex", gap: 32, height: 121.5 }}>
      <Scrollbar value={0} label="Inicio" />
      <Scrollbar value={40} label="Intermedio" />
      <Scrollbar value={100} label="Fin" />
    </div>
  )
};

export const ThumbSizes: Story = {
  render: () => (
    <div style={{ alignItems: "stretch", display: "flex", gap: 32, height: 121.5 }}>
      <Scrollbar value={0} thumbSize={12} label="Thumb corto" />
      <Scrollbar value={0} thumbSize={17.4} label="Thumb PDF" />
      <Scrollbar value={0} thumbSize={35} label="Thumb largo" />
    </div>
  )
};
