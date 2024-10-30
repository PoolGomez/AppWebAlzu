"use client"
import { useRouter } from 'next/navigation';
import { FormCreateProductProps } from './FormCreateProduct.types'
import { useTransition } from 'react';
import { formSchema } from './FormCreateProduct.form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export function FormCreateProduct(props: FormCreateProductProps) {
  const { companyId, categories ,setOpenModalCreate } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description:  "",
      imageUrl: "",
      active: true,
      companyId,
      categoryId:"",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ 
    startTransition(async () => {
      try {
        axios.post("/api/product", values);
        toast({
          title: "✅ Producto creado correctamente",
        });
        router.refresh();
        setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "❌ Error al crear el producto",
          variant: "destructive",
        });
      }
    });
  }

  return (
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
                          {categories.map((category)=>(
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>

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
