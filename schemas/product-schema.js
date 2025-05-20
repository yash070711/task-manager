import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Please enter title" })
    .max(50, { message: "Title is too long" }),

  completed: z.string(),
});
