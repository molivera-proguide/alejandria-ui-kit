import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "Alejandria/Switch",
  component: Switch,
  parameters: {
    layout: "centered"
  },
  args: {
    label: "Alertas en vivo",
    description: "Mantiene sincronizado el panel con eventos entrantes.",
    defaultChecked: true
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 360, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Off: Story = {
  args: {
    defaultChecked: false
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true
  }
};

export const Stack: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <Switch label="Alertas en vivo" description="Sincroniza eventos entrantes." defaultChecked />
      <Switch label="Modo silencioso" description="Oculta avisos no criticos." />
      <Switch label="Bloqueo de edicion" description="Solo permite acciones autorizadas." defaultChecked />
    </div>
  )
};
