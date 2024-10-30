import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{productId: string}}){
    try {
        const{productId} = params;
        const values = await req.json();
        const session = await auth();

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const product = await db.product.update({
            where:{
                id: productId,
            },
            data:{
                ...values,
            },
        });

        revalidatePath(`/alzu/${product.companyId}/products`)
        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function DELETE(req: Request, { params}:{params:{productId: string}}){
    try {
        const session = await auth();
        const {productId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const deletedProduct = await db.product.delete({
            where:{
                id: productId,
            }
        });

        return NextResponse.json(deletedProduct);

    } catch (error) {
        console.log("[DELETE PRODUCT ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}