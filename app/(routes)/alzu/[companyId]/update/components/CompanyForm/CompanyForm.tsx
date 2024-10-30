"use client"

import {zodResolver} from "@hookform/resolvers/zod"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { formSchema } from "./CompanyForm.form";
import { CompanyFormProps } from "./CompanyForm.types";

export function CompanyForm(props: CompanyFormProps) {
    const router = useRouter();
    const {company} = props
    // const [photoUploaded, setPhotoUploaded] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: company.name,
            description: company.description,
            // country: company.country,
            // website: company.website,
            // phone: company.phone,
            // cif: company.cif,
            profileImage: company.profileImage ?? undefined
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            await axios.patch(`/api/company/${company.id}`, values)
            toast({
                title:"Company updated!"
            })
            router.refresh();
        } catch (error) {
            // console.log(error);
            toast({
                title:"Sommething went wrong",
                variant:"destructive"
            })
        }
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Company name</FormLabel>
                            <FormControl>
                                <Input placeholder="Company name..." type="text" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="profileImage"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>URL Imagen</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="profileImage..."
                                    {...field} 
                                    value={form.getValues().profileImage ?? ''} />
                            </FormControl>
                        </FormItem>
                    )}
                />



                {/* <FormField
                    control={form.control}
                    name="profileImage"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <FormControl>
                                <div>
                                    {photoUploaded ? (
                                        <p className="text-sm">Image uploaded!</p>
                                    ):(
                                        <UploadButton
                                            className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                            {...field}
                                            endpoint="profileImage"
                                            onClientUploadComplete={(res)=>{
                                                form.setValue("profileImage", res?.[0].url)
                                                setPhotoUploaded(true)
                                            }}
                                            onUploadError={(error: Error)=>{
                                                console.log(error)
                                                toast({title: "Error uploading photo"})
                                            }}
                                        />
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Company description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Description..."
                                    {...field} 
                                    value={form.getValues().description ?? ''} />
                            </FormControl>
                        </FormItem>
                    )}
                />


            </div>
            <Button type="submit">Edit company</Button>
        </form>
    </Form>
  )
}
