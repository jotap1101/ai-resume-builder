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
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { educationSchema, EducationValues } from "@/lib/validation";

export function EducationForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
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
        educations:
          values.educations?.filter((education) => education !== undefined) ||
          [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
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
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      move(oldIndex, newIndex);

      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Formações acadêmicas</h2>
        <p className="text-muted-foreground text-sm">
          Adicione quantas formações acadêmicas desejar.
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
                <EducationField
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Adicionar formação
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationField({ id, form, index, remove }: EducationProps) {
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
        <span className="font-semibold">Formação acadêmica {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Curso</FormLabel>
            <FormControl>
              <Input
                placeholder="Bacharelado em Ciência da Computação"
                {...field}
                autoFocus
              />
            </FormControl>
            <FormDescription>O nome do seu curso.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instituição</FormLabel>
            <FormControl>
              <Input
                placeholder="IFSULDEMINAS - Campus Muzambinho"
                {...field}
              />
            </FormControl>
            <FormDescription>A instituição que você frequentou.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => {
            const { value, ...rest } = field;

            return (
              <FormItem>
                <FormLabel>Data de início</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>
                  A data em que você começou a estudar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => {
            const { value, ...rest } = field;

            return (
              <FormItem>
                <FormLabel>Data de término</FormLabel>
                <FormControl>
                  <Input type="date" {...rest} value={value?.slice(0, 10)} />
                </FormControl>
                <FormDescription>
                  Deixe a <span className="font-semibold">data de término</span>{" "}
                  vazio se você ainda estiver estudando aqui.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remover
      </Button>
    </div>
  );
}
