"use client"
import { Label } from '@/components/ui/label';
import { Canvas } from 'fabric';
import React, { useEffect, useState } from 'react'

export default function LayersList({canvas}) {


    const [ layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);

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

    const updateLayers = () =>{
        if(canvas){ 
            canvas.updateZIndices();
            const objects = canvas
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
                setLayers([...objects].reverse());
        }
    };

    const handleObjectSelected = (e) =>{
        const selectedObject = e.selected ? e.selected[0]: null;
        // const selectedObject = e.target ? e.target[0]: null;

        console.log("[selectedObject]",selectedObject)
        if(selectedObject){
            setSelectedLayer(selectedObject.id);
        }else{
            setSelectedLayer(null)
        }
    };

    const test = () =>{
        console.log("testing")
    }

    const selectLayerInCanvas = (layerId) =>{
        const object = canvas.getObjects().find((obj) => obj.id === layerId);
        if(object){
            canvas.setActiveObject(object);
            canvas.renderAll();
        }
    }

    useEffect(()=>{
        console.log("[layers]",layers)
     if(canvas){
        canvas.on("object:added", updateLayers);
        canvas.on("object:removed", updateLayers);
        canvas.on("object:modified", updateLayers);
        canvas.on("selection:created", handleObjectSelected);
        canvas.on("selection:updated", handleObjectSelected);
        canvas.on("selection:cleared", setSelectedLayer(null));
        updateLayers();

        return () => {
            // console.log("[layers]",layers)
            canvas.off("object:added", updateLayers);
            canvas.off("object:removed", updateLayers);
            canvas.off("object:modified", updateLayers);
            canvas.off("selection:created", handleObjectSelected);
            canvas.off("selection:updated", handleObjectSelected);
            canvas.off("selection:cleared", setSelectedLayer(null));
        }

     }   
    },[canvas])


  return (
    <div>
        <Label>Lista</Label>
        <ul>
            {layers.map((layer)=>{
                <li
                    key={layer.id}
                    onClick={()=>selectLayerInCanvas(layer.id)}
                    // className={layer.id === selectedLayer ? "selected-layer" : ""}
                >
                    XXX{layer.type}({layer.zIndex})
                </li>
            })}
        </ul>
    </div>
  )
}
