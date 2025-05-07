import z from "zod";

export const questionSchema = z.object({
    question:z.string(),
    option:z.object({
        a: z.string(),
        b: z.string(),
        c: z.string(),
        d: z.string(),
    }),
    answer: z.enum(['A','B','C','D']).transform(val => val.toUpperCase())
})