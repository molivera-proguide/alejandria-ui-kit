import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormSelect } from "./FormSelect";

const TIPO_USUARIO_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "General", value: "general" }
];

const meta = {
  title: "Alejandria/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "centered"
  },
  args: {
    label: "TIPO DE USUARIO",
    options: TIPO_USUARIO_OPTIONS
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estático — sin selección. PDF p.18. */
export const Default: Story = {};

/** Activo — desplegable abierto, se superpone al input. PDF p.18. */
export const Activo: Story = {
  args: {
    defaultValue: "editor"
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>(".ds-form-select__trigger");
    trigger?.click();
  }
};

/** Opción seleccionada — el trigger muestra el label elegido. PDF p.18. */
export const OpcionSeleccionada: Story = {
  args: {
    defaultValue: "admin"
  }
};

/** Multiselect — "Select único o multiselect" (PDF p.18). */
export const Multiselect: Story = {
  args: {
    multiple: true,
    defaultValue: ["admin", "editor"]
  }
};

/** Borde con error. */
export const Error: Story = {
  args: {
    error: "Elegí un tipo de usuario."
  }
};

/** Disabled — no especificado por el PDF, ver DECISIONS.md. */
export const Disabled: Story = {
  args: {
    defaultValue: "general",
    disabled: true
  }
};
