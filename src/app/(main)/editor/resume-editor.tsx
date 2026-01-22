"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { BreadcrumbDemo } from "@/app/(main)/editor/breadcrumb-demo";
import { Footer } from "@/app/(main)/editor/footer";
import { ResumePreviewSection } from "@/app/(main)/editor/resume-preview-section";
import { steps } from "@/app/(main)/editor/steps";
import useAutoSaveResume from "@/app/(main)/editor/use-auto-save-resume";
import useUnloadWarning from "@/hooks/use-unload-warning";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

export function ResumeEditor() {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<ResumeValues>(
    {} as ResumeValues,
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  function setCurrentStep(stepKey: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("step", stepKey);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          {/* Left */}
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadcrumbDemo
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className="grow md:border-r" />

          {/* Right */}
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
