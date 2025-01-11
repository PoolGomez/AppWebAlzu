import { db } from '@/lib/db'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { ListView } from './listview'


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
    <>
    <div className='hidden md:block'>
        <DataTable columns={columns} data={products} />
    </div>
    <div className='block md:hidden'>

        <ListView products={products}/>

    </div>
    </>
  )
}
