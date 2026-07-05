import { useLocale, useTranslations } from "next-intl"

export default function async NotFound() {
    const t = await useTranslations("notFound");
    const locale = useLocale();
    const title = t("title");

    

}