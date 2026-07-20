"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import OpportunityForm from "@/components/forms/OpportunityForm";
import { useToast } from "@/components/ui/Toast";

export default function AddOpportunityPage() {
  const t = useTranslations("addOpportunity");
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <OpportunityForm
        mode="add"
        onSuccess={() => {
          toast(t("successMessage"), "success");
          router.push("/opportunities");
        }}
      />
    </div>
  );
}
