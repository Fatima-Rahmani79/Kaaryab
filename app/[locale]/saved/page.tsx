"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Bookmark, Search } from "lucide-react";
import { Opportunity } from "@/types";
import { useSaved } from "@/context/SavedContext";
import { staggerContainer, fadeUp } from "@/lib/ui";
import OpportunityCard from "@/components/OpportunityCard";
import EmptyState from "@/components/EmptyState";
import ButtonLink from "@/components/ui/ButtonLink";

export default function SavedPage() {
  const t = useTranslations("saved");
  const tOpp = useTranslations("opportunities");
  const locale = useLocale();
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-xl bg-saffron/15 flex items-center justify-center">
          <Bookmark size={20} className="text-saffron" />
        </div>
        <h1 className="text-3xl font-display font-bold">{t("title")}</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : saved.length === 0 ? (
        <EmptyState
          message={t("empty")}
          icon={Search}
          action={
            <ButtonLink href={`/${locale}/opportunities`} variant="secondary">
              {tOpp("title")}
            </ButtonLink>
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {saved.map((opp) => (
            <motion.div key={opp.id} variants={fadeUp}>
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
