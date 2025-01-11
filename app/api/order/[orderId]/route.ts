import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params}:{params:{orderId: string}}){
    try {
        const session = await auth();
        const {orderId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const deletedProduct = await db.order.delete({
            where:{
                id: orderId,
            }
        });

        return NextResponse.json(deletedProduct);

    } catch (error) {
        console.log("[DELETE ORDER ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}