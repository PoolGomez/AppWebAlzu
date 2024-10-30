import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// import {PrismaClient} from "@prisma/client";
// declare global{
//     var prisma: PrismaClient | undefined;
// }
// export const db = globalThis.prisma || new PrismaClient();
// if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;
