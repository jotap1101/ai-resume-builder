import { formatDate } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BorderStyles } from "@/app/(main)/editor/border-style-button";
import { Badge } from "@/components/ui/badge";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export function ResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-210/297 h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoSection resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function formatPhone(phone: string | undefined): string {
  if (!phone) return "";

  // Remove all non-numeric characters
  const numbers = phone.replace(/\D/g, "");

  // Format based on length
  if (numbers.length === 11) {
    // Brazilian mobile: (XX) XXXXX-XXXX
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (numbers.length === 10) {
    // Brazilian landline: (XX) XXXX-XXXX
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (numbers.length === 9) {
    // Mobile without area code: XXXXX-XXXX
    return numbers.replace(/(\d{5})(\d{4})/, "$1-$2");
  } else if (numbers.length === 8) {
    // Landline without area code: XXXX-XXXX
    return numbers.replace(/(\d{4})(\d{4})/, "$1-$2");
  }

  // Return original if doesn't match common patterns
  return phone;
}

function PersonalInfoSection({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    if (photo === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhotoSrc("");
      return;
    }

    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";

    if (objectUrl) {
      setPhotoSrc(objectUrl);
    } else if (typeof photo === "string") {
      setPhotoSrc(photo);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="Profile Photo"
          width={100}
          height={100}
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[formatPhone(phone), email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) {
    return null;
  }

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (experience) => Object.values(experience).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) {
    return null;
  }

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work experience
        </p>
        {workExperiencesNotEmpty.map((experience, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{experience.position}</span>
              {experience.startDate && (
                <span>
                  {formatDate(experience.startDate, "MM/yyyy")} -{" "}
                  {experience.endDate
                    ? formatDate(experience.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{experience.company}</p>
            <div className="text-xs whitespace-pre-line">
              {experience.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (education) => Object.values(education).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) {
    return null;
  }

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {educationsNotEmpty.map((education, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{education.degree}</span>
              {education.startDate && (
                <span>
                  {formatDate(education.startDate, "MM/yyyy")} -{" "}
                  {education.endDate
                    ? formatDate(education.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{education.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
