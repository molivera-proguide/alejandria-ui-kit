import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Alejandria/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["rect", "circle"]
    }
  },
  args: {
    variant: "rect",
    width: 200,
    height: 16
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--ds-color-pdf-surface)", padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Rect: Story = {
  args: {
    variant: "rect",
    width: 200,
    height: 16
  }
};

export const Circle: Story = {
  args: {
    variant: "circle",
    width: 40,
    height: 40
  }
};

/**
 * Composed placeholders on the PDF «Fondo» wash (`--ds-color-pdf-surface-warm-a70`).
 * Outer decorator stays opaque `--ds-color-pdf-surface` (Storybook backgrounds addon is not registered).
 */
export const ComposedOnFondo: Story = {
  render: () => (
    <div
      style={{
        background: "var(--ds-color-pdf-surface-warm-a70)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 16,
        width: 280
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
        <Skeleton variant="circle" width={40} height={40} />
        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8 }}>
          <Skeleton width="100%" height={12} />
          <Skeleton width="60%" height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={72} />
      <Skeleton width="80%" height={12} />
    </div>
  )
};
