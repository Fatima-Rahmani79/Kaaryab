import  Link  from "next-link";
import { useLocale, useTranslations } from "next-intl"

export default function async NotFound() {
    const t = await useTranslations("notFound");
    const locale = useLocale();
    const title = t("title");

    return (
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 mb-6">
                {t("message")}

            </p>
            <Link href={`/${locale}/opportunities`} className="text-primary-600 hover:underline">
                {t("back")}
            </Link>
        </div>
    )

}