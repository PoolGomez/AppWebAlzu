import { z } from "zod";

export const formSchema = z.object({
    role: z.string(),
    email: z.string(),
})