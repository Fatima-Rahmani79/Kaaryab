import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
      <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
      <p className="text-gray-500 mb-6">{t("message")}</p>
      <Link
        href={`/${locale}/opportunities`}
        className="text-primary-600 hover:underline"
      >
        {t("back")}
      </Link>
    </div>
  );
}
