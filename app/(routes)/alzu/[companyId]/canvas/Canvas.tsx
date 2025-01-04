import { Rnd } from "react-rnd";
import { LayoutElement } from "./types";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";

interface CanvasProps {
  elements: LayoutElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onElementChange: (id: string, newElement: Partial<LayoutElement>) => void;
}

export function Canvas(props: CanvasProps) {
  const { elements, selectedElementId, onSelectElement, onElementChange } =
    props;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Función para restringir la posición dentro del contenedor
//   const restrictPosition = (element: LayoutElement, width: number, height: number) => {
//     const maxX = width - element.width;
//     const maxY = height - element.height;

//     return {
//       positionX: Math.max(0, Math.min(element.positionX, maxX)),
//       positionY: Math.max(0, Math.min(element.positionY, maxY)),
//     };
//   };
  // Función para manejar el movimiento de las formas
//   const handleDrag = (event: React.MouseEvent, element: LayoutElement) => {
//     if (!canvasRef.current) return;

//     const canvasRect = canvasRef.current.getBoundingClientRect();
//     const newX = event.clientX - canvasRect.left - element.width / 2;
//     const newY = event.clientY - canvasRect.top - element.height / 2;

//     const restrictedPosition = restrictPosition(
//       { ...element, positionX: newX, positionY: newY },
//       canvasRect.width,
//       canvasRect.height
//     );

//     onElementChange(element.id, restrictedPosition);
//   };
  // Función para manejar el redimensionamiento de las formas
//   const handleResize = (element: LayoutElement, newWidth: number, newHeight: number) => {
//     if (!canvasRef.current) return;

//     const canvasRect = canvasRef.current.getBoundingClientRect();
//     const restrictedWidth = Math.min(newWidth, canvasRect.width - element.positionX);
//     const restrictedHeight = Math.min(newHeight, canvasRect.height - element.positionY);

//     onElementChange(element.id, {
//       width: restrictedWidth,
//       height: restrictedHeight,
//     });
//   };


  // Función para actualizar el escalado del canvas 1280x720 - 1080x1920
  const updateScale = () => {
    if (canvasRef.current) {
      const { clientWidth, clientHeight } = canvasRef.current;
      const scaleX = clientWidth / 720; // Ancho base del canvas (ajústalo según tu diseño)
      const scaleY = clientHeight / 1280; // Alto base del canvas (ajústalo según tu diseño)
      const newScale = Math.min(scaleX, scaleY); // Escala proporcional
      setScale(newScale);
    }
  };

  // Actualizar el escalado al cambiar el tamaño de la ventana
  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-2 gap-y-2">
      <div className="rounded-lg bg-background">

        {/* CANVAS ANTERIOR */}
        <div className="flex justify-center items-center w-full h-full p-2">
          {/* Contenedor escalable con proporción 16:9 */}
          <div
            ref={canvasRef}
            className="relative w-full max-w-screen-lg aspect-[9/16] bg-gray-200 border shadow-md overflow-hidden"
          >
            {/* Contenedor interno escalado */}
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
              className="w-[720px] h-[1280px]"
            >
                                    
              {elements.map((el) => {
                const isSelected = selectedElementId === el.id;
                return(
                <Rnd
                  key={el.id}
                  size={{ width: el.width, height: el.height }}
                  position={{ x: el.positionX, y: el.positionY }}
                  onDragStop={(e, d) =>
                    onElementChange(el.id, { positionX: d.x, positionY: d.y })
                  }
                  onResizeStop={(e, direction, ref, delta, position) => {
                    onElementChange(el.id, {
                    //   width: parseInt(ref.style.width),
                    //   height: parseInt(ref.style.height),
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        ...position,
                    });
                  }}
                  onClick={(e : any) => {
                    e.stopPropagation();
                    onSelectElement(el.id)}
                }
                  bounds="parent"
                // bounds="relative w-full h-full bg-gray-200 overflow-hidden"
                    enableResizing={selectedElementId === el.id}
                  resizeHandleStyles={{
                    top: {
                      cursor: "ns-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    right: {
                      cursor: "ew-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    bottom: {
                      cursor: "ns-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    left: {
                      cursor: "ew-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    topRight: {
                      cursor: "ne-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    bottomRight: {
                      cursor: "se-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    bottomLeft: {
                      cursor: "sw-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                    topLeft: {
                      cursor: "nw-resize",
                      backgroundColor: "#3498db",
                      width: "10px",
                      height: "10px",
                    },
                  }}
                  dragHandleClassName="drag-handle"
                  disableDragging={selectedElementId !== el.id}
                  style={{ 
                    border: isSelected ? "2px solid #3498db" : "1px solid transparent",
                    cursor: "move",
                    backgroundColor: el.color }}
                  className={`${el.type === "circle" ? "rounded-full" : ""} ${
                    selectedElementId === el.id
                      ? "border-2 border-blue-500"
                      : ""
                  } `}
                >
                    {/* Indicador de movimiento */}
                    {/* <div
                    className="drag-handle bg-blue-500 text-white text-xs p-1 rounded-t cursor-move"
                    style={{ width: "100%" }}
                    >
                        Mover
                    </div> */}
                    
                  <div className="drag-handle cursor-move w-full h-full flex items-center justify-center text-white font-bold">
                    {el.label}
                  </div>
                </Rnd>
                )
              }
            )}
            </div>
          </div>
        </div>


      </div>

      <div className="rounded-lg bg-background shadow-md">
                <h3 className="text-lg font-bold mb-4">Lista de Formas</h3>
                <ul>
                {elements.map((el) => (
                    <li
                    key={el.id}
                    className={`p-2 mb-2 cursor-pointer rounded ${
                        selectedElementId === el.id ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                    onClick={() => onSelectElement(el.id)}
                    >
                    {el.label || `Forma ${el.id}`}
                    </li>
                ))}
                </ul>

                {/* Formulario de Edición */}
                {selectedElementId && (
                <div className="mt-4 p-4 bg-white border rounded">
                    <h4 className="font-bold mb-2">Editar Forma</h4>
                    {elements
                    .filter((el) => el.id === selectedElementId)
                    .map((el) => (
                        <div key={el.id}>
                        <label className="block mb-2">
                            Etiqueta:
                            <input
                            type="text"
                            value={el.label}
                            onChange={(e) =>
                                onElementChange(el.id, { label: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            />
                        </label>

                        <label className="block mb-2">
                            Ancho:
                            <input
                            type="number"
                            value={el.width}
                            onChange={(e) =>
                                onElementChange(el.id, { width: parseInt(e.target.value) })
                            }
                            className="w-full p-2 border rounded"
                            />
                        </label>

                        <label className="block mb-2">
                            Alto:
                            <input
                            type="number"
                            value={el.height}
                            onChange={(e) =>
                                onElementChange(el.id, { height: parseInt(e.target.value) })
                            }
                            className="w-full p-2 border rounded"
                            />
                        </label>

                        <label className="block mb-2">
                            Color de Fondo:
                            <input
                            type="color"
                            value={el.color}
                            onChange={(e) =>
                                onElementChange(el.id, { color: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            />
                        </label>
                        </div>
                    ))}
                </div>
                )}
                    
                
        </div>
    </div>
  );
}
