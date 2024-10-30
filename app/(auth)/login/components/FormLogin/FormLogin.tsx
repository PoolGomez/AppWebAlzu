
"use client"

import { z } from "zod"
import { loginSchema } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/auth-action"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"


export function FormLogin(
    // {isVerifyEmail}:{isVerifyEmail: boolean}
) {
    const [error , setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    //definir formulario
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })
    //definir el submit
    async function onSubmit(values: z.infer<typeof loginSchema>){
        setError(null);
        startTransition(async()=>{
            const response = await loginAction(values);
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
                Iniciar sesión
            </h1>
            <p className="text-sm text-muted-foreground">
                {/* Enter your email and password to sign in */}
                Ingrese su correo y contraseña para ingresar
            </p>
            {/* {isVerifyEmail &&(
                <p className="text-center text-green-500 mb-5 text-sm">
                El email ha sido verificado
            </p>
            )} */}
        </div>

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-2 mx-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Correo electrónico</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Ingrese su email" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Ingresar el correo electronico.sadasdasd
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

                    {/* <p className="underline text-muted-foreground underline-offset-4 hover:text-primary my-6 text-sm text-end">
                    <Link href="/recovery"  >
                        Recuperar contraseña
                    </Link>
                    </p> */}
                    {error && <FormMessage>{error}</FormMessage>}
                    <Button type="submit" 
                    // disabled={isPending}
                    >
                        {isPending && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Iniciar sesión
                    </Button>
                </div>
                
            </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
            No tienes una cuenta?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Crear cuenta
            </Link>
        </p>
    </>

  )
}
