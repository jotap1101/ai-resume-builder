import { EducationForm } from "@/app/(main)/editor/forms/education-form";
import { GeneralInfoForm } from "@/app/(main)/editor/forms/general-info-form";
import { PersonalInfoForm } from "@/app/(main)/editor/forms/personal-info-form";
import { SkillForm } from "@/app/(main)/editor/forms/skill-form";
import { SummaryForm } from "@/app/(main)/editor/forms/summary-form";
import { WorkExperienceForm } from "@/app/(main)/editor/forms/work-experience-form";
import { EditorFormProps } from "@/lib/types";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "Informações gerais",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Informações pessoais",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Experiências profissionais",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Formações acadêmicas",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Habilidades",
    component: SkillForm,
    key: "skills",
  },
  {
    title: "Resumo",
    component: SummaryForm,
    key: "summary",
  },
];
