"use client"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { formProductSchema } from './FormProduct.form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormProductProps } from './FormProduct.types';

export function FormProduct(props: FormProductProps) {
    const {product, categories} = props;

    const router = useRouter()
    const [isPending, startTransition] = useTransition()
  
    const form = useForm<z.infer<typeof formProductSchema>>({
      resolver: zodResolver(formProductSchema),
      defaultValues: {
        name: product.name,
        description: product.description ?? undefined,
        imageUrl: product.imageUrl ?? undefined,
        companyId: product.companyId,
        categoryId: product.categoryId,
        active: product.active
      },
    });
  
    const onSubmit = async (values: z.infer<typeof formProductSchema>) => {
      // ✅ This will be type-safe and validated.
      startTransition(async()=>{
  
        try {
          await axios.patch(`/api/product/${product.id}`, values);
          toast({
            title: "✅ Producto actualizado exitosamente",
          });
          router.refresh();
        } catch (error) {
          console.log(error);
          toast({
            title: "❌ Error al actualizar el producto",
            variant: "destructive",
          });
        }
      })
      
    };

  return (
    // <div className='flex w-full sm:w-[75%] h-screen p-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        // className="space-y-8 w-full sm:w-[75%]"
        >
          <div 
          className="flex flex-col space-y-2"
          >
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                          <Input placeholder="Ingrese el nombre de la categoria" type="text" {...field} />
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
                      <FormLabel>Descripción:</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ingrese una descripción" {...field} />
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
                                <SelectValue placeholder="Seleccione la caetegoria"/>
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
                  name="imageUrl"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>URL de la imagen</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ingrese la URL de la imagen" {...field} />
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
                    <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
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
          <div className='flex items-center justify-center pt-4'>
            <Button type="submit" disabled={isPending} >
              {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
              )}
              Guardar
            </Button>

          </div>
              
          
        </form>
      </Form>
      // </div>
  )
}
