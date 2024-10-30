import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

// import { db } from '@/lib/db'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcrypt'

// const authOptions = {
//     providers:[
//         CredentialsProvider({
//             name:"Credencials",
//             credentials: {
//                 email:{
//                     label: "Email",
//                     type:"text",
//                     placeholder:"jsmith"
//                 },
//                 password:{
//                     label:"Password",
//                     type:"password",
//                     placeholder:"******"
//                 }
//             },
//             async authorize(credentials, req){
//                 const userFound = await db.user.findUnique({
//                     where:{
//                         email: credentials?.email
//                     }
//                 })

//                 if(!userFound) throw new Error('No user found')
//                 console.log(userFound)

//                 const matchPassword = await bcrypt.compare(credentials?.password, userFound.password)

//                 if(!matchPassword) throw new Error('Wrong password')

//                 return {
//                     id: userFound.id,
//                     name: userFound.name,
//                     email: userFound.email,
//                 }

                
//             }
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn : "/login",
//     }
// }

// const handler = NextAuth(authOptions);

// export {handler as GET, handler as POST};