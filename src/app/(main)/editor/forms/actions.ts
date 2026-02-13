"use server";

import { auth } from "@clerk/nextjs/server";
import { ThinkingLevel } from "@google/genai";

import { ai } from "@/lib/gemini";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateResumeDescriptionWorkExperienceInput,
  generateResumeDescriptionWorkExperienceSchema,
  GenerateResumeSummaryInput,
  generateResumeSummarySchema,
  WorkExperienceItem,
} from "@/lib/validation";

export async function generateResumeSummary(input: GenerateResumeSummaryInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateResumeSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
  `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    
    ${workExperiences
      ?.map(
        (experience) => `
        Position: ${experience.position || "N/A"} at ${experience.company || "N/A"} from ${experience.startDate || "N/A"} to ${experience.endDate || "Present"}

        Description:
        ${experience.description || "N/A"}
        `,
      )
      .join("\n\n")}

    Education:
    
    ${educations
      ?.map(
        (education) => `
        Degree: ${education.degree || "N/A"} at ${education.school || "N/A"} from ${education.startDate || "N/A"} to ${education.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

    Skills:
    
    ${skills}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: systemMessage,
        temperature: 0.1,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    });

    if (!response.text) {
      throw new Error("No text returned from Gemini API");
    }

    return response.text;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error generating resume summary:", error);

    throw new Error("Failed to generate resume summary");
  } finally {
    // console.log("Finished generating resume summary");
  }
}

export async function generateResumeDescriptionWorkExperience(
  input: GenerateResumeDescriptionWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { description } =
    generateResumeDescriptionWorkExperienceSchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
    Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD> (only if provided)
    End date: <format: YYYY-MM-DD> (only if provided)
    Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
    Please provide a work experience entry from this description:

    ${description}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: systemMessage,
        temperature: 0.2,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    });

    // console.log(response);

    if (!response.text) {
      throw new Error("No text returned from Gemini API");
    }

    return {
      position: response.text.match(/Job title: (.*)/)?.[1] || "",
      company: response.text.match(/Company: (.*)/)?.[1] || "",
      description: (
        response.text.match(/Description:([\s\S]*)/)?.[1] || ""
      ).trim(),
      startDate: response.text.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
      endDate: response.text.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
    } satisfies WorkExperienceItem;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error generating work experience description:", error);

    throw new Error("Failed to generate work experience description");
  } finally {
    // console.log("Finished generating work experience description");
  }
}
