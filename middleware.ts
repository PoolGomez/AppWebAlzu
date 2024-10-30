// export { auth as middleware } from "@/auth"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server";
 
const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth/verify-email"
];
export default middleware((req)=>{
  const{nextUrl, auth} = req;
  const isLoggedIn = !!auth?.user;

  //proteger /alzu
  if(!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn){
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
})

export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  };

// export { default } from'next-auth/middleware'
// export const config = {
//   matcher: ["/alzu2","/alzu"],
// };


// import { clerkMiddleware} from "@clerk/nextjs/server";
// export default clerkMiddleware()
// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };