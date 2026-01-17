import { BorderStyleButton } from "@/app/(main)/editor/border-style-button";
import ColorPicker from "@/app/(main)/editor/color-picker";
import { ResumePreview } from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="group relative h-1/2 w-full space-y-6 overflow-y-auto md:h-full md:w-1/2">
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:top-3 lg:left-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) => {
            setResumeData({ ...resumeData, borderStyle });
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
