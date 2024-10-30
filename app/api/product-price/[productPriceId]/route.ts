import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,{params}:{ params: {productPriceId: string}}){
    try {
        // const{userId} = auth()

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }

        const deletedEvent = await db.productPrice.delete({
            where:{
                id: params.productPriceId
            }
        })

        return NextResponse.json(deletedEvent);

    } catch (error) {
        console.log("[DELETE_PRODUCT_PRICE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}