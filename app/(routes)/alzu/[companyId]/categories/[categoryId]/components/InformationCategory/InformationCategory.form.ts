import { z } from "zod";

export const formSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    companyId: z.string(),
    active: z.boolean()
  });