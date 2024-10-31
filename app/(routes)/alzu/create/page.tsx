"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { LoaderCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  profileImage: z.string(),
});

export default function CreateCompanyPage() {
  const router = useRouter();
  // const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description:"",
      profileImage: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    startTransition(async()=>{

      try {
        await axios.post("/api/company", values);
        toast({
          title: "✅ Correcto",
          description:"Empresa creada exitosamente"
        });
        router.push("./");
        router.refresh()
        // setOpenModalCreate(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description:"Error al crear la empresa",
          variant: "destructive",
        });
      }

    })
    
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen p-2 '>
      <div className='flex items-center justify-between w-full sm:w-[75%]'>
        {/* <ArrowLeft className='text-slate-800 hover:text-slate-900 cursor-pointer' onClick={()=>router.push("/alzu")}/> */}

        <h1 className='text-3xl p-8'>Crear nueva empresa</h1>
        <X className='text-slate-800 hover:text-slate-900 cursor-pointer' onClick={()=>router.push("/alzu")}/>
      </div>
      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full sm:w-[75%]">
      {/* grid grid-cols-2 gap-3 */}
        <div 
        className="flex flex-col"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre de la empresa</FormLabel>
                    <FormControl>
                        <Input placeholder="Ingrese el nombre de la empresa" type="text" {...field} />
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
                    <FormLabel>Descripcion de la empresa</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ingrese una descripcion breve" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="profileImage"
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
            

            {/* <FormField control={form.control} name="profileImage" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                        {photoUploaded ? (
                            <p className="text-sm">Image uploaded!</p>
                        ):(
                        <UploadButton 
                            className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3" 
                            {...field}
                            endpoint="profileImage"
                            onClientUploadComplete={(res)=>{
                                form.setValue("profileImage", res?.[0].url)
                                toast({
                                    title:"Photo uploaded!"
                                })
                                setPhotoUploaded(true)
                            }}
                            onUploadError={(error: Error) => {
                                console.log(error)
                                toast({
                                    title:"Error uploading photo"
                                })
                            }}
                        />
                        )}
                        
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            /> */}

        </div>
        <div className='flex items-center justify-center'>
          <Button type="submit" disabled={!isValid} >
            {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Crear
          </Button>

        </div>
            
        
      </form>
    </Form>

    </div>
  )
}
