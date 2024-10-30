import { db } from '@/lib/db';
import { HeaderCategory, InformationCategory } from './components';



export default async function CategoryDetailPage({params}:{params:{categoryId:string, companyId:string}}) {


  const category = await db.category.findUnique({
    where:{
      id: params.categoryId,
      companyId: params.companyId
    }
  })

 

  return (
    <div  className='flex items-center flex-col h-screen '>

      <HeaderCategory companyId={params.companyId} />

      {category ? (
          <>
          <InformationCategory category={category} />
          {/* <FooterCategory categoryId={category.id} /> */}
          </>
      ):(
        <p>No se encontro la informacion de la categoria</p>
      )}

      
    </div>
  )
}
