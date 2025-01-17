import { auth } from "@/auth";
import { db } from "@/lib/db";
import { StatusOrder } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST (req: Request){
    try {
        const session = await auth();
        const data = await req.json();

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        // console.log('session: ',session)
        const order = await db.order.create({
            data:{
                companyId:data.companyId,
                roomId: data.roomId,
                tableId: data.tableId,
                productId: data.productId,
                sizeName: data.sizeName,
                quantity: data.quantity,
                price: data.price,
                notes: data.notes,
                status: data.status
            },
        });
        return NextResponse.json(order);

    } catch (error) {
        console.log("[POST CREATE ORDER]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}

export async function GET (req: Request){
    try {
        const session = await auth();
        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const { searchParams } = new URL(req.url);
        const tableId = searchParams.get("tableId");
        const status = searchParams.get("status");

        if (!tableId) {
            return new NextResponse("Missing tableId", { status: 400 });
        }
        if (!status) {
            return new NextResponse("Missing status", { status: 400 });
        }

        const orders = await db.order.findMany({
            where: {
                tableId: tableId,
                // status: status as StatusOrder
                NOT:{
                    status: status as StatusOrder
                }
            },
            orderBy: {
                createdAt: "desc",
            },
            include:{
                product: true
            }


            // where: {
            //     AND: [
            //       { tableId: tableId },
            //       { status: status },
            //     ],
            //   },


        })
        console.log("orders:",orders)
        return NextResponse.json(orders)
    } catch (error) {
        console.log("[GET ORDER]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}

//actualiza los pedidos de estado created a progress de la mesa seleccionada
export async function PATCH(req: Request){
    try {
        
        const {tableId, companyId} = await req.json();
        const session = await auth();

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const orders = await db.order.updateMany({
            where:{
                tableId: tableId,
                status: StatusOrder.created
            },
            data:{
                status: StatusOrder.progress,
            },
        });

        revalidatePath(`/alzu/${companyId}/sell`)
        return NextResponse.json(orders);

    } catch (error) {
        console.log("[PATCH ORDER]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}



//  id String @id @default(uuid())
//   row String
//   table String
//   productId String
//   productName String
//   priceAmount Decimal @db.Decimal(10, 2)
//   quantity Int
//   total Decimal @db.Decimal(10, 2)
//   status StatusOrder