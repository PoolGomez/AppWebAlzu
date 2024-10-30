import { db } from '@/lib/db';
import { DataTable } from './data-table';
import { columns } from './columns';

export async function ListCategories({companyId}:{companyId:string}) {

    const categories= await db.category.findMany({
        where:{
            companyId : companyId
        },
        orderBy:{
            createdAt: "desc"
        }
    })
  return (
    <DataTable columns={columns} data={categories} />
  )
}
