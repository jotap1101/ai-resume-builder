import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { saveResume } from "@/app/(main)/editor/actions";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { fileReplacer } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce<ResumeValues>(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState<ResumeValues>(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);

          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsError(true);

        // console.error(error);

        const toastId = toast.error("Failed to auto-save resume.", {
          description: "Please try saving manually.",
          action: (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                toast.dismiss(toastId);
                save();
              }}
            >
              Retry
            </Button>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    // console.log(
    //   "debouncedResumeData",
    //   JSON.stringify(debouncedResumeData, fileReplacer),
    // );
    // console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(lastSavedData) !== JSON.stringify(resumeData),
  };
}
