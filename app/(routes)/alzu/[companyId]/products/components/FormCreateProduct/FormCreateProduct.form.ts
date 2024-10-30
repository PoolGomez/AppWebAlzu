import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    description: z.string(),
    imageUrl: z.string(),
    active: z.boolean(),
    companyId: z.string(),
    categoryId: z.string(),
  })