import { z } from "zod";

export const optionalStringSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalStringSchema,
  description: optionalStringSchema,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;
