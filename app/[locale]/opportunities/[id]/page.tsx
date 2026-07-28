import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  MapPin,
  Clock,
  CalendarClock,
  AlertTriangle,
  ArrowUpRight,
  Hourglass,
} from "lucide-react";
import { getOpportunityById } from "@/lib/mockDb";
import { getCurrentProfile } from "@/lib/auth/server";
import { daysUntilDeadline, isExpired } from "@/lib/utils";
import SaveButton from "@/components/cards/SaveButton";
import Button from "@/components/ui/Button";
import { sectionClass, cardClass } from "@/lib/ui";

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  const t = await getTranslations();

  if (opportunity.status === "pending") {
    const { profile } = await getCurrentProfile();
    if (!profile?.is_admin) notFound();
  }

  const expired = isExpired(opportunity.deadline);
  const daysLeft = daysUntilDeadline(opportunity.deadline);

  return (
    <div className={sectionClass}>
      <div className="max-w-6xl mx-auto px-4">
        {opportunity.status === "pending" && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-saffron/10 text-saffron px-4 py-3 text-sm">
            <Hourglass size={16} className="shrink-0" />
            {t("detail.pendingNotice")}
          </div>
        )}

        {expired && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-pomegranate/10 text-pomegranate px-4 py-3 text-sm">
            <AlertTriangle size={16} className="shrink-0" />
            {t("detail.expiredNotice")}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <main className="md:col-span-2">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-ink dark:text-white">
                  {opportunity.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {opportunity.organization}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <SaveButton id={opportunity.id} />
              </div>
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

            <article className="mt-8 prose dark:prose-invert max-w-none">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{opportunity.description}</p>

              <h3 className="font-display font-bold mt-8 mb-3">{t("detail.requirements")}</h3>
              <ul className="space-y-2">
                {opportunity.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          </main>

          <aside className={`${cardClass} p-6`} aria-labelledby="opportunity-meta">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 id="opportunity-meta" className="font-display font-bold">{t("detail.quickInfo") ?? "Quick info"}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("detail.organization") ?? opportunity.organization}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">{opportunity.location}</p>
                <p className="text-xs text-gray-500">{t("detail.locationDesc") ?? "Location"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">{t(`types.${opportunity.type}`)}</p>
                <p className="text-xs text-gray-500">{t("detail.typeDesc") ?? "Work arrangement"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                <CalendarClock size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {t("detail.deadline")} {opportunity.deadline}
                </p>
                <p className="text-xs text-gray-500">
                  {!expired ? (
                    <span className={daysLeft <= 7 ? "text-pomegranate font-medium" : ""}>
                      {t("detail.daysLeft", { count: daysLeft })}
                    </span>
                  ) : (
                    <span className="text-pomegranate font-medium">{t("detail.expired")}</span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4">
              {!expired ? (
                <a href={opportunity.applyLink} target="_blank" rel="noreferrer" className="block">
                  <Button className="w-full mb-3">{t("detail.apply")}</Button>
                </a>
              ) : (
                <Button variant="ghost" className="w-full mb-3" disabled>
                  {t("detail.applyClosed")}
                </Button>
              )}

              <div className="text-center">
                <SaveButton id={opportunity.id} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
