import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormFileUpload } from "./FormFileUpload";

function fakeFile(name: string, sizeMb: number) {
  return new File([new Uint8Array(sizeMb * 1024 * 1024)], name);
}

const meta = {
  title: "Alejandria/FormFileUpload",
  component: FormFileUpload,
  parameters: {
    layout: "centered"
  },
  args: {
    label: "ADJUNTAR ARCHIVOS"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 360, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Vacío — "Arrastra un archivo o haz click para subir." PDF p.20. */
export const Empty: Story = {};

/** Drag-hover — el estado empty se superpone al input activo. PDF p.20. */
export const DragHover: Story = {
  play: async ({ canvasElement }) => {
    const zone = canvasElement.querySelector(".ds-form-file__zone");
    zone?.dispatchEvent(new Event("dragover", { bubbles: true, cancelable: true }));
  }
};

/** Archivo(s) cargado(s) — ejemplos del PDF p.20 (Archivo_1.doc, Archivo2.pdf, Foto1.jpg). */
export const ArchivosCargados: Story = {
  args: {
    defaultFiles: [fakeFile("Archivo_1.doc", 2.4), fakeFile("Archivo2.pdf", 2.4), fakeFile("Foto1.jpg", 2.4)]
  }
};

/** Borde con error. */
export const Error: Story = {
  args: {
    error: "Adjuntá al menos un archivo en formato PDF, JPG, PNG o DOC."
  }
};

/** Disabled — no especificado por el PDF, ver DECISIONS.md. */
export const Disabled: Story = {
  args: {
    disabled: true
  }
};
