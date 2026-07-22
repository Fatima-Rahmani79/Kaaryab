"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WifiOff } from "lucide-react";
import { Opportunity } from "@/types";
import { useSaved } from "@/context/SavedContext";
import OpportunityCard from "@/components/cards/OpportunityCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function SavedPage() {
  const t = useTranslations("saved");
  const tOpp = useTranslations("opportunities");
  const { savedIds } = useSaved();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch("/api/opportunities")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => setOpportunities(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
      ) : error ? (
        <EmptyState
          message={tOpp("loadError")}
          icon={WifiOff}
          action={
            <Button variant="secondary" onClick={load}>
              {tOpp("retry")}
            </Button>
          }
        />
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
