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
    // "ACCIÓN A" a la izquierda (secondaryAction), "ACCIÓN B" a la derecha (primaryAction)
    // — mismo orden que el PDF p.22 (get_text(): "ACCIÓN A" x0=611.79, "ACCIÓN B" x0=772.58).
    // Estaban invertidos: la demo mostraba "ACCIÓN B" a la izquierda.
    secondaryAction: { label: "ACCIÓN A", onClick: () => {} },
    primaryAction: { label: "ACCIÓN B", onClick: () => {} }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Único estado de este componente — diálogo de confirmación abierto. PDF p.22. */
export const ConfirmacionDeAccion: Story = {};
