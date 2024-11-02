import React from 'react'
import { HeaderTables, ListTables } from './components'


export default function TablesPage({params}:{params:{companyId:string}}) {
  return (
    <div>

      {/* <HeaderCategories companyId={params.companyId}/> */}
        <HeaderTables companyId={params.companyId}/>
      {/* <ListCategories companyId={params.companyId} /> */}
        <ListTables companyId={params.companyId}/>
    </div>
  )
}
