import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{sizeId: string}}){
    try {
        const session = auth()
        const{sizeId} = params;
        const values = await req.json();

        if(!session){
            return new NextResponse("Unauthorized", {status:401});
        }
        const size = await db.size.update({
            where:{
                id: sizeId,
            },
            data:{
                ...values,
            },
        });

        revalidatePath(`/alzu/${size.companyId}/sizes`)
        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZE ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function DELETE(req: Request, { params}:{params:{sizeId: string}}){
    try {
        const session = auth()
        const {sizeId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const deletedSize = await db.size.delete({
            where:{
                id: sizeId,
            }
        });

        return NextResponse.json(deletedSize);

    } catch (error) {
        console.log("[DELETE SIZE ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}