import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es obligatorio' }),
    description: z.string(),
    imageUrl: z.string(),
    active: z.boolean(),
    companyId: z.string(),
    categoryId: z.string().min(1, { message: 'Seleccione una categoria' }),
  })