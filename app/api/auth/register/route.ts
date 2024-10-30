import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export async function POST (req: Request){
    try {
        // const { userId } = auth();
        const data = await req.json();

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401});
        // }

        // const company = await db.company.create({
        //     data:{
        //         userId,
        //         ...data,
        //     },
        // });
        const UserFound = await db.user.findUnique({
            where:{
                email: data.email
            }
        })
        if(UserFound){
            return NextResponse.json({
                message: "Email already exists"
            },{
                status: 400
            })
        }


        console.log("[API]",data)
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data:{
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })
        
        const { password: _, ...user} = newUser
        
        // return NextResponse.json(company);
        return NextResponse.json(user);

    } catch (error: any) {
        console.log("[REGISTER]", error);
        return NextResponse.json(
            {
                message: error.message
            }, 
            {
                status: 500
            }
        );
    }
}