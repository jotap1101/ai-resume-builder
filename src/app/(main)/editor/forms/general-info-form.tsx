"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";

export function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
        <h2 className="text-2xl font-semibold">Informações gerais</h2>
        <p className="text-muted-foreground text-sm">
          Essas informações não aparecerão no seu currículo.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Currículo para vaga de desenvolvedor frontend"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormDescription>O título do seu currículo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Este currículo é focado na minha experiência..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Uma breve descrição para ajudar você a identificar este
                  currículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
