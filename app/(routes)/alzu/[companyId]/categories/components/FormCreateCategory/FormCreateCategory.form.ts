import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    imageUrl: z.string(),
    active: z.boolean(),
    companyId: z.string(),
  })