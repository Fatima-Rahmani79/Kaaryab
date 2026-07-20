"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SearchX } from "lucide-react";
import { OpportunityFilters, Opportunity, OpportunityCategory } from "@/types";
import { filterOpportunities } from "@/lib/utils";
import { staggerContainer, fadeUp } from "@/lib/ui";
import OpportunityCard from "@/components/cards/OpportunityCard";
import SearchFilter from "@/components/forms/SearchFilter";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/SkeletonCard";

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
  const categoryParam = searchParams.get(
    "category",
  ) as OpportunityCategory | null;

  const [filters, setFilters] = useState<OpportunityFilters>({
    ...initialFilters,
    category: categoryParam ?? "All",
  });
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      <SearchFilter
        filters={filters}
        onChange={setFilters}
        opportunities={opportunities}
      />

      <p className="text-sm text-gray-400 mt-6 mb-2">
        {loading ? "" : `${filtered.length} results`}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
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
            <motion.div key={opp.id} variants={fadeUp}>
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
