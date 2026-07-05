import { useLocale, useTranslations } from "next-intl";
import { opportunities } from "@/data/opportunities";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const featured = opportunities
    .filter((opportunity) => opportunity.featured)
    .slice(0, 3);

    return();
}
