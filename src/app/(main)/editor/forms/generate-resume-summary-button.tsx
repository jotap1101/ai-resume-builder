import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { generateResumeSummary } from "@/app/(main)/editor/forms/actions";
import { LoadingButton } from "@/components/loading-button";
import { ResumeValues } from "@/lib/validation";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export function GenerateResumeSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const response = await generateResumeSummary(resumeData);

      onSummaryGenerated(response);
    } catch (error) {
      // console.error("Error generating resume summary:", error);

      toast.error("Failed to generate resume summary.", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      Generate Summary (AI)
    </LoadingButton>
  );
}
