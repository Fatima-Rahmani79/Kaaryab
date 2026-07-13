"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useTranslations } from "next-intl";

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

export default function AddOpportunityPage() {
  const t = useTranslations("addOpportunity");
  const tCat = useTranslations("categories");
  const tType = useTranslations("types");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          requirements: data.requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean),
          tags: [data.category, data.type],
        }),
      });

      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setSubmitError("مشکلی در ارسال پیش آمد. دوباره تلاش کنید.");
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">{t("successTitle")}</h2>
        <p className="text-gray-500">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder={t("titleLabel")}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          {...register("organization")}
          placeholder={t("organization")}
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
          placeholder={t("location")}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          type="date"
          {...register("deadline")}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <textarea
          {...register("description")}
          placeholder={t("description")}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          {...register("requirements")}
          placeholder={t("requirements")}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          {...register("applyLink")}
          placeholder={t("applyLink")}
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
    </div>
  );
}
