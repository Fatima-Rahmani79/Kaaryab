"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { OpportunityFilters, Opportunity } from "@/types";
import { filterOpportunities } from "@/lib/utils";
import OpportunityCard from "@/components/OpportunityCard";
import SearchFilter from "@/components/SearchFilter";
import EmptyState from "@/components/EmptyState";

const initialFilters: OpportunityFilters = {
  search: "",
  category: "All",
  location: "",
  type: "All",
  deadlineRange: "all",
  sortBy: "newest",
};

export default function OpportunitiesPage() {
  const t = useTranslations("opportunities");
  const [filters, setFilters] = useState<OpportunityFilters>(initialFilters);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => filterOpportunities(opportunities, filters),
    [opportunities, filters],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      <SearchFilter
        filters={filters}
        onChange={setFilters}
        opportunities={opportunities}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message={t("empty")} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filtered.map((opp) => (
            <motion.div
              key={opp.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
