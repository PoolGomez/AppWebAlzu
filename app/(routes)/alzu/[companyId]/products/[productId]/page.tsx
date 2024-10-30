import { db } from '@/lib/db'
import { HeaderProduct } from './components'
import { InformationProduct } from './components/InformationProduct/InformationProduct'

export default async function ProductDetailPage({params}:{params:{productId:string, companyId:string}}) {

  const product = await db.product.findUnique({
    where:{
      id: params.productId,
      companyId: params.companyId
    }
  })
  const categories= await db.category.findMany({
    where:{
        companyId : params.companyId
    },
    orderBy:{
        createdAt: "desc"
    }
  })

  const sizes = await db.size.findMany({
    where:{
      companyId : params.companyId,
      active: true
    },
    orderBy:{
      name: "asc"
    }
  })

  return (
    <div  className='flex flex-col h-screen'>

      <HeaderProduct companyId={params.companyId} />

      {product ? (
        <>
        <InformationProduct product={product} categories={categories} sizes={sizes}/>
          
          </>
      ):(
        <p>No se encontro la informacion del producto</p>
      )}

      
    </div>
  )
}
