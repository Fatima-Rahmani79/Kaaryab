"use client";

import { useSaved } from "@/context/SavedContext";
import { opportunities } from "@/data/opportunities";
import { useTranslations } from "next-intl";

export default function SavedPage() {
  const t = useTranslations("saved");
  const { savedIds } = useSaved();
  const saved = opportunities.filter((o) => savedIds.includes(o.id));

  return;
}
