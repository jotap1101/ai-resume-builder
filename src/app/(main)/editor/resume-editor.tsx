"use client";

import { useSearchParams } from "next/navigation";

import { BreadcrumbDemo } from "@/app/(main)/editor/breadcrumb-demo";
import { Footer } from "@/app/(main)/editor/footer";
import { steps } from "@/app/(main)/editor/steps";
import { Separator } from "@/components/ui/separator";

export function ResumeEditor() {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

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
        <div className="absolute inset-0 flex w-full flex-col md:flex-row">
          {/* Left */}
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            <BreadcrumbDemo
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && <FormComponent />}
          </div>

          {/* Separator Mobile (Horizontal) */}
          <Separator orientation="horizontal" className="block md:hidden" />

          {/* Separator Desktop (Vertical) */}
          <Separator orientation="vertical" className="hidden md:block" />

          {/* Right */}
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            right
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}
