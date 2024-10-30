import { z } from "zod";

export const formProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    companyId: z.string(),
    active: z.boolean(),
    categoryId: z.string(),
    
  });