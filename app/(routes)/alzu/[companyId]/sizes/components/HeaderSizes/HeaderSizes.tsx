"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from "react"
import { FormCreateSize } from '../FormCreateSize'


export function HeaderSizes({companyId}:{companyId:string}) {

    const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex items-center justify-between">
        <h2 className="text-2xl">Tamaños de producto</h2>

        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Tamaño</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear Tamaño</DialogTitle>
                    <DialogDescription>
                        Create and configure your size
                    </DialogDescription>
                </DialogHeader>
                <FormCreateSize companyId={companyId} setOpenModalCreate={setOpenModalCreate} />
            </DialogContent>
        </Dialog>
    </div>
  )
}
