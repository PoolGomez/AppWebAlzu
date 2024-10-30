import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    console.log(token)

    if(!token){
        return new Response("Token not found", { status: 400})
    }

    //VERIFICAR SI EXISTE UN TOKEN EN LA BASE DE DATOS
    const verifyToken = await db.verificationToken.findFirst({
        where:{
            token,
        },
    });

    if(!verifyToken){
        return new Response("Token not found", { status: 400})
    }

    //VERIFICAR SI EL TOKEN YA EXPIRO
    if(verifyToken.expires < new Date()){
        return new Response("Token expired", { status: 400});
    }

    //VERIFICAR SI EL EMAIL YA ESTA VERIFICADO
    const user = await db.user.findUnique({
        where:{
            email: verifyToken.identifier,
        },
    });

    if(user?.emailVerified){
        return new Response("Email already verified", { status: 400});
    }

    //marcar el email como verificado
    await db.user.update({
        where:{
            email: verifyToken.identifier,
        },
        data: {
            emailVerified: new Date(),
        }
    })
    //eliminar el token
    await db.verificationToken.delete({
        where:{
            identifier: verifyToken.identifier,
        },
    })

    // return Response.json({token});
    redirect("/login?isVerifyEmail=true");
}