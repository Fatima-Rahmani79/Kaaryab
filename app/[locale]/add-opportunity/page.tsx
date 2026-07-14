"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import OpportunityForm from "@/components/OpportunityForm";

export default function AddOpportunityPage() {
  const t = useTranslations("addOpportunity");
  const [submitted, setSubmitted] = useState(false);

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
      <OpportunityForm mode="add" onSuccess={() => setSubmitted(true)} />
    </div>
  );
}
