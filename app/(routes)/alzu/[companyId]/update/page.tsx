import React from 'react'
import { FooterCompany, HeaderUpdateCompany, InformationCompany } from './components'
import { db } from '@/lib/db'



export default async function UpdateCompanyPage({params}:{params: {companyId : string}}) {

  const company = await db.company.findUnique({
    where:{
        id: params.companyId,
        // userId
    }
  })

  return (
    <div>
      <HeaderUpdateCompany />
      {company ?(
            <>
                <InformationCompany company={company} />
                <FooterCompany 
                companyId={company.id}
                />    
            </>
        ):(
            <p>No se encontro la informacion de la empresa</p>
        )}

    </div>
  )
}
