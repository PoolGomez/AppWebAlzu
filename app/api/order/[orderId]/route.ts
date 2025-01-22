import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params}:{params:{orderId: string}}){
    try {
        const session = await auth();
        const {orderId} = params;

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const deletedOrder = await db.order.delete({
            where:{
                id: orderId,
            }
        });

        return NextResponse.json(deletedOrder);

    } catch (error) {
        console.log("[DELETE ORDER]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}:{params:{orderId: string}}){
    try {
        const{orderId} = params;
        const values = await req.json();
        const session = await auth();

        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const order = await db.order.update({
            where:{
                id: orderId,
            },
            data:{
                ...values,
            },
        });

        // revalidatePath(`/alzu/${order.companyId}/sell`)
        return NextResponse.json(order);

    } catch (error) {
        console.log("[PATCH ORDER]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}


export async function GET (req: Request, { params}:{params:{orderId: string}}){
    try {
        const session = await auth();
        if(!session){
            return new NextResponse("Unauthorized", {status: 401}); 
        }

        const {orderId} = params;

        const order = await db.order.findUnique({
            where: {
                id: orderId
            },
            include:{
                room: true,
                table: true,
                OrderItem: {
                    include: {
                        product: true
                    }
                }
            }
        })
        console.log("GET ORDER:", order)
        return NextResponse.json(order)
    } catch (error) {
        console.log("[GET ORDER]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}