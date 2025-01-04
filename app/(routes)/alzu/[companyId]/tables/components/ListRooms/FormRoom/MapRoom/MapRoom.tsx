"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Room, Table } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FormCreateTable } from "./FormCreateTable";



export function MapRoom(
  {companyId,room, tables,setTableSelected}:
  {
    companyId:string,
    room: Room, 
    tables: Table[],
    // setTableSelected: Dispatch<SetStateAction<Table | null>>;
    setTableSelected: (table:Table)=>void;
  }) {

    const [openModalCreate, setOpenModalCreate] = useState(false)

    const [rowCurrent, setRowCurrent] = useState(0);
    const [columnCurrent, setColumnCurrent] = useState(0);


   const modalAddTable = (row: number, column: number) => {

    setOpenModalCreate(true);
    setRowCurrent(row);
    setColumnCurrent(column);
   }

   const setTableCurrent = (table: Table) =>{
    setTableSelected(table)
   }

  return (
    <>

    


        <div className="space-y-1">
          <h2 className="text-lg font-medium leading-none">
            {room.name}
          </h2>
          {/* <p className="text-sm text-muted-foreground">
              Configure las opciones de creación de la mesa.
            </p> */}
        </div>
        <Separator className="my-4" />


        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            {/* <DialogTrigger asChild>
                <button className="cursor-pointer bg-background items-center justify-center">
                    <Plus className='h-8 w-8' />
                </button>
            </DialogTrigger> */}
            <DialogContent 
            className="sm:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle>Crear Mesa</DialogTitle>
                    <DialogDescription>
                        Create and configure tu mesa
                    </DialogDescription>
                </DialogHeader>
                <div className='flex items-center space-x-2'>
                    <div className="grid flex-1 gap-2">
                    <FormCreateTable roomId={room.id} row={rowCurrent} column={columnCurrent}  setOpenModalCreate={setOpenModalCreate}/>
                    </div>
                </div>
                
            </DialogContent>
        </Dialog>






        <div
          className="w-full h-[600px] grid gap-1 sm:gap-2 p-0"
          style={{
            gridTemplateColumns: `repeat(${room.columns}, 1fr)`,
            gridTemplateRows: `repeat(${room.rows}, 1fr)`,
          }}
        >
          {Array.from({
            length: room.rows * room.columns,
          }).map((_, index) => {
            const row = Math.floor(index / room.columns);
            const column = index % room.columns;
            const keycell = `${row}-${column}`;

            const foundTable = tables.find((table) => table.column === column && table.row === row)

            if(foundTable){

                return (
                
                    <div
                      key={foundTable.id}
                      // className={`
                      //   relative h-10 border border-gray-200
                      //   flex items-center justify-center cursor-pointer
                      //   before:absolute before:inset-0 before:border-t before:border-l before:border-gray-100
                      //   after:absolute after:inset-0 after:border-b after:border-r after:border-gray-100 hover:bg-gray-50
                      // `}
                      className="bg-white border border-gray-300 flex items-center justify-center font-bold"
                    //   onClick={modalAddTable}
                    >
                       
                      {/* <div
                          className={`
                            text-sm font-medium px-2 py-1 rounded bg-white text-primary
                          `}
                        >
                             {foundTable.name}
                        </div> */}
                        {
                          foundTable.status === 'available' ? (
                            <button className="w-full h-full cursor-pointer bg-green-500 items-center justify-center" onClick={()=>setTableCurrent(foundTable)}>
                              {foundTable.name}
                            </button>
                          ) : foundTable.status === 'occupied' ? (
                            <button className="w-full h-full cursor-pointer bg-red-500 items-center justify-center" onClick={()=>setTableCurrent(foundTable)}>
                              {foundTable.name}
                            </button>
                          ): foundTable.status === 'reserved' ? (
                            <button className="w-full h-full cursor-pointer bg-yellow-500 items-center justify-center" onClick={()=>setTableCurrent(foundTable)}>
                              {foundTable.name}
                            </button>
                          ): 
                            <button className="w-full h-full cursor-pointer bg-gray-500 items-center justify-center" onClick={()=>setTableCurrent(foundTable)}>
                              {foundTable.name}
                            </button>
                          
                        }
                        
                    </div>
                  );

            }else{
                return (
                
                    <div
                      key={keycell}
                      className="bg-white border border-gray-300 flex items-center justify-center font-bold"
                     
                    >

                                <button className="cursor-pointer items-center justify-center" onClick={()=>modalAddTable(row, column)}>
                                    <Plus className='h-8 w-8 text-gray-500' />
                                </button>
                           

                        
                    </div>
                  );

            }
            
          })}
        </div>

    </>
  )
}
