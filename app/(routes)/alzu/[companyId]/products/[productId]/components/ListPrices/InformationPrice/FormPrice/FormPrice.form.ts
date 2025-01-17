import { z } from "zod";

export const formProductPriceSchema = z.object({
    productId: z.string(),
    sizeId: z.string(),
    active: z.boolean(),
    amount: z.coerce.number({
        required_error: 'El campo monto es obligatorio',
      }).min(0,{message:"El valor mínimo permitido es 0"}),
    // .transform(value => value !== undefined ? parseFloat(value.toFixed(2)) : undefined)
})