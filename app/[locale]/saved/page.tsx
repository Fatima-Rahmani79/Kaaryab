"use client";

import EmptyState from "@/components/EmptyState";
import OpportunityCard from "@/components/OpportunityCard";
import { useSaved } from "@/context/SavedContext";
import { opportunities } from "@/data/opportunities";
import { useTranslations } from "next-intl";

export default function SavedPage() {
  const t = useTranslations("saved");
  const { savedIds } = useSaved();
  const saved = opportunities.filter((o) => savedIds.includes(o.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {saved.length === 0 ? (
        <EmptyState message={t("empty")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
}
