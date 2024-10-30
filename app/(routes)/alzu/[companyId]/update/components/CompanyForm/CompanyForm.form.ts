import { z } from "zod";

export const formSchema = z.object({
    name: z.string(),
    profileImage: z.string(),
    description: z.string().nullable()
})