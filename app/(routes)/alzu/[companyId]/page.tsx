import { db } from '@/lib/db'
import React from 'react'
import { HeaderCompany } from './components/HeaderCompany'

export default async function DashboardCompanyPage({params}:{params: {companyId : string}}) {

  const company = await db.company.findUnique({
    where:{
        id: params.companyId,
        // userId
    }
  })

  if(!company){
    return <h1>No existe informacion de la empresa seleccionada</h1>
  }

  return (
    <div>
        <HeaderCompany company={company}/>
        {/* <ListCompanies /> */}
    </div>
    
  )
}


// <>
//     <div>Dashboard Company Page</div>
//     <div>
//        {company ?(
//             <>
//                 <h2>company={company.name}</h2>
//                 <h2>id={company.id}</h2>
                
//             </>
//         ):(
//             <p>No se encontro la informacion de la empresa</p>
//         )}
//     </div>
//     </>