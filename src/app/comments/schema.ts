import { z } from "zod";

export const createCommentSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Required" })
    .max(100, { message: "Max 100 characters" }),
});

export type CreateCommentValues = z.infer<typeof createCommentSchema>;
