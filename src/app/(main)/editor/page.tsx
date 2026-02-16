import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import { ResumeEditor } from "@/app/(main)/editor/resume-editor";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Editor",
  description: "Crie e edite seus currículos.",
};

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
