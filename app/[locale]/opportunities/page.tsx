"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SearchX, WifiOff } from "lucide-react";
import { OpportunityFilters, Opportunity, OpportunityCategory } from "@/types";
import { filterOpportunities } from "@/lib/utils";
import { staggerContainer, fadeUp } from "@/lib/ui";
import OpportunityCard from "@/components/cards/OpportunityCard";
import SearchFilter from "@/components/forms/SearchFilter";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/SkeletonCard";
import Button from "@/components/ui/Button";

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
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as OpportunityCategory | null;

  const [filters, setFilters] = useState<OpportunityFilters>({
    ...initialFilters,
    category: categoryParam ?? "All",
  });
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

  const filtered = useMemo(
    () => filterOpportunities(opportunities, filters),
    [opportunities, filters],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      <SearchFilter
        filters={filters}
        onChange={setFilters}
        opportunities={opportunities}
      />

      {!loading && !error && (
        <p className="text-sm text-gray-400 mt-6 mb-2">{`${filtered.length} results`}</p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          message={t("loadError")}
          icon={WifiOff}
          action={
            <Button variant="secondary" onClick={load}>
              {t("retry")}
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState message={t("empty")} icon={SearchX} />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filtered.map((opp) => (
            <motion.div key={opp.id} variants={fadeUp} className="h-full">
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
