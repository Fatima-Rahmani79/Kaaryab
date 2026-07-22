import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Clock, CalendarClock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { getOpportunityById } from "@/lib/mockDb";
import { daysUntilDeadline, isExpired } from "@/lib/utils";
import SaveButton from "@/components/cards/SaveButton";

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const opportunity = getOpportunityById(id);
  if (!opportunity) notFound();

  const t = await getTranslations();
  const expired = isExpired(opportunity.deadline);
  const daysLeft = daysUntilDeadline(opportunity.deadline);

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      {expired && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-pomegranate/10 text-pomegranate px-4 py-3 text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          {t("detail.expiredNotice")}
        </div>
      )}

      <div className="flex justify-between items-start gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink dark:text-white">
            {opportunity.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{opportunity.organization}</p>
        </div>
        <SaveButton id={opportunity.id} />
      </div>

      <div className="flex gap-2 flex-wrap mt-5">
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-lapis/10 text-lapis dark:bg-lapis/20 dark:text-blue-200">
          {t(`categories.${opportunity.category}`)}
        </span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <MapPin size={12} /> {opportunity.location}
        </span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <Clock size={12} /> {t(`types.${opportunity.type}`)}
        </span>
      </div>

      <p className="mt-8 leading-relaxed text-gray-700 dark:text-gray-300">
        {opportunity.description}
      </p>

      <h3 className="font-display font-bold mt-8 mb-3">{t("detail.requirements")}</h3>
      <ul className="space-y-2">
        {opportunity.requirements.map((r) => (
          <li key={r} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
            {r}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <CalendarClock size={15} />
        {t("detail.deadline")}: {opportunity.deadline}{" "}
        {expired ? (
          <span className="text-pomegranate font-medium">({t("detail.expired")})</span>
        ) : (
          <span className={daysLeft <= 7 ? "text-pomegranate font-medium" : ""}>
            ({t("detail.daysLeft", { count: daysLeft })})
          </span>
        )}
      </div>

      {expired ? (
        <button
          disabled
          className="inline-flex items-center gap-2 mt-8 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-7 py-3 rounded-xl font-medium cursor-not-allowed"
        >
          {t("detail.applyClosed")}
        </button>
      ) : (
        <a
          href={opportunity.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 bg-saffron text-lapis-deep hover:brightness-95 transition hover:scale-[1.02] active:scale-[0.98] px-7 py-3 rounded-xl font-medium"
        >
          {t("detail.apply")}
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
