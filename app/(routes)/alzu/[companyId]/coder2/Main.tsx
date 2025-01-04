"use client"
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { FC, useCallback, useState,useRef,useEffect } from "react";

import Item from "./Item";
import SortableItem from "./SortableItem";


export const Main: FC =()=> {

    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()));
    const [activeId, setActiveId] = useState<string | null>(null);

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          distance: 10,
        },
      });

    const touchSensor = useSensor(TouchSensor, {
        
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      });
    
      const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor,keyboardSensor);

    // DragStartEvent
    const handleDragStart = useCallback((event: any) => {
        setActiveId(event.active.id);
    }, []);

    // DragEndEvent
    const handleDragEnd = useCallback((event: any) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over!.id);

                // const oldIndex = items.map((item)=>item.id).indexOf(active.id);
                // const newIndex = items.map((item)=>item.id).indexOf(over?.id );

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);



    const canvasRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

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


    <div 
    // className="flex justify-center items-center w-full h-full p-2"
    className="grid grid-cols-3 lg:grid-cols-6 items-center justify-center w-full h-full"
    >
          
            {/* Contenedor escalable con proporción 16:9 */}
            {/* <div className="relative w-full max-w-screen-lg aspect-[9/16] bg-gray-200 border shadow-md overflow-hidden"> */}

              {/* Contenedor interno escalado */}
              {/* <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className="w-[720px] h-[1280px]"
              > */}


                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext items={items} strategy={rectSortingStrategy}>
                                {/* <Grid columns={5}> */}
                                    <>
                                    {items.map((id) => (
                                        <SortableItem key={id} id={id} />
                                    ))}
                                    </>
                                {/* </Grid> */}
                            </SortableContext>
                            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                                {activeId ? <Item id={activeId} isDragging /> : null}
                            </DragOverlay>
                        </DndContext>





              {/* </div> */}

            {/* </div> */}

          </div>


    
  )
}
