import { db } from '@/lib/db'
import React from 'react'
import { HeaderSize, InformationSize } from './components'

export default async function SizeDetailPage({params}:{params:{sizeId:string, companyId:string}}) {
    const size = await db.size.findUnique({
        where:{
          id: params.sizeId,
          companyId: params.companyId
        }
      })
  return (
    <div  className='flex items-center flex-col h-screen '>

      <HeaderSize
      companyId={params.companyId} 
      />

      {size ? (
          <>
          <InformationSize
          size={size} 
          />
          {/* <FooterCategory categoryId={category.id} /> */}
          </>
      ):(
        <p>No se encontro la informacion de la categoria</p>
      )}

      
    </div>
  )
}
