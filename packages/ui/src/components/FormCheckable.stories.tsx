import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormCheckable, FormCheckableGroup } from "./FormCheckable";

const meta = {
  title: "Alejandria/FormCheckable",
  component: FormCheckable,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    type: {
      control: "select",
      options: ["checkbox", "radio", "switch"]
    }
  },
  args: {
    label: "Editor"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormCheckable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Checkbox, versión simple (sin bajada), no seleccionado. PDF p.19. */
export const CheckboxSimple: Story = {
  args: { type: "checkbox" }
};

/** Checkbox seleccionado — fondo #ffffff, selector #060606. PDF p.19. */
export const CheckboxSeleccionado: Story = {
  args: { type: "checkbox", defaultChecked: true }
};

/** Checkbox con bajada. PDF p.19. */
export const CheckboxConBajada: Story = {
  args: {
    type: "checkbox",
    description: "Este usuario solo podrá editar el contenido pero no aprobarlo"
  }
};

/** Radio, no seleccionado. PDF p.19. */
export const RadioSimple: Story = {
  args: { type: "radio", name: "acceso" }
};

/** Radio seleccionado. PDF p.19. */
export const RadioSeleccionado: Story = {
  args: { type: "radio", name: "acceso", defaultChecked: true }
};

/** Switch — fondo #606060, selector #ffffff (no seleccionado). PDF p.19. */
export const SwitchSimple: Story = {
  args: { type: "switch" }
};

/** Switch seleccionado — fondo #ffffff, selector #060606. PDF p.19. */
export const SwitchSeleccionado: Story = {
  args: { type: "switch", defaultChecked: true }
};

/** Disabled — no especificado por el PDF, ver DECISIONS.md. */
export const Disabled: Story = {
  args: { type: "checkbox", disabled: true, defaultChecked: true }
};

/** Grupo con título — ejemplo "ACCESO A MÓDULOS" de PDF p.19. */
export const GrupoConTitulo: Story = {
  render: () => (
    <FormCheckableGroup title="ACCESO A MÓDULOS">
      <FormCheckable
        type="radio"
        name="acceso-modulos"
        label="Admin"
        description="Este usuario tendrá accesos ilimitados a todas las funcionalidades de la plataforma"
      />
      <FormCheckable
        type="radio"
        name="acceso-modulos"
        label="Editor"
        description="Este usuario solo podrá editar el contenido pero no aprobarlo"
        defaultChecked
      />
      <FormCheckable type="radio" name="acceso-modulos" label="General" description="Acceso restringido" />
    </FormCheckableGroup>
  )
};
