"use client"

import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FormDeleteProduct } from "../FormDeleteProduct"


export const columns: ColumnDef<Product>[]=[
    
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
            accessorKey: "category.name",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Categoria
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                // const categoryName = row.getValue("category.name");
                const {category} = row.original
                return (
                    <div 
                    // className="flex justify-center"
                    >
                        {/* {categoryName} Muestra el nombre de la categoría */}
                        {category.name}
                    </div>
                );
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
                    <Link href={`./products/${id}`}>
                        <Button>
                            <Pencil className="w-4 h-4"/>
                        </Button>
                    </Link>
                    <FormDeleteProduct productId={id}>
                        <Button variant="destructive">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                     </FormDeleteProduct>
                     </div>
                                    )
            }
        },
    
]
