"use client"
import { useState } from "react"
import { Items } from "./Items"
import {closestCorners, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {arrayMove, horizontalListSortingStrategy, rectSwappingStrategy, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable'

export function Grid() {
    const [data, setData] = useState([
        { id: 1, content: "Item 1", src: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
        { id: 2, content: "Item 2", src: "https://s2.glbimg.com/cyW7G9tNuQoyTYoTPtBKbz5ZGUQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/h/C/PW9LErTfuRsQJdIwO7Vg/porsche-911-turbo-s-2021-1280-01.jpg" },
        { id: 3, content: "Item 3", src: "https://s2.glbimg.com/B26LUYEqZcezgVFYLYO_maYBi0E=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/L/B/3c87PRQmOchcONC6YD2A/2016-07-23-c180-2016.png" },
        { id: 4, content: "Item 4", src: "https://quatrorodas.abril.com.br/wp-content/uploads/2021/11/Volvo-XC60-Recharge-Foto-Fabio-Aro-40.jpg?quality=70&strip=info&w=1024&resize=1200,800" },
        { id: 5, content: "Item 5", src: "http://2.bp.blogspot.com/-NCDo8fTOnGA/US6_1yK9tMI/AAAAAAAABNc/VnZzCQkdriE/s1600/Ferrari+458.jpg" },
        { id: 6, content: "Item 6", src: "https://quatrorodas.abril.com.br/wp-content/uploads/2021/05/0x0-ModelS_05.jpg?quality=70&strip=info" },
        { id: 7, content: "Item 7", src: "https://s2.glbimg.com/bxKk4V6MtlKk2v6jFV3fNXjUScc=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/r/f/MBpzOoQiGqFDA1AeL0yw/tesla-model-x-plaid-3.jpg" },
        { id: 8, content: "Item 8", src: "https://cdn.motor1.com/images/mgl/G4z31/s3/tesla-roadster.jpg" },
    ]);

    const getPosition = (id:number) => data.findIndex((obj)=> obj.id === id)

    const handleDragEnd = (event: any)  =>{
        const {active, over} = event
        console.log(active, over)
        // if(active.id === over.id) return

        // setData( () => {
        //     const originalPosition = getPosition(active.id)
        //     const latestPosition = getPosition(over.id)
        //     return arrayMove(data, originalPosition, latestPosition)
        // })

        if(active.id !== over.id){
            setData((items)=>{
                // const oldIndex = data.findIndex((r)=>r.id === active.id);
                // const newIndex = data.findIndex((r)=>r.id === over.id );
                const oldIndex = items.map((item)=>item.id).indexOf(active.id);
                const newIndex = items.map((item)=>item.id).indexOf(over.id );
                console.log(arrayMove(items, oldIndex, newIndex));
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        
    };

    // const sensors = useSensors(
    //     useSensor(PointerSensor,{
    //         activationConstraint:{
    //             distance: 3,
    //         }
    //     }),
    //     useSensor(TouchSensor),
    //     useSensor(MouseSensor)
    // )
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );


  return (
    <div className="bg-slate-500">

        <DndContext 
            sensors={sensors}  
            onDragEnd={handleDragEnd} 
            // collisionDetection={closestCorners}
        >
            <SortableContext 
                items={data}
                // strategy={rectSwappingStrategy} 
                // strategy={verticalListSortingStrategy}
                
            >
                <div className="grid grid-cols-3 gap-[20px] bg-red-300">
                {
                    data.map((el, index)=><Items key={el.id} 
                    // {...el} 
                    item={el}
                    index={index}
                    // id={el.id}
                    // content = {el.content}
                    />)
                }
                </div>
        
        </SortableContext>
        </DndContext>
    </div>
  )
}
