import { useRouter } from "next/navigation";
import { FormCreateSizeProps } from "./FormCreateSize.types";
import { useTransition } from "react";
import { formSchema } from "./FormCreateSize.form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export function FormCreateSize(props:FormCreateSizeProps) {

    const { companyId, setOpenModalCreate } = props;
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        active: true,
        companyId,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ This will be type-safe and validated.
        startTransition(async () => {
        try {
            axios.post("/api/size", values);
            toast({
            title: "✅ Tamaño creado",
            });
            router.refresh();
            setOpenModalCreate(false);
        } catch (error) {
            console.log(error);
            toast({
            title: "Error al crear el tamaño",
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
                    El tamaño estara disponible en la lista de atención
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
