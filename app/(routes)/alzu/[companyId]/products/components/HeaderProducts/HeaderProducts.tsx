"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Category } from '@prisma/client'
import { FormCreateProduct } from '../FormCreateProduct'

export function HeaderProducts({companyId, categories}:{companyId:string, categories:Category[]}) {

    const [openModalCreate, setOpenModalCreate] = useState(false)

    


  return (
    <div className="flex items-center justify-between">
        <h2 className="text-2xl">Productos</h2>

        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='h-4 w-4' /> 
                    Crear Producto
                </Button>
            </DialogTrigger>
            <DialogContent 
            // className="sm:max-w-[625px] lg:h-[80%] overflow-y-auto p-4"
            className="sm:max-w-md"
            >
                {/* <div className='h-full overflow-y-auto'> */}
                <DialogHeader>
                    <DialogTitle>Crear Producto</DialogTitle>
                    <DialogDescription>
                        Create and configure tu product
                    </DialogDescription>
                </DialogHeader>
                <div className='flex items-center space-x-2'>
                    <div className="grid flex-1 gap-2">
                    <FormCreateProduct companyId={companyId} categories={categories} setOpenModalCreate={setOpenModalCreate} />
                    </div>
                </div>
                {/* <FormCreateProductCategories companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}
                

                {/* </div> */}
                
            </DialogContent>
        </Dialog>

    </div>
  )
}
