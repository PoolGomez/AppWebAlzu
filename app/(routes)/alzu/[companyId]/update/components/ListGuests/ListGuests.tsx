import {db} from "@/lib/db"


// import { auth } from "@clerk/nextjs/server";
import { Mail, Phone, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ListContactsProps } from "./ListGuests.types";

export async function ListGuests( props: ListContactsProps) {
    const { company } = props
    // const { userId } = auth()
    // if(!userId){
    //     return redirect("/")
    // }
    const contacts = await db.contact.findMany({
        where:{
            company:{
                id: company.id
            }
        }
    })

    if(contacts.length === 0){
        return <p>Actualmente no dispondes de ningun invitado</p>
    }
  return (
    <div>
        <div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg">
            <p>Email</p>
            <p>Role</p>
            <p className="text-right">Accion</p>
        </div>
        {contacts.map((contact: any) =>(
            <div key={contact.id}>
                <div className="grid grid-cols-3 gap-x-3 items-center justify-between px-4">
                    <p>{contact.name}</p>
                    <p>{contact.role}</p>
                    <div className="flex items-center gap-x-6 justify-end">
                        <Trash2 className="w-4 h-4" />
                        {/* <a href={`telto: ${contact.phone}`} target="_blank">
                            <Phone className="w-4 h-4" />
                        </a>
                        <a href={`mailto: ${contact.email}`} target="_blank">
                            <Mail className="w-4 h-4" />
                        </a> */}
                    </div>
                </div>
                <Separator className="my-3" />
            </div>

        ))
        }
    </div>
  )
}
