import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllOpportunities } from "@/lib/mockDb";
import { calculateStats } from "@/lib/utils";
import {
  Layers,
  Briefcase,
  GraduationCap,
  Rocket,
  Globe2,
  AlarmClock,
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import CategoryChart from "@/components/CategoryChart";
import OpportunityManageTable from "@/components/OpportunityManageTable";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");
  const opportunities = getAllOpportunities();
  const stats = calculateStats(opportunities);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <DashboardCard label={t("total")} value={stats.total} icon={Layers} />
        <DashboardCard label={t("jobs")} value={stats.jobs} icon={Briefcase} />
        <DashboardCard
          label={t("scholarships")}
          value={stats.scholarships}
          icon={GraduationCap}
        />
        <DashboardCard
          label={t("internships")}
          value={stats.internships}
          icon={Rocket}
        />
        <DashboardCard label={t("remote")} value={stats.remote} icon={Globe2} />
        <DashboardCard
          label={t("expiringSoon")}
          value={stats.expiringSoon}
          icon={AlarmClock}
          highlight
        />
      </div>

      <h2 className="text-xl font-display font-bold mb-4">{t("recent")}</h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800 mb-10 overflow-hidden">
        {stats.recent.map((o) => (
          <div key={o.id} className="flex justify-between px-5 py-3.5 text-sm">
            <span>{o.title}</span>
            <span className="text-gray-400">{o.createdAt}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-display font-bold mb-4">Categories</h2>
      <CategoryChart opportunities={opportunities} />

      <OpportunityManageTable initialOpportunities={opportunities} />
    </div>
  );
}
