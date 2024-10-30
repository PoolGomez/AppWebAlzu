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

        const size = await db.size.create({
            data
        });
        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZE]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}