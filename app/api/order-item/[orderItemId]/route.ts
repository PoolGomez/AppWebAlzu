import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params}:{params:{orderItemId: string}}){
    try {
        const session = await auth();
        const {orderItemId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const deletedOrderItem = await db.orderItem.delete({
            where:{
                id: orderItemId,
            }
        });

        return NextResponse.json(deletedOrderItem);

    } catch (error) {
        console.log("[DELETE ORDER]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}