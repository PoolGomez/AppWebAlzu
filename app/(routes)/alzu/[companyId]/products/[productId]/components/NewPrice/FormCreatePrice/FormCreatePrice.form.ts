import { z } from "zod";

export const formCreatePriceSchema = z.object({
    productId: z.string(),
    sizeId: z.string().min(1, { message: 'Seleccione un tamaño' }),
    active: z.boolean(),
    amount: z.coerce.number({
        required_error: 'El campo monto es obligatorio',
      }).min(0,{message:"El valor mínimo permitido es 0"}),
    // amount: z.preprocess((value) => {
    //     if (typeof value === "string") {
    //       const parsed = parseFloat(value);
    //       return isNaN(parsed) ? undefined : Math.round(parsed * 100);
    //     }
    //     return value;
    //   }, z.number().int().positive()),
    // .transform(value => value !== undefined ? parseFloat(value.toFixed(2)) : undefined)
})