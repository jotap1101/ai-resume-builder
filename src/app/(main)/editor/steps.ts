import { GeneralInfoForm } from "@/app/(main)/editor/forms/general-info-form";
import { PersonalInfoForm } from "@/app/(main)/editor/forms/personal-info-form";
import { WorkExperienceForm } from "@/app/(main)/editor/forms/work-experience-form";
import { EditorFormProps } from "@/lib/types";
export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
];
