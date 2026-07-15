import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Clock } from "lucide-react";
import { Opportunity } from "@/types";
import { isExpiringSoon } from "@/lib/utils";
import { cardClass } from "@/lib/ui";
import SaveButton from "./SaveButton";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const soon = isExpiringSoon(opportunity.deadline);

  return (
    <Link
      href={`/${locale}/opportunities/${opportunity.id}`}
      className={`group block relative overflow-hidden p-6 ${cardClass}`}
    >
      <svg
        className="absolute -top-4 -end-4 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
        width="90"
        height="90"
        aria-hidden="true"
      >
        <path
          d="M45 0 L90 45 L45 90 L0 45 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-lapis-deep dark:text-white"
        />
      </svg>

      <div className="relative flex justify-between items-start gap-2 mb-3">
        <h3 className="font-display font-bold text-lg text-ink dark:text-white leading-snug group-hover:text-lapis dark:group-hover:text-saffron transition-colors">
          {opportunity.title}
        </h3>
        <SaveButton id={opportunity.id} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {opportunity.organization}
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-lapis/10 text-lapis dark:bg-lapis/20 dark:text-blue-200">
          {t(`categories.${opportunity.category}`)}
        </span>
        {soon && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-pomegranate/10 text-pomegranate dark:bg-pomegranate/20">
            {t("expiringSoonBadge")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {opportunity.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} /> {t(`types.${opportunity.type}`)}
        </span>
      </div>
    </Link>
  );
}
