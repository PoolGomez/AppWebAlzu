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
        const product = await db.product.create({
            data:{
                name: data.name,
                description: data.description,
                imageUrl: data.imageUrl,
                active: data.active,
                companyId: data.companyId,
                categoryId: data.categoryId
            },
        });
        return NextResponse.json(product);

    } catch (error) {
        console.log("[PRODUCT]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}