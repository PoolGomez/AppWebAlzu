"use client"
import { Button } from "@/components/ui/button";
import { Canvas, Circle, Rect } from "fabric";
import { CircleAlert, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react"

import { clearGuidelines, handleObjectMoving } from "./SnappingHelpers";
import { Settings } from "./Settings";

// import LayersList from "./LayersList"
import { Label } from "@/components/ui/label";

export default function FabricPage() {
    const canvasRef = useRef()
    const [ canvas, setCanvas] = useState(null);

    const[guidelines, setGuidelines] = useState([])

    const [objectsList, setObjectsList] = useState([]); ///addd

    //   const [ layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);
    
    useEffect(()=>{
        if(canvasRef.current){
            const initCanvas = new Canvas(canvasRef.current,{
                width: 500,
                height:500,
            });
            initCanvas.backgroundColor="#FFF";
            initCanvas.renderAll();

            setCanvas(initCanvas);

            initCanvas.on("object:moving", (event)=> {
                handleObjectMoving(initCanvas, event.target, 
                    guidelines,
                    setGuidelines)
                }
            );

            initCanvas.on("object:added",()=>{
                updateObjectsList(initCanvas);
            }) ///add

            initCanvas.on("object:modified", () => 
                clearGuidelines(initCanvas, guidelines, setGuidelines)
            );

            initCanvas.on("selection:created", handleObjectSelected);

            initCanvas.on("object:removed", updateObjectsList(initCanvas));
            initCanvas.on("object:modified", updateObjectsList(initCanvas));
            initCanvas.on("selection:created", handleObjectSelected);
            initCanvas.on("selection:updated", handleObjectSelected);
            initCanvas.on("selection:cleared", setSelectedLayer(null));
            return () => {
                initCanvas.dispose();
            }
        }
    },[])

    const updateObjectsList = (c) =>{
        if(c){
            console.log("canvas existe...")
            // const objects = canvas.objects;
            // console.log("[objects]",objects)
            c.updateZIndices();
            const objects = c
                .getObjects()
                .filter(
                    (obj) =>
                        !(
                            obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-")
                        )
                )
                .map((obj)=>({
                    id: obj.id,
                    zIndex: obj.zIndex,
                    type: obj.type
                }));
                setObjectsList([...objects].reverse());

        }
    }

    const addRectangule = () => {
        if(canvas){
            const rect = new Rect({
                top:100,
                left: 50,
                width:100,
                height:60,
                fill:"#D84D42"
            });
            canvas.add(rect);
        };
    };
    const addCircle = () => {
        if(canvas){
            const circle = new Circle({
                top:150,
                left: 150,
                radius: 50,
                fill:"#2F4DC6"
            });
            canvas.add(circle);
        };
    };
    const handleSaveCanvas = () =>{
        if (canvasRef.current) {
            try {
                console.log("[canvas]",canvas);
                console.log("[typeof]",typeof canvas);
                const jsonString = JSON.stringify(canvas.toJSON());

                localStorage.setItem("canvasData", jsonString); // Guardar en localStorage
                console.log("[jsonString]", jsonString);
                // alert("Canvas guardado en JSON!");
            } catch (error) {
                console.log(error)
            }
            
          }
    }
    const loadCanvasFromJSON = () => {
        if (canvasRef.current) {
            const jsonData = localStorage.getItem("canvasData");
            if (jsonData) {
                canvas.loadFromJSON(jsonData).then(function(){canvas.renderAll()})
              } else {
                alert("No hay datos de canvas guardados.");
              }
        }
      };

      /////////////   LAYERLIST   ////////////////

    

    const addIdToObject = (object) =>{
        if(!object.id){
            const timestamp = new Date().getTime();
            object.id = `${object.type}_${timestamp}`;
        }
    }
    Canvas.prototype.updateZIndices = function () {
        const objects = this.getObjects();
        objects.forEach((obj, index) =>{
            addIdToObject(obj);
            obj.zIndex = index;
        });

    }
    // const updateLayers = () =>{
    //     if(canvas){ 
    //         canvas.updateZIndices();
    //         const objects = canvas
    //             .getObjects()
    //             .filter(
    //                 (obj) =>
    //                     !(
    //                         obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-")
    //                     )
    //             )
    //             .map((obj)=>({
    //                 id: obj.id,
    //                 zIndex: obj.zIndex,
    //                 type: obj.type
    //             }));
    //             setLayers([...objects].reverse());
    //     }
    // };

    const handleObjectSelected = (e) =>{
        const selectedObject = e.selected ? e.selected[0]: null;

        console.log("[selectedObject]",selectedObject)
        if(selectedObject){
            setSelectedLayer(selectedObject.id);
        }else{
            setSelectedLayer(null)
        }
    };

    const selectLayerInCanvas = (layerId) =>{
        const object = canvas.getObjects().find((obj) => obj.id === layerId);
        if(object){
            canvas.setActiveObject(object);
            canvas.renderAll();
        }
    }

    // useEffect(()=>{
    //  if(canvas){
    //     canvas.on("object:added", updateLayers);
    //     canvas.on("object:removed", updateLayers);
    //     canvas.on("object:modified", updateLayers);
    //     canvas.on("selection:created", handleObjectSelected);
    //     canvas.on("selection:updated", handleObjectSelected);
    //     canvas.on("selection:cleared", setSelectedLayer(null));
    //     updateLayers();
    //     return () => {
    //         canvas.off("object:added", updateLayers);
    //         canvas.off("object:removed", updateLayers);
    //         canvas.off("object:modified", updateLayers);
    //         canvas.off("selection:created", handleObjectSelected);
    //         canvas.off("selection:updated", handleObjectSelected);
    //         canvas.off("selection:cleared", setSelectedLayer(null));
    //     }

    //  }   
    // },[canvas])


  return (
    <div>
        <div>
            <Button onClick={addRectangule} variant="outline" size="sm">
                <Square />
            </Button>
            <Button onClick={addCircle} variant="outline" size="sm">
                <CircleAlert />
            </Button>
            <Button onClick={handleSaveCanvas}>Guardar</Button>
            <Button onClick={loadCanvasFromJSON}>Cargar</Button>
        </div>
        <canvas ref={canvasRef} />
        <Settings canvas={canvas} />

        {/* <LayersList canvas={canvas} /> */}


        {/* LAYER LIST */}
        <Label>Lista</Label>
        {/* <ul>
            {layers.map((layer)=>{
                <li
                    key={layer.id}
                    onClick={()=>selectLayerInCanvas(layer.id)}
                    // className={layer.id === selectedLayer ? "selected-layer" : ""}
                >
                    XXX{layer.type}({layer.zIndex})
                </li>
            })}
        </ul> */}


        {/* add */}
        <ul>
            {objectsList.map((layer, index) => (
            <li key={index} 
            // onClick={()=>selectLayerInCanvas(layer.id)}
            >
                {/* {obj.type === "rect" && "Rectángulo"}
                {obj.type === "circle" && "Círculo"}
                {obj.type} - 
                Top: {obj.top}, Left: {obj.left}, Color: {obj.fill} */}
                <Button onClick={()=>selectLayerInCanvas(layer.id)} variant={ layer.id === selectedLayer ? "default" : "outline"}>
                {layer.type}({layer.zIndex})
                </Button>
                
            </li>
            ))}
        </ul>


    </div>
  )
}
