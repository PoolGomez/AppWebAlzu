"use client"
import { useRouter } from "next/navigation";
import { FormCreateTableProps } from "./FormCreateTable.types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCreateTableSchema } from "./FormCreateTable.form";
import { useTransition } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";


export function FormCreateTable(props:FormCreateTableProps) {

    const { companyId, setOpenModalCreate } = props;
    
    const router = useRouter();
    // const [photoUploaded,setPhotoUploaded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof formCreateTableSchema>>({
        resolver: zodResolver(formCreateTableSchema),
        defaultValues: {
        name: "",
        active: true,
        companyId,
        },
    });

    // const {isValid} = form.formState;

    function onSubmit(values: z.infer<typeof formCreateTableSchema>) {
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

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Disponible</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormDescription>
                    La categoria estara disponible en la lista de atención
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
