import { db } from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"


export async function ListSizes({companyId}:{companyId:string}) {

  
  const sizes= await db.size.findMany({
    where:{
        companyId : companyId
    },
    orderBy:{
        createdAt: "desc"
    }
})

  return (
    <DataTable columns={columns} data={sizes} />
  )
}
