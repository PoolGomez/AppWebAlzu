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
        console.log("[POST ROOMS]", error);
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
        const companyId = searchParams.get("companyId");

        if (!companyId) {
            return new NextResponse("Missing companyId", { status: 400 });
        }

        const rooms = await db.room.findMany({
            where: {
                companyId: companyId
            },
            orderBy: {
                createdAt: "asc",
            },
        })
        return NextResponse.json(rooms)
    } catch (error) {
        console.log("[GET ROOMS]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}