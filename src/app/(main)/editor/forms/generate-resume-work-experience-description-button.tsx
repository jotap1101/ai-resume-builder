import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateResumeDescriptionWorkExperience } from "@/app/(main)/editor/forms/actions";
import { useSubscriptionLevel } from "@/app/(main)/subscription-level-provider";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import { canUseAITools } from "@/lib/permissions";
import {
  GenerateResumeDescriptionWorkExperienceInput,
  generateResumeDescriptionWorkExperienceSchema,
  WorkExperienceItem,
} from "@/lib/validation";

interface GenerateResumeDescriptionWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperienceItem: WorkExperienceItem) => void;
}

export function GenerateResumeDescriptionWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateResumeDescriptionWorkExperienceButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();

  const [showInputDialog, setShowInputDialog] = useState(false);

  async function handleClick() {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true);

      return;
    }
    setShowInputDialog(true);
  }

  return (
    <>
      <Button variant="outline" type="button" onClick={handleClick}>
        <WandSparklesIcon className="size-4" />
        Preenchimento inteligente (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperienceItem) => {
          onWorkExperienceGenerated(workExperienceItem);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperienceItem: WorkExperienceItem) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateResumeDescriptionWorkExperienceInput>({
    resolver: zodResolver(generateResumeDescriptionWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateResumeDescriptionWorkExperienceInput) {
    try {
      const response = await generateResumeDescriptionWorkExperience(input);

      onWorkExperienceGenerated(response);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Error generating work experience description:", error);

      toast.error("Falha ao gerar a descrição da experiência profissional.", {
        description: "Algo deu errado. Por favor, tente novamente.",
      });
    } finally {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Gerar Descrição de Experiência Profissional</DialogTitle>
          <DialogDescription>
            Descreva esta experiência profissional e a IA irá gerar uma entrada
            otimizada para você.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ex: Trabalhei como desenvolvedor frontend na Empresa X, onde fui responsável por..."
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription>
                    Descreva esta experiência profissional.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Gerar
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
