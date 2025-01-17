"use client"

import {useForm} from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { FormCreatePriceProps } from "./FormCreatePrice.types"
import { formCreatePriceSchema } from "./FormCreatePrice.form"
import { Switch } from "@/components/ui/switch"

function toCents (value: string | number): number {

    // Convertir a número flotante
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        throw new Error("El valor ingresado no es un número válido.");
    }

    // Redondear a 2 decimales y convertir a centavos
    return Math.round(numericValue * 100);
}

export function FormCreatePrice(props: FormCreatePriceProps) {

    const{setOpen,sizes} = props
    const params = useParams<{productId: string}>()
    const router = useRouter()
    const form = useForm<z.infer<typeof formCreatePriceSchema>>({
        resolver: zodResolver(formCreatePriceSchema),
        defaultValues:{
            productId: params.productId,
            sizeId: "",
            active: true,
            amount: 0,
        }
    })
    const { register, handleSubmit, setValue, watch } = form;
    // Observar el valor actual del amount
    // const amount = watch("amount") / 100 || 0;
    const onSubmit = async (values: z.infer<typeof formCreatePriceSchema>) => {

        const processedData = {
            ...values,
            amount: toCents(values.amount)
        }
        
        try {
            const response = await axios.post(`/api/product/${params.productId}/product-price`,processedData)
            console.log("[response]",response.data)
            if(response.data.code === "error"){
                toast({
                    title: "❌ Error",
                    description: response.data.message,
                })
                router.refresh()
                setOpen(false)
                return false
            }
            toast({
                title: "✅ Correcto",
                description: "Precio creado exitosamente",
            })
            router.refresh()
            setOpen(false)
        } catch (error) {
            console.log(error)
            toast({
                title:"Error",
                description: "Error al crear el precio del producto",
                variant:"destructive"
            })
        }
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
        setValue("amount", Math.round(numericValue * 100));
        }
      };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-1 grid gap-4">
        <FormField
            control={form.control}
            name="sizeId"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Tamaño</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {sizes.map((size)=><SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>)}
                            {/* <SelectItem value="Comercial">Comercial</SelectItem>
                            <SelectItem value="CEO">CEO</SelectItem>
                            <SelectItem value="Quality">Customer Service</SelectItem>
                            <SelectItem value="Analytics">Analytics</SelectItem>
                            <SelectItem value="Other">Other...</SelectItem> */}
                        </SelectContent>
                        <FormMessage />
                    </Select>
                </FormItem>
            )}
        />  

<FormField
            control={form.control}
            name="amount"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                        <Input 
                        
                        // type="number" placeholder="0" 
                        value={field.value}
                        onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : null);
                        }}

                        type="number" // Usamos "text" para mayor control
                        placeholder="0.00"
                        // value={field.value ? (field.value / 100).toFixed(2) : ""}
                        // onChange={(e)=>{
                        //     const inputValue = e.target.value;
                        //     try {
                        //         const cents = inputValue ? toCents(inputValue) : 0;
                        //         field.onChange(cents);
                        //     } catch (error) {
                        //         console.error("Invalid input:", error)
                        //     }
                        // }}
                        />
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

        <Button type="submit">Guardar precio</Button>
        </form>
    </Form>
  )
}
