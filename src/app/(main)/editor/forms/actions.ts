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
    throw new Error("Não autorizado");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Atualize sua assinatura para usar este recurso");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateResumeSummarySchema.parse(input);

  const systemMessage = `
    Você é uma IA geradora de currículos profissionais. Sua tarefa é escrever um resumo de apresentação profissional para um currículo com base nos dados fornecidos pelo usuário.
    Retorne apenas o resumo e não inclua nenhuma outra informação na resposta. Mantenha-o conciso e profissional.
  `;

  const userMessage = `
    Por favor, gere um resumo profissional de currículo a partir destes dados:

    Cargo: ${jobTitle || "N/A"}

    Experiência profissional:
    
    ${workExperiences
      ?.map(
        (experience) => `
        Posição: ${experience.position || "N/A"} na ${experience.company || "N/A"} de ${experience.startDate || "N/A"} até ${experience.endDate || "Presente"}

        Descrição:
        ${experience.description || "N/A"}
        `,
      )
      .join("\n\n")}

    Educação:
    
    ${educations
      ?.map(
        (education) => `
        Formação: ${education.degree || "N/A"} em ${education.school || "N/A"} de ${education.startDate || "N/A"} até ${education.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

    Habilidades:
    
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
      throw new Error("Nenhum texto retornado da API do Gemini");
    }

    return response.text;
  } catch (error) {
    // console.error("Error generating resume summary:", error);

    if (
      error instanceof Error &&
      (error.message.includes("fetch failed") ||
        error.message.includes("timeout"))
    ) {
      throw new Error(
        "Tempo limite excedido ao conectar com a API. Verifique sua conexão e tente novamente.",
      );
    }

    throw new Error("Falha ao gerar resumo do currículo");
  } finally {
    // console.log("Finished generating resume summary");
  }
}

export async function generateResumeDescriptionWorkExperience(
  input: GenerateResumeDescriptionWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Não autorizado");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Atualize sua assinatura para usar este recurso");
  }

  const { description } =
    generateResumeDescriptionWorkExperienceSchema.parse(input);

  const systemMessage = `
    Você é uma IA geradora de currículos profissionais. Sua tarefa é gerar uma única entrada de experiência profissional com base na entrada do usuário.
    Sua resposta deve seguir a seguinte estrutura. Você pode omitir campos se eles não puderem ser inferidos dos dados fornecidos, mas não adicione novos campos.

    Cargo: <cargo>
    Empresa: <nome da empresa>
    Data de início: <formato: YYYY-MM-DD> (apenas se fornecido)
    Data de término: <formato: YYYY-MM-DD> (apenas se fornecido)
    Descrição: <uma descrição otimizada em formato de marcadores, pode ser inferida a partir do cargo>
  `;

  const userMessage = `
    Por favor, forneça uma entrada de experiência profissional a partir desta descrição:

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
      throw new Error("Nenhum texto retornado da API do Gemini");
    }

    return {
      position: response.text.match(/Cargo: (.*)/)?.[1] || "",
      company: response.text.match(/Empresa: (.*)/)?.[1] || "",
      description: (
        response.text.match(/Descrição:([\s\S]*)/)?.[1] || ""
      ).trim(),
      startDate: response.text.match(
        /Data de início: (\d{4}-\d{2}-\d{2})/,
      )?.[1],
      endDate: response.text.match(/Data de término: (\d{4}-\d{2}-\d{2})/)?.[1],
    } satisfies WorkExperienceItem;
  } catch (error) {
    // console.error("Error generating work experience description:", error);

    if (
      error instanceof Error &&
      (error.message.includes("fetch failed") ||
        error.message.includes("timeout"))
    ) {
      throw new Error(
        "Tempo limite excedido ao conectar com a API. Verifique sua conexão e tente novamente.",
      );
    }

    throw new Error("Falha ao gerar descrição da experiência profissional");
  } finally {
    // console.log("Finished generating work experience description");
  }
}
