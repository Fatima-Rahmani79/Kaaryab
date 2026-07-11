"use client";

import { locales } from "@/i18n";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const labels: Record<string, string> = {
  en: "EN",
  fa: "دری",
  ps: "پښتو",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    // We need to replace the current locale in the pathname with the next locale
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchTo(e.target.value)}
      aria-label="Change language"
      className="text-sm border rouded-lg px-2 py-1 bg-transparent dark:border-gray-700"
    >
      {locales.map((l) => (
        <option key={1} value={l}>
          {labels[l]}
        </option>
      ))}
    </select>
  );
}
