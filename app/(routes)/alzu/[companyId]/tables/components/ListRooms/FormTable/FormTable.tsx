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
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formSchemaTable } from "./FormTable.form";

export function FormTable({ companyId }: { companyId: string }) {
  const [columns, setColumns] = useState(6);
  const [rows, setRows] = useState(6);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaTable>>({
    resolver: zodResolver(formSchemaTable),
    defaultValues: {
      name: "",
      rows: 6,
      columns: 6,
      active: true,
      companyId,
    },
  });

  const onChangeValueRows = (value: number) => {
    setRows(value);
    form.setValue("rows", value);
  };

  const onChangeValueColumns = (value: number) => {
    setColumns(value);
    form.setValue("columns", value);
  };

  function onSubmit(values: z.infer<typeof formSchemaTable>) {
    startTransition(async () => {
      try {
        axios.post("/api/room", values);
        toast({
          title: "✅ Correcto",
          description: "Mesa creada exitosamente",
        });
        router.refresh();
        // setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Error al crear la mesa",
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
              Creación de la mesa
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure las opciones de creación de la mesa.
            </p>
          </div>
          <Separator className="my-4" />
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
                name="rows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Filas</FormLabel>
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

              <Slider
                defaultValue={[6]}
                min={6}
                max={10}
                step={1}
                // onChange={(event) => console.log(event.target)}
                onValueChange={(i) => onChangeValueRows(i[0])}
                className="py-4"
              />

              <FormField
                control={form.control}
                name="columns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Columnas</FormLabel>
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

              <Slider
                defaultValue={[6]}
                min={6}
                max={10}
                step={1}
                // onChange={(event) => console.log(event.target)}
                onValueChange={(i) => onChangeValueColumns(i[0])}
                className="py-4"
              />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Disponible</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormDescription>
                    La mesa estara disponible en la lista de atención
                  </FormDescription>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      // disabled
                      aria-readonly
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Crear
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-2 sm:p-4 w-full h-full">
        {/* GRID CONTAINER */}
        {/* <div className="relative bg-blue-500 rounded-lg shadow-sm overflow-hidden"> */}
          <div className="space-y-1">
            <h2 className="text-lg font-medium leading-none">
              Previsualización de la mesa
            </h2>
            {/* <p className="text-sm text-muted-foreground">
              Configure las opciones de creación de la mesa.
            </p> */}
          </div>
          <Separator className="my-4" />

        <div
          // gap-0 p-2
          className="w-full h-[600px] grid gap-1 sm:gap-2 p-0"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({
            length: rows * columns,
          }).map((_, index) => {
            const row = Math.floor(index / form.getValues("rows"));
            const column = index % form.getValues("rows");
            const keycell = `${row}-${column}`;

            return (
              <div
                key={keycell}
                // className={`
                //   relative h-10 border border-gray-200
                //   flex items-center justify-center cursor-pointer
                //   before:absolute before:inset-0 before:border-t before:border-l before:border-gray-100
                //   after:absolute after:inset-0 after:border-b after:border-r after:border-gray-100 hover:bg-gray-50
                // `}
                className="bg-white border border-gray-300 flex items-center justify-center text-white font-bold"
              >
                {/* <div
                    className={`
                      text-sm font-medium px-2 py-1 rounded bg-white
                    `}
                  ></div> */}
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
