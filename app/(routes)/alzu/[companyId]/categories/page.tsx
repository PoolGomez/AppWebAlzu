import React from 'react'
import { HeaderCategories, ListCategories } from './components'

export default function CategoriesPage({params}:{params:{companyId:string}}) {

  return (
    <div>
      <HeaderCategories companyId={params.companyId}/>
      <ListCategories companyId={params.companyId} />
    </div>
  )
}
