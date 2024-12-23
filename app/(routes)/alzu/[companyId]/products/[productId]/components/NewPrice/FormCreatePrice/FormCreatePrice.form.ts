import { z } from "zod";

export const formCreatePriceSchema = z.object({
    productId: z.string(),
    sizeId: z.string(),
    active: z.boolean(),
    amount: z.number(),
    // .transform(value => value !== undefined ? parseFloat(value.toFixed(2)) : undefined)
})