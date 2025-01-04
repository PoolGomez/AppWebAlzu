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

        const room = await db.room.create({
            data
        });
        return NextResponse.json(room);

    } catch (error) {
        console.log("[ROOM]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}