import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image size must be less than 5MB",
    )
    .optional(),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        // id: z.string().optional(),
        company: optionalString,
        position: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        // id: z.string().optional(),
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export const summarySchema = z.object({
  summary: optionalString,
});

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export const generateResumeDescriptionWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export const generateResumeSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type WorkExperienceItem = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export type EducationValues = z.infer<typeof educationSchema>;

export type SkillValues = z.infer<typeof skillSchema>;

export type SummaryValues = z.infer<typeof summarySchema>;

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export type GenerateResumeSummaryInput = z.infer<
  typeof generateResumeSummarySchema
>;

export type GenerateResumeDescriptionWorkExperienceInput = z.infer<
  typeof generateResumeDescriptionWorkExperienceSchema
>;
