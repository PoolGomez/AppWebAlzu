import { z } from "zod";

export const formSchemaCreateTable = z.object({
    name: z.string().min(1),
    status: z.string(),
    roomId: z.string(),
    row: z.number(),
    column: z.number(),
    
  })