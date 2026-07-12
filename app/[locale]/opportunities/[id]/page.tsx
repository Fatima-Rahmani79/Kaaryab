import SaveButton from "@/components/SaveButton";
import { opportunities } from "@/data/opportunities";
import { daysUntilDeadline, isExpired } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return opportunities.map((o) => ({ id: o.id }));
}

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const opportunity = opportunities.find((o) => o.id === id);
  if (!opportunity) notFound();

  const t = await getTranslations();
  const expired = isExpired(opportunity.deadline);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{opportunity.title}</h1>
          <p className="text-gray-500">{opportunity.organization}</p>
        </div>
        <SaveButton id={opportunity.id} />
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
          {t(`categories.${opportunity.category}`)}
        </span>
        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
          {opportunity.location}
        </span>
        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
          {t(`types.${opportunity.type}`)}
        </span>
      </div>

      <p className="mt-6 leading-relaxed">{opportunity.description}</p>

      <h3 className="font-bold mt-6 mb-2">{t("detail.requirements")}</h3>
      <ul className="list-disc pr-6 space-y-1">
        {opportunity.requirements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        {t("detail.deadline")}: {opportunity.deadline}{" "}
        {expired
          ? `(${t("detail.expired")})`
          : `(${t("detail.daysLeft", {
              count: daysUntilDeadline(opportunity.deadline),
            })})`}
      </p>

      <a
        href={opportunity.applyLink}
        target="_blank"
        className="inline-block mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg"
      >
        {t("detail.apply")}
      </a>
    </div>
  );
}
