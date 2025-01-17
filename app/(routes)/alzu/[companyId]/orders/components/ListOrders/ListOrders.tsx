import { db } from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export async function ListOrders({companyId}:{companyId: string}) {

    const orders = await db.order.findMany({
        where:{
            companyId : companyId
        },
        orderBy:{
            createdAt: "desc"
        },
        include:{
          product: true,
          room: true,
          table: true,
        }
    }).then((data)=>{
      return data.map((orden) => ({
        ...orden,
        total: parseFloat(orden.price.toString()),
      }));
    });

    // const ordersFull = orders.map((orden) => ({
    //   ...orden,
    //   total: parseFloat(orden.price.toString()),
    // }));

  return (
    <>
    <div 
    // className="hidden md:block"
    >
        <DataTable columns={columns} data={orders} />
    </div>
    {/* <div className="block md:hidden">

    </div> */}
    </>
  )
}
