import { useEffect, useState } from "react";

import useDebounce from "@/hooks/use-debounce";
import { ResumeValues } from "@/lib/validation";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const debouncedResumeData = useDebounce<ResumeValues>(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState<ResumeValues>(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function saveResume() {
      setIsSaving(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLastSavedData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(lastSavedData) !== JSON.stringify(debouncedResumeData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      saveResume();
    }
  }, [debouncedResumeData, lastSavedData, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(lastSavedData) !== JSON.stringify(resumeData),
  };
}
