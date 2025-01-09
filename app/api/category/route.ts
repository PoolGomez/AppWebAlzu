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
        console.log("[POST CATEGORY]", error);
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

        const categories = await db.category.findMany({
            where: {
                companyId: companyId
            },
            orderBy: {
                createdAt: "asc",
            },
        })
        return NextResponse.json(categories)
    } catch (error) {
        console.log("[GET CATEGORY]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}