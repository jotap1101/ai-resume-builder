import { Metadata } from "next";

import { ResumeEditor } from "@/app/(main)/editor/resume-editor";

export const metadata: Metadata = {
  title: "Editor",
  description: "Create and edit your resumes",
};

export default function Page() {
  return <ResumeEditor />;
}
