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

      <div className="flex gap-2 flex-wrap mt-3">
        <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
          {t(`categories.${opportunity.category}`)}
        </span>
        <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded-full">
          {opportunity.location}
        </span>
      </div>

      <Link
        href={`/${locale}/opportunities/${opportunity.id}`}
        className="inline-block mt-4 text-primary-600 text-sm font-medium hover:underline"
      >
        {t("opportunities.details")} ←
      </Link>
    </div>
  );
}
