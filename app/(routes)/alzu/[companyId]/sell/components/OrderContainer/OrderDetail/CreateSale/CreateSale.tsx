"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandCoins } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const modalidadPago = [
    {
        id: 1,
        name: "Efectivo"
    },
    {
        id: 2,
        name: "Yape"
    }
]

const formSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es obligatorio' }),
    description: z.string(),
    imageUrl: z.string(),
    active: z.boolean(),
    companyId: z.string(),
    categoryId: z.string().min(1, { message: 'Seleccione una categoria' }),
  })

export function CreateSale() {

    const [openModalCreate, setOpenModalCreate] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description:  "",
          imageUrl: "",
          active: true,
          companyId: "",
          categoryId:"",
        },
    });

     function onSubmit(values: z.infer<typeof formSchema>) {
        
     }


  return (
    <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    <HandCoins className='h-4 w-4' /> 
                   Pagar
                </Button>
            </DialogTrigger>
            <DialogContent 
            // className="sm:max-w-[625px] lg:h-[80%] overflow-y-auto p-4"
            className="sm:max-w-md"
            >
                {/* <div className='h-full overflow-y-auto'> */}
                <DialogHeader>
                    <DialogTitle>Pagar Pedido</DialogTitle>
                    <DialogDescription>
                        Configura el pago de tu pedido
                    </DialogDescription>
                </DialogHeader>
                <div className='flex items-center space-x-2'>
                    <div className="grid flex-1 gap-2">
                        
                    {/* <FormCreateProduct companyId={companyId} categories={categories} setOpenModalCreate={setOpenModalCreate} /> */}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                            <div className="flex flex-col space-y-4">
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
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Ingrese una descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL de la imagen</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Ingrese la URL de la imagen" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            {modalidadPago.map((item)=>(
                                                <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>

                                            ))}
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
                                name="active"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Disponible</FormLabel>
                                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <FormDescription>
                                        Este producto estara disponible en la lista de atención
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


                            </div>
                            <div className="flex items-center justify-center">
                            <Button type="submit" 
                            // disabled={isPending}
                            >
                                {/* {isPending && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )} */}
                                Crear
                            </Button>
                            </div>
                        </form>
                    </Form>



                    </div>
                </div>
                {/* <FormCreateProductCategories companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}
                

                {/* </div> */}
                
            </DialogContent>
        </Dialog>
  )
}
