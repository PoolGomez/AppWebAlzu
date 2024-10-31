import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,{params}:{ params: {productPriceId: string}}){
    try {
        const session = auth()

        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }

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

export async function PATCH(req: Request, {params}:{params:{productPriceId: string}}){
    try {
        
        const{productPriceId} = params;
        const values = await req.json();
        const session = await auth();

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const productPriceUpdate = await db.productPrice.update({
            where:{
                id: productPriceId,
            },
            data:{
                ...values,
            },
        });

        return NextResponse.json(productPriceUpdate);

    } catch (error) {
        console.log("[PRODUCT ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}