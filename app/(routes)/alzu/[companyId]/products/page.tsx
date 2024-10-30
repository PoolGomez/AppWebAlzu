import React from 'react'
import { HeaderProducts } from './components/HeaderProducts'
import { db } from '@/lib/db'
import { ListProducts } from './components/ListProducts'

export default async function ProductPage({params}:{params:{companyId:string}}) {

  const categories= await db.category.findMany({
        where:{
            companyId : params.companyId
        },
        orderBy:{
            createdAt: "desc"
        }
    })

  return (
    <div 
    className='h-screen w-auto'
    >
      <HeaderProducts companyId={params.companyId} categories={categories}/>
      <ListProducts companyId={params.companyId} />
    </div>
  )
}
