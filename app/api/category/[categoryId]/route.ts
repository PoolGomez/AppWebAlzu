import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{categoryId: string}}){
    try {
        // const session = auth();
        const{categoryId} = params;
        const values = await req.json();

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status:401});
        // }
        const category = await db.category.update({
            where:{
                id: categoryId,
            },
            data:{
                ...values,
            },
        });

        revalidatePath(`/alzu/${category.companyId}/categories`)
        // redirect(`/alzu/${category.companyId}/categories`)
        return NextResponse.json(category);

    } catch (error) {
        console.log("[CATEGORY ID]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function DELETE(req: Request, { params}:{params:{categoryId: string}}){
    try {
        // const {userId} = auth();
        const {categoryId} = params;

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }

        const deletedCategory = await db.category.delete({
            where:{
                id: categoryId,
            }
        });

        return NextResponse.json(deletedCategory);

    } catch (error) {
        console.log("[DELETE CATEGORY ID]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}