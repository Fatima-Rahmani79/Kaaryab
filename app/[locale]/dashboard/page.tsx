import DashboardCard from "@/components/DashboardCard";
import { opportunities } from "@/data/opportunities";
import { calculateStats } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const stats = calculateStats(opportunities);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <DashboardCard label={t("total")} value={stats.total} />
        <DashboardCard label={t("jobs")} value={stats.jobs} />
        <DashboardCard label={t("scholarships")} value={stats.scholarships} />
        <DashboardCard label={t("internships")} value={stats.internships} />
        <DashboardCard label={t("remote")} value={stats.remote} />
        <DashboardCard
          label={t("expiringSoon")}
          value={stats.expiringSoon}
          highlight
        />
      </div>

      <h2 className="text-xl font-bold mb-4">{t("recent")}</h2>
      <div className="apace-y-2">
        {stats.recent.map((o) => (
          <div
            key={o.id}
            className="flex justify-between border-b border-gray-200 dark:border-gray-800 py-2"
          >
            <span>{o.title}</span>
            <span className="text-gray-500 text-sm">{o.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
