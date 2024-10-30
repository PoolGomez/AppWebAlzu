"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FormDeleteCategory } from "../FormDeleteCategory"
import { Badge } from "@/components/ui/badge"


export const columns: ColumnDef<Category>[]=[
    
        {
            accessorKey: "imageUrl",
            header:"Imagen",
            cell: ({row}) => {
                const image = row.getValue("imageUrl")
                // console.log('test company image:', typeof image)
                return (
                    <div className="px-3">
                        <Image 
                            // src={typeof image === 'string' ? image: "/images/company-icon.png"}
                            src={typeof image === 'string' && image !== "" ? image: "/images/company-icon.png"}
                            width={40}
                            height={40}
                            alt="Image"
                            className="h-auto w-auto"
                        />
                    </div>
                )
            }
        },
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
                
                // active === true ? (<Badge variant="outline">Si</Badge> ): (<Badge variant="destructive">No</Badge>)
            }
        },
        
        {
            id: "actions",
            header: () => {
                return (
                    <div className="flex justify-center">
                    {/* <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}> */}
                        Acciones
                        {/* <ArrowUpDown className="w-4 h-4 ml-2" /> */}
                    {/* </Button> */}
                    </div>
                )
            },
            cell: ({row}) => {
                const { id} = row.original
                
                return(
                    <div className="flex items-center justify-center gap-4">
                    <Link href={`./categories/${id}`}>
                        <Button>
                            <Pencil className="w-4 h-4"/>
                        </Button>
                    </Link>
                    <FormDeleteCategory categoryId={id}>
                        <Button variant="destructive">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                     </FormDeleteCategory>
                     </div>
                                    )
            }
        },
    
]

{/* <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" className="w-8 h-4 p-0">
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href={`./categories/${id}`}>
                                <DropdownMenuItem>
                                    <Pencil className="w-4 h-4 mr-2 " />
                                    Editar
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                            Borrar

                            </DropdownMenuItem>


                        </DropdownMenuContent>
                    </DropdownMenu> */}

 {/* MODAL PARA BORRAR CATEGORIA */}
//  <FormDeleteCategory>
//  <Button>test</Button>
//  <Trash2 className="w-4 h-4 mr-2 text-red-500" />
//  Borrar
// </FormDeleteCategory>
