import { auth } from "@/auth";
import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
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

        // console.log('session: ',session)
        const company = await db.company.create({
            data:{
                // userId,
                userId: session.user.email,
                ...data,
            },
        });
        return NextResponse.json(company);

    } catch (error) {
        console.log("[COMPANY]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}