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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillSchema, SkillValues } from "@/lib/validation";

export function SkillForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
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
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Habilidades</h2>
        <p className="text-muted-foreground text-sm">
          Quais são suas habilidades?
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Habilidades</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value?.join(",") || ""}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const skillsArray = inputValue.split(",");

                      field.onChange(skillsArray);
                    }}
                    onBlur={() => {
                      if (Array.isArray(field.value)) {
                        const cleanArray = field.value
                          .filter((s) => s !== undefined)
                          .map((s) => s.trim())
                          .filter((s) => s !== "");
                        field.onChange(cleanArray);
                      }
                      field.onBlur();
                    }}
                    name={field.name}
                    ref={field.ref}
                    placeholder="Ex: React.js, Node.js, TypeScript, ..."
                  />
                </FormControl>
                <FormDescription>
                  Separe cada habilidade com uma vírgula.
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
