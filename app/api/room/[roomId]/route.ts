import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{roomId: string}}){
    try {
        // const {userId} = auth();
        const{roomId} = params;
        console.log("test_roomId...", roomId)
        const values = await req.json();

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status:401});
        // }
        const room = await db.room.update({
            where:{
                id: roomId,
                // userId,
            },
            data:{
                ...values,
            },
        });
        revalidatePath(`/alzu/${room.companyId}/rooms`)
        return NextResponse.json(room);

    } catch (error) {
        console.log("[ROOM ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function DELETE(req: Request, { params}:{params:{companyId: string}}){
    try {
        // const {userId} = auth();
        const {companyId} = params;

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }

        const deletedCompany = await db.company.delete({
            where:{
                id: companyId,
            }
        });

        return NextResponse.json(deletedCompany);

    } catch (error) {
        console.log("[DELETE COMPANY ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}