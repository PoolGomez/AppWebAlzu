"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { FormDeleteSizeProps } from "./FormDeleteSize.types";

export function FormDeleteSize(props: FormDeleteSizeProps) {
  const { children, sizeId } = props;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDeleteSize = async () => {
    startTransition(async () => {
      try {
        axios.delete(`/api/size/${sizeId}`);
        toast({
          title: "Tamaño borrado",
        });
        router.refresh();
        setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error eliminando tamaño",
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
            ¿Esta seguro que desea eliminar este tamaño?
          </DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer, se eliminara el tamaño de la base de datos
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={onDeleteSize}
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
  );
}
