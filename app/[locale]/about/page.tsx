import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Compass, Users, Sparkles } from "lucide-react";
import LatticePattern from "@/components/illustrations/LatticePattern";
import { sectionClass, cardClass } from "@/lib/ui";
import Button from "@/components/ui/Button";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    { icon: Compass, key: "valueOnePlace" as const },
    { icon: Users, key: "valueYouth" as const },
    { icon: Sparkles, key: "valueGrowing" as const },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative bg-lapis-deep text-white py-20">
        <LatticePattern
          className="text-saffron"
          opacity={0.06}
          patternId="about-hero"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              {t("body")}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href={`/${locale}/contact`} className="inline-block">
                <Button className="" variant="primary">
                  {t("getInTouch") ?? "Get in touch"}
                </Button>
              </Link>
              <Link href={`/${locale}/opportunities`} className="inline-block">
                <Button variant="secondary">
                  {t("browseOpportunities") ?? "Browse opportunities"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} bg-transparent`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, key }, i) => (
            <div key={i} className={`${cardClass} p-6`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">
                    {t(key)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`${key}Desc`) ?? ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
