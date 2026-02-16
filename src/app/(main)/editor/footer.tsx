import { FileUserIcon, PenLineIcon } from "lucide-react";
import Link from "next/link";

import { steps } from "@/app/(main)/editor/steps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

export function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t p-3 md:py-5">
      <p
        className={cn(
          "text-muted-foreground mb-3 text-center opacity-0 md:mb-5 md:hidden",
          isSaving && "opacity-100",
        )}
      >
        Salvando...
      </p>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Anterior
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Próximo
          </Button>
        </div>
        <p
          className={cn(
            "text-muted-foreground hidden pt-3 text-center opacity-0 md:block",
            isSaving && "opacity-100",
          )}
        >
          Salvando...
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSmResumePreview(!showSmResumePreview)}
            className="md:hidden"
            title={
              showSmResumePreview ? "Show input form" : "Show resume preview"
            }
          >
            {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/resumes">Fechar</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
