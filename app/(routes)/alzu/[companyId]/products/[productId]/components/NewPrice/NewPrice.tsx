"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { FormCreatePrice } from './FormCreatePrice'
import { Size } from '@prisma/client'
import { Coins, Plus } from 'lucide-react'

export function NewPrice({sizes}:{sizes: Size[]}) {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button 
            disabled={sizes.length === 0 ? true : false} 
            >
                {sizes.length > 0 && <Plus/>}
                {sizes.length === 0 ? "Precios completos" : "Agregar"}
                    {/* <Plus/>Agregar */}
                
                
            </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[625px]'>
            <DialogHeader>
                <DialogTitle>Agregar nuevo precio</DialogTitle>
                <DialogDescription>
                    Crea un nuevo precio seleccionando el tamaño indicado
                </DialogDescription>
            </DialogHeader>
            <FormCreatePrice setOpen={setOpen} sizes={sizes} />
        </DialogContent>
    </Dialog>
  )
}
