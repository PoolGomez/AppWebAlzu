"use client"
import React, { useTransition } from 'react'
import { CategoryInformationProps } from './InformationCategory.types'
import { useRouter } from 'next/navigation';
import { formSchema } from './InformationCategory.form';
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

export function InformationCategory(props: CategoryInformationProps) {
    const {category} = props;

    const router = useRouter()
    const [isPending, startTransition] = useTransition()
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: category.name,
        imageUrl: category.imageUrl ?? undefined,
        companyId: category.companyId,
        active: category.active
      },
    });
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
  
      startTransition(async()=>{
        try {
          await axios.patch(`/api/category/${category.id}`, values);
          toast({
            title: "✅ Correcto",
            description: "Categoria actualizada exitosamente",
          });
          router.refresh();
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "Error al actualizar la categoria",
            variant:"destructive"
          });
        }
      })
      
    };

  return (
    <div className='flex w-full sm:w-[75%] h-screen p-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full sm:w-[75%]">
          <div 
          className="flex flex-col space-y-8"
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
          <div className='flex items-center justify-center'>
            <Button type="submit" disabled={isPending} >
              {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
              )}
              Guardar
            </Button>

          </div>
              
          
        </form>
      </Form>
      </div>
  )
}
