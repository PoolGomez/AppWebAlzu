import { z } from "zod";

export const formSchemaTable = z.object({
    name: z.string().min(1),
    status: z.string(),
    column: z.coerce.number().min(0),
    row: z.coerce.number().min(0),
    roomId: z.string(),
    companyId: z.string(), 
  })

