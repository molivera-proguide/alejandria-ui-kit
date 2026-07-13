import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import type { ModalContent } from "./Modal";

/**
 * @description Datos estáticos del modal según la referencia PDF — página 11 (MODALES)
 * @type {ModalContent}
 */
const modalContent: ModalContent = {
  greeting: "HOLA SEBASTIÁN,",
  prompt: "¿Qué querés hacer hoy?",
  executeLabel: "EJECUTAR",
  attachLabel: "Adjuntar archivos",
  suggestions: [
    { label: "Ayudame a escribir" },
    { label: "Saber más" },
    { label: "Resumir sumario" },
    { label: "Generar investigación" }
  ]
};

const meta = {
  title: "Alejandria/Patterns/Modal",
  component: Modal,
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
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description Modal asistente según la referencia PDF — página 11 (MODALES)
 */
export const Modales: Story = {
  args: {
    content: modalContent
  }
};
