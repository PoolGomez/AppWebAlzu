"use client"
import { Input } from "@/components/ui/input";
import { Canvas } from "fabric";
import { useEffect, useState } from "react";


export function Settings({canvas}) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [diameter, setDiameter] = useState("")
    const [first, setFirst] = useState("")
    const [color, setColor] = useState("")

    useEffect(()=>{
        if(canvas){

            canvas.on("selection:created",(event)=>{
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated",(event)=>{
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared",(event)=>{
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on("object:modified",(event)=>{
                handleObjectSelection(event.target);
            });

            canvas.on("object:scaling",(event) => {
                handleObjectSelection(event.target);
            })

        }
    },[canvas]);

    const handleObjectSelection = (object) => {
        if(!object) return;

        setSelectedObject(object);

        if(object.type === "rect"){
            setWidth(Math.round(object.width * object.scaleX).toString());
            setHeight(Math.round(object.height * object.scaleY).toString());
            setColor(object.fill)
            setDiameter("")
        }else if (object.type === "circle"){
            setDiameter(Math.round(object.radius * 2 * object.scaleX).toString());
            setColor(object.fill);
            setWidth("");
            setHeight("");
        }
    };

    const clearSettings = () =>{
        setDiameter("");
        setColor("");
        setWidth("");
        setHeight("");
    }

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value, 10)
        setWidth(intValue.toString());

        if(selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set({width: intValue / 2 / selectedObject.scaleX});
            canvas?.renderAll();
        }

    }

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value, 10)
        setHeight(intValue.toString());

        if(selectedObject && selectedObject.type === "rect" && intValue >= 0){
            selectedObject.set({height: intValue / selectedObject.scaleY});
            canvas?.renderAll();
        }
    }

    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g,"");
        const intValue = parseInt(value, 10)
        setDiameter(intValue.toString());

        if(selectedObject && selectedObject.type === "circle" && intValue >= 0){
            selectedObject.set({radius: intValue / 2 / selectedObject.scaleX});
            canvas?.renderAll();
        }
    }

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);

        if(selectedObject){
            selectedObject.set({fill: value});
            canvas?.renderAll();
        }
    }

  return (
    <div>
        {selectedObject && selectedObject.type === "rect" &&(
            <>
            <Input 
                placeholder="width"
                value={width}
                onChange={handleWidthChange}
            />
           
            <Input 
                placeholder="Height"
                value={height}
                onChange={handleHeightChange}
            />
            <Input 
            type="color"
                placeholder="Color"
                value={color}
                onChange={handleColorChange}
            />

            </>
        )}

        {selectedObject && selectedObject.type === "circle" &&(
            <>
            <Input 
                placeholder="Diameter"
                value={diameter}
                onChange={handleDiameterChange}
            />
           
            <Input 
            type="color"
                placeholder="Color"
                value={color}
                onChange={handleColorChange}
            />

            </>
        )}
    </div>
  )
}
