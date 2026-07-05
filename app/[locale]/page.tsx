import { useLocale, useTranslations } from "next-intl";
import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/OpportunityCard";
import { Link } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const featured = opportunities
    .filter((opportunity) => opportunity.featured)
    .slice(0, 3);

  return (
    <div>
      <section className="bg-primary-50 dark:bg-gray-900 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
          {t("subtitle")}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={`/${locale}/opportunities`}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            {t("ctaBrowse")}
          </Link>
          <Link
            href={`/${locale}/add-opportunity`}
            className="border border-primary-600 text-primary-600 dark:text-primary-500 px-6 py-3 rounded-lg"
          >
            {t("ctaAdd")}
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">{t("featured")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>
    </div>
  );
}
