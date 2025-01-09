import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (req: Request){
    try {
        const session = await auth();
        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return new NextResponse("Missing productId", { status: 400 });
        }

        const prices = await db.productPrice.findMany({
            where: {
                productId: productId
            },
            include: {
                size: true, // Incluye la relación con la categoría
            }
        })
        console.log("Prices:",prices)
        return NextResponse.json(prices)
    } catch (error) {
        console.log("[GET PRODUCT-PRICE]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}