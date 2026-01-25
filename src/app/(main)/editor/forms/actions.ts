"use server";

import { ThinkingLevel } from "@google/genai";

import { ai } from "@/lib/gemini";
import {
  GenerateResumeSummaryInput,
  generateResumeSummarySchema,
} from "@/lib/validation";

export async function generateResumeSummary(input: GenerateResumeSummaryInput) {
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

  // console.log("systemMessage:\n", systemMessage);
  // console.log("userMessage:\n", userMessage);

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
  } catch (error) {
    // console.error("Error generating resume summary:", error);

    throw new Error("Failed to generate resume summary");
  } finally {
    // console.log("Finished generating resume summary");
  }
}
