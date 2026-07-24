"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales } from "@/i18n";

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
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchTo(e.target.value)}
      aria-label="Change language"
      className="text-sm border rounded-lg px-2 py-1 bg-transparent dark:border-gray-700 cursor-pointer"
    >
      {locales.map((l) => (
        <option key={l} value={l} className="dark:bg-lapis-deep">
          {labels[l]}
        </option>
      ))}
    </select>
  );
}
