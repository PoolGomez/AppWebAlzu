"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaCreateTable } from "./FormCreateTable.form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { StatusTable } from "@prisma/client";

type FormCreateTableProps = {
    companyId: string;
    roomId: string;
    row: number;
    column: number;
    setOpenModalCreate : Dispatch<SetStateAction<boolean>>;
}

export function FormCreateTable(props: FormCreateTableProps) {

    const {companyId, roomId,row,column, setOpenModalCreate } = props;
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchemaCreateTable>>({
        resolver: zodResolver(formSchemaCreateTable),
        defaultValues: {
        name: "",
        roomId: roomId,
        status: StatusTable.available,
        column: column,
        row: row,
        companyId: companyId
        },
    });

    function onSubmit(values: z.infer<typeof formSchemaCreateTable>) {
        startTransition(async () => {
        try {
            const response = await axios.post("/api/table", values);
            console.log(response.data.status);
            toast({
            title: "✅ Correcto",
            description: "Mesa creada exitosamente",
            });
            router.refresh();
            setOpenModalCreate(false);
        } catch (error) {
            // console.log(error);
            toast({
            title: "Error",
            description: "Error al crear la mesa",
            variant: "destructive",
            });
        }
        });
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese un nombre"
                    type="text"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <label>
            Row: {row}
            Column: {column}
          </label>

        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear
          </Button>
        </div>
      </form>
    </Form>
  )
}
