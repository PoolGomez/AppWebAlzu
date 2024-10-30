
"use client"

import { z } from "zod"
import { registerSchema } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { registerAction } from "@/actions/auth-action"
import Link from "next/link"
import { LoaderCircle } from "lucide-react"

export function FormRegister() {
    const [error , setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    //definir formulario
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            name:"",
        }
    })
    //definir el submit
    async function onSubmit(values: z.infer<typeof registerSchema>){
        setError(null);
        startTransition(async()=>{
            const response = await registerAction(values);
            if (response.error) {
                setError(response.error);
            } else {
                router.push("/alzu");
            }
        })
    }


  return (
    <>
        <div className="text-center">
            <h1 className='text-3xl my-2'>
                Registro
            </h1>
            <p className="text-sm text-muted-foreground">
                {/* Enter your email and password to sign in */}
                Ingrese su email y contraseña para registrarse
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-2 mx-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su nombre" type="text" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Ingresar el nombre del usuario.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su Email" type="email" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Ingresar el correo electronico.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese su contraseña" type="password" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Ingresar el correo electronico.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <FormMessage>{error}</FormMessage>}
                <Button type="submit" disabled={isPending}>
                    {isPending && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                    )}
                    Registrarse
                </Button>
            </div>
            </form>
        </Form>
    
        <p className="text-center text-sm text-muted-foreground">
                Si ya tienes una cuenta?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Inicia Sesión
                </Link>
            </p>
    </>
  )
}
