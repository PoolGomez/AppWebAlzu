"use client"
import React, { useState } from 'react'
import { LayoutElement } from './types';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { EditPanel } from './EditPanel';

interface LayoutData {
    id: string;
    name: string;
    elements: LayoutElement[];
  }


export default function CanvasPage() {
    const [elements, setElements] = useState<LayoutElement[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

    // Guardar diseño como JSON
    const saveLayout = () => {
        const layoutData: LayoutData = {
            id: `layout-${Date.now()}`,
            name: "Mi Diseño",
            elements,
        };

        const layoutJSON = JSON.stringify(layoutData);
        localStorage.setItem("savedLayout", layoutJSON);
        alert("Diseño guardado exitosamente en localStorage.");
    };

     // Cargar diseño desde JSON
    const loadLayout = () => {
        const layoutJSON = localStorage.getItem("savedLayout");
        if (layoutJSON) {
        const layoutData: LayoutData = JSON.parse(layoutJSON);
        setElements(layoutData.elements);
        alert("Diseño cargado exitosamente.");
        } else {
        alert("No se encontró un diseño guardado.");
        }
    };

    const handleAddElement = (newElement: LayoutElement) => {
      setElements((prevElements) => [...prevElements, newElement]);
    };
  
    // Manejar cambios en las formas
    const handleElementChange = (id: string, newProps: Partial<LayoutElement>) => {
      setElements((prevElements) =>
        prevElements.map((el) => (el.id === id ? { ...el, ...newProps } : el))
      );
    };

    // Manejar selección de forma
    const handleSelectElement = (id: string) => {
        setSelectedElementId(id);
    };

    const selectedElement = elements.find((el) => el.id === selectedElementId) || null;
  
    return (

    <div  className='flex flex-col h-screen w-screen'>

        
                    <Canvas  elements={elements} selectedElementId={selectedElementId} onSelectElement={handleSelectElement} onElementChange={handleElementChange} />
                    <button onClick={saveLayout} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Guardar Diseño
                        </button>
                        <button onClick={loadLayout} className="px-4 py-2 bg-green-500 text-white rounded">
          Cargar Diseño
        </button>
                    <Toolbar onAddElement={handleAddElement} />
    </div>
    );
}
{/* <Toolbar onAddElement={handleAddElement} /> */}
{/* <EditPanel selectedElement={selectedElement} onUpdateElement={handleElementChange} /> */}