import { getTranslations, setRequestLocale } from "next-intl/server";
import { Compass, Users, Sparkles } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    { icon: Compass, key: "One place" },
    { icon: Users, key: "Built for youth" },
    { icon: Sparkles, key: "Always growing" },
  ];

  return (
    <div className="relative overflow-hidden">
      <svg
        className="absolute -top-16 -end-16 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
        width="320"
        height="320"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="about-lattice"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M15 0 L30 15 L15 30 L0 15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-lapis-deep dark:text-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-lattice)" />
      </svg>

      <div className="relative max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
          {t("title")}
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-14">
          {t("body")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map(({ icon: Icon }, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-lapis" />
              </div>
              <p className="text-sm font-medium text-ink dark:text-white">
                {values[i].key}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
