import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req: Request){
    try {
        // const { userId } = auth();
        const session = await auth();
        const data = await req.json();

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401});
        // }
        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const category = await db.category.create({
            data
        });
        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}