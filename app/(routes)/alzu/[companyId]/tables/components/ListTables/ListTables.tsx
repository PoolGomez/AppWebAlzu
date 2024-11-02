import { db } from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export async function ListTables({companyId}:{companyId:string}) {

    const tables= await db.table.findMany({
        where:{
            companyId : companyId
        },
        orderBy:{
            createdAt: "desc"
        }
    })

  return (
    <DataTable columns={columns} data={tables} />
  )
}
