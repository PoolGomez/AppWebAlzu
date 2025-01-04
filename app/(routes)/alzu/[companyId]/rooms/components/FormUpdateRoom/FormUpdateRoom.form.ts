import { z } from "zod";

export const formSchemaUpdateRoom= z.object({
    name: z.string().min(2),
    active: z.boolean(),
    rows: z.coerce.number(),
    columns: z.coerce.number(),
    companyId: z.string(),
  })