"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormDeletePriceProps } from "./FormDeletePrice.types";

export function FormDeletePrice(props:FormDeletePriceProps) {
    const { priceId,children} = props;
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const onDeleteProduct = async () => {
        startTransition(async () => {
        try {
            axios.delete(`/api/product-price/${priceId}`);
            toast({
              title: "✅ Correcto",
              description:"Precio borrado exitosamente"
            });
            
            router.refresh();
            setOpenModalCreate(false);
        } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              description:"Error al borrar el precio",
              variant: "destructive",
            });
        }
        });
    };

  return (
    <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            ¿Esta seguro que desea eliminar este product?
          </DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer, se eliminara este producto de la base de datos
          </DialogDescription>
        </DialogHeader>

        {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}

        <DialogFooter className="sm:justify-center">
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={onDeleteProduct}
          >
            {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Si
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
