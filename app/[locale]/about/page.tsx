import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="leading-relaxed text-gray-600 dark:text-gray-300">
        {t("body")}
      </p>
    </div>
  );
}
