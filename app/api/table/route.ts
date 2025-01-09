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

        const table = await db.table.create({
            data
        });
        return NextResponse.json(table);

    } catch (error) {
        console.log("[POST TABLE]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}

export async function GET (req: Request){
    try {
        const session = await auth();
        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const { searchParams } = new URL(req.url);
        const roomId = searchParams.get("roomId");

        if (!roomId) {
            return new NextResponse("Missing roomId", { status: 400 });
        }

        const tables = await db.table.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                createdAt: "asc",
            },
        })
        return NextResponse.json(tables)
    } catch (error) {
        console.log("[GET TABLES]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}