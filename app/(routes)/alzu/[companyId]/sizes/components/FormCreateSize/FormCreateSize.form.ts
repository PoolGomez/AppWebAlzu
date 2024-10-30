import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    active: z.boolean(),
    companyId: z.string(),
  })