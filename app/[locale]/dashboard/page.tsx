import { getTranslations } from "next-intl/server";
import {
  Briefcase,
  GraduationCap,
  Award,
  Globe2,
  AlertTriangle,
  LayoutGrid,
} from "lucide-react";
import { getAllOpportunities } from "@/lib/mockDb";
import { calculateStats } from "@/lib/utils";
import DashboardCard from "@/components/DashboardCard";
import CategoryChart from "@/components/CategoryChart";
import OpportunityManageTable from "@/components/OpportunityManageTable";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const opportunities = getAllOpportunities();
  const stats = calculateStats(opportunities);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-display font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
        <DashboardCard
          label={t("total")}
          value={stats.total}
          icon={LayoutGrid}
        />
        <DashboardCard label={t("jobs")} value={stats.jobs} icon={Briefcase} />
        <DashboardCard
          label={t("scholarships")}
          value={stats.scholarships}
          icon={Award}
        />
        <DashboardCard
          label={t("internships")}
          value={stats.internships}
          icon={GraduationCap}
        />
        <DashboardCard label={t("remote")} value={stats.remote} icon={Globe2} />
        <DashboardCard
          label={t("expiringSoon")}
          value={stats.expiringSoon}
          icon={AlertTriangle}
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-display font-bold mb-4">{t("recent")}</h2>
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            {stats.recent.map((o, i) => (
              <div
                key={o.id}
                className={`flex justify-between px-5 py-3.5 text-sm ${
                  i !== 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
                }`}
              >
                <span className="font-medium truncate pe-4">{o.title}</span>
                <span className="text-gray-400 shrink-0">{o.createdAt}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-display font-bold mb-4">Categories</h2>
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <CategoryChart opportunities={opportunities} />
          </div>
        </div>
      </div>

      <OpportunityManageTable initialOpportunities={opportunities} />
    </div>
  );
}
