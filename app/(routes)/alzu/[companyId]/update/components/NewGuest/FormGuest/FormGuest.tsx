"use client"

import {useForm} from "react-hook-form"

import { useParams, useRouter } from "next/navigation"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { formSchema } from "./FormGuest.form"
import { FormContactProps } from "./FormGuest.types"


export function FormGuest(props: FormContactProps) {
    const{setOpen} = props
    // const params = useParams<{companyId: string}>()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            role:"",
            email:"",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("On SUBMIT")
        try {
            // axios.post(`/api/company/${params.companyId}/contact`,values)
            // toast({title:"Contact creared!"})
            router.refresh()
            setOpen(false)
        } catch (error) {
            console.log(error)
            toast({
                title:"There was an error",
                variant:"destructive"
            })
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 grid gap-4">

        <FormField
            control={form.control}
            name="email"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />


        <FormField
            control={form.control}
            name="role"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the role"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Invitado">Invitado</SelectItem>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                        </SelectContent>
                        <FormMessage />
                    </Select>
                </FormItem>
            )}
        />  

        <Button type="submit">Agregar Invitado</Button>
        </form>
    </Form>
  )
}
