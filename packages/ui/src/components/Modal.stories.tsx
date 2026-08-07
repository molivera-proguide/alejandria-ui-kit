import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";

const meta = {
  title: "Alejandria/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    title: "¿ESTÁS SEGURO DE ESTA ACCIÓN?",
    description:
      "Esta acción es irreversible; la elección realizada afectará el resultado definitivo y no podrá deshacerse.",
    secondaryAction: { label: "ACCIÓN B", onClick: () => {} },
    primaryAction: { label: "ACCIÓN A", onClick: () => {} }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Único estado de este componente — diálogo de confirmación abierto. PDF p.22. */
export const ConfirmacionDeAccion: Story = {};
