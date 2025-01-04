"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Save, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { Room, StatusTable, Table } from "@prisma/client";
import { formSchemaTable } from "../FormTable/FormTable.form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormDeleteTable, MapRoom } from "./MapRoom";

export function FormRoom({companyId, room, tables }: {companyId: string, room: Room, tables: Table[] }) {
  const [columns, setColumns] = useState(room.columns);
  const [rows, setRows] = useState(room.rows);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [tableSelected, setTableSelected] = useState<Table | null>(null);

  const form = useForm<z.infer<typeof formSchemaTable>>({
    resolver: zodResolver(formSchemaTable),
    defaultValues: {
      name: "",
      status: "",
      column: 0,
      row: 0,
      roomId: room.id,
      companyId: companyId,
    },
  });

  const setTable = (table:Table) => {
    setTableSelected(table);
    form.setValue("status",table.status)
    form.setValue("name",table.name)
    form.setValue("row",table.row)
    form.setValue("column",table.column)
  }

  // useEffect(()=>{
  //   if(tableSelected){
  //     console.log("form.getValues(status):",form.getValues("status"))
  //     console.log("tableSelected.status:",tableSelected.status)
  //     form.setValue("status",tableSelected.status)
  //     form.setValue("name",tableSelected.name)
  //     form.setValue("row",tableSelected.row)
  //     form.setValue("column",tableSelected.column)
      
  //   }
  // },[tableSelected,form])

  //   const onChangeValueRows = (value: number) => {
  //     setRows(value);
  //     form.setValue("rows", value);
  //   };

  //   const onChangeValueColumns = (value: number) => {
  //     setColumns(value);
  //     form.setValue("columns", value);
  //   };

  function onSubmit(values: z.infer<typeof formSchemaTable>) {
    startTransition(async () => {
      try {
        axios.patch(`/api/table/${tableSelected?.id}`, values);
        toast({
          title: "✅ Correcto",
          description: "Mesa actualizada exitosamente",
        });
        router.refresh();
        // setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Error al actualizar la mesa",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4 w-full h-full">
      {/* bg-background */}
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 w-full h-full">
        <div className="flex flex-col space-y-4 w-full h-full">
          <div className="space-y-1">
            <h2 className="text-lg font-medium leading-none">
                {tableSelected ? (
                    "Información de la mesa"
                ):(
                    "Seleccione una mesa para ver las opciones"
                )
                }
              
            </h2>
            <p className="text-sm text-muted-foreground">
            {tableSelected ? (
                    "Configure las opciones de la mesa."
                ):(
                    "Porfavor seleccione una mesa"
                )
                }
              
            </p>
          </div>
          <Separator className="my-4" />
          {tableSelected && (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nombre</FormLabel>
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

              <FormField
                control={form.control}
                name="column"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Columna</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="Ingrese un nombre"
                        type="number"
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

              <FormField
                control={form.control}
                name="row"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Fila</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="Ingrese un nombre"
                        type="number"
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value}

                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {Object.values(StatusTable).map((status, index) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="available">available</SelectItem>
                        <SelectItem value="occupied">occupied</SelectItem>
                        <SelectItem value="disabled">disabled</SelectItem>
                        <SelectItem value="reserved">reserved</SelectItem>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  ):(
                    <Save className="mr-2 h-4 w-4"/>
                  )}
                  
                  Guardar Cambios
                </Button>
                <FormDeleteTable tableId={tableSelected.id} setTableSelected={setTableSelected}>
                                        <Button type="button" variant="destructive" className="ml-4">
                                        <Trash2 className="w-4 h-4" />
                                        Borrar Mesa
                                        </Button>
                                     </FormDeleteTable>
                
              </div>
            </form>
          </Form>  
          )}
          
        </div>
      </div>

      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-2 sm:p-4 w-full h-full">
        <MapRoom companyId={companyId} room={room} tables={tables} setTableSelected={setTable}/>
      </div>
    </div>
  );
}
