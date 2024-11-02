import { z } from "zod";

export const formCreateTableSchema = z.object({
    name: z.string().min(1),
    active: z.boolean(),
    companyId: z.string(),
  })