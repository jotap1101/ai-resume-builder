import { ResumePreview } from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validation";

import ColorPicker from "./color-picker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="relative max-h-screen w-full space-y-6 overflow-y-auto md:max-h-none md:min-h-0 md:w-1/2">
      <div className="absolute top-2 left-2 z-10 flex flex-none flex-col gap-3 sm:top-3 sm:left-3 lg:top-4 lg:left-4">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
      </div>
      <div className="bg-secondary flex w-full flex-1 justify-center overflow-y-auto p-3 md:overflow-y-visible">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
