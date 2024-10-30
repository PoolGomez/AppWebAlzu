"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { FormCreateCategory } from '../FormCreateCategory'
import { Plus } from 'lucide-react'

export function HeaderCategories({companyId}:{companyId:string}) {
    const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className="flex items-center justify-between">
        <h2 className="text-2xl">Categorias</h2>

        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Categoria</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear Categoria</DialogTitle>
                    <DialogDescription>
                        Create and configure your customer
                    </DialogDescription>
                </DialogHeader>

                <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/>
            </DialogContent>
        </Dialog>




        {/* <div className='flex items-center gap-2'>
            <Link href={`./categories/create`}>
                <Button>
                    <Plus />
                    Crear
                </Button>
            </Link>
        
        <Button variant={"destructive"}>
            <Trash2 />
        </Button>
        </div> */}
    </div>
  )
}
