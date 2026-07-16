import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import { Opportunity } from "@/types";
import { isExpiringSoon, isExpired, daysUntilDeadline } from "@/lib/utils";
import { cardClass } from "@/lib/ui";
import SaveButton from "./SaveButton";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const soon = isExpiringSoon(opportunity.deadline);
  const expired = isExpired(opportunity.deadline);
  const daysLeft = daysUntilDeadline(opportunity.deadline);

  return (
    <Link
      href={`/${locale}/opportunities/${opportunity.id}`}
      className={`group block relative overflow-hidden p-6 ${cardClass} ${
        expired ? "opacity-60 hover:opacity-80" : ""
      }`}
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
        {expired && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <AlertTriangle size={12} /> {t("detail.expired")}
          </span>
        )}
        {!expired && soon && (
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
        {!expired && daysLeft > 0 && (
          <span
            className={`flex items-center gap-1 ms-auto ${
              soon ? "text-pomegranate font-medium" : ""
            }`}
          >
            {t("detail.daysLeft", { count: daysLeft })}
          </span>
        )}
        {expired && (
          <span className="flex items-center gap-1 ms-auto text-gray-400">
            {t("detail.expired")}
          </span>
        )}
      </div>
    </Link>
  );
}
