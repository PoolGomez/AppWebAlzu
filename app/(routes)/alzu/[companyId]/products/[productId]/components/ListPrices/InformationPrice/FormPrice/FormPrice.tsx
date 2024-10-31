"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormPriceProps } from "./FormPrice.types";
import { formProductPriceSchema } from "./FormPrice.form";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function FormPrice(props: FormPriceProps) {
    // formProductPriceSchema
    const{setOpen, productPrice, size} = props
    const router = useRouter()
    const params = useParams<{productId: string}>()
    const form = useForm<z.infer<typeof formProductPriceSchema>>({
        resolver: zodResolver(formProductPriceSchema),
        defaultValues:{
            productId: params.productId,
            sizeId: productPrice.sizeId,
            active: productPrice.active,
            amount: Number(productPrice.amount),
        }
    })

    const onSubmit = async (values: z.infer<typeof formProductPriceSchema>) => {
        console.log("On SUBMIT")
        try {
            axios.patch(`/api/product-price/${productPrice.id}`,values)
            toast({
                title:"✅ Correcto",
                description:"Precio actualizado exitosamente"
            })
            router.refresh()
            setOpen(false)
        } catch (error) {
            console.log(error)
            toast({
                title:"Errorr",
                description:"Error al actualizar el precio",
                variant:"destructive"
            })
        }
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-1 grid gap-4">
        {/* {JSON.stringify(productPrice)} */}

        <FormField
            control={form.control}
            name="amount"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0.00" 
                            value={field.value} // Asegúrate de que el valor se mantenga actualizado
                            onChange={(e) => {
                                const value = e.target.value;
                                // Convertir a número, si está vacío, establecer en null o en 0 según tu lógica
                                field.onChange(value ? Number(value) : null);
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        {/* <Input disabled value={size.name} /> */}
        <FormField
            // control={form.control}
            name="sizeId"
            render={() => (
                <FormItem>
                    <FormLabel>Tamaño</FormLabel>
                    <FormControl>
                        <Input disabled value={size.name} />
                    </FormControl>
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
                    Este precio {field.value === true ? <span className="font-bold">SI</span> : <span className="font-bold">NO</span> } estara disponible en la lista de atención
                  </FormDescription>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

        <Button type="submit">Actualizar precio</Button>
        </form>
    </Form>
  )
}
