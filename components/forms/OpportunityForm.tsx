"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Opportunity } from "@/types";
import { inputClass, selectClass } from "@/lib/ui";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

const schema = z.object({
  title: z.string().min(3, "At least 3 characters"),
  organization: z.string().min(2, "Required"),
  category: z.enum([
    "Job",
    "Internship",
    "Scholarship",
    "Online Course",
    "Remote Work",
    "Training Program",
    "Volunteer Work",
  ]),
  type: z.enum(["Remote", "On-site", "Hybrid"]),
  location: z.string().min(2, "Required"),
  deadline: z.string().min(1, "Required"),
  description: z.string().min(10, "At least 10 characters"),
  requirements: z.string().min(1, "Required"),
  applyLink: z.string().url("Enter a valid URL"),
});

type FormValues = z.infer<typeof schema>;

const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
] as const;

const types = ["Remote", "On-site", "Hybrid"] as const;

interface Props {
  mode: "add" | "edit";
  opportunity?: Opportunity;
  onSuccess: () => void;
}

export default function OpportunityForm({
  mode,
  opportunity,
  onSuccess,
}: Props) {
  const t = useTranslations(
    mode === "edit" ? "editOpportunity" : "addOpportunity",
  );
  const tFields = useTranslations("opportunityFields");
  const tCat = useTranslations("categories");
  const tType = useTranslations("types");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: opportunity
      ? {
          title: opportunity.title,
          organization: opportunity.organization,
          category: opportunity.category,
          type: opportunity.type,
          location: opportunity.location,
          deadline: opportunity.deadline,
          description: opportunity.description,
          requirements: opportunity.requirements.join(", "),
          applyLink: opportunity.applyLink,
        }
      : undefined,
  });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        requirements: data.requirements
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
        tags: [data.category, data.type],
      };

      const url =
        mode === "edit"
          ? `/api/opportunities/${opportunity!.id}`
          : "/api/opportunities";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <motion.div variants={item}>
        <FormField label={tFields("titleLabel")} error={errors.title?.message}>
          <input {...register("title")} className={inputClass} />
        </FormField>
      </motion.div>

      <motion.div variants={item}>
        <FormField
          label={tFields("organization")}
          error={errors.organization?.message}
        >
          <input {...register("organization")} className={inputClass} />
        </FormField>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <FormField label={tFields("category")}>
          <select {...register("category")} className={selectClass}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {tCat(c)}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Type">
          <select {...register("type")} className={selectClass}>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {tType(ty)}
              </option>
            ))}
          </select>
        </FormField>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <FormField label={tFields("location")} error={errors.location?.message}>
          <input {...register("location")} className={inputClass} />
        </FormField>

        <FormField label={tFields("deadline")} error={errors.deadline?.message}>
          <input type="date" {...register("deadline")} className={inputClass} />
        </FormField>
      </motion.div>

      <motion.div variants={item}>
        <FormField
          label={tFields("description")}
          error={errors.description?.message}
        >
          <textarea
            {...register("description")}
            rows={4}
            className={inputClass}
          />
        </FormField>
      </motion.div>

      <motion.div variants={item}>
        <FormField
          label={tFields("requirements")}
          error={errors.requirements?.message}
        >
          <input {...register("requirements")} className={inputClass} />
        </FormField>
      </motion.div>

      <motion.div variants={item}>
        <FormField
          label={tFields("applyLink")}
          error={errors.applyLink?.message}
        >
          <input {...register("applyLink")} className={inputClass} />
        </FormField>
      </motion.div>

      {submitError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-pomegranate text-sm"
        >
          {submitError}
        </motion.p>
      )}

      <motion.div variants={item}>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </motion.div>
    </motion.form>
  );
}
