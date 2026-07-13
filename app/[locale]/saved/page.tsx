"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Opportunity } from "@/types";
import { useSaved } from "@/context/SavedContext";
import OpportunityCard from "@/components/OpportunityCard";
import EmptyState from "@/components/EmptyState";

export default function SavedPage() {
  const t = useTranslations("saved");
  const { savedIds } = useSaved();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .finally(() => setLoading(false));
  }, []);

  const saved = opportunities.filter((o) => savedIds.includes(o.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {loading ? (
        <p className="text-gray-400 py-16 text-center">Loading...</p>
      ) : saved.length === 0 ? (
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
