"use client"
import { useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import Image from 'next/image';
import { ItemType } from './ItemType';

export function Items({item, index}:{item: ItemType, index:number}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        active,
        isDragging
    } = useSortable({id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: active ? " grabbing": "grab",
        // gridRowStart: `${index === 0 ? "span-2 ":"span 1"}`,
        // gridColumnStart: `${index === 0 ? "span-2 ":"span 1"}`,
        transformOrigin: "0 0",
    }
  return (
    <div 
    // key={id}
        style={style}
        ref={setNodeRef}
        {...attributes} 
        {...listeners}
        // className="p-[20px] w-[320px] h-[60px] bg-green-500 m-[20px] border rounded-lg text-white font-medium transition-transform"
        className={`${isDragging && " z-50"}`}
    >
        {/* <div style={{touchAction:"none"}}>
            {content}
        </div> */}

        <Image 
            className="rounded-xl border border-slate-200 shadow-sm object-cover w-full h-full"
            src={item.src}
            alt="image"
            width={350}
            height={250}
        />
        
    
    </div>
  )
}
