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
import { FormDeleteCategoryProps } from "./FormDeleteCategory.types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function FormDeleteCategory(props: FormDeleteCategoryProps) {
  const { children, categoryId } = props;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDeleteCategory = async () => {
    startTransition(async () => {
      try {
        axios.delete(`/api/category/${categoryId}`);
        toast({
          title: "Categoria borrada",
        });
        router.refresh();
        setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error eliminando categoria",
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
            ¿Esta seguro que desea eliminar esta categoria?
          </DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer, se eliminara tambien los productos
            asociados a esta categoria
          </DialogDescription>
        </DialogHeader>

        {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}

        <DialogFooter className="sm:justify-center">
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={onDeleteCategory}
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
