"use client"

import { Button } from "@/components/ui/button"
import { Size } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FormDeleteSize } from "../FormDeleteSize"


export const columns: ColumnDef<Size>[]=[
    
        // {
        //     accessorKey: "imageUrl",
        //     header:"Imagen",
        //     cell: ({row}) => {
        //         const image = row.getValue("imageUrl")
        //         return (
        //             <div className="px-3">
        //                 <Image 
        //                     src={typeof image === 'string' && image !== "" ? image: "/images/company-icon.png"}
        //                     width={40}
        //                     height={40}
        //                     alt="Image"
        //                     className="h-auto w-auto"
        //                 />
        //             </div>
        //         )
        //     }
        // },
        {
            accessorKey: "name",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Nombre
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            }
        },

        {
            accessorKey: "active",
            header: ({column}) => {
                return (
                    <div className="flex justify-center">
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Activo
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                    </div>
                )
            },
            cell:({row}) => {
                const {active} = row.original
                return (
                    <div className="flex justify-center">
                        <Badge variant={active === true ? "default" : "destructive"}>{active === true ? "Si" : "No"}</Badge>
                    </div>
                )
                
            }
        },
        
        {
            id: "actions",
            header: () => {
                return (
                    <div className="flex justify-center">
                    
                        Acciones
                    
                    </div>
                )
            },
            cell: ({row}) => {
                const { id} = row.original
                
                return(
                    <div className="flex items-center justify-center gap-4">
                    <Link href={`./sizes/${id}`}>
                        <Button>
                            <Pencil className="w-4 h-4"/>
                        </Button>
                    </Link>
                    <FormDeleteSize sizeId={id}>
                        <Button variant="destructive">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                     </FormDeleteSize>
                     </div>
                                    )
            }
        },
    
]

