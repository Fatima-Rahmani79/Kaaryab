"use client";

import { useTranslations } from "next-intl";
import {
  OpportunityFilters,
  OpportunityCategory,
  OpportunityType,
} from "@/types";

interface Props {
  filters: OpportunityFilters;
  onChange: (filters: OpportunityFilters) => void;
}

const categories: OpportunityCategory[] = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
];

const types: OpportunityType[] = ["Remote", "On-site", "Hybrid"];

export default function SearchFilter({ filters, onChange }: Props) {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap gap-3">
      <input
        placeholder={t("opportunities.searchPlaceholder")}
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="flex-1 min-w-[200px] border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      />

      <select
        value={filters.category}
        onChange={(e) =>
          onChange({
            ...filters,
            category: e.target.value as OpportunityFilters["category"],
          })
        }
        className="border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      >
        <option value="All">{t("opportunities.allCategories")}</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {t(`categories.${c}`)}
          </option>
        ))}
      </select>

      <select
        value={filters.type}
        onChange={(e) =>
          onChange({
            ...filters,
            type: e.target.value as OpportunityFilters["type"],
          })
        }
        className="border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      >
        <option value="All">{t("opportunities.allTypes")}</option>
        {types.map((ty) => (
          <option key={ty} value={ty}>
            {t(`types.${ty}`)}
          </option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          onChange({
            ...filters,
            sortBy: e.target.value as OpportunityFilters["sortBy"],
          })
        }
        className="border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
      >
        <option value="newest">{t("opportunities.sortNewest")}</option>
        <option value="deadline">{t("opportunities.sortDeadline")}</option>
      </select>
    </div>
  );
}
