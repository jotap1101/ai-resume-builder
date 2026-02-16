import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

import { GenerateResumeDescriptionWorkExperienceButton } from "@/app/(main)/editor/forms/generate-resume-work-experience-description-button";
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
import { cn } from "@/lib/utils";
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
    // eslint-disable-next-line react-hooks/incompatible-library
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

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      move(oldIndex, newIndex);

      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Experiências profissionais</h2>
        <p className="text-muted-foreground text-sm">
          Adicione quantas experiências profissionais desejar.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceField
                  key={field.id}
                  id={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
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
              Adicionar experiência
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceFieldProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceField({
  id,
  form,
  index,
  remove,
}: WorkExperienceFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "bg-background space-y-3 rounded-md border p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">
          Experiência profissional {index + 1}
        </span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <div className="flex justify-center">
        <GenerateResumeDescriptionWorkExperienceButton
          onWorkExperienceGenerated={(workExperienceItem) => {
            form.setValue(
              `workExperiences.${index}.position`,
              workExperienceItem.position,
            );
            form.setValue(
              `workExperiences.${index}.company`,
              workExperienceItem.company,
            );
            form.setValue(
              `workExperiences.${index}.description`,
              workExperienceItem.description,
            );
            if (workExperienceItem.startDate) {
              form.setValue(
                `workExperiences.${index}.startDate`,
                workExperienceItem.startDate,
              );
            }
            if (workExperienceItem.endDate) {
              form.setValue(
                `workExperiences.${index}.endDate`,
                workExperienceItem.endDate,
              );
            }
          }}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cargo</FormLabel>
            <FormControl>
              <Input
                placeholder="Ex: Desenvolvedor Frontend"
                {...field}
                autoFocus
              />
            </FormControl>
            <FormDescription>O cargo que você ocupou.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Empresa</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Google" {...field} />
            </FormControl>
            <FormDescription>
              A empresa para a qual você trabalhou.
            </FormDescription>
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
                <FormLabel>Data de início</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>
                  A data em que você começou a trabalhar.
                </FormDescription>
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
                <FormLabel>Data de término</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>
                  Deixe o campo{" "}
                  <span className="font-semibold">data de término</span> vazio
                  se você estiver trabalhando aqui atualmente.
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
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: Responsável pelo desenvolvimento da interface do usuário usando React.js..."
                {...field}
              />
            </FormControl>
            <FormDescription>Uma breve descrição do seu cargo.</FormDescription>
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
