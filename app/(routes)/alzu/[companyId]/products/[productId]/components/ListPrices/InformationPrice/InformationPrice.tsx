"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormPrice } from "./FormPrice";
import { InformationPriceProps } from "./InformationPrice.types";

export function InformationPrice(props:InformationPriceProps) {
    const {productPrice,size} = props
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-8 h-8" variant="default"><Pencil className="w-4 h-4" /></Button>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-[625px]'>
                                <DialogHeader>
                                    <DialogTitle>Actualizar precio</DialogTitle>
                                    <DialogDescription>
                                        Actualiza los datos del precio
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <FormPrice setOpen={setOpen} productPrice={productPrice} size={size} />
                                {/* <FormCreatePrice setOpen={setOpen} sizes={sizes} /> */}
                            </DialogContent>
                        </Dialog>
  )
}
