"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Opportunity } from "@/types";

const schema = z.object({
  title: z.string().min(3),
  organization: z.string().min(2),
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
  location: z.string().min(2),
  deadline: z.string().min(1),
  description: z.string().min(10),
  requirements: z.string().min(1),
  applyLink: z.string().url(),
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
    formState: { isSubmitting },
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title")}
        placeholder={tFields("titleLabel")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />
      <input
        {...register("organization")}
        placeholder={tFields("organization")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />

      <select
        {...register("category")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {tCat(c)}
          </option>
        ))}
      </select>

      <select
        {...register("type")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      >
        {types.map((ty) => (
          <option key={ty} value={ty}>
            {tType(ty)}
          </option>
        ))}
      </select>

      <input
        {...register("location")}
        placeholder={tFields("location")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />
      <input
        type="date"
        {...register("deadline")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />
      <textarea
        {...register("description")}
        placeholder={tFields("description")}
        rows={4}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />
      <input
        {...register("requirements")}
        placeholder={tFields("requirements")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />
      <input
        {...register("applyLink")}
        placeholder={tFields("applyLink")}
        className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary-600 text-white px-6 py-3 rounded-lg w-full"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
