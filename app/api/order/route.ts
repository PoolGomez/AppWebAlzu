import { auth } from "@/auth";
import { db } from "@/lib/db";
import { StatusOrder } from "@prisma/client";
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
                room: data.room,
                tableId: data.tableId,
                table: data.table,
                productId: data.productId,
                productName: data.productName,
                sizeName:data.sizeName,
                priceAmount: data.priceAmount,
                quantity: data.quantity,
                total: data.total,
                note: data.note,
                status: data.status,
            },
        });
        return NextResponse.json(order);

    } catch (error) {
        console.log("[POST ORDER]", error);
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
                status: status as StatusOrder
            },

            // orderBy: {
            //     createdAt: "asc",
            // },


            // where: {
            //     AND: [
            //       { tableId: tableId },
            //       { status: status },
            //     ],
            //   },


        })
        return NextResponse.json(orders)
    } catch (error) {
        console.log("[GET ORDER]", error);
        return new NextResponse("Internal Error", { status: 500});
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