import { auth } from "@/auth"
import { db} from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(
    req: Request,
    { params } : { params: { productId: string } }
){
    try {
        const session = auth();
        const data = await req.json()

        if(!session){
            return new NextResponse("Unauthorized", {status: 401});
        }

        //VALIDAR LA COMPAÑIA
        // const company = await db.company.findUnique({
        //     where: {
        //         id: params.companyId,
        //     }
        // });
        // if(!company){
        //     return new NextResponse("Company not found", { status: 404 });
        // }

        const productPrice = await db.productPrice.create({
            data:{
                productId: params.productId,
                ...data,
            }
        })

        return NextResponse.json(productPrice);

    } catch (error) {
        console.log("[PRODUCT-PRICE]", error);
        return new NextResponse("Internal Error", { status: 500 } );
    }
}


