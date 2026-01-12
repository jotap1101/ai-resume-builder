import { ResumePreview } from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export function ResumePreviewSection({
  resumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="min-h-100 w-full space-y-6 overflow-y-auto p-3 md:min-h-0 md:w-1/2">
      <div className="bg-secondary flex h-full w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
