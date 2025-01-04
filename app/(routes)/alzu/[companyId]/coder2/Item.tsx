import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sidebar, Trash2 } from 'lucide-react';
import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
};

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: '100px',
        width: '100px',
        // margin:'20px', // add
        borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#cbffcb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    const handleDelete = ()=>{
        alert("handleDelete")
    }

    return (   

        <div ref={ref} style={inlineStyles} {...props}>
            <div className='flex flex-col items-center justify-between'>

                    <div>
                        <Trash2 className='w-4 h-4 m-2'/>
                    </div>
                    <div className='m-2'>
                        {id}
                    </div>
                    <div>
                        <Badge className='bg-green-500'>Activo</Badge>
                        
                    </div>
            </div>
            
            
        </div> 
    

            

    );
});

export default Item;

const statusColors = {
    available: "bg-green-100 text-green-600",
    occupied: "bg-yellow-100 text-yellow-600",
    disabled: "bg-red-100 text-red-600",
  };

{/* <div ref={ref} style={inlineStyles} {...props}>
        {id}
    </div> */}