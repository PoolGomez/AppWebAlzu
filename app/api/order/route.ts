import { auth } from "@/auth";
import { db } from "@/lib/db";
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
                room: data.room,
                table: data.table,
                productId: data.productId,
                productName: data.productName,
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




//  id String @id @default(uuid())
//   row String
//   table String
//   productId String
//   productName String
//   priceAmount Decimal @db.Decimal(10, 2)
//   quantity Int
//   total Decimal @db.Decimal(10, 2)
//   status StatusOrder