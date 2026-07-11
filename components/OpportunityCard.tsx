import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Opportunity } from "@/types";
import { isExpiringSoon } from "@/lib/utils";
import SaveButton from "./SaveButton";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const soon = isExpiringSoon(opportunity.deadline);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow relative">
      {soon && (
        <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
          {t("expiringSoonBadge")}
        </span>
      )}
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{opportunity.title}</h3>
        <SaveButton id={opportunity.id} />
      </div>
      <p className="text-gray-500 text-sm">{opportunity.organization}</p>
    </div>
  );
}
