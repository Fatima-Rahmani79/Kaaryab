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



