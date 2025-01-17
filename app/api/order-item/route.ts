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
        const order = await db.orderItem.create({
            data:{
                orderId :data.orderId,
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
        console.log("[POST CREATE ORDER-ITEM]", error);
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
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            return new NextResponse("Missing orderId", { status: 400 });
        }

        const orders = await db.orderItem.findMany({
            where: {
                orderId: orderId
            },
            orderBy: {
                createdAt: "desc",
            },


            // where: {
            //     AND: [
            //       { tableId: tableId },
            //       { status: status },
            //     ],
            //   },


        })
        return NextResponse.json(orders)
    } catch (error) {
        console.log("[GET ORDER-ITEM]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}