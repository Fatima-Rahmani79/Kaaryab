"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tag,
  Globe,
  MapPin,
  CalendarClock,
  ArrowUpDown,
  X,
} from "lucide-react";
import {
  OpportunityFilters,
  OpportunityCategory,
  OpportunityType,
  Opportunity,
} from "@/types";
import { inputClass, selectClass } from "@/lib/ui";

interface Props {
  filters: OpportunityFilters;
  onChange: (filters: OpportunityFilters) => void;
  opportunities: Opportunity[];
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

const initial: OpportunityFilters = {
  search: "",
  category: "All",
  location: "",
  type: "All",
  deadlineRange: "all",
  sortBy: "newest",
};

export default function SearchFilter({
  filters,
  onChange,
  opportunities,
}: Props) {
  const t = useTranslations();
  const locations = Array.from(new Set(opportunities.map((o) => o.location)));

  const activeCount = [
    filters.category !== "All",
    filters.type !== "All",
    filters.location !== "",
    filters.deadlineRange !== "all",
    filters.search !== "",
  ].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="relative mb-4">
        <Search
          size={17}
          className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          placeholder={t("opportunities.searchPlaceholder")}
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={inputClass + " ps-10"}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="relative">
          <Tag
            size={15}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.category}
            onChange={(e) =>
              onChange({
                ...filters,
                category: e.target.value as OpportunityFilters["category"],
              })
            }
            className={selectClass + " ps-9"}
          >
            <option value="All">{t("opportunities.allCategories")}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {t(`categories.${c}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Globe
            size={15}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.type}
            onChange={(e) =>
              onChange({
                ...filters,
                type: e.target.value as OpportunityFilters["type"],
              })
            }
            className={selectClass + " ps-9"}
          >
            <option value="All">{t("opportunities.allTypes")}</option>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {t(`types.${ty}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <MapPin
            size={15}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className={selectClass + " ps-9"}
          >
            <option value="">{t("common.allLocations")}</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <CalendarClock
            size={15}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.deadlineRange}
            onChange={(e) =>
              onChange({
                ...filters,
                deadlineRange: e.target
                  .value as OpportunityFilters["deadlineRange"],
              })
            }
            className={selectClass + " ps-9"}
          >
            <option value="all">{t("opportunities.deadlineAll")}</option>
            <option value="week">{t("opportunities.deadlineWeek")}</option>
            <option value="month">{t("opportunities.deadlineMonth")}</option>
          </select>
        </div>

        <div className="relative">
          <ArrowUpDown
            size={15}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as OpportunityFilters["sortBy"],
              })
            }
            className={selectClass + " ps-9"}
          >
            <option value="newest">{t("opportunities.sortNewest")}</option>
            <option value="deadline">{t("opportunities.sortDeadline")}</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {activeCount > 0 && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={() => onChange(initial)}
            className="flex items-center gap-1 text-xs text-pomegranate mt-4 hover:underline"
          >
            <X size={13} /> Clear filters ({activeCount})
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
