import { getTranslations } from "next-intl/server";
import { getAllOpportunities } from "@/lib/mockDb";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";

export default async function HomePage() {
  const t = await getTranslations("home");
  const featured = getAllOpportunities()
    .filter((o) => o.featured)
    .slice(0, 3);

  return (
    <div>
      <Hero
        title={t("title")}
        subtitle={t("subtitle")}
        ctaBrowseLabel={t("ctaBrowse")}
        ctaAddLabel={t("ctaAdd")}
      />
      <FeaturedSection title={t("featured")} opportunities={featured} />
    </div>
  );
}
