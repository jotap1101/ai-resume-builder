import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { GenerateResumeSummaryButton } from "@/app/(main)/editor/forms/generate-resume-summary-button";
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
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";

export function SummaryForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();

      if (!isValid) {
        return;
      }

      setResumeData({
        ...resumeData,
        ...values,
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Resumo</h2>
        <p className="text-muted-foreground text-sm">
          Escreva uma breve introdução para seu currículo ou deixe a IA gerar
          uma a partir dos dados inseridos.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Resumo</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    onBlur={() => {
                      field.onBlur();
                    }}
                    name={field.name}
                    ref={field.ref}
                    placeholder="Ex: Desenvolvedor de software com 5 anos de experiência em desenvolvimento web, especializado em React e Node.js. Apaixonado por criar soluções eficientes e escaláveis."
                    rows={5}
                  />
                </FormControl>
                <FormDescription>
                  Um resumo breve para destacar suas principais qualificações.
                </FormDescription>
                <FormMessage />
                <GenerateResumeSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
