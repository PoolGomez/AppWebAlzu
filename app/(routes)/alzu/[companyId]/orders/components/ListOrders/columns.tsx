"use client"

import { Button } from "@/components/ui/button"
import { Order, Room, StatusOrder, Table } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/formatPrice"
// import { OrderFull } from "@/domain"
// import { FormDeleteProduct } from "../FormDeleteProduct"


export const columns: ColumnDef<Order>[]=[

    {
        accessorKey: "room.name",
        header: ({column}) => {
            return (
                <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    Sala
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
        cell:({row}) => {
            const order : any = row.original
            const room : Room = order.room;
            return(
                <div className="flex justify-center">
                    {room.name}
                </div>
            )
        }
    },
    
        {
            accessorKey: "table.name",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Mesa
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell:({row}) => {
                const order :any = row.original
                const table : Table = order.table;
                return(
                    <div className="flex justify-center">
                        {table.name}
                    </div>
                )
            }
        },
        {
            accessorKey: "product.name",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Producto
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell:({row}) => {
                const order: any = row.original
                return(
                    <div className="flex justify-center">
                        {order.product.name}
                    </div>
                )
            }
        },
        // {
        //     accessorKey: "total",
        //     header: ({column}) => {
        //         return (
        //             <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
        //                 Total
        //                 <ArrowUpDown className="w-4 h-4 ml-2" />
        //             </Button>
        //         )
        //     },
        //     cell:({row}) => {
        //         const order : any = row.original
        //         return(
        //             <div className="flex justify-center">
        //                 {formatPrice(order.total)}
        //             </div>
        //         )
        //     }
        // },
        {
            accessorKey: "price",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Precio
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row}) => {
                const order : any = row.original
                return (
                    <div className="flex justify-center">
                        {/* {product.category ? product.category.name : 'Sin categoría'} */}
                        {formatPrice(parseFloat(order.price.toString()))}
                    </div>
                );
            }
        },
        {
            accessorKey: "quantity",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Cantidad
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell:({row}) => {
                const order : any = row.original
                return(
                    <div className="flex justify-center">
                        {order.quantity}
                    </div>
                )
            }
        },
        {
            accessorKey: "total",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Total
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row}) => {
                const order : any = row.original
                return (
                    <div className="flex justify-center">
                        {/* {product.category ? product.category.name : 'Sin categoría'} */}
                        {formatPrice(parseFloat(order.price.toString()) * order.quantity)}
                    </div>
                );
            }
        },

        {
            accessorKey: "status",
            header: ({column}) => {
                return (
                    <div className="flex justify-center">
                    <Button variant="ghost" onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Estado
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                    </div>
                )
            },
            cell:({row}) => {
                const {status} = row.original
                if(status ===  StatusOrder.created){
                    return(
                        <div className="flex justify-center">
                            <Badge variant="default" className="bg-purple-500">Creado</Badge>
                        </div>
                    )
                }
                if(status ===  StatusOrder.canceled){
                    return(
                        <div className="flex justify-center">
                            <Badge variant="destructive">Cancelado</Badge>
                        </div>
                    )
                }
                if(status ===  StatusOrder.progress){
                    return(
                        <div className="flex justify-center">
                            <Badge variant="default" className="bg-yellow-500">En progreso</Badge>
                        </div>
                    )
                }
                if(status ===  StatusOrder.served){
                    return(
                        <div className="flex justify-center">
                            <Badge variant="default" className="bg-blue-500">Servido</Badge>
                        </div>
                    )
                }
                if(status ===  StatusOrder.paid){
                    return(
                        <div className="flex justify-center">
                            <Badge variant="default" className="bg-green-500">Pagado</Badge>
                        </div>
                    )
                }
                
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
                    <Link href={`./orders/${id}`}>
                        <Button>
                            <Pencil className="w-4 h-4"/>
                        </Button>
                    </Link>
                    {/* <FormDeleteProduct productId={id}> */}
                        <Button variant="destructive">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                     {/* </FormDeleteProduct> */}
                     </div>
                                    )
            }
        },
    
]
