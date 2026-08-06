import type { Meta, StoryObj } from "@storybook/react-vite";
import { Login } from "./Login";

const meta = {
  title: "Alejandria/Patterns/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "alejandria-paper",
      values: [
        { name: "alejandria-dark", value: "#060606" },
        { name: "alejandria-paper", value: "#e6e6e6" }
      ]
    }
  }
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description Ambas variantes del módulo de login según la referencia PDF — página 7 (MÓDULOS — De loguin;
 * página distinta de la p.6 "MÓDULOS" que cubre ModuleCard — mismo título de sección, contenido propio,
 * igual que GRAFICOS p.9/p.10)
 */
export const DeLoguin: Story = {
  args: {
    variants: ["pattern", "credentials"]
  }
};

/**
 * @description Variante de acceso por patrón (círculos 3×3)
 */
export const Pattern: Story = {
  args: {
    variants: ["pattern"]
  }
};

/**
 * @description Variante de acceso por usuario y contraseña
 */
export const Credentials: Story = {
  args: {
    variants: ["credentials"]
  }
};
