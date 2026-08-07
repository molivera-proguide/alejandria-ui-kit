import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormTextInput } from "./FormTextInput";

const meta = {
  title: "Alejandria/FormTextInput",
  component: FormTextInput,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["login", "default"]
    }
  },
  args: {
    label: "DNI",
    variant: "default"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estático — sin foco, sin valor (label a tamaño completo). PDF p.18. */
export const Default: Story = {};

/** Activo — con valor, label achicado arriba (`:not(:placeholder-shown)`). PDF p.18. */
export const Activo: Story = {
  args: {
    label: "NOMBRE",
    defaultValue: "Juan Cruz"
  }
};

/** Borde con error (#ff0404). PDF p.18. */
export const Error: Story = {
  args: {
    label: "DNI",
    defaultValue: "12.345.678",
    error: "Ingresá un DNI válido."
  }
};

/** Disabled — no especificado por el PDF, ver DECISIONS.md. */
export const Disabled: Story = {
  args: {
    label: "DNI",
    defaultValue: "12.345.678",
    disabled: true
  }
};

/** Textarea — ejemplo "DESCRIPCIÓN" de PDF p.18. */
export const Textarea: Story = {
  args: {
    label: "DESCRIPCIÓN",
    multiline: true,
    defaultValue: "El usuario generado se encargará de gestionar la plataforma y sus accesos"
  }
};

/** Variante login — PDF p.17 (fondo #2a2927, label #f6f6f6). */
export const LoginVariant: Story = {
  args: {
    label: "USUARIO",
    variant: "login"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#2a2927", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
};

/** Variante login, campo contraseña. PDF p.17. */
export const LoginPassword: Story = {
  args: {
    label: "CONTRASEÑA",
    type: "password",
    variant: "login",
    defaultValue: "••••••••"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#2a2927", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
};
