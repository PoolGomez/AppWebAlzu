import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{tableId: string}}){
    try {
        const session = auth();
        const{tableId} = params;
        const values = await req.json();
        console.log("values:",values)

        if(!session){
            return new NextResponse("Unauthorized", {status:401});
        }
        const table = await db.table.update({
            where:{
                id: tableId,
            },
            data:{
                name: values.name,
                status: values.status,
                column: values.column,
                row: values.row,
                roomId: values.roomId,

                // ...values,
            },

        });
        revalidatePath(`/alzu/${values.companyId}/tables3`)
        return NextResponse.json(table);

    } catch (error) {
        console.log("[TABLE ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function DELETE(req: Request, { params}:{params:{tableId: string}}){
    try {
        const session = auth();
        const {tableId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const deletedTable = await db.table.delete({
            where:{
                id: tableId,
            }
        });

        return NextResponse.json(deletedTable);

    } catch (error) {
        console.log("[DELETE TABLE ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}