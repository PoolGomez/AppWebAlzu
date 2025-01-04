import { db } from "@/lib/db";
import { Room } from "@prisma/client";
import { OrderDetail } from "./OrderDetail";
import { OrderGrid } from "./OrderGrid";

export async function OrderContainer({room,companyId}:{room: Room,companyId:string}) {
    const tables = await db.table.findMany({
                where: {
                  roomId: room.id,
                },
                orderBy: {
                  createdAt: "asc",
                },
              });
    const categories = await db.category.findMany({
      where: {
        companyId: companyId
      },
      orderBy:{
        createdAt:"asc"
      }
    })
    const products = await db.product.findMany({
      where:{
        companyId: companyId
      },
      orderBy:{
        createdAt:"asc"
      }
    })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4 w-full h-full">
        
        <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 w-full h-full">
            <OrderGrid room={room} tables={tables} categories={categories} products={products}/>
        </div>

        <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-2 sm:p-4 w-full h-full">
            <OrderDetail />
        </div>

    </div>
  )
}
