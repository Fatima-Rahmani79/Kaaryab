import { getTranslations, setRequestLocale } from "next-intl/server";
import { Layers, MapPin, Building2, AlarmClock } from "lucide-react";
import { getAllOpportunities } from "@/lib/mockDb";
import { categoryBreakdown, isExpiringSoon } from "@/lib/utils";
import { OpportunityCategory } from "@/types";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import PopularCategories from "@/components/sections/PopularCategories";
import FeaturedSection from "@/components/sections/FeaturedSection";
import HowItWorks from "@/components/sections/HowItWorks";
import CtaBanner from "@/components/sections/CtaBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCategories = await getTranslations("categories");

  const opportunities = getAllOpportunities();
  const featured = opportunities.filter((o) => o.featured).slice(0, 3);

  const locations = new Set(opportunities.map((o) => o.location));
  const organizations = new Set(opportunities.map((o) => o.organization));
  const expiringSoon = opportunities.filter((o) => isExpiringSoon(o.deadline)).length;

  const breakdown = categoryBreakdown(opportunities);
  const counts = Object.fromEntries(breakdown.map((b) => [b.category, b.count]));

  const categoryLabels = Object.fromEntries(
    (
      [
        "Job",
        "Internship",
        "Scholarship",
        "Online Course",
        "Remote Work",
        "Training Program",
        "Volunteer Work",
      ] as OpportunityCategory[]
    ).map((c) => [c, tCategories(c)]),
  ) as Record<OpportunityCategory, string>;

  return (
    <div>
      <Hero
        title={t("title")}
        subtitle={t("subtitle")}
        ctaBrowseLabel={t("ctaBrowse")}
        ctaAddLabel={t("ctaAdd")}
      />

      <StatsBar
        stats={[
          {
            label: t("statsOpportunities"),
            value: opportunities.length,
            icon: <Layers size={18} className="text-lapis" />,
          },
          {
            label: t("statsLocations"),
            value: locations.size,
            icon: <MapPin size={18} className="text-lapis" />,
          },
          {
            label: t("statsOrganizations"),
            value: organizations.size,
            icon: <Building2 size={18} className="text-lapis" />,
          },
          {
            label: t("statsExpiringSoon"),
            value: expiringSoon,
            icon: <AlarmClock size={18} className="text-lapis" />,
          },
        ]}
      />

      <PopularCategories
        heading={t("categoriesHeading")}
        labels={categoryLabels}
        counts={counts}
      />

      <FeaturedSection title={t("featured")} opportunities={featured} />

      <HowItWorks
        heading={t("howItWorksHeading")}
        steps={[
          { title: t("step1Title"), description: t("step1Desc") },
          { title: t("step2Title"), description: t("step2Desc") },
          { title: t("step3Title"), description: t("step3Desc") },
        ]}
      />

      <CtaBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
      />
    </div>
  );
}
