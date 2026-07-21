"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Opportunity } from "@/types";
import { useSaved } from "@/context/SavedContext";
import OpportunityCard from "@/components/cards/OpportunityCard";
import EmptyState from "@/components/ui/EmptyState";

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
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : saved.length === 0 ? (
        <EmptyState message={t("empty")} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {saved.map((opp) => (
            <motion.div
              key={opp.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
