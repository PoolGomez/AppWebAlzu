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
import React, { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Table } from "@prisma/client";

type Props = {
    tableId: string;
    setTableSelected: Dispatch<SetStateAction<Table | null>>
    children: React.ReactElement;
}

export function FormDeleteTable(props: Props) {
  const { children, tableId ,setTableSelected} = props;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDeleteCategory = async () => {
    startTransition(async () => {
      try {
        axios.delete(`/api/table/${tableId}`);
        toast({
          title: "✅ Correcto",
          description:"Mesa borrada exitosamente"
        });
        setTableSelected(null)
        router.refresh();
        setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description:"Error al borrar la mesa",
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
            ¿Esta seguro que desea eliminar esta mesa?
          </DialogTitle>
          <DialogDescription>
            Esta accion no se puede deshacer
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
