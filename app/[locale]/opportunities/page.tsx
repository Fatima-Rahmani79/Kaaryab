"use client";

import { useState, useMemo, useEffect } from "react";
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <SearchFilter filters={filters} onChange={setFilters} />

      {loading ? (
        <p className="text-gray-400 py-16 text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <EmptyState message={t("empty")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
}
