import { Prisma } from "@prisma/client";

export type OrderProducto = Prisma.OrderGetPayload<{
    // include:{
    //     product: true
    // }

    include:{
     OrderItem:{
      include:{
        product: true
      }
     }
    }
}>; 

export type OrderFull = Prisma.OrderGetPayload<{
    include:{
        room: true,
        table: true,
        OrderItem:{
            include:{
                product: true
            }
        }
    }

}>