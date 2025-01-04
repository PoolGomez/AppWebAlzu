"use client"
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { FormCreateTable } from "../FormCreateTable";

export function HeaderRooms({companyId}:{companyId:string}) {

    // const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex items-center justify-start">
        <h2 className="text-2xl">Salas</h2>

        {/* <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Mesa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear Mesa</DialogTitle>
                    <DialogDescription>
                        Crea y configura tu mesa.
                    </DialogDescription>
                </DialogHeader>

                <FormCreateTable companyId={companyId} setOpenModalCreate={setOpenModalCreate}/>
                
            </DialogContent>
        </Dialog> */}


    </div>
  )
}