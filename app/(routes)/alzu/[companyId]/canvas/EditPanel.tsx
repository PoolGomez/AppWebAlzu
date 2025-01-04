import { LayoutElement } from "./types";

interface EditPanelProps {
  selectedElement: LayoutElement | null;
  onUpdateElement: (id: string, newElement: Partial<LayoutElement>) => void;
}

export function EditPanel(props: EditPanelProps) {
  const { selectedElement, onUpdateElement } = props;

  if (!selectedElement)
    return <div className="p-4">Selecciona una forma para editarla</div>;

  const handleChange = (key: keyof LayoutElement, value: any) => {
    onUpdateElement(selectedElement.id, { [key]: value });
  };

  return (
    <div className="p-4 border-l space-y-2">
      <h2 className="font-bold">Editar Forma</h2>
      <label>
        Tipo:
        <select
          value={selectedElement.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full p-2 border"
        >
          <option value="rectangle">Rectángulo</option>
          <option value="circle">Círculo</option>
        </select>
      </label>

      <label>
        Color:
        <input
          type="color"
          value={selectedElement.color}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full p-2 border"
        />
      </label>

      <label>
        Etiqueta:
        <input
          type="text"
          value={selectedElement.label || ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full p-2 border"
        />
      </label>

      <label>
        Ancho:
        <input
          type="number"
          value={selectedElement.width}
          onChange={(e) => handleChange("width", parseInt(e.target.value))}
          className="w-full p-2 border"
        />
      </label>

      <label>
        Alto:
        <input
          type="number"
          value={selectedElement.height}
          onChange={(e) => handleChange("height", parseInt(e.target.value))}
          className="w-full p-2 border"
        />
      </label>
    </div>
  );
}
