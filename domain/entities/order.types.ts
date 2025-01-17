import { Prisma } from "@prisma/client";

export type OrderProducto = Prisma.OrderGetPayload<{
    include:{
        product: true
    }

    // include:{
    //  OrderItem:{
    //   include:{
    //     product: true
    //   }
    //  }
    // }
}>; 

export type OrderFull = Prisma.OrderGetPayload<{
    include:{
        product: true
        room: true
        table: true
    }

}>