import { db } from '@/lib/db'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

export async function ListProducts({companyId}:{companyId: string}) {

    const products= await db.product.findMany({
        where:{
            companyId : companyId
        },
        include: {
            category: true, // Incluye la relación con la categoría
        },
        orderBy:{
            createdAt: "desc"
        }
    })

  return (
    <DataTable columns={columns} data={products} />
  )
}
