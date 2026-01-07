import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";

export function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();

      if (!isValid) {
        return;
      }

      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter(
            (experience) => experience !== undefined,
          ) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-muted-foreground text-sm">
          Add as many work experiences as you&apos;d like.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceField
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceFieldProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceField({
  form,
  index,
  remove,
}: WorkExperienceFieldProps) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <Input placeholder="Software Engineer" {...field} autoFocus />
            </FormControl>
            <FormDescription>The position you held.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input placeholder="Company Inc." {...field} />
            </FormControl>
            <FormDescription>The company you worked for.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => {
            const { value, ...rest } = field;

            return (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>The date you started working.</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => {
            const { value, ...rest } = field;

            return (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>
                  Leave <span className="font-semibold">end date</span> empty if
                  you are currently working here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="A brief description of your role"
                {...field}
              />
            </FormControl>
            <FormDescription>A brief description of your role.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
