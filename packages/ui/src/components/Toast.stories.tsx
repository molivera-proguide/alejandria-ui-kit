import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Toast } from "./Toast";

const meta = {
  title: "Alejandria/Toast",
  component: Toast,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "alejandria-dark",
      values: [{ name: "alejandria-dark", value: "#060606" }]
    }
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estático — PDF "ALERT" p.22 § "Tarea realizada". */
export const Default: Story = {
  args: {
    message: "Se creó una tarea con éxito"
  }
};

/**
 * Verificación manual del auto-dismiss (sin framework de test, ver DECISIONS.md):
 * click "Mostrar" monta el Toast; a los 4000ms `onDismiss` lo desmonta solo, sin
 * botón de cierre.
 */
export const AutoDismiss: Story = {
  render: () => {
    function Wrapper() {
      const [visible, setVisible] = useState(false);
      return (
        <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
          <Button onClick={() => setVisible(true)}>Mostrar Toast</Button>
          {visible ? (
            <Toast message="Se creó una tarea con éxito" onDismiss={() => setVisible(false)} />
          ) : null}
        </div>
      );
    }
    return <Wrapper />;
  }
};
