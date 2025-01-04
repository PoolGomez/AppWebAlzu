import { useState } from "react";
import { ElementType, LayoutElement } from "./types";
import { v4 as uuidv4 } from 'uuid';

interface ToolbarProps {
    onAddElement: (element: LayoutElement) => void;
  }

export function Toolbar(props:ToolbarProps) {
    const {onAddElement} = props;
    const [type, setType] = useState<ElementType>('rectangle');
    const [color, setColor] = useState<string>('#24f53c');
    const [label, setLabel] = useState<string>('');
  
    const handleAddElement = () => {
      const newElement: LayoutElement = {
        id: uuidv4(),
        type,
        positionX: 50,
        positionY: 50,
        width: 100,
        height: 100,
        color,
        label,
      };
      onAddElement(newElement);
    };
  
    return (
      <div className="flex flex-col space-y-2 p-4 border-r border-gray-300"  >
        <select onChange={(e) => setType(e.target.value as ElementType)} className="p-2 border">
          <option value="rectangle">Rectángulo</option>
          <option value="circle">Círculo</option>
        </select>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Etiqueta"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="p-2 border"
        />
        <button onClick={handleAddElement} className="p-2 bg-blue-500 text-white rounded">
          Agregar Forma
        </button>
      </div>
    );
}
